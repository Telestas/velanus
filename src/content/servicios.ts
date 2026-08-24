import { ScreenId } from '../types';
import { Idioma } from '../i18n/idioma';

/**
 * Contenido de Servicios en los dos idiomas: el índice y las cuatro
 * subpáginas de línea.
 *
 * Las cuatro subpáginas comparten estructura —hero con panel, qué incluye,
 * plazos, qué necesitamos, preguntas frecuentes y cierre—, así que se
 * describen como datos y las pinta una sola plantilla.
 *
 * BORRADOR: los `[PLAZO PENDIENTE]` y las respuestas marcadas están así a
 * propósito. Los plazos ante instituciones cubanas y el alcance jurídico los
 * confirma el cliente; no inventarlos.
 *
 * En inglés se conservan sin traducir las figuras jurídicas cubanas (MIPYME,
 * TCP, CNA, PDL) y los sistemas contables (Versat, Odoo): son nombres propios
 * del marco cubano.
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
  pantalla: ScreenId;
  clave: string;
  etiqueta: string;
  titulo: string;
  tituloCorto: string;
  entradilla: string;
  resumen: string;
  puntos: string[];
  botonHero: string;
  botonSecundario?: { label: string; pantalla: ScreenId };
  panel: PanelLateral;
  incluye: ItemIncluido[];
  plazos: Plazo[];
  notaPlazos?: string;
  requisitos: string[];
  preguntas: Pregunta[];
  cierre: { titulo: string; boton: string; mensaje: string };
}

export interface ContenidoServicios {
  indice: {
    titulo: string;
    entradilla: string;
    panel: { etiqueta: string; texto: string; boton: string; mensaje: string };
    cierre: { titulo: string; boton: string; mensaje: string };
  };
  lineas: LineaPagina[];
}

/* ================================ español ================================ */

