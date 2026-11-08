import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticuloSolicitudForm.css';

const misArticulosParaOfrecer = [
  { id: 'mi-1', titulo: 'Abrigo de paño gris' },
  { id: 'mi-2', titulo: 'Diccionario Oxford' },
  { id: 'mi-3', titulo: 'Repisa de madera de 60cm' },
];

interface ArticuloSolicitudFormProps {
  onEnviarSolicitud: (
    tipoSolicitud: 'Donación' | 'Intercambio',
    mensaje: string,
    articuloOfrecidoId?: string
  ) => void;
}

export const ArticuloSolicitudForm: React.FC<ArticuloSolicitudFormProps> = ({ onEnviarSolicitud }) => {
  const [tipoSolicitud, setTipoSolicitud] = useState<'Donación' | 'Intercambio'>('Donación');
  const [mensajeSolicitud, setMensajeSolicitud] = useState('');
  const [articuloOfrecidoId, setArticuloOfrecidoId] = useState('');
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipoSolicitud === 'Intercambio' && !articuloOfrecidoId) {
      return;
    }

    onEnviarSolicitud(
      tipoSolicitud,
      mensajeSolicitud,
      tipoSolicitud === 'Intercambio' ? articuloOfrecidoId : undefined
    );
    setSolicitudEnviada(true);
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
            if (misArticulosParaOfrecer.length > 0 && !articuloOfrecidoId) {
              setArticuloOfrecidoId(misArticulosParaOfrecer[0].id);
            }
            setSolicitudEnviada(false);
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
            {misArticulosParaOfrecer.length > 0 ? (
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
                    {articulo.titulo}
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
                    {misArticulosParaOfrecer.find((articulo) => articulo.id === articuloOfrecidoId)?.titulo}
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
        <button type="submit" className="btn-enviar-negro">
          Enviar solicitud
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