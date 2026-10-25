import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyCode } from './pages/VerifyCode';
import { NewPassword } from './pages/NewPassword';
import { PasswordResetSuccess } from './pages/PasswordResetSuccess';
import { ExploreHome } from './pages/ExploreHome';
import { Publicar } from './pages/Publicar'; // <-- Importamos Publicar

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explorar" replace />} />
        
        {/* Vistas Principales */}
        <Route path="/explorar" element={<ExploreHome />} />
        <Route path="/publicar" element={<Publicar />} />

        {/* Flujo de Autenticación */}
        <Route path="/login" element={<Login />} />
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