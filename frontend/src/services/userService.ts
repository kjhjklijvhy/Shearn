import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/users/me', data);
    return response.data.data;
  },

  getNotifications: async () => {
    const response = await api.get('/users/notifications');
    return response.data.data;
  },
};
