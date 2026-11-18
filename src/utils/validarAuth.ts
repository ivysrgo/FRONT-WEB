/**
 * Funciones puras de validación de autenticación y contraseñas.
 */

export function esCorreoValido(correo: string): boolean {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

export function esPinValido(pin: string): boolean {
  const regexPin = /^\d{4}$/;
  return regexPin.test(pin);
}

export interface EvaluacionContrasena {
  tieneLongitud: boolean;   // Como mínimo 5 caracteres
  tieneMayuscula: boolean;  // Mínimo 1 letra mayúscula
  tieneMinuscula: boolean;  // Mínimo 1 letra minúscula
  tieneNumero: boolean;     // Mínimo 1 número
  tieneEspecial: boolean;   // Mínimo 1 carácter especial
  cumplidosCount: number;   // 0 a 5
  porcentaje: number;       // 0 a 100% (20% por cada criterio)
  esValida: boolean;        // Cumple los 5 parámetros
  nivelTexto: string;       // Etiqueta legible de nivel
  colorBarra: string;       // Color visual coherente
}

/**
 * Evalúa los 5 parámetros de seguridad de una contraseña y calcula el nivel de la barra.
 */
export function evaluarSeguridadContrasena(contrasena: string): EvaluacionContrasena {
  const tieneLongitud = contrasena.length >= 5;
  const tieneMayuscula = /[A-Z]/.test(contrasena);
  const tieneMinuscula = /[a-z]/.test(contrasena);
  const tieneNumero = /[0-9]/.test(contrasena);
  const tieneEspecial = /[^A-Za-z0-9]/.test(contrasena);

  const criterios = [
    tieneLongitud,
    tieneMayuscula,
    tieneMinuscula,
    tieneNumero,
    tieneEspecial,
  ];

  const cumplidosCount = criterios.filter(Boolean).length;
  const porcentaje = contrasena.length === 0 ? 0 : cumplidosCount * 20;
  const esValida = cumplidosCount === 5;

  let nivelTexto = 'Sin ingresar';
  let colorBarra = '#E0E0E0';

  if (contrasena.length > 0) {
    switch (cumplidosCount) {
      case 1:
        nivelTexto = 'Muy débil';
        colorBarra = '#D32F2F'; // Rojo
        break;
      case 2:
        nivelTexto = 'Débil';
        colorBarra = '#F57C00'; // Naranja
        break;
      case 3:
        nivelTexto = 'Media';
        colorBarra = '#FBC02D'; // Amarillo
        break;
      case 4:
        nivelTexto = 'Buena';
        colorBarra = '#689F38'; // Verde claro
        break;
      case 5:
        nivelTexto = 'Segura';
        colorBarra = '#1B5E20'; // Verde institucional
        break;
      default:
        nivelTexto = 'Muy débil';
        colorBarra = '#D32F2F';
    }
  }

  return {
    tieneLongitud,
    tieneMayuscula,
    tieneMinuscula,
    tieneNumero,
    tieneEspecial,
    cumplidosCount,
    porcentaje,
    esValida,
    nivelTexto,
    colorBarra,
  };
}

