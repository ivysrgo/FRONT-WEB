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
import { Publicar } from './pages/Publicar';
import { Publicaciones } from './pages/Publicaciones';
import { SolicitudesEnviadas } from './pages/SolicitudesEnviadas';
import { SolicitudesRecibidas } from './pages/SolicitudesRecibidas';
import { SolicitudesFavoritos } from './pages/SolicitudesFavoritos';
import { MiPerfil } from './pages/MiPerfil';
import { Configuracion } from './pages/Configuracion';
import { SolicitudesHistorial } from './pages/SolicitudesHistorial'; // <-- Añadido el import faltante

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explorar" replace />} />
        
        {/* Vistas Principales */}
        <Route path="/explorar" element={<ExploreHome />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        
        {/* Sección Mis Solicitudes */}
        <Route path="/solicitudes" element={<SolicitudesEnviadas />} />
        <Route path="/solicitudes/recibidas" element={<SolicitudesRecibidas />} />
        <Route path="/solicitudes/favoritos" element={<SolicitudesFavoritos />} />
        <Route path="/solicitudes/historial" element={<SolicitudesHistorial />} />

        {/* Cuenta del usuario */}
        <Route path="/perfil" element={<MiPerfil />} />
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