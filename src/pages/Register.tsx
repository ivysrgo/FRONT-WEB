import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, publicacionesApi } from '../services/publicacionesApi';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Register.css';

import logoSol from '../assets/logosol.svg';
import ojoSeguridad from '../assets/ojoseguridad.svg';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (contrasena !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setEnviando(true);
    try {
      await publicacionesApi.register({ nombre, correo, contrasena });
      navigate('/bienvenida');
    } catch (requestError: unknown) {
      setError(requestError instanceof ApiError ? requestError.message : 'No se pudo completar el registro.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="register-layout">
      <img src={logoSol} alt="" aria-hidden="true" className="register-floating-logo" />
      <div className="register-center-wrapper">
        <h2 className="register-title">Regístrate</h2>
        <div className="register-box">
          <form className="register-form" onSubmit={handleRegister}>
            <InputField
              label="Nombre"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              autoComplete="name"
              required
            />
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
              autoComplete="new-password"
              minLength={5}
              required
              disabled={enviando}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />}
            />
            <InputField
              label="Confirmar Contraseña"
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmacion}
              onChange={(event) => setConfirmacion(event.target.value)}
              autoComplete="new-password"
              required
              disabled={enviando}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />}
            />

            {error && <p className="auth-error" role="alert">{error}</p>}

            <div className="security-level">
              <span className="security-label">Nivel de Seguridad</span>
              <div className="security-bar">
                <div className="security-fill" style={{ width: `${Math.min(contrasena.length * 10, 100)}%` }} />
              </div>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit" disabled={enviando}>
                {enviando ? 'Registrando…' : 'Registrarse'}
              </Button>
            </div>
          </form>
        </div>

        <p className="login-link">
          ¿Ya tienes una cuenta? <a href="#login" onClick={(event) => { event.preventDefault(); navigate('/login'); }}>Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
};
