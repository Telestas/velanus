import { useEffect, useState } from 'react';
import { contenidoServicios } from '../content/servicios';
import { db } from '../firebase';
import { Idioma } from '../i18n/idioma';
import { leerDocumento } from './rest';

export const CLAVES_SERVICIO = ['contabilidad', 'legal', 'tramites', 'eventos'] as const;
export type ClaveServicio = typeof CLAVES_SERVICIO[number];
export interface PlazoEditable { es: string; en: string }
export type PlazosEditables = Record<ClaveServicio, PlazoEditable[]>;

export const plazosVacios = (): PlazosEditables =>
  Object.fromEntries(CLAVES_SERVICIO.map((clave) => [
    clave,
    contenidoServicios('es').lineas.find((linea) => linea.pantalla === `servicios-${clave}`)!
      .plazos.map(() => ({ es: '', en: '' })),
  ])) as PlazosEditables;

const normalizar = (datos: Record<string, unknown>): PlazosEditables => {
  const vacios = plazosVacios();
  for (const clave of CLAVES_SERVICIO) {
    const valores = datos[clave];
    if (!Array.isArray(valores)) continue;
    vacios[clave] = vacios[clave].map((_, i) => {
      const valor = valores[i];
      if (!valor || typeof valor !== 'object') return { es: '', en: '' };
      const campos = valor as Record<string, unknown>;
      return { es: String(campos.es ?? ''), en: String(campos.en ?? '') };
    });
  }
  return vacios;
};

/** Valores públicos de sitio/plazos; la maqueta sigue siendo el respaldo. */
export const leerPlazos = async (): Promise<PlazosEditables> => {
  try {
    const documento = await leerDocumento('sitio', 'plazos');
    return normalizar(documento.datos);
  } catch {
    return plazosVacios();
  }
};

export const leerPlazosAdmin = async (): Promise<PlazosEditables> => {
  const { doc, getDoc } = await import('firebase/firestore');
  const documento = await getDoc(doc(await db(), 'sitio', 'plazos'));
  return normalizar(documento.data() ?? {});
};

export const guardarPlazos = async (plazos: PlazosEditables): Promise<void> => {
  const { doc, setDoc } = await import('firebase/firestore');
  const datos = Object.fromEntries(CLAVES_SERVICIO.map((clave) => [
    clave,
    plazos[clave].map(({ es, en }) => ({ es: es.trim(), en: en.trim() })),
  ]));
  await setDoc(doc(await db(), 'sitio', 'plazos'), datos);
};

export const usarPlazos = (): PlazosEditables => {
  const [plazos, setPlazos] = useState(plazosVacios);
  useEffect(() => {
    let activo = true;
    void leerPlazos().then((leidos) => {
      if (activo) setPlazos(leidos);
    });
    return () => { activo = false; };
  }, []);
  return plazos;
};

export const textoDePlazo = (
  valor: PlazoEditable | undefined,
  idioma: Idioma,
  pendiente: string,
): string => (idioma === 'en' ? valor?.en.trim() || valor?.es.trim() : valor?.es.trim()) || pendiente;
