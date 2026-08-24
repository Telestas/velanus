import React, { useEffect, useMemo, useState } from 'react';
import { NavigationProps } from '../../types';
import { Entrada, entradasPublicadas } from '../../data/blog';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { Enlace } from '../home/comunes';
import { useVarianteHome } from '../home/useVariante';
import { CabeceraSitio } from '../marca/CabeceraSitio';
import { PieSitio } from '../marca/PieSitio';
import { Miga } from '../marca/piezas';
import { ANCHO, paletaDe, Paleta } from '../marca/paleta';
import { SeccionResenas } from './SeccionResenas';
import { FichaEntrada, MarcoImagen } from './piezas';

/** Categorías del blog, en el orden de la maqueta. */
const CATEGORIAS_ES = [
  'Fiscal y contable',
  'Legal corporativo',
  'Trámites y documentación',
  'Noticias regulatorias',
  'Eventos',
];

const CATEGORIAS_EN = [
  'Tax and accounting',
  'Corporate law',
  'Paperwork and documents',
  'Regulatory news',
  'Events',
];

const POR_PAGINA = 6;

/**
 * Listado del blog: buscador, filtro por categoría, artículo destacado, rejilla
 * paginada y, debajo, las reseñas de clientes —que en esta maqueta dejan de ser
 * una página aparte y pasan a ser una sección del blog.
 *
 * Si no hay ningún artículo publicado se pinta el estado vacío en vez de una
 * rejilla en blanco: es lo que verá el sitio hasta que se publique el primero.
 */
