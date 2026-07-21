import api from './api';

export const withdrawalService = {
  getWithdrawals: async () => {
    const response = await api.get('/withdrawals');
    return response.data.data;
  },

  createWithdrawal: async (amount: number, method: string, walletAddress?: string) => {
    const response = await api.post('/withdrawals', {
      amount,
      method,
      walletAddress,
    });
    return response.data.data;
  },
};
