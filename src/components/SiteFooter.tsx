import React from 'react';
import { ScreenId } from '../types';
import { directionTo, pathForScreen } from '../router';
import { CONTACT_CITY, CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../config';

interface SiteFooterProps {
  currentScreen: ScreenId;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
}

const FOOTER_LINKS: { screen: ScreenId; label: string }[] = [
  { screen: 'servicios-desktop', label: 'Servicios' },
  { screen: 'nosotros-desktop', label: 'Nosotros' },
  { screen: 'casos-desktop', label: 'Casos' },
];

/** Pie compartido por las pantallas de escritorio. */
export const SiteFooter: React.FC<SiteFooterProps> = ({ currentScreen, onNavigate }) => (
  <footer className="w-full py-16 px-10 md:px-20 bg-[#0d0f0d] border-t border-[#f0bf5d]/15 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="flex flex-col gap-4 max-w-sm">
        <a
          href={pathForScreen('home-desktop')}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home-desktop', 'push_back');
          }}
          className="cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="font-serif text-3xl font-semibold text-[#ffcd7f]">
            Vela Nus
          </span>
        </a>
        <p className="text-sm text-[#d6c4ad] leading-relaxed">
          Consultoría corporativa y gestión administrativa para empresas en Cuba.
        </p>
        <p className="text-xs text-[#9e8e7a]">
          © 2026 Vela Nus. Todos los derechos reservados.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12 w-full md:w-auto">
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-widest text-[#ffcd7f] font-semibold mb-1">
            Explorar
          </h4>
          {FOOTER_LINKS.map(({ screen, label }) => (
            <a
              key={screen}
              href={pathForScreen(screen)}
              onClick={(e) => {
                e.preventDefault();
                if (screen !== currentScreen) {
                  onNavigate(screen, directionTo(currentScreen, screen));
                }
              }}
              className={`text-sm transition-colors cursor-pointer ${
                screen === currentScreen
                  ? 'text-[#ffcd7f] font-semibold'
                  : 'text-[#d6c4ad] hover:text-[#ffdf97]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-widest text-[#ffcd7f] font-semibold mb-1">
            Contacto
          </h4>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <span className="text-sm text-[#d6c4ad]">{CONTACT_CITY}</span>
        </div>
      </div>
    </div>
  </footer>
);
