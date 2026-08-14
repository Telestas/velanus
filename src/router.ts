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
  'nosotros-desktop': 'nosotros',
  'casos-desktop': 'casos',
};

/** BASE_URL siempre trae barra final ('/velanus/' o '/'). */
const BASE = import.meta.env.BASE_URL;

export const pathForScreen = (screen: ScreenId): string =>
  BASE + SCREEN_SLUGS[screen];

/** Resuelve la pantalla a partir de la URL; si no coincide, cae en la home. */
export const screenForPath = (pathname: string): ScreenId => {
  const slug = pathname
    .slice(pathname.startsWith(BASE) ? BASE.length : 0)
    .replace(/^\/+|\/+$/g, '');

  const match = (Object.keys(SCREEN_SLUGS) as ScreenId[]).find(
    (screen) => SCREEN_SLUGS[screen] === slug,
  );

  return match ?? 'home-desktop';
};

/** Pantalla correspondiente a la URL actual del navegador. */
export const currentScreen = (): ScreenId =>
  screenForPath(window.location.pathname);

/** Orden lógico del sitio; solo se usa para animar hacia el lado correcto. */
const SCREEN_ORDER: ScreenId[] = [
  'home-desktop',
  'home-movil',
  'servicios-desktop',
  'nosotros-desktop',
  'casos-desktop',
];

/** Ir "hacia atrás" en el orden anima con push_back; hacia adelante, push. */
export const directionTo = (
  from: ScreenId,
  to: ScreenId,
): 'push' | 'push_back' =>
  SCREEN_ORDER.indexOf(to) < SCREEN_ORDER.indexOf(from) ? 'push_back' : 'push';
