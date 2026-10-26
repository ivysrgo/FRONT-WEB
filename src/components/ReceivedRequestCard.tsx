import React from 'react';
import './ReceivedRequestCard.css';

interface ReceivedRequestCardProps {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Pendiente';
  onAccept?: () => void;
  onReject?: () => void;
}

export const ReceivedRequestCard: React.FC<ReceivedRequestCardProps> = ({
  type,
  author,
  title,
  message,
  status,
  onAccept,
  onReject
}) => {
  const initial = author.charAt(0).toUpperCase();

  return (
    <article className="received-card">
      <div className="received-card-left">
        <div className="avatar-circle">{initial}</div>
        
        <div className="received-info">
          <span className="received-type">
            {type} · <span className="received-author">{author}</span>
          </span>
          <h3 className="received-title">{title}</h3>
          <p className="received-message">{message}</p>
        </div>
      </div>

      <div className="received-actions">
        {status === 'Aceptado' ? (
          <span className="badge-aceptado-blue">Aceptado</span>
        ) : (
          <div className="action-buttons-group">
            <button className="btn-accept-solid" onClick={onAccept}>Aceptar</button>
            <button className="btn-reject-outline" onClick={onReject}>Rechazar</button>
          </div>
        )}
      </div>
    </article>
  );
};