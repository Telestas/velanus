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
- `npm test` — pruebas automáticas de rutas y formularios
- `npm run build` — build de producción en `dist/`
- `npm run preview` — sirve el build local
- `npm run backup` — copia las colecciones de Firestore a `backups/`

No hace falta ningún archivo `.env`: el proyecto no usa variables de entorno.

La copia de Firestore requiere haber ejecutado `firebase login`. Los archivos
generados pueden contener datos personales, se crean con permisos `0600` y la
carpeta `backups/` está excluida de Git. Para elegir otra ubicación:

```bash
npm run backup -- --output /ruta/segura/velanus-firestore.json
```

## Rutas

Cada pantalla tiene su propia URL, resuelta por un router mínimo sobre la
History API ([`src/router.ts`](src/router.ts)):

| Ruta | Pantalla |
| --- | --- |
| `/` | Home (escritorio) |
| `/movil` | Home (maqueta móvil) |
| `/servicios` | Servicios |
| `/nosotros` | Nosotros — *borrador* |

En producción cuelgan de `/velanus/`. El build copia `index.html` a `404.html`
para que Pages sirva la SPA al entrar directo a una ruta o recargarla.

## Despliegue

Cada push a `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que compila y publica en GitHub Pages.

El `base` de Vite está fijado a `/velanus/` porque Pages sirve el sitio bajo ese
subpath. Si se configura un dominio propio, hay que cambiarlo a `/` en
[`vite.config.ts`](vite.config.ts).

## Pendiente antes de considerarlo producción

- La página Nosotros todavía contiene textos y cifras que hay que validar con
  el cliente antes de publicar.
- La barra `PrototypeController` es andamiaje de prototipo y sigue visible.
- Las imágenes apuntan a URLs temporales de AI Studio; conviene bajarlas al repo.
- El formulario de diagnóstico no envía datos a ningún sitio.
