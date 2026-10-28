export const CATEGORIAS_PRENDA = [
  'Camisetas',
  'Chaquetas',
  'Pantalones',
  'Calzado',
  'Accesorios',
  'Otros',
] as const;

export type CategoriaPrenda = (typeof CATEGORIAS_PRENDA)[number];

export const TALLAS_PRENDA = ['XS', 'S', 'M', 'L', 'XL', 'Única'] as const;
export type TallaPrenda = (typeof TALLAS_PRENDA)[number];

export const MODALIDADES = ['DONACIÓN', 'INTERCAMBIO'] as const;
export type ModalidadPublicacion = (typeof MODALIDADES)[number];

export type EstadoPublicacion = 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';

export const DIAS_CADUCIDAD_MAX = 30;
export const DIAS_ALERTA_CADUCIDAD = 25;

export interface Publicacion {
  id: string;
  codigo: string;
  category: string;
  categoriaPrenda: CategoriaPrenda;
  modalidad: ModalidadPublicacion;
  title: string;
  talla: TallaPrenda;
  estadoFisico: string;
  ubicacion: string;
  details: string;
  requests: number;
  status: EstadoPublicacion;
  daysElapsed: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicacionDatos = Omit<
  Publicacion,
  'id' | 'requests' | 'daysElapsed' | 'createdAt' | 'updatedAt'
>;

export interface Solicitud {
  id: string;
  type: ModalidadPublicacion;
  author: string;
  title: string;
  message: string;
  date: string;
  status: 'Pendiente' | 'Aceptado' | 'Donado' | 'Rechazado';
  daysRemaining?: number;
  isFavorite?: boolean;
}

