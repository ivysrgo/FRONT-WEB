import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reportesPendientes } from '../data/adminReports';
import { useArticulos } from '../data/articulos';
import './NotificationsPopover.css';

interface NotificationItem {
  id: string;
  type: 'intercambio' | 'caducar' | 'reporte';
  title: string;
  details: string[];
  path: string;
}

// Alertas de ejemplo hasta conectar el backend
const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'intercambio',
    title: 'Diccionario bilingüe Oxford',
    details: ['3 solicitudes', '15 días para caducar', 'Oportunidad de intercambio'],
    path: '/publicaciones',
  },
  {
    id: '2',
    type: 'caducar',
    title: 'Jeans Clásicos Talla 30',
    details: ['Sin solicitudes', 'Oportunidad de donación a Unidona'],
    path: '/publicaciones',
  },
];

interface NotificationsPopoverProps {
  onClose: () => void;
  isAdmin?: boolean;
}

const PencilIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5v5.5M12 16.5v.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  onClose,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const articulos = useArticulos();
  const adminNotifications: NotificationItem[] = [
    ...(reportesPendientes.length > 0
      ? [{
          id: 'admin-reports',
          type: 'reporte' as const,
          title: 'Reportes pendientes',
          details: [`${reportesPendientes.length} reportes requieren revisión`],
          path: '/admin/reportes'
        }]
      : []),
    ...articulos
      .filter((article) => (article.expirationDays ?? 30) - article.daysElapsed <= 5)
      .map((article) => ({
        id: `expiration-${article.id}`,
        type: 'caducar' as const,
        title: article.title,
        details: [`${Math.max(0, (article.expirationDays ?? 30) - article.daysElapsed)} días restantes`],
        path: `/admin/articulo/${article.id}`
      }))
  ];
  const notifications = isAdmin ? adminNotifications : NOTIFICATIONS;

  const goToNotification = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="nav-popover notifications-popover" role="dialog" aria-label="Notificaciones">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
        <span className="notifications-count">{notifications.length} nuevas</span>
      </div>

      {notifications.length > 0 ? (
        <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <button type="button" className="notification-item" onClick={() => goToNotification(notification.path)}>
              <span className={`notification-icon icon-${notification.type}`}>
                {notification.type === 'caducar' ? <AlertIcon /> : <PencilIcon />}
              </span>
              <span className="notification-text">
                <span className="notification-title">{notification.title}</span>
                {notification.type === 'caducar' && !isAdmin && (
                  <span className="notification-tag">Próximo a caducar</span>
                )}
                <span className="notification-details">{notification.details.join(' · ')}</span>
              </span>
            </button>
          </li>
        ))}
        </ul>
      ) : (
        <p className="notifications-empty">No tienes notificaciones pendientes.</p>
      )}

      <button
        type="button"
        className="notifications-footer"
        onClick={() => goToNotification(isAdmin ? '/admin/reportes' : '/publicaciones')}
      >
        {isAdmin ? 'Ver reportes pendientes →' : 'Ver mis publicaciones →'}
      </button>
    </div>
  );
};
