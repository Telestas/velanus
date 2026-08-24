import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { useSesion } from '../admin/useSesion';
import { Acceso } from './admin/Acceso';
import { PanelApariencia } from './admin/PanelApariencia';
import { PanelCifras } from './admin/PanelCifras';
import { PanelComentarios } from './admin/PanelComentarios';
import { PanelConsultas } from './admin/PanelConsultas';
import { PanelEntradas } from './admin/PanelEntradas';
import { PanelPreguntas } from './admin/PanelPreguntas';
import { Boton } from './admin/piezas';

/**
 * Panel de administración, en /admin.
 *
 * Está fuera del menú del sitio y detrás de Firebase Auth. Ojo con el modelo de
 * seguridad: esta pantalla solo decide qué se dibuja. Quien manda de verdad son
 * las reglas de `firestore.rules`, que se aplican en el servidor de Google —si
 * alguien se saltara este componente, sus escrituras seguirían rechazándose.
 */
type Pestana =
  | 'apariencia'
  | 'cifras'
  | 'consultas'
  | 'entradas'
  | 'preguntas'
  | 'comentarios';

const PESTANAS: { id: Pestana; label: string }[] = [
  { id: 'consultas', label: 'Consultas' },
  { id: 'entradas', label: 'Artículos' },
  { id: 'preguntas', label: 'Preguntas' },
  { id: 'comentarios', label: 'Comentarios' },
  { id: 'cifras', label: 'Cifras' },
  { id: 'apariencia', label: 'Apariencia' },
];

export const AdminScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { sesion, entrar, salir, enviarRecuperacion } = useSesion();
  // Las consultas son lo primero que hay que mirar: son clientes esperando.
  const [pestana, setPestana] = useState<Pestana>('consultas');

  if (sesion.estado === 'cargando') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#4A4A4A] font-marca flex items-center justify-center">
        <p className="text-base">Comprobando la sesión…</p>
      </div>
    );
  }

  if (sesion.estado === 'sin-sesion') {
    return <Acceso entrar={entrar} enviarRecuperacion={enviarRecuperacion} />;
  }

  if (sesion.estado === 'sin-permisos') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#000000] font-marca flex items-center justify-center px-6">
        <div className="max-w-[420px] flex flex-col gap-5">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[28px] font-bold">Esta cuenta no administra el sitio</h1>
          <p className="text-base leading-relaxed text-[#4A4A4A]">
            La sesión de <strong>{sesion.correo}</strong> es válida, pero no tiene permisos
            de administración.
          </p>
          <Boton tono="secundario" onClick={() => void salir()}>
            Salir
          </Boton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#000000] font-marca">
      <header className="border-b border-[#E4E4E4]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] tracking-[0.2em] uppercase text-[#8A5800]">
              Administración
            </span>
            <h1 className="text-[26px] font-bold">Vela Nus</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-[#767676]">{sesion.correo}</span>
            <Boton tono="secundario" onClick={() => void salir()}>
              Salir
            </Boton>
          </div>
        </div>

        <nav className="max-w-[1100px] mx-auto px-6 md:px-10 flex gap-6 flex-wrap">
          {PESTANAS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPestana(id)}
              aria-current={pestana === id ? 'page' : undefined}
              className={`text-[15px] pb-3 -mb-px border-b-2 transition-colors ${
                pestana === id
                  ? 'border-[#F9A600] text-[#000000] font-bold'
                  : 'border-transparent text-[#4A4A4A] hover:text-[#000000]'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 md:px-10 py-12">
        {pestana === 'consultas' && <PanelConsultas />}
        {pestana === 'entradas' && <PanelEntradas />}
        {pestana === 'preguntas' && <PanelPreguntas />}
        {pestana === 'comentarios' && <PanelComentarios />}
        {pestana === 'cifras' && <PanelCifras />}
        {pestana === 'apariencia' && <PanelApariencia onNavigate={onNavigate} />}
      </main>
    </div>
  );
};
