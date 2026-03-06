import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authService = {
  register: (email, password, userType, profile) =>
    api.post('/auth/register', { email, password, userType, profile }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  updateProfile: (profile) =>
    api.put('/auth/profile', profile),
};

// Jobs
export const jobService = {
  getJobs: (filters) =>
    api.get('/jobs', { params: filters }),
  getJobById: (id) =>
    api.get(`/jobs/${id}`),
  createJob: (jobData) =>
    api.post('/jobs', jobData),
  updateJob: (id, jobData) =>
    api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) =>
    api.delete(`/jobs/${id}`),
  placeBid: (jobId, bidData) =>
    api.post(`/jobs/${jobId}/bids`, bidData),
  getBids: (jobId) =>
    api.get(`/jobs/${jobId}/bids`),
};

// Plumbers
export const plumberService = {
  getPlumbers: (filters) =>
    api.get('/plumbers', { params: filters }),
  getPlumberById: (id) =>
    api.get(`/plumbers/${id}`),
  updatePlumber: (id, data) =>
    api.put(`/plumbers/${id}`, data),
  uploadCertificates: (id, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('certificates', file));
    return api.post(`/plumbers/${id}/certificates`, formData);
  },
};

// Forum
export const forumService = {
  getPosts: (filters) =>
    api.get('/forum/posts', { params: filters }),
  getPostById: (id) =>
    api.get(`/forum/posts/${id}`),
  createPost: (postData) =>
    api.post('/forum/posts', postData),
  updatePost: (id, postData) =>
    api.put(`/forum/posts/${id}`, postData),
  deletePost: (id) =>
    api.delete(`/forum/posts/${id}`),
  createComment: (postId, commentData) =>
    api.post(`/forum/posts/${postId}/comments`, commentData),
  deleteComment: (postId, commentId) =>
    api.delete(`/forum/posts/${postId}/comments/${commentId}`),
  likePost: (id) =>
    api.post(`/forum/posts/${id}/like`),
};

// Messages
export const messageService = {
  getConversations: () =>
    api.get('/messages/conversations'),
  getMessages: (conversationId) =>
    api.get(`/messages/conversations/${conversationId}`),
  sendMessage: (conversationId, message) =>
    api.post(`/messages/conversations/${conversationId}`, { message }),
  createConversation: (recipientId) =>
    api.post('/messages/conversations', { recipientId }),
};

// Payments
export const paymentService = {
  initiateMpesa: (jobId, amount) =>
    api.post('/payments/mpesa/initiate', { jobId, amount }),
  verifyPayment: (transactionId) =>
    api.get(`/payments/verify/${transactionId}`),
};

// Notifications
export const notificationService = {
  getNotifications: () =>
    api.get('/notifications'),
  markAsRead: (id) =>
    api.put(`/notifications/${id}/read`),
  markAllAsRead: () =>
    api.put('/notifications/read-all'),
};

export default api;
