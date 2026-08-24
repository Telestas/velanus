import { db } from '../firebase';

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
  texto: string;
  /** uid anónimo de quien comentó; lo exige la regla de creación. */
  autor: string;
  creado: Date | null;
  oculto: boolean;
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
export const entradasPublicadas = async (limite?: number): Promise<Entrada[]> => {
  const { collection, getDocs, limit, orderBy, query, where } = await import(
    'firebase/firestore'
  );

  const restricciones = [
    where('publicada', '==', true),
    orderBy('fecha', 'desc'),
    ...(limite ? [limit(limite)] : []),
  ];

  const resultado = await getDocs(
    query(collection(await db(), 'entradas'), ...restricciones),
  );

  return resultado.docs.map((d) => conId<Entrada>(d.id, d.data()));
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
  const { collection, getDocs, limit, query, where } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'entradas'), where('slug', '==', slug), limit(1)),
  );
  const [documento] = resultado.docs;
  return documento ? conId<Entrada>(documento.id, documento.data()) : null;
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

const aComentario = (id: string, datos: Record<string, unknown>): Comentario => ({
  id,
  entrada: String(datos.entrada ?? ''),
  nombre: String(datos.nombre ?? ''),
  texto: String(datos.texto ?? ''),
  autor: String(datos.autor ?? ''),
  oculto: datos.oculto === true,
  // `creado` llega como Timestamp; en el instante justo tras escribir es null.
  creado:
    datos.creado && typeof (datos.creado as { toDate?: unknown }).toDate === 'function'
      ? (datos.creado as { toDate: () => Date }).toDate()
      : null,
});

/** Comentarios visibles de una entrada, del más antiguo al más nuevo. */
export const comentariosDe = async (slug: string): Promise<Comentario[]> => {
  const { collection, getDocs, orderBy, query, where } = await import(
    'firebase/firestore'
  );
  const resultado = await getDocs(
    query(
      collection(await db(), 'comentarios'),
      where('entrada', '==', slug),
      orderBy('creado', 'asc'),
    ),
  );
  return resultado.docs
    .map((d) => aComentario(d.id, d.data()))
    .filter((comentario) => !comentario.oculto);
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
 * Publica un comentario.
 *
 * Firma con una sesión anónima si no hay ninguna: la regla exige un uid para
 * poder atribuir el comentario, pero al lector no se le pide registrarse.
 */
export const comentar = async (
  slug: string,
  nombre: string,
  texto: string,
): Promise<void> => {
  const { auth } = await import('../firebase');
  const { signInAnonymously } = await import('firebase/auth');
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

  const sesion = await auth();
  const usuario = sesion.currentUser ?? (await signInAnonymously(sesion)).user;

  await addDoc(collection(await db(), 'comentarios'), {
    entrada: slug,
    nombre: nombre.trim(),
    texto: texto.trim(),
    autor: usuario.uid,
    oculto: false,
    creado: serverTimestamp(),
  });
};

export const ocultarComentario = async (id: string, oculto: boolean): Promise<void> => {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(await db(), 'comentarios', id), { oculto });
};

export const borrarComentario = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'comentarios', id));
};
