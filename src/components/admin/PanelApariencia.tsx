import React from 'react';
import { ScreenId } from '../../types';
import {
  DEFAULT_HOME_VARIANT,
  HOME_VARIANTS,
  setStoredHomeVariant,
  storedHomeVariant,
} from '../../theme';
import { useVarianteHome } from '../home/useVariante';
import { Boton } from './piezas';

interface PanelAparienciaProps {
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
}

/**
 * Elige qué dirección visual sirve el sitio.
 *
 * LÍMITE IMPORTANTE: el frontend es estático (GitHub Pages) y esta elección se
 * guarda en el localStorage de ESTE navegador. Para cambiar lo que ven todos
 * los visitantes hay que cambiar `DEFAULT_HOME_VARIANT` en `src/theme.ts` y
 * desplegar. Se dice en pantalla para que nadie crea que ha publicado algo.
 */
export const PanelApariencia: React.FC<PanelAparienciaProps> = ({ onNavigate }) => {
  const activa = useVarianteHome();
  const guardada = storedHomeVariant();

  const forzadaPorUrl =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('tema');

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-[26px] font-bold">Apariencia</h2>
        <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
          El sitio está implementado en las tres direcciones que entregó el diseño. Aquí
          se elige cuál se pinta, en la home y en las páginas interiores. El modo azul es
          una <strong>propuesta</strong>: ese azul no está en el manual de identidad, sale
          del fondo del logo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <span className={`h-24 border ${variante.muestra} flex items-end p-3`} aria-hidden>
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
        <h3 className="text-[20px] font-bold">Qué significa esto exactamente</h3>
        <p className="text-base leading-relaxed text-[#4A4A4A]">
          El frontend es estático y no tiene servidor donde guardar la elección: lo que
          marque aquí vale <strong>solo para este navegador</strong>. Sirve para enseñar
          una u otra dirección al cliente, no para publicarla.
        </p>
        <p className="text-base leading-relaxed text-[#4A4A4A]">
          Para que <strong>todos los visitantes</strong> vean una variante, hay que cambiar
          esta línea en <code className="font-mono text-[15px]">src/theme.ts</code> y
          desplegar:
        </p>
        <code className="font-mono text-[15px] bg-[#000000] text-[#F9A600] px-4 py-3 overflow-x-auto">
          export const DEFAULT_HOME_VARIANT: HomeVariant = '{activa}';
        </code>
        <p className="text-base leading-relaxed text-[#4A4A4A]">
          También puede enseñar una variante añadiendo{' '}
          <code className="font-mono text-[15px]">?tema=azul</code>,{' '}
          <code className="font-mono text-[15px]">?tema=claro</code> u{' '}
          <code className="font-mono text-[15px]">?tema=oscuro</code> a cualquier URL.
        </p>
      </section>

      <section className="flex flex-col gap-4 border-t border-[#E4E4E4] pt-8">
        <h3 className="text-[20px] font-bold">Estado</h3>
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
          <Boton
            tono="secundario"
            onClick={() => setStoredHomeVariant(null)}
            disabled={!guardada}
          >
            Olvidar mi elección
          </Boton>
          <Boton onClick={() => onNavigate('home-desktop', 'push_back')}>
            Ver la home de escritorio
          </Boton>
          <Boton tono="secundario" onClick={() => onNavigate('home-movil', 'push_back')}>
            Ver la home móvil
          </Boton>
        </div>
      </section>
    </div>
  );
};
