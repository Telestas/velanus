import React from 'react';
import { NavigationProps } from '../types';
import {
  DEFAULT_HOME_VARIANT,
  HOME_VARIANTS,
  setStoredHomeVariant,
  storedHomeVariant,
} from '../theme';
import { useVarianteHome } from './home/useVariante';

/**
 * Página de administración: elige qué dirección visual sirve la home.
 *
 * Deliberadamente fuera del menú del sitio y del mapa de navegación público;
 * se llega por /admin.
 *
 * LÍMITE IMPORTANTE: el sitio es estático (GitHub Pages, sin backend). Lo que
 * se elige aquí se guarda en el localStorage de ESTE navegador. Para cambiar lo
 * que ven todos los visitantes hay que cambiar `DEFAULT_HOME_VARIANT` en
 * `src/theme.ts` y desplegar. La pantalla lo dice en voz alta para que nadie
 * crea que ha publicado un cambio.
 */
export const AdminScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const activa = useVarianteHome();
  const guardada = storedHomeVariant();

  const forzadaPorUrl =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('tema');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#000000] font-marca">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-16 flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
            Administración
          </span>
          <h1 className="text-[38px] leading-tight font-bold">Apariencia de la home</h1>
          <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
            La home está implementada en las dos direcciones que entregó el diseño. Aquí
            se elige cuál se pinta, tanto en escritorio como en móvil.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {HOME_VARIANTS.map((variante) => {
            const esActiva = variante.id === activa;

            return (
              <button
                key={variante.id}
                onClick={() => setStoredHomeVariant(variante.id)}
                className={`text-left p-8 flex flex-col gap-4 border transition-colors ${
                  esActiva
                    ? 'border-[#F9A600] border-2 bg-[#FFFFFF]'
                    : 'border-[#E4E4E4] bg-[#F1F1F0] hover:border-[#B9B7B2]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[26px] font-bold">{variante.label}</span>
                  {esActiva && (
                    <span className="text-xs font-bold uppercase tracking-[0.16em] bg-[#F9A600] text-[#000000] px-2.5 py-1">
                      En uso
                    </span>
                  )}
                </div>
                <span
                  className={`h-24 border ${
                    variante.id === 'oscuro'
                      ? 'bg-[#000000] border-[#000000]'
                      : 'bg-[#FAFAFA] border-[#E4E4E4]'
                  } flex items-end p-3`}
                  aria-hidden
                >
                  <span className="w-16 h-2 bg-[#F9A600] block" />
                </span>
                <span className="text-base leading-relaxed text-[#4A4A4A]">
                  {variante.description}
                </span>
                {variante.id === DEFAULT_HOME_VARIANT && (
                  <span className="text-sm text-[#767676]">
                    Es la variante por defecto del código: la que ve cualquier visitante que
                    no haya elegido otra.
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <section className="border-l-4 border-[#F9A600] bg-[#F1F1F0] px-8 py-7 flex flex-col gap-4">
          <h2 className="text-[22px] font-bold">Qué significa esto exactamente</h2>
          <p className="text-base leading-relaxed text-[#4A4A4A]">
            El sitio es estático y no tiene servidor donde guardar la elección: lo que
            marque aquí vale <strong>solo para este navegador</strong> (se guarda en su
            localStorage). Sirve para enseñar una u otra dirección al cliente, no para
            publicarla.
          </p>
          <p className="text-base leading-relaxed text-[#4A4A4A]">
            Para que <strong>todos los visitantes</strong> vean una variante, hay que
            cambiar esta línea en <code className="font-mono text-[15px]">src/theme.ts</code>{' '}
            y desplegar:
          </p>
          <code className="font-mono text-[15px] bg-[#000000] text-[#F9A600] px-4 py-3 overflow-x-auto">
            export const DEFAULT_HOME_VARIANT: HomeVariant = '{activa}';
          </code>
          <p className="text-base leading-relaxed text-[#4A4A4A]">
            También puede enseñar una variante sin tocar nada añadiendo{' '}
            <code className="font-mono text-[15px]">?tema=claro</code> o{' '}
            <code className="font-mono text-[15px]">?tema=oscuro</code> a cualquier URL del
            sitio.
          </p>
        </section>

        <section className="flex flex-col gap-4 border-t border-[#E4E4E4] pt-8">
          <h2 className="text-[22px] font-bold">Estado</h2>
          <dl className="grid sm:grid-cols-3 gap-6 text-base">
            <div className="flex flex-col gap-1">
              <dt className="text-[#767676]">Pintando ahora</dt>
              <dd className="font-bold">{activa}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[#767676]">Por defecto en código</dt>
              <dd className="font-bold">{DEFAULT_HOME_VARIANT}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[#767676]">Elegida en este navegador</dt>
              <dd className="font-bold">{guardada ?? '—'}</dd>
            </div>
          </dl>

          {forzadaPorUrl && (
            <p className="text-base text-[#8A5800]">
              Ahora mismo manda el parámetro <code className="font-mono">?tema=</code> de la
              URL, por encima de lo elegido en este navegador.
            </p>
          )}

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setStoredHomeVariant(null)}
              disabled={!guardada}
              className="text-base font-bold border border-[#000000] px-6 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#000000] hover:enabled:text-[#FAFAFA] transition-colors"
            >
              Olvidar mi elección
            </button>
            <button
              onClick={() => onNavigate('home-desktop', 'push_back')}
              className="text-base font-bold bg-[#F9A600] text-[#000000] px-6 py-3.5 hover:bg-[#FFC048] transition-colors"
            >
              Ver la home de escritorio
            </button>
            <button
              onClick={() => onNavigate('home-movil', 'push_back')}
              className="text-base font-bold border border-[#000000] px-6 py-3.5 hover:bg-[#000000] hover:text-[#FAFAFA] transition-colors"
            >
              Ver la home móvil
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
