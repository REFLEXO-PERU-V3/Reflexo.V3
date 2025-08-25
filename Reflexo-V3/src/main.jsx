import React from 'react';
import ReactDOM from 'react-dom/client';

import { CompanyProvider } from './context/CompanyContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './routes/AuthContext';
import { ToastProvider } from './services/toastify/ToastContext';

import './index.css';
import Router from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CompanyProvider>
            <UserProvider>
              <Router />
            </UserProvider>
          </CompanyProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
