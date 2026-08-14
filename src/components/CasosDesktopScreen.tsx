import React from 'react';
import { NavigationProps } from '../types';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import {
  Landmark, Printer, Calendar, FileText, User, MessageSquare, ArrowRight, Quote,
} from 'lucide-react';

/**
 * BORRADOR. Los casos, las métricas y los testimonios son ilustrativos: hay que
 * sustituirlos por expedientes reales y contar con la autorización del cliente
 * antes de publicar nombres o cifras.
 */

interface Caso {
  id: string;
  sector: string;
  icon: typeof Landmark;
  title: string;
  reto: string;
  intervencion: string;
  resultado: string;
  metrica: { valor: string; label: string };
}

const CASOS: Caso[] = [
  {
    id: 'gastronomia',
    sector: 'Gastronomía',
    icon: Landmark,
    title: 'De contabilidad improvisada a cierre mensual en fecha',
    reto: 'Una Mypime de restauración con tres puntos de venta llevaba las cuentas en hojas sueltas y descubría los desfases con meses de retraso.',
    intervencion: 'Implantamos un plan contable único, calendario fiscal y un cierre mensual con revisión asistida por nuestro equipo.',
    resultado: 'La dirección pasó a decidir sobre datos del mes en curso y eliminó los recargos por presentación fuera de plazo.',
    metrica: { valor: '0', label: 'Recargos tributarios en 12 meses' },
  },
  {
    id: 'manufactura',
    sector: 'Manufactura ligera',
    icon: FileText,
    title: 'Licencias desbloqueadas para abrir una segunda nave',
    reto: 'Un taller de confección tenía la ampliación parada por un expediente incompleto que llevaba meses circulando entre organismos.',
    intervencion: 'Reconstruimos el expediente, corregimos la documentación registral y asumimos la interlocución con cada organismo.',
    resultado: 'La ampliación se autorizó y la empresa incorporó una segunda línea de producción dentro del mismo ejercicio.',
    metrica: { valor: '11 sem.', label: 'De expediente parado a resolución' },
  },
  {
    id: 'servicios',
    sector: 'Servicios profesionales',
    icon: Printer,
    title: 'Identidad corporativa unificada para una firma en expansión',
    reto: 'Una consultora local presentaba propuestas con materiales dispares que restaban credibilidad frente a clientes corporativos.',
    intervencion: 'Normalizamos la papelería institucional, los dosieres de propuesta y los materiales de junta con acabados premium.',
    resultado: 'La firma estandarizó su presentación comercial y mejoró la tasa de conversión de sus propuestas formales.',
    metrica: { valor: '+30%', label: 'Propuestas aceptadas' },
  },
  {
    id: 'eventos',
    sector: 'Corporativo',
    icon: Calendar,
    title: 'Junta anual de accionistas ejecutada sin incidencias',
    reto: 'Una empresa mixta necesitaba reunir a su consejo con requisitos de protocolo, confidencialidad y logística poco habituales.',
    intervencion: 'Coordinamos sede, acreditaciones, documentación de junta y soporte en sala durante toda la sesión.',
    resultado: 'La junta se celebró en los tiempos previstos y con la documentación firmada el mismo día.',
    metrica: { valor: '1 día', label: 'Junta cerrada y documentada' },
  },
];

const TESTIMONIOS = [
  {
    id: 't1',
    quote:
      'La estructura contable que implementaron nos dio la claridad necesaria para expandirnos con seguridad.',
    author: 'Carlos M.',
    sector: 'Sector Gastronómico',
  },
  {
    id: 't2',
    quote:
      'Dejamos de perder semanas en ventanillas. Ellos se ocupan del expediente y nosotros del negocio.',
    author: 'Dianelys R.',
    sector: 'Manufactura Ligera',
  },
  {
    id: 't3',
    quote:
      'Llegan con criterio propio y dicen lo que no queremos oír cuando hace falta. Eso vale más que un informe.',
    author: 'Ernesto V.',
    sector: 'Servicios Profesionales',
  },
];

