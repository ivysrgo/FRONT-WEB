import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { esSesionAdmin } from '../services/adminService';

// Solo deja pasar al administrador; cualquier otra sesión vuelve a su inicio.
export const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  if (!esSesionAdmin()) {
    return <Navigate to={localStorage.getItem('token') ? '/explorar' : '/login'} replace />;
  }
  return children;
};

// En las vistas de usuario, el administrador se redirige a su versión de la vista.
export const UserRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  if (esSesionAdmin()) {
    return <Navigate to={`/admin${location.pathname}${location.search}`} replace />;
  }
  return children;
};
