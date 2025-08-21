import axios from 'axios';
import {
    getLocalStorage,
    removeLocalStorage,
} from '../../utils/storage';

const BaseURL =
  '/backend/public/api/'; // Adjust the base URL as needed for your environment https://reflexoperu-v2.marketingmedico.vip

const instance = axios.create({
  baseURL: BaseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token') || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status == 401 || error.response?.status == 403) &&
      window.location.pathname.includes('/Inicio')
    ) {
      removeLocalStorage('token');
      removeLocalStorage('user_id');
      window.location.href = '/error500';
    }
    return Promise.reject(error);
  },
);

export default instance;