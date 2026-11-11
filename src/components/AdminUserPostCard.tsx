import React from 'react';
import { ProgressBar } from './ProgressBar';
import './AdminUserPostCard.css';

interface AdminUserPostCardProps {
  id: string;
  category: string;
  title: string;
  details: string; // Ej: "Buen estado - Intercambio"
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
  onEdit?: () => void;
}

export const AdminUserPostCard: React.FC<AdminUserPostCardProps> = ({
  category,
  title,
  details,
  requests,
  status,
  daysElapsed,
  imageUrl,
  onEdit
}) => {
  const isExpired = status === 'Caducado';
  const isActive = status === 'Disponible' || status === 'Reservado';

  return (
    <div className={`admin-user-post-card-wrapper ${isExpired ? 'card-expired' : ''}`}>
      <article className="admin-user-post-card">
        {/* Izquierda: Imagen e Info */}
        <div className="post-info">
          <div className="post-image-box">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="post-text-box">
            <span className="post-category">{category}</span>
            <h3 className="post-item-title">{title}</h3>
            <p className="post-details">{details}</p>
          </div>
        </div>

        {/* Derecha: Solicitudes y Acciones */}
        <div className="post-actions">
          <div className="post-requests">
            <span className="request-number">{requests}</span>
            <span className="request-label">Solicitudes</span>
          </div>
          <div className="post-badges-row">
            <span className={`status-badge badge-${status.toLowerCase()}`}>
              {status}
            </span>
            <button className="edit-btn" onClick={onEdit}>Editar</button>
          </div>
        </div>
      </article>

      {/* Sección inferior: Barra de progreso */}
      {isActive && (
        <div className="post-bottom-section">
          <ProgressBar daysElapsed={daysElapsed} totalDays={30} />
        </div>
      )}
    </div>
  );
};