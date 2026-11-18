import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ItemCarousel, type CarouselItem } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams, hasActiveFilters } from '../utils/searchFilters';
import { CATALOGO_FALLBACK, obtenerArticulosCatalogo } from '../services/publicacionService';
import './ExploreHome.css';

export const AdminExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [articulos, setArticulos] = useState<CarouselItem[]>(CATALOGO_FALLBACK);

  useEffect(() => {
    let cancelado = false;
    obtenerArticulosCatalogo().then((datos) => {
      if (!cancelado && datos && datos.length > 0) {
        setArticulos(datos);
      }
    });
    return () => {
      cancelado = true;
    };
  }, []);

  const filters = filtersFromParams(searchParams);
  const filteredItems = applyFilters(articulos, filters);
  const filtering = hasActiveFilters(filters);

  return (
    <div className="explore-page">
      <AdminNavbar />

      <main className="explore-content">
        {/* Bloque Hero (Vista Administrador) */}
        <section className="explore-hero">
          <div className="hero-text-container" style={{ maxWidth: '100%' }}>
            <span className="hero-tagline">PANEL ADMINISTRATIVO · ECO-GOLGI</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Supervisa las publicaciones de la comunidad, revisa los intercambios locales y gestiona las donaciones escaladas al Banco de Ropa de Unidona.
            </p>
          </div>
        </section>

        {/* Fila de Métricas / Estadísticas */}
        <section className="metrics-section">
          <div className="metric-card" style={{ backgroundColor: '#85DAFF' }}>
            <span className="metric-number">{articulos.length}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>

          <div className="metric-card">
            <span className="metric-number" style={{ color: '#FF9600' }}>128</span>
            <span className="metric-label">intercambios<br />Locales</span>
          </div>

          <div className="metric-card">
            <span className="metric-number" style={{ color: '#FF9600' }}>41</span>
            <span className="metric-label">Escalados a<br />Minuto de Dios</span>
          </div>
        </section>

        {/* Banner de Impacto Ambiental */}
        <div className="impact-banner">
          <h2>LLEVAMOS 340KG DE RESIDUOS EVITADOS</h2>
        </div>

        {/* Catálogo en carrusel */}
        <section className="catalog-section">
          <div className="catalog-header">
            <p className="catalog-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
            </p>
            {filtering ? (
              <button type="button" className="catalog-link" onClick={() => navigate('/admin/explorar')}>
                Limpiar filtros
              </button>
            ) : (
              <button type="button" className="catalog-link" onClick={() => navigate('/admin/dashboard')}>
                Ir a administrar inventario →
              </button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <ItemCarousel key={searchParams.toString()} items={filteredItems} />
          ) : (
            <div className="catalog-empty">
              <p className="catalog-empty-title">No encontramos artículos con esos filtros</p>
              <p className="catalog-empty-text">Prueba con otra palabra o limpia los filtros para ver todo.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

