import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { AdminDashboard } from './pages/AdminDashboard';
import { AdminDonaciones } from './pages/AdminDonaciones';
import { AdminExploreHome } from './pages/AdminExploreHome';
import { AdminMetricas } from './pages/AdminMetricas';
import { AdminPerfil } from './pages/AdminPerfil';
import { AdminReportes } from './pages/AdminReportes';
import { AdminReportesGestionar } from './pages/AdminReportesGestionar';
import { AdminUsuarios } from './pages/AdminUsuarios';
import { Configuracion } from './pages/Configuracion';
import { DetalleArticulo } from './pages/DetalleArticulo';
import { EditarPublicacion } from './pages/EditarPublicacion';
import { ExploreHome } from './pages/ExploreHome';
import { ForgotPassword } from './pages/ForgotPassword';
import { Login } from './pages/Login';
import { LoginError } from './pages/LoginError';
import { LoginBlock } from './pages/LoginBlock';
import { MiPerfil } from './pages/MiPerfil';
import { NewPassword } from './pages/NewPassword';
import { NotificationsScreen, ProfileScreen, ProfileSettingsScreen, WelcomeScreen } from './pages/ProfileScreens';
import { Publicaciones } from './pages/Publicaciones';
import { PublicationConfirmationScreen, EditPublicationScreen } from './pages/PublicationScreens';
import { Publicar } from './pages/Publicar';
import { Register } from './pages/Register';
import { SearchScreen, ProductScreen, ExchangeConfirmationScreen } from './pages/SearchScreens';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { TodosLosArticulos } from './pages/TodosLosArticulos';
import { PerfilUsuario } from './pages/PerfilUsuario';
import { PasswordResetSuccess } from './pages/PasswordResetSuccess';
import { VerifyCode } from './pages/VerifyCode';
import { AdminScreen } from './pages/AdminScreens';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explorar" replace />} />

        <Route path="/explorar" element={<ExploreHome />} />
        <Route path="/admin/explorar" element={<AdminExploreHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/metricas" element={<AdminMetricas />} />
        <Route path="/admin/historial" element={<AdminDonaciones />} />
        <Route path="/admin/donaciones" element={<AdminDonaciones />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/reportes/gestionar/:id" element={<AdminReportesGestionar />} />
        <Route path="/admin/perfil/:userId" element={<AdminPerfil />} />
        <Route path="/admin/perfil" element={<Navigate to="/admin/mi-perfil" replace />} />
        <Route path="/admin/mi-perfil" element={<MiPerfil isAdmin />} />
        <Route path="/admin/todos" element={<TodosLosArticulos isAdmin />} />
        <Route path="/admin/articulo/:id" element={<DetalleArticulo isAdmin />} />
        <Route path="/admin/reportes-resumen" element={<AdminScreen />} />
        <Route path="/admin/donaciones-resumen" element={<AdminScreen />} />

        <Route path="/todos" element={<TodosLosArticulos />} />
        <Route path="/articulo/:id" element={<DetalleArticulo />} />
        <Route path="/buscar" element={<SearchScreen />} />
        <Route path="/buscar/sin-resultados" element={<SearchScreen />} />
        <Route path="/productos/:id" element={<ProductScreen />} />
        <Route path="/productos/:id/solicitar" element={<ProductScreen />} />
        <Route path="/productos/:id/reportar" element={<ProductScreen />} />
        <Route path="/productos/:id/confirmar-intercambio" element={<ProductScreen />} />
        <Route path="/solicitudes/intercambio-confirmado" element={<ExchangeConfirmationScreen />} />

        <Route path="/publicar" element={<Publicar />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/publicaciones/confirmacion" element={<PublicationConfirmationScreen />} />
        <Route path="/publicaciones/:id/editar" element={<EditPublicationScreen />} />
        <Route path="/publicaciones/:id/eliminar" element={<EditPublicationScreen />} />
        <Route path="/editar-publicacion" element={<EditarPublicacion />} />

        <Route path="/solicitudes" element={<SolicitudesEnviadas />} />
        <Route path="/solicitudes/recibidas" element={<SolicitudesRecibidas />} />
        <Route path="/solicitudes/favoritos" element={<SolicitudesFavoritos />} />
        <Route path="/solicitudes/historial" element={<SolicitudesHistorial />} />

        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
        <Route path="/perfil-vista" element={<ProfileScreen />} />
        <Route path="/perfil/configuracion" element={<ProfileSettingsScreen />} />
        <Route path="/perfil/eliminar" element={<ProfileSettingsScreen />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/notificaciones" element={<NotificationsScreen />} />
        <Route path="/bienvenida" element={<WelcomeScreen />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/error" element={<LoginError />} />
        <Route path="/login/bloqueado" element={<LoginBlock />} />
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
