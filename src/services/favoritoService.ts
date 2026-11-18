import { solicitar } from './api';

export interface FavoritoItem {
  id: string;
  articleId: string;
  title: string;
  category: string;
  modality: string;
  author: string;
  description: string;
  imageUrl: string;
  status: string;
  daysRemaining: number;
}

export async function obtenerFavoritos(): Promise<FavoritoItem[]> {
  return solicitar<FavoritoItem[]>('/favoritos');
}

export async function agregarFavorito(articuloId: string): Promise<void> {
  await solicitar<{ articleId: string }>('/favoritos', {
    method: 'POST',
    body: JSON.stringify({ articuloId }),
  });
}

export async function quitarFavorito(articuloId: string): Promise<void> {
  await solicitar<void>(`/favoritos/${articuloId}`, { method: 'DELETE' });
}
