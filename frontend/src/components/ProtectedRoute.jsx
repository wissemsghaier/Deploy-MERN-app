import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, role, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === 'SUPERADMIN') {
    return <>{children}</>; // Laissez le SUPERADMIN accéder directement au contenu protégé
  }

  // Rediriger les autres rôles (par exemple, non SUPERADMIN) vers une page d'accès refusé ou ailleurs
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
