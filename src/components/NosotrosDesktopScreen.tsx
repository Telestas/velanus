import React from 'react';
import { NavigationProps } from '../types';
import {
  CONTACT_EMAIL,
  CONTACT_SCHEDULE,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
} from '../config';
import { contenidoNosotros } from '../content/nosotros';
import { contenidoServicios } from '../content/servicios';
import { useIdioma } from '../i18n/idioma';
import { textos } from '../i18n/textos';
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
  const idioma = useIdioma();
  const t = textos(idioma);
  const c = contenidoNosotros(idioma);
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
        ruta={[{ label: t.servicios.migaInicio, pantalla: 'home-desktop' }]}
        actual={t.nosotros.miga}
      />

      {/* portada */}
      <section className={`${ANCHO} pt-8 pb-22 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start`}>
        <div className="flex flex-col gap-6">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[38px] md:text-[54px] leading-[1.08] font-bold tracking-[-0.01em] text-pretty">
            {c.hero.titulo}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${paleta.textoFuerte} max-w-[620px] text-pretty`}>
            {c.hero.entradilla}
          </p>
          <p className={`text-lg leading-[1.65] ${paleta.textoSuave} max-w-[620px]`}>
            {c.hero.historia}
          </p>
        </div>

        <div className={`border ${paleta.borde} p-8 flex flex-col gap-[22px]`}>
          <span className={`text-xs tracking-[0.18em] uppercase ${paleta.acentoTexto}`}>
            {t.nosotros.laFirma}
          </span>
          <div className="flex flex-col gap-4">
            {c.cifras.map((cifra, i) => (
              <div
                key={cifra.etiqueta}
                className={`flex flex-col gap-0.5 ${
                  i === c.cifras.length - 1 ? '' : `pb-4 border-b ${paleta.borde}`
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
            etiqueta={t.nosotros.comoTrabajamos}
            titulo={t.nosotros.reglasTitulo}
            className="max-w-[680px] mb-12"
          />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {c.reglas.map((regla) => (
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
          <TituloSeccion
            paleta={paleta}
            etiqueta={t.nosotros.equipoEtiqueta}
            titulo={t.nosotros.equipoTitulo}
          />
          <span className={`text-sm ${paleta.textoTenue} max-w-[320px] lg:text-right`}>
            {c.avisoEquipo}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.equipo.map((miembro, i) => (
            <article key={i} className="flex flex-col gap-4">
              <div
                className={`aspect-[4/5] flex items-center justify-center ${paleta.marcoImagen}`}
              >
                <span className={`font-mono text-[11px] ${paleta.textoTenue}`}>{t.nosotros.retrato}</span>
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
              {t.nosotros.queHacemos}
            </span>
            <h2 className="text-[28px] md:text-[32px] leading-[1.18] font-bold">
              {t.nosotros.queHacemosTitulo}
            </h2>
            <Enlace
              destino={{ label: t.nosotros.verServicios, pantalla: 'servicios-desktop' }}
              onNavigate={onNavigate}
              className={`text-base font-bold ${paleta.acentoTexto}`}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {contenidoServicios(idioma).lineas.map((linea) => (
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
              {t.nosotros.dondeEstamos}
            </span>
            <h2 className="text-[26px] md:text-[30px] leading-tight font-bold">
              {t.nosotros.ubicacion}
            </h2>
            <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
              {c.direccion}
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
              {t.nosotros.credenciales}
            </span>
            {/* BORRADOR: no se publica nada que no se pueda acreditar. */}
            <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>{c.credenciales}</p>
          </div>
        </div>
      </section>

      <BandaCta
        paleta={paleta}
        titulo={c.cierre.titulo}
        boton={c.cierre.boton}
        mensaje={c.cierre.mensaje}
      />

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};
