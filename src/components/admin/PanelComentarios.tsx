import React, { useEffect, useState } from 'react';
import {
  Comentario,
  aprobarComentario,
  borrarComentario,
  responderComentario,
  todosLosComentarios,
} from '../../data/blog';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton } from './piezas';

/**
 * Moderación de comentarios.
 *
 * **Nada se publica sin pasar por aquí.** Un comentario enviado queda pendiente
 * hasta que se aprueba, y el sitio se lo advierte a quien lo escribe. Sin Cloud
 * Functions no hay filtro automático, así que esta pantalla es la única puerta.
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
      await aprobarComentario(comentario.id, !comentario.aprobado);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  /** La respuesta del equipo sale bajo el comentario, firmada como Vela Nus. */
  const responder = async (comentario: Comentario) => {
    const respuesta = window.prompt(
      `Responder a ${comentario.nombre}:`,
      comentario.respuesta,
    );
    if (respuesta === null) return;
    try {
      await responderComentario(comentario.id, respuesta);
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
                <span
                  className={`text-xs font-bold uppercase tracking-[0.14em] px-2 py-1 ${
                    comentario.aprobado
                      ? 'bg-[#E4E4E4] text-[#4A4A4A]'
                      : 'bg-[#F9A600] text-[#000000]'
                  }`}
                >
                  {comentario.aprobado ? 'Publicado' : 'Pendiente'}
                </span>
              </div>
              <p className="text-base leading-relaxed text-[#4A4A4A] whitespace-pre-line">
                {comentario.texto}
              </p>
              {comentario.correo && (
                <span className="text-sm text-[#767676]">{comentario.correo}</span>
              )}
              {comentario.respuesta && (
                <p className="text-base leading-relaxed border-l-4 border-[#F9A600] pl-4">
                  <strong>Vela Nus:</strong> {comentario.respuesta}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Boton
                tono={comentario.aprobado ? 'secundario' : 'principal'}
                onClick={() => alternar(comentario)}
              >
                {comentario.aprobado ? 'Retirar' : 'Aprobar'}
              </Boton>
              <Boton tono="secundario" onClick={() => responder(comentario)}>
                Responder
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
