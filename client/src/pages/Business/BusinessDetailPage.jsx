import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Phone, Globe, Clock, Calendar, Tag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header/Header';

export function BusinessDetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  // Mock data
  const business = {
    id,
    name: 'Cafe Hometown',
    category: 'cafe',
    description: 'A cozy neighborhood cafe serving artisanal coffee, pastries, and light meals. Our ingredients are locally sourced and our coffee beans are freshly roasted.',
    rating: 4.7,
    reviewCount: 142,
    address: '123 Main Street, Neighborhood',
    phone: '+1 (555) 123-4567',
    website: 'www.cafehometown.com',
    hours: {
      monday: { open: '7:00 AM', close: '8:00 PM' },
      tuesday: { open: '7:00 AM', close: '8:00 PM' },
      wednesday: { open: '7:00 AM', close: '8:00 PM' },
      thursday: { open: '7:00 AM', close: '8:00 PM' },
      friday: { open: '7:00 AM', close: '9:00 PM' },
      saturday: { open: '8:00 AM', close: '9:00 PM' },
      sunday: { open: '8:00 AM', close: '7:00 PM' },
    },
    isOpen: true,
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047',
      'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070',
    ],
    deals: [
      {
        id: '1',
        title: '20% Off Breakfast Items',
        description: 'Valid from 7:00 AM to 10:00 AM',
        validUntil: '2024-04-15',
        discountType: 'percentage',
        discountValue: 20
      },
      {
        id: '2',
        title: 'Buy One Get One Free - Coffee',
        description: 'Every Wednesday for loyalty members',
        validUntil: '2024-05-30',
        discountType: 'bogo',
      }
    ],
    reviews: [
      {
        id: '1',
        user: 'John D.',
        rating: 5,
        date: '2 weeks ago',
        text: 'Absolutely love this place! The coffee is amazing and the staff is always friendly. Great atmosphere for working or meeting friends.',
        sentiment: 'positive'
      },
      {
        id: '2',
        user: 'Sara M.',
        rating: 4,
        date: '1 month ago',
        text: 'Good food and coffee. Can get a bit crowded during peak hours. The pastries are definitely worth trying.',
        sentiment: 'neutral'
      },
      {
        id: '3',
        user: 'Michael L.',
        rating: 5,
        date: '2 months ago',
        text: 'My favorite place in the neighborhood. Their cappuccino is the best I\'ve had in town!',
        sentiment: 'positive'
      }
    ]
  };
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-2">
              <img 
                src={business.images[activeImage]} 
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
                  {activeImage + 1} / {business.images.length}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {business.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative rounded-md overflow-hidden h-16 w-16 flex-shrink-0 transition-opacity ${
                    activeImage === idx ? 'ring-2 ring-primary' : 'opacity-70'
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Business Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">{business.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{business.category}</Badge>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{business.rating}</span>
                    <span className="ml-1">({business.reviewCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span className={business.isOpen ? "text-green-600" : "text-rose-600"}>
                    {business.isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{business.address}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Save</Button>
                <Button size="sm">Contact</Button>
              </div>
            </div>
            <p className="text-muted-foreground">{business.description}</p>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="info" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`https://${business.website}`} target="_blank" rel="noreferrer" className="text-primary">
                      {business.website}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{business.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-1">
                      <span className={`capitalize ${day === today ? 'font-medium' : ''}`}>
                        {day}
                        {day === today && <span className="ml-2 text-xs text-green-600">(Today)</span>}
                      </span>
                      <span>{hours.open} - {hours.close}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map view will be implemented here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="deals" className="mt-4">
              <div className="space-y-4">
                {business.deals.length > 0 ? (
                  business.deals.map(deal => (
                    <Card key={deal.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Tag className="h-4 w-4 text-primary" />
                              <h3 className="font-semibold">{deal.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{deal.description}</p>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button size="sm">Claim</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No active deals at the moment</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-muted-foreground ml-1">({business.reviewCount} reviews)</span>
                  </div>
                </div>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </div>
              
              <div className="space-y-4">
                {business.reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                          />
                        ))}
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            review.sentiment === 'positive' ? 'text-green-600 border-green-600' : 
                            review.sentiment === 'negative' ? 'text-rose-600 border-rose-600' :
                            'text-muted-foreground'
                          }`}
                        >
                          {review.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}