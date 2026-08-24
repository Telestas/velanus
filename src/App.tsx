/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationProps, ScreenId } from './types';
import { currentScreen, pathForScreen } from './router';
import { aplicarSeo } from './seo';
import { useIdioma } from './i18n/idioma';
import { PrototypeController } from './components/PrototypeController';
import { HomeDesktopScreen } from './components/HomeDesktopScreen';
import { HomeMovilScreen } from './components/HomeMovilScreen';
import { ServiciosDesktopScreen } from './components/ServiciosDesktopScreen';
import { NosotrosDesktopScreen } from './components/NosotrosDesktopScreen';
import { CasosDesktopScreen } from './components/CasosDesktopScreen';
import { pantallaDeLinea } from './components/servicios/LineaScreen';
import { AdminScreen } from './components/AdminScreen';
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
  'casos-desktop': CasosDesktopScreen,
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
  const [transitionDirection, setTransitionDirection] = useState<'push' | 'push_back'>('push');
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);

  // Título, descripción y canónica dependen de la pantalla, no del documento.
  useEffect(() => {
    aplicarSeo(screen, idioma);
  }, [screen, idioma]);

  // El botón atrás del navegador debe cambiar de pantalla, no salir del sitio.
  useEffect(() => {
    const onPopState = () => {
      setTransitionDirection('push_back');
      setScreen(currentScreen());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (target: ScreenId, transitionType: 'push' | 'push_back' = 'push') => {
    setTransitionDirection(transitionType);
    setScreen(target);
    window.history.pushState({ screen: target }, '', pathForScreen(target));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Variants for push vs push_back screen transitions
  const screenVariants = {
    initial: (direction: 'push' | 'push_back') => ({
      x: direction === 'push' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 280,
        damping: 30,
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: 'push' | 'push_back') => ({
      x: direction === 'push' ? '-30%' : '30%',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };

  const ActiveScreen = SCREENS[screen];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#000000] flex flex-col font-sans selection:bg-[#F9A600] selection:text-[#000000]">
      {mostrarBarraDePrototipo() && (
        <PrototypeController currentScreen={screen} onNavigate={handleNavigate} />
      )}

      {/* Screen Render Canvas with Motion Transitions */}
      <div className="flex-grow relative overflow-x-hidden">
        <AnimatePresence mode="wait" custom={transitionDirection}>
          <motion.div
            key={screen}
            custom={transitionDirection}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-full"
          >
            <ActiveScreen
              currentScreen={screen}
              onNavigate={handleNavigate}
              openDiagnosticModal={() => setDiagnosticModalOpen(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Modal */}
      <DiagnosticModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
      />
    </div>
  );
}
