import { Idioma } from '../i18n/idioma';
import { ClaveCifra } from '../data/cifras';

/**
 * Contenido de la home, en los dos idiomas del sitio.
 *
 * Está aquí y no dentro del JSX porque la misma home se pinta cuatro veces
 * (dos direcciones visuales × escritorio y móvil) y ahora, además, en dos
 * idiomas. Cambiar una frase en un solo sitio evita que las ocho versiones se
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
  /** El valor no se escribe aquí: se resuelve con `valorDeCifra()`. */
  clave: ClaveCifra;
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

interface Hero {
  antetitulo: string;
  antetituloMovil: string;
  titulo: string;
  tituloMovil: string;
  entradilla: string;
  entradillaMovil: string;
}

export interface ContenidoHome {
  heroOscuro: Hero;
  heroClaro: Hero;
  cifras: Cifra[];
  problemas: Problema[];
  lineas: LineaServicio[];
  tramites: {
    etiqueta: string;
    etiquetaLarga: string;
    titulo: string;
    tituloCorto: string;
    descripcion: string;
    enlace: string;
  };
  pasos: Paso[];
  resenas: Resena[];
  entradasBlog: EntradaBlog[];
  avisoResenas: string;
  cta: { titulo: string; entradilla: string };
  pieDescripcion: string;
}

const ES: ContenidoHome = {
  heroOscuro: {
    antetitulo: 'Consultoría corporativa en Cuba · Clientes internacionales',
    antetituloMovil: 'Consultoría corporativa en Cuba',
    titulo: 'Constituya y opere su empresa en Cuba sin tener que entender el sistema cubano.',
    tituloMovil: 'Constituya y opere su empresa en Cuba sin entender el sistema cubano.',
    entradilla:
      'Nos ocupamos de la constitución, la contabilidad y los trámites ante las instituciones cubanas. Usted recibe estados financieros, plazos y un responsable con nombre —en español o en inglés.',
    entradillaMovil:
      'Constitución, contabilidad y trámites ante las instituciones cubanas. Usted recibe estados, plazos y un responsable con nombre.',
  },
  heroClaro: {
    antetitulo: 'Para empresas e inversores extranjeros',
    antetituloMovil: 'Empresas e inversores extranjeros',
    titulo: 'Operamos en Cuba por usted. Usted no tiene que entender el sistema cubano.',
    tituloMovil: 'Operamos en Cuba por usted. Usted no tiene que entender el sistema cubano.',
    entradilla:
      'Constituimos su MIPYME, llevamos su contabilidad y gestionamos cada trámite ante las instituciones cubanas, con plazos y honorarios cerrados por escrito.',
    entradillaMovil:
      'Constituimos su MIPYME, llevamos su contabilidad y gestionamos cada trámite, con plazos y honorarios cerrados por escrito.',
  },
  cifras: [
    { clave: 'anos', etiqueta: 'Años operando en Cuba', etiquetaMovil: 'Años operando' },
    { clave: 'entidades', etiqueta: 'Entidades constituidas', etiquetaMovil: 'Entidades constituidas' },
    { clave: 'clientes', etiqueta: 'Clientes atendidos', etiquetaMovil: 'Clientes atendidos' },
    { clave: 'paises', etiqueta: 'Países de origen de clientes', etiquetaMovil: 'Países de origen' },
  ],
  problemas: [
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
  ],
  lineas: [
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
  ],
  tramites: {
    etiqueta: 'C · Personas naturales',
    etiquetaLarga: 'C · Sección para personas naturales',
    titulo: 'Gestión de trámites, documentos y visas',
    tituloCorto: 'Trámites, documentos y visas',
    descripcion:
      'Documentos registrales y legalizaciones · Visas a Canadá, México, Panamá y Schengen',
    enlace: 'Ir a trámites personales',
  },
  pasos: [
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
  ],
  resenas: [
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
  ],
  entradasBlog: [
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
  ],
  avisoResenas: 'Todas las reseñas pasan por aprobación antes de publicarse.',
  cta: {
    titulo: 'Cuéntenos su caso. Le decimos qué figura legal necesita.',
    entradilla:
      'Sin compromiso ni honorarios por la primera valoración. Atendemos en español e inglés.',
  },
  pieDescripcion:
    'Consultores & Asociados. Servicios contables, jurídicos y de gestión en Cuba para clientes nacionales e internacionales.',
};

