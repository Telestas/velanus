import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { pathForScreen } from '../../router';
import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../../config';
import { guardarConsulta } from '../../data/consultas';
import { mensajeDeError } from '../../firebase';
import { Idioma, useIdioma } from '../../i18n/idioma';
import { Paleta, PALETA_NEGRA } from '../marca/paleta';
import { textos } from '../../i18n/textos';

/**
 * Piezas que comparten las cuatro maquetas de la home (oscura y clara, en
 * escritorio y en móvil): logo, enlaces de navegación y formulario de contacto.
 */

/** Los dos lockups del manual, ya recortados a la versión sin bajada. */
export const LOGO_AMBAR = `${import.meta.env.BASE_URL}logo-vn-ambar-simbolo.png`;
export const LOGO_NEGRO = `${import.meta.env.BASE_URL}logo-vn-negro-simbolo.png`;

interface LogoProps {
  /** `ambar` va sobre negro; `negro`, sobre claro. */
  tono: 'ambar' | 'negro';
  /** Alto en píxeles; el ancho lo pone el propio archivo. */
  alto: number;
  /** «Consultores & Asociados» compuesto al lado, no en el archivo. */
  conBajada?: boolean;
  className?: string;
}

/**
 * A 34–46 px de alto la bajada del logo original quedaba en 2–3 px e ilegible,
 * así que se usa el lockup sin bajada y el descriptivo se compone como texto.
 */
export const LogoVelaNus: React.FC<LogoProps> = ({
  tono,
  alto,
  conBajada = false,
  className = '',
}) => (
  <span className={`flex items-center gap-3 ${className}`}>
    <img
      src={tono === 'ambar' ? LOGO_AMBAR : LOGO_NEGRO}
      alt="Vela Nus"
      style={{ height: alto }}
      className="block w-auto"
    />
    {conBajada && (
      <span
        className={`text-[9px] uppercase tracking-[0.2em] leading-relaxed max-w-[120px] ${
          tono === 'ambar' ? 'text-[#FAFAFA]' : 'text-[#767676]'
        }`}
      >
        Consultores &amp; Asociados
      </span>
    )}
  </span>
);

/**
 * Destino de un enlace de la home. `pantalla` navega por el router; `ancla`
 * salta dentro de la propia home; `pendiente` marca lo que aún no existe
 * (aviso legal, privacidad…) para no publicar enlaces rotos.
 */
export interface DestinoEnlace {
  label: string;
  pantalla?: ScreenId;
  ancla?: string;
  pendiente?: boolean;
}

export const navHome = (idioma: Idioma): DestinoEnlace[] => {
  const t = textos(idioma).nav;
  return [
    { label: t.inicio, pantalla: 'home-desktop' },
    { label: t.servicios, pantalla: 'servicios-desktop' },
    { label: t.nosotros, pantalla: 'nosotros-desktop' },
    { label: t.blog, pantalla: 'blog' },
    { label: t.contacto, ancla: 'contacto' },
  ];
};

export const pieServicios = (idioma: Idioma): DestinoEnlace[] => {
  const t = textos(idioma).pie;
  return [
    { label: t.contabilidad, pantalla: 'servicios-contabilidad' },
    { label: t.legal, pantalla: 'servicios-legal' },
    { label: t.tramites, pantalla: 'servicios-tramites' },
    { label: t.eventos, pantalla: 'servicios-eventos' },
  ];
};

export const pieFirma = (idioma: Idioma): DestinoEnlace[] => {
  const t = textos(idioma);
  return [
    { label: t.pie.sobreNosotros, pantalla: 'nosotros-desktop' },
    { label: t.nav.blog, pantalla: 'blog' },
    { label: t.nav.contacto, ancla: 'contacto' },
  ];
};

export const pieLegal = (idioma: Idioma): DestinoEnlace[] => {
  const t = textos(idioma).pie;
  return [
    { label: t.avisoLegal, pantalla: 'aviso-legal' },
    { label: t.privacidad, pantalla: 'privacidad' },
    { label: t.disclaimer, pantalla: 'descargo' },
  ];
};

