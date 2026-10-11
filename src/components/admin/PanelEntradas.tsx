import React, { useEffect, useRef, useState } from 'react';
import { Entrada, borrarEntrada, guardarEntrada, todasLasEntradas } from '../../data/blog';
import { borrarImagen, guardarImagen, prepararImagen } from '../../data/imagenes';
import { MarcoImagen } from '../blog/piezas';
import { mensajeDeError } from '../../firebase';
import { campo, etiqueta, Boton, Aviso } from './piezas';

/** Convierte un titular en slug de URL: «Normativa 2026» → «normativa-2026». */
const aSlug = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const vacia = (): Omit<Entrada, 'id'> & { id?: string } => ({
  titulo: '',
  slug: '',
  categoria: 'Fiscal y contable',
  resumen: '',
  cuerpo: '',
  autor: '',
  fecha: new Date().toISOString().slice(0, 10),
  minutos: 4,
  publicada: false,
  destacada: false,
  imagen: '',
  autorCargo: '',
});

/** Alta, edición y borrado de artículos del blog. */
export const PanelEntradas: React.FC = () => {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [edicion, setEdicion] = useState<(Omit<Entrada, 'id'> & { id?: string }) | null>(
    null,
  );
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState('');
  const inputArchivo = useRef<HTMLInputElement>(null);

  const limpiarArchivo = () => {
    setArchivoImagen(null);
    if (inputArchivo.current) inputArchivo.current.value = '';
  };

  useEffect(() => {
    if (!archivoImagen) {
      setVistaPrevia('');
      return;
    }
    const url = URL.createObjectURL(archivoImagen);
    setVistaPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [archivoImagen]);

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setEntradas(await todasLasEntradas());
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void recargar();
  }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edicion) return;

    setGuardando(true);
    setError('');
    const anterior = entradas.find((entrada) => entrada.id === edicion.id)?.imagen ?? '';
    let subida = '';
    let guardado = false;
    try {
      if (archivoImagen) subida = await guardarImagen(await prepararImagen(archivoImagen));
      await guardarEntrada({
        ...edicion,
        slug: edicion.slug.trim() || aSlug(edicion.titulo),
        minutos: Number(edicion.minutos) || 1,
        imagen: subida || edicion.imagen.trim(),
      });
      guardado = true;
      setEdicion(null);
      limpiarArchivo();
      let aviso = '';
      if (anterior && anterior !== (subida || edicion.imagen.trim())) {
        try { await borrarImagen(anterior); }
        catch { aviso = 'El artículo se guardó, pero no se pudo borrar su foto anterior.'; }
      }
      await recargar();
      if (aviso) setError(aviso);
    } catch (fallo) {
      if (subida && !guardado) {
        try { await borrarImagen(subida); } catch { /* El archivo huérfano se puede retirar luego. */ }
      }
      setError(mensajeDeError(fallo));
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (entrada: Entrada) => {
    if (!window.confirm(`¿Borrar «${entrada.titulo}»? No se puede deshacer.`)) return;
    try {
      await borrarEntrada(entrada.id);
      let aviso = '';
      try { await borrarImagen(entrada.imagen); }
      catch { aviso = 'El artículo se borró, pero no se pudo borrar su foto.'; }
      await recargar();
      if (aviso) setError(aviso);
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  if (edicion) {
    return (
      <form onSubmit={guardar} className="flex flex-col gap-5 max-w-[760px]">
        <h2 className="text-[26px] font-bold">
          {edicion.id ? 'Editar artículo' : 'Nuevo artículo'}
        </h2>

        {error && <Aviso>{error}</Aviso>}

        <div className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor="e-titulo">
            Titular
          </label>
          <input
            id="e-titulo"
            className={campo}
            value={edicion.titulo}
            onChange={(e) =>
              setEdicion({
                ...edicion,
                titulo: e.target.value,
                // El slug se propone solo mientras no se toque a mano.
                slug: edicion.id ? edicion.slug : aSlug(e.target.value),
              })
            }
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-slug">
              Slug (URL)
            </label>
            <input
              id="e-slug"
              className={campo}
              value={edicion.slug}
              onChange={(e) => setEdicion({ ...edicion, slug: aSlug(e.target.value) })}
              required
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-categoria">
              Categoría
            </label>
            <input
              id="e-categoria"
              className={campo}
              value={edicion.categoria}
              onChange={(e) => setEdicion({ ...edicion, categoria: e.target.value })}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-fecha">
              Fecha
            </label>
            <input
              id="e-fecha"
              type="date"
              className={campo}
              value={edicion.fecha.slice(0, 10)}
              onChange={(e) => setEdicion({ ...edicion, fecha: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-autor">
              Autor
            </label>
            <input
              id="e-autor"
              className={campo}
              value={edicion.autor}
              onChange={(e) => setEdicion({ ...edicion, autor: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-minutos">
              Minutos de lectura
            </label>
            <input
              id="e-minutos"
              type="number"
              min={1}
              className={campo}
              value={edicion.minutos}
              onChange={(e) => setEdicion({ ...edicion, minutos: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor="e-resumen">
            Entradilla (se ve en los listados)
          </label>
          <textarea
            id="e-resumen"
            rows={2}
            className={`${campo} resize-y`}
            value={edicion.resumen}
            onChange={(e) => setEdicion({ ...edicion, resumen: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor="e-cuerpo">
            Cuerpo del artículo
          </label>
          <textarea
            id="e-cuerpo"
            rows={14}
            className={`${campo} resize-y`}
            value={edicion.cuerpo}
            onChange={(e) => setEdicion({ ...edicion, cuerpo: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-cargo">
              Cargo del autor
            </label>
            <input
              id="e-cargo"
              className={campo}
              value={edicion.autorCargo}
              onChange={(e) => setEdicion({ ...edicion, autorCargo: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="e-imagen">
              Imagen de cabecera (URL opcional)
            </label>
            <input
              id="e-imagen"
              className={campo}
              value={edicion.imagen}
              placeholder="/blog/mi-imagen.jpg"
              onChange={(e) => {
                limpiarArchivo();
                setEdicion({ ...edicion, imagen: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className={etiqueta} htmlFor="e-archivo">O subir una foto desde su equipo</label>
          <input
            id="e-archivo"
            ref={inputArchivo}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={campo}
            onChange={(e) => setArchivoImagen(e.target.files?.[0] ?? null)}
          />
          <p className="text-sm text-[#767676]">
            JPG, PNG o WebP, hasta 12 MB. Se optimiza antes de guardarse en Firestore.
          </p>
          {vistaPrevia && <img src={vistaPrevia} alt="Vista previa de la nueva foto" className="max-w-xs max-h-48 object-contain" />}
          {!vistaPrevia && edicion.imagen && (
            <div className="max-w-xs">
              <MarcoImagen src={edicion.imagen} alt="Foto actual del artículo" proporcion="aspect-[16/9]" />
            </div>
          )}
          {(edicion.imagen || archivoImagen) && (
            <Boton tono="secundario" type="button" onClick={() => {
              limpiarArchivo();
              setEdicion({ ...edicion, imagen: '' });
            }}>
              Publicar sin imagen
            </Boton>
          )}
        </div>

        <label className="flex items-center gap-3 text-base">
          <input
            type="checkbox"
            checked={edicion.destacada}
            onChange={(e) => setEdicion({ ...edicion, destacada: e.target.checked })}
            className="w-5 h-5 accent-[#F9A600]"
          />
          Destacada (sale en grande arriba del blog; manda la más reciente)
        </label>

        <label className="flex items-center gap-3 text-base">
          <input
            type="checkbox"
            checked={edicion.publicada}
            onChange={(e) => setEdicion({ ...edicion, publicada: e.target.checked })}
            className="w-5 h-5 accent-[#F9A600]"
          />
          Publicada (si no, queda como borrador y solo la ve usted)
        </label>

        <div className="flex gap-3 flex-wrap">
          <Boton type="submit" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar'}
          </Boton>
          <Boton tono="secundario" type="button" onClick={() => {
            limpiarArchivo();
            setEdicion(null);
          }}>
            Cancelar
          </Boton>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[26px] font-bold">Artículos</h2>
        <Boton onClick={() => { limpiarArchivo(); setEdicion(vacia()); }}>Nuevo artículo</Boton>
      </div>

      {error && <Aviso>{error}</Aviso>}
      {cargando && <p className="text-base text-[#4A4A4A]">Cargando…</p>}

      {!cargando && entradas.length === 0 && (
        <p className="text-base text-[#4A4A4A]">
          Todavía no hay artículos. El blog del sitio seguirá mostrando los marcadores de
          la maqueta hasta que publique el primero.
        </p>
      )}

      <div className="flex flex-col">
        {entradas.map((entrada) => (
          <div
            key={entrada.id}
            className="grid sm:grid-cols-[1fr_auto] gap-4 py-5 border-t border-[#E4E4E4] items-start"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-[19px] font-bold">{entrada.titulo}</h3>
                {!entrada.publicada && (
                  <span className="text-xs font-bold uppercase tracking-[0.14em] bg-[#E4E4E4] text-[#4A4A4A] px-2 py-1">
                    Borrador
                  </span>
                )}
              </div>
              <span className="text-sm text-[#767676]">
                {entrada.fecha} · {entrada.categoria} · /blog/{entrada.slug}
              </span>
            </div>
            <div className="flex gap-2">
              <Boton tono="secundario" onClick={() => { limpiarArchivo(); setEdicion(entrada); }}>
                Editar
              </Boton>
              <Boton tono="peligro" onClick={() => eliminar(entrada)}>
                Borrar
              </Boton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
