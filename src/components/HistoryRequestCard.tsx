import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryRequestCard.css';
import estrellaLlena from '../assets/starratingllena.svg';

interface HistoryRequestCardProps {
  id: string;
  type: string; // Ej: "INTERCAMBIO" o "DONACIÓN"
  author: string;
  title: string;
  message: string;
  status: 'Donado' | 'Rechazado' | 'Cancelado' | string;
  isFavorite?: boolean;
  isOwner?: boolean;
  donationRole?: 'DONASTE' | 'RECIBISTE';
  articuloOfrecidoTitle?: string;
  articuloSolicitadoTitle?: string;
  targetUserId?: string;
  targetUserAvatarUrl?: string;
}

export const HistoryRequestCard: React.FC<HistoryRequestCardProps> = ({
  type,
  author,
  title,
  message,
  status,
  isFavorite = false,
  isOwner = false,
  donationRole,
  articuloOfrecidoTitle,
  articuloSolicitadoTitle,
  targetUserId,
  targetUserAvatarUrl,
}) => {
  const navigate = useNavigate();
  // Extraer la primera letra del autor para el avatar
  const initial = author.charAt(0).toUpperCase();

  // Determinar si fue un caso de éxito (para mostrar color azul)
  const isSuccess = status === 'Donado';
  const isExchange = String(type).toUpperCase().includes('INTER');

  // Lógica del texto del badge:
  // - Si es intercambio muestra "Intercambio"
  // - Si es donación muestra "Donaste" si lo publicaste y lo donaste, o "Recibí" si lo recibiste
  let badgeLabel = status;
  if (isSuccess) {
    if (isExchange) {
      badgeLabel = 'Intercambio';
    } else {
      badgeLabel = (donationRole === 'DONASTE' || isOwner) ? 'Donaste' : 'Recibí';
    }
  } else if (status === 'Rechazado') {
    badgeLabel = 'Rechazado';
  } else if (status === 'Cancelado') {
    badgeLabel = 'Cancelado';
  }

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (targetUserId) {
      navigate(`/perfil/${targetUserId}`);
    }
  };

  return (
    <article className="history-card">
      <div className="history-card-left">
        <button
          type="button"
          className="avatar-circle-btn"
          onClick={handleAvatarClick}
          title={targetUserId ? `Ver perfil de ${author}` : undefined}
          aria-label={`Ver perfil de ${author}`}
          disabled={!targetUserId}
        >
          {targetUserAvatarUrl ? (
            <img src={targetUserAvatarUrl} alt={author} className="avatar-img" />
          ) : (
            <div className="avatar-circle">{initial}</div>
          )}
        </button>
        
        <div className="history-info">
          <span className="history-type">
            {type} · <span className="history-author">{author}</span>
          </span>
          <h3 className="history-title">{title}</h3>
          <p className="history-message">{message}</p>

          {/* Sección de detalle para los intercambios: muestra qué fue lo que se intercambió */}
          {isExchange && isSuccess && (
            <div className="history-exchange-details">
              <span className="exchange-label">Detalle del intercambio:</span>
              <div className="exchange-flow">
                <span className="exchange-item-pill">
                  {isOwner ? 'Entregaste: ' : 'Recibiste: '}
                  <strong>{articuloSolicitadoTitle || title}</strong>
                </span>
                <span className="exchange-separator" aria-hidden="true">⇄</span>
                <span className="exchange-item-pill">
                  {isOwner ? 'Recibiste: ' : 'Entregaste: '}
                  <strong>{articuloOfrecidoTitle || 'Artículo acordado'}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="history-actions">
        {/* Estrella visual estática (solo si el usuario había marcado el producto como favorito) */}
        {isFavorite && (
          <img
            src={estrellaLlena}
            alt="Favorito"
            className="history-star-static"
            title="Artículo en tus favoritos"
          />
        )}
        
        {/* Badge de estado (Azul para éxito, Gris para Rechazado) */}
        <span className={`history-badge ${isSuccess ? 'badge-success-blue' : 'badge-rejected-gray'}`}>
          {badgeLabel}
        </span>
      </div>
    </article>
  );
};