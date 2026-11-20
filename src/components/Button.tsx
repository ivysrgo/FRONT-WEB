import React from 'react';
import './Button.css'; 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', children, ...props }) => {
  return (
    <button className={`ui-btn ui-btn-${variant}`} {...props}>
      {children}
    </button>
  );
};