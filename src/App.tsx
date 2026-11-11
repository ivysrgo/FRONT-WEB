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
import { AdminMetricas } from './pages/AdminMetricas';
import { AdminDonaciones } from './pages/AdminDonaciones';
import { AdminUsuarios } from './pages/AdminUsuarios';
import { AdminReportes } from './pages/AdminReportes';
import { AdminReportesGestionar } from './pages/AdminReportesGestionar';
import { AdminPerfil } from './pages/AdminPerfil';
import { TodosLosArticulos } from './pages/TodosLosArticulos';
import { DetalleArticulo } from './pages/DetalleArticulo';
import { Publicar } from './pages/Publicar';
import { Publicaciones } from './pages/Publicaciones';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
import { MiPerfil } from './pages/MiPerfil';
import { PerfilUsuario } from './pages/PerfilUsuario';
import { Configuracion } from './pages/Configuracion';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial';
import { EditarPublicacion } from './pages/EditarPublicacion';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explorar" replace />} />
        
        {/* Vistas Principales */}
        <Route path="/explorar" element={<ExploreHome />} />
        <Route path="/admin/explorar" element={<AdminExploreHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/todos" element={<TodosLosArticulos />} />
        <Route path="/articulo/:id" element={<DetalleArticulo />} />
        <Route path="/admin/todos" element={<TodosLosArticulos isAdmin />} />
        <Route path="/admin/articulo/:id" element={<DetalleArticulo isAdmin />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/admin/metricas" element={<AdminMetricas />} />
        <Route path="/admin/historial" element={<AdminDonaciones />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/reportes/gestionar/:id" element={<AdminReportesGestionar />} />
        <Route path="/admin/perfil/:userId" element={<AdminPerfil />} />
        <Route path="/admin/perfil" element={<Navigate to="/admin/mi-perfil" replace />} />
        <Route path="/admin/mi-perfil" element={<MiPerfil isAdmin />} />
        
        {/* Sección Mis Solicitudes */}
        <Route path="/solicitudes" element={<SolicitudesEnviadas />} />
        <Route path="/solicitudes/recibidas" element={<SolicitudesRecibidas />} />
        <Route path="/editar-publicacion" element={<EditarPublicacion />} />
        <Route path="/solicitudes/favoritos" element={<SolicitudesFavoritos />} />
        <Route path="/solicitudes/historial" element={<SolicitudesHistorial />} />

        {/* Cuenta del usuario */}
        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
        <Route path="/configuracion" element={<Configuracion />} />

        {/* Flujo de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-block" element={<LoginBlock />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/reset-success" element={<PasswordResetSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;