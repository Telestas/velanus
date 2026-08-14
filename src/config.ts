/**
 * Datos de contacto de la empresa.
 * Centralizados aquí para no repetirlos por las pantallas.
 */

/** Número en formato internacional sin signos, como lo exige wa.me. */
export const WHATSAPP_NUMBER = '5353854623';

/** El mismo número, formateado para mostrar en pantalla. */
export const WHATSAPP_DISPLAY = '+53 5 3854623';

export const CONTACT_EMAIL = 'contacto@velanus.cu';

export const CONTACT_CITY = 'La Habana, Cuba';

/** Construye un enlace de WhatsApp con un mensaje opcional ya redactado. */
export const whatsappLink = (message?: string): string => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
