#!/usr/bin/env node
/**
 * Da de alta a un administrador del panel.
 *
 *   node scripts/alta-admin.mjs correo@ejemplo.com
 *
 * Hace dos cosas:
 *
 *  1. Crea la cuenta en Firebase Auth (si no existía) con una contraseña
 *     aleatoria que no se guarda en ningún sitio, y envía al correo el enlace
 *     para elegir contraseña. Así la contraseña real no pasa por aquí.
 *  2. Escribe `admins/{uid}` en Firestore. Esa colección está cerrada a
 *     cal y canto en las reglas: solo se puede escribir con credenciales de
 *     servidor, que es lo que usa este script (el token de la CLI de Firebase).
 *
 * Requisitos: haber hecho `firebase login` y tener Authentication activado en
 * la consola, con el proveedor «Correo electrónico/contraseña».
 */

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PROYECTO = 'velanus-12056';
const API_KEY = 'AIzaSyDIIF6UQ715FhV0_jRRILbAkwyaY41Hv_c';

const correo = process.argv[2];
if (!correo || !correo.includes('@')) {
  console.error('Uso: node scripts/alta-admin.mjs correo@ejemplo.com');
  process.exit(1);
}

/** Token de la sesión de la CLI de Firebase (`firebase login`). */
const tokenDeLaCli = () => {
  const ruta = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
  try {
    const token = JSON.parse(readFileSync(ruta, 'utf8'))?.tokens?.access_token;
    if (!token) throw new Error('sin token');
    return token;
  } catch {
    console.error('No hay sesión de la CLI. Ejecute: firebase login');
    process.exit(1);
  }
};

const pedir = async (url, opciones) => {
  const respuesta = await fetch(url, opciones);
  const cuerpo = await respuesta.json().catch(() => ({}));
  return { ok: respuesta.ok, cuerpo };
};

const claveAleatoria = () =>
  `Vn-${Buffer.from(crypto.getRandomValues(new Uint8Array(18))).toString('base64url')}`;

const identity = (metodo) =>
  `https://identitytoolkit.googleapis.com/v1/accounts:${metodo}?key=${API_KEY}`;

/** Crea la cuenta; si ya existe, recupera su uid iniciando sesión no es posible,
 *  así que se busca con la API de administración. */
const altaOBusqueda = async (token) => {
  const alta = await pedir(identity('signUp'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: correo, password: claveAleatoria(), returnSecureToken: false }),
  });

  if (alta.ok) {
    console.log(`Cuenta creada: ${correo}`);
    return { uid: alta.cuerpo.localId, nueva: true };
  }

  const error = alta.cuerpo?.error?.message ?? '';

  if (error.startsWith('EMAIL_EXISTS')) {
    const busqueda = await pedir(
      `https://identitytoolkit.googleapis.com/v1/projects/${PROYECTO}/accounts:lookup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: [correo] }),
      },
    );
    const uid = busqueda.cuerpo?.users?.[0]?.localId;
    if (!uid) {
      console.error('La cuenta existe pero no se pudo leer su uid:', busqueda.cuerpo);
      process.exit(1);
    }
    console.log(`La cuenta ya existía: ${correo}`);
    return { uid, nueva: false };
  }

  if (error.startsWith('CONFIGURATION_NOT_FOUND') || error.startsWith('OPERATION_NOT_ALLOWED')) {
    console.error(
      'Falta activar Authentication y el proveedor «Correo electrónico/contraseña» en:\n' +
        `https://console.firebase.google.com/project/${PROYECTO}/authentication/providers`,
    );
    process.exit(1);
  }

  console.error('No se pudo crear la cuenta:', error || alta.cuerpo);
  process.exit(1);
};

const marcarComoAdmin = async (token, uid) => {
  const url =
    `https://firestore.googleapis.com/v1/projects/${PROYECTO}/databases/(default)/documents/admins/${uid}`;
  const { ok, cuerpo } = await pedir(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      fields: {
        correo: { stringValue: correo },
        alta: { timestampValue: new Date().toISOString() },
      },
    }),
  });

  if (!ok) {
    console.error('No se pudo escribir admins/' + uid + ':', cuerpo);
    process.exit(1);
  }
  console.log(`Permisos de administración concedidos (admins/${uid}).`);
};

const enviarEnlaceDeContrasena = async () => {
  const { ok, cuerpo } = await pedir(identity('sendOobCode'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestType: 'PASSWORD_RESET', email: correo }),
  });
  if (!ok) {
    console.error('No se pudo enviar el correo para elegir contraseña:', cuerpo?.error?.message);
    return;
  }
  console.log(`Enviado a ${correo} el enlace para elegir contraseña.`);
};

const token = tokenDeLaCli();
const { uid, nueva } = await altaOBusqueda(token);
await marcarComoAdmin(token, uid);

/*
 * Solo se manda el enlace cuando la cuenta se acaba de crear: si ya existía,
 * su dueño ya tiene contraseña y recibir un correo de recuperación sin haberlo
 * pedido confunde (y parece un intento de robo de cuenta).
 */
if (nueva) {
  await enviarEnlaceDeContrasena();
  console.log('\nListo. Entre en /admin con ese correo y la contraseña que elija.');
} else {
  console.log('\nListo. Entre en /admin con ese correo y su contraseña.');
}
