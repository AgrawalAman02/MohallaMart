import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BusinessesPanel } from '@/components/dashboard/BusinessesPanel';
import { AnalyticsPanel } from '@/components/dashboard/AnalyticsPanel';
import { ReviewsPanel } from '@/components/dashboard/ReviewsPanel';
import { DealsPanel } from '@/components/dashboard/DealsPanel';

export function DashboardTabs() {
  // Sample data for deals - in a real app, this would come from an API
  const deals = [
    {
      id: '1',
      title: '20% Off Morning Coffee',
      businessName: 'Café Hometown',
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      redemptions: 34,
      impressions: 150,
      status: 'active'
    },
    {
      id: '2',
      title: 'Buy One Get One Free',
      businessName: 'Corner Bakery',
      startDate: '2024-04-10', 
      endDate: '2024-05-30',
      redemptions: 27,
      impressions: 120,
      status: 'active'
    },
    {
      id: '3',
      title: 'Weekend Special: 15% Off',
      businessName: 'Café Hometown',
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      redemptions: 0,
      impressions: 40,
      status: 'upcoming'
    }
  ];

  return (
    <Tabs defaultValue="businesses" className="mb-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="businesses">My Businesses</TabsTrigger>
        <TabsTrigger value="deals">Deals</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="businesses" className="mt-6">
        <BusinessesPanel />
      </TabsContent>
      
      <TabsContent value="deals" className="mt-6">
        <DealsPanel deals={deals} />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <AnalyticsPanel />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <ReviewsPanel />
      </TabsContent>
    </Tabs>
  );
}