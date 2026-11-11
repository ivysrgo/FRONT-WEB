import React from 'react';
import './SuspendAccountModal.css';
import isotipoEcoGolgi from '../assets/logosol.svg';
import flechaVolver from '../assets/flechavolvernegra.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface SuspendAccountModalProps {
  isOpen: boolean;
  accountName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const SuspendAccountModal: React.FC<SuspendAccountModalProps> = ({
  isOpen,
  accountName,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="suspend-modal-overlay">
      <div
        className="suspend-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="suspend-modal-title"
      >
        <ModalCloseButton onClose={onClose} />
        <button
          type="button"
          className="suspend-modal-back"
          onClick={onClose}
          aria-label="Volver sin suspender la cuenta"
        >
          <img src={flechaVolver} alt="" />
        </button>

        <h2 className="suspend-modal-title" id="suspend-modal-title">
          ¿Estás a punto de suspender esta cuenta?
        </h2>
        <p className="suspend-modal-description">
          Si suspendes la cuenta de {accountName}, el usuario perderá temporalmente el acceso y sus publicaciones dejarán de estar disponibles.
        </p>

        <div className="suspend-modal-icon-container">
          <img src={isotipoEcoGolgi} alt="" className="suspend-modal-icon" />
        </div>

        <button
          type="button"
          className="btn-confirmar-suspension"
          onClick={onConfirm}
        >
          Suspender cuenta
        </button>
      </div>
    </div>
  );
};