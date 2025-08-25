import axios from 'axios';
import { getLocalStorage } from '../../utils/localStorageUtility';

// Configura la URL base desde variable de entorno o fallback local
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adjuntar token si existe
instance.interceptors.request.use((config) => {
  const token = getLocalStorage('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${typeof token === 'string' ? token : ''}`;
  }
  return config;
});

// Interceptor de respuesta (opcional: logging básico)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


