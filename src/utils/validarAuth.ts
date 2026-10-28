/**
 * Función pura: valida si un string tiene formato de correo electrónico válido.
 * No depende de React, ni del DOM, ni de estados. 
 * Devuelve un booleano.
 */
export function esCorreoValido(correo: string): boolean {
  // Expresión regular básica para validar correos
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

/**
 * Función pura: valida que el código PIN tenga exactamente 4 dígitos numéricos.
 */
export function esPinValido(pin: string): boolean {
  const regexPin = /^\d{4}$/;
  return regexPin.test(pin);
}