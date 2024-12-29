import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const { data } = await api.post('/auth/login', formData);
    return data;
  },
  register: async (username: string, password: string) => {
    const { data } = await api.post('/auth/register', { username, password });
    return data;
  },
};

export const documents = {
  list: async () => {
    const { data } = await api.get('/documents');
    return data;
  },
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/documents', formData);
    return data;
  },
  delete: async (id: number) => {
    await api.delete(`/documents/${id}`);
  },
};

export const chats = {
  create: async (title: string, parentId?: number) => {
    const { data } = await api.post('/chats', { title, parent_id: parentId });
    return data;
  },
  getTree: async () => {
    const { data } = await api.get('/chats/tree');
    return data;
  },
  getHistory: async (chatId: number) => {
    const { data } = await api.get(`/chats/${chatId}/history`);
    return data;
  },
  sendMessage: async (chatId: number, message: string) => {
    const { data } = await api.post(`/chats/${chatId}/messages`, { message });
    return data;
  },
  streamMessage: async (chatId: number, message: string) => {
    const response = await api.post(`/chats/${chatId}/messages/stream`, { message }, {
      responseType: 'stream',
    });
    return response.data;
  },
};

export const llmConfigs = {
  list: async () => {
    const { data } = await api.get('/user-llm-configs');
    return data;
  },
  create: async (config: any) => {
    const { data } = await api.post('/user-llm-configs', config);
    return data;
  },
  getDefault: async () => {
    const { data } = await api.get('/user-llm-configs/default');
    return data;
  },
};

export default api;