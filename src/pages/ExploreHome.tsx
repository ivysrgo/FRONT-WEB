import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { ApiError, displayCategory, getImageUrl, publicacionesApi } from '../services/publicacionesApi';
import type { Publication } from '../services/publicacionesApi';
import './ExploreHome.css';

export const ExploreHome: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<{ items: Publication[]; error?: string } | null>(null);

  useEffect(() => {
    publicacionesApi.list({ categoria: 'Todas' })
      .then((items) => setResult({ items }))
      .catch((requestError: unknown) => {
        const error = requestError instanceof ApiError ? requestError.message : 'No se pudieron cargar los artículos.';
        setResult({ items: [], error });
      });
  }, []);
  const items = result?.items ?? [];
  const error = result?.error;

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
          {/* Tarjeta 1: Fondo Azul 85DAFF */}
          <div className="metric-card metric-blue">
            <span className="metric-number">{items.filter((item) => item.status === 'Disponible').length}</span>
            <span className="metric-label">Artículos<br />Disponibles</span>
          </div>

          {/* Tarjeta 2: Fondo Blanco y Número Naranja */}
          <div className="metric-card metric-light">
            <span className="metric-number orange-text">128</span>
            <span className="metric-label">Intercambios<br />Locales</span>
          </div>

          {/* Tarjeta 3: Fondo Blanco, Número Naranja y texto Unidona */}
          <div className="metric-card metric-light">
            <span className="metric-number orange-text">41</span>
            <span className="metric-label">Escalados a<br />Unidona</span>
          </div>
        </section>

        {/* Banner de Impacto Ambiental */}
        <div className="impact-banner">
          <h2>340KG DE RESIDUOS EVITADOS</h2>
        </div>

        {/* Catálogo */}
        <section className="catalog-section">
          <div className="catalog-header">
            <p className="catalog-count">{items.length} artículos encontrados</p>
            <Link to="/buscar" className="catalog-link">
              Ver todos los artículos
            </Link>
          </div>

          {error && <p role="alert">{error}</p>}
          {result === null && <p role="status">Cargando artículos…</p>}
          {!error && result !== null && items.length === 0 && <p>No hay artículos disponibles por el momento.</p>}
          <div className="catalog-grid">
            {items.map((item) => (
              <article key={item.id} className="item-card">
                <div className="card-image-wrapper">
                  <span className={`modality-badge ${item.modality === 'Donación' ? 'badge-donation' : 'badge-exchange'}`}>
                    {item.modality}
                  </span>
                  <Link to={`/productos/${item.id}`} aria-label={`Ver ${item.title}`}>
                    <img src={getImageUrl(item.imageUrl)} alt="" className="card-image" />
                  </Link>
                </div>

                <div className="card-body">
                  <span className="item-category">{displayCategory(item.category)}</span>
                  <h3 className="item-title"><Link to={`/productos/${item.id}`}>{item.title}</Link></h3>

                  {item.tags && item.tags.length > 0 && (
                    <div className="item-tags-row">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="item-tag-chip">{tag}</span>
                      ))}
                    </div>
                  )}

                  <p className="item-description">{item.description}</p>

                  <div className="card-footer">
                    <span className="item-condition">{item.condition}</span>
                    <span className="item-author">{item.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};