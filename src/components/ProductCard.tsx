import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  condition: string;
  author: string;
  imageUrl: string;
  isFavorite?: boolean;
  favoritePending?: boolean;
  onToggleFavorite?: (id: string) => void;
  isNew?: boolean; // Para la etiqueta "Reciente" (Opcional, según lógica de fecha)
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  category,
  title,
  modality,
  tags,
  description,
  condition,
  author,
  imageUrl,
  isFavorite = false,
  favoritePending = false,
  onToggleFavorite,
  isNew = false,
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const detailPath = isAdmin ? `/admin/articulo/${id}` : `/articulo/${id}`;

  // Truco para limitar la descripción a unas 2-3 líneas (ej. 100 caracteres)
  const descCorta = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;

  return (
    <article className="product-card">
      <div
        className="product-image-container"
        onClick={() => navigate(detailPath)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate(detailPath);
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={`Ver detalle de ${title}`}
        style={{ cursor: 'pointer' }}
      >
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
          {!isAdmin && (
            <button
              type="button"
              className="btn-favorite"
              onClick={() => onToggleFavorite?.(id)}
              disabled={favoritePending}
              aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
            <img
              src={isFavorite ? starLlena : starVacia}
              alt="Favorito" 
              className="star-fav-icon"
            />
            </button>
          )}
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