import { ScreenId } from './types';
import { pathForScreen } from './router';

/**
 * Metadatos por pantalla.
 *
 * El sitio es una SPA: el HTML servido es siempre el mismo, así que sin esto
 * todas las URL comparten título y descripción, y en un buscador o al
 * compartir un enlace se ven idénticas. Aquí se actualizan al navegar.
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

const PANTALLAS: Record<ScreenId, Metadatos> = {
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
  // El panel no debe aparecer en buscadores; se marca con noindex.
  admin: {
    titulo: `Administración — ${TITULO_BASE}`,
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
  'casos-desktop',
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
export const aplicarSeo = (pantalla: ScreenId): void => {
  if (typeof document === 'undefined') return;

  const { titulo, descripcion } = PANTALLAS[pantalla];
  const url = `${DOMINIO}${pathForScreen(pantalla)}`;

  document.title = titulo;
  meta('name', 'description', descripcion);

  const canonica = etiqueta('link[rel="canonical"]', () => {
    const nueva = document.createElement('link');
    nueva.setAttribute('rel', 'canonical');
    return nueva;
  });
  canonica.setAttribute('href', url);

  meta('property', 'og:title', titulo);
  meta('property', 'og:description', descripcion);
  meta('property', 'og:url', url);
  meta('name', 'twitter:title', titulo);
  meta('name', 'twitter:description', descripcion);

  // El panel de administración no pinta nada en un buscador.
  meta('name', 'robots', pantalla === 'admin' ? 'noindex, nofollow' : 'index, follow');
};
