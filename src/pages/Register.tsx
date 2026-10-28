import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import './Register.css';

import logoSol from '../assets/logosol.svg'; 
import ojoSeguridad from '../assets/ojoseguridad.svg'; 

export const Register: React.FC = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);

  const manejarRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !correo || !contrasena || !confirmarContrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError(null);
    console.log('Registrando usuario:', { nombre, correo, contrasena });
    navigate('/login');
  };

  return (
    <div className="register-layout">
      <div className="register-center-wrapper">
        <img src={logoSol} alt="Sol Eco-Golgi" className="register-floating-logo" />

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
            />
            <InputField 
              label="Correo Electrónico" 
              type="email" 
              placeholder="Ej: correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <InputField 
              label="Contraseña" 
              type="password" 
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
            />
            <InputField 
              label="Confirmar Contraseña" 
              type="password" 
              placeholder="Confirma tu contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              rightIcon={<img src={ojoSeguridad} alt="Ver" style={{ width: '20px', height: '20px' }} />} 
            />

            <div className="security-level">
              <span className="security-label">Nivel de Seguridad</span>
              <div className="security-bar">
                {/* Lógica inmutable de React: calculamos el ancho derivado de la longitud de la contraseña */}
                <div className="security-fill" style={{ width: `${Math.min(contrasena.length * 10, 100)}%` }}></div>
              </div>
            </div>

            <div className="button-section">
              <Button variant="solid" type="submit">Registrarse</Button>
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