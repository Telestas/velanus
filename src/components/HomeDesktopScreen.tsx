import React from 'react';
import { NavigationProps } from '../types';
import { HomeClaroDesktop } from './home/HomeClaroDesktop';
import { HomeOscuroDesktop } from './home/HomeOscuroDesktop';
import { useVarianteHome } from './home/useVariante';

/**
 * Home de escritorio.
 *
 * El diseño entregó tres direcciones completas para esta pantalla y las tres
 * están implementadas; aquí solo se elige cuál se pinta. La elección vive en
 * `src/theme.ts` (por defecto en código, con override por navegador desde
 * /admin y por `?tema=` en la URL).
 *
 * `azul` y `oscuro` son la misma maqueta con distinta paleta, así que las
 * pinta el mismo componente: el color lo pone `paletaDe(variante)`.
 */
export const HomeDesktopScreen: React.FC<NavigationProps> = (props) =>
  useVarianteHome() === 'claro' ? (
    <HomeClaroDesktop {...props} />
  ) : (
    <HomeOscuroDesktop {...props} />
  );
