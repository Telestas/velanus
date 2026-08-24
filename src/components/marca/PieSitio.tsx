import React from 'react';
import { ScreenId } from '../../types';
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_SCHEDULE,
  CONTACT_TIMEZONE,
  WHATSAPP_DISPLAY,
} from '../../config';
import { PIE_DESCRIPCION } from '../../content/home';
import {
  Enlace,
  LogoVelaNus,
  PIE_FIRMA,
  PIE_LEGAL,
  PIE_SERVICIOS,
} from '../home/comunes';
import { ANCHO, Paleta } from './paleta';

interface PieProps {
  paleta: Paleta;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
}

/**
 * Pie de página del sitio.
 *
 * Las maquetas de Servicios y Nosotros lo describen como «pie de página
 * idéntico al de la home», así que es literalmente el mismo componente: en
 * tono oscuro va sobre negro con el logo ámbar, y en claro sobre #F1F1F0 con
 * el logo negro.
 */
export const PieSitio: React.FC<PieProps> = ({ paleta, onNavigate }) => {
  const oscuro = paleta.logo === 'ambar';
  const fondo = oscuro ? 'bg-[#000000] text-[#FAFAFA]' : 'bg-[#F1F1F0] text-[#000000]';
  const enlace = `text-[15px] ${paleta.textoSuave} ${paleta.acentoHover} transition-colors`;

  return (
    <footer className={fondo}>
      <div
        className={`${ANCHO} pt-16 pb-10 grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12`}
      >
        <div className="flex flex-col gap-4">
          <LogoVelaNus tono={paleta.logo} alto={40} conBajada />
          <p className={`text-[15px] leading-relaxed ${paleta.textoSuave}`}>{PIE_DESCRIPCION}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className={`text-xs tracking-[0.16em] uppercase ${paleta.acentoTexto}`}>
            Servicios
          </span>
          {PIE_SERVICIOS.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className={enlace}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className={`text-xs tracking-[0.16em] uppercase ${paleta.acentoTexto}`}>Firma</span>
          {PIE_FIRMA.map((destino) => (
            <Enlace
              key={destino.label}
              destino={destino}
              onNavigate={onNavigate}
              className={enlace}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className={`text-xs tracking-[0.16em] uppercase ${paleta.acentoTexto}`}>
            Contacto
          </span>
          <span className={`text-[15px] leading-relaxed ${paleta.textoSuave}`}>
            {CONTACT_ADDRESS_LINES[0]}
            <br />
            {CONTACT_ADDRESS_LINES[1]}
          </span>
          <span className="text-[15px]">{WHATSAPP_DISPLAY}</span>
          <span className="text-[15px]">{CONTACT_EMAIL}</span>
          <span className={`text-sm leading-normal ${paleta.textoSuave}`}>
            {CONTACT_SCHEDULE}
            <br />
            {CONTACT_TIMEZONE}
          </span>
        </div>
      </div>

      <div className={`${ANCHO} pb-12`}>
        <div
          className={`border-t ${paleta.borde} pt-6 flex justify-between items-center gap-8 flex-wrap`}
        >
          <span className={`text-sm ${paleta.textoTenue}`}>
            © 2026 Vela Nus Consultores &amp; Asociados
          </span>
          <div className="flex gap-6">
            {PIE_LEGAL.map((destino) => (
              <Enlace
                key={destino.label}
                destino={destino}
                onNavigate={onNavigate}
                className={`text-sm ${paleta.textoSuave}`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
