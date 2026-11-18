import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessModal.css';

import logoSol from '../assets/logosol.svg';
<<<<<<< HEAD
=======
import { ModalCloseButton } from './ModalCloseButton';
>>>>>>> Luisa

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
<<<<<<< HEAD
  subtitle: string;
  buttonText: string;
  redirectPath: string;
=======
  subtitle?: string;
  buttonText: string;
  redirectPath?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'danger';
  onClose: () => void;
>>>>>>> Luisa
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  subtitle,
  buttonText,
<<<<<<< HEAD
  redirectPath
}) => {
  const navigate = useNavigate();

=======
  redirectPath,
  onButtonClick,
  variant = 'default',
  onClose
}) => {
  const navigate = useNavigate();

  // Si no está abierto, no renderiza nada
>>>>>>> Luisa
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
<<<<<<< HEAD
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>
=======
      <div className={`modal-content ${variant === 'danger' ? 'modal-content-danger' : ''}`}>
        <ModalCloseButton onClose={onClose} />
        <h2 className="modal-title">{title}</h2>
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
>>>>>>> Luisa
        
        <div className="modal-logo-container">
          <img src={logoSol} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        <button 
          className="modal-btn-blue" 
<<<<<<< HEAD
          onClick={() => navigate(redirectPath)}
=======
          onClick={() => (onButtonClick ? onButtonClick() : redirectPath && navigate(redirectPath))}
>>>>>>> Luisa
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
<<<<<<< HEAD
};

=======
};
>>>>>>> Luisa
