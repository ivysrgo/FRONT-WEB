import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { ItemCarousel } from '../components/ItemCarousel';
import type { CarouselItem } from '../components/ItemCarousel';
import { applyFilters, filtersFromParams, hasActiveFilters } from '../utils/searchFilters';
import './ExploreHome.css';

export const ExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const items: CarouselItem[] = [
    {
      id: '1',
      category: 'MUEBLES',
      title: 'Silla de escritorio',
      modality: 'Intercambio',
      description: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
      condition: 'Usado',
      author: 'Diego M.',
      imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-02'
    },
    {
      id: '2',
      category: 'ROPA',
      title: 'Camisas de trabajo (x3)',
      modality: 'Donación',
      tags: ['M', 'Hombre', 'Cálido'],
      description: 'Algodón liviano, manga corta. Cuellos en buen estado, una tiene un botón de repuesto cosido dentro.',
      condition: 'Buen Estado',
      author: 'Andrés S.',
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-20'
    },
    {
      id: '3',
      category: 'ÚTILES',
      title: 'Set de escuadras y compás',
      modality: 'Donación',
      description: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
      condition: 'Como nuevo',
      author: 'Valentina P.',
      imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-09-28'
    },
    {
      id: '4',
      category: 'ROPA',
      title: 'Chaqueta impermeable',
      modality: 'Intercambio',
      tags: ['L', 'Mujer', 'Frío'],
      description: 'Chaqueta para lluvia con capucha. Cremallera funcionando, sin manchas. Busco a cambio botas talla 38.',
      condition: 'Buen Estado',
      author: 'Laura G.',
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-25'
    },
    {
      id: '5',
      category: 'LIBROS',
      title: 'Libros de lectura escolar',
      modality: 'Donación',
      description: 'Lote de 6 libros de plan lector de bachillerato. Algunas páginas subrayadas con lápiz.',
      condition: 'Usado',
      author: 'Camilo R.',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-11'
    },
    {
      id: '6',
      category: 'HOGAR',
      title: 'Lámpara de mesa',
      modality: 'Intercambio',
      description: 'Lámpara de escritorio con brazo ajustable. Funciona perfecto, se entrega sin bombillo.',
      condition: 'Como nuevo',
      author: 'Sofía T.',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-18'
    },
    {
      id: '7',
      category: 'ROPA',
      title: 'Tenis deportivos',
      modality: 'Donación',
      tags: ['40', 'Unisex'],
      description: 'Tenis para correr con suela en buen estado. Lavados y listos para usar.',
      condition: 'Buen Estado',
      author: 'Mateo C.',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-27'
    },
    {
      id: '8',
      category: 'ÚTILES',
      title: 'Morral escolar',
      modality: 'Donación',
      description: 'Morral con dos compartimientos y bolsillo lateral. Una correa tiene un pequeño descosido.',
      condition: 'Usado',
      author: 'Juliana H.',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-09-30'
    },
    {
      id: '9',
      category: 'MUEBLES',
      title: 'Repisa de madera',
      modality: 'Intercambio',
      description: 'Repisa de pino de tres niveles, fácil de desarmar. Busco a cambio una mesa de noche.',
      condition: 'Buen Estado',
      author: 'Felipe V.',
      imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-14'
    },
    {
      id: '10',
      category: 'HOGAR',
      title: 'Juego de ollas',
      modality: 'Donación',
      description: 'Tres ollas de aluminio con tapa. Tienen marcas de uso pero no están abolladas.',
      condition: 'Usado',
      author: 'Natalia B.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format&fit=crop&q=60',
      publishedAt: '2026-10-06'
    }
  ];

  const filters = filtersFromParams(searchParams);
  const filteredItems = applyFilters(items, filters);
  const filtering = hasActiveFilters(filters);

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
            <span className="metric-number">{items.length}</span>
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
            {filtering ? (
              <button type="button" className="catalog-link" onClick={() => navigate('/explorar')}>
                Ver todos los artículos
              </button>
            ) : (
              <a href="#ver-todos" className="catalog-link" onClick={(e) => e.preventDefault()}>
                Ver todos los artículos
              </a>
            )}
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