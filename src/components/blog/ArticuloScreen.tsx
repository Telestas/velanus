import React, { useEffect, useMemo, useState } from 'react';
import { NavigationProps } from '../../types';
import { Entrada, entradaPorSlug, entradasPublicadas } from '../../data/blog';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { tituloDeArticulo } from '../../seo';
import { useVarianteHome } from '../home/useVariante';
import { CabeceraSitio } from '../marca/CabeceraSitio';
import { PieSitio } from '../marca/PieSitio';
import { Miga } from '../marca/piezas';
import { ANCHO, paletaDe } from '../marca/paleta';
import { Comentarios } from './Comentarios';
import { FichaEntrada, MarcoImagen } from './piezas';

/**
 * Bloque del cuerpo de un artículo.
 *
 * El cuerpo se guarda como texto plano desde el panel. Aquí se interpreta con
 * dos convenciones mínimas, para no meter un editor de texto enriquecido ni una
 * dependencia de Markdown:
 *
 *   ## Encabezado    → sección (y entrada en la tabla de contenidos)
 *   - Elemento       → punto de lista
 *   > Frase          → destacado con filete ámbar
 *
 * Todo lo demás es un párrafo.
 */
type Bloque =
  | { tipo: 'encabezado'; texto: string; id: string }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'destacado'; texto: string };

const idDeEncabezado = (texto: string, indice: number): string =>
  `${texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)}-${indice}`;

const analizarCuerpo = (cuerpo: string): Bloque[] => {
  const bloques: Bloque[] = [];
  let lista: string[] = [];

  const cerrarLista = () => {
    if (lista.length) {
      bloques.push({ tipo: 'lista', items: lista });
      lista = [];
    }
  };

  cuerpo.split('\n').forEach((linea) => {
    const texto = linea.trim();
    if (!texto) return cerrarLista();

    if (texto.startsWith('## ')) {
      cerrarLista();
      const titulo = texto.slice(3).trim();
      bloques.push({ tipo: 'encabezado', texto: titulo, id: idDeEncabezado(titulo, bloques.length) });
      return;
    }
    if (texto.startsWith('- ')) return lista.push(texto.slice(2).trim());
    if (texto.startsWith('> ')) {
      cerrarLista();
      return bloques.push({ tipo: 'destacado', texto: texto.slice(2).trim() });
    }
    cerrarLista();
    bloques.push({ tipo: 'parrafo', texto });
  });

  cerrarLista();
  return bloques;
};

/** Se expone para poder probar el intérprete sin montar la pantalla. */
export const analizarCuerpoParaPruebas = analizarCuerpo;

/**
 * Artículo del blog.
 *
 * Medida de 720 px para el cuerpo —unos 75 caracteres por línea, que es la
 * lectura cómoda para texto largo— y tabla de contenidos fija a la izquierda
 * solo en escritorio. El aviso legal va al pie del artículo, antes del CTA y de
 * los comentarios.
 */
