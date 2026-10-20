import React from 'react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './LoginError.css';

// Importación de los SVGs desde la carpeta assets
import logoFull from '../assets/logofull.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 

export const LoginError: React.FC = () => {
  return (
    <div className="login-error-layout">
      {/* Columna Izquierda: Logo */}
      <div className="login-error-left">
        <div className="logo-placeholder">
           <img src={logoFull} alt="Eco-Golgi Logo" style={{ maxWidth: '400px', width: '100%' }} /> 
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="login-error-right">
        <div className="login-error-form-container">
          <p className="login-error-welcome">BIENVENID@</p>
          <h2 className="login-error-title">Inicia<br/>Sesión</h2>

          <form className="login-error-form">
            
            {/* Mensaje de error en rojo institucional */}
            <span className="login-error-alert">Correo o Contraseña incorrectas</span>

            <InputField 
              label="Correo Electrónico" 
              type="email" 
              placeholder="Ej: correo@ejemplo.com"
            />
            
            <InputField 
              label="Contraseña" 
              type="password" 
              placeholder="Ingresa tu contraseña"
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" style={{ width: '20px', height: '20px' }} />} 
            />

            <div className="login-error-forgot">
              <a href="#">¿Olvidaste tu Contraseña?</a>
            </div>

            <div className="login-error-button-section">
              <Button variant="solid" type="submit">
                Iniciar Sesión
              </Button>

              <p className="login-error-register">
                ¿No tienes una cuenta aún? <a href="#">Registrarse</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};