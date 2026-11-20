import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminUserPostCard } from '../components/AdminUserPostCard';
import { SuspendAccountModal } from '../components/SuspendAccountModal';
import { StarRating } from '../components/StarRating';
import {
  cambiarSuspension,
  formatearFechaLarga,
  obtenerUsuario,
  type UsuarioAdminDetalle,
} from '../services/adminService';
import { API_URL, ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminPerfil.css';

const resolverImagen = (url?: string) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  return new URL(url, API_URL).toString();
};

export const AdminPerfil: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [usuario, setUsuario] = useState<UsuarioAdminDetalle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let activo = true;
    obtenerUsuario(userId)
      .then((detalle) => {
        if (activo) setUsuario(detalle);
      })
      .catch((err: unknown) => {
        if (activo) setError(err instanceof ApiError ? err.message : 'No se pudo cargar el perfil.');
      });
    return () => {
      activo = false;
    };
  }, [userId]);

  const actualizarSuspension = async (suspender: boolean) => {
    if (!usuario) return;
    setProcesando(true);
    setError(null);
    try {
      const actualizado = await cambiarSuspension(usuario.id, suspender);
      setUsuario({ ...usuario, ...actualizado });
      setIsSuspendModalOpen(false);
    } catch (err) {
      setIsSuspendModalOpen(false);
      setError(err instanceof ApiError ? err.message : 'No se pudo actualizar la cuenta.');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="admin-perfil-layout">
      <AdminNavbar />

      <main className="admin-perfil-content">
        <header className="admin-perfil-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Perfil</h1>
          </div>
        </header>

        {error && <p className="admin-perfil-mensaje admin-perfil-error" role="alert">{error}</p>}

        {!usuario ? (
          !error && <p className="admin-perfil-mensaje">Cargando perfil…</p>
        ) : (
          <>
            <section className="perfil-usuario-card">
              <div className="perfil-avatar-box">
                {usuario.avatarUrl ? (
                  <img
                    src={resolverImagen(usuario.avatarUrl)}
                    alt={usuario.nombre}
                    className="avatar-placeholder-gray"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="avatar-placeholder-gray">
                    <span className="avatar-inicial">{usuario.nombre.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>

              <div className="perfil-info-box">
                <h2 className="perfil-nombre">{usuario.nombre}</h2>

                <div className="perfil-rating-row">
                  <StarRating rating={usuario.rating} size={18} />
                  <span className="rating-text">
                    Calificación: {usuario.ratingCount > 0
                      ? `${usuario.rating.toFixed(1)} (${usuario.ratingCount} ${usuario.ratingCount === 1 ? 'calificación' : 'calificaciones'})`
                      : 'sin calificaciones'}
                  </span>
                </div>

                <div className="perfil-contacto">
                  <p>Correo: {usuario.correo}</p>
                  <p>Teléfono: {usuario.phone || 'No registrado'}</p>
                  <p>Activo desde: {formatearFechaLarga(usuario.createdAt)}</p>
                  <p>Publicaciones activas: {usuario.publicacionesActivas}</p>
                  <p>Reportes recibidos: {usuario.reportesRecibidos}</p>
                  {usuario.suspendido && (
                    <p className="perfil-suspendido">
                      Cuenta suspendida desde {formatearFechaLarga(usuario.suspendidoEn)}
                    </p>
                  )}
                </div>
              </div>

              {usuario.role !== 'admin' && (
                <div className="perfil-action-box">
                  {usuario.suspendido ? (
                    <button
                      className="btn-reactivar"
                      onClick={() => void actualizarSuspension(false)}
                      disabled={procesando}
                    >
                      Reactivar<br />cuenta
                    </button>
                  ) : (
                    <button
                      className="btn-suspender-rojo"
                      onClick={() => setIsSuspendModalOpen(true)}
                      disabled={procesando}
                    >
                      Suspender<br />cuenta
                    </button>
                  )}
                </div>
              )}
            </section>

            <section className="perfil-publicaciones-section">
              <h3 className="section-subtitle">Publicaciones</h3>

              <div className="perfil-publicaciones-list">
                {usuario.publicaciones.length === 0 ? (
                  <p className="admin-perfil-mensaje">Este usuario no tiene publicaciones.</p>
                ) : (
                  usuario.publicaciones.map((pub) => (
                    <AdminUserPostCard
                      key={pub.id}
                      id={pub.id}
                      category={pub.category}
                      title={pub.title}
                      details={pub.details || `${pub.condition} - ${pub.modality}`}
                      requests={pub.requests ?? 0}
                      status={pub.status}
                      daysElapsed={pub.daysElapsed ?? 0}
                      totalDays={pub.expirationDays ?? 30}
                      imageUrl={resolverImagen(pub.imageUrls?.[0] || pub.imageUrl)}
                      onEdit={() => navigate(`/admin/articulo/${pub.id}`)}
                    />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {usuario && (
        <SuspendAccountModal
          isOpen={isSuspendModalOpen}
          accountName={usuario.nombre}
          onClose={() => setIsSuspendModalOpen(false)}
          onConfirm={() => void actualizarSuspension(true)}
        />
      )}
    </div>
  );
};
