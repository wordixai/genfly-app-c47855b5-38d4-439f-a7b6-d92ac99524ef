import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Zap, 
  DollarSign, 
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';

const statsData = [
  {
    title: "Active Agents",
    value: "12",
    change: "+3 from last week",
    icon: Bot,
    color: "text-blue-500"
  },
  {
    title: "Tasks Completed",
    value: "1,847",
    change: "+12% from last month",
    icon: Zap,
    color: "text-green-500"
  },
  {
    title: "Fan Interactions",
    value: "24.8K",
    change: "+18% engagement rate",
    icon: Users,
    color: "text-purple-500"
  },
  {
    title: "Revenue Generated",
    value: "$12,458",
    change: "+8% from last month",
    icon: DollarSign,
    color: "text-emerald-500"
  }
];

const performanceData = [
  { label: "Response Time", value: 94, target: 95 },
  { label: "Accuracy", value: 98, target: 97 },
  { label: "Uptime", value: 99.9, target: 99.5 },
  { label: "User Satisfaction", value: 4.8, target: 4.5, isRating: true }
];

export const StatsCards = () => {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceData.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">
                    {metric.isRating ? `${metric.value}/5` : `${metric.value}%`}
                  </span>
                </div>
                <Progress 
                  value={metric.isRating ? (metric.value / 5) * 100 : metric.value} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Target: {metric.isRating ? `${metric.target}/5` : `${metric.target}%`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 min ago', event: 'Sophia AI completed content generation task', type: 'success' },
              { time: '5 min ago', event: 'Marcus Sports analyzed live game data', type: 'info' },
              { time: '12 min ago', event: 'New fan interaction processed', type: 'success' },
              { time: '18 min ago', event: 'Payment processed successfully', type: 'success' },
              { time: '25 min ago', event: 'Agent training completed', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};