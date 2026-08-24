/**
 * Datos de contacto de la empresa.
 * Centralizados aquí para no repetirlos por las pantallas.
 */

/** Número en formato internacional sin signos, como lo exige wa.me. */
export const WHATSAPP_NUMBER = '5353854623';

/** El mismo número, formateado para mostrar en pantalla. */
export const WHATSAPP_DISPLAY = '+53 5 385 4623';

export const CONTACT_EMAIL = 'contacto@velanus.com';

export const CONTACT_CITY = 'La Habana, Cuba';

/** Dirección de la oficina, en dos líneas para los pies de página. */
export const CONTACT_ADDRESS_LINES = [
  'Infanta entre Peñalver y Sitios,',
  'Centro Habana, La Habana',
];

export const CONTACT_SCHEDULE = 'Lun–Vie, 9:00–17:00';

/** Zona horaria, tal y como se muestra al visitante. */
export const CONTACT_TIMEZONE = 'Hora de Cuba (UTC-4)';

/** Construye un enlace de WhatsApp con un mensaje opcional ya redactado. */
export const whatsappLink = (message?: string): string => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Construye un mailto con asunto y cuerpo ya redactados. */
export const mailtoLink = (subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
};
