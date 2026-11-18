import React from 'react';
import './DeleteConfirmationModal.css';
import isotipoEcoGolgi from '../assets/logosol.svg';
import flechaVolver from '../assets/flechavolvernegra.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal-content">
        <ModalCloseButton onClose={onClose} />
        <button
          type="button"
          className="delete-modal-back"
          onClick={onClose}
          aria-label="Volver sin eliminar la publicación"
        >
          <img src={flechaVolver} alt="" />
        </button>

        <h2 className="delete-modal-title">¿Estás a punto de eliminar esta publicación?</h2>
        <p className="delete-modal-description">
          Si eliminas esta publicación, dejará de estar disponible y no podrá recuperarse.
        </p>
        
        <div className="delete-modal-icon-container">
          <img src={isotipoEcoGolgi} alt="Eco-Golgi" className="delete-modal-icon" />
        </div>

        <button className="btn-confirmar-eliminacion" onClick={onConfirm}>
          Eliminar publicación
        </button>
      </div>
    </div>
  );
};