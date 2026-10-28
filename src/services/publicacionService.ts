import { solicitar } from './api';
import type { PostItem } from '../pages/Publicaciones';

/**
 * Servicio para manejar el CRUD de publicaciones.
 * Cuando el backend esté listo, cambiaremos esta ruta a '/publicaciones'.
 */
export async function obtenerMisPublicaciones(): Promise<PostItem[]> {
  return solicitar<PostItem[]>('/publicaciones-demo.json', {
  });
}