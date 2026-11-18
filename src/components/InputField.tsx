import React, { useId, useState } from 'react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  rightIconAriaLabel?: string;
}

<<<<<<< HEAD
export const InputField: React.FC<InputFieldProps> = ({
  label,
  rightIcon,
  onRightIconClick,
  rightIconAriaLabel,
  ...props
}) => {
=======
export const InputField: React.FC<InputFieldProps> = ({ label, rightIcon, type, id, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [mostrarValor, setMostrarValor] = useState(false);
  const esContrasena = type === 'password';

>>>>>>> Luisa
  return (
    <div className="input-wrapper">
      <label className="input-label" htmlFor={inputId}>{label}</label>
      <div className="input-container">
<<<<<<< HEAD
        <input className="ui-input" {...props} />
=======
        <input
          id={inputId}
          className="ui-input"
          type={esContrasena && mostrarValor ? 'text' : type}
          {...props}
        />
>>>>>>> Luisa
        {rightIcon && (
          <button
            type="button"
            className="input-icon-btn"
<<<<<<< HEAD
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
            title={rightIconAriaLabel}
            tabIndex={-1}
=======
            onClick={esContrasena ? () => setMostrarValor((visible) => !visible) : undefined}
            aria-label={esContrasena ? (mostrarValor ? 'Ocultar contraseña' : 'Mostrar contraseña') : undefined}
            aria-pressed={esContrasena ? mostrarValor : undefined}
            disabled={props.disabled}
>>>>>>> Luisa
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};
