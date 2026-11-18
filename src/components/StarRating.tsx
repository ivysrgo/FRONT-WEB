import React from 'react';
<<<<<<< HEAD
=======
import estrellaLlena from '../assets/starratingllena.svg';
import estrellaVacia from '../assets/starratingvacia.svg';
>>>>>>> Luisa
import './StarRating.css';

interface StarRatingProps {
  rating: number;
<<<<<<< HEAD
  max?: number;
  size?: number;
}

const STAR_PATH =
  'M12 2.8l2.84 5.76 6.36.92-4.6 4.49 1.08 6.33L12 17.31l-5.68 2.99 1.08-6.33-4.6-4.49 6.36-.92L12 2.8Z';

export const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 22 }) => {
  const filled = Math.round(rating);

  return (
    <div className="star-rating" role="img" aria-label={`Calificación ${rating.toFixed(1)} de ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={index < filled ? 'star star-filled' : 'star star-empty'}
          aria-hidden="true"
        >
          <path d={STAR_PATH} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
};
=======
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 20 }) => {
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
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
};
>>>>>>> Luisa
