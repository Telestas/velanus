import { Idioma } from './idioma';

/**
 * Textos de interfaz: rótulos de sección, botones, menús y etiquetas de
 * formulario. Lo que es contenido —titulares, descripciones de servicio,
 * preguntas frecuentes— vive en `src/content/`.
 */
export interface Textos {
  nav: {
    inicio: string;
    servicios: string;
    nosotros: string;
    resenas: string;
    blog: string;
    contacto: string;
    agendar: string;
    menu: string;
  };
  pie: {
    servicios: string;
    firma: string;
    contacto: string;
    sobreNosotros: string;
    resenasYCasos: string;
    avisoLegal: string;
    privacidad: string;
    disclaimer: string;
    contabilidad: string;
    legal: string;
    tramites: string;
    eventos: string;
    derechos: string;
    paginaPendiente: string;
  };
  home: {
    problemasTitulo: string;
    problemasEntradilla: string;
    problemasEtiqueta: string;
    serviciosEtiqueta: string;
    serviciosTitulo: string;
    verTodos: string;
    indiceServicios: string;
    verLinea: string;
    verLineaCompleta: string;
    procesoEtiqueta: string;
    procesoTitulo: string;
    procesoTituloClaro: string;
    procesoEntradilla: string;
    resenasEtiqueta: string;
    resenasTitulo: string;
    resenasTituloClaro: string;
    dejarResena: string;
    verResenas: string;
    blogEtiqueta: string;
    blogTitulo: string;
    irAlBlog: string;
    verEntradas: string;
    blogPendiente: string;
    imagenArticulo: string;
    verServicios: string;
    agendarWhatsApp: string;
    agendarWhatsAppCorto: string;
    respuesta24h: string;
    respuesta24hCorto: string;
    cifrasEtiqueta: string;
    idiomaAviso: string;
    whatsappEtiqueta: string;
    correoEtiqueta: string;
  };
  formulario: {
    nombre: string;
    correo: string;
    pais: string;
    mensaje: string;
    enviar: string;
    enviando: string;
    recibido: string;
    gracias: string;
    adelantar: string;
    alternativa: (whatsapp: string, correo: string) => string;
  };
  modal: {
    etiqueta: string;
    titulo: string;
    entradilla: string;
    nombre: string;
    nombrePlaceholder: string;
    empresa: string;
    empresaPlaceholder: string;
    telefono: string;
    correo: string;
    interes: string;
    comentarios: string;
    comentariosPlaceholder: string;
    enviar: string;
    enviando: string;
    cerrar: string;
    recibidoTitulo: string;
    recibido: (nombre: string) => string;
    adelantar: string;
    volver: string;
    servicios: { valor: string; etiqueta: string }[];
  };
  servicios: {
    migaInicio: string;
    migaServicios: string;
    empresas: string;
    queIncluye: string;
    plazos: string;
    requisitos: string;
    preguntas: string;
    personasNaturales: string;
    irATramites: string;
  };
  nosotros: {
    miga: string;
    comoTrabajamos: string;
    reglasTitulo: string;
    equipoEtiqueta: string;
    equipoTitulo: string;
    retrato: string;
    queHacemos: string;
    queHacemosTitulo: string;
    verServicios: string;
    dondeEstamos: string;
    ubicacion: string;
    credenciales: string;
    laFirma: string;
  };
}

