import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './PasswordResetSuccess.css';

import checkLogin from '../assets/checklogin.svg';

export const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="success-layout">
      <div className="success-card">
        <div className="success-icon-container">
          <img src={checkLogin} alt="Éxito" className="success-check-icon" />
        </div>

        <div className="success-header">
          <h2 className="success-title">¡Contraseña<br />Restablecida!</h2>
          <p className="success-subtitle">
            Tu contraseña ha sido actualizada exitosamente.<br />
            Ya puedes iniciar sesión con tu nueva contraseña
          </p>
        </div>

        <div className="success-button-container">
          <Button variant="solid" type="button" onClick={() => navigate('/login')}>
            Ir al Inicio de Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};