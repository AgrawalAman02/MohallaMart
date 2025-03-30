import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Search, Filter, MapIcon, Menu, Sparkles, TrendingUp, Gift, Star } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Dark mode optimized grid background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-slate-800/30 bg-[size:40px_40px] animate-grid-flow" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
          </div>

          {/* Enhanced dark mode background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-3xl opacity-30 animate-subtle-pulse"
            />
            <div 
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-normal filter blur-3xl opacity-30 animate-subtle-pulse-reverse"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto relative z-10"
          >
            {/* Enhanced Hero Section */}
            <div className="mb-16 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <Sparkles className="h-6 w-6 text-indigo-400" />
                <span className="text-md font-semibold text-indigo-400 uppercase tracking-wider">Your Local Marketplace</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"
              >
                Discover & Support Local Businesses
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Connect with your community, discover unique experiences, and empower local entrepreneurs right in your neighborhood.
              </motion.p>

              {/* Enhanced Search Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
              >
                <div className="relative flex-1 w-full">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                  <Input
                    type="search"
                    placeholder="Search nearby businesses..."
                    className="w-full text-white pl-10 pr-4 h-12 text-lg bg-slate-800/50 backdrop-blur-lg border-slate-700 focus:ring-indigo-500 rounded-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="default" size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-full">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="lg" className="bg-slate-800/50 backdrop-blur-lg hover:bg-slate-700/50 rounded-full border-slate-700">
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
            >
              {[
                { label: 'Local Businesses', value: '500+' },
                { label: 'Happy Customers', value: '10k+' },
                { label: 'Active Deals', value: '100+' },
                { label: 'Communities', value: '50+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-slate-800/50 backdrop-blur-lg border border-slate-700/50"
                >
                  <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* /* Categories Section with Enhanced Design */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center text-slate-100">Popular Categories</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category, index) => (
                      <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 * index }}
                      >
                      <Button
                        variant={category === 'All' ? "default" : "outline"}
                        size="lg"
                        className={`rounded-full ${
                        category === 'All' 
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700' 
                          : 'bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:bg-slate-700/50 text-slate-300'
                        }`}
                      >
                        {category}
                      </Button>
                      </motion.div>
                    ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Tabs Section */}
            <Tabs defaultValue="recommended" className="mb-12">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 rounded-full p-1 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 text-slate-200">
                <TabsTrigger value="recommended" className="rounded-full data-[state=active]:bg-indigo-600/20 data-[state=active]:text-white">
                  <Star className="h-4 w-4 mr-2" />
                  Recommended
                </TabsTrigger>
                <TabsTrigger value="trending" className="rounded-full data-[state=active]:bg-indigo-600/20 data-[state=active]:text-white">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="deals" className="rounded-full data-[state=active]:bg-indigo-600/20 data-[state=active]:text-white">
                  <Gift className="h-4 w-4 mr-2" />
                  Deals
                </TabsTrigger>
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
          </motion.div>
        </section>
      </main>

      {/* Update dark mode grid and animation styles */}
      <style jsx global>{`
        .bg-grid-slate-800\/30 {
          background-image: linear-gradient(to right, rgb(30 41 59 / 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(30 41 59 / 0.3) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
          mask-image: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.1) 60%,
            transparent 100%
          );
        }
        @keyframes grid-flow {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes subtle-pulse {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
          100% { opacity: 0.2; transform: scale(1); }
        }
        @keyframes subtle-pulse-reverse {
          0% { opacity: 0.3; transform: scale(1.05); }
          50% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.3; transform: scale(1.05); }
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 10s ease-in-out infinite;
        }
        .animate-subtle-pulse-reverse {
          animation: subtle-pulse-reverse 10s ease-in-out infinite;
        }

        /* Add new styles for focus states */
        *:focus-visible {
          outline: 2px solid rgb(99 102 241 / 0.5);
          outline-offset: 2px;
        }

        /* Update tab trigger active state */
        [data-state='active'] {
          background: linear-gradient(to right, rgb(99 102 241 / 0.2), rgb(59 130 246 / 0.2));
          border-color: rgb(99 102 241 / 0.3);
        }
      `}</style>
    </div>
  );
}