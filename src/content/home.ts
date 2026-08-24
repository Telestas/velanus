/**
 * Textos de la home, tal como llegaron de la maqueta «Home Vela Nus.dc.html».
 *
 * Están aquí y no dentro del JSX porque la misma home se pinta cuatro veces:
 * dos direcciones visuales (oscuro / claro) × dos maquetas (escritorio /
 * móvil). Cambiar una frase en un solo sitio evita que las cuatro se
 * desincronicen.
 *
 * Las variantes móviles llevan textos más cortos, redactados en la propia
 * maqueta; por eso muchos bloques tienen `descripcion` y `descripcionMovil`.
 *
 * BORRADOR: todo lo que aparece entre corchetes ([DATO PENDIENTE], [RESEÑA
 * PENDIENTE], [TÍTULO PENDIENTE]…) está pendiente de que el cliente lo
 * facilite. No inventar cifras, reseñas ni titulares de blog: la maqueta los
 * dejó marcados a propósito.
 */

export interface Cifra {
  valor: string;
  etiqueta: string;
  etiquetaMovil: string;
}

export interface Problema {
  numero: string;
  titulo: string;
  descripcion: string;
  descripcionMovil: string;
}

export interface LineaServicio {
  clave: string;
  titulo: string;
  items: string[];
  /** Los mismos items en una línea, para las tarjetas de móvil. */
  resumen: string;
}

export interface Paso {
  numero: string;
  titulo: string;
  /** Titular con el matiz que añade la dirección clara («· 30 minutos»). */
  tituloLargo: string;
  descripcion: string;
  descripcionMovil: string;
}

export interface Resena {
  cita: string;
  autor: string;
  procedencia: string;
}

export interface EntradaBlog {
  categoria: string;
  titulo: string;
  meta: string;
  metaMovil: string;
}

export const HERO_OSCURO = {
  antetitulo: 'Consultoría corporativa en Cuba · Clientes internacionales',
  antetituloMovil: 'Consultoría corporativa en Cuba',
  titulo: 'Constituya y opere su empresa en Cuba sin tener que entender el sistema cubano.',
  tituloMovil: 'Constituya y opere su empresa en Cuba sin entender el sistema cubano.',
  entradilla:
    'Nos ocupamos de la constitución, la contabilidad y los trámites ante las instituciones cubanas. Usted recibe estados financieros, plazos y un responsable con nombre —en español o en inglés.',
  entradillaMovil:
    'Constitución, contabilidad y trámites ante las instituciones cubanas. Usted recibe estados, plazos y un responsable con nombre.',
};

export const HERO_CLARO = {
  antetitulo: 'Para empresas e inversores extranjeros',
  antetituloMovil: 'Empresas e inversores extranjeros',
  titulo: 'Operamos en Cuba por usted. Usted no tiene que entender el sistema cubano.',
  tituloMovil: 'Operamos en Cuba por usted. Usted no tiene que entender el sistema cubano.',
  entradilla:
    'Constituimos su MIPYME, llevamos su contabilidad y gestionamos cada trámite ante las instituciones cubanas, con plazos y honorarios cerrados por escrito.',
  entradillaMovil:
    'Constituimos su MIPYME, llevamos su contabilidad y gestionamos cada trámite, con plazos y honorarios cerrados por escrito.',
};

/** BORRADOR: cifras pendientes de que las confirme el cliente. */
export const CIFRAS: Cifra[] = [
  { valor: '[DATO PENDIENTE]', etiqueta: 'Años operando en Cuba', etiquetaMovil: 'Años operando' },
  { valor: '[DATO PENDIENTE]', etiqueta: 'Entidades constituidas', etiquetaMovil: 'Entidades constituidas' },
  { valor: '[DATO PENDIENTE]', etiqueta: 'Clientes atendidos', etiquetaMovil: 'Clientes atendidos' },
  { valor: '[PENDIENTE]', etiqueta: 'Países de origen de clientes', etiquetaMovil: 'Países de origen' },
];

export const PROBLEMAS: Problema[] = [
  {
    numero: '01',
    titulo: 'No sabe qué figura legal le corresponde',
    descripcion:
      'MIPYME, TCP, CNA o PDL. Evaluamos su caso y constituimos la figura que le permite facturar, contratar y operar legalmente.',
    descripcionMovil:
      'MIPYME, TCP, CNA o PDL: evaluamos su caso y constituimos la figura correcta.',
  },
  {
    numero: '02',
    titulo: 'No tiene quién responda por la contabilidad',
    descripcion:
      'Asumimos la teneduría de libros en Versat u Odoo y entregamos estado de rendimiento y estado de situación en cada cierre.',
    descripcionMovil: 'Teneduría en Versat u Odoo, con estados en cada cierre.',
  },
  {
    numero: '03',
    titulo: 'No puede estar presente para los trámites',
    descripcion:
      'Obtenemos y legalizamos documentos registrales y comparecemos ante las instituciones con poder de representación. Usted no viaja.',
    descripcionMovil: 'Comparecemos con poder de representación. Usted no viaja.',
  },
  {
    numero: '04',
    titulo: 'No sabe si un contrato local le protege',
    descripcion:
      'Redactamos y revisamos contratación económica, y llevamos reclamaciones contractuales y laborales cuando hace falta.',
    descripcionMovil: 'Contratación económica, reclamaciones contractuales y laborales.',
  },
];

