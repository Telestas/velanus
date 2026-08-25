import { Idioma } from '../i18n/idioma';
import { ScreenId } from '../types';

/**
 * Textos legales del sitio.
 *
 * ⚠️ BORRADOR PENDIENTE DE REVISIÓN JURÍDICA. Está redactado sobre lo que el
 * sistema hace de verdad —los campos que se guardan, dónde están alojados y
 * quién los ve—, que es la parte verificable. Lo que NO puede decidir quien
 * programa, y va marcado como pendiente, es:
 *
 *   · la base legal de cada tratamiento,
 *   · el plazo de conservación,
 *   · los datos registrales de la firma,
 *   · si además de la ley cubana aplica el RGPD, y con qué garantías se
 *     ampara la transferencia a Estados Unidos.
 *
 * El cliente es un despacho con juristas: el texto lo aprueban ellos. Hasta
 * entonces, cada página muestra el aviso de borrador en pantalla.
 *
 * Al cambiar el texto hay que subir `VERSION_AVISO`: es lo que se guarda junto
 * a cada consulta para poder demostrar qué versión aceptó cada persona.
 */

export const VERSION_AVISO = '2026-08-25';

export interface Apartado {
  titulo: string;
  /** Cada párrafo va suelto; los que empiezan por «- » se pintan como lista. */
  parrafos: string[];
}

export interface PaginaLegal {
  pantalla: ScreenId;
  titulo: string;
  entradilla: string;
  apartados: Apartado[];
}

export interface ContenidoLegal {
  aviso: string;
  actualizado: string;
  paginas: PaginaLegal[];
}

