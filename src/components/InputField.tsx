import React from 'react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightIcon?: React.ReactNode; // Para poner el icono del ojito después
}

export const InputField: React.FC<InputFieldProps> = ({ label, rightIcon, ...props }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <div className="input-container">
        <input className="ui-input" {...props} />
        {rightIcon && <button type="button" className="input-icon-btn">{rightIcon}</button>}
      </div>
    </div>
  );
};