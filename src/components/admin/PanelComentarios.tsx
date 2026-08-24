import React, { useEffect, useState } from 'react';
import {
  Comentario,
  borrarComentario,
  ocultarComentario,
  todosLosComentarios,
} from '../../data/blog';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton } from './piezas';

/**
 * Moderación de comentarios.
 *
 * Los comentarios se publican al momento, así que esto es moderación posterior:
 * ocultar (reversible) o borrar (definitivo). Sin Cloud Functions no hay filtro
 * automático, así que conviene mirar esta pantalla de vez en cuando.
 */
export const PanelComentarios: React.FC = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setComentarios(await todosLosComentarios());
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void recargar();
  }, []);

  const alternar = async (comentario: Comentario) => {
    try {
      await ocultarComentario(comentario.id, !comentario.oculto);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  const eliminar = async (comentario: Comentario) => {
    if (!window.confirm(`¿Borrar el comentario de ${comentario.nombre}?`)) return;
    try {
      await borrarComentario(comentario.id);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[26px] font-bold">Comentarios</h2>
        <Boton tono="secundario" onClick={recargar}>
          Actualizar
        </Boton>
      </div>

      {error && <Aviso>{error}</Aviso>}
      {cargando && <p className="text-base text-[#4A4A4A]">Cargando…</p>}
      {!cargando && comentarios.length === 0 && (
        <p className="text-base text-[#4A4A4A]">Todavía no hay comentarios.</p>
      )}

      <div className="flex flex-col">
        {comentarios.map((comentario) => (
          <div
            key={comentario.id}
            className="grid lg:grid-cols-[1fr_auto] gap-4 py-5 border-t border-[#E4E4E4] items-start"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[17px] font-bold">{comentario.nombre}</span>
                <span className="text-sm text-[#767676]">
                  en /blog/{comentario.entrada}
                  {comentario.creado
                    ? ` · ${comentario.creado.toLocaleDateString('es-ES')}`
                    : ''}
                </span>
                {comentario.oculto && (
                  <span className="text-xs font-bold uppercase tracking-[0.14em] bg-[#E4E4E4] text-[#4A4A4A] px-2 py-1">
                    Oculto
                  </span>
                )}
              </div>
              <p className="text-base leading-relaxed text-[#4A4A4A] whitespace-pre-line">
                {comentario.texto}
              </p>
            </div>
            <div className="flex gap-2">
              <Boton tono="secundario" onClick={() => alternar(comentario)}>
                {comentario.oculto ? 'Mostrar' : 'Ocultar'}
              </Boton>
              <Boton tono="peligro" onClick={() => eliminar(comentario)}>
                Borrar
              </Boton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
