import React, { useEffect, useState } from 'react';
import { contenidoServicios } from '../../content/servicios';
import {
  CLAVES_SERVICIO,
  ClaveServicio,
  guardarPlazos,
  leerPlazosAdmin,
  plazosVacios,
} from '../../data/plazos';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton, campo, etiqueta } from './piezas';

const lineasEs = contenidoServicios('es').lineas;
const lineasEn = contenidoServicios('en').lineas;

export const PanelPlazos: React.FC = () => {
  const [plazos, setPlazos] = useState(plazosVacios);
  const [seccion, setSeccion] = useState<ClaveServicio>('contabilidad');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [falloCarga, setFalloCarga] = useState(false);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    void leerPlazosAdmin().then(setPlazos, (fallo) => {
      setError(mensajeDeError(fallo));
      setFalloCarga(true);
    })
      .finally(() => setCargando(false));
  }, []);

  const cambiar = (indice: number, idioma: 'es' | 'en', valor: string) => {
    setPlazos((actual) => ({
      ...actual,
      [seccion]: actual[seccion].map((plazo, i) =>
        i === indice ? { ...plazo, [idioma]: valor } : plazo),
    }));
    setGuardado(false);
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setGuardado(false);
    try {
      await guardarPlazos(plazos);
      setGuardado(true);
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setGuardando(false);
    }
  };

  const lineaEs = lineasEs.find((linea) => linea.pantalla === `servicios-${seccion}`)!;
  const lineaEn = lineasEn.find((linea) => linea.pantalla === `servicios-${seccion}`)!;

  return (
    <form onSubmit={guardar} className="flex flex-col gap-7 max-w-[850px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[26px] font-bold">Plazos estimados</h2>
        <p className="text-base text-[#4A4A4A]">
          Cada campo reemplaza el plazo pendiente de su servicio. Si deja vacío el inglés,
          se mostrará el texto español en ambos idiomas.
        </p>
      </div>
      {error && <Aviso>{error}</Aviso>}
      {cargando ? <p>Cargando…</p> : falloCarga ? (
        <p>No se pudo leer lo guardado. Recargue el panel antes de editar los plazos.</p>
      ) : (
        <>
          <div className="max-w-[360px] flex flex-col gap-2">
            <label className={etiqueta} htmlFor="plazos-servicio">Servicio</label>
            <select
              id="plazos-servicio"
              className={campo}
              value={seccion}
              onChange={(e) => setSeccion(e.target.value as ClaveServicio)}
            >
              {CLAVES_SERVICIO.map((clave) => (
                <option key={clave} value={clave}>
                  {lineasEs.find((linea) => linea.pantalla === `servicios-${clave}`)?.tituloCorto}
                </option>
              ))}
            </select>
          </div>
          {lineaEs.plazos.map((plazo, i) => (
            <fieldset key={`${seccion}-${i}`} className="border-t border-[#E4E4E4] pt-5 flex flex-col gap-4">
              <legend className="text-[18px] font-bold">{plazo.concepto}</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className={etiqueta} htmlFor={`plazo-es-${i}`}>Español</label>
                  <input
                    id={`plazo-es-${i}`}
                    className={campo}
                    value={plazos[seccion][i]?.es ?? ''}
                    placeholder={plazo.plazo}
                    onChange={(e) => cambiar(i, 'es', e.target.value)}
                    maxLength={120}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={etiqueta} htmlFor={`plazo-en-${i}`}>
                    Inglés · {lineaEn.plazos[i]?.concepto}
                  </label>
                  <input
                    id={`plazo-en-${i}`}
                    className={campo}
                    value={plazos[seccion][i]?.en ?? ''}
                    placeholder={lineaEn.plazos[i]?.plazo}
                    onChange={(e) => cambiar(i, 'en', e.target.value)}
                    maxLength={120}
                  />
                </div>
              </div>
            </fieldset>
          ))}
          <div className="flex items-center gap-4 flex-wrap">
            <Boton type="submit" disabled={guardando}>
              {guardando ? 'Guardando…' : 'Guardar plazos de todos los servicios'}
            </Boton>
            {guardado && <span className="text-sm text-[#4A4A4A]">Guardado. Recargue el sitio para comprobarlo.</span>}
          </div>
        </>
      )}
    </form>
  );
};
