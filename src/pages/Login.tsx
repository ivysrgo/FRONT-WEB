import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { PasswordToggleIcon } from '../components/PasswordToggleIcon';
import './Login.css';
import './LoginError.css';

<<<<<<< HEAD
import logoFull from '../assets/logofull.svg';

import { login, guardarSesion } from '../services/authService';
import { ApiError } from '../services/api';
=======
import logoFull from '../assets/logofull.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 
>>>>>>> Luisa

// Importamos nuestro servicio y la clase de error
import { login } from '../services/authService';
import { ApiError } from '../services/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. Estados de los inputs controlados
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  // 2. Estados de Red (Carga y Error HTTP)
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

<<<<<<< HEAD
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

=======
  // 3. Manejador Asíncrono del Envío
>>>>>>> Luisa
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError(null);

<<<<<<< HEAD
=======
    // Validación pura local
>>>>>>> Luisa
    if (correo.trim() === '' || contrasena.trim() === '') {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setCargando(true);
<<<<<<< HEAD

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
=======
      
      // Petición HTTP al Backend
      const { usuario } = await login({ correo, contrasena });

      // El administrador entra a su propia versión del sistema
      navigate(usuario.role === 'admin' ? '/admin/explorar' : '/explorar');

    } catch (error) {
      // Manejo de Códigos de Error (4xx, 5xx, Red)
      if (error instanceof ApiError) {
        if (error.status === 401 || error.status === 400) {
          setMensajeError('Correo o Contraseña incorrectas.'); // El texto que diseñamos en Figma
        } else if (error.status === 500) {
          setMensajeError('Error en los servidores de Eco-Golgi. Intenta más tarde.');
        } else if (error.status === 0) {
          setMensajeError(error.message); // Error de red
>>>>>>> Luisa
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
<<<<<<< HEAD
            {mensajeError && (
              <span className="login-error-alert" role="alert">
=======
            
            {mensajeError && (
              <span className="login-error-message" style={{ color: '#D5473A', fontWeight: '600', marginBottom: '12px' }}>
>>>>>>> Luisa
                {mensajeError}
              </span>
            )}

<<<<<<< HEAD
            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
=======
            <InputField 
              label="Correo Electrónico" 
              type="email" 
>>>>>>> Luisa
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
            />
<<<<<<< HEAD

            <InputField
              label="Contraseña"
              type={mostrarContrasena ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarContrasena} />}
              onRightIconClick={() => setMostrarContrasena((prev) => !prev)}
              rightIconAriaLabel={mostrarContrasena ? 'Ocultar contraseña' : 'Ver contraseña'}
=======
            
            <InputField 
              label="Contraseña" 
              type="password" 
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" style={{ width: '20px', height: '20px' }} />} 
>>>>>>> Luisa
              disabled={cargando}
            />

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
<<<<<<< HEAD
=======
              {/* Botón dinámico que muestra estado de carga */}
>>>>>>> Luisa
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
