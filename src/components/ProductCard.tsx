import React, { useState } from 'react';
import './ProductCard.css';

// Importar los SVGs de favoritos que creaste
import starVacia from '../assets/starfavoritevacia.svg';
import starLlena from '../assets/starfavoritellena.svg';

interface ProductCardProps {
  id: string;
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  tags?: string[];
  description: string;
  condition: 'Nuevo' | 'Usado' | 'Buen Estado' | 'Como nuevo'; // Tipos de estado
  author: string;
  imageUrl: string;
  isNew?: boolean; // Para la etiqueta "Reciente" (Opcional, según lógica de fecha)
}

export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  title,
  modality,
  tags,
  description,
  condition,
  author,
  imageUrl,
  isNew = false
}) => {
  // Estado local para manejar si está en favoritos o no
  const [esFavorito, setEsFavorito] = useState(false);

  // Truco para limitar la descripción a unas 2-3 líneas (ej. 100 caracteres)
  const descCorta = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={title} className="product-image" />
        
        {/* Etiqueta flotante superior izquierda (Reciente) */}
        {isNew && <span className="tag-new">Reciente</span>}

        {/* Etiqueta flotante superior derecha (Modalidad) */}
        <span className={`tag-modality ${modality === 'Donación' ? 'bg-cyan' : 'bg-orange'}`}>
          {modality}
        </span>
      </div>

      <div className="product-content">
        <span className="product-category">{category}</span>
        
        <div className="product-title-row">
          <h3 className="product-title">{title}</h3>
          <button 
            className="btn-favorite" 
            onClick={() => setEsFavorito(!esFavorito)}
            aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <img 
              src={esFavorito ? starLlena : starVacia} 
              alt="Favorito" 
              className="star-fav-icon"
            />
          </button>
        </div>

        {/* Etiquetas de Ropa (Talla, Género, Clima) si existen */}
        {tags && tags.length > 0 && (
          <div className="product-tags">
            {tags.map((tag, index) => (
              <span key={index} className="pill-tag">{tag}</span>
            ))}
          </div>
        )}

        <p className="product-description">{descCorta}</p>

        <div className="product-footer">
          <span className="product-condition">{condition}</span>
          <span className="product-author">{author}</span>
        </div>
      </div>
    </article>
  );
};