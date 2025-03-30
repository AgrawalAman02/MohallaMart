import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

// filepath: c:/Users/Abhi Sharma/mohallaMart/MohallaMart/client/src/pages/search-page.jsx
const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const debounceTimeoutRef = useRef(null);
    const navigate = useNavigate();

    // Fetch search results from the backend
    const fetchResults = async (searchQuery) => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/businesses/search?q=${searchQuery}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Handle input changes with debouncing
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (query.trim()) {
                fetchResults(query);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    return (
        <div className="relative mx-auto mt-10 w-full max-w-md">
            <Command className="rounded-lg border shadow-md">
                <CommandInput
                    placeholder="Search businesses..."
                    value={query}
                    onValueChange={setQuery}
                    className="w-full"
                />
                {query.trim() && (
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {results.length > 0 && (
                            <CommandGroup>
                                {results.map((business) => (
                                    <CommandItem
                                        key={business._id}
                                        onSelect={() => navigate(`/business/profile/${business._id}`)}
                                        className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {business.mainPhoto && (
                                            <img
                                                src={business.mainPhoto}
                                                alt={business.name}
                                                className="h-10 w-10 rounded object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="font-medium">{business.name}</p>
                                            {business.description && (
                                                <p className="text-sm text-gray-500 truncate">
                                                    {business.description}
                                                </p>
                                            )}
                                            {business.address && (
                                                <p className="text-xs text-gray-400">
                                                    {[
                                                        business.address.street,
                                                        business.address.city,
                                                        business.address.state,
                                                        business.address.zipCode
                                                    ].filter(Boolean).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                )}
            </Command>
        </div>
    );
};

export default SearchPage;