import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ReviewsPanel() {
  // In a real app, you'd fetch this data from an API
  const reviews = [
    {
      id: '1',
      user: 'Priya Sharma',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      businessName: 'Café Hometown',
      rating: 5,
      date: '2 days ago',
      content: 'Absolutely love this place! The coffee is amazing and the service is excellent. Will definitely be coming back regularly.',
      sentiment: 'positive',
      likes: 7,
      replied: true
    },
    {
      id: '2',
      user: 'Rahul Verma',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      businessName: 'Corner Bakery',
      rating: 4,
      date: '1 week ago',
      content: 'Great bakery, their bread is freshly baked and absolutely delicious. Only giving 4 stars because it can get a bit crowded during peak hours.',
      sentiment: 'neutral',
      likes: 3,
      replied: false
    },
    {
      id: '3',
      user: 'Deepa Patel',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      businessName: 'Café Hometown',
      rating: 3,
      date: '2 weeks ago',
      content: 'The coffee was decent, but the place was quite noisy. The staff were friendly though, so thats a plus.',
      sentiment: 'neutral',
      likes: 1,
      replied: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">All: 27</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Positive: 21</Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">Neutral: 4</Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">Negative: 2</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} alt={review.user} />
                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.user}</p>
                    <p className="text-sm text-muted-foreground">
                      Reviewed: <span className="font-medium">{review.businessName}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              
              <p className="text-sm mb-4">{review.content}</p>
              
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{review.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </Button>
                </div>
                <Badge
                  variant="outline"
                  className={
                    review.sentiment === 'positive' ? 'bg-green-50 text-green-700 border-green-200' :
                    review.sentiment === 'negative' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }
                >
                  {review.sentiment}
                </Badge>
              </div>
              
              {review.replied && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">You replied</Badge>
                    <div className="text-sm text-muted-foreground">
                      Thank you for your feedback! We're glad you enjoyed your experience and look forward to serving you again.
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        <Button variant="outline" className="w-full">
          View All Reviews
        </Button>
      </div>
    </div>
  );
}