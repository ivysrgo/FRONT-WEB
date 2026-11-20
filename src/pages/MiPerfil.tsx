import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { StarRating } from '../components/StarRating';
import { ApiError } from '../services/api';
import { actualizarPerfil, obtenerPerfilActual, type PerfilAutenticado } from '../services/authService';
import './MiPerfil.css';

interface MiPerfilProps {
  isAdmin?: boolean;
}

export const MiPerfil: React.FC<MiPerfilProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<PerfilAutenticado | null>(null);
  const [draft, setDraft] = useState<PerfilAutenticado | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return () => {
        cancelled = true;
      };
    }

    obtenerPerfilActual()
      .then((currentProfile) => {
        if (!cancelled) {
          setProfile(currentProfile);
          setError(null);
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(
            requestError instanceof ApiError || requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar el perfil.'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const startEditing = () => {
    if (!profile) return;
    setDraft({ ...profile });
    setEditing(true);
    setError(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result;
        setDraft((prev) => prev ? { ...prev, avatarUrl: dataUrl } : null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setError(null);

    try {
      const actualizado = await actualizarPerfil({
        nombre: draft.name,
        correo: draft.email,
        phone: draft.phone,
        avatarUrl: draft.avatarUrl,
      });
      setProfile(actualizado);
      setEditing(false);
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : 'No se pudo guardar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="perfil-page">
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="perfil-content">
        <header className="perfil-header">
          <div className="perfil-title-row">
            <button type="button" className="perfil-back" onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/explorar')} aria-label="Volver">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="perfil-title">{isAdmin ? 'Perfil de Administrador' : 'Mi Perfil'}</h1>
          </div>
          <p className="perfil-subtitle">
            {isAdmin
              ? 'Administra tu cuenta y tus datos de acceso.'
              : 'Edita tu perfil, agrega información sobre ti para que la comunidad confíe en ti'}
          </p>
        </header>

        {loading && <p role="status">Cargando perfil...</p>}
        {error && !loading && <p role="alert" style={{ color: '#DC3545', marginBottom: '16px' }}>{error}</p>}

        <section className="perfil-card">
          {profile && (
            <>
              <div className="perfil-photo-container">
                <div className="perfil-photo">
                  {(editing && draft ? draft.avatarUrl : profile.avatarUrl) ? (
                    <img
                      src={editing && draft ? draft.avatarUrl : profile.avatarUrl}
                      alt={profile.name}
                    />
                  ) : (
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                      <rect width="100" height="100" fill="#D0D0D0" />
                      <circle cx="50" cy="40" r="18" fill="#FFFFFF" />
                      <path d="M14 100c0-22 16-36 36-36s36 14 36 36Z" fill="#FFFFFF" />
                    </svg>
                  )}
                </div>

                {editing && (
                  <div className="perfil-photo-actions">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileSelect}
                    />
                    <button
                      type="button"
                      className="perfil-change-photo-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Subir foto
                    </button>
                    {draft?.avatarUrl && (
                      <button
                        type="button"
                        className="perfil-remove-photo-btn"
                        onClick={() => setDraft((prev) => prev ? { ...prev, avatarUrl: '' } : null)}
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                )}
              </div>

              {editing && draft ? (
                <form className="perfil-info perfil-form" onSubmit={handleSave}>
                  <label>
                    Nombre
                    <input
                      type="text"
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Correo
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Teléfono
                    <input
                      type="tel"
                      value={draft.phone}
                      onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    />
                  </label>
                  <button
                    type="button"
                    className="perfil-password-link"
                    onClick={() => navigate(isAdmin ? '/admin/cambiar-contrasena' : '/perfil/cambiar-contrasena')}
                  >
                    Cambiar contraseña
                  </button>
                  <div className="perfil-form-actions">
                    <button
                      type="button"
                      className="perfil-btn-outline"
                      onClick={() => {
                        setEditing(false);
                        setDraft(null);
                        setError(null);
                      }}
                      disabled={saving}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="perfil-btn-solid" disabled={saving}>
                      {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="perfil-info">
                  <div className="perfil-name-row">
                    <h2 className="perfil-name">{profile.name}</h2>
                    {isAdmin && <span className="perfil-admin-badge">ADMINISTRADOR</span>}
                  </div>
                  {!isAdmin && (
                    <>
                      <StarRating rating={profile.rating} size={26} />
                      <p className="perfil-rating-value">Calificación: {profile.rating.toFixed(1)}</p>
                    </>
                  )}
                  <p className="perfil-contact">
                    {profile.email && <>Correo: {profile.email}<br /></>}
                    {profile.phone && <>Teléfono: {profile.phone}</>}
                  </p>
                </div>
              )}

              {!editing && (
                <button type="button" className="perfil-btn-outline perfil-edit" onClick={startEditing}>
                  Editar
                </button>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
