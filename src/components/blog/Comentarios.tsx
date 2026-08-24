import React, { useEffect, useState } from 'react';
import { Comentario, comentar, comentariosDe } from '../../data/blog';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { Paleta } from '../marca/paleta';
import { AvisoModeracion } from './piezas';

/**
 * Comentarios de un artículo.
 *
 * Se listan solo los aprobados, y el formulario avisa dos veces de que hay
 * moderación previa: antes de enviar y en el acuse. Es lo que evita el «he
 * comentado y no sale» y el correo de queja que viene después.
 */
export const Comentarios: React.FC<{ paleta: Paleta; slug: string }> = ({ paleta, slug }) => {
  const idioma = useIdioma();
  const t = textos(idioma);

  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void comentariosDe(slug).then(setComentarios);
  }, [slug]);

  const campo = `border ${paleta.borde} ${paleta.banda} ${paleta.texto} px-3.5 py-3.5 text-base outline-none focus-visible:outline-2 focus-visible:outline-[#F9A600]`;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    try {
      await comentar(slug, nombre, correo, texto);
      setEnviado(true);
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : String(fallo));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className={`mt-6 border-t ${paleta.borde} pt-9 flex flex-col gap-6`}>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="text-[24px] md:text-[28px] font-bold">{t.blog.comentarios}</h2>
        <span className={`text-sm ${paleta.textoTenue}`}>
          {t.blog.publicados(comentarios.length)}
        </span>
      </div>

      {comentarios.length === 0 && (
        <p className={`text-base ${paleta.textoSuave}`}>{t.blog.sinComentarios}</p>
      )}

      {comentarios.map((comentario) => (
        <article key={comentario.id} className="flex flex-col gap-4">
          <div className={`flex gap-4 pb-6 border-b ${paleta.borde}`}>
            <div className={`w-10 h-10 flex-none ${paleta.marcoImagen}`} aria-hidden />
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[15px] font-bold">{comentario.nombre}</span>
                <span className={`text-[13px] ${paleta.textoTenue}`}>
                  {comentario.creado?.toLocaleDateString(
                    idioma === 'en' ? 'en-GB' : 'es-ES',
                  ) ?? ''}
                </span>
              </div>
              <p className={`text-[17px] leading-relaxed ${paleta.textoFuerte}`}>
                {comentario.texto}
              </p>
            </div>
          </div>

          {/* Respuesta del equipo, marcada como autora para no confundirla. */}
          {comentario.respuesta && (
            <div className={`flex gap-4 pb-6 border-b ${paleta.borde} pl-6`}>
              <div className="w-10 h-10 flex-none bg-[#F9A600] text-[#000000] text-[11px] font-bold flex items-center justify-center">
                VN
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[15px] font-bold">Vela Nus</span>
                  <span
                    className={`text-xs tracking-[0.1em] uppercase ${paleta.acentoTexto}`}
                  >
                    {t.blog.autorEquipo}
                  </span>
                </div>
                <p className={`text-[17px] leading-relaxed ${paleta.textoFuerte}`}>
                  {comentario.respuesta}
                </p>
              </div>
            </div>
          )}
        </article>
      ))}

      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold">{t.blog.dejarComentario}</h3>
        <AvisoModeracion
          paleta={paleta}
          titulo={t.blog.moderacionTitulo}
          texto={t.blog.moderacionComentario}
        />

        {enviado ? (
          <p className={`text-[17px] leading-relaxed ${paleta.textoFuerte}`}>
            {t.blog.comentarioEnviado}
          </p>
        ) : (
          <form onSubmit={enviar} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-[7px]">
                <label htmlFor="comentario-nombre" className="text-sm font-bold">
                  {t.blog.nombre}
                </label>
                <input
                  id="comentario-nombre"
                  required
                  minLength={2}
                  maxLength={60}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={campo}
                />
              </div>
              <div className="flex flex-col gap-[7px]">
                <label htmlFor="comentario-correo" className="text-sm font-bold">
                  {t.blog.correoNoPublica}
                </label>
                <input
                  id="comentario-correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className={campo}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[7px]">
              <label htmlFor="comentario-texto" className="text-sm font-bold">
                {t.blog.comentario}
              </label>
              <textarea
                id="comentario-texto"
                rows={4}
                required
                minLength={2}
                maxLength={2000}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className={`${campo} resize-y`}
              />
            </div>

            {error && <p className={`text-sm ${paleta.acentoTexto}`}>{error}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="bg-[#F9A600] text-[#000000] py-4 px-8 text-[17px] font-bold self-start hover:bg-[#FFC048] disabled:opacity-60 transition-colors"
            >
              {enviando ? t.blog.enviando : t.blog.enviarRevision}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
