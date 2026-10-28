import React from 'react';
import './FavoriteRequestCard.css';

interface FavoriteRequestCardProps {
  id: string;
  type: string;
  author: string;
  title: string;
  message: string;
  daysRemaining?: number;
  onRemoveFavorite?: () => void;
  onView?: () => void;
}

export const FavoriteRequestCard: React.FC<FavoriteRequestCardProps> = ({
  type,
  author,
  title,
  message,
  daysRemaining,
  onRemoveFavorite,
  onView,
}) => {
  const initial = author.charAt(0).toUpperCase();

  return (
    <article className="favorite-card">
      <div className="favorite-card-left">
        <div className="avatar-circle">{initial}</div>

        <div className="favorite-info">
          <span className="favorite-type">
            {type} · <span className="favorite-author">{author}</span>
          </span>
          <h3 className="favorite-title">{title}</h3>
          <p className="favorite-message">{message}</p>

          {daysRemaining !== undefined && daysRemaining <= 5 && (
            <p className="favorite-expiry">
              {daysRemaining} días restantes · Caduca Pronto
            </p>
          )}
        </div>
      </div>

      <div className="favorite-actions">
        <svg
          className="star-icon"
          viewBox="0 0 24 24"
          fill="var(--color-acento, #FFCB17)"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: onRemoveFavorite ? 'pointer' : 'default' }}
          onClick={onRemoveFavorite}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <button type="button" className="btn-view-blue" onClick={onView}>
          Ver
        </button>
      </div>
    </article>
  );
};
