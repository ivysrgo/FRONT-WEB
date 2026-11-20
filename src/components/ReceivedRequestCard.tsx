import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceivedRequestCard.css';

interface ReceivedRequestCardProps {
  id: string;
  articleId: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Pendiente';
  actionPending?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
  authorId?: string;
  authorAvatarUrl?: string;
}

export const ReceivedRequestCard: React.FC<ReceivedRequestCardProps> = ({
  id,
  articleId,
  type,
  author,
  title,
  message,
  status,
  actionPending = false,
  onAccept,
  onReject,
  onComplete,
  authorId,
  authorAvatarUrl,
}) => {
  const initial = author.charAt(0).toUpperCase();
  const navigate = useNavigate();

  return (
    <article className="received-card" data-request-id={id}>
      <div className="received-card-left">
        <button
          type="button"
          className="avatar-circle-btn"
          onClick={() => authorId && navigate(`/perfil/${authorId}`)}
          title={authorId ? `Ver perfil de ${author}` : undefined}
          aria-label={`Ver perfil de ${author}`}
          disabled={!authorId}
        >
          {authorAvatarUrl ? (
            <img src={authorAvatarUrl} alt={author} className="avatar-img" />
          ) : (
            <div className="avatar-circle">{initial}</div>
          )}
        </button>
        
        <div className="received-info">
          <span className="received-type">
            {type} · <span className="received-author">{author}</span>
          </span>
          <h3 className="received-title">{title}</h3>
          <p className="received-message">{message}</p>
          <button type="button" className="received-view-btn" onClick={() => navigate(`/articulo/${articleId}`)}>
            Ver artículo
          </button>
        </div>
      </div>

      <div className="received-actions">
        {status === 'Aceptado' ? (
          <div className="action-buttons-group">
            <span className="badge-aceptado-blue">Aceptado</span>
            <button className="btn-accept-solid" onClick={onComplete} disabled={actionPending}>
              {actionPending ? 'Guardando...' : 'Marcar entregada'}
            </button>
          </div>
        ) : (
          <div className="action-buttons-group">
            <button className="btn-accept-solid" onClick={onAccept} disabled={actionPending}>
              {actionPending ? 'Guardando...' : 'Aceptar'}
            </button>
            <button className="btn-reject-outline" onClick={onReject} disabled={actionPending}>Rechazar</button>
          </div>
        )}
      </div>
    </article>
  );
};