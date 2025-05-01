import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('rol');

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/404" replace />;
  }

  // If the user's role does not match the required role, redirect to a 404 page
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/404" replace />;
  }

  // If authenticated and authorized, render the children components
  return children;
};

export default ProtectedRoute;