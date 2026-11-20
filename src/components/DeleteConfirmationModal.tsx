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
          className="modal-back-btn"
          onClick={onClose}
          aria-label="Volver sin eliminar la publicación"
        >
          <img src={flechaVolver} alt="Volver" />
        </button>

        <h2 className="modal-title">¿Estás seguro?</h2>
        <p className="modal-subtitle">
          Si eliminas tu publicación no volverás a tenerla
        </p>
        
        <div className="modal-logo-container">
          <img src={isotipoEcoGolgi} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        <button className="modal-btn-red" onClick={onConfirm}>
          Eliminar Publicación
        </button>
      </div>
    </div>
  );
};
