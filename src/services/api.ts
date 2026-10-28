export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
  status: number;
  errores: string[];

  constructor(status: number, mensaje: string, errores: string[] = []) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.errores = errores;
  }
}

interface RespuestaDeError {
  mensaje?: string;
  errores?: string[];
}

export async function solicitar<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  let respuesta: Response;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        ...opciones.headers,
      },
    });
  } catch {
    throw new ApiError(
      0,
      'No se pudo conectar con el servidor. Verifica tu conexión o que el backend esté encendido.',
    );
  }

  if (respuesta.status === 204) {
    return undefined as T;
  }

  let cuerpo: unknown = null;
  try {
    cuerpo = await respuesta.json();
  } catch {
    cuerpo = null;
  }

  if (!respuesta.ok) {
    const datosError = (cuerpo ?? {}) as RespuestaDeError;
    const mensaje = datosError.mensaje ?? `Error HTTP ${respuesta.status}`;
    const errores = Array.isArray(datosError.errores) ? datosError.errores : [];
    throw new ApiError(respuesta.status, mensaje, errores);
  }

  return cuerpo as T;
}

export function obtenerMensajeDeError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Ocurrió un error inesperado.';
}

