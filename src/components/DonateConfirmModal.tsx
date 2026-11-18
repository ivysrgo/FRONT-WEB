import React from 'react';
import './DonateConfirmModal.css';

<<<<<<< HEAD
=======
import logoSol from '../assets/logosol.svg';
import flechaVolverNegra from '../assets/flechavolvernegra.svg'; 
import { ModalCloseButton } from './ModalCloseButton';

>>>>>>> Luisa
interface DonateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DonateConfirmModal: React.FC<DonateConfirmModalProps> = ({
  isOpen,
  onClose,
<<<<<<< HEAD
  onConfirm,
=======
  onConfirm
>>>>>>> Luisa
}) => {
  if (!isOpen) return null;

  return (
<<<<<<< HEAD
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

=======
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

        {/* Botón de acción (Celeste) */}
        <button className="modal-btn-cyan" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
};
>>>>>>> Luisa
