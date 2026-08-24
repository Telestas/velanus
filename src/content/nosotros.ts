/**
 * Contenido de «Sobre nosotros», de la maqueta «Nosotros Vela Nus.dc.html».
 *
 * BORRADOR: no hay nombres, cargos, credenciales ni historia de la firma. Todo
 * eso va marcado como pendiente a propósito —cualquier cosa escrita ahí sería
 * inventada— y solo lo rellena el cliente.
 */

export interface Regla {
  titulo: string;
  descripcion: string;
}

export interface MiembroEquipo {
  nombre: string;
  cargo: string;
  perfil: string;
}

export interface CifraFirma {
  valor: string;
  etiqueta: string;
}

export const HERO = {
  titulo: 'Somos quienes hacen las gestiones que usted no puede hacer desde fuera.',
  entradilla:
    'Vela Nus es una consultoría cubana de contadores y juristas. Trabajamos con empresas e inversores extranjeros que necesitan operar en Cuba, y con clientes nacionales que necesitan orden en sus libros y en sus contratos.',
  /** BORRADOR: historia de la firma, pendiente de que la facilite el cliente. */
  historia:
    '[PÁRRAFO PENDIENTE — historia de la firma: cuándo se funda, por qué, qué la distingue.]',
};

/** BORRADOR: tres de las cuatro cifras están pendientes. */
export const CIFRAS_FIRMA: CifraFirma[] = [
  { valor: '[DATO PENDIENTE]', etiqueta: 'Años operando' },
  { valor: '[DATO PENDIENTE]', etiqueta: 'Entidades constituidas' },
  { valor: '[DATO PENDIENTE]', etiqueta: 'Profesionales en el equipo' },
  { valor: 'Español · Inglés', etiqueta: 'Idiomas de trabajo' },
];

/**
 * Único bloque de la página con posicionamiento propio: sale de lo que ya
 * afirma el cliente (honorarios cerrados, responsable con nombre, plazos
 * reales). Si alguna deja de ser cierta, se quita.
 */
export const REGLAS: Regla[] = [
  {
    titulo: 'Honorarios cerrados por escrito',
    descripcion:
      'Antes de empezar sabe cuánto cuesta y qué incluye. Si el alcance cambia, se lo decimos antes de trabajar, no en la factura.',
  },
  {
    titulo: 'Un responsable con nombre',
    descripcion:
      'No habla con una centralita. Cada encargo tiene una persona asignada que le reporta el avance y responde por los plazos.',
  },
  {
    titulo: 'Plazos reales, no optimistas',
    descripcion:
      'Los tiempos de las instituciones cubanas no dependen de nosotros. Le damos el rango que conocemos y le avisamos cuando se mueve.',
  },
];

/**
 * BORRADOR: cuatro fichas de muestra. La retícula funciona con 3, 4, 6 u 8
 * personas; hacen falta nombre, cargo, una línea de especialidad y el retrato
 * (4:5) de cada una.
 */
export const EQUIPO: MiembroEquipo[] = Array.from({ length: 4 }, () => ({
  nombre: '[NOMBRE PENDIENTE]',
  cargo: '[CARGO PENDIENTE]',
  perfil: '[Dos líneas de especialidad y titulación]',
}));

export const AVISO_EQUIPO =
  'Nombres, cargos y titulación pendientes. La retícula admite de 3 a 8 personas.';

/** BORRADOR: no se publica ninguna credencial sin que se pueda acreditar. */
export const CREDENCIALES =
  '[PENDIENTE — inscripciones, colegios profesionales, licencias o certificaciones que se puedan acreditar.]';

export const CIERRE = {
  titulo: 'Hable con la persona que llevaría su caso, no con un formulario.',
  boton: 'Agendar por WhatsApp',
  mensaje: 'Hola, quisiera hablar con quien llevaría mi caso.',
};
