import { create } from 'zustand';

export interface PaymentMethod {
  id: string;
  type: 'stripe' | 'digistore' | 'alipay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Subscription {
  id: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  price: number;
  currency: string;
}

export interface Usage {
  agentMinutes: number;
  apiCalls: number;
  dataProcessed: number;
  period: string;
  limits: {
    agentMinutes: number;
    apiCalls: number;
    dataProcessed: number;
  };
}

interface PaymentStore {
  paymentMethods: PaymentMethod[];
  subscription: Subscription | null;
  usage: Usage | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  updateSubscription: (subscription: Subscription) => void;
  updateUsage: (usage: Usage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentMethods: [],
  subscription: {
    id: 'sub_1',
    plan: 'professional',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false,
    price: 99.99,
    currency: 'USD'
  },
  usage: {
    agentMinutes: 1250,
    apiCalls: 8500,
    dataProcessed: 2.4,
    period: '2024-01',
    limits: {
      agentMinutes: 5000,
      apiCalls: 50000,
      dataProcessed: 10
    }
  },
  isLoading: false,
  error: null,

  addPaymentMethod: (method) => set((state) => ({
    paymentMethods: [...state.paymentMethods, {
      ...method,
      id: `pm_${Date.now()}`
    }]
  })),

  removePaymentMethod: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.filter(method => method.id !== id)
  })),

  setDefaultPaymentMethod: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }))
  })),

  updateSubscription: (subscription) => set({ subscription }),
  updateUsage: (usage) => set({ usage }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));