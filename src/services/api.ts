// src/services/api.ts
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
  status: number;
  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function solicitar<T>(endpoint: string, opciones: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const configuracion: RequestInit = {
    ...opciones,
    headers: { 'Content-Type': 'application/json', ...opciones.headers },
  };

  try {
    const respuesta = await fetch(url, configuracion);

    if (respuesta.status === 204) return {} as T;

    if (!respuesta.ok) {
      let mensajeServidor = 'Error desconocido del servidor';
      try {
        const errorData = await respuesta.json();
        mensajeServidor = errorData.mensaje || mensajeServidor;
      } catch (e) {
        mensajeServidor = `Error del servidor (${respuesta.status})`;
      }
      throw new ApiError(respuesta.status, mensajeServidor);
    }
    return await respuesta.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
  }
}