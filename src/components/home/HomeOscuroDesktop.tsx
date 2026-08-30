import React from 'react';
import { NavigationProps } from '../../types';
import {
  CONTACT_EMAIL,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../../config';
import { contenidoHome } from '../../content/home';
import { useCifras, valorDeCifra } from '../../data/cifras';
import {
  Enlace,
  FormularioContacto,
  LogoVelaNus,
  mensajeConsulta,
  navHome,
} from './comunes';
import { PieSitio } from '../marca/PieSitio';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { paletaDe } from '../marca/paleta';
import { useVarianteHome } from './useVariante';

/**
 * Home, dirección «modo oscuro» (1a en la maqueta): portada a página completa,
 * cifras sobre banda ámbar, servicios en tarjetas y proceso vertical.
 *
 * Pinta también la dirección «azul» (1c), que es exactamente esta retícula con
 * el negro sustituido por azul marino: las superficies oscuras salen de
 * `paletaDe(variante)` en vez de estar escritas aquí. Las superficies claras
 * —tarjetas de servicio, banda ámbar, proceso— son idénticas en ambas y sí van
 * literales.
 *
 * Como el resto de pantallas del proyecto, es autocontenida: trae su propia
 * cabecera y su propio pie.
 */
export const HomeOscuroDesktop: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const paleta = paletaDe(useVarianteHome());
  const cifrasGuardadas = useCifras();
  const t = textos(idioma);
  const c = contenidoHome(idioma);

  return (
    <div className="bg-[#FAFAFA] text-[#000000] font-marca">
    {/* cabecera */}
    <header className={`${paleta.fondo} ${paleta.texto}`}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 min-h-[84px] py-4 flex items-center justify-between gap-8 flex-wrap">
        <LogoVelaNus tono="ambar" alto={44} conBajada />

        <div className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
          <nav className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
            {navHome(idioma).map((destino) => {
              const activo = destino.pantalla === currentScreen;
              return (
                <Enlace
                  key={destino.label}
                  destino={destino}
                  onNavigate={onNavigate}
                  activo={activo}
                  className={
                    activo
                      ? 'text-[15px] text-[#F9A600] border-b-2 border-[#F9A600] pb-[3px]'
                      : 'text-[15px] text-[#FAFAFA] hover:text-[#F9A600] transition-colors'
                  }
                />
              );
            })}
          </nav>

          
          <button
            onClick={openDiagnosticModal}
            className="text-sm font-bold text-[#000000] bg-[#F9A600] px-[18px] py-[11px] hover:bg-[#FFC048] transition-colors"
          >
            {t.nav.agendar}
          </button>
        </div>
      </div>
    </header>

    {/* portada */}
    <section className={`${paleta.fondo} ${paleta.texto} relative overflow-hidden`}>
      {/* Anillos ámbar de la maqueta: decoración, invisible para lectores. */}
      <div aria-hidden className="pointer-events-none">
        <div className="absolute -right-[120px] -top-20 w-[520px] h-[520px] rounded-full border border-[#F9A600]/30" />
        <div className="absolute right-10 top-[120px] w-80 h-80 rounded-full border border-[#F9A600]/20" />
        <div className="absolute right-[180px] top-0 bottom-0 w-px bg-[#F9A600]/15" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 md:py-24 relative">
        <div className="max-w-[820px] flex flex-col gap-7">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">
            {c.heroOscuro.antetitulo}
          </span>
          <h1 className="text-[38px] md:text-[62px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
            {c.heroOscuro.titulo}
          </h1>
          <p className={`text-lg md:text-[21px] leading-[1.55] ${paleta.textoFuerte} max-w-[660px] text-pretty`}>
            {c.heroOscuro.entradilla}
          </p>
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <a
              href={whatsappLink(mensajeConsulta(idioma))}
              target="_blank"
              rel="noopener"
              className="text-[17px] font-bold text-[#000000] bg-[#F9A600] px-[30px] py-[17px] hover:bg-[#FFC048] transition-colors"
            >
              {t.home.agendarWhatsApp}
            </a>
            <Enlace
              destino={{ label: t.home.verServicios, pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className={`text-[17px] border px-7 py-4 transition-colors ${paleta.botonSecundario}`}
            />
          </div>
          <p className={`text-sm ${paleta.textoSuave} mt-1.5`}>
            {t.home.respuesta24h} · {CONTACT_TIMEZONE} · {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    </section>

    {/* cifras — BORRADOR: pendientes de que las confirme el cliente */}
    <section className="bg-[#F9A600] text-[#000000]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-[30px] grid grid-cols-2 lg:grid-cols-4 gap-8">
        {c.cifras.map((cifra) => (
          <div key={cifra.etiqueta} className="flex flex-col gap-1">
            <span className="text-2xl lg:text-[34px] font-bold leading-none">{valorDeCifra(cifra.clave, cifrasGuardadas, idioma)}</span>
            <span className="text-sm tracking-[0.06em] uppercase">{cifra.etiqueta}</span>
          </div>
        ))}
      </div>
    </section>

    {/* problemas */}
    <section className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-26">
      <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">
        <div className="flex flex-col gap-[18px] lg:sticky lg:top-6">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold text-pretty">
            {t.home.problemasTitulo}
          </h2>
          <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
            {t.home.problemasEntradilla}
          </p>
        </div>

        <div className="flex flex-col">
          {c.problemas.map((problema, i) => (
            <div
              key={problema.numero}
              className={`grid grid-cols-[44px_1fr] gap-6 py-7 border-t border-[#E4E4E4] ${
                i === c.problemas.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className="text-[15px] font-bold text-[#8A5800]">{problema.numero}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold">{problema.titulo}</h3>
                <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                  {problema.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* servicios */}
    <section id="servicios" className="bg-[#F1F1F0]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-24">
        <div className="flex justify-between items-end gap-10 mb-11 flex-wrap">
          <div className="flex flex-col gap-3.5">
            <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
              {t.home.serviciosEtiqueta}
            </span>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
              {t.home.serviciosTitulo}
            </h2>
          </div>
          <Enlace
            destino={{ label: t.home.verTodos, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-base font-bold border-b-2 border-[#F9A600] pb-1"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.lineas.map((linea) => (
            <div
              key={linea.clave}
              className="bg-[#FAFAFA] border-t-4 border-[#F9A600] px-8 pt-9 pb-8 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] tracking-[0.16em] text-[#767676]">
                  {linea.clave}
                </span>
                <h3 className="text-[26px] leading-tight font-bold">{linea.titulo}</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {linea.items.map((item) => (
                  <li key={item} className="flex gap-3 items-baseline">
                    <span className="w-1.5 h-1.5 bg-[#F9A600] flex-none" />
                    <span className="text-base leading-normal text-[#4A4A4A]">{item}</span>
                  </li>
                ))}
              </ul>
              <Enlace
                destino={{ label: t.home.verLineaCompleta, pantalla: 'servicios-desktop' }}
                onNavigate={onNavigate}
                className="mt-auto text-base font-bold"
              />
            </div>
          ))}
        </div>

        {/* Bloque C: fuera de la grilla corporativa, a propósito. */}
        <div className="mt-6 bg-[#FAFAFA] border border-[#E4E4E4] px-8 py-7 flex items-center justify-between gap-10 flex-wrap">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs tracking-[0.16em] uppercase text-[#767676]">
              {c.tramites.etiqueta}
            </span>
            <h3 className="text-[22px] font-bold">{c.tramites.titulo}</h3>
            <p className="text-base text-[#4A4A4A]">{c.tramites.descripcion}</p>
          </div>
          <Enlace
            destino={{ label: c.tramites.enlace, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-base font-bold border border-[#000000] px-6 py-3.5 flex-none hover:bg-[#000000] hover:text-[#FAFAFA] transition-colors"
          />
        </div>
      </div>
    </section>

    {/* proceso */}
    <section className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-26">
      <div className="flex flex-col gap-3.5 mb-12 max-w-[680px]">
        <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
          {t.home.procesoEtiqueta}
        </span>
        <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
          {t.home.procesoTitulo}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {c.pasos.map((paso, i) => (
          <div
            key={paso.numero}
            className={`pr-8 pt-6 flex flex-col gap-2.5 border-t-[3px] ${
              i === c.pasos.length - 1 ? 'border-[#F9A600]' : 'border-[#000000]'
            }`}
          >
            <span className="text-sm font-bold text-[#8A5800]">{paso.numero}</span>
            <h3 className="text-[21px] font-bold">{paso.titulo}</h3>
            <p className="text-base leading-relaxed text-[#4A4A4A]">{paso.descripcion}</p>
          </div>
        ))}
      </div>
    </section>

    {/* reseñas — BORRADOR: sin texto aprobado por los clientes */}
    <section id="resenas" className={`${paleta.fondo} ${paleta.texto}`}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-24">
        <div className="flex justify-between items-end gap-10 mb-11 flex-wrap">
          <div className="flex flex-col gap-3.5">
            <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">
              {t.home.resenasEtiqueta}
            </span>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
              {t.home.resenasTitulo}
            </h2>
          </div>
          <Enlace
            destino={{ label: `${t.home.dejarResena} →`, pantalla: 'casos-desktop' }}
            onNavigate={onNavigate}
            className="text-base font-bold text-[#F9A600]"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.resenas.map((resena) => (
            <div
              key={resena.procedencia}
              className={`border ${paleta.borde} p-8 flex flex-col gap-5`}
            >
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="w-3.5 h-3.5 bg-[#F9A600]" />
                ))}
              </div>
              <p className={`text-lg leading-relaxed ${paleta.textoFuerte} italic`}>{resena.cita}</p>
              <div className="flex items-center gap-3.5 mt-auto">
                <div className={`w-11 h-11 flex-none ${paleta.avatar}`} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold">{resena.autor}</span>
                  <span className={`text-[13px] ${paleta.textoSuave}`}>{resena.procedencia}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-6 text-sm ${paleta.textoSuave}`}>{c.avisoResenas}</p>
      </div>
    </section>

    {/* blog — BORRADOR: el blog aún no existe */}
    <section id="blog" className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-24">
      <div className="flex justify-between items-end gap-10 mb-10 flex-wrap">
        <div className="flex flex-col gap-3.5">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
            {t.home.blogEtiqueta}
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
            {t.home.blogTitulo}
          </h2>
        </div>
        <span
          className="text-base font-bold border-b-2 border-[#F9A600] pb-1 cursor-default"
          title={t.home.blogPendiente}
        >
          {t.home.irAlBlog}
        </span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {c.entradasBlog.map((entrada) => (
          <article key={entrada.categoria} className="flex flex-col gap-4">
            <div className="h-[180px] flex items-center justify-center bg-[repeating-linear-gradient(135deg,#EDECEA_0_8px,#F5F4F2_8px_16px)]">
              <span className="font-mono text-xs text-[#767676]">{t.home.imagenArticulo} 16:9</span>
            </div>
            <span className="text-xs tracking-[0.14em] uppercase text-[#8A5800]">
              {entrada.categoria}
            </span>
            <h3 className="text-[22px] leading-snug font-bold">{entrada.titulo}</h3>
            <span className="text-sm text-[#767676]">{entrada.meta}</span>
          </article>
        ))}
      </div>
    </section>

    {/* contacto */}
    <section id="contacto" className="bg-[#F9A600] text-[#000000]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-16 lg:py-22 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="flex flex-col gap-5">
          <h2 className="text-[34px] md:text-[44px] leading-[1.12] font-bold text-pretty">
            {c.cta.titulo}
          </h2>
          <p className="text-lg leading-relaxed">{c.cta.entradilla}</p>
          <div className="flex flex-col gap-2 mt-2 text-[17px]">
            <span>
              <strong>{t.home.whatsappEtiqueta}:</strong> {WHATSAPP_DISPLAY}
            </span>
            <span>
              <strong>{t.home.correoEtiqueta}:</strong> {CONTACT_EMAIL}
            </span>
          </div>
        </div>
        <div className="bg-[#FAFAFA] p-9">
          <FormularioContacto
            tono="claro"
            idPrefijo="oscuro-desktop"
            onNavigate={onNavigate}
            paleta={paleta}
          />
        </div>
      </div>
    </section>

    <PieSitio paleta={paleta} onNavigate={onNavigate} />
  </div>
  );
};