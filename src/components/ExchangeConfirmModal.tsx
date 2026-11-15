import React, { useState } from 'react';
import './ExchangeConfirmModal.css';

import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import estrellaLlena from '../assets/starratingllena.svg';
import estrellaVacia from '../assets/starratingvacia.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface ExchangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (calificacion: number) => void | Promise<void>;
  nombreOtroUsuario: string;
}

export const ExchangeConfirmModal: React.FC<ExchangeConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  nombreOtroUsuario
}) => {
  const [calificacion, setCalificacion] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const manejarConfirmacion = async () => {
    if (calificacion > 0 && !enviando) {
      setEnviando(true);
      setError(null);
      try {
        await onConfirm(calificacion);
        setCalificacion(0);
        setHoverRating(0);
      } catch (requestError: unknown) {
        setError(requestError instanceof Error ? requestError.message : 'No se pudo confirmar el intercambio.');
      } finally {
        setEnviando(false);
      }
    }
  };

  const cerrarModal = () => {
    setCalificacion(0);
    setHoverRating(0);
    setError(null);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="exchange-modal-content">
        <ModalCloseButton onClose={cerrarModal} />
        
        {/* Flecha de Volver en la esquina superior izquierda */}
        <button className="modal-back-btn" onClick={cerrarModal}>
          <img src={flechaVolverNegra} alt="Volver" />
        </button>

        <h2 className="modal-title">Confirma tu intercambio</h2>
        <p className="modal-subtitle">
          Para confirmar tu intercambio debes calificar tu proceso con {nombreOtroUsuario}.
        </p>
        
        {/* Sistema de Estrellas Interactivo */}
        <div 
          className="interactive-stars-container"
          // Al salir del contenedor completo de estrellas, el hover se limpia 
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((starValue) => {
            // Lógica para iluminar la estrella:
            const isFilled = hoverRating > 0 ? starValue <= hoverRating : starValue <= calificacion;

            return (
              <img 
                key={starValue}
                src={isFilled ? estrellaLlena : estrellaVacia} 
                alt={`Calificar con ${starValue} estrellas`}
                className="interactive-star"
                onClick={() => setCalificacion(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setCalificacion(starValue);
                }}
              />
            );
          })}
        </div>

        {/* El botón "Confirmar" solo aparece si se hizo clic (calificacion > 0) */}
        <div className={`exchange-btn-container ${calificacion > 0 ? 'visible' : 'hidden'}`}>
           <button className="modal-btn-cyan" onClick={() => void manejarConfirmacion()} disabled={enviando}>
            {enviando ? 'Confirmando...' : 'Confirmar'}
          </button>
        </div>
        {error && <p role="alert">{error}</p>}

      </div>
    </div>
  );
};