export const BlogScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const paleta = paletaDe(useVarianteHome());

  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [consulta, setConsulta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    void entradasPublicadas().then((leidas) => {
      setEntradas(leidas);
      setCargando(false);
    });
  }, []);

  const categorias = idioma === 'en' ? CATEGORIAS_EN : CATEGORIAS_ES;

  /* El filtrado es en cliente: con decenas de artículos sobra, y evita pedir a
     Firestore un índice por cada combinación de categoría y búsqueda. */
  const filtradas = useMemo(() => {
    const texto = consulta.trim().toLowerCase();
    return entradas.filter((entrada) => {
      const coincideCategoria = !categoria || entrada.categoria === categoria;
      const coincideTexto =
        !texto ||
        [entrada.titulo, entrada.resumen, entrada.cuerpo, entrada.categoria]
          .join(' ')
          .toLowerCase()
          .includes(texto);
      return coincideCategoria && coincideTexto;
    });
  }, [entradas, categoria, consulta]);

  const destacada =
    !categoria && !consulta ? filtradas.find((entrada) => entrada.destacada) : undefined;
  const restantes = filtradas.filter((entrada) => entrada.id !== destacada?.id);

  const paginas = Math.max(1, Math.ceil(restantes.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, paginas - 1);
  const visibles = restantes.slice(
    paginaActual * POR_PAGINA,
    paginaActual * POR_PAGINA + POR_PAGINA,
  );

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    setConsulta(busqueda);
    setPagina(0);
  };

  const irAlArticulo = (entrada: Entrada) => onNavigate('blog-articulo', 'push', entrada.slug);

  const vacio = !cargando && entradas.length === 0;

  return (
    <div className={`${paleta.fondo} ${paleta.texto} font-marca`}>
      <CabeceraSitio
        paleta={paleta}
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        openDiagnosticModal={openDiagnosticModal}
        borde
      />

      <Miga
        paleta={paleta}
        onNavigate={onNavigate}
        ruta={[{ label: t.servicios.migaInicio, pantalla: 'home-desktop' }]}
        actual={t.blog.miga}
      />

      {vacio ? (
        <EstadoVacio
          paleta={paleta}
          onNavigate={onNavigate}
          openDiagnosticModal={openDiagnosticModal}
          categorias={categorias}
        />
      ) : (
        <>
          {/* portada del blog y buscador */}
          <section
            className={`${ANCHO} pt-6 pb-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-end`}
          >
            <div className="flex flex-col gap-5">
              <div className="w-14 h-[3px] bg-[#F9A600]" />
              <h1 className="text-[38px] md:text-[52px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
                {t.blog.titulo}
              </h1>
              <p
                className={`text-lg md:text-xl leading-relaxed ${paleta.textoFuerte} max-w-[600px] text-pretty`}
              >
                {t.blog.entradilla}
              </p>
            </div>

            <form onSubmit={buscar} className="flex flex-col gap-2.5">
              <label htmlFor="buscar-blog" className="text-sm font-bold">
                {t.blog.buscar}
              </label>
              <div className={`flex border ${paleta.borde}`}>
                <input
                  id="buscar-blog"
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder={t.blog.buscarPlaceholder}
                  className={`flex-1 min-w-0 border-none px-4 py-[15px] text-base outline-none focus-visible:outline-2 focus-visible:outline-[#F9A600] ${paleta.banda} ${paleta.texto}`}
                />
                <button
                  type="submit"
                  className="bg-[#F9A600] text-[#000000] text-[15px] font-bold px-6 hover:bg-[#FFC048] transition-colors"
                >
                  {t.blog.botonBuscar}
                </button>
              </div>
            </form>
          </section>

          {/* categorías */}
          <section className={`${ANCHO} pb-10`}>
            <div
              className={`border-t border-b ${paleta.borde} py-5 flex items-center gap-3 flex-wrap`}
            >
              <span
                className={`text-[13px] tracking-[0.16em] uppercase ${paleta.textoTenue} mr-2`}
              >
                {t.blog.categorias}
              </span>
              <Pastilla
                paleta={paleta}
                activa={!categoria}
                onClick={() => {
                  setCategoria('');
                  setPagina(0);
                }}
              >
                {t.blog.todas}
              </Pastilla>
              {categorias.map((nombre) => (
                <Pastilla
                  key={nombre}
                  paleta={paleta}
                  activa={categoria === nombre}
                  onClick={() => {
                    setCategoria(nombre);
                    setPagina(0);
                  }}
                >
                  {nombre}
                </Pastilla>
              ))}
            </div>
          </section>

          {/* destacado */}
          {destacada && (
            <section className={`${ANCHO} pb-16`}>
              <article
                className={`border ${paleta.borde} grid md:grid-cols-2 gap-8 md:gap-12 items-center`}
              >
                <MarcoImagen
                  paleta={paleta}
                  src={destacada.imagen}
                  alt={destacada.titulo}
                  proporcion="aspect-[16/11]"
                  etiqueta={t.blog.imagenDestacada}
                />
                <div className="flex flex-col gap-4 p-8 md:pl-0 md:pr-10 md:py-10">
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <span className="text-xs tracking-[0.14em] uppercase bg-[#F9A600] text-[#000000] px-2.5 py-1.5">
                      {t.blog.destacado}
                    </span>
                    <span
                      className={`text-xs tracking-[0.14em] uppercase ${paleta.acentoTexto}`}
                    >
                      {destacada.categoria}
                    </span>
                  </div>
                  <h2 className="text-[28px] md:text-[34px] leading-tight font-bold text-pretty">
                    {destacada.titulo}
                  </h2>
                  <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
                    {destacada.resumen}
                  </p>
                  <span className={`text-sm ${paleta.textoTenue}`}>
                    {destacada.fecha}
                    {destacada.autor ? ` · ${destacada.autor}` : ''} ·{' '}
                    {t.blog.minutos(destacada.minutos)}
                  </span>
                  <button
                    onClick={() => irAlArticulo(destacada)}
                    className={`text-base font-bold text-left ${paleta.acentoTexto}`}
                  >
                    {t.blog.leerArticulo}
                  </button>
                </div>
              </article>
            </section>
          )}

          {/* rejilla */}
          <section className={`${ANCHO} pb-10 flex justify-between items-baseline gap-6`}>
            <h2 className="text-[24px] md:text-[28px] font-bold">{t.blog.ultimas}</h2>
            <span className={`text-sm ${paleta.textoTenue}`}>
              {t.blog.articulos(filtradas.length)}
            </span>
          </section>

          <section className={`${ANCHO} pb-14`}>
            {cargando && <p className={paleta.textoSuave}>…</p>}

            {!cargando && visibles.length === 0 && (
              <p className={`text-[17px] ${paleta.textoSuave}`}>{t.blog.sinResultados}</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {visibles.map((entrada) => (
                <FichaEntrada
                  key={entrada.id}
                  paleta={paleta}
                  entrada={entrada}
                  etiquetaImagen={t.blog.imagen}
                  minutos={t.blog.minutos}
                  onClick={() => irAlArticulo(entrada)}
                />
              ))}
            </div>
          </section>

          {/* paginación */}
          {paginas > 1 && (
            <nav className={`${ANCHO} pb-18 flex justify-center items-center gap-2 flex-wrap`}>
              <Pastilla
                paleta={paleta}
                activa={false}
                deshabilitada={paginaActual === 0}
                onClick={() => setPagina(paginaActual - 1)}
              >
                {t.blog.anterior}
              </Pastilla>
              {Array.from({ length: paginas }, (_, i) => (
                <Pastilla
                  key={i}
                  paleta={paleta}
                  activa={i === paginaActual}
                  onClick={() => setPagina(i)}
                >
                  {String(i + 1)}
                </Pastilla>
              ))}
              <Pastilla
                paleta={paleta}
                activa={false}
                deshabilitada={paginaActual >= paginas - 1}
                onClick={() => setPagina(paginaActual + 1)}
              >
                {t.blog.siguiente}
              </Pastilla>
            </nav>
          )}
        </>
      )}

      <SeccionResenas paleta={paleta} />

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};

/** Pastilla de filtro y de paginación. */
const Pastilla: React.FC<{
  paleta: Paleta;
  activa: boolean;
  deshabilitada?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ paleta, activa, deshabilitada = false, onClick, children }) => (
  <button
    onClick={onClick}
    disabled={deshabilitada}
    aria-current={activa ? 'true' : undefined}
    className={`text-[15px] px-4 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
      activa
        ? 'bg-[#F9A600] text-[#000000] font-bold'
        : `border ${paleta.borde} ${paleta.texto} hover:border-[#F9A600]`
    }`}
  >
    {children}
  </button>
);

/** Lo que se ve mientras no hay ni un artículo publicado. */
const EstadoVacio: React.FC<{
  paleta: Paleta;
  onNavigate: NavigationProps['onNavigate'];
  openDiagnosticModal: () => void;
  categorias: string[];
}> = ({ paleta, onNavigate, openDiagnosticModal, categorias }) => {
  const t = textos(useIdioma());

  return (
    <>
      <section className={`${ANCHO} pt-8 pb-14 flex flex-col gap-5 max-w-[760px]`}>
        <div className="w-14 h-[3px] bg-[#F9A600]" />
        <h1 className="text-[38px] md:text-[52px] leading-[1.08] font-bold tracking-[-0.01em]">
          {t.blog.titulo}
        </h1>
      </section>

      <section className={`${ANCHO} pb-22`}>
        <div
          className={`border ${paleta.borde} p-10 md:p-16 grid lg:grid-cols-2 gap-12 lg:gap-18 items-center`}
        >
          <div className="flex flex-col gap-5">
            <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
              {t.blog.vacioEtiqueta}
            </span>
            <h2 className="text-[28px] md:text-[34px] leading-tight font-bold text-pretty">
              {t.blog.vacioTitulo}
            </h2>
            <p className={`text-lg leading-relaxed ${paleta.textoSuave}`}>
              {t.blog.vacioTexto}
            </p>
            <div className="flex gap-3.5 flex-wrap mt-2">
              <button
                onClick={openDiagnosticModal}
                className="text-base font-bold text-[#000000] bg-[#F9A600] px-[26px] py-[15px] hover:bg-[#FFC048] transition-colors"
              >
                {t.blog.proponerTema}
              </button>
              <Enlace
                destino={{ label: t.blog.verServicios, pantalla: 'servicios-desktop' }}
                onNavigate={onNavigate}
                className={`text-base border px-6 py-3.5 transition-colors ${paleta.botonSecundario}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className={`text-xs tracking-[0.18em] uppercase ${paleta.textoTenue}`}>
              {t.blog.categoriasPrevistas}
            </span>
            <div className="flex flex-col">
              {categorias.map((nombre, i) => (
                <span
                  key={nombre}
                  className={`text-[17px] ${paleta.textoSuave} py-3.5 border-t ${paleta.borde} ${
                    i === categorias.length - 1 ? 'border-b' : ''
                  }`}
                >
                  {nombre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
