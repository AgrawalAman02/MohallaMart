import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Revenue Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-primary mr-1"></div>
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-muted mr-1"></div>
            <span className="text-xs text-muted-foreground">Customers</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full bg-muted/20 rounded-md flex flex-col items-center justify-center">
          <p className="text-muted-foreground">Revenue data visualization will be displayed here</p>
          <p className="text-xs text-muted-foreground mt-2">Integration with chart libraries coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}