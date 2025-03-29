import { CalendarCheck, Users, TrendingUp, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function DealCard({ deal }) {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days remaining or days passed
  const calculateTimeFrame = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) {
      const daysToStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
      return `Starts in ${daysToStart} day${daysToStart !== 1 ? 's' : ''}`;
    } else if (now <= end) {
      const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
      return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
    } else {
      const daysPassed = Math.ceil((now - end) / (1000 * 60 * 60 * 24));
      return `Ended ${daysPassed} day${daysPassed !== 1 ? 's' : ''} ago`;
    }
  };

  // Calculate performance percentage (redemptions relative to impressions)
  const calculatePerformance = (redemptions, impressions) => {
    if (!impressions) return 0;
    const percentage = (redemptions / impressions) * 100;
    return Math.min(Math.round(percentage), 100); // Cap at 100%
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'expired': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const performance = calculatePerformance(deal.redemptions, deal.impressions);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{deal.title}</CardTitle>
          <Badge className={getStatusColor(deal.status)}>
            {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{deal.businessName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Timeline:</span>
            </div>
            <span className="font-medium">
              {calculateTimeFrame(deal.startDate, deal.endDate)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Claims:</span>
            </div>
            <span className="font-medium">{deal.redemptions} / {deal.impressions} views</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Performance:</span>
              </div>
              <span className="font-medium">{performance}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${performance}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <span>Start: {formatDate(deal.startDate)}</span>
            <span className="mx-2">•</span>
            <span>End: {formatDate(deal.endDate)}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate(`/business/deals/edit/${deal.id}`)}
          >
            <Edit className="h-3.5 w-3.5 mr-1" /> Manage Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}