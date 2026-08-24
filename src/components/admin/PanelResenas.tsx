import React, { useEffect, useState } from 'react';
import {
  Resena,
  aprobarResena,
  borrarResena,
  todasLasResenas,
} from '../../data/resenas';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton } from './piezas';

/**
 * Moderación de reseñas.
 *
 * Igual que los comentarios: nada se publica sin pasar por aquí, y el
 * formulario del sitio se lo advierte a quien la escribe. Publicar
 * valoraciones sin filtro en el sitio de un despacho no compensa.
 */
export const PanelResenas: React.FC = () => {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setResenas(await todasLasResenas());
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void recargar();
  }, []);

  const alternar = async (resena: Resena) => {
    try {
      await aprobarResena(resena.id, !resena.aprobada);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  const eliminar = async (resena: Resena) => {
    if (!window.confirm(`¿Borrar la reseña de ${resena.nombre}? No se puede deshacer.`))
      return;
    try {
      await borrarResena(resena.id);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  const pendientes = resenas.filter((r) => !r.aprobada).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[26px] font-bold">Reseñas</h2>
          {pendientes > 0 && (
            <span className="text-sm font-bold bg-[#F9A600] text-[#000000] px-2.5 py-1">
              {pendientes} por revisar
            </span>
          )}
        </div>
        <Boton tono="secundario" onClick={recargar}>
          Actualizar
        </Boton>
      </div>

      {error && <Aviso>{error}</Aviso>}
      {cargando && <p className="text-base text-[#4A4A4A]">Cargando…</p>}
      {!cargando && resenas.length === 0 && (
        <p className="text-base text-[#4A4A4A]">Todavía no ha llegado ninguna reseña.</p>
      )}

      <div className="flex flex-col">
        {resenas.map((resena) => (
          <article
            key={resena.id}
            className="grid lg:grid-cols-[1fr_auto] gap-4 py-6 border-t border-[#E4E4E4] items-start"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[17px] font-bold">{resena.nombre}</span>
                <span className="text-sm text-[#767676]">
                  {[resena.pais, resena.servicio, `${resena.estrellas}/5`]
                    .filter(Boolean)
                    .join(' · ')}
                  {resena.creado ? ` · ${resena.creado.toLocaleDateString('es-ES')}` : ''}
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-[0.14em] px-2 py-1 ${
                    resena.aprobada
                      ? 'bg-[#E4E4E4] text-[#4A4A4A]'
                      : 'bg-[#F9A600] text-[#000000]'
                  }`}
                >
                  {resena.aprobada ? 'Publicada' : 'Pendiente'}
                </span>
              </div>
              <p className="text-base leading-relaxed text-[#4A4A4A] whitespace-pre-line">
                {resena.texto}
              </p>
            </div>

            <div className="flex gap-2">
              <Boton
                tono={resena.aprobada ? 'secundario' : 'principal'}
                onClick={() => alternar(resena)}
              >
                {resena.aprobada ? 'Retirar' : 'Aprobar'}
              </Boton>
              <Boton tono="peligro" onClick={() => eliminar(resena)}>
                Borrar
              </Boton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
