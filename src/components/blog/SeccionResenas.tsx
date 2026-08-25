import React, { useEffect, useMemo, useState } from 'react';
import { Resena, enviarResena, resenasPublicadas } from '../../data/resenas';
import { contenidoServicios } from '../../content/servicios';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { ANCHO, Paleta } from '../marca/paleta';
import { Consentimiento } from '../home/comunes';
import { AvisoModeracion, Estrellas } from './piezas';

/**
 * Reseñas de clientes, como sección del blog.
 *
 * En esta maqueta dejan de tener página propia —«Reseñas» sale del menú— y se
 * integran aquí, con filtro por servicio recibido. Todas pasan por aprobación:
 * el formulario lo dice antes de enviar y el acuse lo repite, que es lo que
 * evita el «he escrito una reseña y no aparece».
 */
export const SeccionResenas: React.FC<{ paleta: Paleta }> = ({ paleta }) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const lineas = contenidoServicios(idioma).lineas;

  const [resenas, setResenas] = useState<Resena[]>([]);
  const [servicio, setServicio] = useState('');

  useEffect(() => {
    void resenasPublicadas().then(setResenas);
  }, []);

  const visibles = useMemo(
    () => (servicio ? resenas.filter((r) => r.servicio === servicio) : resenas),
    [resenas, servicio],
  );

  return (
    <section id="resenas" className={paleta.banda}>
      <div className={`${ANCHO} py-20`}>
        <div className="flex flex-col gap-3.5 mb-4">
          <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
            {t.blog.resenasEtiqueta}
          </span>
          <h2 className="text-[28px] md:text-[34px] leading-[1.15] font-bold">
            {t.blog.resenasTitulo}
          </h2>
        </div>
        <p className={`text-base ${paleta.textoTenue} mb-9`}>{t.blog.resenasNota}</p>

        {/* filtro por servicio */}
        <div className="flex items-center gap-3 flex-wrap pb-8">
          <span className={`text-[13px] tracking-[0.16em] uppercase ${paleta.textoTenue} mr-2`}>
            {t.blog.filtrarServicio}
          </span>
          <Filtro paleta={paleta} activa={!servicio} onClick={() => setServicio('')}>
            {t.blog.todos}
          </Filtro>
          {lineas.map((linea) => (
            <Filtro
              key={linea.clave}
              paleta={paleta}
              activa={servicio === linea.titulo}
              onClick={() => setServicio(linea.titulo)}
            >
              {linea.tituloCorto}
            </Filtro>
          ))}
        </div>

        {visibles.length === 0 ? (
          <p className={`text-[17px] ${paleta.textoSuave} pb-4`}>{t.blog.sinResenas}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibles.map((resena) => (
              <article
                key={resena.id}
                className={`border ${paleta.borde} p-8 flex flex-col gap-[18px]`}
              >
                <div className="flex items-center justify-between gap-4">
                  <Estrellas valor={resena.estrellas} />
                  <span
                    className={`text-xs tracking-[0.12em] uppercase ${paleta.textoTenue}`}
                  >
                    {resena.servicio}
                  </span>
                </div>
                <p className={`text-lg leading-relaxed ${paleta.textoFuerte} italic`}>
                  {resena.texto}
                </p>
                <div className="flex flex-col gap-0.5 mt-auto">
                  <span className="text-[15px] font-bold">{resena.nombre}</span>
                  <span className={`text-[13px] ${paleta.textoTenue}`}>
                    {[resena.pais, resena.creado?.toLocaleDateString(idioma === 'en' ? 'en-GB' : 'es-ES')]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <FormularioResena paleta={paleta} />
      </div>
    </section>
  );
};

const Filtro: React.FC<{
  paleta: Paleta;
  activa: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ paleta, activa, onClick, children }) => (
  <button
    onClick={onClick}
    aria-current={activa ? 'true' : undefined}
    className={`text-[15px] px-4 py-2 transition-colors ${
      activa
        ? 'bg-[#F9A600] text-[#000000] font-bold'
        : `border ${paleta.borde} ${paleta.texto} hover:border-[#F9A600]`
    }`}
  >
    {children}
  </button>
);

/** Formulario de reseña. Envía a la cola de moderación, no publica. */
const FormularioResena: React.FC<{ paleta: Paleta }> = ({ paleta }) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const lineas = contenidoServicios(idioma).lineas;

  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');
  const [servicio, setServicio] = useState(lineas[0].titulo);
  const [estrellas, setEstrellas] = useState(5);
  const [texto, setTexto] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviada, setEnviada] = useState(false);
  const [error, setError] = useState('');

  const campo = `border ${paleta.borde} ${paleta.banda} ${paleta.texto} px-3.5 py-3.5 text-base outline-none focus-visible:outline-2 focus-visible:outline-[#F9A600]`;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acepta) {
      setError(textos(idioma).formulario.consentimientoFalta);
      return;
    }

    setEnviando(true);
    setError('');
    try {
      await enviarResena({ nombre, pais, servicio, estrellas, texto });
      setEnviada(true);
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : String(fallo));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      className={`mt-12 border ${paleta.borde} p-8 md:p-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start`}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-[24px] md:text-[26px] leading-tight font-bold">
          {t.blog.dejarResena}
        </h3>
        <p className={`text-base leading-relaxed ${paleta.textoSuave}`}>
          {t.blog.dejarResenaTexto}
        </p>
        <AvisoModeracion
          paleta={paleta}
          titulo={t.blog.moderacionTitulo}
          texto={t.blog.moderacionResena}
        />
      </div>

      {enviada ? (
        <p className={`text-[17px] leading-relaxed ${paleta.textoFuerte}`}>
          {t.blog.resenaEnviada}
        </p>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="resena-nombre" className="text-sm font-bold">
                {t.blog.nombre}
              </label>
              <input
                id="resena-nombre"
                required
                minLength={2}
                maxLength={60}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={campo}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="resena-pais" className="text-sm font-bold">
                {t.blog.pais}
              </label>
              <input
                id="resena-pais"
                maxLength={60}
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className={campo}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="resena-servicio" className="text-sm font-bold">
              {t.blog.servicioRecibido}
            </label>
            <select
              id="resena-servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className={campo}
            >
              {lineas.map((linea) => (
                <option key={linea.clave} value={linea.titulo}>
                  {linea.titulo}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold mb-2">{t.blog.valoracion}</legend>
            <div className="flex gap-2.5 items-center">
              {[1, 2, 3, 4, 5].map((valor) => (
                <button
                  key={valor}
                  type="button"
                  onClick={() => setEstrellas(valor)}
                  aria-pressed={estrellas === valor}
                  aria-label={t.blog.deCinco(valor)}
                  className={`w-[26px] h-[26px] transition-colors ${
                    valor <= estrellas ? 'bg-[#F9A600]' : `border ${paleta.borde}`
                  }`}
                />
              ))}
              <span className={`text-[15px] ${paleta.textoTenue} ml-2`}>
                {t.blog.deCinco(estrellas)}
              </span>
            </div>
          </fieldset>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="resena-texto" className="text-sm font-bold">
              {t.blog.suResena}
            </label>
            <textarea
              id="resena-texto"
              rows={4}
              required
              minLength={10}
              maxLength={1500}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className={`${campo} resize-y`}
            />
          </div>

          {/* Lo que se va a publicar, dicho antes de enviarlo. */}
          <p className={`text-sm leading-[1.55] ${paleta.textoTenue}`}>
            {t.blog.avisoPublicacion}
          </p>

          <Consentimiento
            idioma={idioma}
            aceptado={acepta}
            onCambio={setAcepta}
            oscuro={paleta.logo === 'ambar'}
          />

          {error && <p className={`text-sm ${paleta.acentoTexto}`}>{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="bg-[#F9A600] text-[#000000] py-4 text-[17px] font-bold hover:bg-[#FFC048] disabled:opacity-60 transition-colors"
          >
            {enviando ? t.blog.enviando : t.blog.enviarRevision}
          </button>
        </form>
      )}
    </div>
  );
};
