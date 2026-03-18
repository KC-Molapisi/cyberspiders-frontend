import api from './client';

export const licensingApi = {
  verify: (payload) => api.post('/licensing/verify', payload),
  apply: (payload) => api.post('/licensing/applications', payload),
};

export const contentApi = {
  notices: () => api.get('/content/notices'),
  services: () => api.get('/content/services'),
  about: () => api.get('/content/about'),
};

export const contactApi = {
  submitEnquiry: (payload) => api.post('/contact', payload),
};
