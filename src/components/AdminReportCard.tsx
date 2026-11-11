import React from 'react';
import './AdminReportCard.css';

interface AdminReportCardProps {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  description: string;
  onViewReport?: () => void;
  onViewProfile?: () => void;
  statusBadge?: 'Eliminada' | 'Rechazada' | string;
}

export const AdminReportCard: React.FC<AdminReportCardProps> = ({
  type,
  author,
  title,
  description,
  onViewReport,
  onViewProfile,
  statusBadge
}) => {
  const initial = author ? author.charAt(0).toUpperCase() : '?';

  const getBadgeClass = (status?: string) => {
    if (status === 'Eliminada') return 'badge-eliminada';
    if (status === 'Rechazada') return 'badge-rechazada';
    return 'badge-default';
  };

  return (
    <article className="admin-report-card">
      <div className="report-avatar-col">
        {onViewProfile ? (
          <button
            type="button"
            className="report-avatar-circle report-avatar-button"
            onClick={onViewProfile}
            aria-label={`Ver perfil de ${author}`}
            title={`Ver perfil de ${author}`}
          >
            {initial}
          </button>
        ) : (
          <div className="report-avatar-circle">{initial}</div>
        )}
      </div>
      
      <div className="report-info-col">
        <div className="report-meta-row">
          <span className="report-type">{type}</span>
          <span className="report-dot">·</span>
          <span className="report-author">{author}</span>
        </div>
        <h3 className="report-title">{title}</h3>
        <p className="report-description">{description}</p>
      </div>

      <div className="report-action-col">
        {statusBadge ? (
          <span className={`report-status-badge ${getBadgeClass(statusBadge)}`}>
            {statusBadge}
          </span>
        ) : (
          <button className="btn-ver-reporte" onClick={onViewReport}>
            Ver reporte
          </button>
        )}
      </div>
    </article>
  );
};