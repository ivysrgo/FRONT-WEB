import React from 'react';
import { StarRating } from './StarRating';
import './AdminUserCard.css';

interface AdminUserCardProps {
  id: string;
  name: string;
  dateText: string;
  status: 'Activo' | 'Suspendido';
  rating?: number;
  ratingCount?: number;
  avatarUrl?: string;
  onClick?: () => void;
}

export const AdminUserCard: React.FC<AdminUserCardProps> = ({
  name,
  dateText,
  status,
  rating,
  ratingCount = 0,
  avatarUrl,
  onClick
}) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const isActive = status === 'Activo';

  const contenido = (
    <>
      <div className="user-avatar-col">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="user-avatar-circle" style={{ objectFit: 'cover' }} />
        ) : (
          <div className="user-avatar-circle">{initial}</div>
        )}
      </div>

      <div className="user-info-col">
        <h3 className="user-name">{name}</h3>
        <p className="user-date">
          {isActive ? 'Activo desde: ' : 'Suspendido desde: '}
          {dateText}
        </p>
        {rating !== undefined && (
          <div className="user-rating-row">
            <StarRating rating={rating} size={14} />
            <span className="user-rating-text">
              {ratingCount > 0 ? `${rating.toFixed(1)} (${ratingCount})` : 'Sin calificaciones'}
            </span>
          </div>
        )}
      </div>

      <div className="user-status-col">
        <span className={`user-status-badge ${isActive ? 'badge-active' : 'badge-suspended'}`}>
          {status}
        </span>
      </div>
    </>
  );

  return onClick ? (
    <button type="button" className="admin-user-card admin-user-card-button" onClick={onClick}>
      {contenido}
    </button>
  ) : (
    <article className="admin-user-card">{contenido}</article>
  );
};
