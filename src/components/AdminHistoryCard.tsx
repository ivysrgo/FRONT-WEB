import React from 'react';
import './AdminHistoryCard.css';

interface AdminHistoryCardProps {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  date: string;
  description: string;
  onViewArticle?: () => void;
}

export const AdminHistoryCard: React.FC<AdminHistoryCardProps> = ({
  type,
  author,
  title,
  date,
  description,
  onViewArticle
}) => {
  // Obtener la inicial para el avatar
  const initial = author ? author.charAt(0).toUpperCase() : '?';

  return (
    <article className="admin-history-card">
      <div className="history-avatar-col">
        <div className="history-avatar-circle">{initial}</div>
      </div>
      
      <div className="history-info-col">
        <div className="history-meta-row">
          <span className="history-type">{type}</span>
          <span className="history-dot">·</span>
          <span className="history-author">{author}</span>
        </div>
        <h3 className="history-title">{title}</h3>
        <span className="history-date">Donado: {date}</span>
        <p className="history-description">{description}</p>
      </div>

      <div className="history-action-col">
        <button className="btn-ver-articulo" onClick={onViewArticle}>
          Ver Artículo
        </button>
      </div>
    </article>
  );
};