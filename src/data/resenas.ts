import { db } from '../firebase';
import { consultar, crearDocumento } from './rest';

/**
 * Reseñas de clientes.
 *
 * Viven dentro del blog, no en una página aparte, y **pasan por aprobación**:
 * se envían para revisión y no aparecen hasta que un administrador las acepta.
 * Para un despacho, publicar valoraciones sin filtro es un riesgo que no
 * compensa.
 */

export interface Resena {
  id: string;
  nombre: string;
  pais: string;
  /** Línea de servicio recibida; es el filtro de la sección. */
  servicio: string;
  estrellas: number;
  texto: string;
  creado: Date | null;
  aprobada: boolean;
  autor: string;
}

export type ResenaNueva = Pick<Resena, 'nombre' | 'pais' | 'servicio' | 'estrellas' | 'texto'>;

const aResena = (id: string, datos: Record<string, unknown>): Resena => ({
  id,
  nombre: String(datos.nombre ?? ''),
  pais: String(datos.pais ?? ''),
  servicio: String(datos.servicio ?? ''),
  estrellas: Number(datos.estrellas ?? 5),
  texto: String(datos.texto ?? ''),
  aprobada: datos.aprobada === true,
  autor: String(datos.autor ?? ''),
  creado:
    datos.creado instanceof Date
      ? datos.creado
      : datos.creado && typeof (datos.creado as { toDate?: unknown }).toDate === 'function'
        ? (datos.creado as { toDate: () => Date }).toDate()
        : null,
});

/**
 * Reseñas publicadas, de la más reciente a la más antigua.
 *
 * El filtro `aprobada == true` es obligatorio: sin él la consulta pediría
 * también las pendientes y las reglas la rechazarían entera.
 */
export const resenasPublicadas = async (limite?: number): Promise<Resena[]> => {
  const documentos = await consultar({
    coleccion: 'resenas',
    donde: [{ campo: 'aprobada', valor: true }],
    ordenar: { campo: 'creado', direccion: 'DESCENDING' },
    limite,
  });
  return documentos.map(({ id, datos }) => aResena(id, datos));
};

/** Envía una reseña a la cola de moderación. No se publica al enviarla. */
export const enviarResena = async (resena: ResenaNueva): Promise<void> => {
  await crearDocumento('resenas', (uid) => ({
    nombre: resena.nombre.trim(),
    pais: resena.pais.trim(),
    servicio: resena.servicio,
    estrellas: resena.estrellas,
    texto: resena.texto.trim(),
    autor: uid,
    aprobada: false,
    creado: new Date(),
  }));
};

/* --------------------------- solo administración -------------------------- */

export const todasLasResenas = async (): Promise<Resena[]> => {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'resenas'), orderBy('creado', 'desc')),
  );
  return resultado.docs.map((d) => aResena(d.id, d.data()));
};

export const aprobarResena = async (id: string, aprobada: boolean): Promise<void> => {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(await db(), 'resenas', id), { aprobada });
};

export const borrarResena = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'resenas', id));
};
