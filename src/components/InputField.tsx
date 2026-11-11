import React, { useId, useState } from 'react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightIcon?: React.ReactNode; // Para poner el icono del ojito después
}

export const InputField: React.FC<InputFieldProps> = ({ label, rightIcon, type, id, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [mostrarValor, setMostrarValor] = useState(false);
  const esContrasena = type === 'password';

  return (
    <div className="input-wrapper">
      <label className="input-label" htmlFor={inputId}>{label}</label>
      <div className="input-container">
        <input
          id={inputId}
          className="ui-input"
          type={esContrasena && mostrarValor ? 'text' : type}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            className="input-icon-btn"
            onClick={esContrasena ? () => setMostrarValor((visible) => !visible) : undefined}
            aria-label={esContrasena ? (mostrarValor ? 'Ocultar contraseña' : 'Mostrar contraseña') : undefined}
            aria-pressed={esContrasena ? mostrarValor : undefined}
            disabled={props.disabled}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};