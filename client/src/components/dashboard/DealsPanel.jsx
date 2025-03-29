import { DealsList } from '@/components/dashboard/DealsList';

export function DealsPanel() {
  // In a real app, you'd fetch this data from an API
  const deals = [
    {
      id: '1',
      title: '20% Off Morning Coffee',
      businessName: 'Café Hometown',
      description: 'Get 20% off any coffee from 7AM to 10AM',
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      redemptions: 34,
      impressions: 420,
      status: 'active'
    },
    {
      id: '2',
      title: 'Buy One Get One Free',
      businessName: 'Corner Bakery',
      description: 'Buy one pastry, get one free on Wednesdays',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      redemptions: 27,
      impressions: 315,
      status: 'active'
    },
    {
      id: '3',
      title: 'Half-Price Croissants',
      businessName: 'Corner Bakery',
      description: 'Get any croissant for half price',
      startDate: '2024-05-01',
      endDate: '2024-06-01',
      redemptions: 0,
      impressions: 0,
      status: 'upcoming'
    }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Your Promotions</h2>
      <DealsList deals={deals} />
    </div>
  );
}