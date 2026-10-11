import { db } from '../firebase';
import { leerDocumento } from './rest';

const PREFIJO = 'firestore:';
const LIMITE_ARCHIVO = 12 * 1024 * 1024;
const LIMITE_IMAGEN = 350 * 1024;
const cache = new Map<string, Promise<string>>();

export const idImagen = (valor: string): string | null =>
  valor.startsWith(PREFIJO) && /^[a-zA-Z0-9]{20}$/.test(valor.slice(PREFIJO.length))
    ? valor.slice(PREFIJO.length)
    : null;

const aBlob = (lienzo: HTMLCanvasElement, calidad: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    lienzo.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo procesar la imagen.'))),
      'image/webp',
      calidad,
    );
  });

const aDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result));
    lector.onerror = () => reject(new Error('No se pudo leer la imagen.'));
    lector.readAsDataURL(blob);
  });

/** Reduce la foto antes de guardarla; Firestore limita cada documento a 1 MiB. */
export const prepararImagen = async (archivo: File): Promise<string> => {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(archivo.type))
    throw new Error('Use una imagen JPG, PNG o WebP.');
  if (archivo.size > LIMITE_ARCHIVO)
    throw new Error('La imagen original debe ocupar menos de 12 MB.');

  const bitmap = await createImageBitmap(archivo);
  try {
    const lienzo = document.createElement('canvas');
    const contexto = lienzo.getContext('2d');
    if (!contexto) throw new Error('Este navegador no puede procesar imágenes.');
    for (const lado of [1600, 1200, 900, 700]) {
      const escala = Math.min(1, lado / Math.max(bitmap.width, bitmap.height));
      lienzo.width = Math.max(1, Math.round(bitmap.width * escala));
      lienzo.height = Math.max(1, Math.round(bitmap.height * escala));
      contexto.drawImage(bitmap, 0, 0, lienzo.width, lienzo.height);
      for (const calidad of [0.82, 0.68, 0.52]) {
        const blob = await aBlob(lienzo, calidad);
        if (blob.type === 'image/webp' && blob.size <= LIMITE_IMAGEN)
          return aDataUrl(blob);
      }
    }
    throw new Error('La imagen sigue siendo demasiado grande. Pruebe una foto más pequeña.');
  } finally {
    bitmap.close();
  }
};

export const guardarImagen = async (dataUrl: string): Promise<string> => {
  const { addDoc, collection } = await import('firebase/firestore');
  const documento = await addDoc(collection(await db(), 'imagenes'), { dataUrl });
  const referencia = `${PREFIJO}${documento.id}`;
  cache.set(documento.id, Promise.resolve(dataUrl));
  return referencia;
};

export const borrarImagen = async (referencia: string): Promise<void> => {
  const id = idImagen(referencia);
  if (!id) return;
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(await db(), 'imagenes', id));
  cache.delete(id);
};

export const leerImagen = (referencia: string): Promise<string> => {
  const id = idImagen(referencia);
  if (!id) return Promise.resolve(referencia);
  const anterior = cache.get(id);
  if (anterior) return anterior;

  const peticion = (async () => {
    const documento = await leerDocumento('imagenes', id);
    return String(documento.datos.dataUrl ?? '');
  })();
  cache.set(id, peticion);
  void peticion.catch(() => cache.delete(id));
  return peticion;
};
