/**
 * Variante visual de la home.
 *
 * El diseño entregó dos direcciones completas para la misma home:
 *
 * - `oscuro` (1a en la maqueta): portada negra a página completa, servicios en
 *   tarjetas, proceso vertical. Ancla de autoridad.
 * - `claro` (1b): portada clara y editorial con las cifras integradas,
 *   servicios en filas, proceso horizontal.
 *
 * Ambas están implementadas. Cuál se sirve se decide así, de más a menos
 * prioridad:
 *
 * 1. `?tema=claro|oscuro` en la URL (para enseñar una u otra sin tocar nada).
 * 2. Lo que haya elegido este navegador en /admin (localStorage).
 * 3. `DEFAULT_HOME_VARIANT`, aquí abajo.
 *
 * OJO: el sitio es estático (GitHub Pages, sin backend). Lo que se elige en
 * /admin vale SOLO para ese navegador. Para cambiar lo que ven todos los
 * visitantes hay que cambiar `DEFAULT_HOME_VARIANT` y desplegar.
 */

export type HomeVariant = 'oscuro' | 'claro';

/** La variante que ve cualquier visitante que no haya elegido otra cosa. */
export const DEFAULT_HOME_VARIANT: HomeVariant = 'oscuro';

export const HOME_VARIANTS: { id: HomeVariant; label: string; description: string }[] = [
  {
    id: 'oscuro',
    label: 'Modo oscuro',
    description:
      'Portada negra a página completa, cifras sobre banda ámbar, servicios en tarjetas y proceso vertical.',
  },
  {
    id: 'claro',
    label: 'Modo claro',
    description:
      'Portada clara y editorial con las cifras en un panel negro, servicios en filas y proceso horizontal.',
  },
];

const STORAGE_KEY = 'velanus:home-variant';

/** Evento propio para que las pantallas abiertas reaccionen al cambio. */
const CHANGE_EVENT = 'velanus:home-variant-change';

const isVariant = (value: unknown): value is HomeVariant =>
  value === 'oscuro' || value === 'claro';

/** Variante forzada por la URL, si la hay. */
const variantFromQuery = (): HomeVariant | null => {
  if (typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get('tema');
  return isVariant(value) ? value : null;
};

/** Variante fijada en este navegador desde /admin, si la hay. */
export const storedHomeVariant = (): HomeVariant | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isVariant(value) ? value : null;
  } catch {
    // Navegador con el almacenamiento bloqueado: se cae al valor por defecto.
    return null;
  }
};

/** La variante que toca pintar ahora mismo. */
export const resolveHomeVariant = (): HomeVariant =>
  variantFromQuery() ?? storedHomeVariant() ?? DEFAULT_HOME_VARIANT;

/**
 * Fija la variante para este navegador. `null` borra la preferencia y vuelve a
 * dejar mandar a DEFAULT_HOME_VARIANT.
 */
export const setStoredHomeVariant = (variant: HomeVariant | null): void => {
  try {
    if (variant) window.localStorage.setItem(STORAGE_KEY, variant);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin almacenamiento no se puede recordar; el cambio dura lo que la sesión.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

/** Avisa cuando la variante cambia, aquí o en otra pestaña. */
export const onHomeVariantChange = (listener: () => void): (() => void) => {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
};
