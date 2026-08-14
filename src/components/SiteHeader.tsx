import React from 'react';
import { NavigationProps, ScreenId } from '../types';
import { directionTo, pathForScreen } from '../router';
import { ArrowLeft } from 'lucide-react';

interface SiteHeaderProps extends NavigationProps {
  /** Muestra la flecha de volver a la home (páginas interiores). */
  showBack?: boolean;
}

const NAV_LINKS: { screen: ScreenId; label: string }[] = [
  { screen: 'servicios-desktop', label: 'Servicios' },
  { screen: 'nosotros-desktop', label: 'Nosotros' },
  { screen: 'casos-desktop', label: 'Casos' },
];

/**
 * Cabecera compartida por las pantallas de escritorio.
 *
 * Los enlaces son <a href> reales apuntando a la ruta de cada pantalla, así
 * funcionan el clic central, "copiar dirección" y los rastreadores; el onClick
 * intercepta el clic normal para navegar sin recargar.
 */
export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
  showBack = false,
}) => (
  <header className="sticky top-0 z-50 flex justify-between items-center px-10 md:px-20 h-20 bg-[#121412]/95 backdrop-blur-md border-b border-[#f0bf5d]/20">
    <div className="flex items-center gap-4">
      {showBack && (
        <button
          onClick={() => onNavigate('home-desktop', 'push_back')}
          className="p-1.5 rounded-full border border-[#BA8F31]/30 hover:border-[#f3ac20] text-[#ffcd7f] hover:bg-[#1e201e] transition-all"
          title="Volver a inicio"
          aria-label="Volver a inicio"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}

      <a
        href={pathForScreen('home-desktop')}
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home-desktop', 'push_back');
        }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full border border-[#f0bf5d]/30 bg-[#1e201e] flex items-center justify-center text-[#ffcd7f] font-serif font-bold text-xl group-hover:border-[#f0bf5d] transition-colors">
          V
        </div>
        <span className="font-serif text-2xl font-semibold text-[#ffcd7f] tracking-tight">
          Vela Nus
        </span>
      </a>
    </div>

    <nav className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map(({ screen, label }) => {
        const isActive = screen === currentScreen;

        return (
          <a
            key={screen}
            href={pathForScreen(screen)}
            onClick={(e) => {
              e.preventDefault();
              if (!isActive) onNavigate(screen, directionTo(currentScreen, screen));
            }}
            aria-current={isActive ? 'page' : undefined}
            className={`font-semibold text-xs tracking-widest uppercase transition-colors cursor-pointer ${
              isActive
                ? 'text-[#ffcd7f] border-b-2 border-[#ffcd7f] pb-1'
                : 'text-[#d6c4ad] hover:text-[#ffcd7f]'
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>

    <button
      onClick={openDiagnosticModal}
      className="bg-[#f3ac20] text-[#432c00] hover:bg-[#ffdeae] font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[#f3ac20]/20"
    >
      Agendar diagnóstico
    </button>
  </header>
);
