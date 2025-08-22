import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/ui/login';
import ProtectedRoute from './ProtectedRoute';
import DashBoard from '../pages/Dashboard/DashBoard';
import StaffPage from '../features/staff/ui/staff';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<StaffPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/Inicio"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

