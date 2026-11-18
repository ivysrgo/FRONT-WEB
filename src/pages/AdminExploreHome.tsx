<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ItemCarousel, type CarouselItem } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams, hasActiveFilters } from '../utils/searchFilters';
import { CATALOGO_FALLBACK, obtenerArticulosCatalogo } from '../services/publicacionService';
import './ExploreHome.css';
=======
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar'; // Usamos el Navbar de Admin
import { Footer } from '../components/Footer';
import { ItemCarousel } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { useArticulos } from '../data/articulos';
import './ExploreHome.css'; // Reutilizamos los mismos estilos
>>>>>>> Luisa

export const AdminExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
<<<<<<< HEAD
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
=======
  const articulos = useArticulos();

  const filters = filtersFromParams(searchParams);
  const filteredItems = applyFilters(articulos, filters);
>>>>>>> Luisa

  return (
    <div className="explore-page">
      <AdminNavbar />

      <main className="explore-content">
<<<<<<< HEAD
        {/* Bloque Hero (Vista Administrador) */}
        <section className="explore-hero">
          <div className="hero-text-container" style={{ maxWidth: '100%' }}>
            <span className="hero-tagline">PANEL ADMINISTRATIVO · ECO-GOLGI</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Supervisa las publicaciones de la comunidad, revisa los intercambios locales y gestiona las donaciones escaladas al Banco de Ropa de Unidona.
=======
        {/* Bloque Hero (Sin botón de Publicar para Admin) */}
        <section className="explore-hero">
          <div className="hero-text-container" style={{ maxWidth: '100%' }}> {/* Ocupa todo el ancho al no haber botón */}
            <span className="hero-tagline">RECICLA Y COMPARTE EN TU COMUNIDAD</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Publica lo que ya no usas, intercámbialo localmente y, si no circula, dónalo a la red del Banco de Ropa de Unidona.
>>>>>>> Luisa
            </p>
          </div>
        </section>

        {/* Fila de Métricas / Estadísticas */}
        <section className="metrics-section">
<<<<<<< HEAD
          <div className="metric-card" style={{ backgroundColor: '#85DAFF' }}>
=======
          <div className="metric-card">
>>>>>>> Luisa
            <span className="metric-number">{articulos.length}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>

          <div className="metric-card">
<<<<<<< HEAD
            <span className="metric-number" style={{ color: '#FF9600' }}>128</span>
=======
            <span className="metric-number">128</span>
>>>>>>> Luisa
            <span className="metric-label">intercambios<br />Locales</span>
          </div>

          <div className="metric-card">
<<<<<<< HEAD
            <span className="metric-number" style={{ color: '#FF9600' }}>41</span>
            <span className="metric-label">Escalados a<br />Minuto de Dios</span>
=======
            <span className="metric-number">41</span>
            <span className="metric-label">Escalados a<br />Unidona</span>
>>>>>>> Luisa
          </div>
        </section>

        {/* Banner de Impacto Ambiental */}
        <div className="impact-banner">
<<<<<<< HEAD
          <h2>LLEVAMOS 340KG DE RESIDUOS EVITADOS</h2>
=======
          <h2>340KG DE RESIDUOS EVITADOS</h2>
>>>>>>> Luisa
        </div>

        {/* Catálogo en carrusel */}
        <section className="catalog-section">
          <div className="catalog-header">
            <p className="catalog-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
            </p>
<<<<<<< HEAD
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
=======
            <button
              type="button"
              className="catalog-link"
              onClick={() => navigate({
                pathname: '/admin/todos',
                search: searchParams.toString()
              })}
            >
              Ver todos los artículos
            </button>
          </div>

          {filteredItems.length > 0 ? (
            <ItemCarousel key={searchParams.toString()} items={filteredItems} isAdmin />
>>>>>>> Luisa
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
<<<<<<< HEAD
};

=======
};
>>>>>>> Luisa
