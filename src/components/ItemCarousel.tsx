import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ItemCarousel.css';

export interface CarouselItem {
  id: string;
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  tags?: string[];
  description: string;
  condition: string;
  author: string;
  imageUrl?: string;
  publishedAt?: string; // Fecha ISO (AAAA-MM-DD)
}

interface ItemCarouselProps {
  items: CarouselItem[];
  autoPlayMs?: number;
}

// Distancia mínima (px) de arrastre para cambiar de tarjeta
const SWIPE_THRESHOLD = 50;

export const ItemCarousel: React.FC<ItemCarouselProps> = ({ items, autoPlayMs = 3500 }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const dragStartX = useRef<number | null>(null);
  const total = items.length;

  const goTo = useCallback((index: number) => {
    setActive(((index % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Avance automático (se pausa con hover/foco/arrastre y si el usuario prefiere menos movimiento)
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduceMotion || total < 2) return;
    const timer = window.setTimeout(next, autoPlayMs);
    return () => window.clearTimeout(timer);
  }, [paused, next, autoPlayMs, total]);

  // Posición relativa de cada tarjeta respecto a la activa, de forma circular (-2, -1, 0, 1, 2...)
  const getOffset = (index: number) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setPaused(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta <= -SWIPE_THRESHOLD) next();
    else if (delta >= SWIPE_THRESHOLD) prev();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Artículos disponibles"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button className="carousel-arrow carousel-arrow-prev" onClick={prev} aria-label="Artículo anterior">
        ‹
      </button>

      <div
        className="carousel-stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { dragStartX.current = null; }}
      >
        {items.map((item, index) => {
          const offset = getOffset(index);
          const distance = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <article
              key={item.id}
              className={`carousel-card ${isActive ? 'is-active' : ''}`}
              data-distance={Math.min(distance, 3)}
              style={{ '--offset': offset } as React.CSSProperties}
              aria-hidden={!isActive}
              onClick={() => !isActive && goTo(index)}
            >
              <div className="carousel-card-image">
                <span className={`carousel-badge ${item.modality === 'Donación' ? 'badge-donacion' : 'badge-intercambio'}`}>
                  {item.modality}
                </span>
                {item.imageUrl && !brokenImages[item.id] ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    draggable={false}
                    onError={() => setBrokenImages((prev) => ({ ...prev, [item.id]: true }))}
                  />
                ) : (
                  <div className="carousel-card-placeholder">Sin imagen</div>
                )}
              </div>

              <div className="carousel-card-body">
                <span className="carousel-category">{item.category}</span>
                <h3 className="carousel-title">{item.title}</h3>

                {item.tags && item.tags.length > 0 && (
                  <div className="carousel-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="carousel-tag">{tag}</span>
                    ))}
                  </div>
                )}

                <p className="carousel-description">{item.description}</p>

                <div className="carousel-card-footer">
                  <span>{item.condition}</span>
                  <span>{item.author}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button className="carousel-arrow carousel-arrow-next" onClick={next} aria-label="Artículo siguiente">
        ›
      </button>

      <div className="carousel-dots">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`carousel-dot ${index === active ? 'is-active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ir al artículo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
