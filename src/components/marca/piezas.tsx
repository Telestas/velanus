import React from 'react';
import { ScreenId } from '../../types';
import { CONTACT_EMAIL, whatsappLink } from '../../config';
import { DestinoEnlace, Enlace } from '../home/comunes';
import { ANCHO, Paleta } from './paleta';

/** Piezas que se repiten en Servicios y Nosotros. */

interface MigaProps {
  paleta: Paleta;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
  /** Escalones anteriores, en orden. El último elemento es la página actual. */
  ruta: DestinoEnlace[];
  actual: string;
}

/** Miga de pan de las páginas interiores. */
export const Miga: React.FC<MigaProps> = ({ paleta, onNavigate, ruta, actual }) => (
  <nav aria-label="Ruta" className={`${ANCHO} py-6 text-sm ${paleta.textoSuave}`}>
    {ruta.map((destino) => (
      <span key={destino.label}>
        <Enlace
          destino={destino}
          onNavigate={onNavigate}
          className={`${paleta.textoSuave} ${paleta.acentoHover} transition-colors`}
        />
        <span className={`mx-2 ${paleta.textoTenue}`}>/</span>
      </span>
    ))}
    <span className={paleta.acentoTexto} aria-current="page">
      {actual}
    </span>
  </nav>
);

interface BandaCtaProps {
  paleta: Paleta;
  titulo: string;
  /** Texto del botón; cambia por página («Agendar», «Consultar», «Escribir»). */
  boton: string;
  /** Mensaje con el que se abre WhatsApp. */
  mensaje: string;
}

/**
 * Banda ámbar de cierre. La banda es la misma en los tres tonos —el ámbar es
 * fondo, no texto, así que no hace falta oscurecerlo—; lo único que cambia es
 * el relleno del botón, que sale de `paleta.tinta`.
 */
export const BandaCta: React.FC<BandaCtaProps> = ({ titulo, boton, mensaje, paleta }) => (
  <section className="bg-[#F9A600] text-[#000000]">
    <div className={`${ANCHO} py-14 flex items-center justify-between gap-12 flex-wrap`}>
      <h2 className="text-[28px] md:text-[34px] leading-[1.15] font-bold max-w-[680px] text-pretty">
        {titulo}
      </h2>
      <div className="flex flex-col gap-2.5 flex-none">
        <a
          href={whatsappLink(mensaje)}
          target="_blank"
          rel="noopener"
          className={`text-[17px] font-bold text-[#F9A600] ${paleta.tinta} px-7 py-4 text-center transition-colors`}
        >
          {boton}
        </a>
        <span className="text-[15px]">{CONTACT_EMAIL}</span>
      </div>
    </div>
  </section>
);

interface TituloSeccionProps {
  paleta: Paleta;
  etiqueta?: string;
  titulo: string;
  entradilla?: string;
  className?: string;
}

/** Etiqueta + titular de sección, con el mismo ritmo en todas las páginas. */
export const TituloSeccion: React.FC<TituloSeccionProps> = ({
  paleta,
  etiqueta,
  titulo,
  entradilla,
  className = '',
}) => (
  <div className={`flex flex-col gap-3.5 ${className}`}>
    {etiqueta && (
      <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
        {etiqueta}
      </span>
    )}
    <h2 className="text-[30px] md:text-[38px] leading-[1.15] font-bold">{titulo}</h2>
    {entradilla && (
      <p className={`text-[17px] leading-relaxed ${paleta.textoSuave}`}>{entradilla}</p>
    )}
  </div>
);

/** Punto ámbar de las listas de requisitos. */
export const Vinneta: React.FC<{ children: React.ReactNode; paleta: Paleta }> = ({
  children,
  paleta,
}) => (
  <div className="flex gap-3 items-baseline">
    <span className="w-1.5 h-1.5 bg-[#F9A600] flex-none" />
    <span className={`text-base leading-normal ${paleta.textoFuerte}`}>{children}</span>
  </div>
);
