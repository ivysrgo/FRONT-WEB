import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { ItemCarousel } from '../components/ItemCarousel';
import type { CarouselItem } from '../components/ItemCarousel';
import { Navbar } from '../components/Navbar';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { ApiError, displayCategory, getImageUrl, publicacionesApi } from '../services/publicacionesApi';
import type { Publication } from '../services/publicacionesApi';
import './ExploreHome.css';

const toCarouselItem = (publication: Publication): CarouselItem => {
  const category = displayCategory(publication.category);
  const normalizedCategory = category.toLocaleLowerCase();
  const categoryKey = normalizedCategory.includes('ropa')
    ? 'ROPA'
    : normalizedCategory.includes('libro')
      ? 'LIBROS'
      : normalizedCategory.includes('util')
        ? 'ÚTILES'
        : normalizedCategory.includes('mueble')
          ? 'MUEBLES'
          : category;

  return {
    id: publication.id,
    category: categoryKey,
    title: publication.title,
    modality: publication.modality,
    tags: publication.tags,
    description: publication.description,
    condition: publication.condition,
    author: publication.author,
    imageUrl: getImageUrl(publication.imageUrl),
    publishedAt: publication.publishedAt,
  };
};

export const ExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    publicacionesApi.list()
      .then((publications) => {
        if (active) setItems(publications.map(toCarouselItem));
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(requestError instanceof ApiError
            ? requestError.message
            : 'No se pudieron cargar los artículos.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);
  const filteredItems = useMemo(() => applyFilters(items, filters), [items, filters]);
  const availableCount = items.length;

  return (
    <div className="explore-page">
      <Navbar />

      <main className="explore-content">
        <section className="explore-hero">
          <div className="hero-text-container">
            <span className="hero-tagline">RECICLA Y COMPARTE EN TU COMUNIDAD</span>
            <h1 className="hero-title">Dale una Segunda<br />Oportunidad</h1>
            <p className="hero-description">
              Publica lo que ya no usas, intercámbialo localmente y, si no circula, dónalo a la red del Banco de Ropa de Unidona.
            </p>
          </div>
          <div className="hero-action">
            <Button variant="solid" type="button" onClick={() => navigate('/publicar')}>
              Publicar Artículo
            </Button>
          </div>
        </section>

        <section className="metrics-section">
          <div className="metric-card metric-blue">
            <span className="metric-number">{availableCount}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>
          <div className="metric-card metric-light">
            <span className="metric-number orange-text">128</span>
            <span className="metric-label">Intercambios<br />Locales</span>
          </div>
          <div className="metric-card metric-light">
            <span className="metric-number orange-text">41</span>
            <span className="metric-label">Escalados a<br />Unidona</span>
          </div>
        </section>

        <div className="impact-banner">
          <h2>LLEVAMOS 340KG DE RESIDUOS EVITADOS</h2>
        </div>

        <section className="catalog-section">
          <div className="catalog-header">
            <p className="catalog-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
            </p>
            <button type="button" className="catalog-link" onClick={() => navigate('/todos')}>
              Ver todos los artículos
            </button>
          </div>

          {loading && <p role="status">Cargando artículos…</p>}
          {!loading && error && <p role="alert" className="catalog-empty-text">{error}</p>}
          {!loading && !error && filteredItems.length > 0 && (
            <ItemCarousel key={searchParams.toString()} items={filteredItems} />
          )}
          {!loading && !error && filteredItems.length === 0 && (
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
