import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Globe, Star, Hash, CheckCircle, AlertCircle } from "lucide-react";
import { Header } from '@/components/header/Header';

const BusinessProfile = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/businesses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                
                setBusiness(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [id]);

    if (loading) return (

        <div className="flex items-center text-white justify-center min-h-screen">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-primary rounded-full border-t-transparent"
            />
        </div>
    );
    if (error) return <div className="text-destructive">Error: {error}</div>;
    if (!business) return <div>No business data found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-8 px-4"
        >
            <Header/>
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full bg-gray-800/50 backdrop-blur border-gray-700">
                        <CardHeader className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                                        {business.name}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 mt-2 text-lg">
                                        {business.description}
                                    </CardDescription>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2"
                                >
                                    <Star className="text-yellow-400" />
                                    <span className="text-xl text-white font-semibold">{business.averageRating.toFixed(1)}</span>
                                    <span className="text-gray-400">({business.reviewCount} reviews)</span>
                                </motion.div>
                            </div>
                            
                            <div className="flex gap-2">
                                <Badge variant="outline" className="border-indigo-500 text-indigo-400">
                                    {business.status.toUpperCase()}
                                </Badge>
                                {business.isVerified && (
                                    <Badge variant="outline" className="border-green-500 text-green-400">
                                        <CheckCircle className="w-4 h-4 mr-1" /> Verified
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Photos Section */}
                            {business?.photos && business?.photos?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Carousel className="w-full max-w-4xl mx-auto">
                                        <CarouselContent>
                                            {business.photos.map((photo, index) => (
                                                <CarouselItem key={index}>
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <img
                                                            src={photo}
                                                            alt={`${business.name} photo ${index + 1}`}
                                                            className="w-full h-80 object-cover rounded-lg"
                                                        />
                                                    </motion.div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="text-gray-400" />
                                        <CarouselNext className="text-gray-400" />
                                    </Carousel>
                                </motion.div>
                            )}

                            {/* Contact & Location Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="bg-gray-800/30 border-gray-700">
                                        <CardHeader>
                                            <CardTitle className="text-xl text-indigo-400">Location</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="flex items-start text-white gap-3">
                                                <MapPin className="w-5 h-5 text-indigo-400 mt-1" />
                                                <p>{business.address.street}<br />
                                                   {business.address.city}, {business.address.state} {business.address.zipCode}<br />
                                                   {business.address.country}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Card className="bg-gray-800/30 border-gray-700">
                                        <CardHeader>
                                            <CardTitle className="text-xl text-indigo-400">Contact</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {
                                                <div className="flex items-center text-white gap-3">
                                                    <Phone className="w-5 h-5 text-indigo-400" />
                                                    <p>{business?.contactInfo?.phone || "Not provided"}</p>
                                                </div>
                                            }
                                            {business?.contactInfo?.email && (
                                                <div className="flex text-white items-center gap-3">
                                                    <Mail className="w-5  h-5 text-indigo-400" />
                                                    <p>{business.contactInfo.email}</p>
                                                </div>
                                            )}
                                            {business?.contactInfo?.website && (
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-indigo-400" />
                                                    <a 
                                                        href={business.contactInfo.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-indigo-400 transition-colors"
                                                    >
                                                        {business.contactInfo.website}
                                                    </a>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>

                            {/* Business Hours */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="bg-gray-800/30 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-indigo-400">
                                            <Clock className="w-5 h-5 inline-block mr-2" />
                                            Business Hours
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 text-white md:grid-cols-2 gap-4">
                                            {business.businessHours && Object.entries(business.businessHours).map(([day, hours], index) => (
                                                <motion.div
                                                    key={day}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className="flex justify-between items-center"
                                                >
                                                    <span className="capitalize font-medium">{day}</span>
                                                    <span className="text-gray-400">
                                                        {hours.open} - {hours.close}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Keywords */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-2"
                            >
                                {business.keywords && business.keywords.map((keyword, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge variant="outline" className="border-indigo-500/50 text-indigo-400">
                                            <Hash className="w-3 h-3 mr-1" />
                                            {keyword}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BusinessProfile;