<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import './VerifyCode.css';

import { esPinValido } from '../utils/validarAuth';
import { verificarPIN, solicitarPIN } from '../services/authService';
import { ApiError } from '../services/api';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './VerifyCode.css';

// Importamos la función pura de validación
import { esPinValido } from '../utils/validarAuth';
>>>>>>> Luisa
import flechaVolver from '../assets/flechavolverlogin.svg';

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const state = (location.state as { correo?: string } | null) || {};
  const correo = state.correo || '';

  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (index: number, valor: string) => {
    if (valor !== '' && !/^\d$/.test(valor)) return;

    const nuevoPin = [...pin];
    nuevoPin[index] = valor;
    setPin(nuevoPin);

    if (valor !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const manejarKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMensaje(null);
    setMensajeExito(null);

    const pinCompleto = pin.join('');

    if (!esPinValido(pinCompleto)) {
      setErrorMensaje('Por favor, ingresa los 4 números del código.');
      return;
    }

    try {
      setCargando(true);
      await verificarPIN(correo, pinCompleto);
      navigate('/new-password', { state: { correo, pin: pinCompleto } });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMensaje(err.message);
      } else {
        setErrorMensaje('Código PIN incorrecto o expirado.');
      }
    } finally {
      setCargando(false);
    }
  };

  const handleReenviar = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!correo) return;
    try {
      await solicitarPIN(correo);
      setMensajeExito('Se reenvió un nuevo PIN a tu correo.');
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch {
      setErrorMensaje('No se pudo reenviar el código. Intenta más tarde.');
    }
  };

  // 1. Estado inmutable: Arreglo de 4 posiciones para los 4 dígitos
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  // 2. Función para actualizar inmutablemente una posición específica
  const manejarCambio = (index: number, valor: string) => {
    // Bloquear si el valor no es un número o está vacío
    if (valor !== '' && !/^\d$/.test(valor)) return;

    const nuevoPin = [...pin];
    nuevoPin[index] = valor;
    setPin(nuevoPin);
  };

  // 3. Manejo del envío y validación
  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Unimos el arreglo en un solo texto (ej. ['1', '2', '3', '4'] -> '1234')
    const pinCompleto = pin.join('');

    // Validamos usando nuestra función pura
    if (!esPinValido(pinCompleto)) {
      setErrorMensaje('Por favor, ingresa los 4 números del código.');
      return;
    }

    setErrorMensaje(null);
    console.log('PIN validado correctamente:', pinCompleto);
    navigate('/new-password');
  };

  return (
    <div className="verify-layout">
      <div className="verify-card">
        <div className="verify-back-container">
          <button type="button" className="verify-back-btn" onClick={() => navigate('/forgot-password')}>
            <img src={flechaVolver} alt="Volver" className="verify-back-icon" />
            <span>Volver</span>
          </button>
        </div>

        <div className="verify-header">
          <h2 className="verify-title">Verificar Código</h2>
          <p className="verify-subtitle">
            Ingresa el PIN de 4 dígitos que se envió a <strong>{correo || 'tu correo'}</strong>
          </p>
        </div>

        <div className="verify-form-box">
          <form className="verify-form" onSubmit={manejarEnvio}>
<<<<<<< HEAD
            <div className="pin-inputs-container">
              {pin.map((digito, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  className="pin-box"
                  value={digito}
                  onChange={(e) => manejarCambio(index, e.target.value)}
                  onKeyDown={(e) => manejarKeyDown(index, e)}
                  disabled={cargando}
=======
            
            {/* Renderizado dinámico de los inputs controlados por el arreglo */}
            <div className="pin-inputs-container">
              {pin.map((digito, index) => (
                <input 
                  key={index}
                  type="text" 
                  maxLength={1} 
                  className="pin-box"
                  value={digito}
                  onChange={(e) => manejarCambio(index, e.target.value)}
>>>>>>> Luisa
                />
              ))}
            </div>

<<<<<<< HEAD
            {errorMensaje && (
              <span style={{ color: '#D5473A', fontWeight: 600, fontSize: '13px', textAlign: 'center', marginBottom: '15px', display: 'block' }}>
=======
            {/* Renderizado condicional del error */}
            {errorMensaje && (
              <span className="login-error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
>>>>>>> Luisa
                {errorMensaje}
              </span>
            )}

<<<<<<< HEAD
            {mensajeExito && (
              <span style={{ color: '#2E7D32', textAlign: 'center', marginBottom: '15px', display: 'block', fontWeight: 600 }}>
                {mensajeExito}
              </span>
            )}

            <p className="resend-text">
              ¿No recibiste el código? <a href="#resend" onClick={handleReenviar}>Reenviar</a>
=======
            <p className="resend-text">
              ¿No recibiste el código? <a href="#resend" onClick={(e) => {
                e.preventDefault();
                setPin(['', '', '', '']); 
              }}>Reenviar</a>
>>>>>>> Luisa
            </p>

            <div className="verify-button-container">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Verificando...' : 'Verificar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
