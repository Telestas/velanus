import { ScreenId } from './types';

/**
 * Router mínimo sobre la History API.
 *
 * Cada pantalla tiene una URL propia para que se pueda compartir, marcar como
 * favorito y recargar. En GitHub Pages el sitio cuelga de un subpath
 * (/velanus/), que Vite expone en BASE_URL; todo el cálculo de rutas parte de
 * ahí para que funcione igual en local (donde la base es '/').
 */

/** Slug de cada pantalla, relativo a la base. La home es la cadena vacía. */
const SCREEN_SLUGS: Record<ScreenId, string> = {
  'home-desktop': '',
  'home-movil': 'movil',
  'servicios-desktop': 'servicios',
  'servicios-contabilidad': 'servicios/contabilidad',
  'servicios-legal': 'servicios/legal',
  'servicios-tramites': 'servicios/tramites-y-visas',
  'servicios-eventos': 'servicios/eventos',
  'nosotros-desktop': 'nosotros',
  'casos-desktop': 'casos',
  blog: 'blog',
  // La parte variable la añade `pathForScreen`; aquí solo consta el prefijo.
  'blog-articulo': 'blog',
  admin: 'admin',
};

/** BASE_URL siempre trae barra final ('/velanus/' o '/'). */
const BASE = import.meta.env.BASE_URL;

export const pathForScreen = (screen: ScreenId, parametro?: string): string =>
  screen === 'blog-articulo' && parametro
    ? `${BASE}blog/${parametro}`
    : BASE + SCREEN_SLUGS[screen];

/** Resuelve la pantalla a partir de la URL; si no coincide, cae en la home. */
const slugDeRuta = (pathname: string): string =>
  pathname
    .slice(pathname.startsWith(BASE) ? BASE.length : 0)
    .replace(/^\/+|\/+$/g, '');

export const screenForPath = (pathname: string): ScreenId => {
  const slug = slugDeRuta(pathname);

  // Un artículo es cualquier cosa colgando de /blog/.
  if (slug.startsWith('blog/') && slug.length > 'blog/'.length) return 'blog-articulo';

  const match = (Object.keys(SCREEN_SLUGS) as ScreenId[]).find(
    (screen) => screen !== 'blog-articulo' && SCREEN_SLUGS[screen] === slug,
  );

  return match ?? 'home-desktop';
};

/** Slug del artículo que pide la URL, si es que pide uno. */
export const articuloDeRuta = (pathname: string): string | undefined => {
  const slug = slugDeRuta(pathname);
  return slug.startsWith('blog/') ? slug.slice('blog/'.length) : undefined;
};

/** Pantalla correspondiente a la URL actual del navegador. */
export const currentScreen = (): ScreenId =>
  screenForPath(window.location.pathname);

/** Orden lógico del sitio; solo se usa para animar hacia el lado correcto. */
const SCREEN_ORDER: ScreenId[] = [
  'home-desktop',
  'home-movil',
  'servicios-desktop',
  'servicios-contabilidad',
  'servicios-legal',
  'servicios-tramites',
  'servicios-eventos',
  'nosotros-desktop',
  'casos-desktop',
  'blog',
  'blog-articulo',
  'admin',
];

/** Ir "hacia atrás" en el orden anima con push_back; hacia adelante, push. */
export const directionTo = (
  from: ScreenId,
  to: ScreenId,
): 'push' | 'push_back' =>
  SCREEN_ORDER.indexOf(to) < SCREEN_ORDER.indexOf(from) ? 'push_back' : 'push';
