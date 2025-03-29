import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AddBusinessCard() {
  const navigate = useNavigate();
  
  return (
    <Card className="border-dashed flex items-center justify-center h-full min-h-[200px]">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="font-medium mb-2">Add a New Business</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create a new business profile to showcase on MohallaMart
        </p>
        <Button onClick={() => navigate('/business/new')}>
          Add Business
        </Button>
      </CardContent>
    </Card>
  );
}