<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating } from './StarRating';
import { CURRENT_USER, getInitials } from '../data/currentUser';
import { obtenerUsuarioActual, cerrarSesion } from '../services/authService';
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating } from './StarRating';
import { getInitials } from '../data/currentUser';
import { cerrarSesion, obtenerPerfilActual, type PerfilAutenticado } from '../services/authService';
>>>>>>> Luisa
import './ProfilePopover.css';

interface ProfilePopoverProps {
  onClose: () => void;
<<<<<<< HEAD
=======
  isAdmin?: boolean;
>>>>>>> Luisa
}

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M14 8l4 4-4 4M18 12H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

<<<<<<< HEAD
export const ProfilePopover: React.FC<ProfilePopoverProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const usuarioActual = obtenerUsuarioActual();

  const nombreUsuario = usuarioActual?.nombre || CURRENT_USER.name;
  const ratingUsuario = usuarioActual?.rating ?? CURRENT_USER.rating;
  const rolEtiqueta =
    usuarioActual?.role === 'admin' || usuarioActual?.role === 'Administrador'
      ? 'Administrador'
      : 'Miembro de la comunidad';
=======
export const ProfilePopover: React.FC<ProfilePopoverProps> = ({ onClose, isAdmin = false }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PerfilAutenticado | null>(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    let cancelled = false;

    obtenerPerfilActual()
      .then((currentProfile) => {
        if (!cancelled) setProfile(currentProfile);
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el perfil.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = isAdmin ? profile?.name ?? 'Administrador' : profile?.name ?? 'Mi perfil';
>>>>>>> Luisa

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

<<<<<<< HEAD
  const handleCerrarSesion = () => {
    cerrarSesion();
    onClose();
    navigate('/login');
  };

  return (
    <div className="nav-popover profile-popover" role="dialog" aria-label="Mi perfil">
      <div className="profile-summary">
        <div className="profile-avatar" aria-hidden="true">{getInitials(nombreUsuario)}</div>
        <p className="profile-name">{nombreUsuario}</p>
        <span
          style={{
            fontSize: '12px',
            color: usuarioActual?.role === 'admin' ? '#0070F3' : '#666',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {rolEtiqueta}
        </span>
        <div className="profile-rating">
          <StarRating rating={ratingUsuario} size={18} />
          <span className="profile-rating-value">Calificación {ratingUsuario.toFixed(1)}</span>
        </div>
      </div>

      <nav className="profile-menu" aria-label="Opciones de perfil">
        <button type="button" className="profile-menu-item" onClick={() => goTo('/perfil')}>
          <UserIcon />
          Ver Perfil
        </button>
        <button type="button" className="profile-menu-item" onClick={() => goTo('/configuracion')}>
          <SettingsIcon />
          Configuración
        </button>
        <button type="button" className="profile-menu-item profile-logout" onClick={handleCerrarSesion}>
          <LogoutIcon />
          Cerrar Sesión
        </button>
=======
  const handleLogout = () => {
    cerrarSesion();
    goTo('/login');
  };

  return (
    <div className="nav-popover profile-popover" role="dialog" aria-label={isAdmin ? 'Perfil de administrador' : 'Mi perfil'}>
      <div className="profile-summary">
        <div className={`profile-avatar ${isAdmin ? 'profile-avatar-admin' : ''}`} aria-hidden="true">
          {getInitials(displayName)}
        </div>
        <p className="profile-name">{displayName}</p>
        {isAdmin ? (
          <span className="profile-role-badge">Administrador</span>
        ) : (
          profile ? (
            <div className="profile-rating">
              <StarRating rating={profile.rating} size={18} />
              <span className="profile-rating-value">Calificación {profile.rating.toFixed(1)}</span>
            </div>
          ) : (
            <p className="profile-rating-value" role={error ? 'alert' : 'status'}>
              {error ?? (loading ? 'Cargando perfil...' : 'Inicia sesión para ver tu perfil.')}
            </p>
          )
        )}
      </div>

      <nav className="profile-menu" aria-label={isAdmin ? 'Opciones de administrador' : 'Opciones de perfil'}>
        <button
          type="button"
          className="profile-menu-item"
          onClick={() => goTo(profile ? (isAdmin ? '/admin/mi-perfil' : '/perfil') : '/login')}
        >
          <UserIcon />
          {profile ? (isAdmin ? 'Mi Perfil de Administrador' : 'Ver Perfil') : 'Iniciar Sesión'}
        </button>
        <button
          type="button"
          className="profile-menu-item"
          onClick={() => goTo(isAdmin ? '/admin/dashboard' : '/configuracion')}
        >
          <SettingsIcon />
          {isAdmin ? 'Panel administrativo' : 'Configuración'}
        </button>
        {profile && (
          <button type="button" className="profile-menu-item profile-logout" onClick={handleLogout}>
            <LogoutIcon />
            Cerrar Sesión
          </button>
        )}
>>>>>>> Luisa
      </nav>
    </div>
  );
};
