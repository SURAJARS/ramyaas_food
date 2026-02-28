import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with cache-busting configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

// Interceptor to add cache-busting query parameter
axiosInstance.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime() // Add timestamp to prevent caching
    };
  }
  return config;
});

// Interceptor to handle 304 responses
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 304) {
      // 304 means data hasn't changed - resolve with empty array
      error.response.data = [];
      return error.response;
    }
    return Promise.reject(error);
  }
);

// Snacks API
export const snackApi = {
  getAll: (admin = false) => axiosInstance.get(`/snacks`, { params: { ...(admin && { all: true }) } }),
  getById: (id) => axiosInstance.get(`/snacks/${id}`),
  create: (data) => axiosInstance.post(`/snacks`, data),
  update: (id, data) => axiosInstance.put(`/snacks/${id}`, data),
  delete: (id) => axiosInstance.delete(`/snacks/${id}`)
};

// Menu API
export const menuApi = {
  getAll: () => axiosInstance.get(`/menu`),
  create: (data) => axiosInstance.post(`/menu`, data),
  update: (id, data) => axiosInstance.put(`/menu/${id}`, data),
  delete: (id) => axiosInstance.delete(`/menu/${id}`)
};

// Reels API
export const reelsApi = {
  getAll: () => axiosInstance.get(`/reels`),
  create: (data) => axiosInstance.post(`/reels`, data),
  update: (id, data) => axiosInstance.put(`/reels/${id}`, data),
  delete: (id) => axiosInstance.delete(`/reels/${id}`)
};

// Catering API
export const cateringApi = {
  getAll: () => axiosInstance.get(`/catering`),
  create: (data) => axiosInstance.post(`/catering`, data),
  update: (id, data) => axiosInstance.put(`/catering/${id}`, data),
  delete: (id) => axiosInstance.delete(`/catering/${id}`)
};

// Bulk Orders API
export const bulkOrderApi = {
  getAll: () => axiosInstance.get(`/bulk-orders`),
  create: (data) => axiosInstance.post(`/bulk-orders`, data),
  update: (id, data) => axiosInstance.put(`/bulk-orders/${id}`, data),
  delete: (id) => axiosInstance.delete(`/bulk-orders/${id}`)
};

// Coupons API
export const couponApi = {
  getAll: () => axiosInstance.get(`/coupons`),
  getByCode: (code) => axiosInstance.get(`/coupons/code/${code}`),
  create: (data) => axiosInstance.post(`/coupons`, data),
  update: (id, data) => axiosInstance.put(`/coupons/${id}`, data),
  delete: (id) => axiosInstance.delete(`/coupons/${id}`)
};

// Shipping API
export const shippingApi = {
  getConfig: () => axiosInstance.get(`/shipping`),
  updateConfig: (data) => axiosInstance.put(`/shipping`, data)
};

// Enquiries API
export const enquiryApi = {
  getAll: () => axiosInstance.get(`/enquiries`),
  create: (data) => axiosInstance.post(`/enquiries`, data),
  update: (id, data) => axiosInstance.put(`/enquiries/${id}`, data),
  delete: (id) => axiosInstance.delete(`/enquiries/${id}`)
};

// Orders API
export const orderApi = {
  create: (data) => axiosInstance.post(`/orders`, data),
  verifyPayment: (data) => axiosInstance.post(`/orders/verify`, data),
  getAll: () => axiosInstance.get(`/orders`),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  updateStatus: (id, data) => axiosInstance.put(`/orders/${id}`, data)
};
