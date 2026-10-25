import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import './ExploreHome.css';

interface ItemCard {
  id: string;
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  tags?: string[];
  description: string;
  condition: string;
  author: string;
  imageUrl?: string;
}

export const ExploreHome: React.FC = () => {
  const navigate = useNavigate();

  const items: ItemCard[] = [
    {
      id: '1',
      category: 'MUEBLES',
      title: 'Silla de escritorio',
      modality: 'Donación',
      description: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busca a cambio...',
      condition: 'Usado',
      author: 'Diego L.',
      imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328ad4f4f72?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      category: 'ROPA',
      title: 'Camisas de trabajo (x3)',
      modality: 'Intercambio',
      tags: ['M', 'Hombre', 'Cálido'],
      description: 'Algodón liviano, manga corta. Cuellos en buen estado, una tiene un botón de repuesto cosido dentro.',
      condition: 'Buen Estado',
      author: 'Andrés S.',
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      category: 'ÚTILES',
      title: 'Set de escuadras y compás',
      modality: 'Donación',
      description: 'Set de dibujo técnico casi sin uso. Dos escuadras, transportador, compás...',
      condition: 'Como nuevo',
      author: 'Valentina P.',
      imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60'
    }
  ];

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
            <span className="metric-number">10</span>
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
            <p className="catalog-count">10 artículos encontrados</p>
            <a href="#ver-todos" className="catalog-link" onClick={(e) => e.preventDefault()}>
              Ver todos los artículos
            </a>
          </div>

          <div className="catalog-grid">
            {items.map((item) => (
              <article key={item.id} className="item-card">
                <div className="card-image-wrapper">
                  <span className={`modality-badge ${item.modality === 'Donación' ? 'badge-donation' : 'badge-exchange'}`}>
                    {item.modality}
                  </span>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="card-image" />
                  ) : (
                    <div className="card-image-placeholder">Sin imagen</div>
                  )}
                </div>

                <div className="card-body">
                  <span className="item-category">{item.category}</span>
                  <h3 className="item-title">{item.title}</h3>

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