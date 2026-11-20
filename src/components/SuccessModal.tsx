import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessModal.css';

import logoSol from '../assets/logosol.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  buttonText: string;
  redirectPath?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'danger';
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  subtitle,
  buttonText,
  redirectPath,
  onButtonClick,
  variant = 'default',
  onClose
}) => {
  const navigate = useNavigate();

  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${variant === 'danger' ? 'modal-content-danger' : ''}`}>
        <ModalCloseButton onClose={onClose} />
        <h2 className="modal-title">{title}</h2>
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
        
        <div className="modal-logo-container">
          <img src={logoSol} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        <button 
          className={variant === 'danger' ? 'modal-btn-red' : 'modal-btn-blue'} 
          onClick={() => (onButtonClick ? onButtonClick() : redirectPath && navigate(redirectPath))}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};