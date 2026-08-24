import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

/**
 * Conexión con Firebase.
 *
 * El SDK pesa bastante y solo hace falta en tres sitios (el panel, la lista de
 * entradas y los comentarios), así que se carga con `import()` dinámico: quien
 * entre a la home y no baje al blog no se lo descarga.
 *
 * Estos valores NO son secretos, aunque lo parezcan: la configuración web de
 * Firebase es pública por diseño y va incrustada en cualquier sitio que use el
 * SDK. Lo que protege los datos son las reglas de `firestore.rules`, que se
 * aplican en el servidor de Google y no se pueden saltar desde el navegador.
 */
const CONFIG = {
  apiKey: 'AIzaSyDIIF6UQ715FhV0_jRRILbAkwyaY41Hv_c',
  authDomain: 'velanus-12056.firebaseapp.com',
  projectId: 'velanus-12056',
  storageBucket: 'velanus-12056.firebasestorage.app',
  messagingSenderId: '782711438062',
  appId: '1:782711438062:web:1d78d4ef8c7185a58451ff',
};

let appPromesa: Promise<FirebaseApp> | null = null;

const app = async (): Promise<FirebaseApp> => {
  if (!appPromesa) {
    appPromesa = import('firebase/app').then(({ getApps, initializeApp }) => {
      const [existente] = getApps();
      return existente ?? initializeApp(CONFIG);
    });
  }
  return appPromesa;
};

export const db = async (): Promise<Firestore> => {
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(await app());
};

export const auth = async (): Promise<Auth> => {
  const { getAuth } = await import('firebase/auth');
  return getAuth(await app());
};

/**
 * Traduce los códigos de error de Firebase a algo que se pueda leer.
 * Los de sesión se agrupan a propósito: decir «ese correo no existe» le
 * confirma a quien prueba contraseñas qué cuentas hay.
 */
export const mensajeDeError = (error: unknown): string => {
  const codigo =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : '';

  switch (codigo) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espere unos minutos y vuelva a probar.';
    case 'auth/network-request-failed':
      return 'No hay conexión con Firebase. Revise la red.';
    case 'auth/configuration-not-found':
      return 'Falta activar Authentication en la consola de Firebase.';
    case 'permission-denied':
      return 'Esta cuenta no tiene permisos de administración.';
    case 'unavailable':
      return 'Firestore no responde. Vuelva a intentarlo.';
    case 'failed-precondition':
      return 'Falta un índice en Firestore; revise la consola.';
    default:
      return error instanceof Error ? error.message : 'Ha ocurrido un error.';
  }
};
