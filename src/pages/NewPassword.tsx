import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { PasswordToggleIcon } from '../components/PasswordToggleIcon';
import './NewPassword.css';

import flechaVolver from '../assets/flechavolverlogin.svg';
import { restablecerContrasena, obtenerUsuarioActual } from '../services/authService';
import { ApiError } from '../services/api';
import { evaluarSeguridadContrasena } from '../utils/validarAuth';

export const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as { correo?: string; pin?: string } | null) || {};
  const usuarioActual = obtenerUsuarioActual();
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const evaluacion = evaluarSeguridadContrasena(nuevaContrasena);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMensaje(null);

    if (!nuevaContrasena || !confirmarContrasena) {
      setErrorMensaje('Por favor, completa ambos campos.');
      return;
    }

    if (!evaluacion.esValida) {
      setErrorMensaje(
        'La contraseña debe tener mínimo 5 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.'
      );
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setErrorMensaje('Las contraseñas no coinciden.');
      return;
    }

    const correo = state.correo || usuarioActual?.correo || 'juanelpro2005@gmail.com';
    const pin = state.pin || '1234';

    try {
      setCargando(true);
      await restablecerContrasena(correo, pin, nuevaContrasena);
      navigate('/reset-success');
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMensaje(err.message);
      } else {
        setErrorMensaje('No se pudo restablecer la contraseña. Inténtalo de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="newpass-layout">
      <div className="newpass-card">
        <div className="newpass-back-container">
          <button type="button" className="newpass-back-btn" onClick={() => navigate(-1)}>
            <img src={flechaVolver} alt="Volver" className="newpass-back-icon" />
            <span>Volver</span>
          </button>
        </div>

        <div className="newpass-header">
          <h2 className="newpass-title">Nueva Contraseña</h2>
          <p className="newpass-subtitle">
            Crea una nueva contraseña para tu cuenta
          </p>
        </div>

        <div className="newpass-form-box">
          <form className="newpass-form" onSubmit={manejarEnvio}>
            {errorMensaje && (
              <span style={{ color: '#D5473A', fontWeight: 600, fontSize: '13px', marginBottom: '12px', display: 'block' }}>
                {errorMensaje}
              </span>
            )}

            <InputField
              label="Nueva Contraseña"
              type={mostrarNueva ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarNueva} />}
              onRightIconClick={() => setMostrarNueva((prev) => !prev)}
              rightIconAriaLabel={mostrarNueva ? 'Ocultar contraseña' : 'Ver contraseña'}
              disabled={cargando}
            />

            <InputField
              label="Confirmar Contraseña"
              type={mostrarConfirmar ? 'text' : 'password'}
              placeholder="••••••••••••••••"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarConfirmar} />}
              onRightIconClick={() => setMostrarConfirmar((prev) => !prev)}
              rightIconAriaLabel={mostrarConfirmar ? 'Ocultar contraseña' : 'Ver contraseña'}
              disabled={cargando}
            />

            <div className="newpass-button-container">
              <Button variant="solid" type="submit" disabled={cargando}>
                {cargando ? 'Restableciendo...' : 'Restablecer Contraseña'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
