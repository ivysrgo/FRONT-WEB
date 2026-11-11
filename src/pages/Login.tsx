import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { ApiError, publicacionesApi } from '../services/publicacionesApi';
import './Login.css';

// Importación de los SVGs desde la carpeta assets
import logoFull from '../assets/logofull.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await publicacionesApi.login(correo, contrasena);
      navigate('/explorar');
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'No se pudo iniciar sesión.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-layout">
      {/* Columna Izquierda: Logo */}
      <div className="login-left">
        <div className="logo-placeholder">
           <img src={logoFull} alt="Eco-Golgi Logo" style={{ maxWidth: '400px', width: '100%' }} /> 
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="login-right">
        <div className="login-form-container">
          <p className="login-welcome">BIENVENID@</p>
          <h2 className="login-title">Inicia<br/>Sesión</h2>

          <form className="login-form" onSubmit={handleLoginSubmit}>
            <InputField 
              label="Correo Electrónico" 
              type="email" 
              placeholder="Ej: correo@ejemplo.com"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              autoComplete="email"
              required
            />
            
            <InputField 
              label="Contraseña" 
              type="password" 
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
              autoComplete="current-password"
              required
              rightIcon={<img src={ojoSeguridad} alt="Ver contraseña" style={{ width: '20px', height: '20px' }} />} 
            />

            {error && <p className="auth-error" role="alert">{error}</p>}

            <div className="forgot-password-link">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                ¿Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit" disabled={enviando}>
                {enviando ? 'Ingresando…' : 'Iniciar Sesión'}
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