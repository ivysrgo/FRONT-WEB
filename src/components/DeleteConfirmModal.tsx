import React from 'react';
import './DeleteConfirmModal.css';

// Reutilizamos el icono del sol que ya tienes
import logoSol from '../assets/logosol.svg';
// Importamos la flecha de volver negra
import flechaVolverNegra from '../assets/flechavolvernegra.svg';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal-content">
        
        {/* Flecha de Volver negra en la esquina superior izquierda */}
        <button className="modal-back-btn" onClick={onClose}>
          <img src={flechaVolverNegra} alt="Volver" />
        </button>

        <h2 className="modal-title">¿Estás seguro?</h2>
        <p className="modal-subtitle">
          Si eliminas tu publicación no volverás a tenerla
        </p>
        
        <div className="modal-logo-container">
          <img src={logoSol} alt="Eco-Golgi Sol" className="modal-logo" />
        </div>

        {/* Botón de acción destructiva (Rojo) */}
        <button className="modal-btn-red" onClick={onConfirm}>
          Eliminar Publicación
        </button>
      </div>
    </div>
  );
};