/**
 * Versión inglesa. Se conservan sin traducir las figuras jurídicas cubanas
 * —MIPYME, TCP, CNA, PDL— y los sistemas contables Versat y Odoo: son nombres
 * propios del marco cubano y traducirlos haría el texto menos útil, no más.
 * La primera vez que aparecen se glosan entre paréntesis.
 */
const EN: ContenidoHome = {
  heroOscuro: {
    antetitulo: 'Corporate consulting in Cuba · International clients',
    antetituloMovil: 'Corporate consulting in Cuba',
    titulo: 'Set up and run your company in Cuba without having to understand the Cuban system.',
    tituloMovil: 'Set up and run your company in Cuba without understanding the Cuban system.',
    entradilla:
      'We handle incorporation, accounting and every filing before Cuban institutions. You get financial statements, timelines and a named person answering for the work — in Spanish or in English.',
    entradillaMovil:
      'Incorporation, accounting and filings before Cuban institutions. You get statements, timelines and a named person answering for the work.',
  },
  heroClaro: {
    antetitulo: 'For foreign companies and investors',
    antetituloMovil: 'Foreign companies and investors',
    titulo: 'We operate in Cuba for you. You do not have to understand the Cuban system.',
    tituloMovil: 'We operate in Cuba for you. You do not have to understand the Cuban system.',
    entradilla:
      'We incorporate your MIPYME, keep your books and handle every filing before Cuban institutions, with timelines and fees agreed in writing.',
    entradillaMovil:
      'We incorporate your MIPYME, keep your books and handle every filing, with timelines and fees agreed in writing.',
  },
  cifras: [
    { clave: 'anos', etiqueta: 'Years operating in Cuba', etiquetaMovil: 'Years operating' },
    { clave: 'entidades', etiqueta: 'Entities incorporated', etiquetaMovil: 'Entities incorporated' },
    { clave: 'clientes', etiqueta: 'Clients served', etiquetaMovil: 'Clients served' },
    { clave: 'paises', etiqueta: 'Countries clients come from', etiquetaMovil: 'Client countries' },
  ],
  problemas: [
    {
      numero: '01',
      titulo: 'You do not know which legal form applies to you',
      descripcion:
        'MIPYME, TCP, CNA or PDL — the Cuban business forms. We assess your case and set up the one that lets you invoice, contract and operate legally.',
      descripcionMovil:
        'MIPYME, TCP, CNA or PDL: we assess your case and set up the right form.',
    },
    {
      numero: '02',
      titulo: 'Nobody is answering for your accounting',
      descripcion:
        'We take over bookkeeping in Versat or Odoo and deliver an income statement and a balance sheet at every close.',
      descripcionMovil: 'Bookkeeping in Versat or Odoo, with statements at every close.',
    },
    {
      numero: '03',
      titulo: 'You cannot be there for the paperwork',
      descripcion:
        'We obtain and legalise registry documents and appear before institutions holding power of attorney. You do not travel.',
      descripcionMovil: 'We appear holding power of attorney. You do not travel.',
    },
    {
      numero: '04',
      titulo: 'You do not know whether a local contract protects you',
      descripcion:
        'We draft and review commercial contracts, and pursue contractual and employment claims when it comes to that.',
      descripcionMovil: 'Commercial contracts, contractual and employment claims.',
    },
  ],
  lineas: [
    {
      clave: 'A',
      titulo: 'Accounting and bookkeeping',
      items: [
        'Recording of accounting operations',
        'Payroll management (Versat and Odoo)',
        'Product and service cost sheets',
        'Income statement and balance sheet',
      ],
      resumen:
        'Operations recorded · Payroll in Versat and Odoo · Cost sheets · Income statement and balance sheet',
    },
    {
      clave: 'B',
      titulo: 'Corporate legal advice',
      items: [
        'Incorporation of MIPYMES, TCP, CNA and PDL',
        'Commercial contracts',
        'Contractual claims',
        'Employment claims',
      ],
      resumen:
        'Incorporation of MIPYMES, TCP, CNA and PDL · Commercial contracts · Contractual and employment claims',
    },
    {
      clave: 'D',
      titulo: 'Events and training',
      items: ['Corporate event management', 'Workshops and team training'],
      resumen: 'Corporate events · Workshops and team training',
    },
  ],
  tramites: {
    etiqueta: 'C · Individuals',
    etiquetaLarga: 'C · Section for individuals',
    titulo: 'Paperwork, documents and visas',
    tituloCorto: 'Paperwork, documents and visas',
    descripcion:
      'Registry documents and legalisations · Visas for Canada, Mexico, Panama and the Schengen Area',
    enlace: 'Go to personal paperwork',
  },
  pasos: [
    {
      numero: 'Step 1',
      titulo: 'First contact',
      tituloLargo: 'First contact · 30 minutes',
      descripcion:
        'A 30-minute call on WhatsApp or by email. You tell us what you need and which country you operate from.',
      descripcionMovil: 'A 30-minute call on WhatsApp or by email.',
    },
    {
      numero: 'Step 2',
      titulo: 'Assessment and proposal',
      tituloLargo: 'Written assessment and proposal',
      descripcion:
        'You receive the scope in writing, the real timelines before each institution, and fixed fees.',
      descripcionMovil: 'Scope, timelines and fixed fees in writing.',
    },
    {
      numero: 'Step 3',
      titulo: 'Execution and representation',
      tituloLargo: 'Execution and representation',
      descripcion:
        'We act before registries, banks and institutions. A named person reports progress to you.',
      descripcionMovil: 'We act before registries and institutions and report back.',
    },
    {
      numero: 'Step 4',
      titulo: 'Delivery and follow-up',
      tituloLargo: 'Delivery and follow-up',
      descripcion:
        'Documents, financial statements and a calendar of obligations so nothing falls due unnoticed.',
      descripcionMovil: 'Documents, statements and a calendar of obligations.',
    },
  ],
  resenas: [
    {
      cita: '[REVIEW PENDING — text approved by the client]',
      autor: '[NAME PENDING]',
      procedencia: '[COUNTRY] · MIPYME incorporation',
    },
    {
      cita: '[REVIEW PENDING — text approved by the client]',
      autor: '[NAME PENDING]',
      procedencia: '[COUNTRY] · Ongoing accounting',
    },
    {
      cita: '[REVIEW PENDING — text approved by the client]',
      autor: '[NAME PENDING]',
      procedencia: '[COUNTRY] · Document processing',
    },
  ],
  entradasBlog: [
    {
      categoria: 'Tax and accounting',
      titulo: '[TITLE PENDING]',
      meta: '[DATE] · [AUTHOR] · 6 min read',
      metaMovil: '[DATE] · 6 min',
    },
    {
      categoria: 'Corporate law',
      titulo: '[TITLE PENDING]',
      meta: '[DATE] · [AUTHOR] · 4 min read',
      metaMovil: '[DATE] · 4 min',
    },
    {
      categoria: 'Paperwork and documents',
      titulo: '[TITLE PENDING]',
      meta: '[DATE] · [AUTHOR] · 3 min read',
      metaMovil: '[DATE] · 3 min',
    },
  ],
  avisoResenas: 'Every review is approved before it is published.',
  cta: {
    titulo: 'Tell us about your case. We will tell you which legal form you need.',
    entradilla:
      'No commitment and no fee for the initial assessment. We work in Spanish and English.',
  },
  pieDescripcion:
    'Consultores & Asociados. Accounting, legal and administrative services in Cuba for domestic and international clients.',
};

export const contenidoHome = (idioma: Idioma): ContenidoHome =>
  idioma === 'en' ? EN : ES;
