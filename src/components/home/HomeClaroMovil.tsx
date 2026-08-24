import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
} from './comunes';

/**
 * Home móvil, dirección «modo claro» (1b de la maqueta, columna de 390 px):
 * banda de servicio negra, portada clara, cifras y problemas sobre negro.
 */
export const HomeClaroMovil: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="bg-[#FAFAFA] text-[#000000] font-marca">
      {/* banda de servicio */}
      <div className="bg-[#000000] text-[#FAFAFA] px-5 py-2 flex items-center justify-between text-xs">
        <span className="text-[#B9B7B2]">Español e inglés · UTC-4</span>
        {/* BORRADOR: la versión en inglés todavía no existe. */}
        <div className="flex items-center gap-1.5" title="Versión en inglés pendiente">
          <span className="text-[#F9A600] font-bold">ES</span>
          <span className="text-[#4A4A4A]">/</span>
          <span className="text-[#4A4A4A]">EN</span>
        </div>
      </div>

      {/* cabecera */}
      <div className="bg-[#FAFAFA] border-b border-[#E4E4E4] px-5 py-3.5 flex items-center justify-between">
        <LogoVelaNus tono="negro" alto={32} />
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="text-[#000000] p-1"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* menú desplegable — contiene el xpath obligatorio //nav//a[contains(text(), 'Servicios')] */}
      <nav
        className={`bg-[#F1F1F0] overflow-hidden transition-all duration-300 ${
          menuAbierto ? 'max-h-96 py-4 border-b border-[#E4E4E4]' : 'max-h-0 py-0'
        }`}
      >
        <div className="px-5 flex flex-col gap-3">
          {NAV_HOME.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              activo={destino.pantalla === currentScreen}
              className="text-base text-[#000000]"
            />
          ))}
        </div>
      </nav>

      {/* portada clara */}
      <section className="px-5 pt-10 pb-9 flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <span className="w-[26px] h-[3px] bg-[#F9A600]" />
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#8A5800]">
            {HERO_CLARO.antetituloMovil}
          </span>
        </div>
        <h1 className="text-[32px] leading-[1.12] font-bold text-pretty">
          {HERO_CLARO.tituloMovil}
        </h1>
        <p className="text-[17px] leading-[1.55] text-[#4A4A4A]">{HERO_CLARO.entradillaMovil}</p>
        <a
          href={whatsappLink(MENSAJE_CONSULTA)}
          target="_blank"
          rel="noopener"
          className="block text-center text-[17px] font-bold text-[#000000] bg-[#F9A600] py-4"
        >
          Agendar por WhatsApp
        </a>
        <button
          onClick={openDiagnosticModal}
          className="block text-center text-[17px] font-bold text-[#000000] border border-[#000000] py-4"
        >
          Agendar diagnóstico
        </button>
      </section>

      {/* cifras — BORRADOR: pendientes de confirmación */}
      <section className="bg-[#000000] text-[#FAFAFA] px-5 py-8 flex flex-col gap-[18px]">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F9A600]">
          Vela Nus en cifras
        </span>
        <div className="flex flex-col gap-3.5">
          {CIFRAS.map((cifra, i) => (
            <div
              key={cifra.etiqueta}
              className={`flex justify-between items-baseline ${
                i === CIFRAS.length - 1 ? '' : 'pb-3.5 border-b border-[#333333]'
              }`}
            >
              <span className="text-sm text-[#B9B7B2]">{cifra.etiquetaMovil}</span>
              <span className="text-base font-bold text-[#F9A600]">{cifra.valor}</span>
            </div>
          ))}
        </div>
      </section>

      {/* problemas sobre negro */}
      <section className="bg-[#000000] text-[#FAFAFA] px-5 pt-2 pb-12 flex flex-col gap-3.5">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F9A600]">
          El problema real
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-1.5">
          ¿Opera o quiere operar en Cuba?
        </h2>
        {PROBLEMAS.map((problema) => (
          <div
            key={problema.numero}
            className="flex flex-col gap-1.5 py-4 border-t border-[#333333]"
          >
            <span className="text-[13px] font-bold text-[#F9A600]">{problema.numero}</span>
            <h3 className="text-[19px] font-bold">{problema.titulo}</h3>
            <p className="text-base leading-[1.55] text-[#B9B7B2]">{problema.descripcionMovil}</p>
          </div>
        ))}
      </section>

      {/* servicios en filas */}
      <section id="servicios" className="px-5 py-12 flex flex-col gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">
          Servicios a empresas
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-1">
          Tres líneas de servicio corporativo
        </h2>

        {LINEAS_SERVICIO.map((linea, i) => (
          <div
            key={linea.clave}
            className={`flex flex-col gap-2 py-[22px] ${
              i === 0 ? 'border-t-2 border-[#000000]' : 'border-t border-[#E4E4E4]'
            } ${i === LINEAS_SERVICIO.length - 1 ? 'border-b border-[#E4E4E4]' : ''}`}
          >
            <span className="text-[13px] font-bold text-[#8A5800]">{linea.clave}</span>
            <h3 className="text-[21px] font-bold">{linea.titulo}</h3>
            <p className="text-[15px] leading-[1.55] text-[#4A4A4A]">{linea.resumen}</p>
            <Enlace
              destino={{ label: 'Ver línea →', pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className="text-[15px] font-bold"
            />
          </div>
        ))}

        <div className="border-l-4 border-[#F9A600] bg-[#F1F1F0] px-5 py-[22px] flex flex-col gap-2 mt-3">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#767676]">
            {TRAMITES.etiqueta}
          </span>
          <h3 className="text-[19px] font-bold">{TRAMITES.tituloCorto}</h3>
          <p className="text-[15px] leading-[1.55] text-[#4A4A4A]">{TRAMITES.descripcion}</p>
          <Enlace
            destino={{ label: `${TRAMITES.enlace} →`, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[15px] font-bold"
          />
        </div>
      </section>

      {/* proceso */}
      <section className="bg-[#F1F1F0] px-5 py-12 flex flex-col gap-3.5">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">
          Cómo trabajamos
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          Del primer mensaje a la entrega
        </h2>
        {PASOS.map((paso) => (
          <div
            key={paso.numero}
            className="flex flex-col gap-1.5 py-4 border-t border-[#DEDEDC]"
          >
            <span className="text-[13px] font-bold text-[#8A5800]">{paso.numero}</span>
            <h3 className="text-[19px] font-bold">{paso.tituloLargo}</h3>
            <p className="text-base leading-[1.55] text-[#4A4A4A]">{paso.descripcionMovil}</p>
          </div>
        ))}
      </section>

      {/* reseñas — BORRADOR: sin texto aprobado */}
      <section id="resenas" className="px-5 py-12 flex flex-col gap-4">
        <h2 className="text-[28px] leading-[1.18] font-bold">Reseñas de clientes</h2>
        <div className="border border-[#E4E4E4] bg-white px-5 py-6 flex flex-col gap-3.5">
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="w-3 h-3 bg-[#F9A600]" />
            ))}
          </div>
          <p className="text-base leading-relaxed">{RESENAS[0].cita}</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex-none bg-[repeating-linear-gradient(135deg,#EDECEA_0_6px,#F5F4F2_6px_12px)]" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{RESENAS[0].autor}</span>
              <span className="text-xs text-[#767676]">{RESENAS[0].procedencia}</span>
            </div>
          </div>
        </div>
        <Enlace
          destino={{ label: 'Ver todas / dejar una reseña', pantalla: 'casos-desktop' }}
          onNavigate={onNavigate}
          className="text-[15px] font-bold border-b-2 border-[#F9A600] pb-1 self-start"
        />
        <span className="text-[13px] text-[#767676]">{AVISO_RESENAS}</span>
      </section>

      {/* blog — BORRADOR: el blog aún no existe */}
      <section id="blog" className="px-5 pb-12 flex flex-col gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">Blog</span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-1">
          Normativa cubana, explicada en claro
        </h2>
        {ENTRADAS_BLOG.map((entrada, i) => (
          <article
            key={entrada.categoria}
            className={`flex flex-col gap-2 ${
              i === ENTRADAS_BLOG.length - 1 ? '' : 'pb-[18px] border-b border-[#E4E4E4]'
            }`}
          >
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#8A5800]">
              {entrada.categoria}
            </span>
            <h3 className="text-[19px] leading-snug font-bold">{entrada.titulo}</h3>
            <span className="text-[13px] text-[#767676]">{entrada.metaMovil}</span>
          </article>
        ))}
      </section>

      {/* contacto sobre negro */}
      <section
        id="contacto"
        className="bg-[#000000] text-[#FAFAFA] px-5 py-11 flex flex-col gap-[18px]"
      >
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F9A600]">Contacto</span>
        <h2 className="text-[28px] leading-[1.15] font-bold text-pretty">{CTA.titulo}</h2>
        <FormularioContacto tono="oscuro" idPrefijo="claro-movil" />
      </section>

      {/* pie claro — contiene el xpath obligatorio //footer//a[contains(text(), 'Servicios')] */}
      <footer className="bg-[#F1F1F0] px-5 pt-10 pb-8 flex flex-col gap-6">
        <LogoVelaNus tono="negro" alto={32} />

        <div className="flex flex-col gap-2">
          <span className="text-[15px] text-[#4A4A4A] leading-relaxed">
            {CONTACT_ADDRESS_LINES[0]}
            <br />
            {CONTACT_ADDRESS_LINES[1]}
          </span>
          <span className="text-[15px] text-[#000000]">
            {WHATSAPP_DISPLAY} · {CONTACT_EMAIL}
          </span>
          <span className="text-sm text-[#4A4A4A]">
            {CONTACT_SCHEDULE} · {CONTACT_TIMEZONE}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Enlace
            destino={{ label: 'Servicios', pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[15px] text-[#4A4A4A]"
          />
          {PIE_FIRMA.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#4A4A4A]"
            />
          ))}
          {PIE_LEGAL.slice(0, 1).map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#4A4A4A]"
            />
          ))}
        </div>

        <span className="text-[13px] text-[#767676] border-t border-[#DEDEDC] pt-[18px]">
          © 2026 Vela Nus Consultores &amp; Asociados
        </span>
      </footer>
    </div>
  );
};
