import { ScreenId } from './types';
import { pathForScreen } from './router';
import { Idioma } from './i18n/idioma';

/**
 * Metadatos por pantalla.
 *
 * El título de un artículo del blog no está aquí: lo pone la propia pantalla
 * con `tituloDeArticulo()` cuando sabe qué artículo ha cargado.
 *
 * El sitio es una SPA: el HTML servido es siempre el mismo, así que sin esto
 * todas las URL comparten título y descripción, y en un buscador o al
 * compartir un enlace se ven idénticas. Aquí se actualizan al navegar.
 *
 * El idioma también manda aquí: el visitante inglés ve título y descripción en
 * inglés. Ojo, eso significa que **una misma URL sirve dos idiomas**, que no es
 * lo ideal para posicionar: lo correcto sería /en/… con hreflang. Exige, otra
 * vez, HTML por ruta.
 *
 * LÍMITE CONOCIDO: esto ocurre en el navegador. Google ejecuta JavaScript y lo
 * acaba viendo, pero los rastreadores de redes sociales (WhatsApp, Facebook,
 * LinkedIn) NO: se quedan con lo que hay en el HTML estático, es decir, con los
 * datos de la home. Que cada página tenga su propia tarjeta al compartirse
 * exige HTML por ruta —prerenderizado o un hosting con SSR—, que es la misma
 * conversación pendiente que los 404 de GitHub Pages.
 */

export const DOMINIO = 'https://velanus.com';

const TITULO_BASE = 'Vela Nus · Consultores & Asociados';

interface Metadatos {
  titulo: string;
  descripcion: string;
}

const ES: Record<ScreenId, Metadatos> = {
  'home-desktop': {
    titulo: `${TITULO_BASE} — Consultoría corporativa en Cuba`,
    descripcion:
      'Constitución de empresas, contabilidad y trámites en Cuba para empresas e inversores extranjeros. Alcance, plazos y honorarios por escrito. Atención en español e inglés.',
  },
  'home-movil': {
    titulo: `${TITULO_BASE} — Consultoría corporativa en Cuba`,
    descripcion:
      'Constitución de empresas, contabilidad y trámites en Cuba para empresas e inversores extranjeros.',
  },
  'servicios-desktop': {
    titulo: `Servicios — ${TITULO_BASE}`,
    descripcion:
      'Cuatro líneas de trabajo en Cuba: contabilidad, asesoría legal corporativa, trámites y visas, y eventos y capacitación. Se contratan por separado o en conjunto.',
  },
  'servicios-contabilidad': {
    titulo: `Contabilidad y teneduría de libros en Cuba — ${TITULO_BASE}`,
    descripcion:
      'Llevamos su contabilidad en Versat u Odoo desde Cuba: asentamiento de operaciones, nómina, fichas de costo y estados contables en cada cierre.',
  },
  'servicios-legal': {
    titulo: `Asesoría legal corporativa en Cuba — ${TITULO_BASE}`,
    descripcion:
      'Constitución de MIPYMES, TCP, CNA y PDL, contratación económica y reclamaciones contractuales y laborales. Con poder de representación, sin que usted viaje.',
  },
  'servicios-tramites': {
    titulo: `Trámites, documentos y visas en Cuba — ${TITULO_BASE}`,
    descripcion:
      'Obtención y legalización de documentos registrales cubanos y preparación de expedientes de visa a Canadá, México, Panamá y el espacio Schengen.',
  },
  'servicios-eventos': {
    titulo: `Eventos corporativos y capacitación en Cuba — ${TITULO_BASE}`,
    descripcion:
      'Organización de eventos corporativos en Cuba y formación para equipos que operan en el país: obligaciones contables, contratación y gestión documental.',
  },
  'nosotros-desktop': {
    titulo: `Sobre nosotros — ${TITULO_BASE}`,
    descripcion:
      'Consultoría cubana de contadores y juristas para empresas e inversores extranjeros que necesitan operar en Cuba. Honorarios cerrados y un responsable con nombre.',
  },
  'casos-desktop': {
    titulo: `Casos y reseñas — ${TITULO_BASE}`,
    descripcion:
      'Casos de clientes que ya operan en Cuba con nosotros y reseñas verificadas antes de publicarse.',
  },
  blog: {
    titulo: `Blog — ${TITULO_BASE}`,
    descripcion:
      'Normativa cubana explicada en claro: cambios contables, legales y de trámites, y qué implican para quien opera en Cuba desde fuera.',
  },
  'blog-articulo': {
    titulo: `Blog — ${TITULO_BASE}`,
    descripcion:
      'Análisis de la normativa contable, legal y de trámites en Cuba, escrito por Vela Nus Consultores & Asociados.',
  },
  // El panel no debe aparecer en buscadores; se marca con noindex.
  admin: {
    titulo: `Administración — ${TITULO_BASE}`,
    descripcion: '',
  },
};

