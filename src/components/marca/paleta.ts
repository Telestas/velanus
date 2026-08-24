import { HomeVariant } from '../../theme';

/**
 * Los dos tonos del sitio, en clases de Tailwind.
 *
 * Las maquetas de Servicios y Nosotros son la misma retícula pintada con dos
 * paletas: la oscura sobre negro y la clara sobre #FAFAFA. En vez de duplicar
 * cada pantalla, se pinta una vez y se le pasa la paleta.
 *
 * El ámbar del manual (#F9A600) se mantiene igual en los dos tonos cuando es
 * fondo o filete; como texto sobre claro no pasa AA (2,1:1), y por eso el tono
 * claro usa #8A5800 (5,9:1) en `acentoTexto`.
 */
export interface Paleta {
  /** Fondo de la página. */
  fondo: string;
  /** Color de texto por defecto. */
  texto: string;
  /** Párrafos destacados: entradillas y listas del panel lateral. */
  textoFuerte: string;
  /** Cuerpo secundario: descripciones y respuestas. */
  textoSuave: string;
  /** Metadatos y avisos: notas al pie de sección. */
  textoTenue: string;
  /** Filetes y bordes de tarjeta. */
  borde: string;
  /** Banda de sección con fondo propio (plazos, reglas, dónde estamos). */
  banda: string;
  /** Etiquetas de sección y enlaces de acento. */
  acentoTexto: string;
  /**
   * El mismo acento en hover. Va aparte porque Tailwind escanea el código
   * fuente: una clase compuesta en tiempo de ejecución (`hover:${acento}`) no
   * se genera nunca.
   */
  acentoHover: string;
  /** Botón secundario: borde y texto. */
  botonSecundario: string;
  /** Marcador de posición de imágenes (retratos del equipo). */
  marcoImagen: string;
  /** Qué lockup del logo toca sobre este fondo. */
  logo: 'ambar' | 'negro';
}

const OSCURA: Paleta = {
  fondo: 'bg-[#000000]',
  texto: 'text-[#FAFAFA]',
  textoFuerte: 'text-[#E8E7E4]',
  textoSuave: 'text-[#B9B7B2]',
  textoTenue: 'text-[#8A8A8A]',
  borde: 'border-[#333333]',
  banda: 'bg-[#0D0D0D]',
  acentoTexto: 'text-[#F9A600]',
  acentoHover: 'hover:text-[#F9A600]',
  botonSecundario: 'border-[#6E6E6E] text-[#FAFAFA] hover:border-[#F9A600]',
  marcoImagen: 'bg-[repeating-linear-gradient(135deg,#141414_0_8px,#1C1C1C_8px_16px)]',
  logo: 'ambar',
};

const CLARA: Paleta = {
  fondo: 'bg-[#FAFAFA]',
  texto: 'text-[#000000]',
  textoFuerte: 'text-[#000000]',
  textoSuave: 'text-[#4A4A4A]',
  textoTenue: 'text-[#6B6B6B]',
  borde: 'border-[#E4E4E4]',
  banda: 'bg-[#F1F1F0]',
  acentoTexto: 'text-[#8A5800]',
  acentoHover: 'hover:text-[#8A5800]',
  botonSecundario: 'border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FAFAFA]',
  marcoImagen: 'bg-[repeating-linear-gradient(135deg,#EDECEA_0_8px,#F5F4F2_8px_16px)]',
  logo: 'negro',
};

export const paletaDe = (variante: HomeVariant): Paleta =>
  variante === 'claro' ? CLARA : OSCURA;

/** Ancho de contenido de todas las pantallas de marca. */
export const ANCHO = 'max-w-[1240px] mx-auto px-6 md:px-12';
