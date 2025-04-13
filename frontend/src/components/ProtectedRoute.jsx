// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user has a valid JWT token

  if (!isAuthenticated) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow the nested routes to render
  return <Outlet />;
};

export default ProtectedRoute;
