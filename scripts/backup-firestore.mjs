#!/usr/bin/env node
/**
 * Copia las colecciones de Firestore a un JSON local sin exigir el plan Blaze.
 *
 * Requisitos:
 *   1. Tener Firebase CLI instalada.
 *   2. Haber iniciado sesión con `firebase login` usando una cuenta con acceso
 *      al proyecto velanus-12056.
 *
 * Uso:
 *   npm run backup
 *   npm run backup -- --output /ruta/segura/copia.json
 *
 * El JSON contiene datos personales. Por defecto se guarda con permisos 0600
 * dentro de backups/, una carpeta excluida de Git.
 */

import { execFileSync } from 'node:child_process';
import {
  chmodSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const PROYECTO = 'velanus-12056';
const COLECCIONES = [
  'admins',
  'entradas',
  'preguntas',
  'comentarios',
  'resenas',
  'consultas',
  'sitio',
];
const BASE =
  `https://firestore.googleapis.com/v1/projects/${PROYECTO}` +
  '/databases/(default)/documents';

const argumento = (nombre) => {
  const indice = process.argv.indexOf(nombre);
  return indice >= 0 ? process.argv[indice + 1] : undefined;
};

if (process.argv.includes('--help')) {
  console.log('Uso: npm run backup -- [--output /ruta/copia.json]');
  process.exit(0);
}

/** Hace que Firebase CLI renueve el access token si está caducado. */
const refrescarSesion = () => {
  try {
    execFileSync('firebase', ['projects:list', '--json'], { stdio: 'ignore' });
  } catch {
    throw new Error('No hay una sesión válida. Ejecute `firebase login --reauth`.');
  }
};

const tokenDeLaCli = () => {
  const ruta = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
  try {
    const token = JSON.parse(readFileSync(ruta, 'utf8'))?.tokens?.access_token;
    if (!token) throw new Error('sin token');
    return token;
  } catch {
    throw new Error('No se encontró la sesión de Firebase CLI. Ejecute `firebase login`.');
  }
};

const leerColeccion = async (coleccion, token) => {
  const documentos = [];
  let pagina = '';

  do {
    const url = new URL(`${BASE}/${encodeURIComponent(coleccion)}`);
    url.searchParams.set('pageSize', '300');
    if (pagina) url.searchParams.set('pageToken', pagina);

    const respuesta = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cuerpo = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      const detalle = cuerpo?.error?.message ?? `HTTP ${respuesta.status}`;
      throw new Error(`${coleccion}: ${detalle}`);
    }

    documentos.push(...(cuerpo.documents ?? []));
    pagina = cuerpo.nextPageToken ?? '';
  } while (pagina);

  return documentos;
};

const marca = new Date().toISOString();
const nombreSeguro = marca.replaceAll(':', '-').replaceAll('.', '-');
const salida = resolve(
  argumento('--output') ?? `backups/firestore-${nombreSeguro}.json`,
);
const temporal = `${salida}.tmp`;

try {
  refrescarSesion();
  const token = tokenDeLaCli();
  const colecciones = {};

  for (const nombre of COLECCIONES) {
    const documentos = await leerColeccion(nombre, token);
    colecciones[nombre] = documentos;
    console.log(`${nombre}: ${documentos.length} documento(s)`);
  }

  const copia = {
    formato: 'velanus-firestore-backup-v1',
    proyecto: PROYECTO,
    creado: marca,
    colecciones,
  };

  mkdirSync(dirname(salida), { recursive: true });
  writeFileSync(temporal, `${JSON.stringify(copia, null, 2)}\n`, {
    encoding: 'utf8',
    mode: 0o600,
  });
  renameSync(temporal, salida);
  chmodSync(salida, 0o600);
  console.log(`Copia guardada en ${salida}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
