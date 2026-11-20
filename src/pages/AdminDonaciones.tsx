import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminHistoryCard } from '../components/AdminHistoryCard';
import { formatearFechaLarga, listarDonaciones, type DonacionAdmin } from '../services/adminService';
import { ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminDonaciones.css';

type Orden = 'categoria' | 'reciente';

export const AdminDonaciones: React.FC = () => {
  const navigate = useNavigate();
  const [donaciones, setDonaciones] = useState<DonacionAdmin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orden, setOrden] = useState<Orden>('reciente');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  useEffect(() => {
    let activo = true;
    listarDonaciones({ desde, hasta })
      .then((lista) => {
        if (!activo) return;
        setError(null);
        setDonaciones(lista);
      })
      .catch((err: unknown) => {
        if (activo) setError(err instanceof ApiError ? err.message : 'No se pudo cargar el historial.');
      });
    return () => {
      activo = false;
    };
  }, [desde, hasta]);

  const ordenadas = useMemo(() => {
    if (!donaciones) return null;
    const copia = [...donaciones];
    if (orden === 'categoria') {
      copia.sort((a, b) =>
        (a.category || 'ZZZ').localeCompare(b.category || 'ZZZ', 'es') ||
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    } else {
      copia.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }
    return copia;
  }, [donaciones, orden]);

  const rangoInvalido = Boolean(desde && hasta && desde > hasta);

  return (
    <div className="admin-donaciones-layout">
      <AdminNavbar />

      <main className="admin-donaciones-content">
        <header className="admin-donaciones-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate('/admin/dashboard')}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Historial de donaciones</h2>
        </header>

        <section className="admin-filters-section">
          <div className="filter-group">
            <span className="filter-label">Ordenar por:</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${orden === 'categoria' ? 'is-active' : ''}`}
                aria-pressed={orden === 'categoria'}
                onClick={() => setOrden('categoria')}
              >
                Categoría
              </button>
              <button
                type="button"
                className={`filter-pill ${orden === 'reciente' ? 'is-active' : ''}`}
                aria-pressed={orden === 'reciente'}
                onClick={() => setOrden('reciente')}
              >
                Más Reciente
              </button>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Filtrar por fecha:</span>
            <div className="filter-inputs">
              <input
                type="date"
                className="filter-input-date"
                aria-label="Desde"
                value={desde}
                max={hasta || undefined}
                onChange={(event) => setDesde(event.target.value)}
              />
              <input
                type="date"
                className="filter-input-date"
                aria-label="Hasta"
                value={hasta}
                min={desde || undefined}
                onChange={(event) => setHasta(event.target.value)}
              />
              {(desde || hasta) && (
                <button
                  type="button"
                  className="filter-clear"
                  onClick={() => {
                    setDesde('');
                    setHasta('');
                  }}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="admin-list-section">
          {error || rangoInvalido ? (
            <p className="admin-results-count">
              {rangoInvalido ? 'La fecha inicial debe ser anterior a la final.' : error}
            </p>
          ) : ordenadas === null ? (
            <p className="admin-results-count">Cargando historial…</p>
          ) : (
            <>
              <p className="admin-results-count">
                {ordenadas.length} {ordenadas.length === 1 ? 'encontrada' : 'encontradas'}
              </p>

              {ordenadas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No hay donaciones registradas en la base de datos.</p>
                  <p style={{ fontSize: '0.9rem', color: '#888' }}>Las donaciones e intercambios completados aparecerán aquí automáticamente.</p>
                </div>
              ) : (
                <div className="admin-history-list">
                  {ordenadas.map((item) => (
                    <AdminHistoryCard
                      key={item.id}
                      id={item.id}
                      type={item.type}
                      author={item.author}
                      title={item.title}
                      date={formatearFechaLarga(item.fecha)}
                      description={item.description}
                      onViewArticle={
                        item.articuloId ? () => navigate(`/admin/articulo/${item.articuloId}`) : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
