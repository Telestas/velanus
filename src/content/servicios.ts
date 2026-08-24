import { ScreenId } from '../types';

/**
 * Contenido de Servicios: el índice y las cuatro subpáginas de línea.
 *
 * Sale de la maqueta «Servicios Vela Nus.dc.html». Las cuatro subpáginas
 * comparten estructura —hero con panel, qué incluye, plazos, qué necesitamos,
 * preguntas frecuentes y cierre—, así que se describen como datos y las pinta
 * una sola plantilla.
 *
 * BORRADOR: los `[PLAZO PENDIENTE]` y las respuestas marcadas están así a
 * propósito. Los plazos ante instituciones cubanas y el alcance jurídico los
 * confirma el cliente; no inventarlos.
 */

export interface Plazo {
  concepto: string;
  plazo: string;
}

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export interface ItemIncluido {
  numero: string;
  titulo: string;
  descripcion: string;
}

export interface PanelLateral {
  titulo: string;
  items: { texto: string; detalle?: string }[];
  nota?: string;
}

export interface LineaPagina {
  /** Pantalla del router que pinta esta línea. */
  pantalla: ScreenId;
  clave: string;
  /** Antetítulo del hero: «Línea A · Servicio a empresas». */
  etiqueta: string;
  titulo: string;
  /** Título corto para migas y menús. */
  tituloCorto: string;
  entradilla: string;
  /** Resumen de una línea para la tarjeta del índice. */
  resumen: string;
  /** Puntos sueltos que lista la tarjeta del índice. */
  puntos: string[];
  /** Botón principal del hero. */
  botonHero: string;
  /** Botón secundario del hero, si la maqueta lo trae. */
  botonSecundario?: { label: string; pantalla: ScreenId };
  panel: PanelLateral;
  incluye: ItemIncluido[];
  plazos: Plazo[];
  notaPlazos?: string;
  requisitos: string[];
  preguntas: Pregunta[];
  cierre: { titulo: string; boton: string; mensaje: string };
}

export const INDICE = {
  titulo: 'Cuatro líneas de trabajo. Un solo responsable para usted.',
  entradilla:
    'Cada línea se contrata por separado o en conjunto. En todos los casos recibe alcance, plazos y honorarios por escrito antes de empezar.',
  panel: {
    etiqueta: 'Si no sabe por dónde empezar',
    texto:
      'Cuéntenos qué quiere hacer en Cuba y le decimos qué línea necesita y en qué orden.',
    boton: 'Escribir por WhatsApp',
    mensaje: 'Hola, no sé qué línea de servicio necesito. ¿Me orientan?',
  },
  cierre: {
    titulo: 'Cuéntenos su caso. Le decimos qué línea necesita y en qué orden.',
    boton: 'Agendar por WhatsApp',
    mensaje: 'Hola, quisiera saber qué línea de servicio necesito.',
  },
};

