import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/ui/login';
import AppProtectedRoute from './AppProtectedRoute';
import Home from '../pages/Dashboard/Home';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/Inicio"
        element={
          <AppProtectedRoute>
            <Home />
          </AppProtectedRoute>
        }
      />
    </Routes>
  );
}
