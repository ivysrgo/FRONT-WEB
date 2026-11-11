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

function guardarSesion(respuesta: LoginResponse) {
  localStorage.setItem('token', respuesta.token);
  localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
}