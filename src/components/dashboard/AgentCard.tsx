import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MoreVertical, 
  Play, 
  Pause, 
  Settings,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Agent } from '@/stores/agentStore';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onToggle: (id: string) => void;
}

export const AgentCard = ({ agent, onEdit, onToggle }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'training': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'supermodel': return '👑';
      case 'sports-analyst': return '⚽';
      case 'content-creator': return '💝';
      default: return '🤖';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getTypeIcon(agent.type)}</div>
            <div>
              <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                <span className="text-sm text-muted-foreground capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(agent)}>
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggle(agent.id)}>
                {agent.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge variant="outline" className="text-xs">
          {agent.personality.specialization}
        </Badge>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Performance</span>
            <span className="font-medium">{agent.performance.accuracy}%</span>
          </div>
          <Progress value={agent.performance.accuracy} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mb-1" />
            <span className="font-medium">{agent.performance.userSatisfaction}</span>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-4 w-4 text-blue-500 mb-1" />
            <span className="font-medium">{agent.performance.responseTime}s</span>
            <span className="text-xs text-muted-foreground">Response</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-4 w-4 text-purple-500 mb-1" />
            <span className="font-medium">{Math.floor(Math.random() * 1000)}+</span>
            <span className="text-xs text-muted-foreground">Interactions</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Model: {agent.model} • Version: {agent.version}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};