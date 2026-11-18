import React from 'react';
import closeIcon from '../assets/cerrarx.svg';
import './ModalCloseButton.css';

interface ModalCloseButtonProps {
  onClose: () => void;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClose }) => (
  <button
    type="button"
    className="modal-close-x"
    onClick={onClose}
    aria-label="Cerrar"
  >
    <img src={closeIcon} alt="" />
  </button>
);
