import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SolicitudesCounts {
  enviadas: number;
  recibidas: number;
  favoritos: number;
  historial: number;
}

interface SolicitudesTabsProps {
  counts: SolicitudesCounts;
}

export const SolicitudesTabs: React.FC<SolicitudesTabsProps> = ({ counts }) => (
  <nav className="solicitudes-tabs" aria-label="Secciones de solicitudes">
    <NavLink to="/solicitudes" end className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}>
      Enviadas ({counts.enviadas})
    </NavLink>
    <NavLink to="/solicitudes/recibidas" className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}>
      Recibidas ({counts.recibidas})
    </NavLink>
    <NavLink to="/solicitudes/favoritos" className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}>
      Favoritos ({counts.favoritos})
    </NavLink>
    <NavLink to="/solicitudes/historial" className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}>
      Historial ({counts.historial})
    </NavLink>
  </nav>
);
