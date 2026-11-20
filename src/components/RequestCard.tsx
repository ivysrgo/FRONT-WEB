import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestCard.css';

interface RequestCardProps {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  title: string;
  message: string;
  date: string;
  status: 'Aceptado' | 'Pendiente';
  actionPending?: boolean;
  onCancel?: () => void;
  targetUserId?: string;
  targetUserName?: string;
  targetUserAvatarUrl?: string;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  id,
  type,
  title,
  message,
  date,
  status,
  actionPending = false,
  onCancel,
  targetUserId,
  targetUserName,
  targetUserAvatarUrl,
}) => {
  const navigate = useNavigate();
  const initial = (targetUserName || 'U').charAt(0).toUpperCase();

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (targetUserId) {
      navigate(`/perfil/${targetUserId}`);
    }
  };

  return (
    <article className="request-card" data-request-id={id}>
      <div className="request-card-left">
        <button
          type="button"
          className="avatar-circle-btn"
          onClick={handleAvatarClick}
          title={targetUserId ? `Ver perfil de ${targetUserName || 'usuario'}` : undefined}
          aria-label={`Ver perfil de ${targetUserName || 'usuario'}`}
          disabled={!targetUserId}
        >
          {targetUserAvatarUrl ? (
            <img src={targetUserAvatarUrl} alt={targetUserName || 'Usuario'} className="avatar-img" />
          ) : (
            <div className="avatar-circle">{initial}</div>
          )}
        </button>

        <div className="request-info">
          <span className="request-type">
            {type} {targetUserName ? `· Para: ${targetUserName}` : ''}
          </span>
          <h3 className="request-title">{title}</h3>
          <p className="request-message">{message}</p>
        </div>
      </div>

      <div className="request-actions">
        <span className="request-date">{date}</span>
        
        <span className={`request-badge badge-${status.toLowerCase()}`}>
          {status}
        </span>

        {status === 'Pendiente' && (
          <button className="request-cancel-btn" onClick={onCancel} disabled={actionPending}>
            {actionPending ? 'Cancelando...' : 'Cancelar'}
          </button>
        )}
      </div>
    </article>
  );
};