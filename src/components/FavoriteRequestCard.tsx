import React from 'react';
import './FavoriteRequestCard.css';

interface FavoriteRequestCardProps {
  id: string;
  type: string; // Ej: "Intercambio" o "Adquisición"
  author: string;
  title: string;
  message: string;
  daysRemaining: number;
  status: string;
  actionPending?: boolean;
  onRemove: () => void;
  onView: () => void;
}

export const FavoriteRequestCard: React.FC<FavoriteRequestCardProps> = ({
  id,
  type,
  author,
  title,
  message,
  daysRemaining,
  status,
  actionPending = false,
  onRemove,
  onView,
}) => {
  // Extraer la primera letra del autor para el avatar
  const initial = author.charAt(0).toUpperCase();

  return (
    <article className="favorite-card" data-article-id={id}>
      <div className="favorite-card-left">
        <div className="avatar-circle">{initial}</div>
        
        <div className="favorite-info">
          <span className="favorite-type">
            {type} · <span className="favorite-author">{author}</span>
          </span>
          <h3 className="favorite-title">{title}</h3>
          <p className="favorite-message">{message}</p>
          
          {/* Mensaje de caducidad condicional */}
          {status === 'Caducado' || daysRemaining <= 0 ? (
            <p className="favorite-expiry" role="status">Publicación caducada</p>
          ) : daysRemaining <= 5 ? (
            <p className="favorite-expiry" role="status">
              Faltan {daysRemaining} {daysRemaining === 1 ? 'día' : 'días'} · Caduca pronto
            </p>
          ) : null}
        </div>
      </div>

      <div className="favorite-actions">
        <button
          type="button"
          className="favorite-remove-btn"
          aria-label={`Quitar ${title} de favoritos`}
          onClick={onRemove}
          disabled={actionPending}
        >
          <svg
            className="star-icon"
            viewBox="0 0 24 24"
            fill="var(--color-acento, #FFCB17)"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </button>
        <button type="button" className="btn-view-blue" onClick={onView}>Ver</button>
      </div>
    </article>
  );
};