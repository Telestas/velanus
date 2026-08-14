import React from 'react';
import { NavigationProps } from '../types';
import { Landmark, Printer, Calendar, FileText, ArrowRight, ShieldCheck, Award, MessageSquare, CheckCircle2 } from 'lucide-react';

export const HomeDesktopScreen: React.FC<NavigationProps> = ({
  onNavigate,
  openDiagnosticModal,
}) => {
  return (
    <div className="min-h-screen bg-[#0a0c0a] text-[#e3e3df] flex flex-col font-sans">
      {/* Header / TopAppBar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 md:px-20 h-20 bg-[#121412]/95 backdrop-blur-md border-b border-[#f0bf5d]/20">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home-desktop')}
        >
          <div className="w-10 h-10 rounded-full border border-[#f0bf5d]/30 bg-[#1e201e] flex items-center justify-center text-[#ffcd7f] font-serif font-bold text-xl group-hover:border-[#f0bf5d] transition-colors">
            V
          </div>
          <span className="font-serif text-2xl font-semibold text-[#ffcd7f] tracking-tight">
            Vela Nus
          </span>
        </div>

        {/* nav element containing 'Servicios' link as per xpath: //nav//a[contains(text(), 'Servicios')] */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#servicios"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('servicios-desktop', 'push');
            }}
            className="text-[#ffcd7f] border-b-2 border-[#ffcd7f] pb-1 font-semibold text-xs tracking-widest uppercase hover:text-[#ffdeae] transition-colors cursor-pointer"
          >
            Servicios
          </a>
          <a
            href="#nosotros"
            onClick={(e) => e.preventDefault()}
            className="text-[#d6c4ad] font-semibold text-xs tracking-widest uppercase hover:text-[#ffcd7f] transition-colors cursor-pointer"
          >
            Nosotros
          </a>
          <a
            href="#casos"
            onClick={(e) => e.preventDefault()}
            className="text-[#d6c4ad] font-semibold text-xs tracking-widest uppercase hover:text-[#ffcd7f] transition-colors cursor-pointer"
          >
            Casos
          </a>
        </nav>

        <button
          onClick={openDiagnosticModal}
          className="bg-[#f3ac20] text-[#432c00] hover:bg-[#ffdeae] font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[#f3ac20]/20"
        >
          Agendar diagnóstico
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 px-10 md:px-20 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="min-h-[65vh] flex flex-col justify-center items-start mb-24 relative py-12">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#f3ac20]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <span className="text-xs uppercase tracking-[0.2em] text-[#f3ac20] font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#f3ac20]" />
            Consultoría Corporativa & Gestión Administrativa
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 max-w-4xl">
            Emprender en Cuba es un reto.<br />
            <span className="text-[#f3ac20] gold-gradient-text">Con nosotros, una estrategia.</span>
          </h1>

          <p className="text-lg text-[#d6c4ad] mb-10 max-w-2xl leading-relaxed">
            Su departamento administrativo tercerizado. Proveemos soluciones contables, legales, y operativas diseñadas para sortear la complejidad del entorno cubano con precisión institucional.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={openDiagnosticModal}
              className="bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] font-semibold px-8 py-4 rounded text-sm uppercase tracking-wider shadow-lg hover:shadow-[#f3ac20]/20 transition-all flex items-center gap-2"
            >
              <span>Agenda tu diagnóstico gratuito</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="border border-[#BA8F31] text-[#e3e3df] hover:bg-[#121716] font-semibold px-8 py-4 rounded text-sm uppercase tracking-wider transition-colors"
            >
              Explorar Servicios
            </button>
          </div>
        </section>

        {/* Services Quick Grid */}
        <section id="servicios" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#BA8F31]/20">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f3ac20]">Nuestras Capacidades</span>
              <h2 className="font-serif text-3xl font-medium text-[#e3e3df] mt-1">Servicios Clave</h2>
            </div>
            <button
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="text-[#ffcd7f] hover:text-[#ffdeae] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 mt-4 md:mt-0"
            >
              Ver desglose completo de servicios
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded hover:border-[#BA8F31] transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded bg-[#1e201e] border border-[#BA8F31]/30 flex items-center justify-center text-[#ffcd7f] mb-4 group-hover:border-[#f3ac20]">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3e3df] mb-2 group-hover:text-[#ffcd7f]">
                Contable y legal
              </h3>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Estructuración financiera, contabilidad Mypime y cumplimiento normativo tributario.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded hover:border-[#BA8F31] transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded bg-[#1e201e] border border-[#BA8F31]/30 flex items-center justify-center text-[#ffcd7f] mb-4 group-hover:border-[#f3ac20]">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3e3df] mb-2 group-hover:text-[#ffcd7f]">
                Impresión
              </h3>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Soluciones gráficas de alta fidelidad, papelería ejecutiva y material corporativo.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded hover:border-[#BA8F31] transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded bg-[#1e201e] border border-[#BA8F31]/30 flex items-center justify-center text-[#ffcd7f] mb-4 group-hover:border-[#f3ac20]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3e3df] mb-2 group-hover:text-[#ffcd7f]">
                Eventos
              </h3>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Producción y logística integral para encuentros, cumbres empresariales y juntas.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('servicios-desktop', 'push')}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded hover:border-[#BA8F31] transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded bg-[#1e201e] border border-[#BA8F31]/30 flex items-center justify-center text-[#ffcd7f] mb-4 group-hover:border-[#f3ac20]">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3e3df] mb-2 group-hover:text-[#ffcd7f]">
                Trámites
              </h3>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Gestión ágil de documentación oficial, permisos y registros gubernamentales.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology / How We Work */}
        <section className="mb-24 bg-[#121716]/60 border border-[#BA8F31]/20 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl font-medium text-[#e3e3df] mb-8 pb-4 border-b border-[#BA8F31]/20">
            Metodología Institucional
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-2 border-[#f3ac20] pl-6 space-y-2">
              <span className="text-2xl font-serif text-[#f3ac20]/60">01</span>
              <h3 className="font-serif text-xl text-[#e3e3df]">Diagnóstico Integral</h3>
              <p className="text-sm text-[#d6c4ad]">
                Evaluación técnica de la estructura tributaria, mercantil y operativa de su empresa.
              </p>
            </div>

            <div className="border-l-2 border-[#f3ac20] pl-6 space-y-2">
              <span className="text-2xl font-serif text-[#f3ac20]/60">02</span>
              <h3 className="font-serif text-xl text-[#e3e3df]">Estrategia a Medida</h3>
              <p className="text-sm text-[#d6c4ad]">
                Diseño de hojas de ruta de optimización fiscal y arquitectura contable personalizada.
              </p>
            </div>

            <div className="border-l-2 border-[#f3ac20] pl-6 space-y-2">
              <span className="text-2xl font-serif text-[#f3ac20]/60">03</span>
              <h3 className="font-serif text-xl text-[#e3e3df]">Gestión Continua</h3>
              <p className="text-sm text-[#d6c4ad]">
                Ejecución delegada y monitoreo permanente para garantizar tranquilidad absoluta.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* footer element containing 'Servicios' link as per xpath: //footer//a[contains(text(), 'Servicios')] */}
      <footer className="w-full py-16 px-10 md:px-20 bg-[#0d0f0d] border-t border-[#f0bf5d]/15 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="font-serif text-3xl font-semibold text-[#ffcd7f]">
              Vela Nus
            </span>
            <p className="text-sm text-[#d6c4ad] leading-relaxed">
              Consultoría corporativa y gestión administrativa para empresas en Cuba.
            </p>
            <p className="text-xs text-[#9e8e7a]">
              © 2024 Vela Nus. Todos los derechos reservados.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest text-[#ffcd7f] font-semibold mb-1">
                Explorar
              </h4>
              {/* Mandatory xpath match element: //footer//a[contains(text(), 'Servicios')] */}
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('servicios-desktop', 'push');
                }}
                className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors cursor-pointer"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors cursor-pointer"
              >
                Nosotros
              </a>
              <a
                href="#casos"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors cursor-pointer"
              >
                Casos
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest text-[#ffcd7f] font-semibold mb-1">
                Contacto
              </h4>
              <a
                href="https://wa.me/5350000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:contacto@velanus.cu"
                className="text-sm text-[#d6c4ad] hover:text-[#ffdf97] transition-colors"
              >
                Email
              </a>
              <span className="text-sm text-[#d6c4ad]">
                La Habana, Cuba
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