interface EnlaceProps {
  destino: DestinoEnlace;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
  className?: string;
  activo?: boolean;
}

/**
 * Enlace de navegación de la home.
 *
 * Se mantiene el patrón del proyecto: <a href> real con la ruta de destino y
 * preventDefault en el onClick, para que sigan funcionando el clic central y
 * «copiar dirección».
 */
export const Enlace: React.FC<EnlaceProps> = ({
  destino,
  onNavigate,
  className = '',
  activo,
}) => {
  if (destino.pendiente) {
    return (
      <span className={`${className} cursor-default`} title={destino.label}>
        {destino.label}
      </span>
    );
  }

  if (destino.ancla) {
    return (
      <a href={`#${destino.ancla}`} className={className}>
        {destino.label}
      </a>
    );
  }

  const pantalla = destino.pantalla!;

  return (
    <a
      href={pathForScreen(pantalla)}
      aria-current={activo ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault();
        if (!activo) onNavigate(pantalla);
      }}
      className={className}
    >
      {destino.label}
    </a>
  );
};

interface ConsentimientoProps {
  idioma: Idioma;
  aceptado: boolean;
  onCambio: (aceptado: boolean) => void;
  /** Para navegar a la política sin recargar; si falta, va como enlace normal. */
  onNavigate?: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
  /**
   * Sobre fondo oscuro, la paleta que toca (negra o azul). Si falta, se pinta
   * sobre claro.
   */
  paleta?: Paleta;
}

/**
 * Casilla de consentimiento.
 *
 * No es decorativa: sin marcarla no se envía, y las reglas de Firestore
 * rechazan cualquier escritura que no traiga `consentimiento: true` y la
 * versión del aviso aceptada. Así queda constancia de qué texto aceptó cada
 * persona, que es lo que hay que poder demostrar después.
 */
export const Consentimiento: React.FC<ConsentimientoProps> = ({
  idioma,
  aceptado,
  onCambio,
  onNavigate,
  paleta,
}) => {
  const t = textos(idioma).formulario;

  return (
    <label className="flex gap-3 items-start cursor-pointer">
      <input
        type="checkbox"
        required
        checked={aceptado}
        onChange={(e) => onCambio(e.target.checked)}
        className="w-5 h-5 mt-0.5 flex-none accent-[#F9A600]"
      />
      <span className={`text-sm leading-[1.55] ${paleta ? paleta.textoSuave : 'text-[#4A4A4A]'}`}>
        {t.consentimiento}{' '}
        <a
          href={pathForScreen('privacidad')}
          onClick={(e) => {
            if (!onNavigate) return;
            e.preventDefault();
            onNavigate('privacidad');
          }}
          className={`font-bold underline underline-offset-2 ${
            paleta ? paleta.acentoTexto : 'text-[#8A5800]'
          }`}
        >
          {t.consentimientoEnlace}
        </a>
        .
      </span>
    </label>
  );
};

/** Mensaje ya redactado con el que se abre WhatsApp desde los CTA del hero. */
export const mensajeConsulta = (idioma: Idioma): string =>
  idioma === 'en'
    ? 'Hello, I would like a consultation about operating in Cuba.'
    : 'Hola, quisiera una consulta sobre operar en Cuba.';

interface FormularioProps {
  /** `claro`: campos blancos sobre caja clara. `oscuro`: campos sobre negro. */
  tono: 'claro' | 'oscuro';
  /** Sufijo para los id de los campos; hay varios formularios por sitio. */
  idPrefijo: string;
  /** De dónde sale el relleno oscuro del botón de envío. Por defecto, negro. */
  paleta?: Paleta;
  onNavigate?: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
}

/**
 * Formulario de contacto.
 *
 * Guarda la consulta en Firestore y, además, ofrece abrir WhatsApp con el
 * texto ya redactado. El orden importa: primero se registra —así la consulta
 * no se pierde aunque el visitante nunca llegue a mandar el mensaje— y solo
 * después se le propone el atajo.
 */
