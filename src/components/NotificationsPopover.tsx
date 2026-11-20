import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solicitar } from '../services/api';
import type { NotificacionItem } from '../services/notificacionService';
import './NotificationsPopover.css';

interface NotificationsPopoverProps {
  onClose: () => void;
  isAdmin?: boolean;
  // Notificaciones del usuario (las carga el Navbar); null mientras cargan
  notificaciones?: NotificacionItem[] | null;
  error?: string | null;
  // Solo admin: cantidad de reportes pendientes (la carga el AdminNavbar)
  reportesPendientes?: number;
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

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M10 20.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  onClose,
  isAdmin = false,
  notificaciones = null,
  error = null,
  reportesPendientes = 0,
}) => {
  const navigate = useNavigate();
  const [remoteNotifs, setRemoteNotifs] = useState<NotificacionItem[]>([]);
  const [cargandoAdmin, setCargandoAdmin] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setCargandoAdmin(true);
      solicitar<any[]>('/notificaciones')
        .then((items) => {
          setRemoteNotifs(
            items.map((it) => ({
              id: it.id,
              type: it.type || 'caducar',
              title: it.title,
              details: it.details || [it.message],
              path: it.path || it.link || '/admin/dashboard',
            }))
          );
        })
        .catch(() => setRemoteNotifs([]))
        .finally(() => setCargandoAdmin(false));
    }
  }, [isAdmin, reportesPendientes]);

  const notifications = isAdmin ? remoteNotifs : notificaciones ?? [];
  const cargando = isAdmin ? cargandoAdmin : notificaciones === null && !error;

  const goToNotification = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="nav-popover notifications-popover" role="dialog" aria-label="Notificaciones">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
        {!cargando && notifications.length > 0 && (
          <span className="notifications-count">{notifications.length} nuevas</span>
        )}
      </div>

      {cargando ? (
        <p className="notifications-empty">Cargando notificaciones...</p>
      ) : error && !isAdmin ? (
        <p className="notifications-empty">{error}</p>
      ) : notifications.length > 0 ? (
        <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <button type="button" className="notification-item" onClick={() => goToNotification(notification.path)}>
              <span className={`notification-icon icon-${notification.type}`}>
                {notification.type === 'caducar' ? (
                  <BellIcon />
                ) : notification.type === 'respuesta' ? (
                  <CheckIcon />
                ) : (
                  <PencilIcon />
                )}
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
