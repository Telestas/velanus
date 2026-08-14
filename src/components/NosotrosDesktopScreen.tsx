import React from 'react';
import { NavigationProps } from '../types';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import {
  ShieldCheck, Scale, Lock, Handshake, Target, Compass, MessageSquare, ArrowRight,
} from 'lucide-react';

/**
 * BORRADOR. Los textos, las cifras y los perfiles del equipo son propuestas de
 * ejemplo y deben validarse con el cliente antes de publicar.
 */

const VALORES = [
  {
    icon: Lock,
    title: 'Confidencialidad',
    description:
      'Cada expediente se trata bajo reserva absoluta. La información financiera y societaria de nuestros clientes no sale del círculo estrictamente necesario para operar.',
  },
  {
    icon: Scale,
    title: 'Rigor normativo',
    description:
      'Trabajamos dentro del marco legal vigente para Mypimes y sociedades. Ni atajos ni interpretaciones convenientes: estructuras que resisten una inspección.',
  },
  {
    icon: Handshake,
    title: 'Acompañamiento real',
    description:
      'No entregamos un informe y desaparecemos. Nos quedamos en la ejecución, que es donde los procesos administrativos se atascan de verdad.',
  },
  {
    icon: Target,
    title: 'Resultados medibles',
    description:
      'Cada intervención arranca con una línea base y se cierra con indicadores. Si no podemos medir la mejora, no la presentamos como tal.',
  },
];

const PILARES = [
  {
    numero: '01',
    title: 'Origen',
    text: 'Vela Nus nace de la experiencia directa de gestionar empresas en Cuba: entender la norma es una cosa y hacerla avanzar por las ventanillas correctas es otra muy distinta.',
  },
  {
    numero: '02',
    title: 'Enfoque',
    text: 'Operamos como el departamento administrativo que la mayoría de las Mypimes no puede sostener internamente, con el coste de un servicio externo y la implicación de un equipo propio.',
  },
  {
    numero: '03',
    title: 'Compromiso',
    text: 'Nuestro objetivo no es cerrar un encargo puntual, sino que la dirección de la empresa recupere el tiempo que hoy dedica a la burocracia y lo devuelva al negocio.',
  },
];

export const NosotrosDesktopScreen: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  openDiagnosticModal,
}) => (
  <div className="min-h-screen bg-[#121412] text-[#e3e3df] flex flex-col font-sans">
    <SiteHeader
      currentScreen={currentScreen}
      onNavigate={onNavigate}
      openDiagnosticModal={openDiagnosticModal}
      showBack
    />

    <main className="flex-grow pt-16 pb-24 px-10 md:px-20 max-w-7xl mx-auto w-full">
      {/* Page Hero */}
      <section className="mb-20">
        <div className="max-w-4xl border-l-2 border-[#BA8F31]/40 pl-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#f3ac20] font-semibold">
            Quiénes Somos
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#e3e3df] font-semibold">
            Estructura donde otros<br />ven improvisación
          </h1>
          <p className="text-lg text-[#d6c4ad] max-w-2xl leading-relaxed">
            Somos una firma de consultoría corporativa y gestión administrativa
            enfocada en el sector privado cubano. Traducimos un entorno normativo
            exigente en procesos claros, ejecutables y sostenibles.
          </p>
        </div>
      </section>

      {/* Relato / Pilares */}
      <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-12 h-12 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#e3e3df]">
            Una firma construida desde el terreno
          </h2>
          <p className="text-sm text-[#d6c4ad] leading-relaxed">
            La mayoría de las empresas privadas en Cuba no fracasan por falta de
            mercado, sino por la carga administrativa que consume a su dirección.
            Vela Nus existe para absorber esa carga.
          </p>
          <p className="text-sm text-[#d6c4ad] leading-relaxed">
            Combinamos criterio contable, legal y operativo en un único
            interlocutor, de modo que el empresario deje de coordinar cinco
            proveedores distintos para resolver un mismo problema.
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          {PILARES.map(({ numero, title, text }) => (
            <div
              key={numero}
              className="bg-[#1a1c1a] border border-[#BA8F31]/25 rounded-lg p-8 hover:border-[#BA8F31] transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-2xl font-serif text-[#f3ac20]/60">{numero}</span>
                <h3 className="font-serif text-xl text-[#e3e3df]">{title}</h3>
              </div>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#BA8F31]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f3ac20]">
              Cómo trabajamos
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#e3e3df] mt-1">
              Principios innegociables
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALORES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded hover:border-[#BA8F31] transition-all group"
            >
              <div className="w-12 h-12 rounded bg-[#1e201e] border border-[#BA8F31]/30 flex items-center justify-center text-[#ffcd7f] mb-4 group-hover:border-[#f3ac20]">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3e3df] mb-2 group-hover:text-[#ffcd7f]">
                {title}
              </h3>
              <p className="text-sm text-[#d6c4ad] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cifras */}
      <section className="mb-24 bg-[#121716]/60 border border-[#BA8F31]/20 p-8 md:p-12 rounded-lg">
        <h2 className="font-serif text-3xl font-medium text-[#e3e3df] mb-8 pb-4 border-b border-[#BA8F31]/20 flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-[#f3ac20]" />
          La firma en cifras
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { valor: '+60', label: 'Empresas acompañadas', nota: 'Mypimes y sociedades en cartera activa.' },
            { valor: '4', label: 'Áreas de práctica', nota: 'Contable-legal, impresión, eventos y trámites.' },
            { valor: '100%', label: 'Expedientes bajo reserva', nota: 'Confidencialidad contractual sin excepciones.' },
          ].map(({ valor, label, nota }) => (
            <div key={label} className="border-l-2 border-[#f3ac20] pl-6 space-y-2">
              <span className="block font-serif text-4xl text-[#ffcd7f]">{valor}</span>
              <h3 className="font-serif text-lg text-[#e3e3df]">{label}</h3>
              <p className="text-sm text-[#d6c4ad]">{nota}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9e8e7a] mt-8 pt-6 border-t border-[#BA8F31]/15">
          Cifras de ejemplo pendientes de confirmar con la dirección antes de publicar.
        </p>
      </section>

      {/* CTA */}
      <section>
        <div className="bg-[#292a28] border border-[#BA8F31]/40 p-12 md:p-16 rounded-lg text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f3ac20] to-transparent"></div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#e3e3df] font-semibold max-w-2xl mx-auto">
            Conozca al equipo que llevará su expediente
          </h2>
          <p className="text-sm md:text-base text-[#d6c4ad] max-w-xl mx-auto leading-relaxed">
            Una primera conversación basta para saber si podemos ayudarle. Sin
            compromiso y con total confidencialidad.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openDiagnosticModal}
              className="bg-[#f3ac20] text-[#432c00] hover:bg-[#ffdeae] font-semibold px-8 py-4 rounded text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              Agendar diagnóstico
            </button>
            <button
              onClick={() => onNavigate('casos-desktop', 'push')}
              className="border border-[#BA8F31] text-[#e3e3df] hover:bg-[#1a1c1a] font-semibold px-8 py-4 rounded text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              Ver casos de éxito
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter currentScreen={currentScreen} onNavigate={onNavigate} />
  </div>
);
