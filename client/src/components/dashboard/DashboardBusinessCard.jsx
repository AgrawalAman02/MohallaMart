import { MapPin, Star, Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export function DashboardBusinessCard({ business }) {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            business.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
          }`}
        >
          {business.status === 'active' ? 'Active' : 'Pending'}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{business.name}</CardTitle>
        <CardDescription className="capitalize">{business.category}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{business.views} views</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{business.rating} ({business.reviewCount})</span>
          </div>
          <div className="flex items-center">
            <ShoppingBag className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>₹{business.sales.toLocaleString()}</span>
          </div>
          <div className="flex items-center truncate">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{business.location}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            onClick={() => navigate(`/business/manage/${business.id}`)}
          >
            Manage Business
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(`/business/deals/new?businessId=${business.id}`)}
          >
            Create Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}