import { HomeVariant } from '../../theme';

/**
 * Los tres tonos del sitio, en clases de Tailwind.
 *
 * Las maquetas de Servicios y Nosotros son la misma retícula pintada con
 * distintas paletas: la oscura sobre negro, la azul sobre #0B1036 y la clara
 * sobre #FAFAFA. En vez de duplicar cada pantalla, se pinta una vez y se le
 * pasa la paleta.
 *
 * El ámbar del manual (#F9A600) se mantiene igual en los tres tonos cuando es
 * fondo o filete; como texto sobre claro no pasa AA (2,1:1), y por eso el tono
 * claro usa #8A5800 (5,9:1) en `acentoTexto`.
 *
 * PROPUESTA — el azul no está en el manual de identidad. Sale del fondo del
 * logo: base #0B1036, superficie elevada #131A47, bordes #2A3168 y #3A4280, y
 * los grises de texto reenfriados a #C6C9E2 y #A5AACF. El ámbar sobre el azul
 * da 8,1:1, algo mejor incluso que sobre negro. Va marcado como propuesta
 * hasta que lo apruebe el cliente.
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
  /** Marcador de posición del avatar de una reseña: la misma trama, más fina. */
  avatar: string;
  /**
   * Relleno sólido oscuro de los botones que van sobre la banda ámbar. Es el
   * negro del manual en los tonos negro y claro, y el azul marino en el azul:
   * no sigue a `fondo`, porque en el tono claro el fondo es #FAFAFA y el botón
   * sigue siendo oscuro.
   */
  tinta: string;
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
  avatar: 'bg-[repeating-linear-gradient(135deg,#1C1C1C_0_6px,#232323_6px_12px)]',
  tinta: 'bg-[#000000] hover:bg-[#333333]',
  logo: 'ambar',
};

/**
 * Tono azul (1c en la maqueta): el sistema del tono oscuro con el negro
 * sustituido por azul marino. El ámbar y el #FAFAFA del manual no cambian.
 */
const AZUL: Paleta = {
  fondo: 'bg-[#0B1036]',
  texto: 'text-[#FAFAFA]',
  textoFuerte: 'text-[#EDEEF7]',
  textoSuave: 'text-[#C6C9E2]',
  textoTenue: 'text-[#A5AACF]',
  borde: 'border-[#2A3168]',
  banda: 'bg-[#131A47]',
  acentoTexto: 'text-[#F9A600]',
  acentoHover: 'hover:text-[#F9A600]',
  botonSecundario: 'border-[#4A5490] text-[#FAFAFA] hover:border-[#F9A600]',
  marcoImagen: 'bg-[repeating-linear-gradient(135deg,#131A47_0_8px,#1B2358_8px_16px)]',
  avatar: 'bg-[repeating-linear-gradient(135deg,#171E4E_0_6px,#1F2760_6px_12px)]',
  tinta: 'bg-[#0B1036] hover:bg-[#2A3168]',
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
  avatar: 'bg-[repeating-linear-gradient(135deg,#EDECEA_0_6px,#F5F4F2_6px_12px)]',
  tinta: 'bg-[#000000] hover:bg-[#333333]',
  logo: 'negro',
};

export const paletaDe = (variante: HomeVariant): Paleta => {
  if (variante === 'claro') return CLARA;
  if (variante === 'azul') return AZUL;
  return OSCURA;
};

/** La paleta oscura por defecto, para las piezas que no reciben variante. */
export const PALETA_NEGRA = OSCURA;

/** Ancho de contenido de todas las pantallas de marca. */
export const ANCHO = 'max-w-[1240px] mx-auto px-6 md:px-12';
