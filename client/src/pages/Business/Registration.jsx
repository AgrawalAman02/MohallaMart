import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RegisterBusinessButton() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.role !== 'business-owner') {
    return null;
  }

  return (
    <Button 
      onClick={() => navigate('/register-business')}
      className="flex items-center gap-2"
    >
      <Store className="h-4 w-4" />
      Register Your Business
    </Button>
  );
}