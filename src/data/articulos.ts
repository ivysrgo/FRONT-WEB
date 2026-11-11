import { useSyncExternalStore } from 'react';

export interface Articulo {
  id: string;
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  description: string;
  condition: 'Nuevo' | 'Usado' | 'Buen Estado' | 'Como nuevo';
  author: string;
  imageUrl: string;
  publishedAt: string;
  daysElapsed: number;
  expirationDays?: number;
  tags?: string[];
}

export const articulosMock: Articulo[] = [
  {
    id: '1',
    category: 'MUEBLES',
    title: 'Silla de escritorio',
    modality: 'Intercambio',
    description: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
    condition: 'Usado',
    author: 'Diego M.',
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60',
    publishedAt: '2026-10-02',
    daysElapsed: 30
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
    publishedAt: '2026-10-20',
    daysElapsed: 16
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
    publishedAt: '2026-09-28',
    daysElapsed: 30
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
    publishedAt: '2026-10-25',
    daysElapsed: 14
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
    publishedAt: '2026-10-11',
    daysElapsed: 28
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
    publishedAt: '2026-10-18',
    daysElapsed: 21
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
    publishedAt: '2026-10-27',
    daysElapsed: 12
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
    publishedAt: '2026-09-30',
    daysElapsed: 30
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
    publishedAt: '2026-10-14',
    daysElapsed: 25
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
    publishedAt: '2026-10-06',
    daysElapsed: 30
  }
];

let articulosActuales = articulosMock;
const listeners = new Set<() => void>();

const subscribeToArticulos = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getArticulosSnapshot = () => articulosActuales;

const notifyArticulosChanged = () => {
  listeners.forEach((listener) => listener());
};

export const useArticulos = () =>
  useSyncExternalStore(subscribeToArticulos, getArticulosSnapshot, getArticulosSnapshot);

export const addDaysToExpiration = (id: string, daysToAdd: number) => {
  if (!Number.isInteger(daysToAdd) || daysToAdd <= 0) {
    throw new Error('Los días que se agregan a la caducidad deben ser un entero positivo.');
  }

  const articulo = articulosActuales.find((item) => item.id === id);
  if (!articulo) {
    throw new Error(`No se encontró el artículo con ID ${id}.`);
  }

  articulosActuales = articulosActuales.map((item) =>
    item.id === id
      ? { ...item, expirationDays: (item.expirationDays ?? 30) + daysToAdd }
      : item
  );
  notifyArticulosChanged();
};

export const removeArticulo = (id: string) => {
  if (!articulosActuales.some((item) => item.id === id)) {
    throw new Error(`No se encontró el artículo con ID ${id}.`);
  }

  articulosActuales = articulosActuales.filter((item) => item.id !== id);
  notifyArticulosChanged();
};
