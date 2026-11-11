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
  };
}

export async function login(credenciales: LoginRequest): Promise<LoginResponse> {
  return solicitar<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });
}