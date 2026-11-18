import { solicitar } from './api';

export interface PublicacionReportada {
  title: string;
  modality: string;
  category: string;
  condition: string;
  description: string;
  author: string;
  imageUrl: string;
  tags: string[];
}

export type EstadoReporte = 'Pendiente' | 'Eliminada' | 'Ignorado';

export interface ReporteResumen {
  id: string;
  estado: EstadoReporte;
  motivo: string;
  createdAt: string;
  resueltoEn: string | null;
  publicacionId: string | null;
  reportadoId: string | null;
  publicacion: PublicacionReportada;
}

export interface ReporteDetalle extends ReporteResumen {
  descripcion: string;
  reportante: { id: string; nombre: string } | null;
  reportado: {
    id: string | null;
    nombre: string;
    publicacionesActivas: number | null;
    reportesPrevios: number | null;
    activoDesde: string | null;
  };
  publicacionExiste: boolean;
  publicacionActual: { daysElapsed: number; expirationDays: number; status: string } | null;
}

export interface UsuarioAdmin {
  id: string;
  nombre: string;
  correo: string;
  role: 'admin' | 'user';
  phone: string;
  rating: number;
  ratingCount: number;
  suspendido: boolean;
  suspendidoEn: string | null;
  createdAt: string;
}

export interface PublicacionDeUsuario {
  id: string;
  title: string;
  category: string;
  modality: string;
  condition: string;
  description: string;
  details?: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  expirationDays?: number;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface UsuarioAdminDetalle extends UsuarioAdmin {
  reportesRecibidos: number;
  publicacionesActivas: number;
  publicaciones: PublicacionDeUsuario[];
}

export interface DonacionAdmin {
  id: string;
  articuloId: string | null;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  title: string;
  author: string;
  category: string;
  description: string;
  fecha: string;
}

export const tipoDeModalidad = (modalidad: string): 'DONACIÓN' | 'INTERCAMBIO' =>
  modalidad.toUpperCase().includes('INTER') ? 'INTERCAMBIO' : 'DONACIÓN';

// "12 de octubre de 2026" → "Octubre 12 del 2026", como en el diseño.
export function formatearFechaLarga(fecha: string | null | undefined): string {
  if (!fecha) return 'Sin fecha';
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return 'Sin fecha';
  const mes = valor.toLocaleDateString('es-CO', { month: 'long' });
  return `${mes.charAt(0).toUpperCase()}${mes.slice(1)} ${valor.getDate()} del ${valor.getFullYear()}`;
}

export function formatearHora(fecha: string | null | undefined): string {
  if (!fecha) return '';
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return '';
  return valor.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// --- Reportes ---
export function reportarPublicacion(publicacionId: string, motivo: string, descripcion = '') {
  return solicitar<ReporteResumen>('/reportes', {
    method: 'POST',
    body: JSON.stringify({ publicacionId, motivo, descripcion }),
  });
}

export function listarReportes(tipo: 'pendientes' | 'historial' = 'pendientes') {
  return solicitar<ReporteResumen[]>(`/reportes?tipo=${tipo}`);
}

export function obtenerReporte(id: string) {
  return solicitar<ReporteDetalle>(`/reportes/${encodeURIComponent(id)}`);
}

export function ignorarReporte(id: string) {
  return solicitar<ReporteResumen>(`/reportes/${encodeURIComponent(id)}/ignorar`, { method: 'PATCH' });
}

export function eliminarPublicacionReportada(id: string) {
  return solicitar<ReporteResumen>(`/reportes/${encodeURIComponent(id)}/eliminar-publicacion`, {
    method: 'PATCH',
  });
}

// --- Usuarios ---
export function listarUsuarios() {
  return solicitar<UsuarioAdmin[]>('/admin/usuarios');
}

export function obtenerUsuario(id: string) {
  return solicitar<UsuarioAdminDetalle>(`/admin/usuarios/${encodeURIComponent(id)}`);
}

export function cambiarSuspension(id: string, suspendido: boolean) {
  return solicitar<UsuarioAdmin>(`/admin/usuarios/${encodeURIComponent(id)}/suspension`, {
    method: 'PATCH',
    body: JSON.stringify({ suspendido }),
  });
}

// --- Donaciones ---
export function listarDonaciones(filtros: { desde?: string; hasta?: string } = {}) {
  const params = new URLSearchParams();
  if (filtros.desde) params.set('desde', filtros.desde);
  if (filtros.hasta) params.set('hasta', filtros.hasta);
  const query = params.toString();
  return solicitar<DonacionAdmin[]>(`/admin/donaciones${query ? `?${query}` : ''}`);
}

// --- Publicaciones ---
export function actualizarCaducidad(publicacionId: string, diasRestantes: number) {
  return solicitar<{ id: string; expirationDays: number; daysElapsed: number }>(
    `/admin/publicaciones/${encodeURIComponent(publicacionId)}/caducidad`,
    { method: 'PATCH', body: JSON.stringify({ diasRestantes }) },
  );
}

export function eliminarPublicacionAdmin(publicacionId: string) {
  return solicitar<void>(`/admin/publicaciones/${encodeURIComponent(publicacionId)}`, {
    method: 'DELETE',
  });
}

// --- Sesión ---
export function esSesionAdmin(): boolean {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? 'null') as { role?: string } | null;
    return Boolean(localStorage.getItem('token')) && usuario?.role === 'admin';
  } catch {
    return false;
  }
}
