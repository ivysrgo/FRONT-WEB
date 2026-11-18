import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Luisa
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { FavoriteRequestCard } from '../components/FavoriteRequestCard';
<<<<<<< HEAD
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes } from '../services/solicitudService';
=======
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { obtenerFavoritos, quitarFavorito, type FavoritoItem } from '../services/favoritoService';
import { obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
>>>>>>> Luisa
import './SolicitudesFavoritos.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

const FALLBACK_FAVORITES: FavoriteItem[] = [
  {
    id: '1',
    type: 'Intercambio',
    author: 'Pedro C.',
    title: 'Repisa de madera 60 cm',
    message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
    daysRemaining: 3,
  },
  {
    id: '2',
    type: 'Adquisicion',
    author: 'Valentina P.',
    title: 'Set de escuadras y compás',
    message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
  },
];

export const SolicitudesFavoritos: React.FC = () => {
<<<<<<< HEAD
  const [favoriteRequests, setFavoriteRequests] = useState<FavoriteItem[]>(FALLBACK_FAVORITES);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes({ esFavorito: true })
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        setFavoriteRequests(
          datos.map((s) => ({
            id: s.id,
            type: s.type,
            author: s.author || 'Comunidad',
            title: s.title,
            message: s.message,
            daysRemaining: s.daysRemaining,
          }))
        );
      })
      .catch(() => {
        // Respaldo local
      });
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="solicitudes-page">
      {esAdmin() ? <AdminNavbar /> : <Navbar />}

=======
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
>>>>>>> Luisa
      <main className="solicitudes-content">
        <header className="solicitudes-header">
          <h1 className="solicitudes-title">Mis Solicitudes</h1>
          <p className="solicitudes-subtitle">Lo que has pedido y lo que otros te han pedido.</p>
        </header>

<<<<<<< HEAD
        <nav className="solicitudes-tabs">
          <NavLink
            to="/solicitudes"
            end
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Enviadas
          </NavLink>
          <NavLink
            to="/solicitudes/recibidas"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Recibidos
          </NavLink>
          <NavLink
            to="/solicitudes/favoritos"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Favoritos ({favoriteRequests.length})
          </NavLink>
          <NavLink
            to="/solicitudes/historial"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Historial
          </NavLink>
        </nav>

        <section className="solicitudes-list">
          {favoriteRequests.map((req) => (
            <FavoriteRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              daysRemaining={req.daysRemaining}
            />
          ))}
        </section>
=======
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
>>>>>>> Luisa
      </main>
      <Footer />
    </div>
  );
};
