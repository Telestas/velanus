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

`ServiciosDesktopScreen`, `NosotrosDesktopScreen` y `CasosDesktopScreen`
comparten `SiteHeader` y `SiteFooter`, que resuelven solos el enlace activo a
partir de `currentScreen`. Las pantallas de la home **no** los usan: llevan su
propia cabecera y su propio pie, como en la maqueta.

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

El texto de la home está en `src/content/home.ts`. El de las pantallas
interiores sigue hardcodeado en el JSX; `ServiceItem` y `Testimonial` existen en
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
- La home está rediseñada con el manual de marca; **`ServiciosDesktopScreen`,
  `NosotrosDesktopScreen`, `CasosDesktopScreen`, `SiteHeader`, `SiteFooter` y
  `DiagnosticModal` siguen con el lenguaje visual anterior** (verde/dorado,
  Playfair). Ir de la home a cualquier interior se nota. Es lo siguiente.
- La home trae marcadores que el cliente aún no ha rellenado y que no hay que
  inventar: cifras (`[DATO PENDIENTE]`), reseñas, entradas del blog y el horario
  de atención. El conmutador ES/EN está dibujado pero no hay versión en inglés.
- El formulario de contacto de la home no hace POST: compone la consulta y abre
  WhatsApp con el texto redactado, y lo avisa bajo el botón. Es un desvío
  deliberado de la maqueta, que dibujaba un envío convencional.
- El formulario de `DiagnosticModal` no envía nada: solo cambia a estado
  "enviado" en local. El botón de WhatsApp sí funciona.
- Las imágenes de `ServiciosDesktopScreen` apuntan a URLs temporales de AI Studio
  (`lh3.googleusercontent.com/aida-public/...`) que pueden caducar.

## Despliegue

Push a `main` dispara `.github/workflows/deploy.yml` (lint → build →
`deploy-pages`). Pages está configurado con origen *GitHub Actions*; no hay que
tocar Settings. Verificar un despliegue con `gh run watch` y luego curl a
https://velanus.com/.
