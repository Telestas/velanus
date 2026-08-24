import React from 'react';
import { NavigationProps } from '../../types';
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_SCHEDULE,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../../config';
import {
  AVISO_RESENAS,
  CIFRAS,
  CTA,
  ENTRADAS_BLOG,
  HERO_CLARO,
  LINEAS_SERVICIO,
  PASOS,
  PIE_DESCRIPCION,
  PROBLEMAS,
  RESENAS,
  TRAMITES,
} from '../../content/home';
import {
  Enlace,
  FormularioContacto,
  LogoVelaNus,
  MENSAJE_CONSULTA,
  NAV_HOME,
  PIE_FIRMA,
  PIE_LEGAL,
  PIE_SERVICIOS,
} from './comunes';

/**
 * Home, dirección «modo claro» (1b en la maqueta): portada clara y editorial
 * con las cifras en un panel negro, los problemas sobre negro, servicios en
 * filas y proceso horizontal.
 */
export const HomeClaroDesktop: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => (
  <div className="bg-[#FAFAFA] text-[#000000] font-marca">
    {/* cabecera: banda de servicio + navegación */}
    <header className="bg-[#FAFAFA] border-b border-[#E4E4E4]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 min-h-[52px] py-2 hidden md:flex items-center justify-between gap-6 text-[13px] text-[#4A4A4A] border-b border-[#EFEFED]">
        <span>La Habana, Cuba · Atención en español e inglés</span>
        <div className="flex items-center gap-6">
          <span>{CONTACT_EMAIL}</span>
          <span>{WHATSAPP_DISPLAY}</span>
          {/* BORRADOR: la versión en inglés todavía no existe. */}
          <div className="flex items-center gap-2" title="Versión en inglés pendiente">
            <span className="font-bold text-[#000000]">ES</span>
            <span className="text-[#B9B7B2]">/</span>
            <span className="text-[#B9B7B2]">EN</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 min-h-20 py-4 flex items-center justify-between gap-8 flex-wrap">
        <LogoVelaNus tono="negro" alto={44} conBajada />

        <div className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
          <nav className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
            {NAV_HOME.map((destino) => {
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
            Agendar consulta
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
            {HERO_CLARO.antetitulo}
          </span>
        </div>
        <h1 className="text-[38px] md:text-[58px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
          {HERO_CLARO.titulo}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A] max-w-[600px] text-pretty">
          {HERO_CLARO.entradilla}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={whatsappLink(MENSAJE_CONSULTA)}
            target="_blank"
            rel="noopener"
            className="text-[17px] font-bold text-[#000000] bg-[#F9A600] px-[30px] py-[17px] hover:bg-[#FFC048] transition-colors"
          >
            Agendar consulta por WhatsApp
          </a>
          <Enlace
            destino={{ label: 'Ver servicios →', pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[17px] font-bold border-b-2 border-[#F9A600] pb-1"
          />
        </div>
      </div>

      {/* cifras — BORRADOR: pendientes de que las confirme el cliente */}
      <div className="bg-[#000000] text-[#FAFAFA] px-9 py-10 flex flex-col gap-6">
        <span className="text-xs tracking-[0.18em] uppercase text-[#F9A600]">
          Vela Nus en cifras
        </span>
        <div className="flex flex-col gap-5">
          {CIFRAS.map((cifra, i) => (
            <div
              key={cifra.etiqueta}
              className={`flex flex-col gap-[3px] ${
                i === CIFRAS.length - 1 ? '' : 'pb-5 border-b border-[#333333]'
              }`}
            >
              <span className="text-[30px] font-bold text-[#F9A600]">{cifra.valor}</span>
              <span className="text-sm text-[#B9B7B2]">{cifra.etiqueta}</span>
            </div>
          ))}
        </div>
        <span className="text-[13px] text-[#767676]">
          Respuesta en menos de 24 h hábiles · {CONTACT_TIMEZONE}
        </span>
      </div>
    </section>

    {/* problemas sobre negro */}
    <section className="bg-[#000000] text-[#FAFAFA]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22">
        <div className="flex flex-col gap-3.5 mb-12 max-w-[720px]">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">
            El problema real
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
            ¿Opera o quiere operar en Cuba?
          </h2>
          <p className="text-lg leading-relaxed text-[#B9B7B2]">
            Cuatro puntos donde se atasca el cliente extranjero, y cómo los resolvemos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#333333]">
          {PROBLEMAS.map((problema) => (
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
            Servicios a empresas
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-bold">
            Tres líneas de servicio corporativo
          </h2>
        </div>
        <Enlace
          destino={{ label: 'Índice de servicios', pantalla: 'servicios-desktop' }}
          onNavigate={onNavigate}
          className="text-base font-bold border-b-2 border-[#F9A600] pb-1"
        />
      </div>

      <div className="flex flex-col">
        {LINEAS_SERVICIO.map((linea, i) => (
          <div
            key={linea.clave}
            className={`grid lg:grid-cols-[60px_320px_1fr_180px] gap-6 lg:gap-8 py-9 items-start ${
              i === 0 ? 'border-t-2 border-[#000000]' : 'border-t border-[#E4E4E4]'
            } ${i === LINEAS_SERVICIO.length - 1 ? 'border-b border-[#E4E4E4]' : ''}`}
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
              destino={{ label: 'Ver línea →', pantalla: 'servicios-desktop' }}
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
            {TRAMITES.etiquetaLarga}
          </span>
          <h3 className="text-[22px] font-bold">{TRAMITES.titulo}</h3>
          <p className="text-base text-[#4A4A4A]">{TRAMITES.descripcion}</p>
        </div>
        <Enlace
          destino={{ label: TRAMITES.enlace, pantalla: 'servicios-desktop' }}
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
            Cómo trabajamos
          </span>
          <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">
            Del primer mensaje a la entrega
          </h2>
          <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
            Nunca ha contratado en Cuba. Esto es exactamente lo que ocurre, paso por paso.
          </p>
        </div>

        <div className="flex flex-col">
          {PASOS.map((paso, i) => (
            <div
              key={paso.numero}
              className={`grid sm:grid-cols-[120px_1fr] gap-4 sm:gap-8 py-6 items-baseline ${
                i === PASOS.length - 1 ? '' : 'border-b border-[#DEDEDC]'
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
          Reseñas de clientes
        </h2>
        <Enlace
          destino={{ label: 'Dejar una reseña', pantalla: 'casos-desktop' }}
          onNavigate={onNavigate}
          className="text-base font-bold border-b-2 border-[#F9A600] pb-1"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {RESENAS.map((resena) => (
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
      <p className="mt-6 text-sm text-[#767676]">{AVISO_RESENAS}</p>
    </section>

    {/* blog en lista — BORRADOR: el blog aún no existe */}
    <section id="blog" className="border-t border-[#E4E4E4]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-18 lg:py-22 grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-18 items-start">
        <div className="flex flex-col gap-4 items-start">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">Blog</span>
          <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">
            Normativa cubana, explicada en claro
          </h2>
          <span
            className="text-base font-bold border-b-2 border-[#F9A600] pb-1 cursor-default"
            title="Blog pendiente"
          >
            Ver todas las entradas
          </span>
        </div>

        <div className="flex flex-col">
          {ENTRADAS_BLOG.map((entrada, i) => (
            <article
              key={entrada.categoria}
              className={`flex gap-7 py-6 items-center border-t border-[#E4E4E4] ${
                i === ENTRADAS_BLOG.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="w-[180px] h-28 flex-none hidden sm:flex items-center justify-center bg-[repeating-linear-gradient(135deg,#EDECEA_0_8px,#F5F4F2_8px_16px)]">
                <span className="font-mono text-[11px] text-[#767676]">imagen 16:10</span>
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
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#F9A600]">Contacto</span>
          <h2 className="text-[32px] md:text-[42px] leading-[1.12] font-bold text-pretty">
            {CTA.titulo}
          </h2>
          <p className="text-lg leading-relaxed text-[#B9B7B2]">{CTA.entradilla}</p>
          <div className="flex flex-col gap-2.5 mt-2 text-[17px]">
            <span>
              <strong className="text-[#F9A600]">WhatsApp</strong> · {WHATSAPP_DISPLAY}
            </span>
            <span>
              <strong className="text-[#F9A600]">Correo</strong> · {CONTACT_EMAIL}
            </span>
            <span className="text-[15px] text-[#B9B7B2]">
              {CONTACT_ADDRESS_LINES.join(' ')}
            </span>
          </div>
        </div>
        <FormularioContacto tono="oscuro" idPrefijo="claro-desktop" />
      </div>
    </section>

    {/* pie claro */}
    <footer className="bg-[#F1F1F0] text-[#000000]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-16 pb-8 grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div className="flex flex-col gap-4">
          <LogoVelaNus tono="negro" alto={40} conBajada />
          <p className="text-[15px] leading-relaxed text-[#4A4A4A]">{PIE_DESCRIPCION}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.16em] uppercase text-[#8A5800]">Servicios</span>
          {PIE_SERVICIOS.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#4A4A4A] hover:text-[#000000] transition-colors"
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.16em] uppercase text-[#8A5800]">Firma</span>
          {PIE_FIRMA.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#4A4A4A] hover:text-[#000000] transition-colors"
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.16em] uppercase text-[#8A5800]">Contacto</span>
          <span className="text-[15px] text-[#4A4A4A] leading-relaxed">
            {CONTACT_ADDRESS_LINES[0]}
            <br />
            {CONTACT_ADDRESS_LINES[1]}
          </span>
          <span className="text-[15px]">{WHATSAPP_DISPLAY}</span>
          <span className="text-[15px]">{CONTACT_EMAIL}</span>
          <span className="text-sm text-[#4A4A4A] leading-normal">
            {CONTACT_SCHEDULE}
            <br />
            {CONTACT_TIMEZONE}
          </span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 pb-11">
        <div className="border-t border-[#DEDEDC] pt-5 flex justify-between items-center gap-8 flex-wrap">
          <span className="text-sm text-[#767676]">
            © 2026 Vela Nus Consultores &amp; Asociados
          </span>
          <div className="flex gap-6">
            {PIE_LEGAL.map((destino) => (
              <Enlace
                key={destino.label}
                destino={destino}
                onNavigate={onNavigate}
                className="text-sm text-[#4A4A4A]"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  </div>
);
