# Vela Nus

Sitio de consultoría corporativa y gestión administrativa para empresas en Cuba.

**En vivo:** https://velanus.com/

Front estático (React 19 + TypeScript + Vite + Tailwind v4) con Firebase Auth,
Firestore y App Check para el blog, los formularios y la administración.

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

## Imágenes del blog

En `/admin` se puede subir una foto JPG, PNG o WebP para cada artículo, pegar una URL o dejarlo sin imagen. El navegador convierte las fotos subidas a WebP y las limita a 350 KiB. Cada foto se guarda en un documento separado de Firestore (`imagenes`), mientras que el artículo conserva solo su referencia; al reemplazar o borrar un artículo se intenta borrar también la foto anterior. Hay que desplegar `firestore.rules` antes de usar la subida en producción.

Esta opción funciona con las cuotas gratuitas de Firestore, pero cada foto ocupa almacenamiento y su carga cuenta como lectura y transferencia. Para una biblioteca grande o mucho tráfico, conviene migrar las imágenes a almacenamiento de objetos. Firebase Storage exige el plan Blaze con facturación habilitada, aunque incluye una cuota sin cargo.

## Rutas

Cada pantalla tiene su propia URL, resuelta por un router mínimo sobre la
History API ([`src/router.ts`](src/router.ts)):

| Ruta | Pantalla |
| --- | --- |
| `/` | Home (escritorio) |
| `/movil` | Home (maqueta móvil) |
| `/servicios` | Servicios |
| `/nosotros` | Nosotros — *borrador* |

En producción cuelgan del dominio raíz. El build copia `index.html` a `404.html`
para que Pages sirva la SPA al entrar directo a una ruta o recargarla.

## Despliegue

Las etiquetas `v*` en `main` disparan [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que compila y publica en GitHub Pages. Los pushes a `main` solo ejecutan CI.

El `base` de Vite está fijado a `/` para el dominio propio; `public/CNAME` contiene
`velanus.com`. Si se quita el dominio, hay que revisar ambos ajustes.

## Pendiente antes de considerarlo producción

- La página Nosotros todavía contiene textos y cifras que hay que validar con
  el cliente antes de publicar.
- La barra `PrototypeController` es andamiaje de prototipo y sigue visible.
- Las imágenes apuntan a URLs temporales de AI Studio; conviene bajarlas al repo.
- El formulario de diagnóstico no envía datos a ningún sitio.
