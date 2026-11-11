export interface Publication {
  id: string;
  title: string;
  category: string;
  modality: 'Donación' | 'Intercambio';
  condition: string;
  description: string;
  details: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
  author: string;
  publishedAt: string;
  tags: string[];
  talla: string;
  genero: string;
  clima: string;
  ubicacion?: string;
  autorizaDonacion: boolean;
}

interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    role: string;
  };
}

interface RegisterData {
  nombre: string;
  correo: string;
  contrasena: string;
}

export interface PublicationData {
  title: string;
  category: string;
  modality: 'Donación' | 'Intercambio';
  condition: string;
  description: string;
  imageUrl?: string;
  talla?: string;
  genero?: string;
  clima?: string;
  autorizaDonacion?: boolean;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
const TOKEN_KEY = 'eco-golgi-token';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Verifica que el backend esté iniciado.', 0);
  }

  if (response.status === 204) return undefined as T;

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    if (response.ok) {
      throw new ApiError('El servidor devolvió una respuesta inválida.', response.status);
    }
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401) localStorage.removeItem(TOKEN_KEY);
    const message = typeof payload === 'object' && payload !== null
      ? 'mensaje' in payload && typeof payload.mensaje === 'string'
        ? payload.mensaje
        : 'error' in payload && typeof payload.error === 'string'
          ? payload.error
          : 'Ocurrió un error al procesar la solicitud.'
      : 'Ocurrió un error al procesar la solicitud.';
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

function queryString(params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const publicacionesApi = {
  list: (filters: { categoria?: string; q?: string } = {}) =>
    request<Publication[]>(`/publicaciones${queryString(filters)}`),
  listMine: () => request<Publication[]>('/publicaciones/mis-publicaciones'),
  get: (id: string) => request<Publication>(`/publicaciones/${encodeURIComponent(id)}`),
  create: (data: PublicationData) =>
    request<Publication>('/publicaciones', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PublicationData>) =>
    request<Publication>(`/publicaciones/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/publicaciones/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  login: async (correo: string, contrasena: string) => {
    const result = await request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, contrasena }),
    });
    localStorage.setItem(TOKEN_KEY, result.token);
    return result.usuario;
  },
  register: async (data: RegisterData) => {
    const result = await request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    localStorage.setItem(TOKEN_KEY, result.token);
    return result.usuario;
  },
};

export function getImageUrl(imageUrl: string): string {
  return imageUrl || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&q=80';
}

export function displayCategory(category: string): string {
  const normalized = category.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (normalized.includes('util')) return 'Útiles';
  if (normalized.includes('mueble')) return 'Muebles pequeños';
  if (normalized.includes('libro')) return 'Libros';
  if (normalized.includes('ropa')) return 'Ropa';
  return category;
}
