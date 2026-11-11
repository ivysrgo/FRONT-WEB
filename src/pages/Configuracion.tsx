import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './MiPerfil.css';
import './Configuracion.css';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'solicitudes',
    label: 'Nuevas solicitudes',
    description: 'Avisarme cuando alguien solicite uno de mis artículos.',
  },
  {
    id: 'caducidad',
    label: 'Publicaciones por caducar',
    description: 'Avisarme cuando a una publicación le queden pocos días.',
  },
  {
    id: 'correos',
    label: 'Correos de la comunidad',
    description: 'Recibir novedades de Eco-Golgi y Unidona en mi correo.',
  },
];

export const Configuracion: React.FC = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    solicitudes: true,
    caducidad: true,
    correos: false,
  });

  const toggle = (id: string) => setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

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
            <h1 className="perfil-title">Configuración</h1>
          </div>
          <p className="perfil-subtitle">Elige qué avisos recibir y administra tu cuenta</p>
        </header>

        <section className="config-card">
          <h2 className="config-section-title">Notificaciones</h2>
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div key={setting.id} className="config-row">
              <div className="config-text">
                <span className="config-label">{setting.label}</span>
                <span className="config-description">{setting.description}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={enabled[setting.id]}
                aria-label={setting.label}
                className={`config-switch ${enabled[setting.id] ? 'is-on' : ''}`}
                onClick={() => toggle(setting.id)}
              >
                <span className="config-switch-thumb" />
              </button>
            </div>
          ))}
        </section>

        <section className="config-card">
          <h2 className="config-section-title">Cuenta</h2>
          <div className="config-row">
            <div className="config-text">
              <span className="config-label">Contraseña</span>
              <span className="config-description">Actualiza la contraseña con la que ingresas.</span>
            </div>
            <button type="button" className="perfil-btn-outline" onClick={() => navigate('/new-password')}>
              Cambiar
            </button>
          </div>
          <div className="config-row">
            <div className="config-text">
              <span className="config-label">Cerrar sesión</span>
              <span className="config-description">Salir de tu cuenta en este dispositivo.</span>
            </div>
            <button type="button" className="config-logout" onClick={() => navigate('/login')}>
              Cerrar Sesión
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
