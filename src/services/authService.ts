import { solicitar } from './api';

<<<<<<< HEAD
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

=======
>>>>>>> Luisa
export interface LoginRequest {
  correo: string;
  contrasena: string;
}

<<<<<<< HEAD
=======
export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    role?: string;
    phone?: string;
    rating?: number;
    avatarUrl?: string;
  };
}

export interface PerfilAutenticado {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  rating: number;
  avatarUrl: string;
}

export async function login(credenciales: LoginRequest): Promise<LoginResponse> {
  const respuesta = await solicitar<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });
  guardarSesion(respuesta);
  return respuesta;
}

>>>>>>> Luisa
export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
<<<<<<< HEAD
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

=======
}

export async function registrar(datos: RegisterRequest): Promise<LoginResponse> {
  const respuesta = await solicitar<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  guardarSesion(respuesta);
  return respuesta;
}

export async function obtenerPerfilActual(): Promise<PerfilAutenticado> {
  const respuesta = await solicitar<{ usuario: LoginResponse['usuario'] }>('/auth/me');
  const usuario = respuesta.usuario;
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return {
    id: usuario.id,
    name: usuario.nombre,
    role: usuario.role === 'admin' ? 'Administrador' : 'Miembro de la comunidad',
    email: usuario.correo,
    phone: usuario.phone ?? '',
    rating: typeof usuario.rating === 'number' && Number.isFinite(usuario.rating)
      ? usuario.rating
      : 0,
    avatarUrl: usuario.avatarUrl ?? '',
  };
}

export interface CambioContrasena {
  contrasenaActual: string;
  nuevaContrasena: string;
}

export function cambiarContrasena(datos: CambioContrasena): Promise<{ mensaje: string }> {
  return solicitar<{ mensaje: string }>('/auth/cambiar-contrasena', {
    method: 'PATCH',
    body: JSON.stringify(datos),
  });
}

export function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

function guardarSesion(respuesta: LoginResponse) {
  localStorage.setItem('token', respuesta.token);
  localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
}
>>>>>>> Luisa
