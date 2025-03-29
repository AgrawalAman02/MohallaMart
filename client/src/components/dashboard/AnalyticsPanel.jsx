import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AnalyticsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Demographics</CardTitle>
          <CardDescription>Overview of your customer segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Demographic charts will be displayed here</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <p className="text-3xl font-bold">65%</p>
              <p className="text-xs text-muted-foreground">Returning</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25%</p>
              <p className="text-xs text-muted-foreground">New</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10%</p>
              <p className="text-xs text-muted-foreground">Subscribers</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>How customers find your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Traffic source charts will be displayed here</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            <div>
              <p className="text-2xl font-bold">45%</p>
              <p className="text-xs text-muted-foreground">Direct</p>
            </div>
            <div>
              <p className="text-2xl font-bold">25%</p>
              <p className="text-xs text-muted-foreground">Search</p>
            </div>
            <div>
              <p className="text-2xl font-bold">20%</p>
              <p className="text-xs text-muted-foreground">Social</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10%</p>
              <p className="text-xs text-muted-foreground">Referral</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Revenue chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}