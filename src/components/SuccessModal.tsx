import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessModal.css';

// Importa el logo que mencionaste
import logoSol from '../assets/logosol.svg';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  redirectPath: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  subtitle,
  buttonText,
  redirectPath
}) => {
  const navigate = useNavigate();

  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>
        
        <div className="modal-logo-container">
          <img src={logoSol} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        <button 
          className="modal-btn-blue" 
          onClick={() => navigate(redirectPath)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};