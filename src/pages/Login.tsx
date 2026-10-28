import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Login.css';

import logoFull from '../assets/logofull.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 

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

  // 3. Manejador Asíncrono del Envío
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError(null);

    // Validación pura local
    if (correo.trim() === '' || contrasena.trim() === '') {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setCargando(true);
      
      // Petición HTTP al Backend
      const respuesta = await login({ correo, contrasena });
      
      // Si llegamos aquí, fue un éxito (Status 200 OK)
      console.log('Login exitoso. Token:', respuesta.token);
      
      // Guardar el token (ej. localStorage o Context)
      localStorage.setItem('token', respuesta.token);
      
      // Redirigir
      navigate('/explorar');

    } catch (error) {
      // Manejo de Códigos de Error (4xx, 5xx, Red)
      if (error instanceof ApiError) {
        if (error.status === 401 || error.status === 400) {
          setMensajeError('Correo o Contraseña incorrectas.'); // El texto que diseñamos en Figma
        } else if (error.status === 500) {
          setMensajeError('Error en los servidores de Eco-Golgi. Intenta más tarde.');
        } else if (error.status === 0) {
          setMensajeError(error.message); // Error de red
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
        <div className="logo-placeholder">
           <img src={logoFull} alt="Eco-Golgi Logo" style={{ maxWidth: '400px', width: '100%' }} /> 
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br/>Sesión</h2>

          <form className="login-form" onSubmit={manejarEnvio}>
            
            {mensajeError && (
              <span className="login-error-message" style={{ color: '#D5473A', fontWeight: '600', marginBottom: '12px' }}>
                {mensajeError}
              </span>
            )}

            <InputField 
              label="Correo Electrónico" 
              type="email" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
            />
            
            <InputField 
              label="Contraseña" 
              type="password" 
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" style={{ width: '20px', height: '20px' }} />} 
              disabled={cargando}
            />

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
              {/* Botón dinámico que muestra estado de carga */}
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