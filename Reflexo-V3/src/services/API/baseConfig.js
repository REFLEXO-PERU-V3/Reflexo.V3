import axios from 'axios';
import {
    getLocalStorage,
    removeLocalStorage,
} from '../../utils/localStorageUtility';

const BaseURL =
  '/backend/public/api/'; // Adjust the base URL as needed for your environment https://reflexoperu-v2.marketingmedico.vip

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const token = getLocalStorage('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

