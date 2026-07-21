import api from './api';
import { User } from '@/types';

export const authService = {
  register: async (email: string, password: string, firstName: string, lastName: string, referralCode?: string) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
      referralCode,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data.data;
  },
};
