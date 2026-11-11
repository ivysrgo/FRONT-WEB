import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Login.css';
import './LoginError.css';

// Importación de los SVGs desde la carpeta assets
import logoFull from '../assets/logofull.svg';
import ojoSeguridad from '../assets/ojoseguridad.svg';

// Misma pantalla de Login con el aviso de error encima de los campos
export const LoginError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-layout">
      {/* Columna Izquierda: Logo */}
      <div className="login-left">
        <img src={logoFull} alt="Eco-Golgi Logo" className="login-logo" />
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br/>Sesión</h2>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Mensaje de error en rojo institucional */}
            <span className="login-error-alert" role="alert">Correo o Contraseña incorrectas</span>

            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" />}
            />

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit">
                Iniciar Sesión
              </Button>

              <p className="register-link">
                ¿No tienes una cuenta aún? <a href="#register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Registrarse</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
