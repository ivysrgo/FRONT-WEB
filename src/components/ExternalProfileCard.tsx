import React from 'react';
import { StarRating } from './StarRating';
import './ExternalProfileCard.css';

interface ExternalProfileCardProps {
  nombre: string;
  calificacion: number;
  correo: string;
  telefono: string;
}

export const ExternalProfileCard: React.FC<ExternalProfileCardProps> = ({
  nombre,
  calificacion,
  correo,
  telefono
}) => {
  return (
    <div className="external-profile-card">
      {/* Simulación del Avatar (Gris con silueta según diseño) */}
      <div className="profile-avatar-placeholder">
        <svg viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      </div>

      <div className="profile-details">
        <h2 className="profile-name">{nombre}</h2>
        
        <div className="profile-rating-wrapper">
          <StarRating rating={calificacion} />
          <span className="profile-rating-text">
            Calificación: {calificacion.toFixed(1)}
          </span>
        </div>

        <div className="profile-contact-info">
          <p><strong>Correo:</strong> {correo}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
        </div>
      </div>
    </div>
  );
};