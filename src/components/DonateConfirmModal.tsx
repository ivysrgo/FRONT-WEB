import React from 'react';
import './DonateConfirmModal.css';

import logoSol from '../assets/logosol.svg';
import flechaVolverNegra from '../assets/flechavolvernegra.svg'; 
import { ModalCloseButton } from './ModalCloseButton';

interface DonateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string;
}

export const DonateConfirmModal: React.FC<DonateConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  error = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="donate-modal-content">
        <ModalCloseButton onClose={onClose} />
        
        {/* Flecha de Volver negra en la esquina */}
        <button className="modal-back-btn" onClick={onClose}>
          <img src={flechaVolverNegra} alt="Volver" />
        </button>

        <h2 className="modal-title">Dona a Unidona</h2>
        <p className="modal-subtitle">
          Confirma la donación de tu artículo
        </p>
        
        <div className="modal-logo-container">
          <img src={logoSol} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        {error && <p className="publication-api-error" role="alert">{error}</p>}

        {/* Botón de acción (Celeste) */}
        <button className="modal-btn-cyan" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Procesando…' : 'Confirmar'}
        </button>
      </div>
    </div>
  );
};