import { solicitar } from './api';

<<<<<<< HEAD
export interface SolicitudDTO {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO' | string;
  title: string;
  author: string;
  message: string;
  date: string;
  status: 'Pendiente' | 'Aceptado' | 'Donado' | 'Rechazado';
  esFavorito?: boolean;
  isFavorite?: boolean;
  daysRemaining?: number;
}

export async function obtenerSolicitudes(filtros: {
  status?: string;
  esFavorito?: boolean;
  tipo?: string;
} = {}): Promise<SolicitudDTO[]> {
  const params = new URLSearchParams();
  if (filtros.status) params.set('status', filtros.status);
  if (filtros.esFavorito !== undefined) params.set('esFavorito', String(filtros.esFavorito));
  if (filtros.tipo) params.set('tipo', filtros.tipo);

  const query = params.toString();
  return solicitar<SolicitudDTO[]>(`/solicitudes${query ? `?${query}` : ''}`);
}

export async function actualizarSolicitud(
  id: string,
  cambios: { status?: 'Pendiente' | 'Aceptado' | 'Donado' | 'Rechazado'; esFavorito?: boolean; message?: string }
): Promise<SolicitudDTO> {
  const res = await solicitar<SolicitudDTO>(`/solicitudes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cambios),
  });
  window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
  return res;
}

export async function crearSolicitud(datos: {
  title: string;
  message: string;
  type?: 'DONACIÓN' | 'INTERCAMBIO';
  author?: string;
  articuloId?: string;
}): Promise<SolicitudDTO> {
  const res = await solicitar<SolicitudDTO>('/solicitudes', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
  return res;
}

=======
export type TipoSolicitud = 'DONACIÓN' | 'INTERCAMBIO';
export type EstadoSolicitud = 'Pendiente' | 'Aceptado' | 'Donado' | 'Rechazado' | 'Cancelado';

export interface SolicitudItem {
  id: string;
  type: TipoSolicitud;
  title: string;
  message: string;
  author: string;
  date: string;
  status: EstadoSolicitud;
  articuloId: string;
  articuloOfrecidoId?: string;
  solicitanteId: string;
  destinatarioId: string;
  calificacion?: number | null;
}

export interface MisSolicitudes {
  enviadas: SolicitudItem[];
  recibidas: SolicitudItem[];
  historial: SolicitudItem[];
  favoritos: number;
}

export interface CrearSolicitud {
  type: TipoSolicitud;
  title: string;
  message: string;
  articuloId: string;
  articuloOfrecidoId?: string;
}

export async function obtenerMisSolicitudes(): Promise<MisSolicitudes> {
  return solicitar<MisSolicitudes>('/solicitudes/mias');
}

export async function crearSolicitud(datos: CrearSolicitud): Promise<SolicitudItem> {
  return solicitar<SolicitudItem>('/solicitudes', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export async function actualizarEstadoSolicitud(
  id: string,
  status: Extract<EstadoSolicitud, 'Aceptado' | 'Donado' | 'Rechazado' | 'Cancelado'>
): Promise<SolicitudItem> {
  return solicitar<SolicitudItem>(`/solicitudes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function confirmarIntercambio(
  id: string,
  calificacion: number
): Promise<SolicitudItem> {
  return solicitar<SolicitudItem>(`/solicitudes/${id}/confirmar-intercambio`, {
    method: 'POST',
    body: JSON.stringify({ calificacion }),
  });
}
>>>>>>> Luisa
