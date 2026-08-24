import React from 'react';
import { ScreenId } from '../types';
import { pathForScreen } from '../router';
import { Monitor, Smartphone, Layers, SlidersHorizontal } from 'lucide-react';

interface PrototypeControllerProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transitionType?: 'push' | 'push_back') => void;
}

interface ScreenTab {
  id: ScreenId;
  label: string;
  icon: typeof Monitor;
  title: string;
}

/** El orden define la dirección de la transición entre pantallas. */
const TABS: ScreenTab[] = [
  { id: 'home-desktop', label: 'Home - Desktop', icon: Monitor, title: 'Pantalla 1: Home Desktop' },
  { id: 'home-movil', label: 'Home - Móvil', icon: Smartphone, title: 'Pantalla 2: Home Móvil' },
  { id: 'servicios-desktop', label: 'Servicios', icon: Monitor, title: 'Pantalla 3: Servicios Desktop' },
  { id: 'nosotros-desktop', label: 'Nosotros', icon: Monitor, title: 'Pantalla 4: Nosotros Desktop' },
  { id: 'casos-desktop', label: 'Casos', icon: Monitor, title: 'Pantalla 5: Casos Desktop' },
  { id: 'admin', label: 'Admin', icon: SlidersHorizontal, title: 'Administración: apariencia de la home' },
];

export const PrototypeController: React.FC<PrototypeControllerProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const currentIndex = TABS.findIndex((tab) => tab.id === currentScreen);

  return (
    <div className="bg-[#0d0f0d] border-b border-[#514534]/50 text-xs py-2 px-4 sticky top-0 z-[60] flex flex-wrap items-center justify-between gap-3 select-none backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-[#ffcd7f] font-serif font-semibold tracking-wider pr-3 border-r border-[#514534]">
          <Layers className="w-3.5 h-3.5 text-[#f3ac20]" />
          <span>Vela Nus Prototype</span>
        </div>
        <span className="text-[#9e8e7a] hidden sm:inline">Navegación Interactiva:</span>
      </div>

      {/* Screen Selector Buttons */}
      <div className="flex items-center gap-1 bg-[#1a1c1a] p-1 rounded border border-[#514534]/40">
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = tab.id === currentScreen;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id, index < currentIndex ? 'push_back' : 'push')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                isActive
                  ? 'bg-[#f3ac20] text-[#432c00] font-semibold shadow'
                  : 'text-[#d6c4ad] hover:text-[#ffcd7f] hover:bg-[#292a28]'
              }`}
              title={tab.title}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-2 text-[#9e8e7a]">
        <span className="text-[11px] uppercase tracking-wider text-[#BA8F31]">Ruta Activa:</span>
        <span className="text-[#e3e3df] font-mono text-[11px]">
          {pathForScreen(currentScreen)}
        </span>
      </div>
    </div>
  );
};
