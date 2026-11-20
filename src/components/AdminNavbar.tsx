import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchPanel } from './SearchPanel'; // Reutilizamos el panel de búsqueda
import { NotificationsPopover } from './NotificationsPopover';
import { ProfilePopover } from './ProfilePopover';
import { listarReportes } from '../services/adminService';
import './Navbar.css'; // Podemos reutilizar los estilos del Navbar de usuario

import logoHeader from '../assets/logoheader.svg';
import lupaBusqueda from '../assets/lupabusqueda.svg';
import campanaActiva from '../assets/campananotificacionesactiva.svg';
import campanaInactiva from '../assets/campananotificacionesnoactiva.svg';
import iconPerfil from '../assets/iconperfil.svg';

type OpenPanel = 'search' | 'notifications' | 'profile' | null;

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [reportesPendientes, setReportesPendientes] = useState(0);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(
    (location.state as { searchOpen?: boolean } | null)?.searchOpen ? 'search' : null,
  );
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    try {
      const u = JSON.parse(localStorage.getItem('usuario') || 'null');
      return u?.avatarUrl || '';
    } catch {
      return '';
    }
  });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncUsuario = () => {
      try {
        const u = JSON.parse(localStorage.getItem('usuario') || 'null');
        setUserAvatar(u?.avatarUrl || '');
      } catch {
        setUserAvatar('');
      }
    };
    window.addEventListener('usuario-updated', syncUsuario);
    return () => window.removeEventListener('usuario-updated', syncUsuario);
  }, []);

  const closePanel = () => setOpenPanel(null);

  useEffect(() => {
    let activo = true;
    listarReportes('pendientes')
      .then((reportes) => {
        if (!activo) return;
        setReportesPendientes(reportes.length);
        setHasNotifications(reportes.length > 0);
      })
      .catch(() => {
        // Sin conexión con el backend la campana simplemente queda inactiva
      });
    return () => {
      activo = false;
    };
  }, [location.pathname]);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    if (panel === 'notifications') setHasNotifications(false);
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  useEffect(() => {
    if (!openPanel) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closePanel();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openPanel]);

  return (
    <header className="navbar-container" ref={headerRef}>
      {/* Logo principal */}
      <div className="navbar-brand">
        <NavLink to="/admin/explorar">
          <img
            src={logoHeader}
            alt="ECO-GOLGI"
            className="navbar-logo"
          />
        </NavLink>
      </div>

      {/* Enlaces centrales (Solo 2 para Admin) */}
      <nav className="navbar-links">
        <NavLink
          to="/admin/explorar"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Explorar
        </NavLink>
        <NavLink
          to="/admin/dashboard" // O la ruta que definas para administrar
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Administrar
        </NavLink>
      </nav>

      {/* Acciones */}
      <div className="navbar-actions">
        <button
          className={`nav-icon-btn ${openPanel === 'search' ? 'is-open' : ''}`}
          title="Buscar"
          aria-expanded={openPanel === 'search'}
          onClick={() => togglePanel('search')}
        >
          <img src={lupaBusqueda} alt="Buscar" className="nav-icon" />
        </button>
        <button
          className={`nav-icon-btn ${openPanel === 'notifications' ? 'is-open' : ''}`}
          title="Notificaciones"
          aria-expanded={openPanel === 'notifications'}
          onClick={() => togglePanel('notifications')}
        >
          <img
            src={hasNotifications ? campanaActiva : campanaInactiva}
            alt="Notificaciones"
            className="nav-icon"
          />
        </button>
        <button
          className={`nav-icon-btn profile-btn ${openPanel === 'profile' ? 'is-open' : ''}`}
          title="Mi Perfil"
          aria-expanded={openPanel === 'profile'}
          onClick={() => togglePanel('profile')}
        >
          {userAvatar ? (
            <img src={userAvatar} alt="Perfil" className="nav-avatar-img" />
          ) : (
            <img src={iconPerfil} alt="Perfil" className="nav-icon" />
          )}
        </button>

        {openPanel === 'notifications' && (
          <NotificationsPopover onClose={closePanel} isAdmin reportesPendientes={reportesPendientes} />
        )}
        {openPanel === 'profile' && <ProfilePopover onClose={closePanel} isAdmin />}
      </div>

      {openPanel === 'search' && (
        <>
          <div className="navbar-backdrop" onClick={closePanel} />
          <SearchPanel />
        </>
      )}
    </header>
  );
};