import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';

export const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedSearch) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    window.location.href = "/signup";
                    return;
                }
                console.log(debouncedSearch );
                
                const response = await axios.get(
                  `http://localhost:5000/api/businesses/search?q=${encodeURIComponent(debouncedSearch)}`,
                  {
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                  }
                );
                console.log(debouncedSearch );

                setResults(response.data.businesses || []);
                console.log(response);
                
                setShowDropdown(true);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedSearch]);

    return (
        <div className="container mx-auto p-4">
            <div className="relative max-w-2xl mx-auto">
                <Input
                    type="search"
                    placeholder="Search businesses..."
                    className="w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Results Dropdown */}
                {showDropdown && results.length > 0 && (
                    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
                        {results.map((business) => (
                            <Card key={business._id} className="p-4 m-2 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    {business.mainPhoto && (
                                        <img
                                            src={business.mainPhoto}
                                            alt={business.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-semibold">{business.name}</h3>
                                        <p className="text-sm text-gray-500">{business.category}</p>
                                        {business.address && (
                                            <p className="text-xs text-gray-400">
                                                {`${business.address.street}, ${business.address.city}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute w-full text-center py-4">
                        Searching...
                    </div>
                )}

                {/* No Results */}
                {!isLoading && showDropdown && results.length === 0 && searchTerm && (
                    <div className="absolute w-full bg-white rounded-lg shadow-lg p-4 text-center">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
};