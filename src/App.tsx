import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyCode } from './pages/VerifyCode';
import { NewPassword } from './pages/NewPassword';
import { PasswordResetSuccess } from './pages/PasswordResetSuccess';
import { ExploreHome } from './pages/ExploreHome';
import { Publicar } from './pages/Publicar';
import { Publicaciones } from './pages/Publicaciones';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial'; // <-- Añadido el import faltante
import { ProfileScreen, ProfileSettingsScreen, NotificationsScreen, WelcomeScreen } from './pages/ProfileScreens';
import { SearchScreen, ProductScreen, ExchangeConfirmationScreen } from './pages/SearchScreens';
import { EditPublicationScreen, PublicationConfirmationScreen } from './pages/PublicationScreens';
import { AdminScreen } from './pages/AdminScreens';
import { LoginError } from './pages/LoginError';
import { LoginError as LoginBlock } from './pages/LoginBlock';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explorar" replace />} />
        
        {/* Vistas Principales */}
        <Route path="/explorar" element={<ExploreHome />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/publicaciones/confirmacion" element={<PublicationConfirmationScreen />} />
        <Route path="/publicaciones/:id/editar" element={<EditPublicationScreen />} />
        <Route path="/publicaciones/:id/eliminar" element={<EditPublicationScreen />} />
        
        {/* Sección Mis Solicitudes */}
        <Route path="/solicitudes" element={<SolicitudesEnviadas />} />
        <Route path="/solicitudes/recibidas" element={<SolicitudesRecibidas />} />
        <Route path="/solicitudes/favoritos" element={<SolicitudesFavoritos />} />
        <Route path="/solicitudes/historial" element={<SolicitudesHistorial />} />
        <Route path="/solicitudes/intercambio-confirmado" element={<ExchangeConfirmationScreen />} />

        {/* Perfil y búsqueda */}
        <Route path="/perfil" element={<ProfileScreen />} />
        <Route path="/perfil/configuracion" element={<ProfileSettingsScreen />} />
        <Route path="/perfil/eliminar" element={<ProfileSettingsScreen />} />
        <Route path="/notificaciones" element={<NotificationsScreen />} />
        <Route path="/bienvenida" element={<WelcomeScreen />} />
        <Route path="/buscar" element={<SearchScreen />} />
        <Route path="/buscar/sin-resultados" element={<SearchScreen />} />
        <Route path="/productos/:id" element={<ProductScreen />} />
        <Route path="/productos/:id/solicitar" element={<ProductScreen />} />
        <Route path="/productos/:id/reportar" element={<ProductScreen />} />
        <Route path="/productos/:id/confirmar-intercambio" element={<ProductScreen />} />

        {/* Administración */}
        <Route path="/admin/reportes" element={<AdminScreen />} />
        <Route path="/admin/donaciones" element={<AdminScreen />} />
        <Route path="/admin" element={<Navigate to="/admin/reportes" replace />} />

        {/* Flujo de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/error" element={<LoginError />} />
        <Route path="/login/bloqueado" element={<LoginBlock />} />
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