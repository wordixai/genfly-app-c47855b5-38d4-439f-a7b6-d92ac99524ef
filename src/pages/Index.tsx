import { Header } from '@/components/layout/Header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { AgentWorkflow } from '@/components/agents/AgentWorkflow';
import { BillingDashboard } from '@/components/payment/BillingDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAgentStore } from '@/stores/agentStore';
import { Bot, BarChart3, Workflow, CreditCard } from 'lucide-react';

const Index = () => {
  const { agents, updateAgent } = useAgentStore();

  const handleToggleAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent) {
      updateAgent(id, { 
        status: agent.status === 'active' ? 'idle' : 'active' 
      });
    }
  };

  const handleEditAgent = (agent: any) => {
    console.log('Edit agent:', agent);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen neural-grid">
          <Header />
          
          <main className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                AI Agent Orchestration Platform
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your AI supermodels, analyze live sports data, and create memorable fan interactions
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  Agents
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center gap-2">
                  <Workflow className="h-4 w-4" />
                  Workflows
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <StatsCards />
              </TabsContent>

              <TabsContent value="agents" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map((agent) => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent} 
                      onEdit={handleEditAgent}
                      onToggle={handleToggleAgent}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="workflows" className="space-y-6">
                <AgentWorkflow />
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <BillingDashboard />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;