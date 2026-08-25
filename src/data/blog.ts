import { db } from '../firebase';
import { consultar, crearDocumento, DocumentoRest } from './rest';
import { VERSION_AVISO } from '../content/legal';

/**
 * Acceso a los datos del blog: entradas, preguntas frecuentes y comentarios.
 *
 * No hay API propia: el navegador habla directo con Firestore y quien decide
 * qué se puede hacer es `firestore.rules`. Por eso aquí no hay comprobaciones
 * de permisos —serían decorativas—; solo lecturas y escrituras que las reglas
 * aceptarán o rechazarán.
 */

export interface Entrada {
  id: string;
  titulo: string;
  /** Parte de la URL: `/blog/normativa-mipymes-2026`. */
  slug: string;
  categoria: string;
  /** Entradilla que se ve en los listados. */
  resumen: string;
  /** Cuerpo del artículo en texto plano con saltos de línea. */
  cuerpo: string;
  autor: string;
  /** ISO 8601, la fija quien publica; no es la fecha de creación del documento. */
  fecha: string;
  minutos: number;
  publicada: boolean;
  /** Sale en grande arriba del listado. Solo la más reciente marcada. */
  destacada: boolean;
  /** URL de la imagen de cabecera; vacío deja el marcador de la maqueta. */
  imagen: string;
  /** Cargo del autor, para la ficha del artículo. */
  autorCargo: string;
}

export interface Pregunta {
  id: string;
  pregunta: string;
  respuesta: string;
  /** Agrupa las preguntas por sección: 'general', 'contabilidad'… */
  seccion: string;
  orden: number;
  publicada: boolean;
}

export interface Comentario {
  id: string;
  /** Slug de la entrada comentada. */
  entrada: string;
  nombre: string;
  /** No se publica: solo sirve para que el admin pueda responder. */
  correo: string;
  texto: string;
  /** uid anónimo de quien comentó; lo exige la regla de creación. */
  autor: string;
  creado: Date | null;
  /** Moderación previa: nace en false y solo el admin lo aprueba. */
  aprobado: boolean;
  /** Respuesta del equipo, que se pinta bajo el comentario. */
  respuesta: string;
}

const conId = <T>(id: string, datos: Record<string, unknown>): T =>
  ({ id, ...datos }) as T;

/* ------------------------------- entradas ------------------------------- */

/**
 * Entradas publicadas, de la más reciente a la más antigua.
 *
 * El filtro `publicada == true` no es cosmético: sin él, la consulta pediría
 * también los borradores y las reglas la rechazarían entera.
 */
const aEntrada = ({ id, datos }: DocumentoRest): Entrada => ({
  id,
  titulo: String(datos.titulo ?? ''),
  slug: String(datos.slug ?? ''),
  categoria: String(datos.categoria ?? ''),
  resumen: String(datos.resumen ?? ''),
  cuerpo: String(datos.cuerpo ?? ''),
  autor: String(datos.autor ?? ''),
  autorCargo: String(datos.autorCargo ?? ''),
  fecha: String(datos.fecha ?? ''),
  minutos: Number(datos.minutos ?? 0),
  publicada: datos.publicada === true,
  destacada: datos.destacada === true,
  imagen: String(datos.imagen ?? ''),
});

export const entradasPublicadas = async (limite?: number): Promise<Entrada[]> => {
  const documentos = await consultar({
    coleccion: 'entradas',
    donde: [{ campo: 'publicada', valor: true }],
    ordenar: { campo: 'fecha', direccion: 'DESCENDING' },
    limite,
  });
  return documentos.map(aEntrada);
};

/** Todas las entradas, borradores incluidos. Solo funciona siendo admin. */
export const todasLasEntradas = async (): Promise<Entrada[]> => {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'entradas'), orderBy('fecha', 'desc')),
  );
  return resultado.docs.map((d) => conId<Entrada>(d.id, d.data()));
};

export const entradaPorSlug = async (slug: string): Promise<Entrada | null> => {
  const [documento] = await consultar({
    coleccion: 'entradas',
    donde: [
      { campo: 'publicada', valor: true },
      { campo: 'slug', valor: slug },
    ],
    limite: 1,
  });
  return documento ? aEntrada(documento) : null;
};

export const guardarEntrada = async (
  entrada: Omit<Entrada, 'id'> & { id?: string },
): Promise<string> => {
  const { addDoc, collection, doc, setDoc } = await import('firebase/firestore');
  const { id, ...datos } = entrada;
  const base = await db();

  if (id) {
    await setDoc(doc(base, 'entradas', id), datos);
    return id;
  }

  const creado = await addDoc(collection(base, 'entradas'), datos);
  return creado.id;
};

