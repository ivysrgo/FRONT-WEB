import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ReceivedRequestCard } from '../components/ReceivedRequestCard';
import { ExchangeConfirmModal } from '../components/ExchangeConfirmModal';
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import {
  actualizarEstadoSolicitud,
  confirmarIntercambio,
  obtenerMisSolicitudes,
  type MisSolicitudes,
} from '../services/solicitudService';
import './SolicitudesRecibidas.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

export const SolicitudesRecibidas: React.FC = () => {
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
