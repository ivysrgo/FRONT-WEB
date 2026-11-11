import React from 'react';
import './ExpirationUpdatedModal.css';
import isotipoEcoGolgi from '../assets/logosol.svg';
import flechaVolver from '../assets/flechavolvernegra.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface ExpirationUpdatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpirationUpdatedModal: React.FC<ExpirationUpdatedModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="expiration-updated-overlay">
      <div
        className="expiration-updated-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="expiration-updated-title"
      >
        <ModalCloseButton onClose={onClose} />
        <button
          type="button"
          className="expiration-updated-back"
          onClick={onClose}
          aria-label="Volver a la administración"
        >
          <img src={flechaVolver} alt="" />
        </button>
        <h2 className="expiration-updated-title" id="expiration-updated-title">
          Caducidad actualizada correctamente
        </h2>
        <img className="expiration-updated-icon" src={isotipoEcoGolgi} alt="" />
        <button className="expiration-updated-button" type="button" onClick={onClose}>
          Volver a Administrar
        </button>
      </div>
    </div>
  );
};