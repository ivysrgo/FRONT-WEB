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
<<<<<<< HEAD
=======
import { AdminMetricas } from './pages/AdminMetricas';
import { AdminDonaciones } from './pages/AdminDonaciones';
import { AdminUsuarios } from './pages/AdminUsuarios';
import { AdminReportes } from './pages/AdminReportes';
import { AdminReportesGestionar } from './pages/AdminReportesGestionar';
import { AdminPerfil } from './pages/AdminPerfil';
import { TodosLosArticulos } from './pages/TodosLosArticulos';
import { DetalleArticulo } from './pages/DetalleArticulo';
>>>>>>> Luisa
import { Publicar } from './pages/Publicar';
import { Publicaciones } from './pages/Publicaciones';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
<<<<<<< HEAD
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
=======
import { MiPerfil } from './pages/MiPerfil';
import { PerfilUsuario } from './pages/PerfilUsuario';
import { Configuracion } from './pages/Configuracion';
import { CambiarContrasena } from './pages/CambiarContrasena';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial';
import { EditarPublicacion } from './pages/EditarPublicacion';
import { AdminRoute, UserRoute } from './components/AdminRoute';
>>>>>>> Luisa

export function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
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
=======
        <Route path="/" element={<Navigate to="/explorar" replace />} />
        
        {/* Vistas Principales */}
        <Route path="/explorar" element={<UserRoute><ExploreHome /></UserRoute>} />
        <Route path="/admin/explorar" element={<AdminRoute><AdminExploreHome /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/todos" element={<UserRoute><TodosLosArticulos /></UserRoute>} />
        <Route path="/articulo/:id" element={<UserRoute><DetalleArticulo /></UserRoute>} />
        <Route path="/admin/todos" element={<AdminRoute><TodosLosArticulos isAdmin /></AdminRoute>} />
        <Route path="/admin/articulo/:id" element={<AdminRoute><DetalleArticulo isAdmin /></AdminRoute>} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/admin/metricas" element={<AdminRoute><AdminMetricas /></AdminRoute>} />
        <Route path="/admin/historial" element={<AdminRoute><AdminDonaciones /></AdminRoute>} />
        <Route path="/admin/usuarios" element={<AdminRoute><AdminUsuarios /></AdminRoute>} />
        <Route path="/admin/reportes" element={<AdminRoute><AdminReportes /></AdminRoute>} />
        <Route path="/admin/reportes/gestionar/:id" element={<AdminRoute><AdminReportesGestionar /></AdminRoute>} />
        <Route path="/admin/perfil/:userId" element={<AdminRoute><AdminPerfil /></AdminRoute>} />
        <Route path="/admin/perfil" element={<Navigate to="/admin/mi-perfil" replace />} />
        <Route path="/admin/mi-perfil" element={<AdminRoute><MiPerfil isAdmin /></AdminRoute>} />
        <Route path="/admin/cambiar-contrasena" element={<AdminRoute><CambiarContrasena isAdmin /></AdminRoute>} />
        
        {/* Sección Mis Solicitudes */}
        <Route path="/solicitudes" element={<SolicitudesEnviadas />} />
        <Route path="/solicitudes/recibidas" element={<SolicitudesRecibidas />} />
        <Route path="/editar-publicacion" element={<EditarPublicacion />} />
        <Route path="/solicitudes/favoritos" element={<SolicitudesFavoritos />} />
        <Route path="/solicitudes/historial" element={<SolicitudesHistorial />} />
>>>>>>> Luisa

        {/* Cuenta del usuario */}
        <Route path="/perfil" element={<UserRoute><MiPerfil /></UserRoute>} />
        <Route path="/perfil/cambiar-contrasena" element={<CambiarContrasena />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
        <Route path="/configuracion" element={<Configuracion />} />

        {/* Flujo de Autenticación */}
<<<<<<< HEAD
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
=======
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-block" element={<LoginBlock />} />
        <Route path="/register" element={<Register />} />
>>>>>>> Luisa
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
