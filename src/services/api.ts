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
<<<<<<< HEAD

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`;
=======
  const headers = new Headers(opciones.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const token = localStorage.getItem('token');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
>>>>>>> Luisa
  }

  const configuracion: RequestInit = {
    ...opciones,
<<<<<<< HEAD
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...opciones.headers,
    },
=======
    headers,
>>>>>>> Luisa
  };

  try {
    const respuesta = await fetch(url, configuracion);

    if (respuesta.status === 204) return {} as T;

    if (!respuesta.ok) {
      let mensajeServidor = 'Error desconocido del servidor';
      try {
        const errorData = await respuesta.json();
        mensajeServidor = errorData.mensaje || errorData.error || mensajeServidor;
      } catch {
        mensajeServidor = `Error del servidor (${respuesta.status})`;
      }
      throw new ApiError(respuesta.status, mensajeServidor);
    }
    return await respuesta.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
<<<<<<< HEAD
    throw new ApiError(0, 'No se pudo conectar con el servidor. Verifica tu conexión o que el backend esté activo.');
  }
}

=======
    throw new ApiError(0, 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
  }
}
>>>>>>> Luisa
