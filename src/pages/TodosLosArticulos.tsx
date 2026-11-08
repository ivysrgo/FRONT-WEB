import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { articulosMock } from '../data/articulos';
import './TodosLosArticulos.css';

export const TodosLosArticulos: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentFilters = useMemo(
    () => filtersFromParams(searchParams),
    [searchParams]
  );
  const itemsFiltrados = useMemo(
    () => applyFilters(articulosMock, currentFilters),
    [currentFilters]
  );

  return (
    <div className="todos-layout">
      <Navbar />

      <main className="todos-content">
        <header className="todos-header">
          <h2 className="todos-title">
            {itemsFiltrados.length} {itemsFiltrados.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
          </h2>
          <button 
            className="btn-publicar-negro"
            onClick={() => navigate('/publicar')}
          >
            Publicar Artículo
          </button>
        </header>

        {itemsFiltrados.length === 0 ? (
          <div className="catalog-empty">
            <p className="catalog-empty-title">No encontramos artículos que coincidan con tu búsqueda.</p>
            <p className="catalog-empty-text">Intenta quitando algunos filtros desde la lupa.</p>
          </div>
        ) : (
          <section className="products-grid">
            {itemsFiltrados.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                category={item.category}
                title={item.title}
                modality={item.modality}
                tags={item.tags}
                description={item.description}
                condition={item.condition}
                author={item.author}
                imageUrl={item.imageUrl}
                isNew={index < 3}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};