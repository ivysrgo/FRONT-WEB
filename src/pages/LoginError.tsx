<<<<<<< HEAD
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
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Login.css';
import './LoginError.css';

// Importación de los SVGs desde la carpeta assets
import logoFull from '../assets/logofull.svg';
import ojoSeguridad from '../assets/ojoseguridad.svg';
>>>>>>> Luisa

// Misma pantalla de Login con el aviso de error encima de los campos
export const LoginError: React.FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState('Correo o Contraseña incorrectas');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.trim() || !contrasena.trim()) {
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
        if (error.status === 403) navigate('/login-block');
        else setMensajeError('Correo o Contraseña incorrectas');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-layout">
=======

  return (
    <div className="login-layout">
      {/* Columna Izquierda: Logo */}
>>>>>>> Luisa
      <div className="login-left">
        <img src={logoFull} alt="Eco-Golgi Logo" className="login-logo" />
      </div>

<<<<<<< HEAD
      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br />Sesión</h2>

          <form className="login-form" onSubmit={manejarEnvio}>
            <span className="login-error-alert" role="alert">{mensajeError}</span>
=======
      {/* Columna Derecha: Formulario */}
      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br/>Sesión</h2>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Mensaje de error en rojo institucional */}
            <span className="login-error-alert" role="alert">Correo o Contraseña incorrectas</span>
>>>>>>> Luisa

            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
<<<<<<< HEAD
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

=======
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" />}
            />

>>>>>>> Luisa
            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
<<<<<<< HEAD
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
=======
              <Button variant="solid" type="submit">
                Iniciar Sesión
>>>>>>> Luisa
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
