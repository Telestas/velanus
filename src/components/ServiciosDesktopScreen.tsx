import React from 'react';
import { NavigationProps } from '../types';
import { CONTACT_EMAIL, CONTACT_TIMEZONE, whatsappLink } from '../config';
import { INDICE, LINEAS_CORPORATIVAS, LINEA_PERSONAS } from '../content/servicios';
import { Enlace } from './home/comunes';
import { useVarianteHome } from './home/useVariante';
import { CabeceraSitio } from './marca/CabeceraSitio';
import { PieSitio } from './marca/PieSitio';
import { BandaCta, Miga } from './marca/piezas';
import { ANCHO, paletaDe } from './marca/paleta';

/**
 * Índice de Servicios: las tres líneas corporativas en tarjetas y la línea C
 * —personas naturales— aparte, subordinada, como pedía el brief.
 *
 * Se pinta en los dos tonos con la misma retícula; solo cambia la paleta.
 */
export const ServiciosDesktopScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const paleta = paletaDe(useVarianteHome());

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
        ruta={[{ label: 'Inicio', pantalla: 'home-desktop' }]}
        actual="Servicios"
      />

      {/* portada del índice */}
      <section className={`${ANCHO} pt-8 pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start`}>
        <div className="flex flex-col gap-6">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[38px] md:text-[54px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
            {INDICE.titulo}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${paleta.textoFuerte} max-w-[620px] text-pretty`}>
            {INDICE.entradilla}
          </p>
        </div>

        <div className={`border ${paleta.borde} p-8 flex flex-col gap-[18px]`}>
          <span className={`text-xs tracking-[0.18em] uppercase ${paleta.acentoTexto}`}>
            {INDICE.panel.etiqueta}
          </span>
          <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
            {INDICE.panel.texto}
          </p>
          <a
            href={whatsappLink(INDICE.panel.mensaje)}
            target="_blank"
            rel="noopener"
            className="text-base font-bold text-[#000000] bg-[#F9A600] p-[15px] text-center hover:bg-[#FFC048] transition-colors"
          >
            {INDICE.panel.boton}
          </a>
          <span className={`text-sm ${paleta.textoTenue}`}>
            {CONTACT_EMAIL} · {CONTACT_TIMEZONE}
          </span>
        </div>
      </section>

      {/* tres líneas corporativas */}
      <div className={`${ANCHO} pb-10`}>
        <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
          Servicios a empresas
        </span>
      </div>

      <section className={`${ANCHO} pb-18 grid md:grid-cols-3 gap-6`}>
        {LINEAS_CORPORATIVAS.map((linea) => (
          <article
            key={linea.clave}
            className={`border ${paleta.borde} border-t-4 border-t-[#F9A600] px-8 py-9 flex flex-col gap-5`}
          >
            <span className={`text-[13px] tracking-[0.16em] ${paleta.textoTenue}`}>
              {linea.clave}
            </span>
            <h2 className="text-[27px] leading-tight font-bold">{linea.titulo}</h2>
            <p className={`text-base leading-relaxed ${paleta.textoSuave}`}>{linea.resumen}</p>
            <div className="flex flex-col gap-2.5">
              {linea.puntos.map((punto) => (
                <span key={punto} className={`text-[15px] ${paleta.textoFuerte}`}>
                  {punto}
                </span>
              ))}
            </div>
            <Enlace
              destino={{ label: 'Ver línea completa →', pantalla: linea.pantalla }}
              onNavigate={onNavigate}
              className={`mt-auto text-base font-bold ${paleta.acentoTexto}`}
            />
          </article>
        ))}
      </section>

      {/* línea C: personas naturales, fuera de la grilla corporativa */}
      <section className={`${ANCHO} pb-22`}>
        <div
          className={`border-t ${paleta.borde} pt-10 flex items-center justify-between gap-12 flex-wrap`}
        >
          <div className="flex flex-col gap-2 max-w-[640px]">
            <span className={`text-xs tracking-[0.16em] uppercase ${paleta.textoTenue}`}>
              C · Personas naturales
            </span>
            <h2 className="text-[27px] font-bold">{LINEA_PERSONAS.titulo}</h2>
            <p className={`text-base leading-relaxed ${paleta.textoSuave}`}>
              {LINEA_PERSONAS.resumen}
            </p>
          </div>
          <Enlace
            destino={{ label: 'Ir a trámites personales', pantalla: LINEA_PERSONAS.pantalla }}
            onNavigate={onNavigate}
            className={`text-base font-bold border px-[26px] py-[15px] flex-none transition-colors ${paleta.botonSecundario}`}
          />
        </div>
      </section>

      <BandaCta
        paleta={paleta}
        titulo={INDICE.cierre.titulo}
        boton={INDICE.cierre.boton}
        mensaje={INDICE.cierre.mensaje}
      />

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};
