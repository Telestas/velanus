import { useEffect, useState } from 'react';
import { HomeVariant, onHomeVariantChange, resolveHomeVariant } from '../../theme';

/**
 * Variante visual que toca pintar, reactiva: si se cambia desde /admin (aquí o
 * en otra pestaña), las pantallas abiertas se repintan solas.
 */
export const useVarianteHome = (): HomeVariant => {
  const [variante, setVariante] = useState<HomeVariant>(resolveHomeVariant);

  useEffect(
    () => onHomeVariantChange(() => setVariante(resolveHomeVariant())),
    [],
  );

  return variante;
};
