import { API_URL, solicitar } from './api';
import type { PostItem } from '../pages/Publicaciones';
import type { Articulo } from '../data/articulos';

interface PublicacionApi {
  id: string;
  title: string;
  category: string;
  modality: string;
  condition: string;
  description: string;
  details: string;
  requests: number;
  status: PostItem['status'];
  daysElapsed: number;
  imageUrl: string;
  imageUrls?: string[];
  author: string;
  publishedAt: string;
  createdAt?: string;
  tags?: string[];
  talla?: string;
  genero?: string;
  clima?: string;
}

export interface CrearPublicacion {
  title: string;
  category: string;
  modality: 'Donación' | 'Intercambio';
  condition: string;
  description: string;
  talla?: string;
  genero?: string;
  clima?: string;
  autorizaDonacion: boolean;
  images: string[];
}

function resolverUrlImagen(url: string): string {
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  return new URL(url, API_URL).toString();
}

function diasDesde(fecha?: string): number {
  if (!fecha) return 0;
  const fechaPublicacion = new Date(fecha);
  if (Number.isNaN(fechaPublicacion.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - fechaPublicacion.getTime()) / 86_400_000));
}

function mapearPublicacion(publicacion: PublicacionApi): Articulo {
  const imageUrls = publicacion.imageUrls?.length
    ? publicacion.imageUrls.map(resolverUrlImagen)
    : publicacion.imageUrl
      ? [resolverUrlImagen(publicacion.imageUrl)]
      : [];
  return {
    id: publicacion.id,
    category: publicacion.category,
    title: publicacion.title,
    modality: publicacion.modality.toLowerCase().includes('inter')
      ? 'Intercambio'
      : 'Donación',
    description: publicacion.description,
    condition: publicacion.condition,
    author: publicacion.author,
    imageUrl: imageUrls[0] ?? '',
    imageUrls,
    publishedAt: publicacion.publishedAt || publicacion.createdAt || '',
    daysElapsed: publicacion.daysElapsed ?? diasDesde(publicacion.publishedAt || publicacion.createdAt),
    tags: publicacion.tags?.length
      ? publicacion.tags
      : [publicacion.talla, publicacion.genero, publicacion.clima].filter(
          (tag): tag is string => Boolean(tag)
        ),
  };
}

export async function obtenerPublicaciones(): Promise<Articulo[]> {
  const publicaciones = await solicitar<PublicacionApi[]>('/publicaciones');
  return publicaciones.map(mapearPublicacion);
}

export async function obtenerMisPublicaciones(): Promise<PostItem[]> {
  const publicaciones = await solicitar<PublicacionApi[]>('/publicaciones/mis-publicaciones');
  return publicaciones.map((publicacion) => ({
    id: publicacion.id,
    category: publicacion.category,
    title: publicacion.title,
    details: publicacion.details || publicacion.description,
    requests: publicacion.requests,
    status: publicacion.status,
    daysElapsed: publicacion.daysElapsed ?? diasDesde(publicacion.publishedAt || publicacion.createdAt),
    imageUrl: publicacion.imageUrl ? resolverUrlImagen(publicacion.imageUrl) : '',
  }));
}

export async function crearPublicacion(datos: CrearPublicacion): Promise<Articulo> {
  const publicacion = await solicitar<PublicacionApi>('/publicaciones', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  return mapearPublicacion(publicacion);
}