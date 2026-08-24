import { useEffect, useState } from 'react';
import { anosOperando } from '../config';
import { Idioma } from '../i18n/idioma';

/**
 * Cifras de escaparate que la firma edita desde el panel.
 *
 * Los años operando NO están aquí: se calculan a partir de la fecha de inicio
 * (`anosOperando()` en `config.ts`), porque un número que sube solo cada año no
 * debería depender de que alguien se acuerde de tocarlo.
 *
 * OJO CON EL PESO: esto lo lee el sitio público, así que la lectura se hace con
 * un `fetch` a la API REST de Firestore en vez de con el SDK. El SDK son ~165 kB
 * comprimidos; esta petición son unos cientos de bytes. Para conexiones cubanas
 * la diferencia importa. El panel sí usa el SDK, que allí ya está cargado.
 */

/** Qué cifra es cada hueco de la maqueta. */
export type ClaveCifra =
  | 'anos'
  | 'entidades'
  | 'clientes'
  | 'paises'
  | 'profesionales'
  | 'idiomas';

export interface Cifras {
  entidades: string;
  clientes: string;
  paises: string;
  profesionales: string;
}

/** Lo que se pinta mientras no haya nada guardado. */
export const CIFRAS_VACIAS: Cifras = {
  entidades: '',
  clientes: '',
  paises: '',
  profesionales: '',
};

const PROYECTO = 'velanus-12056';
const API_KEY = 'AIzaSyDIIF6UQ715FhV0_jRRILbAkwyaY41Hv_c';
const RUTA = `https://firestore.googleapis.com/v1/projects/${PROYECTO}/databases/(default)/documents/sitio/cifras?key=${API_KEY}`;

const CLAVES: (keyof Cifras)[] = ['entidades', 'clientes', 'paises', 'profesionales'];

/**
 * Lee las cifras publicadas. Nunca lanza: si Firestore no responde, el sitio
 * se pinta con los marcadores de siempre en vez de romperse.
 */
export const leerCifras = async (): Promise<Cifras> => {
  try {
    const respuesta = await fetch(RUTA);
    if (!respuesta.ok) return CIFRAS_VACIAS;

    const campos = (await respuesta.json())?.fields ?? {};
    const cifras = { ...CIFRAS_VACIAS };
    for (const clave of CLAVES) {
      const valor = campos[clave]?.stringValue;
      if (typeof valor === 'string') cifras[clave] = valor.trim();
    }
    return cifras;
  } catch {
    return CIFRAS_VACIAS;
  }
};

/*
 * Una sola petición por carga de página, compartida por todas las pantallas
 * que muestran cifras (la home y Nosotros).
 */
let enCurso: Promise<Cifras> | null = null;

export const cifrasCompartidas = (): Promise<Cifras> => {
  if (!enCurso) enCurso = leerCifras();
  return enCurso;
};

/** Olvida la caché para que el panel vea sus propios cambios al guardar. */
export const olvidarCifras = (): void => {
  enCurso = null;
};

/**
 * Cifras para pintar. Empieza vacío y se rellena cuando llega la respuesta:
 * el texto de alrededor no espera a la red.
 */
export const useCifras = (): Cifras => {
  const [cifras, setCifras] = useState<Cifras>(CIFRAS_VACIAS);

  useEffect(() => {
    let vivo = true;
    void cifrasCompartidas().then((leidas) => {
      if (vivo) setCifras(leidas);
    });
    return () => {
      vivo = false;
    };
  }, []);

  return cifras;
};

/** Escribe las cifras. Solo funciona siendo admin: lo imponen las reglas. */
export const guardarCifras = async (cifras: Cifras): Promise<void> => {
  const { db } = await import('../firebase');
  const { doc, setDoc } = await import('firebase/firestore');

  const datos = Object.fromEntries(
    CLAVES.map((clave) => [clave, cifras[clave].trim()]),
  );

  await setDoc(doc(await db(), 'sitio', 'cifras'), datos);
  olvidarCifras();
};

/**
 * Valor que se pinta en cada hueco.
 *
 * `anos` se calcula, `idiomas` es texto fijo y el resto sale de lo que la firma
 * haya guardado en el panel. Lo que no esté guardado se pinta como pendiente,
 * a la vista: es preferible un hueco declarado a un número inventado.
 */
export const valorDeCifra = (
  clave: ClaveCifra,
  cifras: Cifras,
  idioma: Idioma,
): string => {
  if (clave === 'anos') return String(anosOperando());
  if (clave === 'idiomas') return idioma === 'en' ? 'Spanish · English' : 'Español · Inglés';
  return cifras[clave] || (idioma === 'en' ? '[PENDING]' : '[PENDIENTE]');
};
