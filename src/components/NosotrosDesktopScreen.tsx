import React from 'react';
import { NavigationProps } from '../types';
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_SCHEDULE,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
} from '../config';
import {
  AVISO_EQUIPO,
  CIERRE,
  CIFRAS_FIRMA,
  CREDENCIALES,
  EQUIPO,
  HERO,
  REGLAS,
} from '../content/nosotros';
import { LINEAS } from '../content/servicios';
import { Enlace } from './home/comunes';
import { useVarianteHome } from './home/useVariante';
import { CabeceraSitio } from './marca/CabeceraSitio';
import { PieSitio } from './marca/PieSitio';
import { BandaCta, Miga, TituloSeccion } from './marca/piezas';
import { ANCHO, paletaDe } from './marca/paleta';

/**
 * Sobre nosotros.
 *
 * BORRADOR: la firma no ha facilitado historia, nombres del equipo, cifras ni
 * credenciales. Todo eso se pinta con sus marcadores `[PENDIENTE]` a la vista:
 * es preferible un hueco declarado a un dato inventado. No rellenarlos sin que
 * el cliente los confirme.
 */
export const NosotrosDesktopScreen: React.FC<NavigationProps> = ({
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
        actual="Sobre nosotros"
      />

      {/* portada */}
      <section className={`${ANCHO} pt-8 pb-22 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start`}>
        <div className="flex flex-col gap-6">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[38px] md:text-[54px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
            {HERO.titulo}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${paleta.textoFuerte} max-w-[620px] text-pretty`}>
            {HERO.entradilla}
          </p>
          <p className={`text-lg leading-[1.65] ${paleta.textoSuave} max-w-[620px]`}>
            {HERO.historia}
          </p>
        </div>

        <div className={`border ${paleta.borde} p-8 flex flex-col gap-[22px]`}>
          <span className={`text-xs tracking-[0.18em] uppercase ${paleta.acentoTexto}`}>
            La firma
          </span>
          <div className="flex flex-col gap-4">
            {CIFRAS_FIRMA.map((cifra, i) => (
              <div
                key={cifra.etiqueta}
                className={`flex flex-col gap-0.5 ${
                  i === CIFRAS_FIRMA.length - 1 ? '' : `pb-4 border-b ${paleta.borde}`
                }`}
              >
                <span className={`text-[26px] font-bold ${paleta.acentoTexto}`}>
                  {cifra.valor}
                </span>
                <span className={`text-sm ${paleta.textoSuave}`}>{cifra.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tres reglas */}
      <section className={paleta.banda}>
        <div className={`${ANCHO} py-22`}>
          <TituloSeccion
            paleta={paleta}
            etiqueta="Cómo trabajamos"
            titulo="Tres reglas que no negociamos"
            className="max-w-[680px] mb-12"
          />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {REGLAS.map((regla) => (
              <div
                key={regla.titulo}
                className="flex flex-col gap-3 border-t-[3px] border-[#F9A600] pt-6"
              >
                <h3 className="text-[23px] font-bold">{regla.titulo}</h3>
                <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
                  {regla.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* equipo — BORRADOR: sin nombres ni retratos */}
      <section className={`${ANCHO} py-22`}>
        <div className="flex justify-between items-end gap-10 mb-11 flex-wrap">
          <TituloSeccion paleta={paleta} etiqueta="Equipo" titulo="Quién va a llevar su caso" />
          <span className={`text-sm ${paleta.textoTenue} max-w-[320px] lg:text-right`}>
            {AVISO_EQUIPO}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EQUIPO.map((miembro, i) => (
            <article key={i} className="flex flex-col gap-4">
              <div
                className={`aspect-[4/5] flex items-center justify-center ${paleta.marcoImagen}`}
              >
                <span className={`font-mono text-[11px] ${paleta.textoTenue}`}>retrato 4:5</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-bold">{miembro.nombre}</h3>
                <span className={`text-[15px] ${paleta.acentoTexto}`}>{miembro.cargo}</span>
                <p className={`mt-1 text-[15px] leading-[1.55] ${paleta.textoSuave}`}>
                  {miembro.perfil}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* qué hacemos */}
      <section className={`${ANCHO} pb-22`}>
        <div
          className={`border-t ${paleta.borde} pt-12 grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-18 items-start`}
        >
          <div className="flex flex-col gap-3.5 items-start">
            <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
              Qué hacemos
            </span>
            <h2 className="text-[28px] md:text-[32px] leading-[1.18] font-bold">
              Cuatro líneas, un mismo equipo
            </h2>
            <Enlace
              destino={{ label: 'Ver servicios →', pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className={`text-base font-bold ${paleta.acentoTexto}`}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {LINEAS.map((linea) => (
              <div key={linea.clave} className="flex flex-col gap-2">
                <span className={`text-[13px] ${paleta.textoTenue}`}>{linea.clave}</span>
                <h3 className="text-xl font-bold">{linea.titulo}</h3>
                <p className={`text-base leading-[1.55] ${paleta.textoSuave}`}>{linea.resumen}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* dónde estamos y credenciales */}
      <section className={paleta.banda}>
        <div className={`${ANCHO} py-18 grid lg:grid-cols-2 gap-12 lg:gap-18 items-start`}>
          <div className="flex flex-col gap-5">
            <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
              Dónde estamos
            </span>
            <h2 className="text-[26px] md:text-[30px] leading-tight font-bold">
              La Habana, Centro Habana
            </h2>
            <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
              {CONTACT_ADDRESS_LINES.join(' ')}, Cuba.
            </p>
            <div className="flex flex-col gap-2 text-[17px]">
              <span className={paleta.textoFuerte}>{WHATSAPP_DISPLAY}</span>
              <span className={paleta.textoFuerte}>{CONTACT_EMAIL}</span>
              <span className={`text-[15px] ${paleta.textoSuave}`}>
                {CONTACT_SCHEDULE} · {CONTACT_TIMEZONE}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
              Credenciales y colegiación
            </span>
            {/* BORRADOR: no se publica nada que no se pueda acreditar. */}
            <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>{CREDENCIALES}</p>
          </div>
        </div>
      </section>

      <BandaCta
        paleta={paleta}
        titulo={CIERRE.titulo}
        boton={CIERRE.boton}
        mensaje={CIERRE.mensaje}
      />

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};
