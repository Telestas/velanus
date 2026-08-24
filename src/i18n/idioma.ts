import { useEffect, useState } from 'react';

/**
 * Idioma del sitio.
 *
 * El público objetivo es internacional, así que la página sale en el idioma
 * del visitante **sin que tenga que pulsar nada**: se mira el idioma que su
 * navegador declara y se sirve español o inglés. No hay conmutador, por
 * decisión de producto: un botón de idioma es un paso más y casi nadie lo usa.
 *
 * Cualquier idioma que no sea inglés cae en español, que es la lengua de
 * trabajo de la firma y la del mercado local.
 *
 * Para probar o para enseñar una versión concreta: `?lang=en` o `?lang=es`.
 * Ese parámetro se recuerda en el navegador, así que también sirve como
 * escape para quien prefiera leer en el otro idioma.
 */
export type Idioma = 'es' | 'en';

const CLAVE = 'velanus:idioma';

const esIdioma = (valor: unknown): valor is Idioma => valor === 'es' || valor === 'en';

/** Idioma pedido por la URL, si lo hay. */
const deLaUrl = (): Idioma | null => {
  if (typeof window === 'undefined') return null;
  const valor = new URLSearchParams(window.location.search).get('lang');
  return esIdioma(valor) ? valor : null;
};

const guardado = (): Idioma | null => {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    return esIdioma(valor) ? valor : null;
  } catch {
    return null;
  }
};

const recordar = (idioma: Idioma): void => {
  try {
    window.localStorage.setItem(CLAVE, idioma);
  } catch {
    // Sin almacenamiento se vuelve a detectar en cada visita: no pasa nada.
  }
};

/** Idioma que declara el navegador. `en-US`, `en-GB`… todos cuentan como `en`. */
const delNavegador = (): Idioma => {
  if (typeof navigator === 'undefined') return 'es';
  const preferidos = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter((etiqueta): etiqueta is string => Boolean(etiqueta));

  for (const etiqueta of preferidos) {
    const base = etiqueta.toLowerCase().split('-')[0];
    if (base === 'en') return 'en';
    if (base === 'es') return 'es';
  }

  /*
   * Un visitante alemán o francés lee antes en inglés que en español. Pero si
   * el navegador no declara nada, español: es la lengua de la firma y del
   * mercado local, y es mejor caer del lado conocido que del supuesto.
   */
  return preferidos.length ? 'en' : 'es';
};

export const detectarIdioma = (): Idioma => {
  const forzado = deLaUrl();
  if (forzado) {
    recordar(forzado);
    return forzado;
  }
  return guardado() ?? delNavegador();
};

/**
 * Idioma activo. Se resuelve una vez al cargar; sin conmutador no hay razón
 * para que cambie a mitad de sesión.
 */
export const useIdioma = (): Idioma => {
  const [idioma] = useState<Idioma>(detectarIdioma);

  useEffect(() => {
    // Que el <html lang> diga la verdad importa para buscadores y lectores
    // de pantalla, y para que el navegador no ofrezca traducir de más.
    document.documentElement.lang = idioma;
  }, [idioma]);

  return idioma;
};
