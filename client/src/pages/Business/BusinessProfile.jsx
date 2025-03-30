import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
MapPin, 
Phone, 
Mail, 
Tag,
Calendar 
} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function BusinessProfile() {
const { id } = useParams();
const [business, setBusiness] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchBusiness = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/businesses/${id}`);       
            console.log(response);
                        
            setBusiness(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    fetchBusiness();
}, [id]);

if (loading) {
    return (
        <div className="container mx-auto p-6 space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    );
}

if (error) {
    return (
        <div className="container mx-auto p-6">
            <Card className="bg-red-50">
                <CardContent className="p-6">
                    <p className="text-red-600">Error: {error}</p>
                </CardContent>
            </Card>
        </div>
    );
}

if (!business) { // Added fallback check for missing business details
    return (
        <div className="container mx-auto p-6">
            <p className="text-gray-500">Business details not found.</p>
        </div>
    );
}

return (
    <div className="container mx-auto p-6 space-y-6">
        {/* Main Business Info */}
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold">{business.name}</CardTitle>
                        <CardDescription className="text-lg">
                            {business.description}
                        </CardDescription>
                    </div>
                    <Badge variant="outline">{business.category}</Badge>
                </div>
            </CardHeader>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <p>{`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zipCode}, ${business.address.country}`}</p>
                    </div>
                        <Phone className="h-5 w-5 text-gray-500" />
                        <p>{business.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <p>{business.email}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
                <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {business.businessHours && Object.entries(business.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between">
                            <span className="font-medium">{day}</span>
                            <span>{`${hours.open} - ${hours.close}`}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Active Deals */}
            {business.activeDeals && business.activeDeals.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Active Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {business.activeDeals.map((deal) => (
                                <div key={deal._id} className="p-4 border rounded-lg">
                                    <h4 className="font-semibold">{deal.title}</h4>
                                    <p className="text-sm text-gray-600">{deal.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                            Valid until: {new Date(deal.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Additional Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {business.tags && business.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            <Tag className="h-5 w-5 text-gray-500" />
                            {business.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    {business.website && (
                        <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Visit Website
                        </a>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
);
}