<<<<<<< HEAD
import { solicitar, ApiError } from './api';
import { estaAutenticado } from './authService';
import type { CarouselItem } from '../components/ItemCarousel';

export interface PostItem {
  id: string;
  category: string;
  title: string;
  details: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
  author?: string;
}

export interface NuevaPublicacionInput {
  title: string;
  category: string;
  condition: string;
  modality: 'Donación' | 'Intercambio';
  description: string;
  details?: string;
  imageUrl?: string;
  talla?: string;
  genero?: string;
  clima?: string;
  autorizaDonacion?: boolean;
  status?: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  tags?: string[];
  author?: string;
}

export const CATALOGO_FALLBACK: CarouselItem[] = [
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

/**
 * Obtiene las publicaciones desde MongoDB Atlas adaptadas para la vista 'Mis Publicaciones'.
 */
export async function obtenerMisPublicaciones(): Promise<PostItem[]> {
  try {
    const endpoint = estaAutenticado() ? '/publicaciones/mis-publicaciones' : '/publicaciones';
    const raw = await solicitar<any[]>(endpoint);
    return raw.map((item) => {
      const dias = item.createdAt
        ? Math.max(0, Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
        : (item.daysElapsed || 0);

      const estado = item.condition || item.estadoFisico || 'Buen Estado';
      const mod = item.modality || item.modalidad || 'Donación';
      const detailsGenerado = item.details || `${estado} · ${mod}`;

      return {
        id: String(item.id || item._id),
        category: String(item.category || item.categoria || 'ROPA').toUpperCase(),
        title: item.title || item.titulo || 'Artículo sin título',
        details: detailsGenerado,
        requests: typeof item.requests === 'number' ? item.requests : 0,
        status: (['Disponible', 'Reservado', 'Donado', 'Caducado'].includes(item.status)
          ? item.status
          : 'Disponible') as PostItem['status'],
        daysElapsed: dias,
        imageUrl: item.imageUrl || item.imagenUrl || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        author: item.author || 'Usuario de la comunidad',
      };
    });
  } catch (error) {
    throw error instanceof ApiError ? error : new ApiError(0, 'Error al obtener publicaciones desde el servidor.');
  }
}

/**
 * Obtiene todas las publicaciones de la comunidad desde MongoDB Atlas para supervisión/moderación (Admin).
 */
export async function obtenerTodasLasPublicaciones(): Promise<PostItem[]> {
  try {
    const raw = await solicitar<any[]>('/publicaciones');
    return raw.map((item) => {
      const dias = item.createdAt
        ? Math.max(0, Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
        : (item.daysElapsed || 0);

      const estado = item.condition || item.estadoFisico || 'Buen Estado';
      const mod = item.modality || item.modalidad || 'Donación';
      const detailsGenerado = item.details || `${estado} · ${mod}`;

      return {
        id: String(item.id || item._id),
        category: String(item.category || item.categoria || 'ROPA').toUpperCase(),
        title: item.title || item.titulo || 'Artículo sin título',
        details: detailsGenerado,
        requests: typeof item.requests === 'number' ? item.requests : 0,
        status: (['Disponible', 'Reservado', 'Donado', 'Caducado'].includes(item.status)
          ? item.status
          : 'Disponible') as PostItem['status'],
        daysElapsed: dias,
        imageUrl: item.imageUrl || item.imagenUrl || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        author: item.author || 'Usuario de la comunidad',
      };
    });
  } catch (error) {
    throw error instanceof ApiError ? error : new ApiError(0, 'Error al obtener inventario general desde el servidor.');
  }
}

/**
 * Obtiene los artículos para los carruseles y catálogos de Explorar desde MongoDB Atlas.
 */
export async function obtenerArticulosCatalogo(): Promise<CarouselItem[]> {
  try {
    const raw = await solicitar<any[]>('/publicaciones');
    if (raw && raw.length > 0) {
      return raw.map((item) => ({
        id: String(item.id || item._id),
        category: String(item.category || item.categoria || 'ROPA').toUpperCase(),
        title: item.title || item.titulo,
        modality: (String(item.modality || item.modalidad).toLowerCase().includes('inter')
          ? 'Intercambio'
          : 'Donación') as CarouselItem['modality'],
        description: item.description || item.descripcion || '',
        condition: item.condition || 'Buen Estado',
        author: item.author || 'Usuario de la comunidad',
        imageUrl: item.imageUrl || item.imagenUrl || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
        publishedAt: item.publishedAt || (item.createdAt ? item.createdAt.split('T')[0] : '2026-11-10'),
        tags: Array.isArray(item.tags) ? item.tags : [],
      }));
    }
  } catch (e) {
    console.warn('Error al cargar catálogo desde Atlas, usando respaldo local:', e);
  }
  return CATALOGO_FALLBACK;
}

/**
 * Publica un nuevo artículo y lo guarda directamente en MongoDB Atlas.
 */
export async function crearPublicacion(datos: NuevaPublicacionInput): Promise<PostItem> {
  const res = await solicitar<PostItem>('/publicaciones', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
  return res;
}

/**
 * Actualiza una publicación en MongoDB Atlas (ej. cambiar status a 'Donado').
 */
export async function actualizarPublicacion(
  id: string,
  cambios: Partial<NuevaPublicacionInput>
): Promise<PostItem> {
  const res = await solicitar<PostItem>(`/publicaciones/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cambios),
  });
  window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
  return res;
}

/**
 * Elimina una publicación en MongoDB Atlas (ej. moderación de administrador).
 */
export async function eliminarPublicacion(id: string): Promise<void> {
  await solicitar<void>(`/publicaciones/${id}`, {
    method: 'DELETE',
  });
}

=======
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
  expirationDays?: number;
  imageUrl?: string;
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
    expirationDays: publicacion.expirationDays,
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
    imageUrl: publicacion.imageUrl
      ? resolverUrlImagen(publicacion.imageUrl)
      : publicacion.imageUrls?.[0]
        ? resolverUrlImagen(publicacion.imageUrls[0])
        : '',
  }));
}

export async function crearPublicacion(datos: CrearPublicacion): Promise<Articulo> {
  const publicacion = await solicitar<PublicacionApi>('/publicaciones', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  return mapearPublicacion(publicacion);
}
>>>>>>> Luisa
