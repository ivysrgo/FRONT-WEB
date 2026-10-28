import type {
  EstadoPublicacion,
  Publicacion,
  PublicacionDatos,
  Solicitud,
} from '../types/unidona';
import { solicitar } from './api';

const RUTA_PUBLICACIONES = '/publicaciones';
const RUTA_SOLICITUDES = '/solicitudes';

export async function obtenerPublicacionesDemo(): Promise<Publicacion[]> {
  await new Promise((resolver) => setTimeout(resolver, 700));
  const respuesta = await fetch('/publicaciones-demo.json');
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: no se pudieron cargar las publicaciones.`);
  }
  return respuesta.json();
}

export async function obtenerSolicitudesDemo(): Promise<Solicitud[]> {
  await new Promise((resolver) => setTimeout(resolver, 600));
  const respuesta = await fetch('/solicitudes-demo.json');
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: no se pudieron cargar las solicitudes.`);
  }
  return respuesta.json();
}

export function obtenerPublicaciones(): Promise<Publicacion[]> {
  return solicitar<Publicacion[]>(RUTA_PUBLICACIONES);
}

export function obtenerPublicacionPorId(id: string): Promise<Publicacion> {
  return solicitar<Publicacion>(`${RUTA_PUBLICACIONES}/${id}`);
}

export function crearPublicacion(datos: PublicacionDatos): Promise<Publicacion> {
  return solicitar<Publicacion>(RUTA_PUBLICACIONES, {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function actualizarPublicacion(
  id: string,
  datos: PublicacionDatos,
): Promise<Publicacion> {
  return solicitar<Publicacion>(`${RUTA_PUBLICACIONES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
  });
}

export function cambiarEstadoPublicacion(
  id: string,
  status: EstadoPublicacion,
): Promise<Publicacion> {
  return solicitar<Publicacion>(`${RUTA_PUBLICACIONES}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function eliminarPublicacionPorId(id: string): Promise<void> {
  return solicitar<void>(`${RUTA_PUBLICACIONES}/${id}`, {
    method: 'DELETE',
  });
}

export function actualizarEstadoSolicitud(
  id: string,
  status: Solicitud['status'],
): Promise<Solicitud> {
  return solicitar<Solicitud>(`${RUTA_SOLICITUDES}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

