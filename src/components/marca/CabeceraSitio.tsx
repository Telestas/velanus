import React from 'react';
import { ScreenId } from '../../types';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../../config';
import { Enlace, LogoVelaNus, NAV_HOME } from '../home/comunes';
import { ANCHO, Paleta } from './paleta';

interface CabeceraProps {
  paleta: Paleta;
  currentScreen: ScreenId;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
  openDiagnosticModal: () => void;
  /** Qué entrada del menú se marca como activa (una subpágina marca su sección). */
  seccionActiva?: string;
  /** Banda de servicio sobre la navegación; la usa la home clara. */
  banda?: boolean;
  /** Filete inferior; lo llevan las páginas interiores, no la portada oscura. */
  borde?: boolean;
}

/**
 * Cabecera de las pantallas de escritorio rediseñadas.
 *
 * La comparten la home, Servicios (índice y subpáginas) y Nosotros: en las
 * maquetas es la misma pieza, y tenerla una sola vez evita que se
 * desincronicen los menús.
 */
export const CabeceraSitio: React.FC<CabeceraProps> = ({
  paleta,
  currentScreen,
  onNavigate,
  openDiagnosticModal,
  seccionActiva,
  banda = false,
  borde = false,
}) => {
  return (
    <header className={`${paleta.fondo} ${paleta.texto} ${borde ? `border-b ${paleta.borde}` : ''}`}>
      {banda && (
        <div
          className={`${ANCHO} min-h-[52px] py-2 hidden md:flex items-center justify-between gap-6 text-[13px] ${paleta.textoSuave} border-b ${paleta.borde}`}
        >
          <span>La Habana, Cuba · Atención en español e inglés</span>
          <div className="flex items-center gap-6">
            <span>{CONTACT_EMAIL}</span>
            <span>{WHATSAPP_DISPLAY}</span>
            <SelectorIdioma paleta={paleta} compacto />
          </div>
        </div>
      )}

      <div className={`${ANCHO} min-h-[84px] py-4 flex items-center justify-between gap-8 flex-wrap`}>
        <LogoVelaNus tono={paleta.logo} alto={44} conBajada />

        <div className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
          <nav className="flex items-center gap-6 lg:gap-[34px] flex-wrap">
            {NAV_HOME.map((destino) => {
              const activo =
                destino.pantalla === currentScreen || destino.label === seccionActiva;

              return (
                <Enlace
                  key={destino.label}
                  destino={destino}
                  onNavigate={onNavigate}
                  activo={destino.pantalla === currentScreen}
                  className={
                    activo
                      ? `text-[15px] font-bold ${paleta.acentoTexto} border-b-2 border-[#F9A600] pb-[3px]`
                      : `text-[15px] ${paleta.texto} ${paleta.acentoHover} transition-colors`
                  }
                />
              );
            })}
          </nav>

          {!banda && <SelectorIdioma paleta={paleta} />}

          <button
            onClick={openDiagnosticModal}
            className="text-sm font-bold px-[18px] py-[11px] bg-[#F9A600] text-[#000000] hover:bg-[#FFC048] transition-colors"
          >
            Agendar consulta
          </button>
        </div>
      </div>
    </header>
  );
};

/** BORRADOR: el conmutador está dibujado, pero no hay versión en inglés. */
const SelectorIdioma: React.FC<{ paleta: Paleta; compacto?: boolean }> = ({
  paleta,
  compacto = false,
}) =>
  compacto ? (
    <div className="flex items-center gap-2" title="Versión en inglés pendiente">
      <span className={`font-bold ${paleta.texto}`}>ES</span>
      <span className={paleta.textoTenue}>/</span>
      <span className={paleta.textoTenue}>EN</span>
    </div>
  ) : (
    <div
      className={`flex items-center border ${
        paleta.logo === 'ambar' ? 'border-[#4A4A4A]' : 'border-[#B9B7B2]'
      }`}
      title="Versión en inglés pendiente"
    >
      <span className="text-[13px] px-2.5 py-[5px] bg-[#F9A600] text-[#000000] font-bold">ES</span>
      <span className={`text-[13px] px-2.5 py-[5px] ${paleta.textoTenue}`}>EN</span>
    </div>
  );
