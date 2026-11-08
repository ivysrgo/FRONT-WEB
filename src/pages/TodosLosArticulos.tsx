import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import './TodosLosArticulos.css';

interface ArticleItem {
  id: string;
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  description: string;
  condition: 'Nuevo' | 'Usado' | 'Buen Estado' | 'Como nuevo';
  author: string;
  imageUrl: string;
  publishedAt: string;
  tags?: string[];
}

const items: ArticleItem[] = [
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

export const TodosLosArticulos: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentFilters = useMemo(
    () => filtersFromParams(searchParams),
    [searchParams]
  );
  const itemsFiltrados = useMemo(
    () => applyFilters(items, currentFilters),
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