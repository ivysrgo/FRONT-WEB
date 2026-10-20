import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Register.css';

import logoSol from '../assets/logosol.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 

export const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="register-layout">
      <div className="register-center-wrapper">
        <img src={logoSol} alt="Sol Eco-Golgi" className="register-floating-logo" />

        <h2 className="register-title">Regístrate</h2>

        <div className="register-box">
          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <InputField label="Nombre" type="text" placeholder="Ingresa tu nombre completo" />
            <InputField label="Correo Electrónico" type="email" placeholder="Ej: correo@ejemplo.com" />
            <InputField label="Contraseña" type="password" placeholder="Ingresa tu contraseña" rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} />
            <InputField label="Confirmar Contraseña" type="password" placeholder="Confirma tu contraseña" rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} />

            <div className="security-level">
              <span className="security-label">Nivel de Seguridad</span>
              <div className="security-bar">
                <div className="security-fill"></div>
              </div>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit">Registrarse</Button>
            </div>
          </form>
        </div>

        <p className="login-link">
          ¿Ya tienes una cuenta? <a href="#login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
};