export const borrarEntrada = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'entradas', id));
};

/* ------------------------------- preguntas ------------------------------ */

export const preguntasPublicadas = async (seccion?: string): Promise<Pregunta[]> => {
  const { collection, getDocs, orderBy, query, where } = await import(
    'firebase/firestore'
  );

  const restricciones = [
    where('publicada', '==', true),
    ...(seccion ? [where('seccion', '==', seccion)] : []),
    orderBy('orden', 'asc'),
  ];

  const resultado = await getDocs(
    query(collection(await db(), 'preguntas'), ...restricciones),
  );
  return resultado.docs.map((d) => conId<Pregunta>(d.id, d.data()));
};

export const todasLasPreguntas = async (): Promise<Pregunta[]> => {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'preguntas'), orderBy('orden', 'asc')),
  );
  return resultado.docs.map((d) => conId<Pregunta>(d.id, d.data()));
};

export const guardarPregunta = async (
  pregunta: Omit<Pregunta, 'id'> & { id?: string },
): Promise<string> => {
  const { addDoc, collection, doc, setDoc } = await import('firebase/firestore');
  const { id, ...datos } = pregunta;
  const base = await db();

  if (id) {
    await setDoc(doc(base, 'preguntas', id), datos);
    return id;
  }

  const creada = await addDoc(collection(base, 'preguntas'), datos);
  return creada.id;
};

export const borrarPregunta = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'preguntas', id));
};

/* ------------------------------ comentarios ----------------------------- */

/** El SDK devuelve Timestamp; la API REST, una fecha ya convertida. */
const aFecha = (valor: unknown): Date | null => {
  if (valor instanceof Date) return valor;
  if (valor && typeof (valor as { toDate?: unknown }).toDate === 'function') {
    return (valor as { toDate: () => Date }).toDate();
  }
  return null;
};

const aComentario = (id: string, datos: Record<string, unknown>): Comentario => ({
  id,
  entrada: String(datos.entrada ?? ''),
  nombre: String(datos.nombre ?? ''),
  correo: String(datos.correo ?? ''),
  texto: String(datos.texto ?? ''),
  autor: String(datos.autor ?? ''),
  aprobado: datos.aprobado === true,
  respuesta: String(datos.respuesta ?? ''),
  creado: aFecha(datos.creado),
});

/**
 * Comentarios aprobados de una entrada, del más antiguo al más nuevo.
 *
 * El filtro `aprobado == true` es obligatorio: sin él la consulta pediría
 * también los pendientes de moderar y las reglas la rechazarían entera.
 */
export const comentariosDe = async (slug: string): Promise<Comentario[]> => {
  const documentos = await consultar({
    coleccion: 'comentarios',
    donde: [
      { campo: 'entrada', valor: slug },
      { campo: 'aprobado', valor: true },
    ],
    ordenar: { campo: 'creado', direccion: 'ASCENDING' },
  });
  return documentos.map(({ id, datos }) => aComentario(id, datos));
};

/** Todos los comentarios para moderarlos, los ocultos incluidos. */
export const todosLosComentarios = async (): Promise<Comentario[]> => {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'comentarios'), orderBy('creado', 'desc')),
  );
  return resultado.docs.map((d) => aComentario(d.id, d.data()));
};

/**
 * Envía un comentario a la cola de moderación.
 *
 * No se publica al enviarlo, y la pantalla lo dice antes y después: es lo que
 * evita el «he comentado y no sale». Va por REST para no cargar el SDK en una
 * página que lee cualquiera.
 */
export const comentar = async (
  slug: string,
  nombre: string,
  correo: string,
  texto: string,
): Promise<void> => {
  await crearDocumento('comentarios', (uid) => ({
    entrada: slug,
    nombre: nombre.trim(),
    correo: correo.trim(),
    texto: texto.trim(),
    autor: uid,
    aprobado: false,
    consentimiento: true,
    avisoVersion: VERSION_AVISO,
    creado: new Date(),
  }));
};

/** Aprobar es lo que publica el comentario; retirar la aprobación lo esconde. */
export const aprobarComentario = async (id: string, aprobado: boolean): Promise<void> => {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(await db(), 'comentarios', id), { aprobado });
};

/** Respuesta del equipo bajo un comentario ya aprobado. */
export const responderComentario = async (id: string, respuesta: string): Promise<void> => {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(await db(), 'comentarios', id), { respuesta: respuesta.trim() });
};

export const borrarComentario = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'comentarios', id));
};
