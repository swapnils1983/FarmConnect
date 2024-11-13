import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/user/login" replace />
  );
};

export default ProtectedRoute;
