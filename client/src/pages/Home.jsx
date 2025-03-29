import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Search, Filter, MapIcon, Menu } from 'lucide-react';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header/Header';
import { BusinessCard } from '@/components/business/BusinessCard';

export function Home() {
  const [view, setView] = useState('list');
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  
  // Check if user is logged in as business owner and redirect if needed
  useEffect(() => {
    if (user && user.role === 'business-owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Mock data for development
  const categories = [
    'All', 'Restaurants', 'Cafes', 'Retail', 'Services', 'Groceries', 'Bakeries'
  ];
  
  const mockBusinesses = Array(8).fill().map((_, idx) => ({
    id: idx.toString(),
    name: `Local Business ${idx + 1}`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].toLowerCase(),
    rating: (3 + Math.random() * 2).toFixed(1),
    reviewCount: Math.floor(Math.random() * 150) + 10,
    image: `https://source.unsplash.com/random/300x200?business&sig=${idx}`,
    address: `${Math.floor(Math.random() * 999) + 1} Main Street, Neighborhood`,
    distance: `${(Math.random() * 1.5).toFixed(1)} km`,
    isOpen: Math.random() > 0.3,
    hasActiveDeals: Math.random() > 0.6
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-1">Discover Nearby</h1>
              <p className="text-muted-foreground">Support local businesses in your neighborhood</p>
            </div>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search nearby businesses..."
                  className="w-full pl-8 pr-4"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setView(view === 'list' ? 'map' : 'list')}>
                {view === 'list' ? <MapIcon className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="recommended" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
              </TabsList>
              <TabsContent value="recommended" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockBusinesses.slice().reverse().map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="deals" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockBusinesses.filter(b => b.hasActiveDeals).map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {view === 'map' && (
              <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Map view will be implemented here</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}