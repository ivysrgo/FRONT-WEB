import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationsPopover.css';

interface NotificationItem {
  id: string;
  type: 'intercambio' | 'caducar';
  title: string;
  details: string[];
}

// Alertas de ejemplo hasta conectar el backend
const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'intercambio',
    title: 'Diccionario bilingüe Oxford',
    details: ['3 solicitudes', '15 días para caducar', 'Oportunidad de intercambio'],
  },
  {
    id: '2',
    type: 'caducar',
    title: 'Jeans Clásicos Talla 30',
    details: ['Sin solicitudes', 'Oportunidad de donación a Unidona'],
  },
];

interface NotificationsPopoverProps {
  onClose: () => void;
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

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const goToPublicaciones = () => {
    onClose();
    navigate('/publicaciones');
  };

  return (
    <div className="nav-popover notifications-popover" role="dialog" aria-label="Notificaciones">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
        <span className="notifications-count">{NOTIFICATIONS.length} nuevas</span>
      </div>

      <ul className="notifications-list">
        {NOTIFICATIONS.map((notification) => (
          <li key={notification.id}>
            <button type="button" className="notification-item" onClick={goToPublicaciones}>
              <span className={`notification-icon icon-${notification.type}`}>
                {notification.type === 'caducar' ? <AlertIcon /> : <PencilIcon />}
              </span>
              <span className="notification-text">
                <span className="notification-title">{notification.title}</span>
                {notification.type === 'caducar' && (
                  <span className="notification-tag">Próximo a caducar</span>
                )}
                <span className="notification-details">{notification.details.join(' · ')}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="notifications-footer" onClick={goToPublicaciones}>
        Ver mis publicaciones →
      </button>
    </div>
  );
};
