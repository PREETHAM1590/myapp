import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // For demo purposes, allow access without authentication
  return children;
  
  // Uncomment below for production authentication
  // return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;