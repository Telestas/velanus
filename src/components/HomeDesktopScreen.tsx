import React from 'react';
import { NavigationProps } from '../types';
import { HomeClaroDesktop } from './home/HomeClaroDesktop';
import { HomeOscuroDesktop } from './home/HomeOscuroDesktop';
import { useVarianteHome } from './home/useVariante';

/**
 * Home de escritorio.
 *
 * El diseño entregó dos direcciones completas para esta pantalla y ambas están
 * implementadas; aquí solo se elige cuál se pinta. La elección vive en
 * `src/theme.ts` (por defecto en código, con override por navegador desde
 * /admin y por `?tema=` en la URL).
 */
export const HomeDesktopScreen: React.FC<NavigationProps> = (props) =>
  useVarianteHome() === 'claro' ? (
    <HomeClaroDesktop {...props} />
  ) : (
    <HomeOscuroDesktop {...props} />
  );
