import React, { useEffect, useState } from 'react';
import {
  Pregunta,
  borrarPregunta,
  guardarPregunta,
  todasLasPreguntas,
} from '../../data/blog';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton, campo, etiqueta } from './piezas';

const vacia = (orden: number): Omit<Pregunta, 'id'> & { id?: string } => ({
  pregunta: '',
  respuesta: '',
  seccion: 'general',
  orden,
  publicada: true,
});

/**
 * Preguntas frecuentes.
 *
 * `seccion` decide dónde sale cada una: `general`, o la clave de una línea de
 * servicio (`contabilidad`, `legal`, `tramites`, `eventos`). Las que ya trae la
 * maqueta siguen en el código; estas se suman a ellas.
 */
export const PanelPreguntas: React.FC = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [edicion, setEdicion] = useState<(Omit<Pregunta, 'id'> & { id?: string }) | null>(
    null,
  );
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setPreguntas(await todasLasPreguntas());
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
    try {
      await guardarPregunta({ ...edicion, orden: Number(edicion.orden) || 0 });
      setEdicion(null);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  const eliminar = async (pregunta: Pregunta) => {
    if (!window.confirm(`¿Borrar «${pregunta.pregunta}»?`)) return;
    try {
      await borrarPregunta(pregunta.id);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  if (edicion) {
    return (
      <form onSubmit={guardar} className="flex flex-col gap-5 max-w-[760px]">
        <h2 className="text-[26px] font-bold">
          {edicion.id ? 'Editar pregunta' : 'Nueva pregunta'}
        </h2>

        {error && <Aviso>{error}</Aviso>}

        <div className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor="p-pregunta">
            Pregunta
          </label>
          <input
            id="p-pregunta"
            className={campo}
            value={edicion.pregunta}
            onChange={(e) => setEdicion({ ...edicion, pregunta: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor="p-respuesta">
            Respuesta
          </label>
          <textarea
            id="p-respuesta"
            rows={6}
            className={`${campo} resize-y`}
            value={edicion.respuesta}
            onChange={(e) => setEdicion({ ...edicion, respuesta: e.target.value })}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="p-seccion">
              Sección
            </label>
            <select
              id="p-seccion"
              className={campo}
              value={edicion.seccion}
              onChange={(e) => setEdicion({ ...edicion, seccion: e.target.value })}
            >
              <option value="general">General</option>
              <option value="contabilidad">Contabilidad</option>
              <option value="legal">Legal corporativo</option>
              <option value="tramites">Trámites y visas</option>
              <option value="eventos">Eventos y capacitación</option>
            </select>
          </div>
          <div className="flex flex-col gap-[7px]">
            <label className={etiqueta} htmlFor="p-orden">
              Orden
            </label>
            <input
              id="p-orden"
              type="number"
              className={campo}
              value={edicion.orden}
              onChange={(e) => setEdicion({ ...edicion, orden: Number(e.target.value) })}
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-base">
          <input
            type="checkbox"
            checked={edicion.publicada}
            onChange={(e) => setEdicion({ ...edicion, publicada: e.target.checked })}
            className="w-5 h-5 accent-[#F9A600]"
          />
          Publicada
        </label>

        <div className="flex gap-3">
          <Boton type="submit">Guardar</Boton>
          <Boton tono="secundario" type="button" onClick={() => setEdicion(null)}>
            Cancelar
          </Boton>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[26px] font-bold">Preguntas frecuentes</h2>
        <Boton onClick={() => setEdicion(vacia(preguntas.length))}>Nueva pregunta</Boton>
      </div>

      {error && <Aviso>{error}</Aviso>}
      {cargando && <p className="text-base text-[#4A4A4A]">Cargando…</p>}
      {!cargando && preguntas.length === 0 && (
        <p className="text-base text-[#4A4A4A]">
          No hay preguntas guardadas. Las que salen ahora en Servicios están escritas en el
          código; estas se añadirían a ellas.
        </p>
      )}

      <div className="flex flex-col">
        {preguntas.map((pregunta) => (
          <div
            key={pregunta.id}
            className="grid sm:grid-cols-[1fr_auto] gap-4 py-5 border-t border-[#E4E4E4] items-start"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] font-bold">{pregunta.pregunta}</h3>
              <span className="text-sm text-[#767676]">
                {pregunta.seccion} · orden {pregunta.orden}
                {pregunta.publicada ? '' : ' · sin publicar'}
              </span>
            </div>
            <div className="flex gap-2">
              <Boton tono="secundario" onClick={() => setEdicion(pregunta)}>
                Editar
              </Boton>
              <Boton tono="peligro" onClick={() => eliminar(pregunta)}>
                Borrar
              </Boton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
