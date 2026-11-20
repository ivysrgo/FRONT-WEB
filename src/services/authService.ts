import { solicitar } from './api';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

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

export interface PerfilPublico {
  id: string;
  nombre: string;
  correo: string;
  phone: string;
  rating: number;
  ratingCount: number;
  avatarUrl: string;
  role: string;
}

export interface PublicacionUsuarioPublico {
  id: string;
  title: string;
  category: string;
  modality: string;
  description: string;
  imageUrl: string;
  imageUrls?: string[];
  status: string;
  condition: string;
  daysElapsed: number;
  expirationDays: number;
  createdAt?: string;
}

export interface PerfilPublicoRespuesta {
  usuario: PerfilPublico;
  publicaciones: PublicacionUsuarioPublico[];
}

export async function login(credenciales: LoginRequest): Promise<LoginResponse> {
  const respuesta = await solicitar<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });
  guardarSesion(respuesta);
  return respuesta;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
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

export async function actualizarPerfil(datos: {
  nombre?: string;
  correo?: string;
  phone?: string;
  avatarUrl?: string;
}): Promise<PerfilAutenticado> {
  const respuesta = await solicitar<{ usuario: LoginResponse['usuario']; mensaje: string }>('/auth/perfil', {
    method: 'PATCH',
    body: JSON.stringify(datos),
  });
  const usuario = respuesta.usuario;
  localStorage.setItem('usuario', JSON.stringify(usuario));
  window.dispatchEvent(new Event('usuario-updated'));

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

export async function obtenerPerfilPublico(id: string): Promise<PerfilPublicoRespuesta> {
  return solicitar<PerfilPublicoRespuesta>(`/auth/usuario/${id}`);
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