export const CasosDesktopScreen: React.FC<NavigationProps> = ({
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
            Expedientes Representativos
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#e3e3df] font-semibold">
            Casos de éxito
          </h1>
          <p className="text-lg text-[#d6c4ad] max-w-2xl leading-relaxed">
            Una selección de intervenciones reales, anonimizadas por acuerdo de
            confidencialidad. Cada una sigue la misma secuencia: diagnóstico,
            estructura y ejecución sostenida.
          </p>
        </div>
      </section>

      {/* Casos */}
      <div className="flex flex-col gap-8 mb-24">
        {CASOS.map(({ id, sector, icon: Icon, title, reto, intervencion, resultado, metrica }) => (
          <article
            key={id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#1a1c1a] border border-[#BA8F31]/25 rounded-lg p-8 md:p-12 hover:border-[#BA8F31] transition-colors"
          >
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="w-12 h-12 flex items-center justify-center border border-[#BA8F31]/40 rounded-full bg-[#1e201e] text-[#ffcd7f]">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#f3ac20] font-semibold">
                {sector}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#e3e3df] leading-snug">
                {title}
              </h2>

              <div className="mt-auto pt-6 border-t border-[#BA8F31]/20">
                <span className="block font-serif text-4xl text-[#ffcd7f]">
                  {metrica.valor}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#d6c4ad]">
                  {metrica.label}
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { etiqueta: 'El reto', texto: reto },
                { etiqueta: 'La intervención', texto: intervencion },
                { etiqueta: 'El resultado', texto: resultado },
              ].map(({ etiqueta, texto }) => (
                <div key={etiqueta} className="border-l-2 border-[#f3ac20]/50 pl-5 space-y-2">
                  <h3 className="text-xs uppercase tracking-widest text-[#ffcd7f] font-semibold">
                    {etiqueta}
                  </h3>
                  <p className="text-sm text-[#d6c4ad] leading-relaxed">{texto}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Testimonios */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#BA8F31]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f3ac20]">
              En palabras de nuestros clientes
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#e3e3df] mt-1">
              Testimonios
            </h2>
          </div>
          <button
            onClick={() => onNavigate('servicios-desktop', 'push_back')}
            className="text-[#ffcd7f] hover:text-[#ffdeae] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 mt-4 md:mt-0"
          >
            Ver servicios
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIOS.map(({ id, quote, author, sector }) => (
            <figure
              key={id}
              className="bg-[#121716] border border-[#BA8F31]/20 p-6 rounded flex flex-col gap-4 hover:border-[#BA8F31] transition-colors"
            >
              <Quote className="w-6 h-6 text-[#f3ac20]/60" />
              <blockquote className="text-sm text-[#d6c4ad] italic leading-relaxed flex-grow">
                “{quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-[#BA8F31]/15">
                <div className="w-9 h-9 rounded-full bg-[#292a28] border border-[#BA8F31]/30 flex items-center justify-center text-[#d6c4ad]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#e3e3df]">{author}</p>
                  <p className="text-xs text-[#f3ac20]">{sector}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-xs text-[#9e8e7a] mt-8">
          Casos y testimonios ilustrativos: sustituir por expedientes reales con
          autorización expresa del cliente antes de publicar.
        </p>
      </section>

      {/* CTA */}
      <section>
        <div className="bg-[#292a28] border border-[#BA8F31]/40 p-12 md:p-16 rounded-lg text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f3ac20] to-transparent"></div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#e3e3df] font-semibold max-w-2xl mx-auto">
            ¿Su caso se parece a alguno de estos?
          </h2>
          <p className="text-sm md:text-base text-[#d6c4ad] max-w-xl mx-auto leading-relaxed">
            Cuéntenos su situación en una conversación confidencial y le diremos
            con franqueza si podemos resolverla.
          </p>
          <div className="pt-2">
            <button
              onClick={openDiagnosticModal}
              className="bg-[#f3ac20] text-[#432c00] hover:bg-[#ffdeae] font-semibold px-8 py-4 rounded text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              Agendar diagnóstico
            </button>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter currentScreen={currentScreen} onNavigate={onNavigate} />
  </div>
);