const CONTABILIDAD: LineaPagina = {
  pantalla: 'servicios-contabilidad',
  clave: 'A',
  etiqueta: 'Línea A · Servicio a empresas',
  titulo: 'Contabilidad y teneduría de libros',
  tituloCorto: 'Contabilidad',
  entradilla:
    'Llevamos su contabilidad en Versat u Odoo desde Cuba, cumpliendo el marco contable cubano, y le entregamos estados que su gestor o su banco en el extranjero puede leer sin traducción.',
  resumen: 'Su contabilidad al día, en Versat u Odoo, con estados en cada cierre.',
  puntos: [
    'Asentamiento de operaciones contables',
    'Gestión de nómina (Versat y Odoo)',
    'Elaboración de fichas de costo',
    'Estado de rendimiento y de situación',
  ],
  botonHero: 'Agendar consulta',
  botonSecundario: { label: 'Ver asesoría legal', pantalla: 'servicios-legal' },
  panel: {
    titulo: 'Qué recibe usted',
    items: [
      { texto: 'Estado de rendimiento por período' },
      { texto: 'Estado de situación contable' },
      { texto: 'Fichas de costo por producto o servicio' },
      { texto: 'Nómina calculada y soportada' },
      { texto: 'Libros al día ante inspección' },
    ],
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Asentamiento de operaciones contables',
      descripcion:
        'Registramos toda la operativa del período —ingresos, gastos, inventarios y movimientos bancarios— en su sistema contable, con los soportes archivados y trazables.',
    },
    {
      numero: '02',
      titulo: 'Gestión de nómina en Versat y Odoo',
      descripcion:
        'Cálculo de salarios, retenciones y aportes, con los reportes que exige la normativa laboral cubana. Trabajamos indistintamente en Versat u Odoo, según el sistema que ya use su empresa.',
    },
    {
      numero: '03',
      titulo: 'Elaboración de fichas de costo',
      descripcion:
        'Estructura de costo por producto o servicio: materiales, mano de obra y gastos indirectos. Es la base para fijar precios defendibles ante clientes e inspección.',
    },
    {
      numero: '04',
      titulo: 'Estado de rendimiento y estado de situación',
      descripcion:
        'Entrega periódica de los dos estados que necesita para saber si gana dinero y qué tiene. Se los explicamos en llamada, no se los mandamos y ya.',
    },
  ],
  plazos: [
    { concepto: 'Cierre contable mensual', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Cálculo de nómina', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Ficha de costo por producto', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Puesta al día de atrasos', plazo: '[PLAZO PENDIENTE]' },
  ],
  notaPlazos:
    'Los plazos se confirman por escrito en la propuesta, no antes de conocer el volumen.',
  requisitos: [
    'Documento de constitución y registro',
    'Estados contables anteriores, si existen',
    'Accesos a Versat u Odoo',
    'Facturas y comprobantes del período',
    'Contratos laborales y nóminas previas',
    'Extractos bancarios del período',
  ],
  preguntas: [
    {
      pregunta: '¿Necesito estar en Cuba para el cierre contable?',
      respuesta:
        'No. Trabajamos de forma remota con accesos a su sistema y le entregamos los estados por correo, con una llamada para explicárselos.',
    },
    {
      pregunta: '¿Trabajan con Versat o con Odoo?',
      respuesta:
        'Con los dos. Si aún no tiene sistema, le recomendamos uno según el tamaño y el tipo de operación.',
    },
    {
      pregunta: 'Mi contabilidad viene atrasada varios meses. ¿La asumen?',
      respuesta:
        'Sí. Primero valoramos el atraso y le decimos qué se puede reconstruir y con qué soportes; eso va como trabajo aparte del servicio mensual.',
    },
    {
      pregunta: '¿Pueden entregarme los estados en inglés?',
      respuesta:
        '[RESPUESTA PENDIENTE — confirmar si se ofrece entrega bilingüe y con qué alcance]',
    },
  ],
  cierre: {
    titulo: 'Díganos en qué estado está su contabilidad. La valoración inicial no se cobra.',
    boton: 'Agendar por WhatsApp',
    mensaje: 'Hola, quisiera consultar por el servicio de contabilidad.',
  },
};

