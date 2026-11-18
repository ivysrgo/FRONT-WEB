import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerNotificaciones,
  marcarComoLeida,
  marcarTodasComoLeidas,
  type NotificacionDTO,
} from '../services/notificacionService';
import './NotificationsPopover.css';

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

const HeartHandshakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 9.5a4 4 0 0 1 5.66-5.66L12 5.67l1.84-1.83a4 4 0 1 1 5.66 5.66l-7.5 7.5-7.5-7.5Z"
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

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState<NotificacionDTO[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;
    obtenerNotificaciones().then((datos) => {
      if (!cancelado) {
        setNotificaciones(datos);
        setCargando(false);
      }
    });

    const handleActualizacion = () => {
      obtenerNotificaciones().then((datos) => {
        if (!cancelado) setNotificaciones(datos);
      });
    };

    window.addEventListener('notificaciones-actualizadas', handleActualizacion);
    return () => {
      cancelado = true;
      window.removeEventListener('notificaciones-actualizadas', handleActualizacion);
    };
  }, []);

  const unreadCount = notificaciones.filter((n) => !n.read).length;

  const handleClickItem = async (notif: NotificacionDTO) => {
    if (!notif.read) {
      await marcarComoLeida(notif.id);
    }
    onClose();
    navigate(notif.link || '/publicaciones');
  };

  const handleMarcarTodas = async () => {
    await marcarTodasComoLeidas();
    setNotificaciones((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const goToPublicaciones = () => {
    onClose();
    navigate('/publicaciones');
  };

  const renderIcono = (tipo: string) => {
    switch (tipo) {
      case 'donacion':
        return <HeartHandshakeIcon />;
      case 'caducar':
        return <AlertIcon />;
      case 'sistema':
        return <CheckCircleIcon />;
      case 'solicitud':
      case 'intercambio':
      default:
        return <PencilIcon />;
    }
  };

  return (
    <div className="nav-popover notifications-popover" role="dialog" aria-label="Notificaciones">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
        <div className="notification-header-actions">
          {unreadCount > 0 && (
            <>
              <button
                type="button"
                className="notifications-mark-all"
                onClick={handleMarcarTodas}
                title="Marcar todas como leídas"
              >
                Marcar leídas
              </button>
              <span className="notifications-count">{unreadCount} nuevas</span>
            </>
          )}
          {unreadCount === 0 && notificaciones.length > 0 && (
            <span className="notifications-count" style={{ backgroundColor: '#7F8C8D' }}>
              Al día
            </span>
          )}
        </div>
      </div>

      {cargando ? (
        <div className="notifications-empty">Cargando notificaciones...</div>
      ) : notificaciones.length === 0 ? (
        <div className="notifications-empty">
          <p>No tienes notificaciones pendientes.</p>
        </div>
      ) : (
        <ul className="notifications-list">
          {notificaciones.slice(0, 8).map((notification) => (
            <li key={notification.id}>
              <button
                type="button"
                className={`notification-item ${!notification.read ? 'is-unread' : ''}`}
                onClick={() => handleClickItem(notification)}
              >
                <span className={`notification-icon icon-${notification.type || 'intercambio'}`}>
                  {renderIcono(notification.type)}
                </span>
                <span className="notification-text">
                  <span className="notification-title">{notification.title}</span>
                  {notification.type === 'caducar' && (
                    <span className="notification-tag">Próximo a caducar</span>
                  )}
                  {notification.type === 'donacion' && (
                    <span className="notification-tag" style={{ color: '#117A65', backgroundColor: '#E8F8F5' }}>
                      Donación Unidona
                    </span>
                  )}
                  <span className="notification-details">{notification.message}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <button type="button" className="notifications-footer" onClick={goToPublicaciones}>
        Ver mis publicaciones →
      </button>
    </div>
  );
};
