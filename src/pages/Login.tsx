import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { PasswordToggleIcon } from '../components/PasswordToggleIcon';
import './Login.css';
import './LoginError.css';

import logoFull from '../assets/logofull.svg';

import { login, guardarSesion } from '../services/authService';
import { ApiError } from '../services/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError(null);

    if (correo.trim() === '' || contrasena.trim() === '') {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setCargando(true);

      const respuesta = await login({ correo, contrasena });
      guardarSesion(respuesta.token, respuesta.usuario);

      if (respuesta.usuario.role === 'admin' || respuesta.usuario.role === 'Administrador') {
        navigate('/admin/explorar');
      } else {
        navigate('/explorar');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 403) {
          navigate('/login-block');
        } else if (error.status === 401 || error.status === 400) {
          setMensajeError('Correo o Contraseña incorrectas');
        } else if (error.status === 500) {
          setMensajeError('Error en los servidores de Eco-Golgi. Intenta más tarde.');
        } else {
          setMensajeError(error.message);
        }
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

          <form className="login-form" onSubmit={manejarEnvio}>
            {mensajeError && (
              <span className="login-error-alert" role="alert">
                {mensajeError}
              </span>
            )}

            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
            />

            <InputField
              label="Contraseña"
              type={mostrarContrasena ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarContrasena} />}
              onRightIconClick={() => setMostrarContrasena((prev) => !prev)}
              rightIconAriaLabel={mostrarContrasena ? 'Ocultar contraseña' : 'Ver contraseña'}
              disabled={cargando}
            />

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
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
