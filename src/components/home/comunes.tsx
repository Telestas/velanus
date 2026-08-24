import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { pathForScreen } from '../../router';
import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from '../../config';

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

export const NAV_HOME: DestinoEnlace[] = [
  { label: 'Inicio', pantalla: 'home-desktop' },
  { label: 'Servicios', pantalla: 'servicios-desktop' },
  { label: 'Nosotros', pantalla: 'nosotros-desktop' },
  { label: 'Reseñas', pantalla: 'casos-desktop' },
  { label: 'Blog', ancla: 'blog' },
  { label: 'Contacto', ancla: 'contacto' },
];

export const PIE_SERVICIOS: DestinoEnlace[] = [
  { label: 'Contabilidad', pantalla: 'servicios-contabilidad' },
  { label: 'Legal corporativo', pantalla: 'servicios-legal' },
  { label: 'Trámites y visas', pantalla: 'servicios-tramites' },
  { label: 'Eventos y capacitación', pantalla: 'servicios-eventos' },
];

export const PIE_FIRMA: DestinoEnlace[] = [
  { label: 'Sobre nosotros', pantalla: 'nosotros-desktop' },
  { label: 'Reseñas y casos', pantalla: 'casos-desktop' },
  { label: 'Blog', ancla: 'blog' },
  { label: 'Contacto', ancla: 'contacto' },
];

export const PIE_LEGAL: DestinoEnlace[] = [
  { label: 'Aviso legal', pendiente: true },
  { label: 'Privacidad', pendiente: true },
  { label: 'Disclaimer', pendiente: true },
];

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
      <span className={`${className} cursor-default`} title="Página pendiente">
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

/** Mensaje ya redactado con el que se abre WhatsApp desde los CTA del hero. */
export const MENSAJE_CONSULTA =
  'Hola, quisiera una consulta sobre operar en Cuba.';

interface FormularioProps {
  /** `claro`: campos blancos sobre caja clara. `oscuro`: campos sobre negro. */
  tono: 'claro' | 'oscuro';
  /** Sufijo para los id de los campos; hay varios formularios por sitio. */
  idPrefijo: string;
}

/**
 * Formulario de contacto.
 *
 * El sitio es estático y no hay a dónde enviar un POST, así que el botón
 * compone la consulta y abre WhatsApp con el texto ya escrito. Es un desvío
 * deliberado de la maqueta, que dibujaba un envío convencional: se avisa bajo
 * el botón para que nadie crea que el mensaje ya salió.
 */
export const FormularioContacto: React.FC<FormularioProps> = ({ tono, idPrefijo }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');

  const oscuro = tono === 'oscuro';

  const campo = `border px-3.5 py-3.5 text-base font-[inherit] outline-none transition-colors ${
    oscuro
      ? 'border-[#4A4A4A] bg-[#0D0D0D] text-[#FAFAFA] focus:border-[#F9A600]'
      : 'border-[#B9B7B2] bg-white text-[#000000] focus:border-[#000000]'
  }`;
  const etiqueta = `text-sm font-bold ${oscuro ? 'text-[#FAFAFA]' : 'text-[#000000]'}`;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = [
      'Consulta desde velanus.com',
      nombre && `Nombre: ${nombre}`,
      correo && `Correo: ${correo}`,
      pais && `País: ${pais}`,
      mensaje && `Consulta: ${mensaje}`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(whatsappLink(texto), '_blank', 'noopener');
  };

  return (
    <form onSubmit={enviar} className="flex flex-col gap-5">
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={`nombre-${idPrefijo}`} className={etiqueta}>
          Nombre y apellidos
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
            Correo electrónico
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
            País desde el que opera
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
          Qué necesita resolver
        </label>
        <textarea
          id={`mensaje-${idPrefijo}`}
          rows={3}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={`${campo} resize-y`}
        />
      </div>

      <button
        type="submit"
        className={`py-4 text-[17px] font-bold transition-opacity hover:opacity-90 ${
          oscuro ? 'bg-[#F9A600] text-[#000000]' : 'bg-[#000000] text-[#F9A600]'
        }`}
      >
        Enviar consulta
      </button>

      <span className={`text-sm ${oscuro ? 'text-[#B9B7B2]' : 'text-[#4A4A4A]'}`}>
        Se abrirá WhatsApp ({WHATSAPP_DISPLAY}) con su consulta ya redactada. También
        puede escribir a {CONTACT_EMAIL}.
      </span>
    </form>
  );
};
