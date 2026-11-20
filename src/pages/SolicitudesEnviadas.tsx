import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RequestCard } from '../components/RequestCard';
import { SolicitudesTabs } from '../components/SolicitudesTabs';
import { actualizarEstadoSolicitud, obtenerMisSolicitudes, type MisSolicitudes } from '../services/solicitudService';
import './SolicitudesEnviadas.css';

const solicitudesVacias: MisSolicitudes = {
  enviadas: [],
  recibidas: [],
  historial: [],
  favoritos: 0,
};

export const SolicitudesEnviadas: React.FC = () => {
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
                targetUserId={solicitud.targetUserId || solicitud.destinatarioId}
                targetUserName={solicitud.targetUserName}
                targetUserAvatarUrl={solicitud.targetUserAvatarUrl}
              />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
