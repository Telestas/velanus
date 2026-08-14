import React from 'react';
import { NavigationProps } from '../types';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { Landmark, Printer, Calendar, FileText, MessageSquare } from 'lucide-react';

export const ServiciosDesktopScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => {
  return (
    <div className="min-h-screen bg-[#121412] text-[#e3e3df] flex flex-col font-sans">
      <SiteHeader
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        openDiagnosticModal={openDiagnosticModal}
        showBack
      />

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-24 px-10 md:px-20 max-w-7xl mx-auto w-full">
        {/* Page Hero */}
        <section className="mb-20">
          <div className="max-w-4xl border-l-2 border-[#BA8F31]/40 pl-8 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#f3ac20] font-semibold">
              Portafolio Institucional
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#e3e3df] font-semibold">
              Nuestros Servicios
            </h1>
            <p className="text-lg text-[#d6c4ad] max-w-2xl leading-relaxed">
              Somos el aliado integral para emprendedores y corporaciones. Diseñamos estructuras robustas y ejecutamos con precisión metódica para garantizar la estabilidad y el crecimiento de su legado empresarial.
            </p>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <div className="flex flex-col gap-28">
          
          {/* Service 1: Contable y legal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 h-[420px] bg-[#0d0f0d] relative group overflow-hidden border border-[#BA8F31]/30 rounded-lg">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUJfxSBSdqHgJj74zKibiWX4ZFz_Lh_6-O9ewP9-JpG1XX3q-vIpFtn9rKDYqhDmypO1uRNAT6BlHkEPpoTQSXLGw5JkELC5kD8aPC3m7tS8Cdi8Y5cjOuIDdgYWY43m1K9zo6XfrGc6Fbyv7OEy5_2CKW0YHswMyEDGN4qW0W3Bolt6ARfK4CI5FFKkwtuKw_WklnmAwuvRwkd4-zepsG4slHXDuWkNcq89ruagAzBsJPRYm11xCj" 
                alt="Escritorio corporativo contable y legal"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121412] via-transparent to-transparent"></div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="w-12 h-12 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
                <Landmark className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#e3e3df]">
                Contable y legal
              </h2>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Auditoría financiera, estructuración patrimonial y cumplimiento tributario. Garantizamos la solidez institucional de su empresa mediante estrategias fiscales rigurosas y blindaje legal corporativo, operando bajo los más altos estándares de confidencialidad.
              </p>
              <div className="h-px w-full bg-[#BA8F31]/20 my-2"></div>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Estructuración Financiera
                </li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Cumplimiento Normativo Mypime
                </li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Optimización Fiscal Tributaria
                </li>
              </ul>
            </div>
          </div>

          {/* Service 2: Impresión */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-5 lg:order-1 order-2">
              <div className="w-12 h-12 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
                <Printer className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-[#e3e3df]">
                Impresión Corporativa
              </h2>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">
                Soluciones gráficas corporativas de alta fidelidad. Desde papelería ejecutiva hasta materiales de presentación institucional, aseguramos que la identidad visual de su firma proyecte autoridad, precisión y un acabado impecable.
              </p>
              <div className="h-px w-full bg-[#BA8F31]/20 my-2"></div>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Papelería Institucional de Lujo
                </li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Materiales de Junta & Informes
                </li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#d6c4ad]">
                  <span className="w-2 h-2 bg-[#f3ac20] rounded-full"></span>
                  Acabados Premium & Grabados
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 h-[420px] bg-[#0d0f0d] relative group overflow-hidden border border-[#BA8F31]/30 rounded-lg lg:order-2 order-1">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDCOGL4SZPvGw8XZ0Kpnoc2GevujdOENQZwyBk417MXLpOVZt8f3fTH9u5e4uWqQ1q4GEyllY7AZIKFG0zoNHtJRjxnna8m9Vr0YBHWl8oYnM8PfqtDSZ13yv0fnITIEoj_H9vuavxoRM-zm5GiVtwaa_VCP1ATmGCbYKksoVhJMK8RvjIbZXMOAoXNyW6TyzWaqA4JYOvAHrQtWxlI-RjOTD7AYaFHAxjJs8AuXFyDoqG9abJNZmn" 
                alt="Maquinaria de impresión offset corporativa"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121412]/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Bento Grid for Eventos & Trámites */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Service 3: Eventos Corporativos */}
            <div className="lg:col-span-7 bg-[#1a1c1a] border border-[#BA8F31]/30 p-8 md:p-12 rounded-lg flex flex-col justify-end relative overflow-hidden group min-h-[420px]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG7kgQlXrfwa0MHkLr5UhbRs29EOcC6LbGP4sdsZFCTnyfi2jMQNE2rEcM2ZtFZl48rE4IvFGh9sZWVs7Sr0b2zZL_-gJ9_wLvgpqduHKtS8iDE222pkNYg1CCV2_9jfOVJbzJC0SAI9ypdQL7TwvmerqYU1HxhdeYdCLCkQUCiNqCzfqH4hJ4qs0Q1R4T_MCDatJYJ3KsIaulKg2EiCqrwip7LW9LzsMkQ5ncZZ_cpggOzeUbXaTg" 
                alt="Auditorio para eventos corporativos"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0d] via-[#0d0f0d]/80 to-transparent"></div>
              
              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="w-10 h-10 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-[#e3e3df]">
                  Eventos Corporativos
                </h2>
                <p className="text-sm text-[#d6c4ad] leading-relaxed">
                  Logística y producción impecable para reuniones de alto nivel, juntas directivas y cumbres ejecutivas. Nos encargamos de cada detalle espacial y protocolario para garantizar un entorno propicio para los negocios.
                </p>
              </div>
            </div>

            {/* Service 4: Trámites Oficiales */}
            <div className="lg:col-span-5 bg-[#1a1c1a] border border-[#BA8F31]/30 p-8 md:p-12 rounded-lg flex flex-col justify-between group hover:border-[#BA8F31] transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-[#e3e3df]">
                  Trámites Oficiales
                </h2>
                <p className="text-sm text-[#d6c4ad] leading-relaxed">
                  Gestión ágil, discreta y efectiva de documentación gubernamental y registral. Desbloqueamos procesos burocráticos para que el liderazgo de su empresa se concentre exclusivamente en la estrategia y rentabilidad.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#BA8F31]/20">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjuz711L8EghnRqo68MxnYFyHe-LaKJE4p2Luw-01ACOdXYTfWu6kQE8ZwuySQISc686xGolgJokaHb3TSEemH_PMPO9IrVbJUKmPmN3DjPUGAbeklvdR0n2cpNrtJD1-FccyrqUtQN-ToSeS5glZM_W_f3g9k0yT3TFiiMwi-T86WicnNd60AOjz09KdebEsATla0BRHToI0BFrVNSWsTd-7nMVcUP3aucISK408Us-703CYQLCOE" 
                  alt="Documentos oficiales y pluma ejecutiva"
                  className="w-full h-36 object-cover rounded opacity-60 group-hover:opacity-80 transition-opacity filter grayscale"
                />
              </div>
            </div>

          </div>
        </div>

        {/* CTA Banner Section */}
        <section className="mt-28">
          <div className="bg-[#292a28] border border-[#BA8F31]/40 p-12 md:p-16 rounded-lg text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f3ac20] to-transparent"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e3e3df] font-semibold max-w-2xl mx-auto">
              Hablemos de su proyecto
            </h2>
            <p className="text-sm md:text-base text-[#d6c4ad] max-w-xl mx-auto leading-relaxed">
              Inicie una conversación confidencial con nuestros asesores para estructurar la próxima fase de su empresa.
            </p>
            <div className="pt-2">
              <button
                onClick={openDiagnosticModal}
                className="bg-[#f3ac20] text-[#432c00] hover:bg-[#ffdeae] font-semibold px-8 py-4 rounded text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Contactar por WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentScreen={currentScreen} onNavigate={onNavigate} />
    </div>
  );
};
