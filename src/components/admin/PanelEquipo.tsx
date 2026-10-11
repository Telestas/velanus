import React, { useEffect, useRef, useState } from 'react';
import { borrarMiembro, guardarMiembro, MiembroEquipo, todosLosMiembros } from '../../data/equipo';
import { borrarImagen, guardarImagen, prepararImagen } from '../../data/imagenes';
import { mensajeDeError } from '../../firebase';
import { MarcoImagen } from '../blog/piezas';
import { Aviso, Boton, campo, etiqueta } from './piezas';

const vacio = (orden: number): MiembroEquipo => ({
  id: crypto.randomUUID(),
  nombre: '',
  cargo: '',
  perfil: '',
  cargoEn: '',
  perfilEn: '',
  foto: '',
  orden,
});

export const PanelEquipo: React.FC = () => {
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([]);
  const [edicion, setEdicion] = useState<MiembroEquipo | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const inputArchivo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!archivo) {
      setVistaPrevia('');
      return;
    }
    const url = URL.createObjectURL(archivo);
    setVistaPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setMiembros(await todosLosMiembros());
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { void recargar(); }, []);

  const limpiarArchivo = () => {
    setArchivo(null);
    if (inputArchivo.current) inputArchivo.current.value = '';
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edicion) return;
    setGuardando(true);
    setError('');
    const anterior = miembros.find((miembro) => miembro.id === edicion.id)?.foto ?? '';
    let subida = '';
    let guardado = false;
    try {
      if (archivo) subida = await guardarImagen(await prepararImagen(archivo));
      const foto = subida || edicion.foto;
      await guardarMiembro({
        ...edicion,
        nombre: edicion.nombre.trim(),
        cargo: edicion.cargo.trim(),
        perfil: edicion.perfil.trim(),
        cargoEn: edicion.cargoEn.trim(),
        perfilEn: edicion.perfilEn.trim(),
        foto,
        orden: Number(edicion.orden) || 0,
      });
      guardado = true;
      setEdicion(null);
      limpiarArchivo();
      let aviso = '';
      if (anterior && anterior !== foto) {
        try { await borrarImagen(anterior); }
        catch { aviso = 'Se guardó el perfil, pero no se pudo borrar el retrato anterior.'; }
      }
      await recargar();
      if (aviso) setError(aviso);
    } catch (fallo) {
      if (subida && !guardado) {
        try { await borrarImagen(subida); } catch { /* Se podrá retirar después. */ }
      }
      setError(mensajeDeError(fallo));
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (miembro: MiembroEquipo) => {
    if (!window.confirm(`¿Borrar a ${miembro.nombre}? No se puede deshacer.`)) return;
    setError('');
    try {
      await borrarMiembro(miembro.id);
      let aviso = '';
      if (miembro.foto) {
        try { await borrarImagen(miembro.foto); }
        catch { aviso = 'Se borró el perfil, pero no se pudo borrar su retrato.'; }
      }
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
          {miembros.some((miembro) => miembro.id === edicion.id) ? 'Editar miembro' : 'Nuevo miembro'}
        </h2>
        {error && <Aviso>{error}</Aviso>}
        <div className="flex flex-col gap-2">
          <label className={etiqueta} htmlFor="equipo-nombre">Nombre</label>
          <input id="equipo-nombre" className={campo} required maxLength={100}
            value={edicion.nombre} onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={etiqueta} htmlFor="equipo-cargo">Cargo en español</label>
            <input id="equipo-cargo" className={campo} required maxLength={120}
              value={edicion.cargo} onChange={(e) => setEdicion({ ...edicion, cargo: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={etiqueta} htmlFor="equipo-cargo-en">Cargo en inglés (opcional)</label>
            <input id="equipo-cargo-en" className={campo} maxLength={120}
              value={edicion.cargoEn} onChange={(e) => setEdicion({ ...edicion, cargoEn: e.target.value })} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={etiqueta} htmlFor="equipo-perfil">Perfil en español</label>
            <textarea id="equipo-perfil" className={`${campo} resize-y`} rows={4} required maxLength={500}
              value={edicion.perfil} onChange={(e) => setEdicion({ ...edicion, perfil: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={etiqueta} htmlFor="equipo-perfil-en">Perfil en inglés (opcional)</label>
            <textarea id="equipo-perfil-en" className={`${campo} resize-y`} rows={4} maxLength={500}
              value={edicion.perfilEn} onChange={(e) => setEdicion({ ...edicion, perfilEn: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className={etiqueta} htmlFor="equipo-foto">Retrato (opcional, JPG, PNG o WebP)</label>
          <input id="equipo-foto" type="file" accept="image/jpeg,image/png,image/webp"
            ref={inputArchivo} onChange={(e) => setArchivo(e.target.files?.[0] ?? null)} />
          {vistaPrevia ? (
            <img src={vistaPrevia} alt="Vista previa del retrato" className="w-36 aspect-[4/5] object-cover" />
          ) : edicion.foto ? (
            <div className="w-36"><MarcoImagen src={edicion.foto} alt="Retrato actual" proporcion="aspect-[4/5]" /></div>
          ) : null}
          {(edicion.foto || archivo) && (
            <Boton type="button" tono="secundario" className="self-start"
              onClick={() => { setEdicion({ ...edicion, foto: '' }); limpiarArchivo(); }}>
              Quitar retrato
            </Boton>
          )}
        </div>
        <div className="flex flex-col gap-2 max-w-[180px]">
          <label className={etiqueta} htmlFor="equipo-orden">Orden</label>
          <input id="equipo-orden" type="number" className={campo} value={edicion.orden}
            onChange={(e) => setEdicion({ ...edicion, orden: Number(e.target.value) })} />
        </div>
        <p className="text-sm text-[#4A4A4A]">Al guardar, este perfil aparecerá en Nosotros.</p>
        <div className="flex gap-3">
          <Boton type="submit" disabled={guardando}>{guardando ? 'Guardando…' : 'Guardar'}</Boton>
          <Boton type="button" tono="secundario" onClick={() => { setEdicion(null); limpiarArchivo(); }}>
            Cancelar
          </Boton>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[26px] font-bold">Equipo</h2>
          <p className="text-base text-[#4A4A4A]">Los perfiles publicados aparecen en Nosotros.</p>
        </div>
        <Boton onClick={() => setEdicion(vacio(miembros.length))}>Nuevo miembro</Boton>
      </div>
      {error && <Aviso>{error}</Aviso>}
      {cargando && <p>Cargando…</p>}
      {!cargando && miembros.length === 0 && <p>No hay miembros guardados.</p>}
      <div className="flex flex-col">
        {miembros.map((miembro) => (
          <article key={miembro.id} className="border-t border-[#E4E4E4] py-5 flex items-start justify-between gap-5 flex-wrap">
            <div className="flex gap-4 items-start">
              {miembro.foto && <div className="w-16 shrink-0"><MarcoImagen src={miembro.foto} alt={miembro.nombre} proporcion="aspect-[4/5]" /></div>}
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold">{miembro.nombre}</h3>
                <span className="text-sm text-[#4A4A4A]">{miembro.cargo} · orden {miembro.orden}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Boton tono="secundario" onClick={() => setEdicion(miembro)}>Editar</Boton>
              <Boton tono="peligro" onClick={() => void eliminar(miembro)}>Borrar</Boton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