const ES: ContenidoLegal = {
  aviso:
    'BORRADOR PENDIENTE DE REVISIÓN JURÍDICA. Este texto describe con exactitud qué datos trata el sitio, pero los apartados marcados entre corchetes los tiene que completar y aprobar el equipo jurídico de la firma antes de darlo por publicado.',
  actualizado: 'Última actualización: 25 de agosto de 2026',
  paginas: [
    {
      pantalla: 'aviso-legal',
      titulo: 'Aviso legal',
      entradilla:
        'Quién está detrás de este sitio y en qué condiciones se puede usar.',
      apartados: [
        {
          titulo: 'Titular del sitio',
          parrafos: [
            'Vela Nus Consultores & Asociados, con domicilio en Infanta entre Peñalver y Sitios, Centro Habana, La Habana, Cuba.',
            'Correo de contacto: contacto@velanus.com. Teléfono y WhatsApp: +53 5 385 4623.',
            '[PENDIENTE — figura jurídica de la firma, número de inscripción registral y demás datos identificativos que exija la normativa cubana.]',
          ],
        },
        {
          titulo: 'Objeto',
          parrafos: [
            'Este sitio presenta los servicios de consultoría contable, jurídica, de gestión de trámites y de organización de eventos que presta la firma, y permite ponerse en contacto con ella.',
            'El acceso al sitio es libre y gratuito. Usarlo implica aceptar este aviso.',
          ],
        },
        {
          titulo: 'Contenidos y propiedad intelectual',
          parrafos: [
            'Los textos, la marca, el logotipo y el diseño de este sitio pertenecen a Vela Nus Consultores & Asociados, salvo indicación en contrario.',
            'Se puede citar y enlazar el contenido indicando la fuente. No se autoriza su reproducción íntegra ni su uso comercial sin permiso escrito.',
          ],
        },
        {
          titulo: 'Enlaces a otros sitios',
          parrafos: [
            'Algunos botones abren servicios de terceros —WhatsApp y LinkedIn— fuera de este sitio. Lo que ocurra allí se rige por las condiciones de esos servicios, no por las nuestras.',
          ],
        },
        {
          titulo: 'Ley aplicable',
          parrafos: [
            '[PENDIENTE — legislación aplicable y fuero para la resolución de conflictos. Lo determina el equipo jurídico.]',
          ],
        },
      ],
    },
    {
      pantalla: 'privacidad',
      titulo: 'Política de privacidad',
      entradilla:
        'Qué datos personales recoge este sitio, para qué, dónde se guardan y cómo ejercer sus derechos.',
      apartados: [
        {
          titulo: 'Responsable del tratamiento',
          parrafos: [
            'Vela Nus Consultores & Asociados, Infanta entre Peñalver y Sitios, Centro Habana, La Habana, Cuba.',
            'Para cualquier cuestión sobre sus datos: contacto@velanus.com.',
            '[PENDIENTE — designación de responsable o delegado de protección de datos, si procede.]',
          ],
        },
        {
          titulo: 'Qué datos recogemos y para qué',
          parrafos: [
            'Solo tratamos lo que usted nos escribe. No hay analítica, ni píxeles publicitarios, ni perfilado, ni cesión de datos con fines comerciales.',
            '- Formularios de consulta y de diagnóstico: nombre, empresa, teléfono, correo electrónico, país desde el que opera y el mensaje que escriba. Se usan para responder a su consulta y, si llega a serlo, para gestionar la relación como cliente.',
            '- Comentarios en el blog: nombre, correo electrónico y el texto del comentario. El correo no se publica: sirve para poder responderle.',
            '- Reseñas: nombre, país, servicio recibido, valoración y texto.',
            '- Al enviar cualquiera de esos formularios se crea una sesión anónima que asigna un identificador técnico. No lleva su nombre ni permite identificarle fuera de este sistema; sirve para atribuir cada envío y frenar abusos.',
          ],
        },
        {
          titulo: 'Qué se publica y qué no',
          parrafos: [
            'Las consultas de los formularios NUNCA se publican: solo las ve el personal autorizado de la firma.',
            'Los comentarios y las reseñas sí se publican, con el nombre y —en las reseñas— el país que usted escriba, y solo después de que un administrador los apruebe. Escriba ahí únicamente lo que quiera que se lea en público.',
            'Si quiere que retiremos un comentario o una reseña ya publicados, escríbanos y lo hacemos.',
          ],
        },
        {
          titulo: 'Base legal',
          parrafos: [
            '[PENDIENTE — base jurídica de cada tratamiento: consentimiento del interesado, medidas precontractuales a petición del interesado, o interés legítimo. Lo determina el equipo jurídico.]',
          ],
        },
        {
          titulo: 'Dónde se guardan y quién más interviene',
          parrafos: [
            'Los datos se guardan en Cloud Firestore, un servicio de Google, en servidores situados en Estados Unidos (región us-east1). El acceso está restringido por reglas de seguridad: las consultas solo pueden leerlas las cuentas administradoras de la firma.',
            'Además intervienen, sin acceder al contenido de las consultas: Cloudflare, que gestiona el dominio y filtra el tráfico, y GitHub, que aloja los archivos del sitio. Ambos registran datos técnicos de conexión, como la dirección IP.',
            'Si usted pulsa el botón de WhatsApp, la conversación pasa a ese servicio y se rige por las condiciones de Meta.',
            '[PENDIENTE — garantías que amparan la transferencia internacional de datos a Estados Unidos, si resulta aplicable el RGPD.]',
          ],
        },
        {
          titulo: 'Cuánto tiempo los conservamos',
          parrafos: [
            '[PLAZO PENDIENTE — propuesta: conservar las consultas no convertidas en encargo durante 24 meses desde el último contacto, y después borrarlas. Los comentarios y reseñas publicados se mantienen mientras el sitio esté activo o hasta que su autor pida retirarlos.]',
            'Mientras no se fije ese plazo, los datos permanecen guardados. Es una decisión pendiente, no un descuido del sistema.',
          ],
        },
        {
          titulo: 'Sus derechos',
          parrafos: [
            'Puede pedirnos acceder a sus datos, rectificarlos, suprimirlos, oponerse al tratamiento o pedir que se limite. Basta con escribir a contacto@velanus.com indicando qué solicita.',
            'Le pediremos alguna comprobación razonable de su identidad, para no entregar datos de una persona a otra.',
            '[PENDIENTE — plazo máximo de respuesta y autoridad de control ante la que reclamar.]',
          ],
        },
        {
          titulo: 'Almacenamiento en su navegador',
          parrafos: [
            'Este sitio no usa cookies de análisis ni publicitarias. Guarda dos preferencias en el almacenamiento local de su navegador, únicamente para que la página funcione como usted espera:',
            '- el idioma en el que prefiere leer el sitio,',
            '- y la variante visual elegida, si alguien la ha cambiado desde el panel de administración.',
            'Puede borrarlas en cualquier momento desde la configuración de su navegador. No se comparten con nadie.',
          ],
        },
        {
          titulo: 'Menores',
          parrafos: [
            '[PENDIENTE — edad mínima para usar los formularios y tratamiento aplicable a menores.]',
          ],
        },
      ],
    },
    {
      pantalla: 'descargo',
      titulo: 'Descargo de responsabilidad',
      entradilla:
        'Qué es y qué no es la información que publicamos en este sitio.',
      apartados: [
        {
          titulo: 'El contenido es informativo, no asesoría',
          parrafos: [
            'Los artículos del blog, las preguntas frecuentes y las descripciones de servicio de este sitio son información general. No constituyen asesoría jurídica, contable ni fiscal para ningún caso concreto.',
            'La normativa cubana cambia, y dos situaciones que parecen iguales pueden tener respuestas distintas. Antes de tomar una decisión, consulte su caso con nosotros o con otro profesional.',
          ],
        },
        {
          titulo: 'Escribirnos no le convierte en cliente',
          parrafos: [
            'Enviar un formulario o un mensaje por WhatsApp no crea por sí solo una relación profesional ni obliga a la firma a asumir su asunto. La relación empieza cuando ambas partes lo acuerdan por escrito.',
            'Por eso, no envíe por el formulario documentación confidencial ni datos sensibles de un asunto en curso. Cuéntenos lo justo para poder orientarle, y ya acordaremos por qué vía tratar el resto.',
          ],
        },
        {
          titulo: 'Plazos y resultados',
          parrafos: [
            'Los plazos que indicamos ante registros, bancos e instituciones cubanas son estimaciones basadas en nuestra experiencia. No dependen de la firma y pueden variar.',
            'En materia de visas, la decisión es siempre del consulado correspondiente. Nadie puede garantizar su concesión; lo que garantizamos es un expediente completo, correcto y presentado a tiempo.',
          ],
        },
        {
          titulo: 'Enlaces y contenido de terceros',
          parrafos: [
            'Cuando enlazamos a un sitio externo lo hacemos por su interés informativo. No respondemos de su contenido ni de sus cambios.',
          ],
        },
      ],
    },
  ],
};

