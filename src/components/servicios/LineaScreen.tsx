import React from 'react';
import { NavigationProps } from '../../types';
import { contenidoServicios, lineaDe } from '../../content/servicios';
import { ScreenId } from '../../types';
import { useIdioma } from '../../i18n/idioma';
import { textos } from '../../i18n/textos';
import { Enlace } from '../home/comunes';
import { useVarianteHome } from '../home/useVariante';
import { CabeceraSitio } from '../marca/CabeceraSitio';
import { PieSitio } from '../marca/PieSitio';
import { BandaCta, Miga, Vinneta } from '../marca/piezas';
import { ANCHO, paletaDe } from '../marca/paleta';

interface LineaScreenProps extends NavigationProps {
  /** Qué línea se pinta. El contenido se resuelve por idioma en cada render. */
  pantalla: ScreenId;
}

/**
 * Plantilla de subpágina de servicio.
 *
 * Las cuatro líneas comparten estructura en la maqueta —hero con panel, qué
 * incluye, plazos y requisitos sobre banda, preguntas frecuentes y cierre—, así
 * que la pantalla se pinta una vez y recibe los datos de `content/servicios.ts`.
 */
export const LineaScreen: React.FC<LineaScreenProps> = ({
  pantalla,
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const linea = lineaDe(contenidoServicios(idioma), pantalla)!;
  const paleta = paletaDe(useVarianteHome());

  /*
   * La línea C atiende a personas, no a empresas: en la maqueta cuelga
   * directamente de Inicio, sin pasar por el índice de Servicios.
   */
  const ruta =
    linea.clave === 'C'
      ? [{ label: t.servicios.migaInicio, pantalla: 'home-desktop' as const }]
      : [
          { label: t.servicios.migaInicio, pantalla: 'home-desktop' as const },
          { label: t.servicios.migaServicios, pantalla: 'servicios-desktop' as const },
        ];

  return (
    <div className={`${paleta.fondo} ${paleta.texto} font-marca`}>
      <CabeceraSitio
        paleta={paleta}
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        openDiagnosticModal={openDiagnosticModal}
        seccionActiva={t.nav.servicios}
        borde
      />

      <Miga paleta={paleta} onNavigate={onNavigate} ruta={ruta} actual={linea.titulo} />

      {/* portada de la línea */}
      <section className={`${ANCHO} pt-6 pb-18 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-18 items-start`}>
        <div className="flex flex-col gap-6">
          <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
            {linea.etiqueta}
          </span>
          <h1 className="text-[36px] md:text-[48px] leading-[1.1] font-bold text-pretty">
            {linea.titulo}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${paleta.textoFuerte} text-pretty`}>
            {linea.entradilla}
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <button
              onClick={openDiagnosticModal}
              className="text-[17px] font-bold text-[#000000] bg-[#F9A600] px-7 py-4 hover:bg-[#FFC048] transition-colors"
            >
              {linea.botonHero}
            </button>
            {linea.botonSecundario && (
              <Enlace
                destino={linea.botonSecundario}
                onNavigate={onNavigate}
                className={`text-[17px] border px-[26px] py-[15px] transition-colors ${paleta.botonSecundario}`}
              />
            )}
          </div>
        </div>

        <div className={`border ${paleta.borde} p-8 flex flex-col gap-4`}>
          <span className={`text-xs tracking-[0.18em] uppercase ${paleta.acentoTexto}`}>
            {linea.panel.titulo}
          </span>
          <div className="flex flex-col gap-3">
            {linea.panel.items.map((item) => (
              <span key={item.texto} className={`text-base leading-normal ${paleta.textoFuerte}`}>
                {item.detalle ? (
                  <>
                    <strong>{item.texto}</strong>
                    <span className={paleta.textoSuave}> — {item.detalle}</span>
                  </>
                ) : (
                  item.texto
                )}
              </span>
            ))}
          </div>
          {linea.panel.nota && (
            <p className={`text-sm ${paleta.textoTenue}`}>{linea.panel.nota}</p>
          )}
        </div>
      </section>

      {/* qué incluye */}
      <section className={`${ANCHO} pb-20`}>
        <h2 className="text-[28px] md:text-[34px] font-bold mb-8">{t.servicios.queIncluye}</h2>
        <div className="flex flex-col">
          {linea.incluye.map((item, i) => (
            <div
              key={item.numero}
              className={`grid lg:grid-cols-[48px_340px_1fr] gap-4 lg:gap-8 py-7 border-t ${paleta.borde} ${
                i === linea.incluye.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className={`text-[15px] font-bold ${paleta.acentoTexto}`}>{item.numero}</span>
              <h3 className="text-[21px] font-bold">{item.titulo}</h3>
              <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* plazos y requisitos */}
      <section className={paleta.banda}>
        <div className={`${ANCHO} py-18 grid lg:grid-cols-2 gap-12 lg:gap-18 items-start`}>
          <div className="flex flex-col gap-6">
            <h2 className="text-[26px] md:text-[30px] font-bold">{t.servicios.plazos}</h2>
            <div className="flex flex-col">
              {linea.plazos.map((plazo, i) => (
                <div
                  key={plazo.concepto}
                  className={`flex justify-between gap-6 py-4 border-t ${paleta.borde} ${
                    i === linea.plazos.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span className={`text-[17px] ${paleta.textoFuerte}`}>{plazo.concepto}</span>
                  <span className={`text-base font-bold ${paleta.acentoTexto} text-right`}>
                    {plazo.plazo}
                  </span>
                </div>
              ))}
            </div>
            {linea.notaPlazos && (
              <p className={`text-sm ${paleta.textoTenue}`}>{linea.notaPlazos}</p>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[26px] md:text-[30px] font-bold">{t.servicios.requisitos}</h2>
            <div className="grid sm:grid-cols-2 gap-x-7 gap-y-3.5">
              {linea.requisitos.map((requisito) => (
                <Vinneta key={requisito} paleta={paleta}>
                  {requisito}
                </Vinneta>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* preguntas frecuentes */}
      <section className={`${ANCHO} py-20`}>
        <h2 className="text-[28px] md:text-[34px] font-bold mb-8">{t.servicios.preguntas}</h2>
        <div className="flex flex-col">
          {linea.preguntas.map((item, i) => (
            <div
              key={item.pregunta}
              className={`grid lg:grid-cols-[420px_1fr] gap-4 lg:gap-12 py-6 border-t ${paleta.borde} ${
                i === linea.preguntas.length - 1 ? 'border-b' : ''
              }`}
            >
              <h3 className="text-[19px] font-bold">{item.pregunta}</h3>
              <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>
                {item.respuesta}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BandaCta
        paleta={paleta}
        titulo={linea.cierre.titulo}
        boton={linea.cierre.boton}
        mensaje={linea.cierre.mensaje}
      />

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};

/** Una pantalla por línea: el router mapea id → componente, no id → datos. */
export const pantallaDeLinea = (pantalla: ScreenId): React.FC<NavigationProps> => {
  const Pantalla: React.FC<NavigationProps> = (props) => (
    <LineaScreen {...props} pantalla={pantalla} />
  );
  Pantalla.displayName = `LineaScreen(${pantalla})`;
  return Pantalla;
};