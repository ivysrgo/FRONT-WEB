import React from 'react';
import {
  CATEGORIAS_PRENDA,
  type CategoriaPrenda,
  type EstadoPublicacion,
} from '../types/unidona';

export type FiltroCategoriaPrenda = CategoriaPrenda | 'Todas';
export type FiltroEstadoPublicacion = EstadoPublicacion | 'Todos';

interface BarraFiltrosPublicacionesProps {
  busqueda: string;
  categoria: FiltroCategoriaPrenda;
  estado: FiltroEstadoPublicacion;
  onBusquedaChange: (texto: string) => void;
  onCategoriaChange: (categoria: FiltroCategoriaPrenda) => void;
  onEstadoChange: (estado: FiltroEstadoPublicacion) => void;
  onLimpiar: () => void;
}

export const BarraFiltrosPublicaciones: React.FC<BarraFiltrosPublicacionesProps> = ({
  busqueda,
  categoria,
  estado,
  onBusquedaChange,
  onCategoriaChange,
  onEstadoChange,
  onLimpiar,
}) => {
  const hayFiltros =
    busqueda.trim() !== '' || categoria !== 'Todas' || estado !== 'Todos';

  const controlStyle: React.CSSProperties = {
    height: '44px',
    borderRadius: '14px',
    border: '1px solid #000000',
    padding: '0 14px',
    fontFamily: 'var(--font-principal)',
    fontSize: '14px',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
        alignItems: 'center',
      }}
    >
      <input
        type="search"
        placeholder="Buscar por prenda, código o localidad..."
        aria-label="Buscar prenda"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        style={{ ...controlStyle, flex: '1 1 240px' }}
      />

      <select
        aria-label="Filtrar por categoría"
        value={categoria}
        onChange={(e) => onCategoriaChange(e.target.value as FiltroCategoriaPrenda)}
        style={controlStyle}
      >
        <option value="Todas">Todas las categorías</option>
        {CATEGORIAS_PRENDA.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por estado"
        value={estado}
        onChange={(e) => onEstadoChange(e.target.value as FiltroEstadoPublicacion)}
        style={controlStyle}
      >
        <option value="Todos">Todos los estados</option>
        <option value="Disponible">Disponible</option>
        <option value="Reservado">Reservado</option>
        <option value="Caducado">Caducado</option>
        <option value="Donado">Donado - Unidona</option>
      </select>

      {hayFiltros && (
        <button
          type="button"
          className="edit-btn"
          onClick={onLimpiar}
          style={{ height: '44px', padding: '0 18px' }}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

