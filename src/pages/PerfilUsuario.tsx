import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ExternalProfileCard } from '../components/ExternalProfileCard';
import {
  obtenerPerfilPublico,
  type PerfilPublicoRespuesta,
} from '../services/authService';
import { resolverUrlImagen } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './PerfilUsuario.css';

export const PerfilUsuario: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [datos, setDatos] = useState<PerfilPublicoRespuesta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Identificador de usuario no proporcionado');
      setLoading(false);
      return;
    }

    let cancelado = false;
    setLoading(true);
    setError(null);

    obtenerPerfilPublico(id)
      .then((respuesta) => {
        if (!cancelado) {
          setDatos(respuesta);
        }
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          setError(err instanceof Error ? err.message : 'No se pudo cargar el perfil del usuario');
        }
      })
      .finally(() => {
        if (!cancelado) {
          setLoading(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  return (
    <div className="perfil-layout">
      <Navbar />

      <main className="perfil-content">
        {/* Encabezado con flecha de volver y título */}
        <header className="perfil-header">
          <button className="btn-volver" onClick={() => navigate(-1)} aria-label="Volver">
            <img src={flechaVolverNegra} alt="Volver" />
          </button>
          <h1 className="perfil-title">Perfil</h1>
        </header>

        {loading && <p role="status">Cargando perfil del usuario...</p>}
        {error && (
          <div role="alert" style={{ marginBottom: '24px' }}>
            <p style={{ color: '#DC3545', marginBottom: '12px' }}>{error}</p>
            <button
              type="button"
              className="perfil-btn-outline"
              onClick={() => navigate(-1)}
            >
              Regresar
            </button>
          </div>
        )}

        {datos && (
          <>
            {/* Tarjeta de Información del Usuario */}
            <ExternalProfileCard
              nombre={datos.usuario.nombre}
              calificacion={datos.usuario.rating}
              ratingCount={datos.usuario.ratingCount}
              correo={datos.usuario.correo}
              telefono={datos.usuario.phone}
              avatarUrl={datos.usuario.avatarUrl}
            />

            {/* Sección de Publicaciones del Usuario */}
            <section className="perfil-publicaciones-section">
              <h3 className="section-title">Publicaciones</h3>

              {datos.publicaciones.length === 0 ? (
                <p style={{ color: '#6B6B6B', fontStyle: 'italic' }}>
                  Este usuario no tiene publicaciones activas en este momento.
                </p>
              ) : (
                <div className="perfil-publicaciones-list">
                  {datos.publicaciones.map((post) => {
                    const expiration = post.expirationDays || 30;
                    const elapsed = Math.min(post.daysElapsed, expiration);
                    const percentage = Math.min(100, (elapsed / expiration) * 100);
                    const daysRemaining = Math.max(0, expiration - elapsed);
                    const rawImage =
                      (post.imageUrls && post.imageUrls.length > 0 && post.imageUrls[0]) ||
                      post.imageUrl ||
                      '';
                    const imageUrl =
                      resolverUrlImagen(rawImage) ||
                      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&q=80';

                    return (
                      <article
                        key={post.id}
                        className="perfil-post-card"
                        onClick={() => navigate(`/articulo/${post.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            navigate(`/articulo/${post.id}`);
                          }
                        }}
                      >
                        <div className="perfil-post-info">
                          <div className="perfil-post-image">
                            <img
                              src={imageUrl}
                              alt={post.title}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&q=80';
                              }}
                            />
                          </div>
                          <div className="perfil-post-text">
                            <span className="perfil-post-category">{post.category}</span>
                            <h4 className="perfil-post-title">{post.title}</h4>
                            <p className="perfil-post-details">
                              {post.condition || 'Buen estado'} · {post.modality}
                            </p>
                          </div>
                        </div>

                        {/* Barra de progreso simplificada para este layout */}
                        <div className="perfil-progress-container">
                          <div className="perfil-progress-bar-bg">
                            <div
                              className="perfil-progress-bar-fill"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="perfil-progress-labels">
                            <span>
                              Publicado hace {elapsed} {elapsed === 1 ? 'día' : 'días'} · {daysRemaining} {daysRemaining === 1 ? 'día restante' : 'días restantes'}
                            </span>
                            <span>caducidad a los {expiration} días</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};