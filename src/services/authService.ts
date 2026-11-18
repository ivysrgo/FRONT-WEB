import { solicitar } from './api';

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  nombre: string;
  correo: string;
  role: UserRole | string;
  phone?: string;
  rating?: number;
  avatarUrl?: string;
}

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  usuario: AuthUser;
}

export async function login(credenciales: LoginRequest): Promise<LoginResponse> {
  return solicitar<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });
}

export async function registrar(datos: RegisterRequest): Promise<LoginResponse> {
  return solicitar<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export async function obtenerPerfilServidor(): Promise<{ usuario: AuthUser }> {
  return solicitar<{ usuario: AuthUser }>('/auth/me');
}

export async function solicitarPIN(correo: string): Promise<{ mensaje: string; pinSimulado?: string }> {
  return solicitar<{ mensaje: string; pinSimulado?: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ correo }),
  });
}

export async function verificarPIN(correo: string, pin: string): Promise<{ mensaje: string }> {
  return solicitar<{ mensaje: string }>('/auth/verify-code', {
    method: 'POST',
    body: JSON.stringify({ correo, pin }),
  });
}

export async function restablecerContrasena(
  correo: string,
  pin: string,
  nuevaContrasena: string
): Promise<{ mensaje: string }> {
  return solicitar<{ mensaje: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ correo, pin, nuevaContrasena }),
  });
}

export function guardarSesion(token: string, usuario: AuthUser): void {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  } catch (e) {
    console.error('Error al guardar la sesión:', e);
  }
}

export function cerrarSesion(): void {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  } catch (e) {
    console.error('Error al cerrar sesión:', e);
  }
}

export function obtenerUsuarioActual(): AuthUser | null {
  try {
    const raw = localStorage.getItem('usuario');
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function estaAutenticado(): boolean {
  try {
    return Boolean(localStorage.getItem('token'));
  } catch {
    return false;
  }
}

export function esAdmin(): boolean {
  const usuario = obtenerUsuarioActual();
  if (!usuario) return false;
  return usuario.role === 'admin' || usuario.role === 'Administrador';
}

