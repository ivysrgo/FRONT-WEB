import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchPanel } from './SearchPanel';
import { NotificationsPopover } from './NotificationsPopover';
import { ProfilePopover } from './ProfilePopover';
import './Navbar.css';

import logoHeader from '../assets/logoheader.svg';
import lupaBusqueda from '../assets/lupabusqueda.svg';
import campanaActiva from '../assets/campananotificacionesactiva.svg';
import campanaInactiva from '../assets/campananotificacionesnoactiva.svg';
import iconPerfil from '../assets/iconperfil.svg';

type OpenPanel = 'search' | 'notifications' | 'profile' | null;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(
    (location.state as { searchOpen?: boolean } | null)?.searchOpen ? 'search' : null,
  );
  const headerRef = useRef<HTMLElement>(null);

  const closePanel = () => setOpenPanel(null);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    if (panel === 'notifications') setHasNotifications(false);
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  useEffect(() => {
    if (!openPanel) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closePanel();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel();
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
      <div className="navbar-brand">
        <NavLink to="/explorar">
          <img src={logoHeader} alt="ECO-GOLGI" className="navbar-logo" />
        </NavLink>
      </div>

      <nav className="navbar-links">
        <NavLink to="/explorar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Explorar</NavLink>
        <NavLink to="/publicar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Publicar</NavLink>
        <NavLink to="/publicaciones" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Publicaciones</NavLink>
        <NavLink to="/solicitudes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Solicitudes</NavLink>
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          className={`nav-icon-btn ${openPanel === 'search' ? 'is-open' : ''}`}
          title="Buscar"
          aria-label="Buscar"
          aria-expanded={openPanel === 'search'}
          onClick={() => togglePanel('search')}
        >
          <img src={lupaBusqueda} alt="" className="nav-icon" />
        </button>
        <button
          type="button"
          className={`nav-icon-btn ${openPanel === 'notifications' ? 'is-open' : ''}`}
          title="Notificaciones"
          aria-label="Notificaciones"
          aria-expanded={openPanel === 'notifications'}
          onClick={() => togglePanel('notifications')}
        >
          <img src={hasNotifications ? campanaActiva : campanaInactiva} alt="" className="nav-icon" />
        </button>
        <button
          type="button"
          className={`nav-icon-btn profile-btn ${openPanel === 'profile' ? 'is-open' : ''}`}
          title="Mi Perfil"
          aria-label="Mi Perfil"
          aria-expanded={openPanel === 'profile'}
          onClick={() => togglePanel('profile')}
        >
          <img src={iconPerfil} alt="" className="nav-icon" />
        </button>

        {openPanel === 'notifications' && <NotificationsPopover onClose={closePanel} />}
        {openPanel === 'profile' && <ProfilePopover onClose={closePanel} />}
      </div>

      {openPanel === 'search' && (
        <>
          <button type="button" className="navbar-backdrop" onClick={closePanel} aria-label="Cerrar búsqueda" />
          <SearchPanel />
        </>
      )}
    </header>
  );
};
