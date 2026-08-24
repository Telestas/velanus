import React from 'react';

/** Controles compartidos del panel. Estilo sobrio: es una herramienta, no una web. */

export const campo =
  'border border-[#B9B7B2] bg-white text-[#000000] px-3.5 py-3 text-base outline-none focus:border-[#000000] transition-colors w-full';

export const etiqueta = 'text-sm font-bold text-[#000000]';

interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tono?: 'principal' | 'secundario' | 'peligro';
}

export const Boton: React.FC<BotonProps> = ({
  tono = 'principal',
  className = '',
  ...props
}) => {
  const estilos = {
    principal: 'bg-[#000000] text-[#F9A600] hover:bg-[#333333]',
    secundario: 'border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FAFAFA]',
    peligro: 'border border-[#8A5800] text-[#8A5800] hover:bg-[#8A5800] hover:text-[#FAFAFA]',
  }[tono];

  return (
    <button
      {...props}
      className={`px-5 py-2.5 text-[15px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${estilos} ${className}`}
    />
  );
};

export const Aviso: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] text-[#8A5800] border-l-4 border-[#F9A600] pl-4 py-2">
    {children}
  </p>
);
