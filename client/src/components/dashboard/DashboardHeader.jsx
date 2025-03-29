import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function DashboardHeader() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'Business Owner'}
        </p>
      </div>
      <Button onClick={() => navigate('/business/new')}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Business
      </Button>
    </div>
  );
}