# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm install
npm run dev      # Vite dev server en http://localhost:3000 (--host 0.0.0.0)
npm run lint     # tsc --noEmit — es el único "linter" del proyecto (no hay ESLint)
npm run build    # build de producción en dist/
npm run preview  # sirve dist/ respetando el base path
```

No hay framework de tests ni suite de pruebas. La verificación antes de commitear
es `npm run lint && npm run build`.

## Qué es esto

Landing estática de una consultoría (React 19 + TypeScript + Vite + Tailwind v4).
Sin backend, sin llamadas a APIs externas y sin variables de entorno propias
(`DISABLE_HMR`, que lee `vite.config.ts`, la inyecta AI Studio).

El proyecto salió de Google AI Studio y quedan artefactos de ese origen:
`metadata.json`, `assets/.aistudio/` y comentarios `xpath:` en el JSX de
`HomeDesktopScreen` / `HomeMovilScreen` que describen elementos que un arnés de
verificación externo esperaba encontrar. No son requisitos actuales, pero
conviene no romperlos sin motivo.

## Arquitectura

### Pantallas, no componentes de página

Cada pantalla es un componente autocontenido que renderiza la página **entera**,
cabecera y pie incluidos. `App.tsx` no aporta layout: solo resuelve qué pantalla
toca, la anima con `motion` y monta `DiagnosticModal`. Todas reciben el mismo
contrato `NavigationProps` (`currentScreen`, `onNavigate`, `openDiagnosticModal`).

`home-movil` no es la versión responsive de `home-desktop`: es una maqueta
aparte que dibuja un marco de teléfono con barra de estado simulada y usa los
textos cortos que trae la maqueta de 390 px.

`CasosDesktopScreen` es la única que sigue usando `SiteHeader` y `SiteFooter`
(el lenguaje visual antiguo). Las pantallas rediseñadas —home, Servicios y
Nosotros— usan `src/components/marca/`: `CabeceraSitio`, `PieSitio` y las
piezas de `piezas.tsx` (miga de pan, banda CTA, titulares de sección).

### Tono: una retícula, dos paletas

Servicios y Nosotros son en la maqueta la misma retícula pintada con dos
paletas, así que se pintan **una vez** y reciben la paleta desde
`src/components/marca/paleta.ts` (`paletaDe(variante)`). Cambiar un color es
cambiarlo ahí, no en cada pantalla.

Ojo con Tailwind: las clases se descubren escaneando el código fuente, así que
una clase compuesta en tiempo de ejecución (`` hover:${paleta.acentoTexto} ``)
no se genera nunca. Por eso la paleta lleva `acentoHover` aparte.

Las cuatro subpáginas de servicio (`servicios/contabilidad`, `/legal`,
`/tramites-y-visas`, `/eventos`) comparten estructura, así que las pinta una
sola plantilla —`servicios/LineaScreen.tsx`— con los datos de
`src/content/servicios.ts`. Añadir una línea es añadir un objeto ahí, su
`ScreenId` y su entrada en `SCREENS`.

### La home tiene dos direcciones visuales

El diseño entregó dos direcciones completas para la home y las dos están
implementadas, en escritorio y en móvil:

- `oscuro` (1a): portada negra a página completa, cifras sobre banda ámbar,
  servicios en tarjetas, proceso vertical.
- `claro` (1b): portada clara y editorial con las cifras en panel negro,
  problemas sobre negro, servicios en filas, proceso horizontal.

`HomeDesktopScreen` y `HomeMovilScreen` ya no pintan nada: solo eligen variante
y delegan en `src/components/home/`. Cuál se pinta lo decide `src/theme.ts`, en
este orden: `?tema=claro|oscuro` en la URL → lo elegido en /admin (localStorage
de ese navegador) → `DEFAULT_HOME_VARIANT`.

**Cambiar lo que ven todos los visitantes es cambiar `DEFAULT_HOME_VARIANT` y
desplegar.** /admin no publica nada: el sitio es estático y no hay dónde
guardar la elección; sirve para enseñar una u otra dirección. La propia pantalla
lo dice, no quitar ese aviso.

Los textos de la home viven en `src/content/home.ts`, no en el JSX: la misma
home se pinta cuatro veces (dos direcciones × escritorio/móvil) y así no se
desincronizan. Las variantes móviles usan los campos `…Movil`.

### Routing

`src/router.ts` es un router propio sobre la History API (no hay `react-router`).
`ScreenId` en `src/types.ts` es la fuente de verdad; el router mapea cada id a un
slug y `SCREEN_ORDER` decide solo hacia qué lado anima la transición.

**Añadir una pantalla exige tocar cinco sitios**, y TypeScript solo avisa de los
dos primeros:

1. `ScreenId` en `src/types.ts`
2. `SCREEN_SLUGS` y `SCREEN_ORDER` en `src/router.ts`
3. el mapa `SCREENS` en `src/App.tsx`
4. `TABS` en `PrototypeController.tsx`
5. `NAV_LINKS` / `FOOTER_LINKS` en `SiteHeader.tsx` / `SiteFooter.tsx`, si va en el
   menú de las pantallas interiores, y `NAV_HOME` / `PIE_*` en
   `src/components/home/comunes.tsx` si va en el de la home

`admin` (la pantalla de apariencia) está a propósito fuera de los menús del
sitio: solo se llega por /admin o por la barra de prototipo.

Los enlaces de navegación son `<a href>` reales con `preventDefault()` en el
`onClick`; mantener ese patrón (permite clic central y copiar dirección).

### Base path y GitHub Pages

El sitio se publica en el dominio propio **velanus.com**, así que
`base: '/'` en `vite.config.ts` y `public/CNAME` contiene `velanus.com`. El
dominio está en Cloudflare (DNS proxied) apuntando a GitHub Pages, y el custom
domain está fijado en la configuración de Pages del repo. El router calcula todo
a partir de `import.meta.env.BASE_URL`, así que **si cambia el dominio hay que
tocar `vite.config.ts`, `public/CNAME` y el ajuste de Pages**.

TLS lo termina Cloudflare; GitHub no emite certificado para el dominio (por eso
`https_enforced` está en `false` en la API de Pages). El redirect a HTTPS y el
modo SSL se gestionan desde Cloudflare, no desde GitHub.

Pages es estático y no sabe de rutas: el plugin `spaFallback` copia `index.html`
a `404.html` al terminar el build para que los deep links arranquen la SPA.
Consecuencia conocida y aceptada: `/servicios` y demás rutas **renderizan bien
pero responden con HTTP 404**. Si el SEO de esas páginas pasa a importar, la
salida es un hosting con rewrites o generar HTML por ruta.

### Contenido

El texto de las pantallas rediseñadas está en `src/content/`: `home.ts`,
`servicios.ts` y `nosotros.ts`. El de `CasosDesktopScreen` sigue hardcodeado en
el JSX; `ServiceItem` y `Testimonial` existen en
`types.ts` pero no los usa nadie — si se externaliza ese contenido, ahí está el
punto de partida.

Los datos de contacto están centralizados en `src/config.ts` (`WHATSAPP_NUMBER`,
`whatsappLink()`, `mailtoLink()`, email, ciudad, dirección, horario). No volver a
escribir un `wa.me/...` ni una dirección a mano en las pantallas.

La marca sale del manual del cliente: negro `#000000`, ámbar `#F9A600` y
`#FAFAFA`. Los demás grises son derivados documentados en la maqueta; `#8A5800`
es el ámbar oscurecido para texto y enlaces sobre claro (el ámbar del manual da
2,1:1 y no pasa AA). La tipografía es Caladea (sustituta métrica de Cambria),
aplicada con la clase `.font-marca`; el resto del sitio sigue en Inter/Playfair.
Los logos están en `public/` y se referencian vía `import.meta.env.BASE_URL`.

