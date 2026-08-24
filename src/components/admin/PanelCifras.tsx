import React, { useEffect, useState } from 'react';
import { Cifras, CIFRAS_VACIAS, guardarCifras, leerCifras } from '../../data/cifras';
import { anosOperando, INICIO_OPERACIONES } from '../../config';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton, campo, etiqueta } from './piezas';

interface CampoCifra {
  clave: keyof Cifras;
  titulo: string;
  ayuda: string;
}

const CAMPOS: CampoCifra[] = [
  {
    clave: 'entidades',
    titulo: 'Entidades constituidas',
    ayuda: 'Sale en la home y en Nosotros.',
  },
  { clave: 'clientes', titulo: 'Clientes atendidos', ayuda: 'Sale en la home.' },
  {
    clave: 'paises',
    titulo: 'Países de origen de clientes',
    ayuda: 'Sale en la home.',
  },
  {
    clave: 'profesionales',
    titulo: 'Profesionales en el equipo',
    ayuda: 'Sale en Nosotros.',
  },
];

/**
 * Cifras de escaparate.
 *
 * Son texto libre a propósito: aquí caben tanto «14» como «+40» o «más de 30»,
 * y en inglés se ven igual. Lo que se deje en blanco se pinta como pendiente en
 * el sitio, no como un cero.
 */
export const PanelCifras: React.FC = () => {
  const [cifras, setCifras] = useState<Cifras>(CIFRAS_VACIAS);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        setCifras(await leerCifras());
      } catch (fallo) {
        setError(mensajeDeError(fallo));
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setGuardado(false);
    try {
      await guardarCifras(cifras);
      setGuardado(true);
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <p className="text-base text-[#4A4A4A]">Cargando…</p>;

  return (
    <form onSubmit={guardar} className="flex flex-col gap-6 max-w-[640px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-[26px] font-bold">Cifras del sitio</h2>
        <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
          Se publican al guardar, sin desplegar nada. Lo que quede en blanco aparece
          marcado como pendiente en el sitio.
        </p>
      </div>

      {error && <Aviso>{error}</Aviso>}

      {/* Los años no se editan: se calculan desde la fecha de inicio. */}
      <div className="border border-[#E4E4E4] bg-[#F1F1F0] px-6 py-5 flex flex-col gap-1">
        <span className="text-sm text-[#767676]">Años operando en Cuba</span>
        <span className="text-[26px] font-bold">{anosOperando()}</span>
        <span className="text-sm text-[#4A4A4A]">
          Se calcula solo desde el{' '}
          {INICIO_OPERACIONES.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          . Sube cada aniversario sin que haya que tocar nada; para cambiar la fecha,
          <code className="font-mono text-[15px]"> src/config.ts</code>.
        </span>
      </div>

      {CAMPOS.map(({ clave, titulo, ayuda }) => (
        <div key={clave} className="flex flex-col gap-[7px]">
          <label className={etiqueta} htmlFor={`cifra-${clave}`}>
            {titulo}
          </label>
          <input
            id={`cifra-${clave}`}
            className={campo}
            value={cifras[clave]}
            placeholder="Ej. 14, +40, más de 30…"
            onChange={(e) => {
              setCifras({ ...cifras, [clave]: e.target.value });
              setGuardado(false);
            }}
          />
          <span className="text-sm text-[#767676]">{ayuda}</span>
        </div>
      ))}

      <div className="flex items-center gap-4 flex-wrap">
        <Boton type="submit" disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar cifras'}
        </Boton>
        {guardado && (
          <span className="text-[15px] text-[#4A4A4A]">
            Guardado. Ya se ven en el sitio (recargue para comprobarlo).
          </span>
        )}
      </div>
    </form>
  );
};
