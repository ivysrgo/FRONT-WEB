import React from 'react';
import { ProgressBar } from './ProgressBar';
import './PostCard.css';

interface PostCardProps {
  id: string;
  category: string;
  title: string;
  details: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
  onEdit?: () => void;
  onDonateUnidona?: () => void;
  onDelete?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  category,
  title,
  details,
  requests,
  status,
  daysElapsed,
  imageUrl,
  onEdit,
  onDonateUnidona,
  onDelete,
}) => {
  const isExpired = status === 'Caducado';
  const isDonated = status === 'Donado';
  const isActive = status === 'Disponible' || status === 'Reservado';

  return (
    <div className={`post-card-wrapper ${isExpired ? 'card-expired' : ''}`}>
      <article className="post-card">
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

        <div className="post-actions">
          <div className="post-requests">
            <span className="request-number">{requests}</span>
            <span className="request-label">Solicitudes</span>
          </div>

          <div className="post-badges-row">
            <span className={`status-badge badge-${status.toLowerCase()}`}>
              {isDonated ? 'Donado - Unidona' : status}
            </span>
            <button type="button" className="edit-btn" onClick={onEdit}>
              Editar
            </button>
            {onDelete && (
              <button type="button" className="edit-btn" onClick={onDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </article>

      {isActive && (
        <div className="post-bottom-section">
          <ProgressBar daysElapsed={daysElapsed} totalDays={30} />
        </div>
      )}

      {isDonated && (
        <div className="post-bottom-alert alert-black">
          <strong>Escalado a donación formal.</strong> Registrado en la red del Banco de Ropa de Unidona. El seguimiento logístico se gestiona fuera de la plataforma.
        </div>
      )}

      {isExpired && (
        <div className="post-bottom-alert alert-orange">
          <div className="alert-text">
            <strong>Sin intercambio local en 30 días</strong>
            <br />
            Puedes escalar este artículo a la red del Banco de Ropa de Unidona para donación formal.
          </div>
          <button
            type="button"
            className="donate-btn-orange"
            onClick={onDonateUnidona}
          >
            Donar al Unidona
          </button>
        </div>
      )}
    </div>
  );
};
