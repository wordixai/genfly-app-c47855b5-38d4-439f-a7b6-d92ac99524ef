import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  type: 'supermodel' | 'sports-analyst' | 'content-creator' | 'custom';
  status: 'active' | 'idle' | 'training' | 'error';
  personality: {
    traits: string[];
    tone: 'friendly' | 'professional' | 'casual' | 'expert';
    specialization: string;
  };
  capabilities: string[];
  lastActive: Date;
  performance: {
    accuracy: number;
    responseTime: number;
    userSatisfaction: number;
  };
  model: string;
  version: string;
  config: Record<string, any>;
}

export interface AgentTask {
  id: string;
  agentId: string;
  type: 'content-generation' | 'data-analysis' | 'user-interaction' | 'scheduled';
  status: 'pending' | 'running' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  input: any;
  output?: any;
  createdAt: Date;
  completedAt?: Date;
  estimatedDuration: number;
}

interface AgentStore {
  agents: Agent[];
  tasks: AgentTask[];
  selectedAgent: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addAgent: (agent: Omit<Agent, 'id' | 'lastActive'>) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  selectAgent: (id: string | null) => void;
  
  addTask: (task: Omit<AgentTask, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<AgentTask>) => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [
    {
      id: '1',
      name: 'Sophia AI',
      type: 'supermodel',
      status: 'active',
      personality: {
        traits: ['Charismatic', 'Engaging', 'Fashionable'],
        tone: 'friendly',
        specialization: 'Fashion & Lifestyle Content'
      },
      capabilities: ['Content Creation', 'Fan Interaction', 'Brand Partnerships'],
      lastActive: new Date(),
      performance: {
        accuracy: 98.5,
        responseTime: 1.2,
        userSatisfaction: 4.9
      },
      model: 'GPT-4',
      version: '2.1.0',
      config: { temperature: 0.7, maxTokens: 2048 }
    },
    {
      id: '2',
      name: 'Marcus Sports',
      type: 'sports-analyst',
      status: 'active',
      personality: {
        traits: ['Analytical', 'Knowledgeable', 'Enthusiastic'],
        tone: 'expert',
        specialization: 'Real-time Sports Analysis'
      },
      capabilities: ['Live Data Processing', 'Predictive Analysis', 'Fan Engagement'],
      lastActive: new Date(),
      performance: {
        accuracy: 94.2,
        responseTime: 0.8,
        userSatisfaction: 4.7
      },
      model: 'Claude-3',
      version: '1.8.0',
      config: { temperature: 0.3, maxTokens: 1536 }
    }
  ],
  tasks: [],
  selectedAgent: null,
  isLoading: false,
  error: null,

  addAgent: (agentData) => set((state) => ({
    agents: [...state.agents, {
      ...agentData,
      id: `agent_${Date.now()}`,
      lastActive: new Date()
    }]
  })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    )
  })),

  deleteAgent: (id) => set((state) => ({
    agents: state.agents.filter(agent => agent.id !== id),
    selectedAgent: state.selectedAgent === id ? null : state.selectedAgent
  })),

  selectAgent: (id) => set({ selectedAgent: id }),

  addTask: (taskData) => set((state) => ({
    tasks: [...state.tasks, {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date()
    }]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));