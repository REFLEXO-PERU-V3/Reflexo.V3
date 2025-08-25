import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AppAuthContext';

export default function AppProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}
