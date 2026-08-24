import React from 'react';
import { NavigationProps } from '../types';
import { HomeClaroMovil } from './home/HomeClaroMovil';
import { HomeOscuroMovil } from './home/HomeOscuroMovil';
import { useVarianteHome } from './home/useVariante';

/**
 * Home móvil.
 *
 * No es la home de escritorio encogida: es la maqueta de 390 px, con sus
 * propios titulares y textos cortos, dibujada dentro de un marco de teléfono
 * para poder enseñarla desde el escritorio. Igual que la de escritorio, tiene
 * dos direcciones y aquí solo se elige cuál se pinta.
 */
export const HomeMovilScreen: React.FC<NavigationProps> = (props) => {
  const variante = useVarianteHome();

  return (
    <div className="min-h-screen bg-[#DEDEDC] flex flex-col items-center py-4 sm:py-8">
      {/* Marco del teléfono: andamiaje de prototipo, no forma parte del sitio. */}
      <div className="w-full max-w-[420px] bg-[#FAFAFA] border border-[#B9B7B2] sm:rounded-[36px] shadow-2xl overflow-hidden">
        <div className="bg-[#000000] px-6 py-2 flex items-center justify-between text-[11px] text-[#B9B7B2]">
          <span>9:41</span>
          <span className="text-[10px] uppercase tracking-wider text-[#F9A600] font-bold">
            Vela Nus · vista móvil
          </span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F9A600]" />
            <span>5G</span>
          </div>
        </div>

        {variante === 'claro' ? <HomeClaroMovil {...props} /> : <HomeOscuroMovil {...props} />}
      </div>
    </div>
  );
};
