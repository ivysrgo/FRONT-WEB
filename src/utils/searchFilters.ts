import type { CarouselItem } from '../components/ItemCarousel';

// Opciones de filtro compartidas entre el panel de búsqueda y la página de Explorar
export const CATEGORY_OPTIONS = [
  { value: 'todo', label: 'Todo' },
  { value: 'ROPA', label: 'Ropa' },
  { value: 'LIBROS', label: 'Libros' },
  { value: 'ÚTILES', label: 'Útiles Escolares' },
  { value: 'MUEBLES', label: 'Muebles Pequeños' },
] as const;

export const CONDITION_OPTIONS = [
  { value: 'todos', label: 'Cualquier estado' },
  { value: 'Como nuevo', label: 'Como nuevo' },
  { value: 'Buen Estado', label: 'Buen Estado' },
  { value: 'Usado', label: 'Usado' },
] as const;

export const MODALITY_OPTIONS = [
  { value: 'todas', label: 'Donación e Intercambio' },
  { value: 'Donación', label: 'Solo Donación' },
  { value: 'Intercambio', label: 'Solo Intercambio' },
] as const;

export interface SearchFilters {
  query: string;
  category: string;
  condition: string;
  modality: string;
  recent: boolean;
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  category: 'todo',
  condition: 'todos',
  modality: 'todas',
  recent: false,
};

// Los filtros viven en la URL (/explorar?q=...&categoria=...) para poder abrirlos desde cualquier pantalla
export const filtersFromParams = (params: URLSearchParams): SearchFilters => ({
  query: params.get('q') ?? DEFAULT_FILTERS.query,
  category: params.get('categoria') ?? DEFAULT_FILTERS.category,
  condition: params.get('estado') ?? DEFAULT_FILTERS.condition,
  modality: params.get('modalidad') ?? DEFAULT_FILTERS.modality,
  recent: params.get('orden') === 'recientes',
});

export const filtersToParams = (filters: SearchFilters): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.category !== DEFAULT_FILTERS.category) params.set('categoria', filters.category);
  if (filters.condition !== DEFAULT_FILTERS.condition) params.set('estado', filters.condition);
  if (filters.modality !== DEFAULT_FILTERS.modality) params.set('modalidad', filters.modality);
  if (filters.recent) params.set('orden', 'recientes');
  return params;
};

export const hasActiveFilters = (filters: SearchFilters) =>
  filtersToParams(filters).toString() !== '';

// Normaliza para buscar sin importar tildes ni mayúsculas
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const applyFilters = (items: CarouselItem[], filters: SearchFilters): CarouselItem[] => {
  const query = normalize(filters.query.trim());

  const result = items.filter((item) => {
    if (query && !normalize(`${item.title} ${item.description}`).includes(query)) return false;
    if (filters.category !== 'todo' && item.category !== filters.category) return false;
    if (filters.condition !== 'todos' && item.condition !== filters.condition) return false;
    if (filters.modality !== 'todas' && item.modality !== filters.modality) return false;
    return true;
  });

  if (filters.recent) {
    result.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
  }

  return result;
};
