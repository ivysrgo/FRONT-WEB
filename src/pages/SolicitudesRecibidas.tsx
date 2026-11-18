import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> Luisa
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ReceivedRequestCard } from '../components/ReceivedRequestCard';
<<<<<<< HEAD
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes, actualizarSolicitud } from '../services/solicitudService';
=======
import { ExchangeConfirmModal } from '../components/ExchangeConfirmModal';
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import {
  actualizarEstadoSolicitud,
  confirmarIntercambio,
  obtenerMisSolicitudes,
  type MisSolicitudes,
} from '../services/solicitudService';
>>>>>>> Luisa
import './SolicitudesRecibidas.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

const FALLBACK_RECEIVED: ReceivedItem[] = [
  {
    id: '1',
    type: 'DONACIÓN',
    author: 'Mariana C.',
    title: 'Diccionario bilingüe Oxford',
    message: 'Estoy empezando inglés técnico y me sería muy útil. Puedo recogerlo cuando te quede bien.',
    status: 'Aceptado',
  },
  {
    id: '2',
    type: 'INTERCAMBIO',
    author: 'Julián E.',
    title: 'Diccionario bilingüe Oxford',
    message: 'Tengo un diccionario de francés y una gramática avanzada para intercambiar.',
    status: 'Aceptado',
  },
  {
    id: '3',
    type: 'INTERCAMBIO',
    author: 'Laura V.',
    title: 'Abrigo de paño gris',
    message: 'Ofrezco una chaqueta impermeable talla M en buen estado.',
    status: 'Aceptado',
  },
  {
    id: '4',
    type: 'INTERCAMBIO',
    author: 'Luna P.',
    title: 'Repisa de madera de 60cm',
    message: 'Ofrezco una repisa de madera de abedúl de 60cm.',
    status: 'Pendiente',
  },
];

export const SolicitudesRecibidas: React.FC = () => {
<<<<<<< HEAD
  const [receivedRequests, setReceivedRequests] = useState<ReceivedItem[]>(FALLBACK_RECEIVED);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes()
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        const activas = datos
          .filter((s) => s.status === 'Pendiente' || s.status === 'Aceptado')
          .map((s) => ({
            id: s.id,
            type: (String(s.type).toUpperCase().includes('INTER') ? 'INTERCAMBIO' : 'DONACIÓN') as ReceivedItem['type'],
            author: s.author || 'Usuario',
            title: s.title,
            message: s.message,
            status: (s.status === 'Aceptado' ? 'Aceptado' : 'Pendiente') as ReceivedItem['status'],
          }));
        if (activas.length > 0) setReceivedRequests(activas);
      })
      .catch(() => {
        // Respaldo local
      });
    return () => {
      cancelado = true;
    };
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await actualizarSolicitud(id, { status: 'Aceptado' });
    } catch {
      // Actualización optimista si es dato demo
    }
    setReceivedRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Aceptado' } : item))
    );
  };

  const handleReject = async (id: string) => {
    try {
      await actualizarSolicitud(id, { status: 'Rechazado' });
    } catch {
      // Actualización optimista si es dato demo
    }
    setReceivedRequests((prev) => prev.filter((item) => item.id !== id));
=======
  const navigate = useNavigate();
  const [datos, setDatos] = useState(solicitudesVacias);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [solicitudEnProceso, setSolicitudEnProceso] = useState<string | null>(null);
  const [modalIntercambioAbierto, setModalIntercambioAbierto] = useState(false);
  const [solicitudAConfirmar, setSolicitudAConfirmar] = useState<string | null>(null);
  const [usuarioACalificar, setUsuarioACalificar] = useState('');

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

  const moverAlHistorial = (solicitud: MisSolicitudes['recibidas'][number]) => {
    setDatos((actuales) => ({
      ...actuales,
      recibidas: actuales.recibidas.filter((item) => item.id !== solicitud.id),
      historial: [solicitud, ...actuales.historial],
    }));
  };

  const manejarEstado = async (id: string, status: 'Aceptado' | 'Rechazado' | 'Donado') => {
    setSolicitudEnProceso(id);
    setError(null);
    try {
      const actualizada = await actualizarEstadoSolicitud(id, status);
      if (status === 'Rechazado' || status === 'Donado') {
        moverAlHistorial(actualizada);
      } else {
        setDatos((actuales) => ({
          ...actuales,
          recibidas: actuales.recibidas.map((item) => item.id === id ? actualizada : item),
        }));
      }
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo actualizar la solicitud.');
    } finally {
      setSolicitudEnProceso(null);
    }
  };

  const iniciarConfirmacionIntercambio = (id: string, nombreUsuario: string) => {
    setSolicitudAConfirmar(id);
    setUsuarioACalificar(nombreUsuario);
    setModalIntercambioAbierto(true);
  };

  const finalizarIntercambio = async (calificacion: number) => {
    if (!solicitudAConfirmar) return;
    setSolicitudEnProceso(solicitudAConfirmar);
    try {
      const completada = await confirmarIntercambio(solicitudAConfirmar, calificacion);
      moverAlHistorial(completada);
      setModalIntercambioAbierto(false);
      setSolicitudAConfirmar(null);
      setUsuarioACalificar('');
    } finally {
      setSolicitudEnProceso(null);
    }
  };

  const cerrarModalIntercambio = () => {
    setModalIntercambioAbierto(false);
    setSolicitudAConfirmar(null);
    setUsuarioACalificar('');
>>>>>>> Luisa
  };

  return (
    <div className="solicitudes-page">
<<<<<<< HEAD
      {esAdmin() ? <AdminNavbar /> : <Navbar />}

=======
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
            Recibidos ({receivedRequests.length})
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
          {receivedRequests.map((req) => (
            <ReceivedRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
              onAccept={() => handleAccept(req.id)}
              onReject={() => handleReject(req.id)}
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
        ) : loadFailed ? null : datos.recibidas.length === 0 ? (
          <p className="solicitudes-empty">Todavía no has recibido solicitudes.</p>
        ) : (
          <section className="solicitudes-list">
            {datos.recibidas.map((solicitud) => (
              <ReceivedRequestCard
                key={solicitud.id}
                id={solicitud.id}
                articleId={solicitud.articuloId}
                type={solicitud.type}
                author={solicitud.author}
                title={solicitud.title}
                message={solicitud.message}
                status={solicitud.status === 'Aceptado' ? 'Aceptado' : 'Pendiente'}
                actionPending={solicitudEnProceso === solicitud.id}
                onAccept={() => {
                  if (solicitud.type === 'INTERCAMBIO') {
                    iniciarConfirmacionIntercambio(solicitud.id, solicitud.author);
                  } else {
                    void manejarEstado(solicitud.id, 'Aceptado');
                  }
                }}
                onReject={() => void manejarEstado(solicitud.id, 'Rechazado')}
                onComplete={() => void manejarEstado(solicitud.id, 'Donado')}
              />
            ))}
          </section>
        )}
>>>>>>> Luisa
      </main>
      <Footer />
      <ExchangeConfirmModal
        isOpen={modalIntercambioAbierto}
        onClose={cerrarModalIntercambio}
        onConfirm={finalizarIntercambio}
        nombreOtroUsuario={usuarioACalificar}
      />
    </div>
  );
};
