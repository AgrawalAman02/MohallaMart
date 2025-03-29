import { Users, BarChart, Tag, ShoppingBag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SummaryStats() {
  // In a real app, you would fetch this data from an API
  const statsData = {
    totalViews: {
      value: 1248,
      change: 12,
      subtitle: 'from last month'
    },
    engagement: {
      value: 324,
      change: 4,
      subtitle: 'from last month'
    },
    activeDeals: {
      value: 3,
      change: 2,
      subtitle: 'ending this week'
    },
    totalSales: {
      value: '₹42.5k',
      change: 18,
      subtitle: 'from last month'
    },
    businesses: {
      value: 2,
      change: 0,
      subtitle: 'active businesses'
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
      <StatCard 
        title="Total Views" 
        value={statsData.totalViews.value} 
        change={statsData.totalViews.change} 
        subtitle={statsData.totalViews.subtitle}
        icon={<Users className="h-4 w-4 text-muted-foreground" />} 
      />
      
      <StatCard 
        title="Engaged Users" 
        value={statsData.engagement.value} 
        change={statsData.engagement.change} 
        subtitle={statsData.engagement.subtitle}
        icon={<BarChart className="h-4 w-4 text-muted-foreground" />} 
      />
      
      <StatCard 
        title="Active Deals" 
        value={statsData.activeDeals.value} 
        change={statsData.activeDeals.change}
        subtitle={statsData.activeDeals.subtitle}
        icon={<Tag className="h-4 w-4 text-muted-foreground" />} 
      />
      
      <StatCard 
        title="Total Sales" 
        value={statsData.totalSales.value} 
        change={statsData.totalSales.change} 
        subtitle={statsData.totalSales.subtitle}
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} 
      />
      
      <StatCard 
        title="Businesses" 
        value={statsData.businesses.value} 
        change={statsData.businesses.change}
        subtitle={statsData.businesses.subtitle}
        icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />} 
      />
    </div>
  );
}

// Reusable stat card component
function StatCard({ title, value, change, icon, subtitle }) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          <span className={
            isPositive ? "text-green-600" : 
            isNeutral ? "text-gray-500" : 
            "text-red-600"
          }>
            {isPositive && '+'}{change}{change !== 0 && '%'}
          </span>
          <span className="text-muted-foreground ml-1">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
}