const EN: Record<ScreenId, Metadatos> = {
  'home-desktop': {
    titulo: `${TITULO_BASE} — Corporate consulting in Cuba`,
    descripcion:
      'Company incorporation, accounting and paperwork in Cuba for foreign companies and investors. Scope, timelines and fees in writing. We work in Spanish and English.',
  },
  'home-movil': {
    titulo: `${TITULO_BASE} — Corporate consulting in Cuba`,
    descripcion:
      'Company incorporation, accounting and paperwork in Cuba for foreign companies and investors.',
  },
  'servicios-desktop': {
    titulo: `Services — ${TITULO_BASE}`,
    descripcion:
      'Four lines of work in Cuba: accounting, corporate legal advice, paperwork and visas, and events and training. Engage them separately or together.',
  },
  'servicios-contabilidad': {
    titulo: `Accounting and bookkeeping in Cuba — ${TITULO_BASE}`,
    descripcion:
      'We keep your books in Versat or Odoo from Cuba: operations recorded, payroll, cost sheets and financial statements at every close.',
  },
  'servicios-legal': {
    titulo: `Corporate legal advice in Cuba — ${TITULO_BASE}`,
    descripcion:
      'Incorporation of MIPYMES, TCP, CNA and PDL, commercial contracts and contractual and employment claims. Holding power of attorney, without you travelling.',
  },
  'servicios-tramites': {
    titulo: `Paperwork, documents and visas in Cuba — ${TITULO_BASE}`,
    descripcion:
      'Obtaining and legalising Cuban registry documents and preparing visa applications for Canada, Mexico, Panama and the Schengen Area.',
  },
  'servicios-eventos': {
    titulo: `Corporate events and training in Cuba — ${TITULO_BASE}`,
    descripcion:
      'Corporate event management in Cuba and training for teams operating in the country: accounting obligations, contracting and document management.',
  },
  'nosotros-desktop': {
    titulo: `About us — ${TITULO_BASE}`,
    descripcion:
      'A Cuban consultancy of accountants and lawyers for foreign companies and investors that need to operate in Cuba. Fixed fees and a named person in charge.',
  },
  'casos-desktop': {
    titulo: `Cases and reviews — ${TITULO_BASE}`,
    descripcion:
      'Cases from clients already operating in Cuba with us, and reviews approved before publication.',
  },
  blog: {
    titulo: `Blog — ${TITULO_BASE}`,
    descripcion:
      'Cuban regulations explained plainly: accounting, legal and paperwork changes, and what they mean for those operating in Cuba from abroad.',
  },
  'blog-articulo': {
    titulo: `Blog — ${TITULO_BASE}`,
    descripcion:
      'Analysis of Cuban accounting, legal and paperwork regulations by Vela Nus Consultores & Asociados.',
  },
  admin: {
    titulo: `Administration — ${TITULO_BASE}`,
    descripcion: '',
  },
};

/** Rutas públicas que sí deben indexarse, para el sitemap. */
export const RUTAS_INDEXABLES: ScreenId[] = [
  'home-desktop',
  'servicios-desktop',
  'servicios-contabilidad',
  'servicios-legal',
  'servicios-tramites',
  'servicios-eventos',
  'nosotros-desktop',
  'blog',
];

const etiqueta = (selector: string, crear: () => HTMLElement): HTMLElement => {
  const existente = document.head.querySelector(selector);
  if (existente) return existente as HTMLElement;
  const nueva = crear();
  document.head.appendChild(nueva);
  return nueva;
};

const meta = (atributo: 'name' | 'property', valor: string, contenido: string): void => {
  const nodo = etiqueta(`meta[${atributo}="${valor}"]`, () => {
    const nueva = document.createElement('meta');
    nueva.setAttribute(atributo, valor);
    return nueva;
  });
  nodo.setAttribute('content', contenido);
};

/** Pone título, descripción, canónica y tarjetas sociales de la pantalla. */
export const aplicarSeo = (
  pantalla: ScreenId,
  idioma: Idioma,
  parametro?: string,
): void => {
  if (typeof document === 'undefined') return;

  const { titulo, descripcion } = (idioma === 'en' ? EN : ES)[pantalla];
  const url = `${DOMINIO}${pathForScreen(pantalla, parametro)}`;

  document.title = titulo;
  meta('name', 'description', descripcion);

  const canonica = etiqueta('link[rel="canonical"]', () => {
    const nueva = document.createElement('link');
    nueva.setAttribute('rel', 'canonical');
    return nueva;
  });
  canonica.setAttribute('href', url);

  meta('property', 'og:locale', idioma === 'en' ? 'en_US' : 'es_ES');
  meta('property', 'og:title', titulo);
  meta('property', 'og:description', descripcion);
  meta('property', 'og:url', url);
  meta('name', 'twitter:title', titulo);
  meta('name', 'twitter:description', descripcion);

  // El panel de administración no pinta nada en un buscador.
  /*
   * Fuera del índice: el panel, y `casos`, que sigue publicando casos y
   * testimonios ilustrativos. Ya no está enlazada desde ningún menú.
   */
  const sinIndexar = pantalla === 'admin' || pantalla === 'casos-desktop';
  meta('name', 'robots', sinIndexar ? 'noindex, nofollow' : 'index, follow');
};

/** Título y descripción de un artículo, una vez cargado de Firestore. */
export const tituloDeArticulo = (titulo: string, resumen: string): void => {
  if (typeof document === 'undefined') return;
  const completo = `${titulo} — ${TITULO_BASE}`;
  document.title = completo;
  meta('name', 'description', resumen);
  meta('property', 'og:title', completo);
  meta('property', 'og:description', resumen);
  meta('name', 'twitter:title', completo);
  meta('name', 'twitter:description', resumen);
};
