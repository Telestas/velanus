import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
  Landmark, Printer, Calendar, FileText, Menu, X, 
  MessageSquare, User, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const HomeMovilScreen: React.FC<NavigationProps> = ({
  onNavigate,
  openDiagnosticModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-[#e3e3df] flex flex-col items-center justify-start py-4 sm:py-8 font-sans">
      {/* Mobile Device Container Frame */}
      <div className="w-full max-w-[420px] bg-[#0a0c0a] border border-[#BA8F31]/30 sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col min-h-[840px] relative">
        
        {/* Mobile Device Status Bar */}
        <div className="bg-[#121412] px-6 py-2 flex items-center justify-between text-[11px] text-[#9e8e7a] border-b border-[#BA8F31]/15">
          <span>9:41</span>
          <span className="font-semibold text-[#f3ac20] text-[10px] uppercase tracking-wider">Vela Nus Mobile View</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f3ac20]"></span>
            <span>5G</span>
          </div>
        </div>

        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-6 h-16 bg-[#121412]/95 backdrop-blur-md border-b border-[#f0bf5d]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#f0bf5d]/30 bg-[#1e201e] flex items-center justify-center text-[#ffcd7f] font-serif font-bold text-base">
              V
            </div>
            <span className="font-serif text-lg font-semibold text-[#ffcd7f]">
              Vela Nus
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#ffcd7f] p-1.5 focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Navigation Drawer for Mobile - Contains mandatory xpath: //nav//a[contains(text(), 'Servicios')] */}
        <nav 
          className={`bg-[#121412] border-b border-[#BA8F31]/30 px-6 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* Mandatory element: //nav//a[contains(text(), 'Servicios')] */}
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate('servicios-desktop', 'push');
              }}
              className="text-[#ffcd7f] font-semibold text-sm py-2 border-b border-[#BA8F31]/15 flex items-center justify-between"
            >
              <span>Servicios</span>
              <ChevronRight className="w-4 h-4 text-[#f3ac20]" />
            </a>

            <a
              href="#nosotros"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              className="text-[#d6c4ad] font-semibold text-sm py-2 border-b border-[#BA8F31]/15"
            >
              Nosotros
            </a>

            <a
              href="#casos"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
              className="text-[#d6c4ad] font-semibold text-sm py-2"
            >
              Casos
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDiagnosticModal();
              }}
              className="mt-2 w-full bg-[#f3ac20] text-[#432c00] font-semibold py-2.5 rounded text-xs uppercase tracking-wider text-center"
            >
              Agendar diagnóstico
            </button>
          </div>
        </nav>

        {/* Mobile Main Body */}
        <div className="flex-grow p-6 flex flex-col gap-10">
          {/* Mobile Hero */}
          <section className="flex flex-col gap-4 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#f3ac20] font-semibold">
              Consultoría Corporativa Cuba
            </span>
            <h1 className="font-serif text-2xl font-semibold leading-tight text-[#e3e3df]">
              Emprender en Cuba es un reto. Con nosotros, una estrategia.
            </h1>
            <p className="text-sm text-[#d6c4ad] leading-relaxed">
              Su departamento administrativo externo. Una propuesta integral para gestionar y escalar su negocio con precisión institucional.
            </p>

            <button
              onClick={openDiagnosticModal}
              className="mt-2 w-full bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] font-semibold py-3.5 px-4 rounded text-xs uppercase tracking-wider text-center shadow-lg"
            >
              Agenda tu diagnóstico gratuito
            </button>
          </section>

          {/* Services List */}
          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl font-medium text-[#e3e3df] border-b border-[#BA8F31]/20 pb-2">
              Servicios
            </h2>

            <div className="flex flex-col gap-3">
              <div 
                onClick={() => onNavigate('servicios-desktop', 'push')}
                className="bg-[#121716] border border-[#BA8F31]/20 p-4 rounded flex items-start gap-3.5 cursor-pointer active:bg-[#1e201e]"
              >
                <Landmark className="w-6 h-6 text-[#ffcd7f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#e3e3df]">Contable y legal</h3>
                  <p className="text-xs text-[#d6c4ad] mt-1">Estructuración financiera y cumplimiento normativo.</p>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('servicios-desktop', 'push')}
                className="bg-[#121716] border border-[#BA8F31]/20 p-4 rounded flex items-start gap-3.5 cursor-pointer active:bg-[#1e201e]"
              >
                <Printer className="w-6 h-6 text-[#ffcd7f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#e3e3df]">Impresión</h3>
                  <p className="text-xs text-[#d6c4ad] mt-1">Soluciones gráficas de alta fidelidad para corporativos.</p>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('servicios-desktop', 'push')}
                className="bg-[#121716] border border-[#BA8F31]/20 p-4 rounded flex items-start gap-3.5 cursor-pointer active:bg-[#1e201e]"
              >
                <Calendar className="w-6 h-6 text-[#ffcd7f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#e3e3df]">Eventos</h3>
                  <p className="text-xs text-[#d6c4ad] mt-1">Producción y logística para encuentros empresariales.</p>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('servicios-desktop', 'push')}
                className="bg-[#121716] border border-[#BA8F31]/20 p-4 rounded flex items-start gap-3.5 cursor-pointer active:bg-[#1e201e]"
              >
                <FileText className="w-6 h-6 text-[#ffcd7f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#e3e3df]">Trámites</h3>
                  <p className="text-xs text-[#d6c4ad] mt-1">Gestión ágil de documentación oficial e institucional.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial / Cases */}
          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl font-medium text-[#e3e3df] border-b border-[#BA8F31]/20 pb-2">
              Casos de éxito
            </h2>
            <div className="bg-[#121716] border border-[#BA8F31]/20 p-4 rounded space-y-3">
              <p className="text-xs text-[#d6c4ad] italic leading-relaxed">
                "La estructura contable que implementaron nos dio la claridad necesaria para expandirnos con seguridad."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#292a28] border border-[#BA8F31]/30 flex items-center justify-center text-[#d6c4ad]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#e3e3df]">Carlos M.</p>
                  <p className="text-[10px] text-[#f3ac20]">Sector Gastronómico</p>
                </div>
              </div>
            </div>
          </section>

          {/* WhatsApp CTA */}
          <section className="bg-[#121716] border border-[#BA8F31]/30 p-5 rounded text-center space-y-3">
            <h3 className="font-serif text-lg text-[#e3e3df]">¿Listo para estructurar su negocio?</h3>
            <p className="text-xs text-[#d6c4ad]">Hablemos sobre las necesidades específicas de su empresa.</p>
            <button
              onClick={openDiagnosticModal}
              className="w-full bg-[#f3ac20] text-[#412402] font-semibold py-3 rounded text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Escribir por WhatsApp
            </button>
          </section>
        </div>

        {/* Mobile Footer - Contains mandatory xpath: //footer//a[contains(text(), 'Servicios')] */}
        <footer className="bg-[#0d0f0d] border-t border-[#f0bf5d]/15 p-6 flex flex-col gap-6">
          <span className="font-serif text-xl font-semibold text-[#ffcd7f]">
            Vela Nus
          </span>

          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-[#d6c4ad]">
            <a href="#instagram" className="hover:text-[#ffdf97]">Instagram</a>
            <a href="https://wa.me/5350000000" className="hover:text-[#ffdf97]">WhatsApp</a>
            <a href="mailto:contacto@velanus.cu" className="hover:text-[#ffdf97]">Email</a>
            <span className="hover:text-[#ffdf97]">La Habana</span>
            
            {/* Mandatory xpath element: //footer//a[contains(text(), 'Servicios')] */}
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('servicios-desktop', 'push');
              }}
              className="hover:text-[#ffdf97] font-semibold text-[#ffcd7f] cursor-pointer"
            >
              Servicios
            </a>
            <a href="#nosotros" className="hover:text-[#ffdf97]">Nosotros</a>
            <a href="#casos" className="hover:text-[#ffdf97]">Casos</a>
          </div>

          <div className="pt-4 border-t border-[#BA8F31]/20">
            <p className="text-[11px] text-[#9e8e7a]">
              © 2024 Vela Nus. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
