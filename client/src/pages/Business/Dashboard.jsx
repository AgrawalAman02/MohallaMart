import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '@/features/auth/authSlice';
import { Header } from '@/components/header/Header';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { SummaryStats } from '@/components/dashboard/SummaryStats';
import { RevenueChart } from '@/components/dashboard/RevenueChart';

export function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Check if user is logged in and is a business-owner
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user && user.role !== 'business-owner') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || (user && user.role !== 'business-owner')) {
    return null; // Don't render anything if not authenticated or not a business owner
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <DashboardHeader />
          
          <SummaryStats />
          
          <div className="mb-8">
            <RevenueChart />
          </div>
          
          <DashboardTabs />
        </div>
      </main>
    </div>
  );
}