const LEGAL: LineaPagina = {
  pantalla: 'servicios-legal',
  clave: 'B',
  etiqueta: 'Línea B · Servicio a empresas',
  titulo: 'Asesoría legal corporativa',
  tituloCorto: 'Legal corporativo',
  entradilla:
    'Constituimos la figura legal que le corresponde y respondemos por sus contratos en Cuba. Si el negocio se complica, llevamos la reclamación por la vía que toque.',
  resumen: 'Constituimos su figura legal y respondemos por sus contratos.',
  puntos: [
    'Constitución de MIPYMES, TCP, CNA y PDL',
    'Contratación económica',
    'Reclamaciones contractuales',
    'Reclamaciones laborales',
  ],
  botonHero: 'Agendar consulta',
  botonSecundario: { label: 'Ver contabilidad', pantalla: 'servicios-contabilidad' },
  panel: {
    titulo: 'Figuras que constituimos',
    items: [
      { texto: 'MIPYME', detalle: 'micro, pequeña y mediana empresa' },
      { texto: 'TCP', detalle: 'trabajador por cuenta propia' },
      { texto: 'CNA', detalle: 'cooperativa no agropecuaria' },
      { texto: 'PDL', detalle: 'proyecto de desarrollo local' },
    ],
    nota: 'Le decimos cuál le sirve antes de cobrarle nada.',
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Constitución de MIPYMES, TCP, CNA y PDL',
      descripcion:
        'Elegimos la figura, redactamos el expediente, presentamos ante las instituciones y le seguimos el trámite hasta la inscripción. Con poder de representación, sin que usted viaje.',
    },
    {
      numero: '02',
      titulo: 'Contratación económica',
      descripcion:
        'Redacción y revisión de los contratos con los que su empresa compra, vende y se obliga en Cuba. Le señalamos qué cláusula le deja expuesto antes de firmar.',
    },
    {
      numero: '03',
      titulo: 'Reclamaciones contractuales',
      descripcion:
        'Cuando la otra parte no cumple: reclamación, negociación y, si hace falta, la vía formal. Le decimos de entrada qué se puede recuperar de forma realista.',
    },
    {
      numero: '04',
      titulo: 'Reclamaciones laborales',
      descripcion:
        'Conflictos con trabajadores, desde la instrucción del expediente hasta la representación. También prevención: revisamos sus contratos laborales antes de que haya problema.',
    },
  ],
  plazos: [
    { concepto: 'Constitución de MIPYME', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Constitución de TCP', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Revisión de contrato', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Reclamación: primera valoración', plazo: '[PLAZO PENDIENTE]' },
  ],
  notaPlazos:
    'Los plazos ante instituciones no dependen de nosotros; le damos el rango real, no el optimista.',
  requisitos: [
    'Identificación de los socios',
    'Actividad y objeto social previstos',
    'Domicilio legal propuesto',
    'Poder de representación, si no viaja',
    'Contratos y comunicaciones del conflicto',
    'Capital de aporte previsto',
  ],
  preguntas: [
    {
      pregunta: '¿Puede un extranjero ser socio de una MIPYME cubana?',
      respuesta:
        '[RESPUESTA PENDIENTE — la redacta el equipo jurídico según el marco vigente]',
    },
    {
      pregunta: '¿Tengo que viajar a Cuba para constituir?',
      respuesta:
        'No, si nos otorga poder de representación. Le indicamos cómo otorgarlo desde su país y qué legalizaciones lleva.',
    },
    {
      pregunta: '¿Qué diferencia hay entre MIPYME, TCP, CNA y PDL?',
      respuesta:
        '[RESPUESTA PENDIENTE — comparativa a redactar por el equipo jurídico; da para un artículo del blog enlazado desde aquí]',
    },
    {
      pregunta: '¿Nos representan también ante el litigio?',
      respuesta: '[RESPUESTA PENDIENTE — confirmar alcance de representación y colegiación]',
    },
  ],
  cierre: {
    titulo: 'Cuéntenos qué quiere hacer en Cuba. Le decimos qué figura legal necesita.',
    boton: 'Agendar por WhatsApp',
    mensaje: 'Hola, quisiera consultar por asesoría legal corporativa.',
  },
};

const TRAMITES: LineaPagina = {
  pantalla: 'servicios-tramites',
  clave: 'C',
  etiqueta: 'Línea C · Servicio a personas',
  titulo: 'Trámites, documentos y visas',
  tituloCorto: 'Trámites y visas',
  entradilla:
    'Esta línea atiende a personas, no a empresas. Obtenemos y legalizamos sus documentos registrales en Cuba y preparamos expedientes de visa completos y correctos.',
  resumen:
    'Documentos registrales y legalizaciones · Visas a Canadá, México, Panamá y Schengen. Esta línea atiende a personas, no a empresas.',
  puntos: [
    'Documentos registrales y legalizaciones',
    'Expedientes de visa completos',
  ],
  botonHero: 'Consultar mi caso',
  panel: {
    titulo: 'Destinos que tramitamos',
    items: [
      { texto: 'Canadá' },
      { texto: 'México' },
      { texto: 'Panamá' },
      { texto: 'Espacio Schengen' },
    ],
    nota: 'Preparamos el expediente. La decisión es siempre del consulado.',
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Obtención y legalización de documentos registrales',
      descripcion:
        'Certificaciones de nacimiento, matrimonio, antecedentes y demás documentos de registro, con las legalizaciones que exija el país de destino. Gestionamos las colas y las ventanillas por usted.',
    },
    {
      numero: '02',
      titulo: 'Tramitación de visas',
      descripcion:
        'Revisamos su perfil, armamos el expediente según los requisitos vigentes del consulado, preparamos formularios y le explicamos qué esperar en la entrevista si la hay.',
    },
  ],
  plazos: [
    { concepto: 'Documento registral simple', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Documento con legalización', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Expediente de visa: preparación', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Cita consular', plazo: 'Depende del consulado' },
  ],
  requisitos: [
    'Pasaporte vigente',
    'Carné de identidad',
    'Documentos originales que ya tenga',
    'Fotos según requisito consular',
    'Motivo y fechas del viaje',
    'Autorización para gestionar en su nombre',
  ],
  preguntas: [
    {
      pregunta: '¿Garantizan que me den la visa?',
      respuesta:
        'No. Nadie puede garantizar una decisión consular, y quien se lo prometa le está mintiendo. Lo que garantizamos es un expediente completo, correcto y presentado a tiempo.',
    },
    {
      pregunta: '¿Qué pasa si me la niegan?',
      respuesta: '[RESPUESTA PENDIENTE — política de honorarios en caso de negativa]',
    },
    {
      pregunta: 'Vivo fuera de Cuba. ¿Pueden sacar mis documentos aquí?',
      respuesta:
        'Sí, con su autorización. Es uno de los encargos más frecuentes de cubanos residentes en el exterior.',
    },
  ],
  cierre: {
    titulo: 'Díganos qué documento o qué visa necesita y le decimos qué lleva.',
    boton: 'Consultar por WhatsApp',
    mensaje: 'Hola, necesito ayuda con un trámite o una visa.',
  },
};

