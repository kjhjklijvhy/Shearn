import api from './api';
import { Investment } from '@/types';

export const investmentService = {
  getInvestments: async () => {
    const response = await api.get('/investments');
    return response.data.data;
  },

  createInvestment: async (amount: number) => {
    const response = await api.post('/investments', { amount });
    return response.data.data;
  },

  renewInvestment: async (investmentId: string) => {
    const response = await api.post(`/investments/${investmentId}/renew`);
    return response.data.data;
  },
};
