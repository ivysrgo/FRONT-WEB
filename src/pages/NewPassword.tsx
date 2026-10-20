import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './NewPassword.css';

import flechaVolver from '../assets/flechavolverlogin.svg';
import ojoSeguridad from '../assets/ojoseguridad.svg';

export const NewPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="newpass-layout">
      <div className="newpass-card">
        <div className="newpass-back-container">
          <button className="newpass-back-btn" onClick={() => navigate('/verify-code')}>
            <img src={flechaVolver} alt="Volver" className="newpass-back-icon" />
            <span>Volver</span>
          </button>
        </div>

        <div className="newpass-header">
          <h2 className="newpass-title">Nueva Contraseña</h2>
          <p className="newpass-subtitle">
            Crea una nueva contraseña para tu cuenta
          </p>
        </div>

        <div className="newpass-form-box">
          <form className="newpass-form" onSubmit={(e) => { e.preventDefault(); navigate('/reset-success'); }}>
            <InputField 
              label="Nueva Contraseña" 
              type="password" 
              placeholder="••••••••••••••••"
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
            />

            <InputField 
              label="Confirmar Contraseña" 
              type="password" 
              placeholder="••••••••••••••••"
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
            />

            <div className="newpass-button-container">
              <Button variant="solid" type="submit">
                Restablecer Contraseña
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};