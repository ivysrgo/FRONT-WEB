import { solicitar } from './api';
import { estaAutenticado } from './authService';

export interface NotificacionDTO {
  id: string;
  title: string;
  message: string;
  type: 'intercambio' | 'donacion' | 'solicitud' | 'caducar' | 'sistema';
  read: boolean;
  referenciaId?: string;
  link?: string;
  createdAt?: string;
}

export interface ConteoNoLeidasResponse {
  count: number;
  hasUnread: boolean;
}

/**
 * Obtiene la lista de notificaciones del usuario autenticado desde MongoDB Atlas.
 */
export async function obtenerNotificaciones(): Promise<NotificacionDTO[]> {
  if (!estaAutenticado()) return [];
  try {
    return await solicitar<NotificacionDTO[]>('/notificaciones');
  } catch (err) {
    console.warn('No se pudieron obtener notificaciones:', err);
    return [];
  }
}

/**
 * Consulta el conteo de notificaciones no leídas para activar o desactivar la campanita.
 */
export async function obtenerConteoNoLeidas(): Promise<ConteoNoLeidasResponse> {
  if (!estaAutenticado()) {
    return { count: 0, hasUnread: false };
  }
  try {
    return await solicitar<ConteoNoLeidasResponse>('/notificaciones/no-leidas');
  } catch (err) {
    console.warn('No se pudo obtener el conteo de notificaciones no leídas:', err);
    return { count: 0, hasUnread: false };
  }
}

/**
 * Marca una notificación puntual como leída.
 */
export async function marcarComoLeida(id: string): Promise<NotificacionDTO | null> {
  if (!estaAutenticado()) return null;
  try {
    const res = await solicitar<NotificacionDTO>(`/notificaciones/${id}/leida`, {
      method: 'PATCH',
    });
    window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
    return res;
  } catch (err) {
    console.error('Error al marcar notificación como leída:', err);
    return null;
  }
}

/**
 * Marca todas las notificaciones del usuario como leídas.
 */
export async function marcarTodasComoLeidas(): Promise<{ mensaje: string } | null> {
  if (!estaAutenticado()) return null;
  try {
    const res = await solicitar<{ mensaje: string }>('/notificaciones/leer-todas', {
      method: 'PATCH',
    });
    window.dispatchEvent(new CustomEvent('notificaciones-actualizadas'));
    return res;
  } catch (err) {
    console.error('Error al marcar todas como leídas:', err);
    return null;
  }
}
