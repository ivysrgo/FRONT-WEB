import React from 'react';
import './DonateConfirmModal.css';

interface DonateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DonateConfirmModal: React.FC<DonateConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="donate-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="donate-modal-title">
      <div className="donate-modal-content">
        <h2 id="donate-modal-title" className="donate-modal-title">
          Donar a Unidona
        </h2>
        <p className="donate-modal-text">
          ¿Confirmas que deseas escalar este artículo a la red del Banco de Ropa de Unidona para donación formal?
        </p>

        <div className="donate-modal-actions">
          <button type="button" className="donate-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="donate-btn-confirm" onClick={onConfirm}>
            Confirmar Donación
          </button>
        </div>
      </div>
    </div>
  );
};

