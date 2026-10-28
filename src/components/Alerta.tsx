import React from 'react';

export interface MensajeAlerta {
  tipo: 'exito' | 'error';
  texto: string;
  detalles?: string[];
}

interface AlertaProps {
  mensaje: MensajeAlerta;
  onCerrar: () => void;
}

export const Alerta: React.FC<AlertaProps> = ({ mensaje, onCerrar }) => {
  const esError = mensaje.tipo === 'error';

  return (
    <div
      role={esError ? 'alert' : 'status'}
      style={{
        backgroundColor: esError ? '#FEE2E2' : '#DCFCE7',
        border: `1px solid ${esError ? '#D5473A' : '#22794C'}`,
        color: '#000000',
        borderRadius: '16px',
        padding: '14px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-principal)',
        fontSize: '14px',
      }}
    >
      <div>
        <strong>{mensaje.texto}</strong>
        {mensaje.detalles && mensaje.detalles.length > 0 && (
          <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
            {mensaje.detalles.map((detalle) => (
              <li key={detalle}>{detalle}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        aria-label="Cerrar mensaje"
        onClick={onCerrar}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
};

