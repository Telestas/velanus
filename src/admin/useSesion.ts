import { useCallback, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * Sesión del panel de administración.
 *
 * Ser admin no es tener sesión: es tener un documento en `admins/{uid}`, y eso
 * lo decide Firestore, no este código. Aquí se comprueba intentando leer ese
 * documento —las reglas solo dejan leerlo a un admin—, así que un usuario
 * cualquiera recibe `permission-denied` y se queda fuera.
 *
 * Ocultar el panel en el navegador no protege nada por sí solo: si alguien se
 * salta esta pantalla, las reglas siguen rechazando sus escrituras.
 */
export type EstadoSesion =
  | { estado: 'cargando' }
  | { estado: 'sin-sesion' }
  | { estado: 'sin-permisos'; correo: string }
  | { estado: 'admin'; correo: string; uid: string };

export const useSesion = () => {
  const [sesion, setSesion] = useState<EstadoSesion>({ estado: 'cargando' });

  const evaluar = useCallback(async (usuario: User | null) => {
    if (!usuario) {
      setSesion({ estado: 'sin-sesion' });
      return;
    }

    const correo = usuario.email ?? '';

    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      const ficha = await getDoc(doc(await db(), 'admins', usuario.uid));

      setSesion(
        ficha.exists()
          ? { estado: 'admin', correo, uid: usuario.uid }
          : { estado: 'sin-permisos', correo },
      );
    } catch {
      // Las reglas niegan la lectura a quien no es admin: mismo resultado.
      setSesion({ estado: 'sin-permisos', correo });
    }
  }, []);

  useEffect(() => {
    let vivo = true;
    let desuscribir: (() => void) | undefined;

    (async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const sesionFirebase = await auth();
      if (!vivo) return;

      desuscribir = onAuthStateChanged(sesionFirebase, (usuario) => {
        /*
         * La sesión anónima de los comentarios también pasa por aquí: tiene
         * uid pero no correo, y nunca tendrá ficha en `admins`.
         */
        if (vivo) void evaluar(usuario);
      });
    })().catch(() => {
      if (vivo) setSesion({ estado: 'sin-sesion' });
    });

    return () => {
      vivo = false;
      desuscribir?.();
    };
  }, [evaluar]);

  const entrar = useCallback(async (correo: string, contrasena: string) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(await auth(), correo.trim(), contrasena);
  }, []);

  const salir = useCallback(async () => {
    const { signOut } = await import('firebase/auth');
    await signOut(await auth());
  }, []);

  const enviarRecuperacion = useCallback(async (correo: string) => {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    await sendPasswordResetEmail(await auth(), correo.trim());
  }, []);

  return { sesion, entrar, salir, enviarRecuperacion };
};
