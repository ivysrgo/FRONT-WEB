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

export function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

function guardarSesion(respuesta: LoginResponse) {
  localStorage.setItem('token', respuesta.token);
  localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
}