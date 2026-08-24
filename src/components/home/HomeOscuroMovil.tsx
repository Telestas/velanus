import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavigationProps } from '../../types';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_SCHEDULE,
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
  pieFirma,
  pieLegal,
} from './comunes';

/**
 * Home móvil, dirección «modo oscuro» (1a de la maqueta, columna de 390 px).
 *
 * No es la home de escritorio encogida: la maqueta trae titulares y textos más
 * cortos, por eso tira de las variantes `…Movil` del contenido.
 */
export const HomeOscuroMovil: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const c = contenidoHome(idioma);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="bg-[#FAFAFA] text-[#000000] font-marca">
      {/* cabecera */}
      <div className="bg-[#000000] text-[#FAFAFA] px-5 py-4 flex items-center justify-between">
        <LogoVelaNus tono="ambar" alto={32} />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="text-[#FAFAFA] p-1"
            aria-label={t.nav.menu}
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* menú desplegable — contiene el xpath obligatorio //nav//a[contains(text(), 'Servicios')] */}
      <nav
        className={`bg-[#000000] text-[#FAFAFA] overflow-hidden transition-all duration-300 ${
          menuAbierto ? 'max-h-96 py-4 border-t border-[#333333]' : 'max-h-0 py-0'
        }`}
      >
        <div className="px-5 flex flex-col gap-3">
          {navHome(idioma).map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              activo={destino.pantalla === currentScreen}
              className="text-base text-[#FAFAFA]"
            />
          ))}
        </div>
      </nav>

      {/* portada */}
      <section className="bg-[#000000] text-[#FAFAFA] px-5 pt-10 pb-11 flex flex-col gap-5">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F9A600]">
          {c.heroOscuro.antetituloMovil}
        </span>
        <h1 className="text-[33px] leading-[1.14] font-bold text-pretty">
          {c.heroOscuro.tituloMovil}
        </h1>
        <p className="text-[17px] leading-[1.55] text-[#E8E7E4]">
          {c.heroOscuro.entradillaMovil}
        </p>
        <a
          href={whatsappLink(mensajeConsulta(idioma))}
          target="_blank"
          rel="noopener"
          className="block text-center text-[17px] font-bold text-[#000000] bg-[#F9A600] py-4"
        >
          {t.home.agendarWhatsAppCorto}
        </a>
        <button
          onClick={openDiagnosticModal}
          className="block text-center text-[17px] text-[#FAFAFA] border border-[#6E6E6E] py-4"
        >
          {t.nav.agendar}
        </button>
        <p className="text-[13px] text-[#B9B7B2]">{t.home.respuesta24hCorto} · {CONTACT_TIMEZONE}</p>
      </section>

      {/* cifras — BORRADOR: pendientes de confirmación */}
      <section className="bg-[#F9A600] text-[#000000] px-5 py-6 grid grid-cols-2 gap-5">
        {c.cifras.map((cifra) => (
          <div key={cifra.etiqueta} className="flex flex-col gap-0.5">
            <span className="text-xl font-bold">{cifra.valor}</span>
            <span className="text-xs uppercase tracking-[0.06em]">{cifra.etiquetaMovil}</span>
          </div>
        ))}
      </section>

      {/* problemas */}
      <section className="px-5 py-12 flex flex-col gap-3">
        <div className="w-12 h-[3px] bg-[#F9A600]" />
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          {t.home.problemasTitulo}
        </h2>
        {c.problemas.map((problema, i) => (
          <div
            key={problema.numero}
            className={`flex flex-col gap-1.5 py-5 border-t border-[#E4E4E4] ${
              i === c.problemas.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="text-[13px] font-bold text-[#8A5800]">{problema.numero}</span>
            <h3 className="text-[19px] font-bold">{problema.titulo}</h3>
            <p className="text-base leading-[1.55] text-[#4A4A4A]">
              {problema.descripcionMovil}
            </p>
          </div>
        ))}
      </section>

      {/* servicios */}
      <section id="servicios" className="bg-[#F1F1F0] px-5 py-12 flex flex-col gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">
          {t.home.serviciosEtiqueta}
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          {t.home.serviciosTitulo}
        </h2>

        {c.lineas.map((linea) => (
          <div
            key={linea.clave}
            className="bg-[#FAFAFA] border-t-4 border-[#F9A600] px-5 py-6 flex flex-col gap-3"
          >
            <h3 className="text-[21px] font-bold">{linea.titulo}</h3>
            <p className="text-[15px] leading-[1.55] text-[#4A4A4A]">{linea.resumen}</p>
            <Enlace
              destino={{ label: t.home.verLineaCompleta, pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className="text-[15px] font-bold"
            />
          </div>
        ))}

        <div className="bg-[#FAFAFA] border border-[#E4E4E4] px-5 py-6 flex flex-col gap-2.5">
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#767676]">
            {c.tramites.etiqueta}
          </span>
          <h3 className="text-[19px] font-bold">{c.tramites.tituloCorto}</h3>
          <p className="text-[15px] leading-[1.55] text-[#4A4A4A]">{c.tramites.descripcion}</p>
          <Enlace
            destino={{ label: c.tramites.enlace, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[15px] font-bold border border-[#000000] p-3 text-center"
          />
        </div>
      </section>

      {/* proceso */}
      <section className="px-5 py-12 flex flex-col gap-3.5">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">
          {t.home.procesoEtiqueta}
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          {t.home.procesoTitulo}
        </h2>
        {c.pasos.map((paso, i) => (
          <div
            key={paso.numero}
            className={`pt-4 flex flex-col gap-1.5 border-t-[3px] ${
              i === c.pasos.length - 1 ? 'border-[#F9A600]' : 'border-[#000000]'
            }`}
          >
            <span className="text-[13px] font-bold text-[#8A5800]">
              {paso.numero} · {paso.titulo}
            </span>
            <p className="text-base leading-[1.55] text-[#4A4A4A]">{paso.descripcionMovil}</p>
          </div>
        ))}
      </section>

      {/* reseñas — BORRADOR: sin texto aprobado */}
      <section id="resenas" className="bg-[#000000] text-[#FAFAFA] px-5 py-12 flex flex-col gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F9A600]">
          {t.home.resenasEtiqueta}
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          {t.home.resenasTitulo}
        </h2>
        <div className="border border-[#333333] px-5 py-6 flex flex-col gap-3.5">
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="w-3 h-3 bg-[#F9A600]" />
            ))}
          </div>
          <p className="text-base leading-relaxed text-[#E8E7E4] italic">{c.resenas[0].cita}</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex-none bg-[repeating-linear-gradient(135deg,#1C1C1C_0_6px,#232323_6px_12px)]" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{c.resenas[0].autor}</span>
              <span className="text-xs text-[#B9B7B2]">{c.resenas[0].procedencia}</span>
            </div>
          </div>
        </div>
        <Enlace
          destino={{ label: `${t.home.verResenas} →`, pantalla: 'casos-desktop' }}
          onNavigate={onNavigate}
          className="text-[15px] font-bold text-[#F9A600]"
        />
      </section>

      {/* blog — BORRADOR: el blog aún no existe */}
      <section id="blog" className="px-5 py-12 flex flex-col gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#8A5800]">
          {t.home.blogEtiqueta}
        </span>
        <h2 className="text-[28px] leading-[1.18] font-bold mb-2">
          {t.home.blogTitulo}
        </h2>
        {c.entradasBlog.map((entrada, i) => (
          <article
            key={entrada.categoria}
            className={`flex gap-3.5 ${
              i === c.entradasBlog.length - 1 ? '' : 'pb-4 border-b border-[#E4E4E4]'
            }`}
          >
            <div className="w-24 h-[72px] flex-none bg-[repeating-linear-gradient(135deg,#EDECEA_0_8px,#F5F4F2_8px_16px)]" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#8A5800]">
                {entrada.categoria}
              </span>
              <h3 className="text-[17px] leading-snug font-bold">{entrada.titulo}</h3>
              <span className="text-[13px] text-[#767676]">{entrada.metaMovil}</span>
            </div>
          </article>
        ))}
      </section>

      {/* contacto */}
      <section id="contacto" className="bg-[#F9A600] text-[#000000] px-5 py-11 flex flex-col gap-[18px]">
        <h2 className="text-[29px] leading-[1.15] font-bold text-pretty">{c.cta.titulo}</h2>
        <div className="bg-[#FAFAFA] px-5 py-6">
          <FormularioContacto tono="claro" idPrefijo="oscuro-movil" />
        </div>
        <span className="text-[15px]">{t.formulario.alternativa(WHATSAPP_DISPLAY, CONTACT_EMAIL)}</span>
      </section>

      {/* pie — contiene el xpath obligatorio //footer//a[contains(text(), 'Servicios')] */}
      <footer className="bg-[#000000] text-[#FAFAFA] px-5 pt-11 pb-8 flex flex-col gap-6">
        <LogoVelaNus tono="ambar" alto={32} />

        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#F9A600]">Contacto</span>
          <span className="text-[15px] text-[#B9B7B2] leading-relaxed">
            {CONTACT_ADDRESS_LINES[0]}
            <br />
            {CONTACT_ADDRESS_LINES[1]}
          </span>
          <span className="text-[15px]">
            {WHATSAPP_DISPLAY} · {CONTACT_EMAIL}
          </span>
          <span className="text-sm text-[#B9B7B2] leading-normal">
            {CONTACT_SCHEDULE} · {CONTACT_TIMEZONE}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Enlace
            destino={{ label: t.nav.servicios, pantalla: 'servicios-desktop' }}
            onNavigate={onNavigate}
            className="text-[15px] text-[#FAFAFA]"
          />
          {pieFirma(idioma).map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#FAFAFA]"
            />
          ))}
          {pieLegal(idioma).slice(0, 1).map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className="text-[15px] text-[#B9B7B2]"
            />
          ))}
        </div>

        <span className="text-[13px] text-[#767676] border-t border-[#333333] pt-5">
          {t.pie.derechos}
        </span>
      </footer>
    </div>
  );
};
