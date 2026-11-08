import React from 'react';
import estrellaLlena from '../assets/starratingllena.svg';
import estrellaVacia from '../assets/starratingvacia.svg';
import './StarRating.css';

interface StarRatingProps {
  rating: number; // Número de 0 a 5
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Asegurarnos de que el rating esté entre 0 y 5
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="star-rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <img 
          key={star}
          src={star <= normalizedRating ? estrellaLlena : estrellaVacia} 
          alt={star <= normalizedRating ? "Estrella llena" : "Estrella vacía"}
          className="star-icon"
        />
      ))}
    </div>
  );
};