export const ArticuloScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
  parametro,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const paleta = paletaDe(useVarianteHome());

  const [entrada, setEntrada] = useState<Entrada | null>(null);
  const [otras, setOtras] = useState<Entrada[]>([]);
  const [cargando, setCargando] = useState(true);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setCargando(true);
    void (async () => {
      const [encontrada, todas] = await Promise.all([
        parametro ? entradaPorSlug(parametro) : Promise.resolve(null),
        entradasPublicadas(),
      ]);
      setEntrada(encontrada);
      setOtras(todas);
      setCargando(false);

      // El título de la pestaña y la tarjeta al compartir son los del artículo,
      // no los genéricos del blog; hasta aquí no se sabía cuál era.
      if (encontrada) tituloDeArticulo(encontrada.titulo, encontrada.resumen);
    })();
  }, [parametro]);

  const bloques = useMemo(() => (entrada ? analizarCuerpo(entrada.cuerpo) : []), [entrada]);
  const secciones = bloques.filter(
    (bloque): bloque is Extract<Bloque, { tipo: 'encabezado' }> => bloque.tipo === 'encabezado',
  );

  const relacionados = otras
    .filter((otra) => otra.id !== entrada?.id)
    .filter((otra) => !entrada || otra.categoria === entrada.categoria)
    .slice(0, 3);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin permiso de portapapeles no se puede hacer más; los otros dos
      // botones de compartir siguen funcionando.
    }
  };

  const cabecera = (
    <CabeceraSitio
      paleta={paleta}
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      openDiagnosticModal={openDiagnosticModal}
      seccionActiva={t.nav.blog}
      borde
    />
  );

  if (cargando) {
    return (
      <div className={`${paleta.fondo} ${paleta.texto} font-marca min-h-screen`}>
        {cabecera}
        <div className={`${ANCHO} py-24`}>
          <p className={paleta.textoSuave}>…</p>
        </div>
      </div>
    );
  }

  /* Slug inexistente: se dice, y se ofrecen los últimos artículos en vez de
     dejar al visitante en una página muerta. */
  if (!entrada) {
    return (
      <div className={`${paleta.fondo} ${paleta.texto} font-marca`}>
        {cabecera}
        <Miga
          paleta={paleta}
          onNavigate={onNavigate}
          ruta={[
            { label: t.servicios.migaInicio, pantalla: 'home-desktop' },
            { label: t.blog.miga, pantalla: 'blog' },
          ]}
          actual={t.blog.noEncontrado}
        />
        <section className={`${ANCHO} py-16 flex flex-col gap-5 max-w-[720px]`}>
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[34px] md:text-[42px] leading-tight font-bold">
            {t.blog.noEncontrado}
          </h1>
          <p className={`text-lg leading-relaxed ${paleta.textoSuave}`}>
            {t.blog.noEncontradoTexto}
          </p>
          <button
            onClick={() => onNavigate('blog', 'push_back')}
            className={`text-base font-bold self-start ${paleta.acentoTexto}`}
          >
            {t.blog.volverAlBlog}
          </button>
        </section>
        <section className={`${ANCHO} pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {otras.slice(0, 3).map((otra) => (
            <FichaEntrada
              key={otra.id}
              paleta={paleta}
              entrada={otra}
              etiquetaImagen={t.blog.imagen}
              minutos={t.blog.minutos}
              onClick={() => onNavigate('blog-articulo', 'push', otra.slug)}
            />
          ))}
        </section>
        <PieSitio paleta={paleta} onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className={`${paleta.fondo} ${paleta.texto} font-marca`}>
      {cabecera}

      <Miga
        paleta={paleta}
        onNavigate={onNavigate}
        ruta={[
          { label: t.servicios.migaInicio, pantalla: 'home-desktop' },
          { label: t.blog.miga, pantalla: 'blog' },
        ]}
        actual={entrada.titulo}
      />

      {/* ficha del artículo */}
      <header className={`${ANCHO} pt-6 pb-12 max-w-[900px]`}>
        <div className="flex flex-col gap-5">
          <span className={`text-xs tracking-[0.14em] uppercase ${paleta.acentoTexto}`}>
            {entrada.categoria}
          </span>
          <h1 className="text-[34px] md:text-[46px] leading-[1.12] font-bold text-pretty">
            {entrada.titulo}
          </h1>
          <p className={`text-lg md:text-[21px] leading-[1.55] ${paleta.textoFuerte} text-pretty`}>
            {entrada.resumen}
          </p>
          <div
            className={`flex items-center gap-5 py-5 border-t border-b ${paleta.borde} flex-wrap`}
          >
            {entrada.autor && (
              <div className="flex flex-col">
                <span className="text-[15px] font-bold">{entrada.autor}</span>
                {entrada.autorCargo && (
                  <span className={`text-[13px] ${paleta.textoTenue}`}>
                    {entrada.autorCargo}
                  </span>
                )}
              </div>
            )}
            <span className={`text-[15px] ${paleta.textoSuave}`}>{entrada.fecha}</span>
            <span className={`text-[15px] ${paleta.textoSuave}`}>
              {t.blog.minutos(entrada.minutos)}
            </span>
          </div>
        </div>
      </header>

      <div className={`${ANCHO} pb-18 grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-18 items-start`}>
        {/* tabla de contenidos y compartir */}
        <aside className="hidden lg:flex sticky top-6 flex-col gap-3.5">
          {secciones.length > 0 && (
            <>
              <span className={`text-xs tracking-[0.16em] uppercase ${paleta.acentoTexto}`}>
                {t.blog.enEsteArticulo}
              </span>
              <nav className="flex flex-col gap-0.5">
                {secciones.map((seccion) => (
                  <a
                    key={seccion.id}
                    href={`#${seccion.id}`}
                    className={`text-[15px] leading-[1.5] ${paleta.textoSuave} border-l-2 ${paleta.borde} hover:border-[#F9A600] py-2 pl-3.5 transition-colors`}
                  >
                    {seccion.texto}
                  </a>
                ))}
              </nav>
            </>
          )}

          <div className={`border-t ${paleta.borde} pt-4 mt-2 flex flex-col gap-2.5`}>
            <span className={`text-xs tracking-[0.16em] uppercase ${paleta.textoTenue}`}>
              {t.blog.compartir}
            </span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={copiarEnlace}
                className={`text-sm border px-3 py-2 transition-colors ${paleta.botonSecundario}`}
              >
                {copiado ? t.blog.enlaceCopiado : t.blog.copiarEnlace}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener"
                className={`text-sm border px-3 py-2 transition-colors ${paleta.botonSecundario}`}
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${entrada.titulo} ${url}`)}`}
                target="_blank"
                rel="noopener"
                className={`text-sm border px-3 py-2 transition-colors ${paleta.botonSecundario}`}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </aside>

        {/* cuerpo */}
        <div className="max-w-[720px] flex flex-col gap-7">
          <MarcoImagen
            paleta={paleta}
            src={entrada.imagen}
            alt={entrada.titulo}
            proporcion="aspect-[16/9]"
            etiqueta={t.blog.imagen}
          />

          {bloques.map((bloque, i) => {
            if (bloque.tipo === 'encabezado') {
              return (
                <h2
                  key={i}
                  id={bloque.id}
                  className="text-[26px] md:text-[30px] leading-tight font-bold mt-4 scroll-mt-8"
                >
                  {bloque.texto}
                </h2>
              );
            }
            if (bloque.tipo === 'destacado') {
              return (
                <blockquote key={i} className="border-l-[3px] border-[#F9A600] pl-6 py-2">
                  <p className="text-[20px] md:text-[22px] leading-[1.5] italic">
                    {bloque.texto}
                  </p>
                </blockquote>
              );
            }
            if (bloque.tipo === 'lista') {
              return (
                <ul key={i} className="flex flex-col gap-3">
                  {bloque.items.map((item) => (
                    <li key={item} className="flex gap-3.5 items-baseline">
                      <span className="w-1.5 h-1.5 bg-[#F9A600] flex-none" />
                      <span className={`text-[19px] leading-[1.7] ${paleta.textoFuerte}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className={`text-[19px] leading-[1.75] ${paleta.textoFuerte}`}>
                {bloque.texto}
              </p>
            );
          })}

          {/* aviso legal: informativo, no asesoría */}
          <div className={`mt-6 border ${paleta.borde} ${paleta.banda} p-7 flex flex-col gap-2.5`}>
            <span className={`text-xs tracking-[0.16em] uppercase ${paleta.acentoTexto}`}>
              {t.blog.avisoTitulo}
            </span>
            <p className={`text-base leading-relaxed ${paleta.textoSuave}`}>{t.blog.aviso}</p>
          </div>

          <div className="bg-[#F9A600] text-[#000000] p-8 flex items-center justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-1.5">
              <span className="text-[21px] font-bold">{t.blog.ctaTitulo}</span>
              <span className="text-base">{t.blog.ctaTexto}</span>
            </div>
            <button
              onClick={openDiagnosticModal}
              className="text-base font-bold text-[#F9A600] bg-[#000000] px-6 py-4 flex-none hover:bg-[#333333] transition-colors"
            >
              {t.nav.agendar}
            </button>
          </div>

          <Comentarios paleta={paleta} slug={entrada.slug} />
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className={paleta.banda}>
          <div className={`${ANCHO} py-18`}>
            <h2 className="text-[26px] md:text-[30px] font-bold mb-8">{t.blog.relacionados}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relacionados.map((otra) => (
                <FichaEntrada
                  key={otra.id}
                  paleta={paleta}
                  entrada={otra}
                  etiquetaImagen={t.blog.imagen}
                  minutos={t.blog.minutos}
                  compacta
                  onClick={() => onNavigate('blog-articulo', 'push', otra.slug)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};
