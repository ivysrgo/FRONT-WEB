import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { LoginError } from './pages/LoginError';
import { LoginBlock } from './pages/LoginBlock';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyCode } from './pages/VerifyCode';
import { NewPassword } from './pages/NewPassword';
import { PasswordResetSuccess } from './pages/PasswordResetSuccess';
import { ExploreHome } from './pages/ExploreHome';
import { AdminExploreHome } from './pages/AdminExploreHome';
import { AdminDashboard } from './pages/AdminDashboard';
import { Publicar } from './pages/Publicar';
import { Publicaciones } from './pages/Publicaciones';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial';
import { MiPerfil } from './pages/MiPerfil';
import { Configuracion } from './pages/Configuracion';
import { RutaProtegida } from './components/RutaProtegida';
import { estaAutenticado, esAdmin } from './services/authService';

function RutaRaiz() {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }
  return esAdmin() ? <Navigate to="/admin/explorar" replace /> : <Navigate to="/explorar" replace />;
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RutaRaiz />} />

        {/* Vistas Exclusivas de Administrador */}
        <Route
          path="/admin/explorar"
          element={
            <RutaProtegida requiereAdmin>
              <AdminExploreHome />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RutaProtegida requiereAdmin>
              <AdminDashboard />
            </RutaProtegida>
          }
        />

        {/* Vistas Principales (Usuario Regular y Compartidas) */}
        <Route
          path="/explorar"
          element={
            <RutaProtegida requiereAuth>
              <ExploreHome />
            </RutaProtegida>
          }
        />
        <Route
          path="/publicar"
          element={
            <RutaProtegida requiereAuth>
              <Publicar />
            </RutaProtegida>
          }
        />
        <Route
          path="/publicaciones"
          element={
            <RutaProtegida requiereAuth>
              <Publicaciones />
            </RutaProtegida>
          }
        />
        <Route path="/mis-publicaciones" element={<Navigate to="/publicaciones" replace />} />

        {/* Sección Mis Solicitudes */}
        <Route
          path="/solicitudes"
          element={
            <RutaProtegida requiereAuth>
              <SolicitudesEnviadas />
            </RutaProtegida>
          }
        />
        <Route
          path="/solicitudes/recibidas"
          element={
            <RutaProtegida requiereAuth>
              <SolicitudesRecibidas />
            </RutaProtegida>
          }
        />
        <Route
          path="/solicitudes/favoritos"
          element={
            <RutaProtegida requiereAuth>
              <SolicitudesFavoritos />
            </RutaProtegida>
          }
        />
        <Route
          path="/solicitudes/historial"
          element={
            <RutaProtegida requiereAuth>
              <SolicitudesHistorial />
            </RutaProtegida>
          }
        />

        {/* Cuenta del usuario */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida requiereAuth>
              <MiPerfil />
            </RutaProtegida>
          }
        />
        <Route
          path="/configuracion"
          element={
            <RutaProtegida requiereAuth>
              <Configuracion />
            </RutaProtegida>
          }
        />

        {/* Flujo de Autenticación */}
        <Route
          path="/login"
          element={
            <RutaProtegida soloAnonimo>
              <Login />
            </RutaProtegida>
          }
        />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-block" element={<LoginBlock />} />
        <Route
          path="/register"
          element={
            <RutaProtegida soloAnonimo>
              <Register />
            </RutaProtegida>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/reset-success" element={<PasswordResetSuccess />} />

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