const CONTABILIDAD_ES: LineaPagina = {
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

const LEGAL_ES: LineaPagina = {
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

const TRAMITES_ES: LineaPagina = {
  pantalla: 'servicios-tramites',
  clave: 'C',
  etiqueta: 'Línea C · Servicio a personas',
  titulo: 'Trámites, documentos y visas',
  tituloCorto: 'Trámites y visas',
  entradilla:
    'Esta línea atiende a personas, no a empresas. Obtenemos y legalizamos sus documentos registrales en Cuba y preparamos expedientes de visa completos y correctos.',
  resumen:
    'Documentos registrales y legalizaciones · Visas a Canadá, México, Panamá y Schengen. Esta línea atiende a personas, no a empresas.',
  puntos: ['Documentos registrales y legalizaciones', 'Expedientes de visa completos'],
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

const EVENTOS_ES: LineaPagina = {
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

const ES: ContenidoServicios = {
  indice: {
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
  },
  lineas: [CONTABILIDAD_ES, LEGAL_ES, TRAMITES_ES, EVENTOS_ES],
};

/* ================================ inglés ================================= */

const CONTABILIDAD_EN: LineaPagina = {
  pantalla: 'servicios-contabilidad',
  clave: 'A',
  etiqueta: 'Line A · Service for companies',
  titulo: 'Accounting and bookkeeping',
  tituloCorto: 'Accounting',
  entradilla:
    'We keep your books in Versat or Odoo from Cuba, under the Cuban accounting framework, and hand you statements your accountant or bank abroad can read without translation.',
  resumen: 'Your books up to date, in Versat or Odoo, with statements at every close.',
  puntos: [
    'Recording of accounting operations',
    'Payroll management (Versat and Odoo)',
    'Product and service cost sheets',
    'Income statement and balance sheet',
  ],
  botonHero: 'Book a consultation',
  botonSecundario: { label: 'See corporate legal advice', pantalla: 'servicios-legal' },
  panel: {
    titulo: 'What you get',
    items: [
      { texto: 'Income statement for each period' },
      { texto: 'Balance sheet' },
      { texto: 'Cost sheets per product or service' },
      { texto: 'Payroll calculated and documented' },
      { texto: 'Books ready for inspection' },
    ],
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Recording of accounting operations',
      descripcion:
        'We record the whole period — income, expenses, inventory and bank movements — in your accounting system, with supporting documents filed and traceable.',
    },
    {
      numero: '02',
      titulo: 'Payroll management in Versat and Odoo',
      descripcion:
        'Salaries, withholdings and contributions calculated, with the reports Cuban labour rules require. We work in either Versat or Odoo, whichever your company already uses.',
    },
    {
      numero: '03',
      titulo: 'Cost sheets',
      descripcion:
        'Cost structure per product or service: materials, labour and overheads. It is the basis for setting prices you can defend before clients and inspectors.',
    },
    {
      numero: '04',
      titulo: 'Income statement and balance sheet',
      descripcion:
        'Regular delivery of the two statements you need to know whether you are making money and what you hold. We walk you through them on a call, we do not just email them.',
    },
  ],
  plazos: [
    { concepto: 'Monthly close', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Payroll calculation', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Cost sheet per product', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Catching up on arrears', plazo: '[TIMELINE PENDING]' },
  ],
  notaPlazos:
    'Timelines are confirmed in writing in the proposal, once we know the volume.',
  requisitos: [
    'Incorporation and registration documents',
    'Previous financial statements, if any',
    'Access to Versat or Odoo',
    'Invoices and receipts for the period',
    'Employment contracts and previous payrolls',
    'Bank statements for the period',
  ],
  preguntas: [
    {
      pregunta: 'Do I need to be in Cuba for the accounting close?',
      respuesta:
        'No. We work remotely with access to your system and send you the statements by email, with a call to explain them.',
    },
    {
      pregunta: 'Do you work with Versat or with Odoo?',
      respuesta:
        'Both. If you do not have a system yet, we recommend one based on the size and type of your operation.',
    },
    {
      pregunta: 'My accounting is several months behind. Will you take it on?',
      respuesta:
        'Yes. First we assess the backlog and tell you what can be reconstructed and with which supporting documents; that is quoted separately from the monthly service.',
    },
    {
      pregunta: 'Can you deliver the statements in English?',
      respuesta:
        '[ANSWER PENDING — confirm whether bilingual delivery is offered and to what extent]',
    },
  ],
  cierre: {
    titulo: 'Tell us where your accounting stands. The initial assessment is free.',
    boton: 'Book on WhatsApp',
    mensaje: 'Hello, I would like to ask about your accounting service.',
  },
};

const LEGAL_EN: LineaPagina = {
  pantalla: 'servicios-legal',
  clave: 'B',
  etiqueta: 'Line B · Service for companies',
  titulo: 'Corporate legal advice',
  tituloCorto: 'Corporate law',
  entradilla:
    'We set up the legal form that fits you and answer for your contracts in Cuba. If the business runs into trouble, we pursue the claim through the right channel.',
  resumen: 'We set up your legal form and answer for your contracts.',
  puntos: [
    'Incorporation of MIPYMES, TCP, CNA and PDL',
    'Commercial contracts',
    'Contractual claims',
    'Employment claims',
  ],
  botonHero: 'Book a consultation',
  botonSecundario: { label: 'See accounting', pantalla: 'servicios-contabilidad' },
  panel: {
    titulo: 'Legal forms we set up',
    items: [
      { texto: 'MIPYME', detalle: 'micro, small and medium-sized enterprise' },
      { texto: 'TCP', detalle: 'self-employed worker' },
      { texto: 'CNA', detalle: 'non-agricultural cooperative' },
      { texto: 'PDL', detalle: 'local development project' },
    ],
    nota: 'We tell you which one suits you before charging you anything.',
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Incorporation of MIPYMES, TCP, CNA and PDL',
      descripcion:
        'We choose the legal form, draft the file, submit it to the institutions and follow the process through to registration. Holding power of attorney, without you travelling.',
    },
    {
      numero: '02',
      titulo: 'Commercial contracts',
      descripcion:
        'Drafting and review of the contracts your company uses to buy, sell and commit itself in Cuba. We point out which clause leaves you exposed before you sign.',
    },
    {
      numero: '03',
      titulo: 'Contractual claims',
      descripcion:
        'When the other party fails to perform: claim, negotiation and, if needed, formal proceedings. We tell you up front what can realistically be recovered.',
    },
    {
      numero: '04',
      titulo: 'Employment claims',
      descripcion:
        'Disputes with workers, from building the file to representation. Prevention too: we review your employment contracts before there is a problem.',
    },
  ],
  plazos: [
    { concepto: 'MIPYME incorporation', plazo: '[TIMELINE PENDING]' },
    { concepto: 'TCP registration', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Contract review', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Claim: first assessment', plazo: '[TIMELINE PENDING]' },
  ],
  notaPlazos:
    'Timelines before institutions are not up to us; we give you the real range, not the optimistic one.',
  requisitos: [
    'Identification of the partners',
    'Intended activity and corporate purpose',
    'Proposed registered address',
    'Power of attorney, if you are not travelling',
    'Contracts and correspondence about the dispute',
    'Intended capital contribution',
  ],
  preguntas: [
    {
      pregunta: 'Can a foreigner be a partner in a Cuban MIPYME?',
      respuesta:
        '[ANSWER PENDING — to be drafted by the legal team under the regulations in force]',
    },
    {
      pregunta: 'Do I have to travel to Cuba to incorporate?',
      respuesta:
        'No, if you grant us power of attorney. We tell you how to grant it from your country and which legalisations it requires.',
    },
    {
      pregunta: 'What is the difference between MIPYME, TCP, CNA and PDL?',
      respuesta:
        '[ANSWER PENDING — comparison to be drafted by the legal team; worth a blog post linked from here]',
    },
    {
      pregunta: 'Do you also represent us in litigation?',
      respuesta: '[ANSWER PENDING — confirm scope of representation and bar membership]',
    },
  ],
  cierre: {
    titulo: 'Tell us what you want to do in Cuba. We will tell you which legal form you need.',
    boton: 'Book on WhatsApp',
    mensaje: 'Hello, I would like to ask about corporate legal advice.',
  },
};

const TRAMITES_EN: LineaPagina = {
  pantalla: 'servicios-tramites',
  clave: 'C',
  etiqueta: 'Line C · Service for individuals',
  titulo: 'Paperwork, documents and visas',
  tituloCorto: 'Paperwork and visas',
  entradilla:
    'This line serves individuals, not companies. We obtain and legalise your Cuban registry documents and prepare complete, correct visa applications.',
  resumen:
    'Registry documents and legalisations · Visas for Canada, Mexico, Panama and the Schengen Area. This line serves individuals, not companies.',
  puntos: ['Registry documents and legalisations', 'Complete visa applications'],
  botonHero: 'Ask about my case',
  panel: {
    titulo: 'Destinations we handle',
    items: [
      { texto: 'Canada' },
      { texto: 'Mexico' },
      { texto: 'Panama' },
      { texto: 'Schengen Area' },
    ],
    nota: 'We prepare the application. The decision is always the consulate’s.',
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Obtaining and legalising registry documents',
      descripcion:
        'Birth, marriage and criminal record certificates and other registry documents, with the legalisations the destination country requires. We queue at the counters for you.',
    },
    {
      numero: '02',
      titulo: 'Visa applications',
      descripcion:
        'We review your profile, build the file to the consulate’s current requirements, prepare the forms and explain what to expect at the interview, if there is one.',
    },
  ],
  plazos: [
    { concepto: 'Simple registry document', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Document with legalisation', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Visa file: preparation', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Consular appointment', plazo: 'Depends on the consulate' },
  ],
  requisitos: [
    'Valid passport',
    'Identity card',
    'Original documents you already hold',
    'Photographs to consular specification',
    'Purpose and dates of travel',
    'Authorisation to act on your behalf',
  ],
  preguntas: [
    {
      pregunta: 'Do you guarantee I will get the visa?',
      respuesta:
        'No. Nobody can guarantee a consular decision, and anyone who promises you one is lying. What we guarantee is a complete, correct application filed on time.',
    },
    {
      pregunta: 'What happens if it is refused?',
      respuesta: '[ANSWER PENDING — fee policy in case of refusal]',
    },
    {
      pregunta: 'I live outside Cuba. Can you obtain my documents there?',
      respuesta:
        'Yes, with your authorisation. It is one of the most frequent requests from Cubans living abroad.',
    },
  ],
  cierre: {
    titulo: 'Tell us which document or visa you need and we will tell you what it takes.',
    boton: 'Ask on WhatsApp',
    mensaje: 'Hello, I need help with paperwork or a visa.',
  },
};

const EVENTOS_EN: LineaPagina = {
  pantalla: 'servicios-eventos',
  clave: 'D',
  etiqueta: 'Line D · Service for companies',
  titulo: 'Events and training',
  tituloCorto: 'Events and training',
  entradilla:
    'We organise your corporate event in Cuba and train your team on what they need to know to operate here, from accounting to employment obligations.',
  resumen: 'Corporate events and training for your team in Cuba.',
  puntos: ['Corporate event management', 'Workshops and team training'],
  botonHero: 'Request a proposal',
  panel: {
    titulo: 'Formats',
    items: [
      { texto: 'Corporate or launch event' },
      { texto: 'Closed workshop for one team' },
      { texto: 'Open training session' },
      { texto: '[FORMAT PENDING — confirm offering]' },
    ],
  },
  incluye: [
    {
      numero: '01',
      titulo: 'Corporate event management',
      descripcion:
        'Venue, suppliers, permits and logistics in Cuba. You set the objective and the budget; we handle the local operation and report the spend back to you.',
    },
    {
      numero: '02',
      titulo: 'Workshops and team training',
      descripcion:
        'Practical training for your staff in Cuba: accounting obligations, use of the system, contracting and document management. [SYLLABUS PENDING — confirm what is taught and by whom.]',
    },
  ],
  plazos: [
    { concepto: 'Event proposal', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Recommended minimum notice', plazo: '[TIMELINE PENDING]' },
    { concepto: 'Designing a bespoke workshop', plazo: '[TIMELINE PENDING]' },
  ],
  requisitos: [
    'Objective of the event or workshop',
    'Number of participants',
    'Tentative dates',
    'Indicative budget',
    'Venue and equipment needs',
    'Starting level of the team, for workshops',
  ],
  preguntas: [
    {
      pregunta: 'Does it include venue, catering and equipment?',
      respuesta:
        '[ANSWER PENDING — confirm what the service covers and what is billed separately]',
    },
    {
      pregunta: 'Do you train on Versat and Odoo?',
      respuesta:
        '[ANSWER PENDING — we work with both systems, but whether we teach them is still to be confirmed]',
    },
    {
      pregunta: 'Can you organise an event if my company is not a client?',
      respuesta: '[ANSWER PENDING]',
    },
  ],
  cierre: {
    titulo: 'Tell us what event you have in mind and we will send you a proposal.',
    boton: 'Write on WhatsApp',
    mensaje: 'Hello, I would like a proposal for an event or training.',
  },
};

const EN: ContenidoServicios = {
  indice: {
    titulo: 'Four lines of work. One person answering to you.',
    entradilla:
      'Each line can be engaged on its own or together with the others. In every case you get the scope, the timelines and the fees in writing before we start.',
    panel: {
      etiqueta: 'If you do not know where to start',
      texto:
        'Tell us what you want to do in Cuba and we will tell you which line you need, and in what order.',
      boton: 'Write on WhatsApp',
      mensaje: 'Hello, I am not sure which service line I need. Can you advise?',
    },
    cierre: {
      titulo: 'Tell us about your case. We will tell you which line you need, and in what order.',
      boton: 'Book on WhatsApp',
      mensaje: 'Hello, I would like to know which service line I need.',
    },
  },
  lineas: [CONTABILIDAD_EN, LEGAL_EN, TRAMITES_EN, EVENTOS_EN],
};

export const contenidoServicios = (idioma: Idioma): ContenidoServicios =>
  idioma === 'en' ? EN : ES;

/** Las tres líneas corporativas del índice; la C va aparte por dirigirse a personas. */
export const lineasCorporativas = (contenido: ContenidoServicios): LineaPagina[] =>
  contenido.lineas.filter((linea) => linea.clave !== 'C');

export const lineaPersonas = (contenido: ContenidoServicios): LineaPagina =>
  contenido.lineas.find((linea) => linea.clave === 'C')!;

export const lineaDe = (
  contenido: ContenidoServicios,
  pantalla: ScreenId,
): LineaPagina | undefined =>
  contenido.lineas.find((linea) => linea.pantalla === pantalla);
