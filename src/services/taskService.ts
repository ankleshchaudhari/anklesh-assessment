import api from '@/lib/api';

export const taskService = {
  getTasks: async (page = 1, limit = 10, status?: string, title?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status && status !== 'all') params.append('status', status);
    if (title) params.append('title', title);

    const { data } = await api.get(`/tasks?${params.toString()}`);
    return data;
  },

  createTask: async (title: string, description?: string) => {
    const { data } = await api.post('/tasks', { title, description });
    return data;
  },

  updateTask: async (id: string, title: string, description?: string) => {
    const { data } = await api.patch(`/tasks/${id}`, { title, description });
    return data;
  },

  toggleTaskStatus: async (id: string) => {
    const { data } = await api.patch(`/tasks/${id}/toggle`);
    return data;
  },

  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  }
};
