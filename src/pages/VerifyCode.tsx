import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './VerifyCode.css';

import flechaVolver from '../assets/flechavolverlogin.svg';

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="verify-layout">
      <div className="verify-card">
        <div className="verify-back-container">
          <button className="verify-back-btn" onClick={() => navigate('/forgot-password')}>
            <img src={flechaVolver} alt="Volver" className="verify-back-icon" />
            <span>Volver</span>
          </button>
        </div>

        <div className="verify-header">
          <h2 className="verify-title">Verificar Código</h2>
          <p className="verify-subtitle">
            Ingresa el PIN de 4 dígitos que se envió a <strong>tu correo</strong>
          </p>
        </div>

        <div className="verify-form-box">
          <form className="verify-form" onSubmit={(e) => { e.preventDefault(); navigate('/new-password'); }}>
            <div className="pin-inputs-container">
              <input type="text" maxLength={1} className="pin-box" />
              <input type="text" maxLength={1} className="pin-box" />
              <input type="text" maxLength={1} className="pin-box" />
              <input type="text" maxLength={1} className="pin-box" />
            </div>

            <p className="resend-text">
              ¿No recibiste el código? <a href="#resend" onClick={(e) => e.preventDefault()}>Reenviar</a>
            </p>

            <div className="verify-button-container">
              <Button variant="solid" type="submit">
                Verificar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};