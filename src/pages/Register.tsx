import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Register.css';

import logoSol from '../assets/logosol.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 
import { registrar } from '../services/authService';
import { ApiError } from '../services/api';

function evaluarContrasena(contrasena: string) {
  const requisitos = [
    contrasena.length >= 5,
    /[A-Z]/.test(contrasena),
    /[a-z]/.test(contrasena),
    /[0-9]/.test(contrasena),
    /[^A-Za-z0-9]/.test(contrasena),
  ];
  const puntuacion = requisitos.filter(Boolean).length;
  const nivel =
    puntuacion === 0 ? 'Sin contraseña'
    : puntuacion <= 2 ? 'Débil'
    : puntuacion <= 4 ? 'Media'
    : 'Fuerte';

  return { puntuacion, nivel, valida: puntuacion === requisitos.length };
}

export const Register: React.FC = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seguridad = evaluarContrasena(contrasena);

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !correo.trim() || !contrasena || !confirmarContrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!seguridad.valida) {
      setError('Usa mínimo 5 caracteres, con mayúscula, minúscula, número y símbolo.');
      return;
    }

    setError(null);
    setCargando(true);
    try {
      await registrar({ nombre: nombre.trim(), correo: correo.trim(), contrasena });
      navigate('/explorar');
    } catch (error: unknown) {
      setError(
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : 'No se pudo completar el registro.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-layout">
      <img src={logoSol} alt="" aria-hidden="true" className="register-floating-logo" />

      <div className="register-center-wrapper">

        <h2 className="register-title">Regístrate</h2>

        <div className="register-box">
          <form className="register-form" onSubmit={manejarRegistro}>
            
            {error && <span className="login-error-message" style={{marginBottom: '10px'}}>{error}</span>}

            <InputField 
              label="Nombre" 
              type="text" 
              placeholder="Ingresa tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={cargando}
            />
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
              type="password" 
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
              disabled={cargando}
            />
            <InputField 
              label="Confirmar Contraseña" 
              type="password" 
              placeholder="Confirma tu contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
              disabled={cargando}
            />

            <div className="security-level">
              <span className="security-label">
                Seguridad: {contrasena ? seguridad.nivel : 'Escribe una contraseña'}
              </span>
              <div
                className="security-bar"
                role="progressbar"
                aria-label="Nivel de seguridad de la contraseña"
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={seguridad.puntuacion}
              >
                <div
                  className={`security-fill${seguridad.puntuacion > 0 ? ` security-fill-${seguridad.puntuacion}` : ''}`}
                  style={{ width: `${seguridad.puntuacion * 20}%` }}
                />
              </div>
              <span className="security-hint">
                Mínimo 5 caracteres, mayúscula, minúscula, número y símbolo.
              </span>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Registrando...' : 'Registrarse'}
              </Button>
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