## Estado del proyecto

Es un prototipo en curso, no un sitio terminado. Al tocar estas zonas, tenerlo
presente:

- `NosotrosDesktopScreen` y `CasosDesktopScreen` son **borradores**: textos,
  cifras y testimonios son inventados y están marcados como tales con avisos en
  pantalla y comentarios `BORRADOR` en el código. No presentarlos como reales ni
  quitar esos avisos sin que el cliente valide el contenido.
- `PrototypeController` es andamiaje de prototipo (salta entre pantallas) y sigue
  visible en producción.
- El panel de /admin ya escribe en Firestore (artículos, preguntas y moderación
  de comentarios), pero **el sitio público todavía no lee de ahí**: el blog de la
  home sigue mostrando los marcadores de la maqueta y no existe la ruta
  `/blog/{slug}` ni el formulario de comentarios. Es lo siguiente.
- Home, Servicios (índice y cuatro subpáginas) y Nosotros están rediseñadas con
  el manual de marca. **`CasosDesktopScreen`, `SiteHeader`, `SiteFooter` y
  `DiagnosticModal` siguen con el lenguaje visual anterior** (verde/dorado,
  Playfair). Entrar en Casos desde cualquier otra pantalla se nota. Es lo
  siguiente.
- Las pantallas rediseñadas están llenas de marcadores que el cliente aún no ha
  rellenado y que **no hay que inventar**: cifras, reseñas y entradas del blog en
  la home; `[PLAZO PENDIENTE]` y varias respuestas de las FAQ en Servicios;
  historia de la firma, equipo, cifras y credenciales en Nosotros. El conmutador
  ES/EN está dibujado pero no hay versión en inglés.
