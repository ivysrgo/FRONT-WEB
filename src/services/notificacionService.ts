import { solicitar } from './api';

export type TipoNotificacion = 'intercambio' | 'caducar' | 'respuesta' | 'reporte';

export interface NotificacionItem {
  id: string;
  type: TipoNotificacion;
  title: string;
  details: string[];
  path: string;
}

// Notificaciones del usuario autenticado, calculadas en el backend con sus publicaciones y solicitudes
export function obtenerMisNotificaciones(): Promise<NotificacionItem[]> {
  return solicitar<NotificacionItem[]>('/notificaciones');
}
