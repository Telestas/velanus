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
aparte que dibuja un marco de teléfono con barra de estado simulada. Un cambio de
contenido en la home hay que replicarlo en ambas.

Las cuatro pantallas de escritorio comparten `SiteHeader` y `SiteFooter`, que
resuelven solos el enlace activo a partir de `currentScreen`.

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
5. `NAV_LINKS` / `FOOTER_LINKS` en `SiteHeader.tsx` / `SiteFooter.tsx`, si va en el menú

Los enlaces de navegación son `<a href>` reales con `preventDefault()` en el
`onClick`; mantener ese patrón (permite clic central y copiar dirección).

### Base path y GitHub Pages

`base: '/velanus/'` en `vite.config.ts` está atado al nombre del repo, porque
Pages sirve el sitio en `telestas.github.io/velanus/`. El router calcula todo a
partir de `import.meta.env.BASE_URL`, así que **si cambia el base (dominio propio,
repo renombrado) solo hay que tocar `vite.config.ts`**.

Pages es estático y no sabe de rutas: el plugin `spaFallback` copia `index.html`
a `404.html` al terminar el build para que los deep links arranquen la SPA.
Consecuencia conocida y aceptada: `/servicios` y demás rutas **renderizan bien
pero responden con HTTP 404**. Si el SEO de esas páginas pasa a importar, la
salida es un hosting con rewrites o generar HTML por ruta.

### Contenido

Todo el texto está hardcodeado en el JSX. `ServiceItem` y `Testimonial` existen
en `types.ts` pero no los usa nadie — si se externaliza el contenido, ese es el
punto de partida.

Los datos de contacto sí están centralizados en `src/config.ts`
(`WHATSAPP_NUMBER`, `whatsappLink()`, email, ciudad). No volver a escribir un
`wa.me/...` a mano en las pantallas.

## Estado del proyecto

Es un prototipo en curso, no un sitio terminado. Al tocar estas zonas, tenerlo
presente:

- `NosotrosDesktopScreen` y `CasosDesktopScreen` son **borradores**: textos,
  cifras y testimonios son inventados y están marcados como tales con avisos en
  pantalla y comentarios `BORRADOR` en el código. No presentarlos como reales ni
  quitar esos avisos sin que el cliente valide el contenido.
- `PrototypeController` es andamiaje de prototipo (salta entre pantallas) y sigue
  visible en producción.
- El formulario de `DiagnosticModal` no envía nada: solo cambia a estado
  "enviado" en local. El botón de WhatsApp sí funciona.
- Las imágenes de `ServiciosDesktopScreen` apuntan a URLs temporales de AI Studio
  (`lh3.googleusercontent.com/aida-public/...`) que pueden caducar.

## Despliegue

Push a `main` dispara `.github/workflows/deploy.yml` (lint → build →
`deploy-pages`). Pages está configurado con origen *GitHub Actions*; no hay que
tocar Settings. Verificar un despliegue con `gh run watch` y luego curl a
https://telestas.github.io/velanus/.
