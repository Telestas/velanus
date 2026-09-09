import React from 'react';
import { NavigationProps } from '../types';
import { useIdioma } from '../i18n/idioma';
import { pathForScreen } from '../router';
import { useVarianteHome } from './home/useVariante';
import { CabeceraSitio } from './marca/CabeceraSitio';
import { PieSitio } from './marca/PieSitio';
import { ANCHO, paletaDe } from './marca/paleta';

export const NotFoundScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const paleta = paletaDe(useVarianteHome());
  const contenido =
    idioma === 'en'
      ? {
          etiqueta: 'Error 404',
          titulo: 'This page does not exist',
          texto: 'The address may have changed, or the link may be incorrect.',
          boton: 'Return home',
        }
      : {
          etiqueta: 'Error 404',
          titulo: 'Esta página no existe',
          texto: 'Es posible que la dirección haya cambiado o que el enlace sea incorrecto.',
          boton: 'Volver al inicio',
        };

  return (
    <div className={`${paleta.fondo} ${paleta.texto} font-marca min-h-screen flex flex-col`}>
      <CabeceraSitio
        paleta={paleta}
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        openDiagnosticModal={openDiagnosticModal}
        borde
      />

      <section className={`${ANCHO} py-24 md:py-32 flex-1 w-full`}>
        <div className="max-w-[720px] flex flex-col gap-6">
          <span className={`text-[13px] tracking-[0.2em] uppercase ${paleta.acentoTexto}`}>
            {contenido.etiqueta}
          </span>
          <h1 className="text-[40px] md:text-[58px] leading-[1.08] font-bold">
            {contenido.titulo}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${paleta.textoSuave}`}>
            {contenido.texto}
          </p>
          <a
            href={pathForScreen('home-desktop')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home-desktop', 'push_back');
            }}
            className="self-start bg-[#F9A600] text-[#000000] px-7 py-4 text-base font-bold hover:bg-[#FFC048] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9A600]"
          >
            {contenido.boton}
          </a>
        </div>
      </section>

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};
