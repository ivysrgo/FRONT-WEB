import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FavoriteRequestCard } from '../components/FavoriteRequestCard';
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { obtenerFavoritos, quitarFavorito, type FavoritoItem } from '../services/favoritoService';
import { obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
import './SolicitudesFavoritos.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

export const SolicitudesFavoritos: React.FC = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState<FavoritoItem[]>([]);
  const [solicitudes, setSolicitudes] = useState(solicitudesVacias);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoritoEnProceso, setFavoritoEnProceso] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return () => {
        cancelled = true;
      };
    }

    Promise.all([obtenerFavoritos(), obtenerMisSolicitudes()])
      .then(([items, solicitudesMias]) => {
        if (!cancelled) {
          setFavoritos(items);
          setSolicitudes(solicitudesMias);
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setLoadFailed(true);
          setError(requestError instanceof Error ? requestError.message : 'No se pudieron cargar tus favoritos.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const manejarQuitarFavorito = async (articleId: string) => {
    setFavoritoEnProceso(articleId);
    setError(null);
    try {
      await quitarFavorito(articleId);
      setFavoritos((actuales) => actuales.filter((favorito) => favorito.articleId !== articleId));
      setSolicitudes((actuales) => ({ ...actuales, favoritos: Math.max(0, actuales.favoritos - 1) }));
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo quitar el favorito.');
    } finally {
      setFavoritoEnProceso(null);
    }
  };

  return (
    <div className="solicitudes-page">
      <Navbar />
      <main className="solicitudes-content">
        <header className="solicitudes-header">
          <h1 className="solicitudes-title">Mis Solicitudes</h1>
          <p className="solicitudes-subtitle">Lo que has pedido y lo que otros te han pedido.</p>
        </header>

        <SolicitudesTabs counts={{
          enviadas: solicitudes.enviadas.length,
          recibidas: solicitudes.recibidas.length,
          favoritos: solicitudes.favoritos,
          historial: solicitudes.historial.length,
        }} />

        {error && <p role="alert">{error}</p>}
        {loading ? (
          <p role="status">Cargando favoritos...</p>
        ) : loadFailed ? null : favoritos.length === 0 ? (
          <p className="solicitudes-empty">Todavía no has guardado publicaciones en favoritos.</p>
        ) : (
          <section className="solicitudes-list">
            {favoritos.map((favorito) => (
              <FavoriteRequestCard
                key={favorito.articleId}
                id={favorito.articleId}
                type={favorito.modality}
                author={favorito.author}
                title={favorito.title}
                message={favorito.description}
                daysRemaining={favorito.daysRemaining}
                status={favorito.status}
                actionPending={favoritoEnProceso === favorito.articleId}
                onRemove={() => void manejarQuitarFavorito(favorito.articleId)}
                onView={() => navigate(`/articulo/${favorito.articleId}`)}
              />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
