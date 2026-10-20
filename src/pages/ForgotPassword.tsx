import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './ForgotPassword.css';

import flechaVolver from '../assets/flechavolverlogin.svg';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-layout">
      <div className="forgot-card">
        <div className="forgot-back-container">
          <button className="forgot-back-btn" onClick={() => navigate('/login')}>
            <img src={flechaVolver} alt="Volver" className="forgot-back-icon" />
            <span>Volver al inicio de sesión</span>
          </button>
        </div>

        <div className="forgot-header">
          <h2 className="forgot-title">¿Olvidaste tu<br />Contraseña?</h2>
          <p className="forgot-subtitle">
            Ingresa tu correo electrónico registrado en Eco-Golgi y te enviaremos<br />
            un PIN de 4 dígitos para verificar tu identidad
          </p>
        </div>

        <div className="forgot-form-box">
          <form className="forgot-form" onSubmit={(e) => { e.preventDefault(); navigate('/verify-code'); }}>
            <div className="custom-input-group">
              <label className="forgot-label">Correo Electrónico</label>
              <span className="input-helper-text">Ej: correousuario@gmail.com</span>
            </div>

            <div className="forgot-button-container">
              <Button variant="solid" type="submit">
                Enviar PIN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};