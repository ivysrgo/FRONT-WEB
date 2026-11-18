import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import './VerifyCode.css';

import { esPinValido } from '../utils/validarAuth';
import { verificarPIN, solicitarPIN } from '../services/authService';
import { ApiError } from '../services/api';
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
                />
              ))}
            </div>

            {errorMensaje && (
              <span style={{ color: '#D5473A', fontWeight: 600, fontSize: '13px', textAlign: 'center', marginBottom: '15px', display: 'block' }}>
                {errorMensaje}
              </span>
            )}

            {mensajeExito && (
              <span style={{ color: '#2E7D32', textAlign: 'center', marginBottom: '15px', display: 'block', fontWeight: 600 }}>
                {mensajeExito}
              </span>
            )}

            <p className="resend-text">
              ¿No recibiste el código? <a href="#resend" onClick={handleReenviar}>Reenviar</a>
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
