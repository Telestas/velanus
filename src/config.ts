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

/** Vela Nus empezó a operar el 2 de agosto de 2023. */
export const INICIO_OPERACIONES = new Date(2023, 7, 2);

/**
 * Años completos operando, calculados en cada carga.
 *
 * Se calcula en vez de escribirse para que no haya que acordarse de subirlo
 * cada 2 de agosto —el tipo de dato que se queda desactualizado durante años
 * en un sitio corporativo.
 */
export const anosOperando = (referencia: Date = new Date()): number => {
  let anos = referencia.getFullYear() - INICIO_OPERACIONES.getFullYear();

  // Aún no ha llegado el aniversario de este año: uno menos.
  const cumplido =
    referencia.getMonth() > INICIO_OPERACIONES.getMonth() ||
    (referencia.getMonth() === INICIO_OPERACIONES.getMonth() &&
      referencia.getDate() >= INICIO_OPERACIONES.getDate());
  if (!cumplido) anos -= 1;

  return Math.max(anos, 0);
};

/** Dirección de la oficina, en dos líneas para los pies de página. */
export const CONTACT_ADDRESS_LINES = [
  'Infanta entre Peñalver y Sitios,',
  'Centro Habana, La Habana',
];

export const CONTACT_SCHEDULE = 'Lun–Vie, 9:00–17:00';

/** Zona horaria, tal y como se muestra al visitante. */
export const CONTACT_TIMEZONE = 'Hora de Cuba (UTC-4)';

/**
 * Meses que se conservan las consultas antes de revisarlas para borrado.
 *
 * ⚠️ PENDIENTE DE APROBACIÓN JURÍDICA: 24 meses es una propuesta razonable,
 * no una decisión tomada. Cuando el equipo jurídico fije el plazo, cambiarlo
 * aquí y en la política de privacidad (`src/content/legal.ts`), que deben decir
 * lo mismo.
 *
 * No hay borrado automático: sin Cloud Functions (exigen plan Blaze) no puede
 * haberlo. El panel marca las que superan el plazo para que se revisen a mano.
 */
export const MESES_CONSERVACION = 24;

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
