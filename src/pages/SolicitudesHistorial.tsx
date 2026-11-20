import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HistoryRequestCard } from '../components/HistoryRequestCard';
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
import { obtenerFavoritos } from '../services/favoritoService';
import './SolicitudesHistorial.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

export const SolicitudesHistorial: React.FC = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(solicitudesVacias);
  const [favoritosIds, setFavoritosIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return () => {
        cancelled = true;
      };
    }

    Promise.all([obtenerMisSolicitudes(), obtenerFavoritos()])
      .then(([solicitudes, favs]) => {
        if (!cancelled) {
          setDatos(solicitudes);
          const favSet = new Set<string>();
          if (favs && favs.length > 0) {
            favs.forEach((f) => {
              if (f.articleId) favSet.add(String(f.articleId));
              if (f.id) favSet.add(String(f.id));
            });
          }
          if (solicitudes.historial) {
            solicitudes.historial.forEach((s) => {
              if (s.isFavorite && s.articuloId) favSet.add(String(s.articuloId));
            });
          }
          setFavoritosIds(favSet);
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setLoadFailed(true);
          setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el historial.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="solicitudes-page">
      <Navbar />
      <main className="solicitudes-content">
        <header className="solicitudes-header">
          <h1 className="solicitudes-title">Mis Solicitudes</h1>
          <p className="solicitudes-subtitle">Lo que has pedido y lo que otros te han pedido.</p>
        </header>

        <SolicitudesTabs counts={{
          enviadas: datos.enviadas.length,
          recibidas: datos.recibidas.length,
          favoritos: datos.favoritos,
          historial: datos.historial.length,
        }} />

        {error && <p role="alert">{error}</p>}
        {loading ? (
          <p role="status">Cargando historial...</p>
        ) : loadFailed ? null : datos.historial.length === 0 ? (
          <p className="solicitudes-empty">Tu historial está vacío por ahora.</p>
        ) : (
          <section className="solicitudes-list">
            {datos.historial.map((solicitud) => {
              const targetId = solicitud.articuloId || solicitud.id;
              const isFav = favoritosIds.has(targetId) || Boolean(solicitud.isFavorite);
              return (
                <HistoryRequestCard
                  key={solicitud.id}
                  id={solicitud.id}
                  type={solicitud.type}
                  author={solicitud.author}
                  title={solicitud.title}
                  message={solicitud.message}
                  status={solicitud.status}
                  isFavorite={isFav}
                  isOwner={solicitud.isOwner}
                  donationRole={solicitud.donationRole}
                  articuloOfrecidoTitle={solicitud.articuloOfrecidoTitle}
                  articuloSolicitadoTitle={solicitud.articuloSolicitadoTitle}
                  targetUserId={solicitud.targetUserId || (solicitud.isOwner ? solicitud.solicitanteId : solicitud.destinatarioId)}
                  targetUserAvatarUrl={solicitud.targetUserAvatarUrl}
                />
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