const EN: ContenidoLegal = {
  aviso:
    'DRAFT PENDING LEGAL REVIEW. This text accurately describes what data the site processes, but the sections in brackets must be completed and approved by the firm’s legal team before it can be considered published.',
  actualizado: 'Last updated: 25 August 2026',
  paginas: [
    {
      pantalla: 'aviso-legal',
      titulo: 'Legal notice',
      entradilla: 'Who is behind this site and on what terms it may be used.',
      apartados: [
        {
          titulo: 'Site owner',
          parrafos: [
            'Vela Nus Consultores & Asociados, at Infanta between Peñalver and Sitios, Centro Habana, Havana, Cuba.',
            'Contact email: contacto@velanus.com. Phone and WhatsApp: +53 5 385 4623.',
            '[PENDING — the firm’s legal form, registration number and any other identifying details required under Cuban law.]',
          ],
        },
        {
          titulo: 'Purpose',
          parrafos: [
            'This site presents the accounting, legal, paperwork and event services the firm provides, and lets you get in touch.',
            'Access is free of charge. Using the site means accepting this notice.',
          ],
        },
        {
          titulo: 'Content and intellectual property',
          parrafos: [
            'The texts, brand, logo and design of this site belong to Vela Nus Consultores & Asociados unless stated otherwise.',
            'You may quote and link to the content citing the source. Reproducing it in full or using it commercially requires written permission.',
          ],
        },
        {
          titulo: 'Links to other sites',
          parrafos: [
            'Some buttons open third-party services — WhatsApp and LinkedIn — outside this site. What happens there is governed by those services’ terms, not ours.',
          ],
        },
        {
          titulo: 'Governing law',
          parrafos: [
            '[PENDING — applicable law and jurisdiction for disputes. To be determined by the legal team.]',
          ],
        },
      ],
    },
    {
      pantalla: 'privacidad',
      titulo: 'Privacy policy',
      entradilla:
        'What personal data this site collects, what for, where it is stored and how to exercise your rights.',
      apartados: [
        {
          titulo: 'Data controller',
          parrafos: [
            'Vela Nus Consultores & Asociados, Infanta between Peñalver and Sitios, Centro Habana, Havana, Cuba.',
            'For anything concerning your data: contacto@velanus.com.',
            '[PENDING — appointment of a data protection officer, if applicable.]',
          ],
        },
        {
          titulo: 'What we collect and what for',
          parrafos: [
            'We only process what you write to us. There is no analytics, no advertising pixels, no profiling and no sharing of data for commercial purposes.',
            '- Enquiry and assessment forms: name, company, phone, email, the country you operate from, and the message you write. Used to answer your enquiry and, if it becomes one, to manage the client relationship.',
            '- Blog comments: name, email and the comment text. The email is not published: it lets us reply to you.',
            '- Reviews: name, country, service received, rating and text.',
            '- Sending any of those forms creates an anonymous session with a technical identifier. It does not carry your name and cannot identify you outside this system; it attributes each submission and helps curb abuse.',
          ],
        },
        {
          titulo: 'What is published and what is not',
          parrafos: [
            'Form enquiries are NEVER published: only authorised staff at the firm can read them.',
            'Comments and reviews are published, with the name and — for reviews — the country you write, and only after an administrator approves them. Write there only what you want read in public.',
            'If you want a published comment or review withdrawn, write to us and we will remove it.',
          ],
        },
        {
          titulo: 'Legal basis',
          parrafos: [
            '[PENDING — legal basis for each processing activity: consent, pre-contractual steps at the data subject’s request, or legitimate interest. To be determined by the legal team.]',
          ],
        },
        {
          titulo: 'Where the data is stored and who else is involved',
          parrafos: [
            'Data is stored in Cloud Firestore, a Google service, on servers located in the United States (region us-east1). Access is restricted by security rules: enquiries can only be read by the firm’s administrator accounts.',
            'Also involved, without access to the content of enquiries: Cloudflare, which manages the domain and filters traffic, and GitHub, which hosts the site files. Both log technical connection data such as the IP address.',
            'If you press the WhatsApp button, the conversation moves to that service and is governed by Meta’s terms.',
            '[PENDING — safeguards covering the international transfer of data to the United States, if the GDPR applies.]',
          ],
        },
        {
          titulo: 'How long we keep it',
          parrafos: [
            '[RETENTION PENDING — proposal: keep enquiries that do not become engagements for 24 months from the last contact, then delete them. Published comments and reviews stay while the site is live or until their author asks for removal.]',
            'Until that period is set, data remains stored. It is a pending decision, not an oversight in the system.',
          ],
        },
        {
          titulo: 'Your rights',
          parrafos: [
            'You may ask us to access, rectify, erase, restrict or object to the processing of your data. Just write to contacto@velanus.com saying what you need.',
            'We will ask for reasonable proof of identity, so as not to hand one person’s data to another.',
            '[PENDING — maximum response time and the supervisory authority to complain to.]',
          ],
        },
        {
          titulo: 'Storage in your browser',
          parrafos: [
            'This site uses no analytics or advertising cookies. It stores two preferences in your browser’s local storage, solely so the page behaves as you expect:',
            '- the language you prefer to read the site in,',
            '- and the visual variant selected, if someone has changed it from the admin panel.',
            'You can clear them at any time from your browser settings. They are not shared with anyone.',
          ],
        },
        {
          titulo: 'Minors',
          parrafos: [
            '[PENDING — minimum age to use the forms and how minors’ data is handled.]',
          ],
        },
      ],
    },
    {
      pantalla: 'descargo',
      titulo: 'Disclaimer',
      entradilla: 'What the information on this site is, and what it is not.',
      apartados: [
        {
          titulo: 'The content is informative, not advice',
          parrafos: [
            'The blog articles, frequently asked questions and service descriptions on this site are general information. They do not constitute legal, accounting or tax advice for any specific case.',
            'Cuban regulations change, and two situations that look alike can have different answers. Before deciding, discuss your case with us or with another professional.',
          ],
        },
        {
          titulo: 'Writing to us does not make you a client',
          parrafos: [
            'Sending a form or a WhatsApp message does not by itself create a professional relationship or oblige the firm to take on your matter. The relationship begins when both parties agree in writing.',
            'For that reason, do not send confidential documentation or sensitive details of an ongoing matter through the form. Tell us just enough for us to point you in the right direction, and we will agree how to handle the rest.',
          ],
        },
        {
          titulo: 'Timelines and outcomes',
          parrafos: [
            'The timelines we give for registries, banks and Cuban institutions are estimates based on our experience. They are not up to the firm and may vary.',
            'On visas, the decision always rests with the relevant consulate. Nobody can guarantee approval; what we guarantee is a complete, correct application filed on time.',
          ],
        },
        {
          titulo: 'Third-party links and content',
          parrafos: [
            'When we link to an external site we do so for its informational value. We are not responsible for its content or its changes.',
          ],
        },
      ],
    },
  ],
};

export const contenidoLegal = (idioma: Idioma): ContenidoLegal =>
  idioma === 'en' ? EN : ES;

export const paginaLegal = (idioma: Idioma, pantalla: ScreenId) =>
  contenidoLegal(idioma).paginas.find((pagina) => pagina.pantalla === pantalla);
