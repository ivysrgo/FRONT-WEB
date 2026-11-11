import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './VerifyCode.css';

// Importamos la función pura de validación
import { esPinValido } from '../utils/validarAuth';
import flechaVolver from '../assets/flechavolverlogin.svg';

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();

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
          <button className="verify-back-btn" onClick={() => navigate('/forgot-password')}>
            <img src={flechaVolver} alt="Volver" className="verify-back-icon" />
            <span>Volver</span>
          </button>
        </div>

        <div className="verify-header">
          <h2 className="verify-title">Verificar Código</h2>
          <p className="verify-subtitle">
            Ingresa el PIN de 4 dígitos que se envió a <strong>tu correo</strong>
          </p>
        </div>

        <div className="verify-form-box">
          <form className="verify-form" onSubmit={manejarEnvio}>
            
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
                />
              ))}
            </div>

            {/* Renderizado condicional del error */}
            {errorMensaje && (
              <span className="login-error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
                {errorMensaje}
              </span>
            )}

            <p className="resend-text">
              ¿No recibiste el código? <a href="#resend" onClick={(e) => {
                e.preventDefault();
                setPin(['', '', '', '']); 
              }}>Reenviar</a>
            </p>

            <div className="verify-button-container">
              <Button variant="solid" type="submit">
                Verificar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};