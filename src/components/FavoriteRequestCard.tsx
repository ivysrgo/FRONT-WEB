import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteRequestCard.css';
import estrellaLlena from '../assets/starratingllena.svg';

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
  authorId?: string;
  authorAvatarUrl?: string;
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
  authorId,
  authorAvatarUrl,
}) => {
  const navigate = useNavigate();
  // Extraer la primera letra del autor para el avatar
  const initial = author.charAt(0).toUpperCase();

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (authorId) {
      navigate(`/perfil/${authorId}`);
    }
  };

  return (
    <article className="favorite-card" data-article-id={id}>
      <div className="favorite-card-left">
        <button
          type="button"
          className="avatar-circle-btn"
          onClick={handleAvatarClick}
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
          <img
            src={estrellaLlena}
            alt="Favorito"
            className="star-icon"
          />
        </button>
        <button type="button" className="btn-view-blue" onClick={onView}>Ver</button>
      </div>
    </article>
  );
};