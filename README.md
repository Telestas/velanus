# Vela Nus

Sitio de consultoría corporativa y gestión administrativa para empresas en Cuba.

**En vivo:** https://telestas.github.io/velanus/

Prototipo de front estático (React 19 + TypeScript + Vite + Tailwind v4). No tiene
backend ni llamadas a APIs externas.

## Desarrollo local

**Requisitos:** Node.js 22+

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

- `npm run lint` — typecheck con `tsc --noEmit`
- `npm run build` — build de producción en `dist/`
- `npm run preview` — sirve el build local

No hace falta ningún archivo `.env`: el proyecto no usa variables de entorno.

## Despliegue

Cada push a `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que compila y publica en GitHub Pages.

El `base` de Vite está fijado a `/velanus/` porque Pages sirve el sitio bajo ese
subpath. Si se configura un dominio propio, hay que cambiarlo a `/` en
[`vite.config.ts`](vite.config.ts).

## Pendiente antes de considerarlo producción

- El número de WhatsApp es un placeholder (`5350000000`) en `src/components/DiagnosticModal.tsx`.
- La barra `PrototypeController` es andamiaje de prototipo y sigue visible.
- Las imágenes apuntan a URLs temporales de AI Studio; conviene bajarlas al repo.
- El formulario de diagnóstico no envía datos a ningún sitio.
