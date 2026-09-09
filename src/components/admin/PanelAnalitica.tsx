import React, { useEffect, useMemo, useState } from 'react';
import { Consulta, consultas as leerConsultas } from '../../data/consultas';
import { mensajeDeError } from '../../firebase';
import { Aviso, Boton } from './piezas';

/**
 * La mitad del embudo que sí es nuestra.
 *
 * Las visitas se cuentan en Cloudflare Web Analytics, fuera del repositorio:
 * es gratis, no usa cookies y no guarda la IP, por eso el sitio no necesita
 * banner de consentimiento. Lo que Cloudflare NO sabe es cuántas de esas
 * visitas acaban en consulta, porque su plan gratuito no tiene eventos
 * personalizados.
 *
 * Pero ese dato ya lo teníamos: cada envío se guarda en `consultas` con su
 * `origen` y su fecha. Así que aquí no se mide nada nuevo, solo se agrega lo
 * que ya hay. Para la tasa de conversión hace falta el dato de visitas de
 * Cloudflare, que se escribe a mano abajo: no hay forma de leerlo desde el
 * navegador sin un token de API, y meter un token en un sitio estático sería
 * regalarlo.
 */

/** Lunes de la semana de una fecha, para agrupar sin depender de la zona. */
const inicioDeSemana = (fecha: Date): Date => {
  const dia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  // getDay(): 0 es domingo. Se retrocede al lunes anterior.
  dia.setDate(dia.getDate() - ((dia.getDay() + 6) % 7));
  return dia;
};

const formatoDia = new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short' });

/** Nombres legibles de los formularios; `origen` es un identificador técnico. */
const NOMBRE_ORIGEN: Record<string, string> = {
  diagnostico: 'Diagnóstico (modal)',
  'contacto-home': 'Contacto de la home',
};

const SEMANAS = 8;

