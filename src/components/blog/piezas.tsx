import React from 'react';
import { Entrada } from '../../data/blog';
import { Paleta } from '../marca/paleta';

/**
 * Marco de imagen.
 *
 * Mientras no haya imagen —y hoy no hay ninguna— se pinta el tramado de la
 * maqueta con su etiqueta, para que el hueco se lea como pendiente y no como un
 * fallo de carga.
 */
export const MarcoImagen: React.FC<{
  paleta: Paleta;
  src?: string;
  alt: string;
  proporcion: string;
  etiqueta: string;
}> = ({ paleta, src, alt, proporcion, etiqueta }) =>
  src ? (
    <img src={src} alt={alt} className={`${proporcion} w-full object-cover`} loading="lazy" />
  ) : (
    <div
      className={`${proporcion} w-full flex items-center justify-center ${paleta.marcoImagen}`}
    >
      <span className={`font-mono text-[11px] ${paleta.textoTenue}`}>{etiqueta}</span>
    </div>
  );

/** Ficha de artículo en la rejilla del listado y en «relacionados». */
export const FichaEntrada: React.FC<{
  paleta: Paleta;
  entrada: Entrada;
  etiquetaImagen: string;
  minutos: (n: number) => string;
  onClick: () => void;
  compacta?: boolean;
}> = ({ paleta, entrada, etiquetaImagen, minutos, onClick, compacta = false }) => (
  <article className="flex flex-col gap-3.5">
    <button onClick={onClick} className="text-left" aria-label={entrada.titulo}>
      <MarcoImagen
        paleta={paleta}
        src={entrada.imagen}
        alt={entrada.titulo}
        proporcion="aspect-[16/10]"
        etiqueta={etiquetaImagen}
      />
    </button>
    <span className={`text-xs tracking-[0.14em] uppercase ${paleta.acentoTexto}`}>
      {entrada.categoria}
    </span>
    <button onClick={onClick} className="text-left">
      <h3
        className={`${compacta ? 'text-xl' : 'text-[22px]'} leading-[1.28] font-bold hover:underline underline-offset-4`}
      >
        {entrada.titulo}
      </h3>
    </button>
    {!compacta && entrada.resumen && (
      <p className={`text-base leading-[1.55] ${paleta.textoSuave}`}>{entrada.resumen}</p>
    )}
    <span className={`text-sm ${paleta.textoTenue}`}>
      {entrada.fecha} · {minutos(entrada.minutos)}
    </span>
  </article>
);

/** Cinco estrellas cuadradas, como en la maqueta. */
export const Estrellas: React.FC<{ valor: number; tamano?: number }> = ({
  valor,
  tamano = 14,
}) => (
  <div className="flex gap-1" role="img" aria-label={`${valor}/5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{ width: tamano, height: tamano }}
        className={i < valor ? 'bg-[#F9A600]' : 'border border-[#F9A600]'}
      />
    ))}
  </div>
);

/** Aviso de moderación previa, con el filete ámbar de la maqueta. */
export const AvisoModeracion: React.FC<{
  paleta: Paleta;
  titulo: string;
  texto: string;
}> = ({ paleta, titulo, texto }) => (
  <div className="border-l-[3px] border-[#F9A600] pl-4 flex flex-col gap-1.5">
    <span className={`text-sm font-bold ${paleta.acentoTexto}`}>{titulo}</span>
    <span className={`text-[15px] leading-[1.55] ${paleta.textoSuave}`}>{texto}</span>
  </div>
);
