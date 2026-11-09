import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar'; // Usamos el Navbar de Admin
import { Footer } from '../components/Footer';
import { ItemCarousel } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { articulosMock } from '../data/articulos';
import './ExploreHome.css'; // Reutilizamos los mismos estilos

export const AdminExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filters = filtersFromParams(searchParams);
  const filteredItems = applyFilters(articulosMock, filters);

  return (
    <div className="explore-page">
      <AdminNavbar />

      <main className="explore-content">
        {/* Bloque Hero (Sin botón de Publicar para Admin) */}
        <section className="explore-hero">
          <div className="hero-text-container" style={{ maxWidth: '100%' }}> {/* Ocupa todo el ancho al no haber botón */}
            <span className="hero-tagline">RECICLA Y COMPARTE EN TU COMUNIDAD</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Publica lo que ya no usas, intercámbialo localmente y, si no circula, dónalo a la red del Banco de Ropa del Minuto de Dios.
            </p>
          </div>
        </section>

        {/* Fila de Métricas / Estadísticas */}
        <section className="metrics-section">
          <div className="metric-card" style={{ backgroundColor: '#85DAFF' }}> {/* Ajuste de color según Figma */}
            <span className="metric-number">{articulosMock.length}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>

          <div className="metric-card">
            <span className="metric-number" style={{ color: '#FF9600' }}>128</span> {/* Color naranja */}
            <span className="metric-label">intercambios<br />Locales</span>
          </div>

          <div className="metric-card">
            <span className="metric-number" style={{ color: '#FF9600' }}>41</span> {/* Color naranja */}
            <span className="metric-label">Escalados a<br />Minuto de Dios</span>
          </div>
        </section>

        {/* Banner de Impacto Ambiental */}
        <div className="impact-banner">
          <h2>340KG DE RESIDUOS EVITADOS</h2>
        </div>

        {/* Catálogo en carrusel */}
        <section className="catalog-section">
          <div className="catalog-header">
            <p className="catalog-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
            </p>
            <button type="button" className="catalog-link" onClick={() => navigate('/admin/todos')}> {/* Ruta de Admin */}
              Ver todos los artículos
            </button>
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