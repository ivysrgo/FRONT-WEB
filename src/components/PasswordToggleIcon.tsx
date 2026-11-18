import React from 'react';
import ojoSeguridad from '../assets/ojoseguridad.svg';

interface PasswordToggleIconProps {
  visible: boolean;
}

export const PasswordToggleIcon: React.FC<PasswordToggleIconProps> = ({ visible }) => {
  if (!visible) {
    return (
      <img
        src={ojoSeguridad}
        alt="Mostrar contraseña"
        style={{ width: '20px', height: '20px', display: 'block' }}
      />
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24ZM30 24C30 27.3137 27.3137 30 24 30C20.6863 30 18 27.3137 18 24C18 20.6863 20.6863 18 24 18C27.3137 18 30 20.6863 30 24Z"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="6" y1="6" x2="42" y2="42" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

