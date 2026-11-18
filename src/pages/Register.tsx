import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { PasswordToggleIcon } from '../components/PasswordToggleIcon';
import './Register.css';

<<<<<<< HEAD
import logoSol from '../assets/logosol.svg';
import { registrar, guardarSesion } from '../services/authService';
import { ApiError } from '../services/api';
import { evaluarSeguridadContrasena, esCorreoValido } from '../utils/validarAuth';
=======
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
>>>>>>> Luisa

export const Register: React.FC = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  // Estados del formulario
>>>>>>> Luisa
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
<<<<<<< HEAD
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Evaluación reactiva de los 5 parámetros de la contraseña
  const evaluacion = evaluarSeguridadContrasena(contrasena);

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

=======
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seguridad = evaluarContrasena(contrasena);

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    
>>>>>>> Luisa
    if (!nombre.trim() || !correo.trim() || !contrasena || !confirmarContrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }
<<<<<<< HEAD

    if (!esCorreoValido(correo.trim())) {
      setError('El formato del correo electrónico no es válido.');
      return;
    }

    if (!evaluacion.esValida) {
      if (!evaluacion.tieneLongitud) {
        setError('La contraseña debe tener como mínimo 5 caracteres.');
      } else if (!evaluacion.tieneMayuscula) {
        setError('La contraseña debe contener al menos 1 letra mayúscula (A-Z).');
      } else if (!evaluacion.tieneMinuscula) {
        setError('La contraseña debe contener al menos 1 letra minúscula (a-z).');
      } else if (!evaluacion.tieneNumero) {
        setError('La contraseña debe contener al menos 1 número (0-9).');
      } else if (!evaluacion.tieneEspecial) {
        setError('La contraseña debe contener al menos 1 carácter especial (ej: !@#$%^&*).');
      }
      return;
    }

=======
>>>>>>> Luisa
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
<<<<<<< HEAD

    try {
      setCargando(true);
      const respuesta = await registrar({
        nombre: nombre.trim(),
        correo: correo.trim(),
        contrasena,
      });

      guardarSesion(respuesta.token, respuesta.usuario);
      navigate('/explorar');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Ocurrió un error al registrar la cuenta. Inténtalo de nuevo.');
      }
=======
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
>>>>>>> Luisa
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-layout">
      <img src={logoSol} alt="" aria-hidden="true" className="register-floating-logo" />
<<<<<<< HEAD
=======

      <div className="register-center-wrapper">
>>>>>>> Luisa

      <div className="register-center-wrapper">
        <h2 className="register-title">Regístrate</h2>

        <div className="register-box">
          <form className="register-form" onSubmit={manejarRegistro}>
<<<<<<< HEAD
            {error && (
              <span className="register-error-message" role="alert">
                {error}
              </span>
            )}
=======
            
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
>>>>>>> Luisa

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
              type={mostrarContrasena ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarContrasena} />}
              onRightIconClick={() => setMostrarContrasena((prev) => !prev)}
              rightIconAriaLabel={mostrarContrasena ? 'Ocultar contraseña' : 'Ver contraseña'}
              disabled={cargando}
            />
            <InputField
              label="Confirmar Contraseña"
              type={mostrarConfirmar ? 'text' : 'password'}
              placeholder="Confirma tu contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              rightIcon={<PasswordToggleIcon visible={mostrarConfirmar} />}
              onRightIconClick={() => setMostrarConfirmar((prev) => !prev)}
              rightIconAriaLabel={mostrarConfirmar ? 'Ocultar contraseña' : 'Ver contraseña'}
              disabled={cargando}
            />

            {/* Barra de Nivel de Seguridad Coherente con los 5 Parámetros */}
            <div className="security-level">
<<<<<<< HEAD
              <div className="security-label-row">
                <span className="security-label">Nivel de Seguridad</span>
                {contrasena.length > 0 && (
                  <span className="security-status" style={{ color: evaluacion.colorBarra }}>
                    {evaluacion.nivelTexto} ({evaluacion.porcentaje}%)
                  </span>
                )}
              </div>

              <div className="security-bar">
                <div
                  className="security-fill"
                  style={{
                    width: `${evaluacion.porcentaje}%`,
                    backgroundColor: evaluacion.colorBarra,
                  }}
                />
              </div>

              {/* Lista visual de los 5 parámetros requeridos */}
              <div className="security-requirements">
                <div className={`requirement-item ${evaluacion.tieneLongitud ? 'met' : ''}`}>
                  <span className="req-icon">{evaluacion.tieneLongitud ? '✔' : '○'}</span>
                  <span>Mínimo 5 caracteres</span>
                </div>
                <div className={`requirement-item ${evaluacion.tieneMayuscula ? 'met' : ''}`}>
                  <span className="req-icon">{evaluacion.tieneMayuscula ? '✔' : '○'}</span>
                  <span>Mínimo 1 letra mayúscula (A-Z)</span>
                </div>
                <div className={`requirement-item ${evaluacion.tieneMinuscula ? 'met' : ''}`}>
                  <span className="req-icon">{evaluacion.tieneMinuscula ? '✔' : '○'}</span>
                  <span>Mínimo 1 letra minúscula (a-z)</span>
                </div>
                <div className={`requirement-item ${evaluacion.tieneNumero ? 'met' : ''}`}>
                  <span className="req-icon">{evaluacion.tieneNumero ? '✔' : '○'}</span>
                  <span>Mínimo 1 número (0-9)</span>
                </div>
                <div className={`requirement-item ${evaluacion.tieneEspecial ? 'met' : ''}`}>
                  <span className="req-icon">{evaluacion.tieneEspecial ? '✔' : '○'}</span>
                  <span>Mínimo 1 carácter especial (!@#$...)</span>
                </div>
=======
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
>>>>>>> Luisa
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
