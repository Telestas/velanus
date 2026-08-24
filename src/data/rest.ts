/**
 * Acceso a Firestore por su API REST, sin el SDK.
 *
 * El SDK de Firestore pesa ~165 kB comprimidos. El blog lo lee cualquier
 * visitante y desde Cuba eso es medio segundo largo de descarga, así que el
 * sitio público habla con Firestore por HTTP directamente: las consultas caben
 * en unos cientos de bytes.
 *
 * El panel de administración sí usa el SDK (ya está cargado allí) y es quien
 * escribe artículos. Aquí solo hay lecturas públicas y los dos envíos que hace
 * un visitante: comentario y reseña, ambos a la cola de moderación.
 *
 * Las reglas de `firestore.rules` mandan igual por esta vía: la API REST las
 * aplica exactamente como el SDK.
 */

const PROYECTO = 'velanus-12056';
const API_KEY = 'AIzaSyDIIF6UQ715FhV0_jRRILbAkwyaY41Hv_c';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROYECTO}/databases/(default)/documents`;

/** Un valor de Firestore tal como lo devuelve la API REST. */
type ValorRest = Record<string, unknown>;

/** Convierte un valor REST al tipo de JavaScript que le corresponde. */
const aValor = (campo: ValorRest | undefined): unknown => {
  if (!campo) return undefined;
  if ('stringValue' in campo) return campo.stringValue;
  if ('booleanValue' in campo) return campo.booleanValue;
  if ('integerValue' in campo) return Number(campo.integerValue);
  if ('doubleValue' in campo) return campo.doubleValue;
  if ('timestampValue' in campo) return new Date(String(campo.timestampValue));
  if ('nullValue' in campo) return null;
  if ('arrayValue' in campo) {
    const valores = (campo.arrayValue as { values?: ValorRest[] })?.values ?? [];
    return valores.map(aValor);
  }
  if ('mapValue' in campo) {
    const campos = (campo.mapValue as { fields?: Record<string, ValorRest> })?.fields ?? {};
    return Object.fromEntries(Object.entries(campos).map(([k, v]) => [k, aValor(v)]));
  }
  return undefined;
};

export interface DocumentoRest {
  id: string;
  datos: Record<string, unknown>;
}

const aDocumento = (documento: {
  name: string;
  fields?: Record<string, ValorRest>;
}): DocumentoRest => ({
  id: documento.name.split('/').pop() ?? '',
  datos: Object.fromEntries(
    Object.entries(documento.fields ?? {}).map(([clave, valor]) => [clave, aValor(valor)]),
  ),
});

/** Convierte un valor de JavaScript al formato que espera la API REST. */
const aCampo = (valor: unknown): ValorRest => {
  if (typeof valor === 'string') return { stringValue: valor };
  if (typeof valor === 'boolean') return { booleanValue: valor };
  if (typeof valor === 'number')
    return Number.isInteger(valor)
      ? { integerValue: String(valor) }
      : { doubleValue: valor };
  if (valor instanceof Date) return { timestampValue: valor.toISOString() };
  return { nullValue: null };
};

interface OpcionesConsulta {
  coleccion: string;
  /** Filtros de igualdad. Ojo: deben cubrir lo que exijan las reglas. */
  donde?: { campo: string; valor: unknown }[];
  ordenar?: { campo: string; direccion: 'ASCENDING' | 'DESCENDING' };
  limite?: number;
}

/**
 * Consulta una colección. Devuelve [] si algo falla: una página del blog sin
 * artículos es un estado previsto; una página rota, no.
 */
export const consultar = async ({
  coleccion,
  donde = [],
  ordenar,
  limite,
}: OpcionesConsulta): Promise<DocumentoRest[]> => {
  const filtros = donde.map(({ campo, valor }) => ({
    fieldFilter: { field: { fieldPath: campo }, op: 'EQUAL', value: aCampo(valor) },
  }));

  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId: coleccion }],
    ...(filtros.length === 1 ? { where: filtros[0] } : {}),
    ...(filtros.length > 1
      ? { where: { compositeFilter: { op: 'AND', filters: filtros } } }
      : {}),
    ...(ordenar
      ? { orderBy: [{ field: { fieldPath: ordenar.campo }, direction: ordenar.direccion }] }
      : {}),
    ...(limite ? { limit: limite } : {}),
  };

  try {
    const respuesta = await fetch(`${BASE}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structuredQuery }),
    });
    if (!respuesta.ok) return [];

    const filas = (await respuesta.json()) as { document?: { name: string; fields?: Record<string, ValorRest> } }[];
    return filas.filter((fila) => fila.document).map((fila) => aDocumento(fila.document!));
  } catch {
    return [];
  }
};

/**
 * Sesión anónima por REST.
 *
 * Las reglas exigen estar autenticado para escribir —así cada comentario queda
 * atribuido a alguien—, pero al visitante no se le pide nada: esto ocurre solo
 * cuando pulsa «enviar».
 */
const sesionAnonima = async (): Promise<string> => {
  const respuesta = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    },
  );

  if (!respuesta.ok) throw new Error('No se pudo iniciar la sesión anónima.');
  const { idToken, localId } = await respuesta.json();
  return JSON.stringify({ idToken, localId });
};

/** Crea un documento firmado por una sesión anónima recién creada. */
export const crearDocumento = async (
  coleccion: string,
  datos: (uid: string) => Record<string, unknown>,
): Promise<void> => {
  const { idToken, localId } = JSON.parse(await sesionAnonima());

  const campos = Object.fromEntries(
    Object.entries(datos(localId)).map(([clave, valor]) => [clave, aCampo(valor)]),
  );

  const respuesta = await fetch(`${BASE}/${coleccion}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ fields: campos }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.json().catch(() => ({}));
    throw new Error(detalle?.error?.message ?? 'No se pudo guardar.');
  }
};
