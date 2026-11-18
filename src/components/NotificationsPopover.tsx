<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerNotificaciones,
  marcarComoLeida,
  marcarTodasComoLeidas,
  type NotificacionDTO,
} from '../services/notificacionService';
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticulos } from '../data/articulos';
import type { NotificacionItem } from '../services/notificacionService';
>>>>>>> Luisa
import './NotificationsPopover.css';

interface NotificationsPopoverProps {
  onClose: () => void;
<<<<<<< HEAD
=======
  isAdmin?: boolean;
  // Notificaciones del usuario (las carga el Navbar); null mientras cargan
  notificaciones?: NotificacionItem[] | null;
  error?: string | null;
  // Solo admin: cantidad de reportes pendientes (la carga el AdminNavbar)
  reportesPendientes?: number;
>>>>>>> Luisa
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

<<<<<<< HEAD
const HeartHandshakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 9.5a4 4 0 0 1 5.66-5.66L12 5.67l1.84-1.83a4 4 0 1 1 5.66 5.66l-7.5 7.5-7.5-7.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
=======
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
>>>>>>> Luisa
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5v5.5M12 16.5v.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

<<<<<<< HEAD
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
=======
export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  onClose,
  isAdmin = false,
  notificaciones = null,
  error = null,
  reportesPendientes = 0,
}) => {
  const navigate = useNavigate();
  const articulos = useArticulos();
  const adminNotifications: NotificacionItem[] = [
    ...(reportesPendientes > 0
      ? [{
          id: 'admin-reports',
          type: 'reporte' as const,
          title: 'Reportes pendientes',
          details: [
            reportesPendientes === 1
              ? '1 reporte requiere revisión'
              : `${reportesPendientes} reportes requieren revisión`,
          ],
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
  const notifications = isAdmin ? adminNotifications : notificaciones ?? [];
  const cargando = !isAdmin && notificaciones === null && !error;

  const goToNotification = (path: string) => {
    onClose();
    navigate(path);
>>>>>>> Luisa
  };

  return (
    <div className="nav-popover notifications-popover" role="dialog" aria-label="Notificaciones">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
<<<<<<< HEAD
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
=======
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
                  <AlertIcon />
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
>>>>>>> Luisa
      </button>
    </div>
  );
};
