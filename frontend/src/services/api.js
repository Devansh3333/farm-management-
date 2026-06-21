import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Farm Services
export const farmService = {
  getAll: () => axios.get(`${API_BASE_URL}/farms`),
  getById: (id) => axios.get(`${API_BASE_URL}/farms/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/farms`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/farms/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/farms/${id}`),
};

// Sales Services
export const salesService = {
  getAll: () => axios.get(`${API_BASE_URL}/sales`),
  getById: (id) => axios.get(`${API_BASE_URL}/sales/${id}`),
  getByFarmId: (farmId) => axios.get(`${API_BASE_URL}/sales/farm/${farmId}`),
  create: (data) => axios.post(`${API_BASE_URL}/sales`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/sales/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/sales/${id}`),
};

// Yield Services
export const yieldService = {
  getAll: () => axios.get(`${API_BASE_URL}/yields`),
  getById: (id) => axios.get(`${API_BASE_URL}/yields/${id}`),
  getByFarmId: (farmId) => axios.get(`${API_BASE_URL}/yields/farm/${farmId}`),
  create: (data) => axios.post(`${API_BASE_URL}/yields`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/yields/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/yields/${id}`),
};

// Mandi Price Services
export const mandiPriceService = {
  getAll: () => axios.get(`${API_BASE_URL}/mandi-prices`),
  getLatest: () => axios.get(`${API_BASE_URL}/mandi-prices/latest`),
  getById: (id) => axios.get(`${API_BASE_URL}/mandi-prices/${id}`),
  getByVariety: (variety) => axios.get(`${API_BASE_URL}/mandi-prices/variety/${variety}`),
  getByMandi: (mandi) => axios.get(`${API_BASE_URL}/mandi-prices/mandi/${mandi}`),
  create: (data) => axios.post(`${API_BASE_URL}/mandi-prices`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/mandi-prices/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/mandi-prices/${id}`),
};

// Weather Services
export const weatherService = {
  getAll: () => axios.get(`${API_BASE_URL}/weather`),
  getById: (id) => axios.get(`${API_BASE_URL}/weather/${id}`),
  getByFarmId: (farmId) => axios.get(`${API_BASE_URL}/weather/farm/${farmId}`),
  getLatestByFarmId: (farmId) => axios.get(`${API_BASE_URL}/weather/farm/${farmId}/latest`),
  getByLocation: (location) => axios.get(`${API_BASE_URL}/weather/location/${location}`),
  create: (data) => axios.post(`${API_BASE_URL}/weather`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/weather/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/weather/${id}`),
};
