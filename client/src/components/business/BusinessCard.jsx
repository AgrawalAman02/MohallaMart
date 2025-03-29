import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function BusinessCard({ business: propBusiness }) {
  // This would come from props in real implementation
  const mockBusiness = {
    id: '1',
    name: 'Cafe Hometown',
    category: 'cafe',
    rating: 4.5,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?q=80&w=1000',
    address: '123 Main Street, Neighborhood',
    distance: '0.4 km',
    isOpen: true,
    hasActiveDeals: true
  };

  // Use props or fallback to mockBusiness
  const business = propBusiness || mockBusiness;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {business.hasActiveDeals && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            Deal
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-1.5">
          <Link to={`/business/${business.id}`}>
            <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary">
              {business.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{business.category}</Badge>
            <span>•</span>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{business.rating}</span>
              <span className="ml-1">({business.reviewCount})</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{business.distance}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span className={business.isOpen ? "text-green-600" : "text-rose-600"}>
            {business.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}