const ES: Textos = {
  nav: {
    inicio: 'Inicio',
    servicios: 'Servicios',
    nosotros: 'Nosotros',
    resenas: 'Reseñas',
    blog: 'Blog',
    contacto: 'Contacto',
    agendar: 'Agendar consulta',
    menu: 'Abrir menú',
  },
  pie: {
    servicios: 'Servicios',
    firma: 'Firma',
    contacto: 'Contacto',
    sobreNosotros: 'Sobre nosotros',
    resenasYCasos: 'Reseñas y casos',
    avisoLegal: 'Aviso legal',
    privacidad: 'Privacidad',
    disclaimer: 'Descargo de responsabilidad',
    contabilidad: 'Contabilidad',
    legal: 'Legal corporativo',
    tramites: 'Trámites y visas',
    eventos: 'Eventos y capacitación',
    derechos: '© 2026 Vela Nus Consultores & Asociados',
    paginaPendiente: 'Página pendiente',
  },
  home: {
    problemasTitulo: '¿Opera o quiere operar en Cuba?',
    problemasEntradilla:
      'Estos son los cuatro puntos donde se atasca el cliente extranjero. Ninguno requiere que usted aprenda la normativa cubana.',
    problemasEtiqueta: 'El problema real',
    serviciosEtiqueta: 'Servicios a empresas',
    serviciosTitulo: 'Tres líneas de servicio corporativo',
    verTodos: 'Ver todos los servicios',
    indiceServicios: 'Índice de servicios',
    verLinea: 'Ver línea →',
    verLineaCompleta: 'Ver línea completa →',
    procesoEtiqueta: 'Cómo trabajamos',
    procesoTitulo: 'Cuatro pasos, sin sorpresas de honorarios',
    procesoTituloClaro: 'Del primer mensaje a la entrega',
    procesoEntradilla:
      'Nunca ha contratado en Cuba. Esto es exactamente lo que ocurre, paso por paso.',
    resenasEtiqueta: 'Reseñas de clientes',
    resenasTitulo: 'Lo que dicen quienes ya operan con nosotros',
    resenasTituloClaro: 'Reseñas de clientes',
    dejarResena: 'Dejar una reseña',
    verResenas: 'Ver todas / dejar una reseña',
    blogEtiqueta: 'Últimas del blog',
    blogTitulo: 'Normativa cubana, explicada en claro',
    irAlBlog: 'Ir al blog',
    verEntradas: 'Ver todas las entradas',
    blogPendiente: 'Blog pendiente',
    imagenArticulo: 'imagen de artículo',
    verServicios: 'Ver servicios',
    agendarWhatsApp: 'Agendar consulta por WhatsApp',
    agendarWhatsAppCorto: 'Agendar por WhatsApp',
    respuesta24h: 'Respuesta en menos de 24 h hábiles',
    respuesta24hCorto: 'Respuesta en 24 h hábiles',
    cifrasEtiqueta: 'Vela Nus en cifras',
    idiomaAviso: 'Atención en español e inglés',
    whatsappEtiqueta: 'WhatsApp',
    correoEtiqueta: 'Correo',
  },
  formulario: {
    nombre: 'Nombre y apellidos',
    correo: 'Correo electrónico',
    pais: 'País desde el que opera',
    mensaje: 'Qué necesita resolver',
    enviar: 'Enviar consulta',
    enviando: 'Enviando…',
    recibido: 'Consulta recibida.',
    gracias: 'Le respondemos en menos de 24 h hábiles. Si prefiere no esperar, adelántenos el caso por WhatsApp.',
    adelantar: 'Adelantar por WhatsApp',
    alternativa: (whatsapp, correo) =>
      `También puede escribirnos por WhatsApp (${whatsapp}) o a ${correo}.`,
  },
  modal: {
    etiqueta: 'Asesoría institucional',
    titulo: 'Agende su diagnóstico gratuito',
    entradilla:
      'Analizamos la situación contable, legal u operativa de su empresa en Cuba y le decimos qué necesita.',
    nombre: 'Nombre completo',
    nombrePlaceholder: 'Ej. Carlos Mendoza',
    empresa: 'Empresa o proyecto',
    empresaPlaceholder: 'Ej. Habana Sol MIPYME',
    telefono: 'Teléfono / WhatsApp',
    correo: 'Correo electrónico',
    interes: 'Área de interés principal',
    comentarios: 'Comentarios adicionales',
    comentariosPlaceholder: 'Cuéntenos brevemente qué necesita…',
    enviar: 'Solicitar diagnóstico',
    enviando: 'Enviando…',
    cerrar: 'Cerrar',
    recibidoTitulo: '¡Solicitud recibida!',
    recibido: (nombre) =>
      `Gracias, ${nombre}. Le responderemos en menos de 24 h hábiles.`,
    adelantar: 'Adelantar por WhatsApp',
    volver: 'Volver al sitio',
    servicios: [
      { valor: 'Contabilidad', etiqueta: 'Contabilidad y teneduría de libros' },
      { valor: 'Legal corporativo', etiqueta: 'Asesoría legal corporativa (MIPYME, TCP, CNA, PDL)' },
      { valor: 'Trámites y visas', etiqueta: 'Trámites, documentos y visas' },
      { valor: 'Eventos', etiqueta: 'Eventos y capacitación' },
    ],
  },
  servicios: {
    migaInicio: 'Inicio',
    migaServicios: 'Servicios',
    empresas: 'Servicios a empresas',
    queIncluye: 'Qué incluye la línea',
    plazos: 'Plazos estimados',
    requisitos: 'Qué necesitamos de usted',
    preguntas: 'Preguntas frecuentes',
    personasNaturales: 'C · Personas naturales',
    irATramites: 'Ir a trámites personales',
  },
  nosotros: {
    miga: 'Sobre nosotros',
    comoTrabajamos: 'Cómo trabajamos',
    reglasTitulo: 'Tres reglas que no negociamos',
    equipoEtiqueta: 'Equipo',
    equipoTitulo: 'Quién va a llevar su caso',
    retrato: 'retrato 4:5',
    queHacemos: 'Qué hacemos',
    queHacemosTitulo: 'Cuatro líneas, un mismo equipo',
    verServicios: 'Ver servicios →',
    dondeEstamos: 'Dónde estamos',
    ubicacion: 'La Habana, Centro Habana',
    credenciales: 'Credenciales y colegiación',
    laFirma: 'La firma',
  },
};

