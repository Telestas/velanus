import React from 'react';
import { ScreenId } from '../types';
import { Monitor, Smartphone, Layers, ArrowRight } from 'lucide-react';

interface PrototypeControllerProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const PrototypeController: React.FC<PrototypeControllerProps> = ({
  currentScreen,
  onNavigate,
}) => {
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
        <button
          onClick={() => onNavigate('home-desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
            currentScreen === 'home-desktop'
              ? 'bg-[#f3ac20] text-[#432c00] font-semibold shadow'
              : 'text-[#d6c4ad] hover:text-[#ffcd7f] hover:bg-[#292a28]'
          }`}
          title="Pantalla 1: Home Desktop"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Home - Desktop</span>
        </button>

        <button
          onClick={() => onNavigate('home-movil')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
            currentScreen === 'home-movil'
              ? 'bg-[#f3ac20] text-[#432c00] font-semibold shadow'
              : 'text-[#d6c4ad] hover:text-[#ffcd7f] hover:bg-[#292a28]'
          }`}
          title="Pantalla 2: Home Móvil"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Home - Móvil</span>
        </button>

        <button
          onClick={() => onNavigate('servicios-desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
            currentScreen === 'servicios-desktop'
              ? 'bg-[#f3ac20] text-[#432c00] font-semibold shadow'
              : 'text-[#d6c4ad] hover:text-[#ffcd7f] hover:bg-[#292a28]'
          }`}
          title="Pantalla 3: Servicios Desktop"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Servicios - Desktop</span>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-[#9e8e7a]">
        <span className="text-[11px] uppercase tracking-wider text-[#BA8F31]">Flujo Activo:</span>
        <span className="text-[#e3e3df] font-mono text-[11px]">
          {currentScreen === 'home-desktop' && 'Home - Desktop → [Nav/Footer Servicios] → Servicios'}
          {currentScreen === 'home-movil' && 'Home - Móvil → [Nav/Footer Servicios] → Servicios'}
          {currentScreen === 'servicios-desktop' && 'Servicios → [Header/Footer Vela Nus] → Home - Desktop'}
        </span>
      </div>
    </div>
  );
};