export const FormularioContacto: React.FC<FormularioProps> = ({
  tono,
  idPrefijo,
  onNavigate,
  paleta = PALETA_NEGRA,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma).formulario;
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const oscuro = tono === 'oscuro';

  const campo = `border px-3.5 py-3.5 text-base font-[inherit] outline-none transition-colors ${
    oscuro
      ? 'border-[#4A4A4A] bg-[#0D0D0D] text-[#FAFAFA] focus:border-[#F9A600]'
      : 'border-[#B9B7B2] bg-white text-[#000000] focus:border-[#000000]'
  }`;
  const etiqueta = `text-sm font-bold ${oscuro ? 'text-[#FAFAFA]' : 'text-[#000000]'}`;

  const textoWhatsApp = () =>
    [
      'Consulta desde velanus.com',
      nombre && `Nombre: ${nombre}`,
      correo && `Correo: ${correo}`,
      pais && `País: ${pais}`,
      mensaje && `Consulta: ${mensaje}`,
    ]
      .filter(Boolean)
      .join('\n');

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acepta) {
      setError(t.consentimientoFalta);
      return;
    }

    setEnviando(true);
    setError('');

    try {
      await guardarConsulta({
        nombre,
        correo,
        pais,
        mensaje,
        origen: 'contacto-home',
      });
      setEnviado(true);
    } catch (fallo) {
      setError(
        `${mensajeDeError(fallo)} Escríbanos por WhatsApp y lo atendemos igual.`,
      );
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="flex flex-col gap-4">
        <span className={`text-xl font-bold ${oscuro ? 'text-[#FAFAFA]' : 'text-[#000000]'}`}>
          {t.recibido}
        </span>
        <p className={`text-base leading-relaxed ${oscuro ? 'text-[#B9B7B2]' : 'text-[#4A4A4A]'}`}>
          {nombre.trim() ? `${nombre.trim()}: ` : ''}
          {t.gracias}
        </p>
        <a
          href={whatsappLink(textoWhatsApp())}
          target="_blank"
          rel="noopener"
          className={`py-4 px-6 text-[17px] font-bold text-center transition-opacity hover:opacity-90 ${
            oscuro ? 'bg-[#F9A600] text-[#000000]' : 'bg-[#000000] text-[#F9A600]'
          }`}
        >
          {t.adelantar}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-5">
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={`nombre-${idPrefijo}`} className={etiqueta}>
          {t.nombre}
        </label>
        <input
          id={`nombre-${idPrefijo}`}
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={campo}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-[7px]">
          <label htmlFor={`correo-${idPrefijo}`} className={etiqueta}>
            {t.correo}
          </label>
          <input
            id={`correo-${idPrefijo}`}
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={campo}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor={`pais-${idPrefijo}`} className={etiqueta}>
            {t.pais}
          </label>
          <input
            id={`pais-${idPrefijo}`}
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            className={campo}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor={`mensaje-${idPrefijo}`} className={etiqueta}>
          {t.mensaje}
        </label>
        <textarea
          id={`mensaje-${idPrefijo}`}
          rows={3}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={`${campo} resize-y`}
        />
      </div>

      <Consentimiento
        idioma={idioma}
        aceptado={acepta}
        onCambio={setAcepta}
        onNavigate={onNavigate}
        paleta={oscuro ? PALETA_NEGRA : undefined}
      />

      {error && (
        <p className={`text-sm ${oscuro ? 'text-[#F9A600]' : 'text-[#8A5800]'}`}>{error}</p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className={`py-4 text-[17px] font-bold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed ${
          oscuro ? 'bg-[#F9A600] text-[#000000]' : `${paleta.tinta} text-[#F9A600]`
        }`}
      >
        {enviando ? t.enviando : t.enviar}
      </button>

      <span className={`text-sm ${oscuro ? 'text-[#B9B7B2]' : 'text-[#4A4A4A]'}`}>
        {t.alternativa(WHATSAPP_DISPLAY, CONTACT_EMAIL)}
      </span>
    </form>
  );
};
