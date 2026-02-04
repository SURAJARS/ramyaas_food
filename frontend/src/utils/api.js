import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Snacks API
export const snackApi = {
  getAll: (admin = false) => axios.get(`${API_BASE_URL}/snacks${admin ? '?all=true' : ''}`),
  getById: (id) => axios.get(`${API_BASE_URL}/snacks/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/snacks`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/snacks/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/snacks/${id}`)
};

// Menu API
export const menuApi = {
  getAll: () => axios.get(`${API_BASE_URL}/menu`),
  create: (data) => axios.post(`${API_BASE_URL}/menu`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/menu/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/menu/${id}`)
};

// Reels API
export const reelsApi = {
  getAll: () => axios.get(`${API_BASE_URL}/reels`),
  create: (data) => axios.post(`${API_BASE_URL}/reels`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/reels/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/reels/${id}`)
};

// Catering API
export const cateringApi = {
  getAll: () => axios.get(`${API_BASE_URL}/catering`),
  create: (data) => axios.post(`${API_BASE_URL}/catering`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/catering/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/catering/${id}`)
};

// Bulk Orders API
export const bulkOrderApi = {
  getAll: () => axios.get(`${API_BASE_URL}/bulk-orders`),
  create: (data) => axios.post(`${API_BASE_URL}/bulk-orders`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/bulk-orders/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/bulk-orders/${id}`)
};

// Coupons API
export const couponApi = {
  getAll: () => axios.get(`${API_BASE_URL}/coupons`),
  getByCode: (code) => axios.get(`${API_BASE_URL}/coupons/code/${code}`),
  create: (data) => axios.post(`${API_BASE_URL}/coupons`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/coupons/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/coupons/${id}`)
};

// Shipping API
export const shippingApi = {
  getConfig: () => axios.get(`${API_BASE_URL}/shipping`),
  updateConfig: (data) => axios.put(`${API_BASE_URL}/shipping`, data)
};

// Enquiries API
export const enquiryApi = {
  getAll: () => axios.get(`${API_BASE_URL}/enquiries`),
  create: (data) => axios.post(`${API_BASE_URL}/enquiries`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/enquiries/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/enquiries/${id}`)
};

// Orders API
export const orderApi = {
  create: (data) => axios.post(`${API_BASE_URL}/orders`, data),
  verifyPayment: (data) => axios.post(`${API_BASE_URL}/orders/verify`, data),
  getAll: () => axios.get(`${API_BASE_URL}/orders`),
  getById: (id) => axios.get(`${API_BASE_URL}/orders/${id}`),
  updateStatus: (id, data) => axios.put(`${API_BASE_URL}/orders/${id}`, data)
};
