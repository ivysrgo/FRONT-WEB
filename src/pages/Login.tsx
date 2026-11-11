import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { ApiError, publicacionesApi } from '../services/publicacionesApi';
import './Login.css';

import logoFull from '../assets/logofull.svg';
import ojoSeguridad from '../assets/ojoseguridad.svg';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensajeError('');
    setCargando(true);

    try {
      await publicacionesApi.login(correo, contrasena);
      navigate('/explorar');
    } catch (requestError: unknown) {
      if (requestError instanceof ApiError) {
        setMensajeError(
          requestError.status === 401 || requestError.status === 400
            ? 'Correo o Contraseña incorrectas.'
            : requestError.message,
        );
      } else {
        setMensajeError('Ocurrió un error inesperado.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-left">
        <img src={logoFull} alt="Eco-Golgi Logo" className="login-logo" />
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br />Sesión</h2>

          <form className="login-form" onSubmit={handleLoginSubmit}>
            {mensajeError && <p className="auth-error" role="alert">{mensajeError}</p>}

            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              autoComplete="email"
              disabled={cargando}
              required
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
              autoComplete="current-password"
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" style={{ width: '20px', height: '20px' }} />}
              disabled={cargando}
              required
            />

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(event) => { event.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Iniciando…' : 'Iniciar Sesión'}
              </Button>
              <p className="register-link">
                ¿No tienes una cuenta aún? <a href="#register" onClick={(event) => { event.preventDefault(); navigate('/register'); }}>Registrarse</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
