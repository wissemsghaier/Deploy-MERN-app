import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, role, children }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (role && !role.includes('SUPERADMIN')) {
    return <Navigate to='/dashboard' />;
  }

  return children;
};

export default ProtectedRoute;
