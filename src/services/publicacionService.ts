import { ApiError } from './api';
import type { PostItem } from '../pages/Publicaciones';

/**
 * Servicio para manejar el CRUD de publicaciones.
 * Carga el inventario de demostración servido por el frontend.
 */
export async function obtenerMisPublicaciones(): Promise<PostItem[]> {
  let respuesta: Response;

  try {
    respuesta = await fetch('/publicaciones-demo.json');
  } catch {
    throw new ApiError(0, 'No se pudo cargar el inventario de publicaciones.');
  }

  if (!respuesta.ok) {
    throw new ApiError(
      respuesta.status,
      'No se pudo obtener el inventario de publicaciones.'
    );
  }

  return respuesta.json() as Promise<PostItem[]>;
}