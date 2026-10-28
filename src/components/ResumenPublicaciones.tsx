import React from 'react';
import { DIAS_ALERTA_CADUCIDAD, type Publicacion } from '../types/unidona';

interface ResumenPublicacionesProps {
  publicaciones: Publicacion[];
}

export const ResumenPublicaciones: React.FC<ResumenPublicacionesProps> = ({
  publicaciones,
}) => {
  const totalPublicaciones = publicaciones.length;
  const disponibles = publicaciones.filter((p) => p.status === 'Disponible').length;
  const totalSolicitudes = publicaciones.reduce((acc, p) => acc + p.requests, 0);
  const porCaducarOCaducadas = publicaciones.filter(
    (p) => p.daysElapsed >= DIAS_ALERTA_CADUCIDAD && p.status !== 'Donado',
  ).length;

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    padding: '18px 24px',
    flex: '1 1 180px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  return (
    <section
      aria-label="Resumen de publicaciones"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      <article style={cardStyle}>
        <span style={{ fontSize: '12px', color: '#A3A3A3', fontWeight: 600 }}>
          Total prendas
        </span>
        <strong style={{ fontSize: '28px' }}>{totalPublicaciones}</strong>
      </article>

      <article style={cardStyle}>
        <span style={{ fontSize: '12px', color: '#A3A3A3', fontWeight: 600 }}>
          Disponibles
        </span>
        <strong style={{ fontSize: '28px', color: '#0070BA' }}>{disponibles}</strong>
      </article>

      <article style={cardStyle}>
        <span style={{ fontSize: '12px', color: '#A3A3A3', fontWeight: 600 }}>
          Solicitudes recibidas
        </span>
        <strong style={{ fontSize: '28px', color: '#FF9600' }}>{totalSolicitudes}</strong>
      </article>

      <article
        style={{
          ...cardStyle,
          border: porCaducarOCaducadas > 0 ? '1px solid #FF9600' : 'none',
        }}
      >
        <span style={{ fontSize: '12px', color: '#A3A3A3', fontWeight: 600 }}>
          Por caducar / Caducadas (≥ {DIAS_ALERTA_CADUCIDAD}d)
        </span>
        <strong style={{ fontSize: '28px', color: '#D5473A' }}>
          {porCaducarOCaducadas}
        </strong>
      </article>
    </section>
  );
};

