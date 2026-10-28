import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CATEGORY_OPTIONS,
  CONDITION_OPTIONS,
  DEFAULT_FILTERS,
  MODALITY_OPTIONS,
  filtersFromParams,
  filtersToParams,
} from '../utils/searchFilters';
import type { SearchFilters } from '../utils/searchFilters';
import './SearchPanel.css';

export const SearchPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const onExplore = location.pathname === '/explorar';
  const filters = onExplore ? filtersFromParams(searchParams) : DEFAULT_FILTERS;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cada cambio se refleja en la URL de /explorar; desde otra pantalla, lleva a Explorar con el panel abierto
  const update = (changes: Partial<SearchFilters>) => {
    const next = { ...filters, ...changes };
    navigate(
      { pathname: '/explorar', search: filtersToParams(next).toString() },
      { replace: onExplore, state: { searchOpen: true } },
    );
  };

  return (
    <div className="search-panel" role="search">
      <div className="search-row">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Buscar por nombre o descripción..."
            aria-label="Buscar artículos"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
          />
          <button type="button" className="search-clear-btn" onClick={() => update(DEFAULT_FILTERS)}>
            Limpiar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <select
          className="search-select"
          aria-label="Estado del artículo"
          value={filters.condition}
          onChange={(e) => update({ condition: e.target.value })}
        >
          {CONDITION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <select
          className="search-select"
          aria-label="Modalidad"
          value={filters.modality}
          onChange={(e) => update({ modality: e.target.value })}
        >
          {MODALITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="search-chips" role="group" aria-label="Categorías">
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`search-chip ${filters.category === option.value ? 'is-active' : ''}`}
            aria-pressed={filters.category === option.value}
            onClick={() => update({ category: option.value })}
          >
            {option.label}
          </button>
        ))}
        <button
          type="button"
          className={`search-chip ${filters.recent ? 'is-active' : ''}`}
          aria-pressed={filters.recent}
          onClick={() => update({ recent: !filters.recent })}
        >
          Más Recientes
        </button>
      </div>
    </div>
  );
};
