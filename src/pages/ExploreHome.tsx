import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { ItemCarousel } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { useArticulos } from '../data/articulos';
import './ExploreHome.css';

export const ExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const articulos = useArticulos();

  const filters = filtersFromParams(searchParams);
  const filteredItems = applyFilters(articulos, filters);

  return (
    <div className="explore-page">
      <Navbar />

      <main className="explore-content">
        {/* Bloque Hero */}
        <section className="explore-hero">
          <div className="hero-text-container">
            <span className="hero-tagline">RECICLA Y COMPARTE EN TU COMUNIDAD</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Publica lo que ya no usas, intercámbialo localmente y, si no circula, dónalo a la red del Banco de Ropa de Unidona.
            </p>
          </div>
          <div className="hero-action">
            <Button 
              variant="solid" 
              type="button" 
              onClick={() => navigate('/publicar')}
            >
              Publicar Artículo
            </Button>
          </div>
        </section>

        {/* Fila de Métricas / Estadísticas */}
        <section className="metrics-section">
          <div className="metric-card">
            <span className="metric-number">{articulos.length}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>

          <div className="metric-card">
            <span className="metric-number">128</span>
            <span className="metric-label">intercambios<br />Locales</span>
          </div>

          <div className="metric-card">
            <span className="metric-number">41</span>
            <span className="metric-label">Escalados a<br />Unidona</span>
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
            <button type="button" className="catalog-link" onClick={() => navigate('/todos')}>
              Ver todos los artículos
            </button>
          </div>

          {filteredItems.length > 0 ? (
            // La key reinicia el carrusel cuando cambian los filtros
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