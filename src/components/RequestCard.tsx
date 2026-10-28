import React from 'react';
import './RequestCard.css';

interface RequestCardProps {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  title: string;
  message: string;
  date: string;
  status: 'Aceptado' | 'Pendiente';
  onCancel?: () => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  type,
  title,
  message,
  date,
  status,
  onCancel,
}) => {
  return (
    <article className="request-card">
      <div className="request-info">
        <span className="request-type">{type}</span>
        <h3 className="request-title">{title}</h3>
        <p className="request-message">{message}</p>
      </div>

      <div className="request-actions">
        <span className="request-date">{date}</span>

        <span className={`request-badge badge-${status.toLowerCase()}`}>
          {status}
        </span>

        {status === 'Pendiente' && (
          <button type="button" className="request-cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </article>
  );
};
