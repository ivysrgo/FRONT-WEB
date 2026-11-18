import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchPanel } from './SearchPanel';
import { NotificationsPopover } from './NotificationsPopover';
import { ProfilePopover } from './ProfilePopover';
import { obtenerConteoNoLeidas } from '../services/notificacionService';
import { estaAutenticado } from '../services/authService';
import './Navbar.css';

import logoHeader from '../assets/logoheader.svg';
import lupaBusqueda from '../assets/lupabusqueda.svg';
import campanaActiva from '../assets/campananotificacionesactiva.svg';
import campanaInactiva from '../assets/campananotificacionesnoactiva.svg';
import iconPerfil from '../assets/iconperfil.svg';

type OpenPanel = 'search' | 'notifications' | 'profile' | null;

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(
    (location.state as { searchOpen?: boolean } | null)?.searchOpen ? 'search' : null,
  );
  const headerRef = useRef<HTMLElement>(null);

  const closePanel = () => setOpenPanel(null);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  useEffect(() => {
    let cancelado = false;
    const actualizarConteo = async () => {
      if (!estaAutenticado()) {
        if (!cancelado) setHasNotifications(false);
        return;
      }
      try {
        const { hasUnread } = await obtenerConteoNoLeidas();
        if (!cancelado) setHasNotifications(Boolean(hasUnread));
      } catch {
        if (!cancelado) setHasNotifications(false);
      }
    };

    actualizarConteo();

    const handleActualizacion = () => {
      actualizarConteo();
    };

    window.addEventListener('notificaciones-actualizadas', handleActualizacion);
    const interval = setInterval(actualizarConteo, 25000);

    return () => {
      cancelado = true;
      window.removeEventListener('notificaciones-actualizadas', handleActualizacion);
      clearInterval(interval);
    };
  }, []);

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

      {/* Enlaces centrales de Administrador */}
      <nav className="navbar-links">
        <NavLink
          to="/admin/explorar"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Explorar
        </NavLink>
        <NavLink
          to="/admin/dashboard"
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
          <img src={iconPerfil} alt="Perfil" className="nav-icon" />
        </button>

        {openPanel === 'notifications' && <NotificationsPopover onClose={closePanel} />}
        {openPanel === 'profile' && <ProfilePopover onClose={closePanel} />}
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

