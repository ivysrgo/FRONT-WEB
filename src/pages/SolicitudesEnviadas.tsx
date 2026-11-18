import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Luisa
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { RequestCard } from '../components/RequestCard';
<<<<<<< HEAD
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes } from '../services/solicitudService';
=======
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { actualizarEstadoSolicitud, obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
>>>>>>> Luisa
import './SolicitudesEnviadas.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

const FALLBACK_SENT: RequestItem[] = [
  {
    id: '1',
    type: 'DONACIÓN',
    title: 'Silla de escritorio',
    message: 'Ofrezco una lámpara de escritorio LED en muy buen estado.',
    date: '2 sep',
    status: 'Aceptado',
  },
  {
    id: '2',
    type: 'INTERCAMBIO',
    title: 'Harry Potter y la Piedra Filosofal',
    message: 'Lo necesito para el curso de este semestre, puedo recogerlo en la sede claustro.',
    date: '24 ago',
    status: 'Pendiente',
  },
  {
    id: '3',
    type: 'INTERCAMBIO',
    title: 'Diccionario bilingüe Oxford',
    message: 'Lo necesito para el curso de este semestre, lo ofrezco a cambio de las camisas de hombre',
    date: '16 sep',
    status: 'Pendiente',
  },
];

export const SolicitudesEnviadas: React.FC = () => {
<<<<<<< HEAD
  const [sentRequests, setSentRequests] = useState<RequestItem[]>(FALLBACK_SENT);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes()
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        const activas = datos
          .filter((s) => s.status === 'Pendiente' || s.status === 'Aceptado')
          .map((s) => ({
            id: s.id,
            type: (String(s.type).toUpperCase().includes('INTER') ? 'INTERCAMBIO' : 'DONACIÓN') as RequestItem['type'],
            title: s.title,
            message: s.message,
            date: s.date || 'Reciente',
            status: (s.status === 'Aceptado' ? 'Aceptado' : 'Pendiente') as RequestItem['status'],
          }));
        if (activas.length > 0) setSentRequests(activas);
      })
      .catch(() => {
        // Mantiene respaldo local si el backend está apagado
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
  const [solicitudEnProceso, setSolicitudEnProceso] = useState<string | null>(null);

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
          setError(requestError instanceof Error ? requestError.message : 'No se pudieron cargar tus solicitudes.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const manejarCancelar = async (id: string) => {
    setSolicitudEnProceso(id);
    setError(null);
    try {
      const cancelada = await actualizarEstadoSolicitud(id, 'Cancelado');
      setDatos((actuales) => ({
        ...actuales,
        enviadas: actuales.enviadas.filter((solicitud) => solicitud.id !== id),
        historial: [cancelada, ...actuales.historial],
      }));
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo cancelar la solicitud.');
    } finally {
      setSolicitudEnProceso(null);
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
            Enviadas ({sentRequests.length})
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
            Historial
          </NavLink>
        </nav>

        <section className="solicitudes-list">
          {sentRequests.map((req) => (
            <RequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              title={req.title}
              message={req.message}
              date={req.date}
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
          <p role="status">Cargando solicitudes...</p>
        ) : loadFailed ? null : datos.enviadas.length === 0 ? (
          <p className="solicitudes-empty">Todavía no has enviado solicitudes.</p>
        ) : (
          <section className="solicitudes-list">
            {datos.enviadas.map((solicitud) => (
              <RequestCard
                key={solicitud.id}
                id={solicitud.id}
                type={solicitud.type}
                title={solicitud.title}
                message={solicitud.message}
                date={solicitud.date}
                status={solicitud.status === 'Aceptado' ? 'Aceptado' : 'Pendiente'}
                actionPending={solicitudEnProceso === solicitud.id}
                onCancel={() => void manejarCancelar(solicitud.id)}
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
