import {
  CATEGORIAS_PRENDA,
  MODALIDADES,
  TALLAS_PRENDA,
  type CategoriaPrenda,
  type ModalidadPublicacion,
  type PublicacionDatos,
  type TallaPrenda,
} from '../types/unidona';

export interface ValoresPublicacionForm {
  codigo: string;
  title: string;
  categoriaPrenda: CategoriaPrenda | '';
  modalidad: ModalidadPublicacion | '';
  talla: TallaPrenda | '';
  estadoFisico: string;
  ubicacion: string;
  imageUrl: string;
}

export type ErroresPublicacionForm = Partial<Record<keyof ValoresPublicacionForm, string>>;

export const VALORES_INICIALES_PUBLICACION: ValoresPublicacionForm = {
  codigo: '',
  title: '',
  categoriaPrenda: '',
  modalidad: '',
  talla: '',
  estadoFisico: '',
  ubicacion: '',
  imageUrl: '',
};

const PATRON_CODIGO = /^[A-Z0-9-]{3,15}$/;

export function validarPublicacionForm(
  valores: ValoresPublicacionForm,
): ErroresPublicacionForm {
  const errores: ErroresPublicacionForm = {};

  const codigoLimpio = valores.codigo.trim().toUpperCase();
  if (!codigoLimpio) {
    errores.codigo = 'El código de referencia es obligatorio (ej. PRN-005).';
  } else if (!PATRON_CODIGO.test(codigoLimpio)) {
    errores.codigo = 'Usa entre 3 y 15 caracteres (letras, números o guion).';
  }

  const tituloLimpio = valores.title.trim();
  if (!tituloLimpio) {
    errores.title = 'El título de la prenda es obligatorio.';
  } else if (tituloLimpio.length < 3 || tituloLimpio.length > 80) {
    errores.title = 'El título debe tener entre 3 y 80 caracteres.';
  }

  if (!valores.categoriaPrenda || !CATEGORIAS_PRENDA.includes(valores.categoriaPrenda)) {
    errores.categoriaPrenda = 'Selecciona una categoría válida.';
  }

  if (!valores.modalidad || !MODALIDADES.includes(valores.modalidad)) {
    errores.modalidad = 'Selecciona la modalidad (Donación o Intercambio).';
  }

  if (!valores.talla || !TALLAS_PRENDA.includes(valores.talla)) {
    errores.talla = 'Selecciona una talla.';
  }

  if (!valores.estadoFisico.trim()) {
    errores.estadoFisico = 'Indica el estado físico (ej. Como nuevo, Buen estado).';
  }

  if (!valores.ubicacion.trim()) {
    errores.ubicacion = 'La ubicación o localidad es obligatoria.';
  }

  return errores;
}

export function convertirAPublicacionDatos(
  valores: ValoresPublicacionForm,
): PublicacionDatos {
  const modalidad = valores.modalidad as ModalidadPublicacion;
  const categoriaPrenda = valores.categoriaPrenda as CategoriaPrenda;
  const talla = valores.talla as TallaPrenda;
  const estadoFisico = valores.estadoFisico.trim();
  const ubicacion = valores.ubicacion.trim();

  return {
    codigo: valores.codigo.trim().toUpperCase(),
    category: `${modalidad} · ${categoriaPrenda.toUpperCase()}`,
    categoriaPrenda,
    modalidad,
    title: valores.title.trim(),
    talla,
    estadoFisico,
    ubicacion,
    details: `Talla ${talla} · ${estadoFisico} · ${ubicacion}`,
    status: 'Disponible',
    imageUrl:
      valores.imageUrl.trim() ||
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&auto=format&fit=crop&q=80',
  };
}

