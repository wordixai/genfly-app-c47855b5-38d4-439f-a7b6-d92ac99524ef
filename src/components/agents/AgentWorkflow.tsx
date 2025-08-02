import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar,
  Clock,
  AlertTriangle
} from 'lucide-react';

const workflows = [
  {
    id: '1',
    name: 'Daily Content Generation',
    agent: 'Sophia AI',
    status: 'running',
    progress: 75,
    schedule: 'Every day at 9:00 AM',
    lastRun: '2 hours ago',
    nextRun: '22 hours',
    tasks: ['Generate Instagram posts', 'Create captions', 'Schedule posts']
  },
  {
    id: '2', 
    name: 'Live Sports Analysis',
    agent: 'Marcus Sports',
    status: 'active',
    progress: 100,
    schedule: 'Real-time during games',
    lastRun: '5 minutes ago',
    nextRun: 'Live event',
    tasks: ['Process game data', 'Generate insights', 'Update fans']
  },
  {
    id: '3',
    name: 'Fan Engagement Automation',
    agent: 'Multiple Agents',
    status: 'paused',
    progress: 0,
    schedule: 'Trigger-based',
    lastRun: '1 day ago',
    nextRun: 'On demand',
    tasks: ['Respond to comments', 'Send personalized messages', 'Update preferences']
  }
];

export const AgentWorkflow = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agent Workflows</h2>
        <Button className="ai-gradient">
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {workflow.agent}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadge(workflow.status)}>
                    {workflow.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      {workflow.status === 'running' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {workflow.status === 'running' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{workflow.progress}%</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Schedule</p>
                    <p className="text-muted-foreground">{workflow.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Last Run</p>
                    <p className="text-muted-foreground">{workflow.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Next Run</p>
                    <p className="text-muted-foreground">{workflow.nextRun}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Tasks:</p>
                <div className="flex flex-wrap gap-2">
                  {workflow.tasks.map((task, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};