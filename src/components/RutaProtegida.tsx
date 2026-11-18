import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { estaAutenticado, esAdmin } from '../services/authService';

interface RutaProtegidaProps {
  children: React.ReactNode;
  requiereAuth?: boolean;
  requiereAdmin?: boolean;
  soloAnonimo?: boolean;
}

export const RutaProtegida: React.FC<RutaProtegidaProps> = ({
  children,
  requiereAuth = false,
  requiereAdmin = false,
  soloAnonimo = false,
}) => {
  const autenticado = estaAutenticado();
  const esUsuarioAdmin = esAdmin();
  const location = useLocation();

  // 1. Si la ruta es solo para no autenticados (ej. Login, Register)
  if (soloAnonimo && autenticado) {
    if (esUsuarioAdmin) {
      return <Navigate to="/admin/explorar" replace />;
    }
    return <Navigate to="/explorar" replace />;
  }

  // 2. Si la ruta requiere privilegios de administrador
  if (requiereAdmin) {
    if (!autenticado) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!esUsuarioAdmin) {
      // Si está autenticado pero no es administrador, redirigir a la vista de usuario regular
      return <Navigate to="/explorar" replace />;
    }
  }

  // 3. Si la ruta requiere estar autenticado (usuario regular o admin)
  if (requiereAuth && !autenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

