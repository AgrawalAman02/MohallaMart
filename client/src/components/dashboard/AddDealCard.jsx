import { Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AddDealCard() {
  const navigate = useNavigate();
  
  return (
    <Card className="border-dashed flex items-center justify-center h-full min-h-[250px]">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Tag className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="font-medium mb-2">Create New Deal</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Attract more customers with special offers and promotions
        </p>
        <Button onClick={() => navigate('/business/deals/new')}>Create Deal</Button>
      </CardContent>
    </Card>
  );
}