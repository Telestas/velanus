import React from 'react';
import { NavigationProps } from '../../types';
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../../config';
import { contenidoHome } from '../../content/home';
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

/**
 * Home, dirección «modo claro» (1b en la maqueta): portada clara y editorial
 * con las cifras en un panel negro, los problemas sobre negro, servicios en
 * filas y proceso horizontal.
 */
export const HomeClaroDesktop: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const c = contenidoHome(idioma);

  return (
    <div className="bg-[#FAFAFA] text-[#000000] font-marca">
    {/* cabecera: banda de servicio + navegación */}
    <header className="bg-[#FAFAFA] border-b border-[#E4E4E4]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 min-h-[52px] py-2 hidden md:flex items-center justify-between gap-6 text-[13px] text-[#4A4A4A] border-b border-[#EFEFED]">
        <span>La Habana, Cuba · {t.home.idiomaAviso}</span>
        <div className="flex items-center gap-6">
          <span>{CONTACT_EMAIL}</span>
          <span>{WHATSAPP_DISPLAY}</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 min-h-20 py-4 flex items-center justify-between gap-8 flex-wrap">
        <LogoVelaNus tono="negro" alto={44} conBajada />

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
                      ? 'text-[15px] text-[#000000] font-bold'
                      : 'text-[15px] text-[#4A4A4A] hover:text-[#000000] transition-colors'
                  }
                />
              );
            })}
          </nav>

          <button
            onClick={openDiagnosticModal}
            className="text-sm font-bold text-[#FAFAFA] bg-[#000000] px-5 py-3 hover:bg-[#333333] transition-colors"
          >
            {t.nav.agendar}
          </button>
        </div>
      </div>
    </header>

    {/* portada clara, con las cifras en panel negro al lado */}
    <section className="max-w-[1240px] mx-auto px-6 md:px-12 pt-16 pb-16 lg:pt-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-18 items-start">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[3px] bg-[#F9A600]" />
          <span className="text-[13px] tracking-[0.18em] uppercase text-[#8A5800]">
            {c.heroClaro.antetitulo}
          </span>
        </div>
        <h1 className="text-[38px] md:text-[58px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
          {c.heroClaro.titulo}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A] max-w-[600px] text-pretty">
          {c.heroClaro.entradilla}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={whatsappLink(mensajeConsulta(idioma))}
            target="_blank"
            rel="noopener"
            className="text-[17px] font-bold text-[#000000] bg-[#F9A600] px-[30px] py-[17px] hover:bg-[#FFC048] transition-colors"
          >
            {t.home.agendarWhatsApp}
          </a>
          <Enlace
            destino={{ label: `${t.home.verServicios} →`, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[17px] font-bold border-b-2 border-[#F9A600] pb-1"
          />
        </div>
      </div>

      {/* cifras — BORRADOR: pendientes de que las confirme el cliente */}
      <div className="bg-[#000000] text-[#FAFAFA] px-9 py-10 flex flex-col gap-6">
        <span className="text-xs tracking-[0.18em] uppercase text-[#F9A600]">
          {t.home.cifrasEtiqueta}
        </span>
        <div className="flex flex-col gap-5">
          {c.cifras.map((cifra, i) => (
            <div
              key={cifra.etiqueta}
              className={`flex flex-col gap-[3px] ${
                i === c.cifras.length - 1 ? '' : 'pb-5 border-b border-[#333333]'
              }`}
            >
              <span className="text-[30px] font-bold text-[#F9A600]">{cifra.valor}</span>
              <span className="text-sm text-[#B9B7B2]">{cifra.etiqueta}</span>
            </div>
          ))}
        </div>
        <span className="text-[13px] text-[#767676]">
          {t.home.respuesta24h} · {CONTACT_TIMEZONE}
        </span>
      </div>
    </section>

    {/* problemas sobre negro */}
    <section className="bg-[#000000] text-[#FAFAFA]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22">
        <div className="flex flex-col gap-3.5 mb-12 max-w-[720px]">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">
            {t.home.problemasEtiqueta}
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
            {t.home.problemasTitulo}
          </h2>
          <p className="text-lg leading-relaxed text-[#B9B7B2]">
            {t.home.problemasEntradilla}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#333333]">
          {c.problemas.map((problema) => (
            <div key={problema.numero} className="bg-[#000000] p-8 flex flex-col gap-2.5">
              <span className="text-sm font-bold text-[#F9A600]">{problema.numero}</span>
              <h3 className="text-[23px] font-bold">{problema.titulo}</h3>
              <p className="text-[17px] leading-relaxed text-[#B9B7B2]">
                {problema.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* servicios en filas */}
    <section id="servicios" className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-24">
      <div className="flex justify-between items-end gap-10 mb-10 flex-wrap">
        <div className="flex flex-col gap-3.5">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
            {t.home.serviciosEtiqueta}
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
            {t.home.serviciosTitulo}
          </h2>
        </div>
        <Enlace
          destino={{ label: t.home.indiceServicios, pantalla: 'servicios-desktop' }}
          onNavigate={onNavigate}
          className="text-base font-bold border-b-2 border-[#F9A600] pb-1"
        />
      </div>

      <div className="flex flex-col">
        {c.lineas.map((linea, i) => (
          <div
            key={linea.clave}
            className={`grid lg:grid-cols-[60px_320px_1fr_180px] gap-6 lg:gap-8 py-9 items-start ${
              i === 0 ? 'border-t-2 border-[#000000]' : 'border-t border-[#E4E4E4]'
            } ${i === c.lineas.length - 1 ? 'border-b border-[#E4E4E4]' : ''}`}
          >
            <span className="text-[15px] font-bold text-[#8A5800]">{linea.clave}</span>
            <h3 className="text-[26px] leading-tight font-bold">{linea.titulo}</h3>
            <div className="grid sm:grid-cols-2 gap-x-7 gap-y-2.5">
              {linea.items.map((item) => (
                <span key={item} className="text-base text-[#4A4A4A]">
                  {item}
                </span>
              ))}
            </div>
            <Enlace
              destino={{ label: t.home.verLinea, pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className="text-base font-bold lg:text-right"
            />
          </div>
        ))}
      </div>

      {/* Bloque C: subordinado y separado de la grilla corporativa. */}
      <div className="mt-9 border-l-4 border-[#F9A600] bg-[#F1F1F0] px-8 py-7 flex items-center justify-between gap-10 flex-wrap">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs tracking-[0.16em] uppercase text-[#767676]">
            {c.tramites.etiquetaLarga}
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
    </section>

    {/* proceso horizontal */}
    <section className="bg-[#F1F1F0]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22 grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-18 items-start">
        <div className="flex flex-col gap-4">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
            {t.home.procesoEtiqueta}
          </span>
          <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">
            {t.home.procesoTituloClaro}
          </h2>
          <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
            {t.home.procesoEntradilla}
          </p>
        </div>

        <div className="flex flex-col">
          {c.pasos.map((paso, i) => (
            <div
              key={paso.numero}
              className={`grid sm:grid-cols-[120px_1fr] gap-4 sm:gap-8 py-6 items-baseline ${
                i === c.pasos.length - 1 ? '' : 'border-b border-[#DEDEDC]'
              }`}
            >
              <span className="text-[15px] font-bold text-[#8A5800]">{paso.numero}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[22px] font-bold">{paso.tituloLargo}</h3>
                <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* reseñas — BORRADOR: sin texto aprobado por los clientes */}
    <section id="resenas" className="max-w-[1240px] mx-auto px-6 md:px-12 py-20 lg:py-24">
      <div className="flex justify-between items-end gap-10 mb-10 flex-wrap">
        <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">
          {t.home.resenasTituloClaro}
        </h2>
        <Enlace
          destino={{ label: t.home.dejarResena, pantalla: 'casos-desktop' }}
          onNavigate={onNavigate}
          className="text-base font-bold border-b-2 border-[#F9A600] pb-1"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {c.resenas.map((resena) => (
          <div
            key={resena.procedencia}
            className="border border-[#E4E4E4] bg-white p-8 flex flex-col gap-[18px]"
          >
            <div className="flex gap-1" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-[13px] h-[13px] bg-[#F9A600]" />
              ))}
            </div>
            <p className="text-lg leading-relaxed">{resena.cita}</p>
            <div className="flex items-center gap-3.5 mt-auto">
              <div className="w-11 h-11 flex-none bg-[repeating-linear-gradient(135deg,#EDECEA_0_6px,#F5F4F2_6px_12px)]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold">{resena.autor}</span>
                <span className="text-[13px] text-[#767676]">{resena.procedencia}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#767676]">{c.avisoResenas}</p>
    </section>

    {/* blog en lista — BORRADOR: el blog aún no existe */}
    <section id="blog" className="border-t border-[#E4E4E4]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22 grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-18 items-start">
        <div className="flex flex-col gap-4 items-start">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">{t.nav.blog}</span>
          <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">
            {t.home.blogTitulo}
          </h2>
          <span
            className="text-base font-bold border-b-2 border-[#F9A600] pb-1 cursor-default"
            title={t.home.blogPendiente}
          >
            {t.home.verEntradas}
          </span>
        </div>

        <div className="flex flex-col">
          {c.entradasBlog.map((entrada, i) => (
            <article
              key={entrada.categoria}
              className={`flex gap-7 py-6 items-center border-t border-[#E4E4E4] ${
                i === c.entradasBlog.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="w-[180px] h-28 flex-none hidden sm:flex items-center justify-center bg-[repeating-linear-gradient(135deg,#EDECEA_0_8px,#F5F4F2_8px_16px)]">
                <span className="font-mono text-[11px] text-[#767676]">{t.home.imagenArticulo} 16:10</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.14em] uppercase text-[#8A5800]">
                  {entrada.categoria}
                </span>
                <h3 className="text-2xl leading-snug font-bold">{entrada.titulo}</h3>
                <span className="text-sm text-[#767676]">{entrada.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* contacto sobre negro */}
    <section id="contacto" className="bg-[#000000] text-[#FAFAFA]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="flex flex-col gap-5">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">{t.nav.contacto}</span>
          <h2 className="text-[32px] md:text-[42px] leading-[1.12] font-bold text-pretty">
            {c.cta.titulo}
          </h2>
          <p className="text-lg leading-relaxed text-[#B9B7B2]">{c.cta.entradilla}</p>
          <div className="flex flex-col gap-2.5 mt-2 text-[17px]">
            <span>
              <strong className="text-[#F9A600]">{t.home.whatsappEtiqueta}</strong> · {WHATSAPP_DISPLAY}
            </span>
            <span>
              <strong className="text-[#F9A600]">{t.home.correoEtiqueta}</strong> · {CONTACT_EMAIL}
            </span>
            <span className="text-[15px] text-[#B9B7B2]">
              {CONTACT_ADDRESS_LINES.join(' ')}
            </span>
          </div>
        </div>
        <FormularioContacto tono="oscuro" idPrefijo="claro-desktop" />
      </div>
    </section>

    <PieSitio paleta={paletaDe('claro')} onNavigate={onNavigate} />
  </div>
  );
};