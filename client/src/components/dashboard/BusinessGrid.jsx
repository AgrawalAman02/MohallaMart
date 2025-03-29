import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddBusinessCard } from '@/components/dashboard/AddBusinessCard';

export function BusinessGrid({ businesses }) {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {businesses.map(business => (
        <Card key={business.id}>
          <CardHeader>
            <CardTitle>{business.name}</CardTitle>
            <CardDescription>{business.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-green-600">
                {business.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Views:</span>
              <span>{business.views} this month</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Rating:</span>
              <span>{business.rating} ({business.reviewCount} reviews)</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/business/manage/${business.id}`)}
              >
                Manage Business
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate(`/business/deals/new?businessId=${business.id}`)}
              >
                Add Deal
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <AddBusinessCard />
    </div>
  );
}