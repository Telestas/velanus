/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from './types';
import { PrototypeController } from './components/PrototypeController';
import { HomeDesktopScreen } from './components/HomeDesktopScreen';
import { HomeMovilScreen } from './components/HomeMovilScreen';
import { ServiciosDesktopScreen } from './components/ServiciosDesktopScreen';
import { DiagnosticModal } from './components/DiagnosticModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home-desktop');
  const [transitionDirection, setTransitionDirection] = useState<'push' | 'push_back'>('push');
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);

  const handleNavigate = (target: ScreenId, transitionType: 'push' | 'push_back' = 'push') => {
    setTransitionDirection(transitionType);
    setCurrentScreen(target);
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

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-[#e3e3df] flex flex-col font-sans selection:bg-[#f3ac20] selection:text-[#432c00]">
      {/* Top Prototype Navigation Controller Bar */}
      <PrototypeController
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          const dir = screen === 'home-desktop' && currentScreen === 'servicios-desktop' ? 'push_back' : 'push';
          handleNavigate(screen, dir);
        }}
      />

      {/* Screen Render Canvas with Motion Transitions */}
      <div className="flex-grow relative overflow-x-hidden">
        <AnimatePresence mode="wait" custom={transitionDirection}>
          {currentScreen === 'home-desktop' && (
            <motion.div
              key="home-desktop"
              custom={transitionDirection}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full min-h-full"
            >
              <HomeDesktopScreen
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                openDiagnosticModal={() => setDiagnosticModalOpen(true)}
              />
            </motion.div>
          )}

          {currentScreen === 'home-movil' && (
            <motion.div
              key="home-movil"
              custom={transitionDirection}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full min-h-full"
            >
              <HomeMovilScreen
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                openDiagnosticModal={() => setDiagnosticModalOpen(true)}
              />
            </motion.div>
          )}

          {currentScreen === 'servicios-desktop' && (
            <motion.div
              key="servicios-desktop"
              custom={transitionDirection}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full min-h-full"
            >
              <ServiciosDesktopScreen
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
                openDiagnosticModal={() => setDiagnosticModalOpen(true)}
              />
            </motion.div>
          )}
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