/**
 * Tres líneas corporativas (A, B y D). La C —trámites y visas para personas
 * naturales— va aparte a propósito: el brief pedía que no compartiera grilla
 * con las corporativas.
 */
export const LINEAS_SERVICIO: LineaServicio[] = [
  {
    clave: 'A',
    titulo: 'Contabilidad y teneduría de libros',
    items: [
      'Asentamiento de operaciones contables',
      'Gestión de nómina (Versat y Odoo)',
      'Elaboración de fichas de costo',
      'Estado de rendimiento y estado de situación contable',
    ],
    resumen:
      'Asentamiento de operaciones · Nómina en Versat y Odoo · Fichas de costo · Estado de rendimiento y de situación',
  },
  {
    clave: 'B',
    titulo: 'Asesoría legal corporativa',
    items: [
      'Constitución de MIPYMES, TCP, CNA y PDL',
      'Contratación económica',
      'Reclamaciones contractuales',
      'Reclamaciones laborales',
    ],
    resumen:
      'Constitución de MIPYMES, TCP, CNA y PDL · Contratación económica · Reclamaciones contractuales y laborales',
  },
  {
    clave: 'D',
    titulo: 'Eventos y capacitación',
    items: ['Organización de eventos corporativos', 'Talleres y capacitación a equipos'],
    resumen: 'Eventos corporativos · Talleres y capacitación a equipos',
  },
];

/** Bloque C, subordinado a los corporativos y dirigido a personas naturales. */
export const TRAMITES = {
  etiqueta: 'C · Personas naturales',
  etiquetaLarga: 'C · Sección para personas naturales',
  titulo: 'Gestión de trámites, documentos y visas',
  tituloCorto: 'Trámites, documentos y visas',
  descripcion:
    'Documentos registrales y legalizaciones · Visas a Canadá, México, Panamá y Schengen',
  enlace: 'Ir a trámites personales',
};

export const PASOS: Paso[] = [
  {
    numero: 'Paso 1',
    titulo: 'Primer contacto',
    tituloLargo: 'Primer contacto · 30 minutos',
    descripcion:
      'Llamada de 30 minutos por WhatsApp o correo. Nos cuenta qué necesita y desde qué país opera.',
    descripcionMovil: 'Llamada de 30 min por WhatsApp o correo.',
  },
  {
    numero: 'Paso 2',
    titulo: 'Diagnóstico y propuesta',
    tituloLargo: 'Diagnóstico y propuesta escrita',
    descripcion:
      'Recibe por escrito el alcance, los plazos reales ante cada institución y los honorarios cerrados.',
    descripcionMovil: 'Alcance, plazos y honorarios cerrados por escrito.',
  },
  {
    numero: 'Paso 3',
    titulo: 'Ejecución y representación',
    tituloLargo: 'Ejecución y representación',
    descripcion:
      'Actuamos ante registros, bancos e instituciones. Un responsable con nombre le reporta el avance.',
    descripcionMovil: 'Actuamos ante registros e instituciones y le reportamos.',
  },
  {
    numero: 'Paso 4',
    titulo: 'Entrega y seguimiento',
    tituloLargo: 'Entrega y seguimiento',
    descripcion:
      'Documentos, estados contables y un calendario de obligaciones para que nada venza sin avisar.',
    descripcionMovil: 'Documentos, estados y calendario de obligaciones.',
  },
];

/** BORRADOR: reseñas inventadas no; van vacías hasta que el cliente apruebe. */
export const RESENAS: Resena[] = [
  {
    cita: '[RESEÑA PENDIENTE — texto aprobado por el cliente]',
    autor: '[NOMBRE PENDIENTE]',
    procedencia: '[PAÍS] · Constitución de MIPYME',
  },
  {
    cita: '[RESEÑA PENDIENTE — texto aprobado por el cliente]',
    autor: '[NOMBRE PENDIENTE]',
    procedencia: '[PAÍS] · Contabilidad continuada',
  },
  {
    cita: '[RESEÑA PENDIENTE — texto aprobado por el cliente]',
    autor: '[NOMBRE PENDIENTE]',
    procedencia: '[PAÍS] · Trámites documentales',
  },
];

/** BORRADOR: el blog aún no existe; estas fichas son marcadores de sitio. */
export const ENTRADAS_BLOG: EntradaBlog[] = [
  {
    categoria: 'Fiscal y contable',
    titulo: '[TÍTULO PENDIENTE]',
    meta: '[FECHA] · [AUTOR] · 6 min de lectura',
    metaMovil: '[FECHA] · 6 min',
  },
  {
    categoria: 'Legal corporativo',
    titulo: '[TÍTULO PENDIENTE]',
    meta: '[FECHA] · [AUTOR] · 4 min de lectura',
    metaMovil: '[FECHA] · 4 min',
  },
  {
    categoria: 'Trámites y documentación',
    titulo: '[TÍTULO PENDIENTE]',
    meta: '[FECHA] · [AUTOR] · 3 min de lectura',
    metaMovil: '[FECHA] · 3 min',
  },
];

export const AVISO_RESENAS = 'Todas las reseñas pasan por aprobación antes de publicarse.';

export const CTA = {
  titulo: 'Cuéntenos su caso. Le decimos qué figura legal necesita.',
  entradilla:
    'Sin compromiso ni honorarios por la primera valoración. Atendemos en español e inglés.',
};

export const PIE_DESCRIPCION =
  'Consultores & Asociados. Servicios contables, jurídicos y de gestión en Cuba para clientes nacionales e internacionales.';
