import React from 'react';
import './HistoryRequestCard.css';

interface HistoryRequestCardProps {
  id: string;
  type: string; // Ej: "Intercambio" o "Donación"
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Donado' | 'Rechazado';
}

export const HistoryRequestCard: React.FC<HistoryRequestCardProps> = ({
  type,
  author,
  title,
  message,
  status
}) => {
  // Extraer la primera letra del autor para el avatar
  const initial = author.charAt(0).toUpperCase();

  // Determinar si fue un caso de éxito (para mostrar la estrella y el color azul)
  const isSuccess = status === 'Aceptado' || status === 'Donado';

  return (
    <article className="history-card">
      <div className="history-card-left">
        <div className="avatar-circle">{initial}</div>
        
        <div className="history-info">
          <span className="history-type">
            {type} · <span className="history-author">{author}</span>
          </span>
          <h3 className="history-title">{title}</h3>
          <p className="history-message">{message}</p>
        </div>
      </div>

      <div className="history-actions">
        {/* Estrella SVG condicional (solo si es Aceptado o Donado) */}
        {isSuccess && (
          <svg 
            className="star-icon" 
            viewBox="0 0 24 24" 
            fill="var(--color-acento, #FFCB17)" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        )}
        
        {/* Badge de estado (Azul para éxito, Gris para Rechazado) */}
        <span className={`history-badge ${isSuccess ? 'badge-success-blue' : 'badge-rejected-gray'}`}>
          {status}
        </span>
      </div>
    </article>
  );
};