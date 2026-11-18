import React from 'react';
import './FavoriteRequestCard.css';

interface FavoriteRequestCardProps {
  id: string;
  type: string; // Ej: "Intercambio" o "Adquisición"
  author: string;
  title: string;
  message: string;
  daysRemaining?: number; // Opcional, para el mensaje de caducidad
}

export const FavoriteRequestCard: React.FC<FavoriteRequestCardProps> = ({
  type,
  author,
  title,
  message,
  daysRemaining
}) => {
  // Extraer la primera letra del autor para el avatar
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
          
          {/* Mensaje de caducidad condicional */}
          {daysRemaining !== undefined && daysRemaining <= 5 && (
            <p className="favorite-expiry">
              {daysRemaining} días restantes · Caduca Pronto
            </p>
          )}
        </div>
      </div>

      <div className="favorite-actions">
        {/* Estrella SVG simple (puedes reemplazar por tu SVG si lo tienes) */}
        <svg 
          className="star-icon" 
          viewBox="0 0 24 24" 
          fill="var(--color-acento, #FFCB17)" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <button className="btn-view-blue">Ver</button>
      </div>
    </article>
  );
};