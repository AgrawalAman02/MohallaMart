import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

            console.log(response);

            
            
            
            const data = await response.json();
            console.log(data);
            
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
        }, 100);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    return (
        <>
            <input
            className='border-red-500 flex-1 rounded-md border p-2' 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
               results.map((business) => (
                // {JSON.stringify(business)}
                
               <Link to={`/business/profile/${business._id}`}><p >{business.name}</p></Link> 
               ))
            )}
        </>
    );
};

export default SearchPage;