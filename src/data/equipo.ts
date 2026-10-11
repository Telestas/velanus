import { db } from '../firebase';
import { leerDocumento } from './rest';

/** Perfiles editados desde el panel y publicados en «Nosotros». */
export interface MiembroEquipo {
  id: string;
  nombre: string;
  cargo: string;
  perfil: string;
  cargoEn: string;
  perfilEn: string;
  foto: string;
  orden: number;
}

const normalizar = (valor: unknown): MiembroEquipo[] => {
  if (!Array.isArray(valor)) return [];
  return valor.flatMap((dato) => {
    if (!dato || typeof dato !== 'object') return [];
    const miembro = dato as Record<string, unknown>;
    if (typeof miembro.id !== 'string' || typeof miembro.nombre !== 'string') return [];
    return [{
      id: miembro.id,
      nombre: miembro.nombre,
      cargo: String(miembro.cargo ?? ''),
      perfil: String(miembro.perfil ?? ''),
      cargoEn: String(miembro.cargoEn ?? ''),
      perfilEn: String(miembro.perfilEn ?? ''),
      foto: String(miembro.foto ?? ''),
      orden: Number(miembro.orden ?? 0),
    }];
  }).sort((a, b) => a.orden - b.orden);
};

/** La lectura pública usa REST, igual que las cifras y el blog. */
export const miembrosPublicados = async (): Promise<MiembroEquipo[]> => {
  try {
    const documento = await leerDocumento('sitio', 'equipo');
    return normalizar(documento.datos.miembros);
  } catch {
    // Antes de crear el primer perfil todavía no existe sitio/equipo.
    return [];
  }
};

export const todosLosMiembros = async (): Promise<MiembroEquipo[]> => {
  const { doc, getDoc } = await import('firebase/firestore');
  const documento = await getDoc(doc(await db(), 'sitio', 'equipo'));
  return normalizar(documento.data()?.miembros);
};

export const guardarMiembro = async (miembro: MiembroEquipo): Promise<void> => {
  const { doc, runTransaction } = await import('firebase/firestore');
  const referencia = doc(await db(), 'sitio', 'equipo');
  await runTransaction(await db(), async (transaccion) => {
    const documento = await transaccion.get(referencia);
    const miembros = normalizar(documento.data()?.miembros);
    const posicion = miembros.findIndex((actual) => actual.id === miembro.id);
    if (posicion < 0) miembros.push(miembro);
    else miembros[posicion] = miembro;
    transaccion.set(referencia, { miembros });
  });
};

export const borrarMiembro = async (id: string): Promise<void> => {
  const { doc, runTransaction } = await import('firebase/firestore');
  const referencia = doc(await db(), 'sitio', 'equipo');
  await runTransaction(await db(), async (transaccion) => {
    const documento = await transaccion.get(referencia);
    transaccion.set(referencia, {
      miembros: normalizar(documento.data()?.miembros).filter((miembro) => miembro.id !== id),
    });
  });
};
