import React, { useEffect, useState } from 'react';
import {
  Consulta,
  borrarConsulta,
  consultas as leerConsultas,
  marcarAtendida,
} from '../../data/consultas';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton } from './piezas';

/**
 * Consultas recibidas por los formularios del sitio.
 *
 * Es la pestaña que hay que mirar todos los días: aquí caen los posibles
 * clientes. Se pueden marcar como atendidas para no perder el hilo, y
 * responder por WhatsApp o correo con un clic.
 */
export const PanelConsultas: React.FC = () => {
  const [lista, setLista] = useState<Consulta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [verAtendidas, setVerAtendidas] = useState(false);

  const recargar = async () => {
    setCargando(true);
    setError('');
    try {
      setLista(await leerConsultas());
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void recargar();
  }, []);

  const alternar = async (consulta: Consulta) => {
    try {
      await marcarAtendida(consulta.id, !consulta.atendida);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  const eliminar = async (consulta: Consulta) => {
    if (!window.confirm(`¿Borrar la consulta de ${consulta.nombre}? No se puede deshacer.`))
      return;
    try {
      await borrarConsulta(consulta.id);
      await recargar();
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  /** wa.me solo admite dígitos; el visitante escribe el número como quiere. */
  const whatsappDelCliente = (telefono: string, nombre: string) =>
    `https://wa.me/${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Hola ${nombre}, le escribimos de Vela Nus por su consulta.`,
    )}`;

  const visibles = verAtendidas ? lista : lista.filter((c) => !c.atendida);
  const pendientes = lista.filter((c) => !c.atendida).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[26px] font-bold">Consultas</h2>
          {pendientes > 0 && (
            <span className="text-sm font-bold bg-[#F9A600] text-[#000000] px-2.5 py-1">
              {pendientes} sin atender
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Boton tono="secundario" onClick={() => setVerAtendidas(!verAtendidas)}>
            {verAtendidas ? 'Ocultar atendidas' : 'Ver todas'}
          </Boton>
          <Boton tono="secundario" onClick={recargar}>
            Actualizar
          </Boton>
        </div>
      </div>

      {error && <Aviso>{error}</Aviso>}
      {cargando && <p className="text-base text-[#4A4A4A]">Cargando…</p>}
      {!cargando && visibles.length === 0 && (
        <p className="text-base text-[#4A4A4A]">
          {lista.length === 0
            ? 'Todavía no ha llegado ninguna consulta.'
            : 'No queda ninguna consulta sin atender.'}
        </p>
      )}

      <div className="flex flex-col">
        {visibles.map((consulta) => (
          <article
            key={consulta.id}
            className="grid lg:grid-cols-[1fr_auto] gap-4 py-6 border-t border-[#E4E4E4] items-start"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-[19px] font-bold">{consulta.nombre}</h3>
                {consulta.atendida && (
                  <span className="text-xs font-bold uppercase tracking-[0.14em] bg-[#E4E4E4] text-[#4A4A4A] px-2 py-1">
                    Atendida
                  </span>
                )}
                <span className="text-sm text-[#767676]">
                  {consulta.creado
                    ? consulta.creado.toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : 'sin fecha'}{' '}
                  · {consulta.origen}
                </span>
              </div>

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-[15px]">
                {consulta.empresa && (
                  <div className="flex gap-2">
                    <dt className="text-[#767676]">Empresa:</dt>
                    <dd>{consulta.empresa}</dd>
                  </div>
                )}
                {consulta.servicio && (
                  <div className="flex gap-2">
                    <dt className="text-[#767676]">Interés:</dt>
                    <dd>{consulta.servicio}</dd>
                  </div>
                )}
                {consulta.pais && (
                  <div className="flex gap-2">
                    <dt className="text-[#767676]">País:</dt>
                    <dd>{consulta.pais}</dd>
                  </div>
                )}
                {consulta.telefono && (
                  <div className="flex gap-2">
                    <dt className="text-[#767676]">Teléfono:</dt>
                    <dd>{consulta.telefono}</dd>
                  </div>
                )}
                {consulta.correo && (
                  <div className="flex gap-2">
                    <dt className="text-[#767676]">Correo:</dt>
                    <dd className="break-all">{consulta.correo}</dd>
                  </div>
                )}
              </dl>

              {consulta.mensaje && (
                <p className="text-base leading-relaxed text-[#4A4A4A] whitespace-pre-line">
                  {consulta.mensaje}
                </p>
              )}

              <div className="flex gap-4 text-[15px] font-bold">
                {consulta.telefono && (
                  <a
                    href={whatsappDelCliente(consulta.telefono, consulta.nombre)}
                    target="_blank"
                    rel="noopener"
                    className="text-[#8A5800] hover:text-[#000000]"
                  >
                    WhatsApp
                  </a>
                )}
                {consulta.correo && (
                  <a
                    href={`mailto:${consulta.correo}?subject=${encodeURIComponent(
                      'Su consulta a Vela Nus',
                    )}&body=${encodeURIComponent(`Hola ${consulta.nombre},\n\n`)}`}
                    className="text-[#8A5800] hover:text-[#000000]"
                  >
                    Responder por correo
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Boton tono="secundario" onClick={() => alternar(consulta)}>
                {consulta.atendida ? 'Reabrir' : 'Marcar atendida'}
              </Boton>
              <Boton tono="peligro" onClick={() => eliminar(consulta)}>
                Borrar
              </Boton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
