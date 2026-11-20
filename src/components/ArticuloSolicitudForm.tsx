import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError } from '../services/api';
import { obtenerMisPublicaciones } from '../services/publicacionService';
import type { PostItem } from '../pages/Publicaciones';
import './ArticuloSolicitudForm.css';

interface ArticuloSolicitudFormProps {
  onEnviarSolicitud: (
    tipoSolicitud: 'Donación' | 'Intercambio',
    mensaje: string,
    articuloOfrecidoId?: string
  ) => Promise<void>;
}

export const ArticuloSolicitudForm: React.FC<ArticuloSolicitudFormProps> = ({ onEnviarSolicitud }) => {
  const navigate = useNavigate();
  const [tipoSolicitud, setTipoSolicitud] = useState<'Donación' | 'Intercambio'>('Donación');
  const [mensajeSolicitud, setMensajeSolicitud] = useState('');
  const [articuloOfrecidoId, setArticuloOfrecidoId] = useState('');
  const [misArticulosParaOfrecer, setMisArticulosParaOfrecer] = useState<PostItem[]>([]);
  const [cargandoArticulos, setCargandoArticulos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tipoSolicitud !== 'Intercambio' || misArticulosParaOfrecer.length > 0) return;
    if (!localStorage.getItem('token')) return;

    let cancelled = false;
    setCargandoArticulos(true);
    obtenerMisPublicaciones()
      .then((articulos) => {
        if (!cancelled) setMisArticulosParaOfrecer(articulos);
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(requestError instanceof ApiError || requestError instanceof Error
            ? requestError.message
            : 'No se pudieron cargar tus publicaciones.');
        }
      })
      .finally(() => {
        if (!cancelled) setCargandoArticulos(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tipoSolicitud, misArticulosParaOfrecer.length]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    if (tipoSolicitud === 'Intercambio' && !articuloOfrecidoId) {
      setError('Selecciona una publicación tuya para ofrecer en el intercambio.');
      return;
    }

    setEnviando(true);
    try {
      await onEnviarSolicitud(
        tipoSolicitud,
        mensajeSolicitud,
        tipoSolicitud === 'Intercambio' ? articuloOfrecidoId : undefined
      );
      setSolicitudEnviada(true);
      setMensajeSolicitud('');
    } catch (requestError: unknown) {
      setError(requestError instanceof ApiError || requestError instanceof Error
        ? requestError.message
        : 'No se pudo enviar la solicitud.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="solicitud-panel">
      <h3 className="solicitud-title">Enviar solicitud</h3>
      
      <div className="solicitud-tabs">
        <button 
          type="button"
          className={`solicitud-tab ${tipoSolicitud === 'Donación' ? 'active-cyan' : ''}`}
          onClick={() => {
            setTipoSolicitud('Donación');
            setSolicitudEnviada(false);
            setError(null);
          }}
        >
          Pedir en donación
        </button>
        <button 
          type="button"
          className={`solicitud-tab ${tipoSolicitud === 'Intercambio' ? 'active-orange' : ''}`}
          onClick={() => {
            setTipoSolicitud('Intercambio');
            setSolicitudEnviada(false);
            setArticuloOfrecidoId('');
            setError(null);
          }}
        >
          Proponer Intercambio
        </button>
      </div>

      <form className="solicitud-form" onSubmit={manejarEnvio}>
        {tipoSolicitud === 'Intercambio' && (
          <div className="selector-intercambio-container">
            <label className="selector-label" htmlFor="articulo-ofrecido">
              ¿Qué vas a ofrecer a cambio?
            </label>
            {cargandoArticulos ? (
              <p className="no-items-msg" role="status">Cargando tus publicaciones...</p>
            ) : misArticulosParaOfrecer.length > 0 ? (
              <select
                id="articulo-ofrecido"
                className="selector-intercambio"
                value={articuloOfrecidoId}
                onChange={(e) => {
                  setArticuloOfrecidoId(e.target.value);
                  setSolicitudEnviada(false);
                }}
                required
              >
                <option value="" disabled>Selecciona uno de tus artículos...</option>
                {misArticulosParaOfrecer.map((articulo) => (
                  <option key={articulo.id} value={articulo.id}>
                  {articulo.title}
                  </option>
                ))}
              </select>
            ) : (
              <p className="no-items-msg">
                No tienes artículos publicados. <Link to="/publicar">Publica uno nuevo</Link> para poder intercambiar.
              </p>
            )}

            {articuloOfrecidoId && (
              <div className="trueque-feedback">
                <span className="trueque-icon" aria-hidden="true">⇄</span>
                <p className="trueque-text">
                  Ofrecerás tu{' '}
                  <strong>
                    {misArticulosParaOfrecer.find((articulo) => articulo.id === articuloOfrecidoId)?.title}
                  </strong>
                </p>
              </div>
            )}
          </div>
        )}

        <textarea 
          className="solicitud-textarea"
          placeholder={tipoSolicitud === 'Donación'
            ? 'Cuéntale a quién publica por qué lo necesitas...'
            : 'Añade detalles sobre el estado de tu artículo o disponibilidad para encontrarse...'}
          value={mensajeSolicitud}
          onChange={(e) => {
            setMensajeSolicitud(e.target.value);
            setSolicitudEnviada(false);
          }}
          required
        />
        {error && <p role="alert" className="solicitud-error">{error}</p>}
        <button type="submit" className="btn-enviar-negro" disabled={enviando || cargandoArticulos}>
        {enviando ? 'Enviando...' : 'Enviar solicitud'}
        </button>
        {solicitudEnviada && (
          <p className="solicitud-confirmacion" role="status" aria-live="polite">
            Solicitud enviada. Consulta su estado en{' '}
            <Link to="/solicitudes">Mis solicitudes</Link>.
          </p>
        )}
      </form>
    </div>
  );
};