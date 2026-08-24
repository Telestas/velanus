import { Idioma } from '../i18n/idioma';
import { ClaveCifra } from '../data/cifras';

/**
 * Contenido de «Sobre nosotros», en los dos idiomas.
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
  clave: ClaveCifra;
  etiqueta: string;
}

export interface ContenidoNosotros {
  hero: { titulo: string; entradilla: string; historia: string };
  cifras: CifraFirma[];
  reglas: Regla[];
  equipo: MiembroEquipo[];
  avisoEquipo: string;
  credenciales: string;
  direccion: string;
  cierre: { titulo: string; boton: string; mensaje: string };
}

/** Cuatro fichas de muestra; la retícula funciona con 3, 4, 6 u 8 personas. */
const equipoPendiente = (nombre: string, cargo: string, perfil: string): MiembroEquipo[] =>
  Array.from({ length: 4 }, () => ({ nombre, cargo, perfil }));

const ES: ContenidoNosotros = {
  hero: {
    titulo: 'Somos quienes hacen las gestiones que usted no puede hacer desde fuera.',
    entradilla:
      'Vela Nus es una consultoría cubana de contadores y juristas. Trabajamos con empresas e inversores extranjeros que necesitan operar en Cuba, y con clientes nacionales que necesitan orden en sus libros y en sus contratos.',
    historia:
      '[PÁRRAFO PENDIENTE — historia de la firma: cuándo se funda, por qué, qué la distingue.]',
  },
  cifras: [
    { clave: 'anos', etiqueta: 'Años operando' },
    { clave: 'entidades', etiqueta: 'Entidades constituidas' },
    { clave: 'profesionales', etiqueta: 'Profesionales en el equipo' },
    { clave: 'idiomas', etiqueta: 'Idiomas de trabajo' },
  ],
  reglas: [
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
  ],
  equipo: equipoPendiente(
    '[NOMBRE PENDIENTE]',
    '[CARGO PENDIENTE]',
    '[Dos líneas de especialidad y titulación]',
  ),
  avisoEquipo:
    'Nombres, cargos y titulación pendientes. La retícula admite de 3 a 8 personas.',
  credenciales:
    '[PENDIENTE — inscripciones, colegios profesionales, licencias o certificaciones que se puedan acreditar.]',
  direccion: 'Infanta entre Peñalver y Sitios, Centro Habana, La Habana, Cuba.',
  cierre: {
    titulo: 'Hable con la persona que llevaría su caso, no con un formulario.',
    boton: 'Agendar por WhatsApp',
    mensaje: 'Hola, quisiera hablar con quien llevaría mi caso.',
  },
};

const EN: ContenidoNosotros = {
  hero: {
    titulo: 'We are the people who do what you cannot do from abroad.',
    entradilla:
      'Vela Nus is a Cuban consultancy of accountants and lawyers. We work with foreign companies and investors who need to operate in Cuba, and with domestic clients who need their books and contracts in order.',
    historia:
      '[PARAGRAPH PENDING — the firm’s history: when it was founded, why, what sets it apart.]',
  },
  cifras: [
    { clave: 'anos', etiqueta: 'Years operating' },
    { clave: 'entidades', etiqueta: 'Entities incorporated' },
    { clave: 'profesionales', etiqueta: 'Professionals on the team' },
    { clave: 'idiomas', etiqueta: 'Working languages' },
  ],
  reglas: [
    {
      titulo: 'Fees agreed in writing',
      descripcion:
        'Before we start you know what it costs and what it covers. If the scope changes we tell you before doing the work, not on the invoice.',
    },
    {
      titulo: 'A named person in charge',
      descripcion:
        'You are not talking to a switchboard. Every engagement has one assigned person who reports progress and answers for the deadlines.',
    },
    {
      titulo: 'Real timelines, not optimistic ones',
      descripcion:
        'How long Cuban institutions take is not up to us. We give you the range we know and tell you when it shifts.',
    },
  ],
  equipo: equipoPendiente(
    '[NAME PENDING]',
    '[ROLE PENDING]',
    '[Two lines of specialisation and qualifications]',
  ),
  avisoEquipo:
    'Names, roles and qualifications pending. The grid works with 3 to 8 people.',
  credenciales:
    '[PENDING — registrations, professional bodies, licences or certifications that can be evidenced.]',
  direccion: 'Infanta between Peñalver and Sitios, Centro Habana, Havana, Cuba.',
  cierre: {
    titulo: 'Talk to the person who would handle your case, not to a form.',
    boton: 'Book on WhatsApp',
    mensaje: 'Hello, I would like to speak with whoever would handle my case.',
  },
};

export const contenidoNosotros = (idioma: Idioma): ContenidoNosotros =>
  idioma === 'en' ? EN : ES;