export const PanelAnalitica: React.FC = () => {
  const [lista, setLista] = useState<Consulta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [visitas, setVisitas] = useState('');

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

  const conFecha = useMemo(() => lista.filter((c) => c.creado), [lista]);

  /** Las últimas SEMANAS semanas, incluidas las que no tuvieron ninguna. */
  const semanas = useMemo(() => {
    const cubos = new Map<number, number>();
    const primera = inicioDeSemana(new Date());

    for (let i = SEMANAS - 1; i >= 0; i -= 1) {
      const inicio = new Date(primera);
      inicio.setDate(inicio.getDate() - i * 7);
      cubos.set(inicio.getTime(), 0);
    }

    for (const consulta of conFecha) {
      const clave = inicioDeSemana(consulta.creado!).getTime();
      if (cubos.has(clave)) cubos.set(clave, cubos.get(clave)! + 1);
    }

    return [...cubos.entries()].map(([tiempo, total]) => ({
      inicio: new Date(tiempo),
      total,
    }));
  }, [conFecha]);

  const porOrigen = useMemo(() => {
    const cubos = new Map<string, number>();
    for (const consulta of lista) {
      const clave = consulta.origen || '(sin origen)';
      cubos.set(clave, (cubos.get(clave) ?? 0) + 1);
    }
    return [...cubos.entries()].sort((a, b) => b[1] - a[1]);
  }, [lista]);

  const ultimas30 = useMemo(() => {
    const limite = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return conFecha.filter((c) => c.creado!.getTime() >= limite).length;
  }, [conFecha]);

  const maximo = Math.max(1, ...semanas.map((s) => s.total));

  const visitasNumero = Number(visitas.replace(/\D/g, ''));
  const conversion =
    visitasNumero > 0 ? ((ultimas30 / visitasNumero) * 100).toFixed(2) : null;

  if (cargando) return <p className="text-base text-[#4A4A4A]">Cargando…</p>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-[26px] font-bold">Analítica</h2>
        <p className="text-[17px] leading-relaxed text-[#4A4A4A]">
          Cuántas consultas llegan y por qué formulario. Son datos reales de la colección{' '}
          <code className="font-mono text-[15px]">consultas</code>, no una estimación.
        </p>
      </div>

      {error && <Aviso>{error}</Aviso>}

      <section className="flex flex-col gap-4">
        <h3 className="text-[20px] font-bold">Resumen</h3>
        <dl className="grid sm:grid-cols-3 gap-6 text-base">
          <div className="flex flex-col gap-1">
            <dt className="text-[#767676]">Consultas en total</dt>
            <dd className="text-[34px] font-bold leading-none">{lista.length}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[#767676]">Últimos 30 días</dt>
            <dd className="text-[34px] font-bold leading-none">{ultimas30}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[#767676]">Sin atender</dt>
            <dd className="text-[34px] font-bold leading-none">
              {lista.filter((c) => !c.atendida).length}
            </dd>
          </div>
        </dl>
      </section>

      <section className="flex flex-col gap-4 border-t border-[#E4E4E4] pt-8">
        <h3 className="text-[20px] font-bold">Por semana</h3>
        <div className="flex items-end gap-2 h-40" role="img" aria-label={`Consultas por semana en las últimas ${SEMANAS} semanas`}>
          {semanas.map((semana) => (
            <div key={semana.inicio.getTime()} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-sm font-bold">{semana.total}</span>
              <div
                className="w-full bg-[#F9A600] min-h-[2px]"
                style={{ height: `${(semana.total / maximo) * 100}%` }}
              />
              <span className="text-xs text-[#767676] text-center">
                {formatoDia.format(semana.inicio)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-[#E4E4E4] pt-8">
        <h3 className="text-[20px] font-bold">Por formulario</h3>
        {porOrigen.length === 0 ? (
          <p className="text-base text-[#4A4A4A]">Todavía no ha llegado ninguna consulta.</p>
        ) : (
          <table className="w-full text-base">
            <thead>
              <tr className="text-left border-b border-[#E4E4E4]">
                <th className="py-2 font-bold">Formulario</th>
                <th className="py-2 font-bold text-right">Consultas</th>
                <th className="py-2 font-bold text-right">Reparto</th>
              </tr>
            </thead>
            <tbody>
              {porOrigen.map(([origen, total]) => (
                <tr key={origen} className="border-b border-[#E4E4E4]">
                  <td className="py-2.5">{NOMBRE_ORIGEN[origen] ?? origen}</td>
                  <td className="py-2.5 text-right font-bold">{total}</td>
                  <td className="py-2.5 text-right text-[#767676]">
                    {Math.round((total / lista.length) * 100)} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="border-l-4 border-[#F9A600] bg-[#F1F1F0] px-8 py-7 flex flex-col gap-4">
        <h3 className="text-[20px] font-bold">Tasa de conversión</h3>
        <p className="text-base leading-relaxed text-[#4A4A4A]">
          Las visitas se cuentan en <strong>Cloudflare Web Analytics</strong>, no aquí: su
          plan gratuito no tiene eventos personalizados, así que no sabe cuáles acaban en
          consulta. Escriba abajo las visitas de los últimos 30 días que le dé Cloudflare y
          le digo qué porcentaje convirtió.
        </p>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="visitas" className="text-sm font-bold text-[#000000]">
              Visitas de los últimos 30 días
            </label>
            <input
              id="visitas"
              inputMode="numeric"
              value={visitas}
              onChange={(e) => setVisitas(e.target.value)}
              placeholder="p. ej. 1240"
              className="border border-[#B9B7B2] bg-white px-3.5 py-3 text-base font-[inherit] outline-none focus:border-[#000000]"
            />
          </div>
          {conversion && (
            <p className="text-base pb-3">
              <strong className="text-[26px]">{conversion} %</strong> — {ultimas30} consultas
              de {visitasNumero.toLocaleString('es')} visitas.
            </p>
          )}
        </div>
        <p className="text-sm text-[#767676]">
          No se guarda: es solo una calculadora. Cloudflare muestrea el tráfico en periodos
          de más de 24 h, así que la cifra de visitas es aproximada.
        </p>
      </section>

      <div>
        <Boton tono="secundario" onClick={recargar}>
          Recargar
        </Boton>
      </div>
    </div>
  );
};
