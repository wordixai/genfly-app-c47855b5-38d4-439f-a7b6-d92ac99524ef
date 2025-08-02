import { 
  Bot, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Database,
  Zap,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: "Core",
    items: [
      { title: "Dashboard", url: "/", icon: BarChart3 },
      { title: "Agents", url: "/agents", icon: Bot },
      { title: "Tasks & Workflows", url: "/tasks", icon: Zap },
      { title: "Live Data", url: "/data", icon: Database },
    ],
  },
  {
    title: "Engagement",
    items: [
      { title: "Fan Interactions", url: "/interactions", icon: MessageSquare },
      { title: "Content Calendar", url: "/calendar", icon: Calendar },
      { title: "Team Collaboration", url: "/team", icon: Users },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Billing & Usage", url: "/billing", icon: CreditCard },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent>
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};