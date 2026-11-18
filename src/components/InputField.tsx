import React from 'react';
import './InputField.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  rightIconAriaLabel?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  rightIcon,
  onRightIconClick,
  rightIconAriaLabel,
  ...props
}) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <div className="input-container">
        <input className="ui-input" {...props} />
        {rightIcon && (
          <button
            type="button"
            className="input-icon-btn"
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
            title={rightIconAriaLabel}
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};
