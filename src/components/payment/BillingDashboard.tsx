import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Zap,
  Database,
  Clock
} from 'lucide-react';
import { usePaymentStore } from '@/stores/paymentStore';

export const BillingDashboard = () => {
  const { subscription, usage } = usePaymentStore();

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Subscription Overview
            </CardTitle>
            <Badge variant={subscription?.status === 'active' ? 'default' : 'destructive'}>
              {subscription?.status?.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <p className="text-2xl font-bold capitalize">{subscription?.plan}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Cost</p>
              <p className="text-2xl font-bold">
                {subscription ? formatCurrency(subscription.price, subscription.currency) : '--'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Billing</p>
              <p className="text-lg font-semibold">
                {subscription?.currentPeriodEnd.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline">Upgrade Plan</Button>
            <Button variant="ghost">Manage Payment Methods</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-blue-500" />
              Agent Minutes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: {usage?.agentMinutes.toLocaleString()}</span>
                <span>Limit: {usage?.limits.agentMinutes.toLocaleString()}</span>
              </div>
              <Progress 
                value={usage ? getUsagePercentage(usage.agentMinutes, usage.limits.agentMinutes) : 0}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {usage ? getUsagePercentage(usage.agentMinutes, usage.limits.agentMinutes) : 0}% used this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-yellow-500" />
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: {usage?.apiCalls.toLocaleString()}</span>
                <span>Limit: {usage?.limits.apiCalls.toLocaleString()}</span>
              </div>
              <Progress 
                value={usage ? getUsagePercentage(usage.apiCalls, usage.limits.apiCalls) : 0}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {usage ? getUsagePercentage(usage.apiCalls, usage.limits.apiCalls) : 0}% used this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-green-500" />
              Data Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: {usage?.dataProcessed}GB</span>
                <span>Limit: {usage?.limits.dataProcessed}GB</span>
              </div>
              <Progress 
                value={usage ? getUsagePercentage(usage.dataProcessed, usage.limits.dataProcessed) : 0}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {usage ? getUsagePercentage(usage.dataProcessed, usage.limits.dataProcessed) : 0}% used this month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Payment Methods
            </CardTitle>
            <Button variant="outline">Add Payment Method</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25 • Stripe</p>
                </div>
              </div>
              <Badge variant="outline">Default</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="font-medium">Alipay Account</p>
                  <p className="text-sm text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', description: 'Professional Plan - Monthly', amount: '$99.99', status: 'completed' },
              { date: '2024-01-10', description: 'Additional Agent Minutes', amount: '$25.00', status: 'completed' },
              { date: '2023-12-15', description: 'Professional Plan - Monthly', amount: '$99.99', status: 'completed' },
              { date: '2023-12-05', description: 'API Calls Overage', amount: '$15.50', status: 'completed' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};