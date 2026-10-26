import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Importación directa del asset SVG
import logoHeader from '../assets/logoheader.svg';
import lupaBusqueda from '../assets/lupabusqueda.svg';
import campanaActiva from '../assets/campananotificacionesactiva.svg';
import campanaInactiva from '../assets/campananotificacionesnoactiva.svg';
import iconPerfil from '../assets/iconperfil.svg';

export const Navbar: React.FC = () => {
  const [hasNotifications] = useState(true);

  return (
    <header className="navbar-container">
      {/* Logo principal */}
      <div className="navbar-brand">
        <NavLink to="/explorar">
          <img 
            src={logoHeader} 
            alt="ECO-GOLGI" 
            className="navbar-logo" 
          />
        </NavLink>
      </div>

      {/* Enlaces centrales */}
      <nav className="navbar-links">
        <NavLink 
          to="/explorar" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Explorar
        </NavLink>
        <NavLink 
          to="/publicar" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Publicar
        </NavLink>
        <NavLink 
          to="/publicaciones" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Publicaciones
        </NavLink>
        <NavLink 
          to="/solicitudes" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Solicitudes
        </NavLink>
      </nav>

      {/* Acciones */}
      <div className="navbar-actions">
        <button className="nav-icon-btn" title="Buscar">
          <img src={lupaBusqueda} alt="Buscar" className="nav-icon" />
        </button>
        <button className="nav-icon-btn" title="Notificaciones">
          <img 
            src={hasNotifications ? campanaActiva : campanaInactiva} 
            alt="Notificaciones" 
            className="nav-icon" 
          />
        </button>
        <button className="nav-icon-btn profile-btn" title="Mi Perfil">
          <img src={iconPerfil} alt="Perfil" className="nav-icon" />
        </button>
      </div>
    </header>
  );
};