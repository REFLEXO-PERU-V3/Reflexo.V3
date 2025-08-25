// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { get } from '../services/API/MethodsGeneral';
import {
    getLocalStorage,
    persistLocalStorage,
} from '../utils/localStorageUtility';

import { useToast } from '../services/toastify/ToastContext';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userRole: null,
  setUserRole: () => {},
  authChecked: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getLocalStorage('token');
      if (!token) {
        setAuthChecked(true);
        return;
      }

      // Soporte modo MOCK: si hay token simulado, usa datos de localStorage
      if (typeof token === 'string' && token.startsWith('mock-')) {
        const role = getLocalStorage('user_role') ?? 1;
        const name = getLocalStorage('name') ?? 'Administrador';
        const userId = getLocalStorage('user_id') ?? 1;

        setIsAuthenticated(true);
        setUserRole(role);
        persistLocalStorage('name', name);
        persistLocalStorage('user_id', userId);
        setAuthChecked(true);
        return;
      }

      try {
        const res = await get('get-role');

        if (res.data) {
          setIsAuthenticated(true);
          setUserRole(res.data.role_id);
          persistLocalStorage('name', res.data.name);
          persistLocalStorage('user_id', res.data.user_id);
        }
      } catch (err) {
        showToast('intentoFallido', err?.response?.data?.message);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authChecked,
        userRole,
        setIsAuthenticated,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};