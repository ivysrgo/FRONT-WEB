import React, { useEffect, useState } from 'react';
import './ReportarPublicacionModal.css';
import checkCircleReport from '../assets/checkcirclereport.svg';
import { ModalCloseButton } from './ModalCloseButton';

interface ReportarPublicacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const motivosReporte = [
  'Simplemente no me gusta',
  'Venta o promoción de artículos restringidos',
  'Spam, fraude o estafa',
  'Información falsa',
];

export const ReportarPublicacionModal: React.FC<ReportarPublicacionModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [reporteEnviado, setReporteEnviado] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const manejarTecla = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setReporteEnviado(false);
        onClose();
      }
    };

    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cerrarModal = () => {
    setReporteEnviado(false);
    onClose();
  };

  const continuarExplorando = () => {
    setReporteEnviado(false);
    onContinue();
  };

  return (
    <div
      className="reporte-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) cerrarModal();
      }}
    >
      <section
        className={`reporte-modal ${reporteEnviado ? 'reporte-modal-exito' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reporte-modal-title"
      >
        <ModalCloseButton onClose={cerrarModal} />
        <header className="reporte-modal-header">
          <h2 id="reporte-modal-title">Reportar Publicación</h2>
        </header>

        {reporteEnviado ? (
          <div className="reporte-confirmacion" role="status">
            <img src={checkCircleReport} alt="" className="reporte-check" />
            <h3>Gracias por tu Feedback</h3>
            <p>
              Tu feedback es importante pues nos ayuda a mantener la comunidad segura
            </p>
            <button
              type="button"
              className="reporte-continuar"
              onClick={continuarExplorando}
            >
              Continuar Explorando
            </button>
          </div>
        ) : (
          <div className="reporte-opciones">
            <p>¿Por qué quieres reportar esta publicación?</p>
            <div className="reporte-motivos">
              {motivosReporte.map((motivo) => (
                <button
                  type="button"
                  className="reporte-motivo"
                  key={motivo}
                  onClick={() => setReporteEnviado(true)}
                >
                  <span>{motivo}</span>
                  <span className="reporte-chevron" aria-hidden="true">▸</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
