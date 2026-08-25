import { db } from '../firebase';
import { VERSION_AVISO } from '../content/legal';

/**
 * Consultas que llegan por los formularios del sitio.
 *
 * Antes de esto, el formulario de diagnóstico solo cambiaba a estado «enviado»
 * en local: cada persona que lo rellenaba se perdía. Ahora se guarda en
 * Firestore, y solo el admin puede leerlas (son datos personales).
 *
 * WhatsApp sigue siendo la vía rápida, pero ya no es la única: si el visitante
 * no llega a mandar el mensaje, la consulta está igualmente registrada.
 */

export interface Consulta {
  id: string;
  nombre: string;
  empresa?: string;
  telefono?: string;
  correo?: string;
  servicio?: string;
  pais?: string;
  mensaje?: string;
  /** Qué formulario la originó: 'diagnostico', 'contacto-home'… */
  origen: string;
  creado: Date | null;
  atendida: boolean;
  /** Versión de la política de privacidad que aceptó al enviar. */
  avisoVersion: string;
}

export type ConsultaNueva = Omit<Consulta, 'id' | 'creado' | 'atendida' | 'avisoVersion'>;

/**
 * Guarda una consulta.
 *
 * Firma con una sesión anónima si no hay ninguna: las reglas exigen estar
 * autenticado para escribir, pero al visitante no se le pide nada.
 */
export const guardarConsulta = async (consulta: ConsultaNueva): Promise<void> => {
  const { auth } = await import('../firebase');
  const { signInAnonymously } = await import('firebase/auth');
  const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

  const sesion = await auth();
  if (!sesion.currentUser) await signInAnonymously(sesion);

  // Firestore rechaza `undefined`, y las reglas solo aceptan las claves
  // declaradas: se envían únicamente los campos con contenido.
  const datos: Record<string, unknown> = {
    nombre: consulta.nombre.trim(),
    origen: consulta.origen,
    atendida: false,
    // Qué versión de la política aceptó, no solo que aceptó algo.
    consentimiento: true,
    avisoVersion: VERSION_AVISO,
    creado: serverTimestamp(),
  };

  for (const clave of ['empresa', 'telefono', 'correo', 'servicio', 'pais', 'mensaje'] as const) {
    const valor = consulta[clave]?.trim();
    if (valor) datos[clave] = valor.slice(0, 2000);
  }

  await addDoc(collection(await db(), 'consultas'), datos);
};

export const consultas = async (): Promise<Consulta[]> => {
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const resultado = await getDocs(
    query(collection(await db(), 'consultas'), orderBy('creado', 'desc')),
  );

  return resultado.docs.map((documento) => {
    const datos = documento.data();
    return {
      id: documento.id,
      nombre: String(datos.nombre ?? ''),
      empresa: datos.empresa ? String(datos.empresa) : undefined,
      telefono: datos.telefono ? String(datos.telefono) : undefined,
      correo: datos.correo ? String(datos.correo) : undefined,
      servicio: datos.servicio ? String(datos.servicio) : undefined,
      pais: datos.pais ? String(datos.pais) : undefined,
      mensaje: datos.mensaje ? String(datos.mensaje) : undefined,
      origen: String(datos.origen ?? ''),
      atendida: datos.atendida === true,
      avisoVersion: String(datos.avisoVersion ?? ''),
      creado:
        datos.creado && typeof (datos.creado as { toDate?: unknown }).toDate === 'function'
          ? (datos.creado as { toDate: () => Date }).toDate()
          : null,
    };
  });
};

export const marcarAtendida = async (id: string, atendida: boolean): Promise<void> => {
  const { doc, updateDoc } = await import('firebase/firestore');
  await updateDoc(doc(await db(), 'consultas', id), { atendida });
};

export const borrarConsulta = async (id: string): Promise<void> => {
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'consultas', id));
};
