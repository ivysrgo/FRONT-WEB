import { solicitar } from './api';

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
