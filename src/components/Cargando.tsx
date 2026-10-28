import React from 'react';

interface CargandoProps {
  texto?: string;
}

export const Cargando: React.FC<CargandoProps> = ({ texto = 'Cargando datos...' }) => {
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '48px 20px',
        fontFamily: 'var(--font-principal)',
        fontSize: '16px',
        fontWeight: 600,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: '3px solid #D9D9D9',
          borderTopColor: '#000000',
          display: 'inline-block',
          animation: 'unidona-spin 0.8s linear infinite',
        }}
      />
      <span>{texto}</span>
      <style>{`@keyframes unidona-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

