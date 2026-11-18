import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './ForgotPassword.css';

<<<<<<< HEAD
import { esCorreoValido } from '../utils/validarAuth';
import { solicitarPIN } from '../services/authService';
import { ApiError } from '../services/api';
=======
// Importamos la función pura de validación que acabamos de crear
import { esCorreoValido } from '../utils/validarAuth';
>>>>>>> Luisa

import flechaVolver from '../assets/flechavolverlogin.svg';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. Estado para el input controlado y el manejo de errores
  const [correo, setCorreo] = useState('');
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  // 2. Manejador del envío del formulario (Validación)
  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página

    // A. Validar que no esté vacío
    if (correo.trim() === '') {
      setErrorMensaje('Por favor, ingresa tu correo electrónico.');
      return;
    }

    // B. Usamos la función pura para validar el formato
    if (!esCorreoValido(correo)) {
      setErrorMensaje('El formato del correo es inválido. (Ej: usuario@gmail.com)');
      return;
    }

    // Si pasa todas las validaciones puras:
    setErrorMensaje(null);
    console.log('Enviando PIN de recuperación a:', correo);
    
    // Navegamos al siguiente paso simulando éxito
    navigate('/verify-code');
  };

  const [correo, setCorreo] = useState('');
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (correo.trim() === '') {
      setErrorMensaje('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!esCorreoValido(correo.trim())) {
      setErrorMensaje('El formato del correo es inválido. (Ej: usuario@gmail.com)');
      return;
    }

    try {
      setCargando(true);
      setErrorMensaje(null);
      await solicitarPIN(correo.trim());
      navigate('/verify-code', { state: { correo: correo.trim() } });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMensaje(err.message);
      } else {
        setErrorMensaje('No pudimos procesar la solicitud. Intenta nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="forgot-layout">
      <div className="forgot-card">
        <div className="forgot-back-container">
          <button type="button" className="forgot-back-btn" onClick={() => navigate('/login')}>
            <img src={flechaVolver} alt="Volver" className="forgot-back-icon" />
            <span>Volver al inicio de sesión</span>
          </button>
        </div>

        <div className="forgot-header">
          <h2 className="forgot-title">¿Olvidaste tu<br />Contraseña?</h2>
          <p className="forgot-subtitle">
            Ingresa tu correo electrónico registrado en Eco-Golgi y te enviaremos<br />
            un PIN de 4 dígitos para verificar tu identidad
          </p>
        </div>

        <div className="forgot-form-box">
          <form className="forgot-form" onSubmit={manejarEnvio}>
            <div className="custom-input-group">
              <label className="forgot-label">Correo Electrónico</label>
<<<<<<< HEAD
              <input
                type="email"
                className="ui-input-standalone"
                placeholder="Ej: correousuario@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={cargando}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '8px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F4F5F3',
                  outline: 'none',
                }}
              />
              {errorMensaje ? (
                <span style={{ color: '#D5473A', fontWeight: 600, fontSize: '13px', marginTop: '8px', display: 'block' }}>
                  {errorMensaje}
                </span>
              ) : (
                <span className="input-helper-text" style={{ marginTop: '8px', display: 'block' }}>
                  Te enviaremos un código temporal (PIN demo: 1234).
                </span>
=======
              
              {/* Input Controlado por el estado */}
              <input 
                type="email" 
                className="ui-input-standalone" 
                placeholder="Ej: correousuario@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={{
                  width: '100%', padding: '12px', marginTop: '8px', 
                  borderRadius: '12px', border: '1px solid #E5E7EB',
                  backgroundColor: '#F4F5F3', outline: 'none'
                }}
              />

              {errorMensaje ? (
                <span className="login-error-message" style={{marginTop: '8px'}}>{errorMensaje}</span>
              ) : (
                <span className="input-helper-text" style={{marginTop: '8px'}}>Te enviaremos un código temporal.</span>
>>>>>>> Luisa
              )}
            </div>

            <div className="forgot-button-container">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Enviando PIN...' : 'Enviar PIN'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
