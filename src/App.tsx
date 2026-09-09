/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { NavigationProps, ScreenId } from './types';
import { articuloDeRuta, currentScreen, pathForScreen } from './router';
import { aplicarSeo } from './seo';
import { useIdioma } from './i18n/idioma';
import { PrototypeController } from './components/PrototypeController';
import { HomeDesktopScreen } from './components/HomeDesktopScreen';
import { HomeMovilScreen } from './components/HomeMovilScreen';
import { ServiciosDesktopScreen } from './components/ServiciosDesktopScreen';
import { NosotrosDesktopScreen } from './components/NosotrosDesktopScreen';
import { pantallaDeLinea } from './components/servicios/LineaScreen';
import { AdminScreen } from './components/AdminScreen';
import { BlogScreen } from './components/blog/BlogScreen';
import { pantallaLegal } from './components/LegalScreen';
import { ArticuloScreen } from './components/blog/ArticuloScreen';
import { DiagnosticModal } from './components/DiagnosticModal';

const SCREENS: Record<ScreenId, React.FC<NavigationProps>> = {
  'home-desktop': HomeDesktopScreen,
  'home-movil': HomeMovilScreen,
  'servicios-desktop': ServiciosDesktopScreen,
  // Las cuatro subpáginas de servicio comparten plantilla y solo cambian de datos.
  'servicios-contabilidad': pantallaDeLinea('servicios-contabilidad'),
  'servicios-legal': pantallaDeLinea('servicios-legal'),
  'servicios-tramites': pantallaDeLinea('servicios-tramites'),
  'servicios-eventos': pantallaDeLinea('servicios-eventos'),
  'nosotros-desktop': NosotrosDesktopScreen,
  blog: BlogScreen,
  'blog-articulo': ArticuloScreen,
  'aviso-legal': pantallaLegal('aviso-legal'),
  privacidad: pantallaLegal('privacidad'),
  descargo: pantallaLegal('descargo'),
  admin: AdminScreen,
};

/**
 * La barra de prototipo es andamiaje de desarrollo: salta entre pantallas y las
 * nombra «Pantalla 1», «Servicio A»… Un visitante de velanus.com no debe verla
 * nunca. Sale en `npm run dev` y, en producción, solo si se pide a propósito
 * con `?proto=1` (para poder enseñar el prototipo al cliente).
 */
const mostrarBarraDePrototipo = (): boolean =>
  import.meta.env.DEV ||
  (typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('proto'));

export default function App() {
  const idioma = useIdioma();
  const [screen, setScreen] = useState<ScreenId>(currentScreen);
  // Parte variable de la ruta; hoy solo el slug del artículo del blog.
  const [parametro, setParametro] = useState<string | undefined>(() =>
    articuloDeRuta(window.location.pathname),
  );
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);

  // Título, descripción y canónica dependen de la pantalla, no del documento.
  useEffect(() => {
    aplicarSeo(screen, idioma, parametro);
  }, [screen, idioma, parametro]);

  // El botón atrás del navegador debe cambiar de pantalla, no salir del sitio.
  useEffect(() => {
    const onPopState = () => {
      setScreen(currentScreen());
      setParametro(articuloDeRuta(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Los enlaces a secciones de la home también pueden partir de otra vista.
  // Esperamos a que React monte la nueva pantalla antes de desplazar el
  // documento hasta el destino.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let frame = 0;
    let intentos = 0;

    const desplazar = () => {
      const destino = document.getElementById(id);
      if (destino) {
        destino.scrollIntoView({
          behavior: reducirMovimiento ? 'auto' : 'smooth',
          block: 'start',
        });
        return;
      }

      if (intentos < 90) {
        intentos += 1;
        frame = window.requestAnimationFrame(desplazar);
      }
    };

    frame = window.requestAnimationFrame(desplazar);
    return () => window.cancelAnimationFrame(frame);
  }, [screen, parametro]);

  const handleNavigate = (
    target: ScreenId,
    _transitionType: 'push' | 'push_back' = 'push',
    nuevoParametro?: string,
  ) => {
    setScreen(target);
    setParametro(nuevoParametro);
    window.history.pushState(
      { screen: target, parametro: nuevoParametro },
      '',
      pathForScreen(target, nuevoParametro),
    );
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const ActiveScreen = SCREENS[screen];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#000000] flex flex-col font-sans selection:bg-[#F9A600] selection:text-[#000000]">
      {mostrarBarraDePrototipo() && (
        <PrototypeController currentScreen={screen} onNavigate={handleNavigate} />
      )}

      {/* La cabecera no se anima: solo entran los bloques de contenido. */}
      <div className="flex-grow relative overflow-x-hidden">
        <div key={`${screen}:${parametro ?? ''}`} className="vn-route-view w-full min-h-full">
          <ActiveScreen
            currentScreen={screen}
            onNavigate={handleNavigate}
            openDiagnosticModal={() => setDiagnosticModalOpen(true)}
            parametro={parametro}
          />
        </div>
      </div>

      {/* Interactive Modal */}
      <DiagnosticModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
      />
    </div>
  );
}
