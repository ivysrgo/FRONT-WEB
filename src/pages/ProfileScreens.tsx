import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BackLink, ScreenLayout } from '../components/ScreenLayout';
import './ProfileScreens.css';

export const ProfileScreen: React.FC = () => (
  <ScreenLayout
    title="Mi Perfil"
    subtitle="Edita tu perfil, agrega información sobre ti para que la comunidad te conozca mejor."
  >
    <section className="screen-panel profile-summary">
      <div className="profile-avatar" aria-label="Foto de perfil de Juan José">
        JJ
      </div>
      <div className="profile-details">
        <h2>Juan José Pérez Céspedes</h2>
        <div className="profile-rating" aria-label="Calificación: 3 de 5 estrellas">
          <span>★★★<span className="profile-empty-stars">☆☆</span></span>
          <strong>Calificación: 3.0</strong>
        </div>
        <p>Correo: juanelpro2005@gmail.com</p>
        <p>Teléfono: 343 5678001</p>
        <div className="screen-actions profile-actions">
          <Link className="screen-button" to="/perfil/configuracion">Editar perfil</Link>
          <Link className="screen-button screen-button-secondary" to="/perfil/configuracion">Configuración</Link>
        </div>
      </div>
    </section>

    <section className="profile-publications">
      <div className="profile-section-heading">
        <h2>Mis Publicaciones</h2>
        <Link to="/publicaciones">Ver todas</Link>
      </div>
      <div className="profile-publication-grid">
        <article className="screen-panel profile-mini-post">
          <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&q=80" alt="Diccionario bilingüe" />
          <span>LIBROS · DONACIÓN</span>
          <h3>Diccionario bilingüe Oxford</h3>
          <Link to="/productos/1">Ver artículo</Link>
        </article>
        <article className="screen-panel profile-mini-post">
          <img src="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&q=80" alt="Abrigo de paño gris" />
          <span>ROPA · INTERCAMBIO</span>
          <h3>Abrigo de paño gris</h3>
          <Link to="/productos/2">Ver artículo</Link>
        </article>
      </div>
    </section>
  </ScreenLayout>
);

export const ProfileSettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ScreenLayout title="Configuración de perfil" subtitle="Administra tu información personal y la seguridad de tu cuenta.">
      <BackLink to="/perfil">Volver a mi perfil</BackLink>
      <section className="screen-panel">
        <form className="screen-form" onSubmit={(event) => { event.preventDefault(); navigate('/perfil'); }}>
          <div className="profile-settings-grid">
            <label>Nombre completo<input defaultValue="Juan José Pérez Céspedes" /></label>
            <label>Correo electrónico<input type="email" defaultValue="juanelpro2005@gmail.com" /></label>
            <label>Teléfono<input type="tel" defaultValue="343 5678001" /></label>
            <label>Contraseña actual<input type="password" placeholder="Ingresa tu contraseña" /></label>
            <label>Nueva contraseña<input type="password" placeholder="Mínimo 8 caracteres" /></label>
          </div>
          <div className="screen-actions">
            <button className="screen-button" type="submit">Guardar cambios</button>
            <Link className="screen-button screen-button-secondary" to="/perfil">Cancelar</Link>
            <Link className="profile-delete-link" to="/perfil/eliminar">Eliminar mi perfil</Link>
          </div>
        </form>
      </section>
      <DeleteProfileDialog />
    </ScreenLayout>
  );
};

const DeleteProfileDialog: React.FC = () => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname.endsWith('/eliminar');

  if (!isOpen) return null;

  return (
    <div className="screen-overlay">
      <section className="screen-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-profile-title">
        {confirmed ? (
          <>
            <h2 id="delete-profile-title">Solicitud recibida</h2>
            <p>Tu cuenta ha sido marcada para eliminación.</p>
            <button className="screen-button" onClick={() => navigate('/explorar')}>Continuar</button>
          </>
        ) : (
          <>
            <h2 id="delete-profile-title">¿Eliminar tu perfil?</h2>
            <p>Esta acción eliminará tu cuenta y la información asociada. No podrás recuperar el perfil después de confirmarlo.</p>
            <div className="screen-actions">
              <button className="screen-button screen-button-danger" onClick={() => setConfirmed(true)}>Sí, eliminar perfil</button>
              <button className="screen-button screen-button-secondary" onClick={() => navigate('/perfil/configuracion')}>Cancelar</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export const NotificationsScreen: React.FC = () => (
  <ScreenLayout title="Notificaciones" subtitle="Mantente al día con la actividad de tus artículos y solicitudes.">
    <section className="screen-panel notification-list">
      <article className="notification-item unread">
        <span className="notification-dot" aria-hidden="true" />
        <div><h2>Nueva solicitud recibida</h2><p>Mariana C. está interesada en tu Diccionario bilingüe Oxford.</p><time>Hace 20 min</time></div>
      </article>
      <article className="notification-item unread">
        <span className="notification-dot" aria-hidden="true" />
        <div><h2>Tu intercambio fue aceptado</h2><p>Andrés S. aceptó tu solicitud por las camisas de trabajo.</p><time>Ayer</time></div>
      </article>
      <article className="notification-item">
        <span className="notification-dot" aria-hidden="true" />
        <div><h2>Artículo agregado a favoritos</h2><p>Alguien guardó tu publicación “Abrigo de paño gris”.</p><time>Hace 3 días</time></div>
      </article>
    </section>
  </ScreenLayout>
);

export const WelcomeScreen: React.FC = () => (
  <ScreenLayout title="¡Te damos la bienvenida!" subtitle="Ya formas parte de Eco-Golgi, la comunidad que comparte e intercambia artículos.">
    <section className="screen-panel welcome-card">
      <span className="exchange-check" aria-hidden="true">✓</span>
      <h2>Tu cuenta está lista</h2>
      <p>Explora artículos de tu comunidad, publica lo que ya no usas y dale una segunda oportunidad.</p>
      <div className="screen-actions">
        <Link className="screen-button" to="/explorar">Empezar a explorar</Link>
        <Link className="screen-button screen-button-secondary" to="/perfil/configuracion">Completar mi perfil</Link>
      </div>
    </section>
  </ScreenLayout>
);