const EN: Textos = {
  nav: {
    inicio: 'Home',
    servicios: 'Services',
    nosotros: 'About us',
    resenas: 'Reviews',
    blog: 'Blog',
    contacto: 'Contact',
    agendar: 'Book a consultation',
    menu: 'Open menu',
  },
  pie: {
    servicios: 'Services',
    firma: 'The firm',
    contacto: 'Contact',
    sobreNosotros: 'About us',
    resenasYCasos: 'Reviews and cases',
    avisoLegal: 'Legal notice',
    privacidad: 'Privacy',
    disclaimer: 'Disclaimer',
    contabilidad: 'Accounting',
    legal: 'Corporate law',
    tramites: 'Paperwork and visas',
    eventos: 'Events and training',
    derechos: '© 2026 Vela Nus Consultores & Asociados',
    paginaPendiente: 'Page not published yet',
  },
  home: {
    problemasTitulo: 'Operating in Cuba, or planning to?',
    problemasEntradilla:
      'These are the four points where foreign clients get stuck. None of them requires you to learn Cuban regulations.',
    problemasEtiqueta: 'The real problem',
    serviciosEtiqueta: 'Services for companies',
    serviciosTitulo: 'Three corporate service lines',
    verTodos: 'See all services',
    indiceServicios: 'Service index',
    verLinea: 'View line →',
    verLineaCompleta: 'View the full line →',
    procesoEtiqueta: 'How we work',
    procesoTitulo: 'Four steps, no surprises on fees',
    procesoTituloClaro: 'From first message to delivery',
    procesoEntradilla:
      'You have never hired anyone in Cuba. This is exactly what happens, step by step.',
    resenasEtiqueta: 'Client reviews',
    resenasTitulo: 'What clients already operating with us say',
    resenasTituloClaro: 'Client reviews',
    dejarResena: 'Leave a review',
    verResenas: 'See all / leave a review',
    blogEtiqueta: 'Latest from the blog',
    blogTitulo: 'Cuban regulations, explained plainly',
    irAlBlog: 'Go to the blog',
    verEntradas: 'See all posts',
    blogPendiente: 'Blog not published yet',
    imagenArticulo: 'article image',
    verServicios: 'See services',
    agendarWhatsApp: 'Book a consultation on WhatsApp',
    agendarWhatsAppCorto: 'Book on WhatsApp',
    respuesta24h: 'We reply within 24 business hours',
    respuesta24hCorto: 'Reply within 24 business hours',
    cifrasEtiqueta: 'Vela Nus in numbers',
    idiomaAviso: 'We work in Spanish and English',
    whatsappEtiqueta: 'WhatsApp',
    correoEtiqueta: 'Email',
  },
  formulario: {
    nombre: 'Full name',
    correo: 'Email address',
    pais: 'Country you operate from',
    mensaje: 'What you need solved',
    enviar: 'Send enquiry',
    enviando: 'Sending…',
    recibido: 'Enquiry received.',
    gracias:
      'We will reply within 24 business hours. If you would rather not wait, send us the details on WhatsApp.',
    adelantar: 'Continue on WhatsApp',
    alternativa: (whatsapp, correo) =>
      `You can also reach us on WhatsApp (${whatsapp}) or at ${correo}.`,
  },
  modal: {
    etiqueta: 'Institutional advice',
    titulo: 'Book your free assessment',
    entradilla:
      'We review where your company stands in Cuba — accounting, legal or operational — and tell you what you need.',
    nombre: 'Full name',
    nombrePlaceholder: 'e.g. Carlos Mendoza',
    empresa: 'Company or project',
    empresaPlaceholder: 'e.g. Habana Sol MIPYME',
    telefono: 'Phone / WhatsApp',
    correo: 'Email address',
    interes: 'Main area of interest',
    comentarios: 'Additional comments',
    comentariosPlaceholder: 'Tell us briefly what you need…',
    enviar: 'Request assessment',
    enviando: 'Sending…',
    cerrar: 'Close',
    recibidoTitulo: 'Request received',
    recibido: (nombre) => `Thank you, ${nombre}. We will reply within 24 business hours.`,
    adelantar: 'Continue on WhatsApp',
    volver: 'Back to the site',
    servicios: [
      { valor: 'Contabilidad', etiqueta: 'Accounting and bookkeeping' },
      { valor: 'Legal corporativo', etiqueta: 'Corporate legal advice (MIPYME, TCP, CNA, PDL)' },
      { valor: 'Trámites y visas', etiqueta: 'Paperwork, documents and visas' },
      { valor: 'Eventos', etiqueta: 'Events and training' },
    ],
  },
  servicios: {
    migaInicio: 'Home',
    migaServicios: 'Services',
    empresas: 'Services for companies',
    queIncluye: 'What the line covers',
    plazos: 'Estimated timelines',
    requisitos: 'What we need from you',
    preguntas: 'Frequently asked questions',
    personasNaturales: 'C · Individuals',
    irATramites: 'Go to personal paperwork',
  },
  nosotros: {
    miga: 'About us',
    comoTrabajamos: 'How we work',
    reglasTitulo: 'Three rules we do not negotiate',
    equipoEtiqueta: 'Team',
    equipoTitulo: 'Who will handle your case',
    retrato: 'portrait 4:5',
    queHacemos: 'What we do',
    queHacemosTitulo: 'Four lines, one team',
    verServicios: 'See services →',
    dondeEstamos: 'Where we are',
    ubicacion: 'Havana, Centro Habana',
    credenciales: 'Credentials and bar membership',
    laFirma: 'The firm',
  },
};

export const textos = (idioma: Idioma): Textos => (idioma === 'en' ? EN : ES);
