import { BusinessGrid } from '@/components/dashboard/BusinessGrid';

export function BusinessesPanel() {
  // Sample business data - in a real app, this would come from an API
  const businesses = [
    {
      id: '1',
      name: 'Café Hometown',
      category: 'Café & Coffee Shop',
      status: 'active',
      views: 842,
      rating: 4.7,
      reviewCount: 92,
      isActive: true
    },
    {
      id: '2',
      name: 'Corner Bakery',
      category: 'Bakery & Pastry Shop',
      status: 'active',
      views: 406,
      rating: 4.3,
      reviewCount: 48,
      isActive: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Businesses</h2>
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{businesses.length}</span> businesses
        </div>
      </div>
      
      <BusinessGrid businesses={businesses} />
    </div>
  );
}