const EVENTOS: LineaPagina = {
  pantalla: 'servicios-eventos',
  clave: 'D',
  etiqueta: 'Línea D · Servicio a empresas',
  titulo: 'Eventos y capacitación',
  tituloCorto: 'Eventos y capacitación',
  entradilla:
    'Organizamos su evento corporativo en Cuba y formamos a su equipo en lo que necesita saber para operar aquí, desde contabilidad hasta obligaciones laborales.',
  resumen: 'Eventos corporativos y formación para su equipo en Cuba.',
  puntos: ['Organización de eventos corporativos', 'Talleres y capacitación a equipos'],
  botonHero: 'Pedir propuesta',
  panel: {
    titulo: 'Formatos',
    items: [
      { texto: 'Evento corporativo o de presentación' },
      { texto: 'Taller cerrado para un equipo' },
      { texto: 'Sesión de formación abierta' },
      { texto: '[FORMATO PENDIENTE — confirmar oferta]' },
    ],
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Organización de eventos corporativos',
      descripcion:
        'Local, proveedores, permisos y logística en Cuba. Usted define el objetivo y el presupuesto; nosotros resolvemos la operativa local y le reportamos el gasto.',
    },
    {
      numero: '02',
      titulo: 'Talleres y capacitación a equipos',
      descripcion:
        'Formación práctica para su personal en Cuba: obligaciones contables, uso del sistema, contratación y gestión documental. [TEMARIO PENDIENTE — confirmar qué se imparte y quién.]',
    },
  ],
  plazos: [
    { concepto: 'Propuesta de evento', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Antelación mínima recomendada', plazo: '[PLAZO PENDIENTE]' },
    { concepto: 'Diseño de un taller a medida', plazo: '[PLAZO PENDIENTE]' },
  ],
  requisitos: [
    'Objetivo del evento o del taller',
    'Número de participantes',
    'Fechas tentativas',
    'Presupuesto orientativo',
    'Necesidades de local y equipos',
    'Nivel de partida del equipo, si es taller',
  ],
  preguntas: [
    {
      pregunta: '¿Incluye local, catering y equipos?',
      respuesta:
        '[RESPUESTA PENDIENTE — confirmar qué entra en el servicio y qué se factura aparte]',
    },
    {
      pregunta: '¿Capacitan en Versat y en Odoo?',
      respuesta:
        '[RESPUESTA PENDIENTE — trabajamos con los dos sistemas, pero falta confirmar si se imparte formación sobre ellos]',
    },
    {
      pregunta: '¿Pueden organizar un evento si mi empresa no es cliente?',
      respuesta: '[RESPUESTA PENDIENTE]',
    },
  ],
  cierre: {
    titulo: 'Cuéntenos qué evento tiene en mente y le mandamos una propuesta.',
    boton: 'Escribir por WhatsApp',
    mensaje: 'Hola, quisiera una propuesta de evento o capacitación.',
  },
};

/** Las tres líneas corporativas del índice, en el orden de la maqueta. */
export const LINEAS_CORPORATIVAS: LineaPagina[] = [CONTABILIDAD, LEGAL, EVENTOS];

/** La línea C va aparte: atiende a personas, no a empresas. */
export const LINEA_PERSONAS = TRAMITES;

export const LINEAS: LineaPagina[] = [CONTABILIDAD, LEGAL, TRAMITES, EVENTOS];

export const lineaDe = (pantalla: ScreenId): LineaPagina | undefined =>
  LINEAS.find((linea) => linea.pantalla === pantalla);