- Sin navegador en el entorno de desarrollo, la verificación que se hace es
  renderizar cada pantalla con `renderToString` sobre un build SSR temporal
  (`vite build --ssr`) y comprobar el HTML. Detecta que no revientan y que el
  contenido sale; no sustituye mirar la maqueta en un navegador real.
- El formulario de contacto de la home no hace POST: compone la consulta y abre
  WhatsApp con el texto redactado, y lo avisa bajo el botón. Es un desvío
  deliberado de la maqueta, que dibujaba un envío convencional.
- El formulario de `DiagnosticModal` no envía nada: solo cambia a estado
  "enviado" en local. El botón de WhatsApp sí funciona.
- Las imágenes de `ServiciosDesktopScreen` apuntan a URLs temporales de AI Studio
  (`lh3.googleusercontent.com/aida-public/...`) que pueden caducar.

## Firebase

El proyecto es `velanus-12056` (plan Spark, gratuito). El **frontend sigue en
GitHub Pages**; de Firebase se usan solo Firestore y Authentication.

- `firestore.rules` es el backend. No hay API propia ni servidor: el navegador
  habla directo con Firestore y **las reglas son lo único que protege los
  datos**. Ocultar un botón en React no protege nada; si algo no puede pasar,
  tiene que estar prohibido en las reglas.
- Ser admin = tener un documento en `admins/{uid}`. Esa colección **no se puede
  escribir desde el navegador**, ni siendo admin: se siembra con
  `node scripts/alta-admin.mjs correo@ejemplo.com`, que usa el token de
  `firebase login`. Así nadie se asciende a sí mismo.
- Colecciones: `entradas` (blog), `preguntas` (FAQ), `comentarios`, `admins`.
- El SDK se carga con `import()` dinámico desde `src/firebase.ts`: pesa ~170 kB
  gzip y no debe caer en el bundle de la home. No importarlo de forma estática.
- La configuración web de `src/firebase.ts` **no es secreta** (es pública por
  diseño en Firebase); no tratarla como una credencial ni moverla a variables
  de entorno pensando que así se protege algo.

Límites del plan Spark que condicionan el diseño:

- **Cloud Functions exige Blaze.** No hay código en servidor: ni moderación
  automática de comentarios, ni límites de frecuencia, ni envío de correos.
  Los comentarios se validan solo por forma (sesión anónima obligatoria, campos
  exactos, longitudes) y se moderan a posteriori desde el panel. **App Check
  está pendiente** y es la defensa que falta contra bots.
- **Cloud Storage pide facturación**, así que las imágenes de los artículos van
  en el repo o en un servicio externo, no en Firebase.
- Si algún día hace falta código en servidor, el hueco gratis es Cloudflare
  Workers (el dominio ya pasa por Cloudflare), no subir a Blaze.

Activar Authentication la primera vez **solo se puede hacer desde la consola**
(la API la rechaza en Spark: la ruta de Identity Platform pide facturación).

## Despliegue

Push a `main` dispara `.github/workflows/deploy.yml` (lint → build →
`deploy-pages`). Pages está configurado con origen *GitHub Actions*; no hay que
tocar Settings. Verificar un despliegue con `gh run watch` y luego curl a
https://velanus.com/.
