import React from 'react';
import './AdminUserCard.css';

interface AdminUserCardProps {
  id: string;
  name: string;
  dateText: string;
  status: 'Activo' | 'Suspendido';
}

export const AdminUserCard: React.FC<AdminUserCardProps> = ({
  name,
  dateText,
  status
}) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const isActive = status === 'Activo';

  return (
    <article className="admin-user-card">
      <div className="user-avatar-col">
        <div className="user-avatar-circle">{initial}</div>
      </div>
      
      <div className="user-info-col">
        <h3 className="user-name">{name}</h3>
        <p className="user-date">
          {isActive ? 'Activo desde: ' : 'Suspendido desde: '}
          {dateText}
        </p>
      </div>

      <div className="user-status-col">
        <span className={`user-status-badge ${isActive ? 'badge-active' : 'badge-suspended'}`}>
          {status}
        </span>
      </div>
    </article>
  );
};