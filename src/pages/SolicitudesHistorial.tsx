import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Luisa
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { HistoryRequestCard } from '../components/HistoryRequestCard';
<<<<<<< HEAD
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes } from '../services/solicitudService';
=======
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
>>>>>>> Luisa
import './SolicitudesHistorial.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

const FALLBACK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    type: 'Intercambio',
    author: 'Pedro C.',
    title: 'Repisa de madera 60 cm',
    message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
    status: 'Aceptado',
  },
  {
    id: '2',
    type: 'Donación',
    author: 'Valentina P.',
    title: 'Set de escuadras y compás',
    message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
    status: 'Donado',
  },
  {
    id: '3',
    type: 'Intercambio',
    author: 'Pedro C.',
    title: 'Repisa de madera 60 cm',
    message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
    status: 'Rechazado',
  },
  {
    id: '4',
    type: 'Donación',
    author: 'Valentina P.',
    title: 'Set de escuadras y compás',
    message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
    status: 'Donado',
  },
];

export const SolicitudesHistorial: React.FC = () => {
<<<<<<< HEAD
  const [historyRequests, setHistoryRequests] = useState<HistoryItem[]>(FALLBACK_HISTORY);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes()
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        const completadas = datos
          .filter((s) => s.status === 'Aceptado' || s.status === 'Donado' || s.status === 'Rechazado')
          .map((s) => ({
            id: s.id,
            type: s.type,
            author: s.author || 'Comunidad',
            title: s.title,
            message: s.message,
            status: s.status as HistoryItem['status'],
          }));
        if (completadas.length > 0) setHistoryRequests(completadas);
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
  const [datos, setDatos] = useState(solicitudesVacias);
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

    obtenerMisSolicitudes()
      .then((solicitudes) => {
        if (!cancelled) setDatos(solicitudes);
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
            Favoritos
          </NavLink>
          <NavLink
            to="/solicitudes/historial"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Historial ({historyRequests.length})
          </NavLink>
        </nav>

        <section className="solicitudes-list">
          {historyRequests.map((req) => (
            <HistoryRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
            />
          ))}
        </section>
=======
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
            {datos.historial.map((solicitud) => (
              <HistoryRequestCard
                key={solicitud.id}
                id={solicitud.id}
                type={solicitud.type}
                author={solicitud.author}
                title={solicitud.title}
                message={solicitud.message}
                status={solicitud.status === 'Donado' ? 'Donado' : solicitud.status === 'Cancelado' ? 'Cancelado' : 'Rechazado'}
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
