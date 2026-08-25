import React from 'react';
import { NavigationProps, ScreenId } from '../types';
import { CONTACT_EMAIL } from '../config';
import { contenidoLegal, paginaLegal } from '../content/legal';
import { useIdioma } from '../i18n/idioma';
import { textos } from '../i18n/textos';
import { useVarianteHome } from './home/useVariante';
import { CabeceraSitio } from './marca/CabeceraSitio';
import { PieSitio } from './marca/PieSitio';
import { Miga } from './marca/piezas';
import { ANCHO, paletaDe } from './marca/paleta';

interface LegalScreenProps extends NavigationProps {
  pantalla: ScreenId;
}

/**
 * Plantilla de las tres páginas legales: aviso legal, privacidad y descargo.
 *
 * Comparten estructura —titular, apartados y fecha de actualización— así que
 * se pintan una vez y reciben los datos de `content/legal.ts`.
 *
 * Mientras el texto sea un borrador, la página lo dice arriba y a la vista. Un
 * texto legal a medias que parece definitivo es peor que no tenerlo: da por
 * cerradas cosas que nadie ha aprobado.
 */
export const LegalScreen: React.FC<LegalScreenProps> = ({
  pantalla,
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  const idioma = useIdioma();
  const t = textos(idioma);
  const paleta = paletaDe(useVarianteHome());
  const contenido = contenidoLegal(idioma);
  const pagina = paginaLegal(idioma, pantalla)!;

  return (
    <div className={`${paleta.fondo} ${paleta.texto} font-marca`}>
      <CabeceraSitio
        paleta={paleta}
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        openDiagnosticModal={openDiagnosticModal}
        borde
      />

      <Miga
        paleta={paleta}
        onNavigate={onNavigate}
        ruta={[{ label: t.servicios.migaInicio, pantalla: 'home-desktop' }]}
        actual={pagina.titulo}
      />

      <article className={`${ANCHO} pt-6 pb-20 max-w-[820px]`}>
        <header className="flex flex-col gap-5 mb-10">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[34px] md:text-[44px] leading-[1.1] font-bold text-pretty">
            {pagina.titulo}
          </h1>
          <p className={`text-lg leading-relaxed ${paleta.textoFuerte}`}>
            {pagina.entradilla}
          </p>
          <span className={`text-sm ${paleta.textoTenue}`}>{contenido.actualizado}</span>
        </header>

        {/* BORRADOR: se retira cuando el equipo jurídico apruebe el texto. */}
        <div className="border-l-4 border-[#F9A600] bg-[#F9A600]/10 px-6 py-5 mb-12">
          <p className={`text-base leading-relaxed ${paleta.textoFuerte}`}>
            {contenido.aviso}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {pagina.apartados.map((apartado) => (
            <section key={apartado.titulo} className="flex flex-col gap-4">
              <h2 className="text-[22px] md:text-[26px] leading-tight font-bold">
                {apartado.titulo}
              </h2>
              {apartado.parrafos.map((parrafo, i) =>
                parrafo.startsWith('- ') ? (
                  <div key={i} className="flex gap-3.5 items-baseline">
                    <span className="w-1.5 h-1.5 bg-[#F9A600] flex-none" />
                    <span className={`text-[17px] leading-[1.7] ${paleta.textoSuave}`}>
                      {parrafo.slice(2)}
                    </span>
                  </div>
                ) : (
                  <p key={i} className={`text-[17px] leading-[1.7] ${paleta.textoSuave}`}>
                    {parrafo}
                  </p>
                ),
              )}
            </section>
          ))}
        </div>

        <footer className={`mt-14 border-t ${paleta.borde} pt-8`}>
          <p className={`text-base leading-relaxed ${paleta.textoSuave}`}>
            {idioma === 'en'
              ? 'Questions about any of this? Write to '
              : '¿Dudas sobre cualquiera de estos puntos? Escríbanos a '}
            <a href={`mailto:${CONTACT_EMAIL}`} className={`font-bold ${paleta.acentoTexto}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </footer>
      </article>

      <PieSitio paleta={paleta} onNavigate={onNavigate} />
    </div>
  );
};

/** Una pantalla por página legal; el router mapea id → componente. */
export const pantallaLegal = (pantalla: ScreenId): React.FC<NavigationProps> => {
  const Pantalla: React.FC<NavigationProps> = (props) => (
    <LegalScreen {...props} pantalla={pantalla} />
  );
  Pantalla.displayName = `LegalScreen(${pantalla})`;
  return Pantalla;
};
