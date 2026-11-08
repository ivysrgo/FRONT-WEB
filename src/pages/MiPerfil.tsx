import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StarRating } from '../components/StarRating';
import { CURRENT_USER } from '../data/currentUser';
import './MiPerfil.css';

export const MiPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(CURRENT_USER);
  const [draft, setDraft] = useState(CURRENT_USER);
  const [editing, setEditing] = useState(false);

  const startEditing = () => {
    setDraft(profile);
    setEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draft);
    setEditing(false);
  };

  return (
    <div className="perfil-page">
      <Navbar />

      <main className="perfil-content">
        <header className="perfil-header">
          <div className="perfil-title-row">
            <button type="button" className="perfil-back" onClick={() => navigate(-1)} aria-label="Volver">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="perfil-title">Mi Perfil</h1>
          </div>
          <p className="perfil-subtitle">
            Edita tu perfil, agrega información sobre ti para que la comunidad confíe en ti
          </p>
        </header>

        <section className="perfil-card">
          <div className="perfil-photo">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} />
            ) : (
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <rect width="100" height="100" fill="#D0D0D0" />
                <circle cx="50" cy="40" r="18" fill="#FFFFFF" />
                <path d="M14 100c0-22 16-36 36-36s36 14 36 36Z" fill="#FFFFFF" />
              </svg>
            )}
          </div>

          {editing ? (
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
              <div className="perfil-form-actions">
                <button type="button" className="perfil-btn-outline" onClick={() => setEditing(false)}>
                  Cancelar
                </button>
                <button type="submit" className="perfil-btn-solid">Guardar</button>
              </div>
            </form>
          ) : (
            <div className="perfil-info">
              <h2 className="perfil-name">{profile.name}</h2>
              <StarRating rating={profile.rating} size={26} />
              <p className="perfil-rating-value">Calificación: {profile.rating.toFixed(1)}</p>
              <p className="perfil-contact">
                Correo: {profile.email}
                <br />
                Teléfono: {profile.phone}
              </p>
            </div>
          )}

          {!editing && (
            <button type="button" className="perfil-btn-outline perfil-edit" onClick={startEditing}>
              Editar
            </button>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
