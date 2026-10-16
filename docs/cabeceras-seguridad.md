# Cabeceras de seguridad

Cloudflare Pages aloja el frontend y permite configurar cabeceras con un archivo
`public/_headers`. La configuración siguiente describe la política prevista,
pero **no está activa todavía**: el 15 de octubre de 2026 solo se comprobaron
`X-Content-Type-Options` y `Referrer-Policy`, añadidas por defecto por Pages.
Antes de aplicar CSP y HSTS hay que probar el blog, Firebase App Check y el
panel de administración en el dominio de producción.

## 1. Regla de cabeceras (Cloudflare → Rules → Transform Rules → Modify Response Header)

Crear una regla llamada `Cabeceras de seguridad`, aplicada a **todas las
peticiones entrantes**, que añada (*Set static*) estas cinco cabeceras:

| Cabecera | Valor |
| --- | --- |
| `Content-Security-Policy` | *(ver abajo, es larga)* |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `X-Frame-Options` | `DENY` |

### Content-Security-Policy

```
default-src 'self'; script-src 'self' https://static.cloudflareinsights.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseappcheck.googleapis.com https://content-firebaseappcheck.googleapis.com https://www.google.com/recaptcha/; frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

Por qué cada parte, para poder mantenerla:

- **`script-src`** — todo el JavaScript propio se sirve desde el propio
  dominio; no hay CDN. La única excepción es
  `https://static.cloudflareinsights.com`, el beacon de Cloudflare Web Analytics
  (ver §3), y los scripts de reCAPTCHA Enterprise que usa Firebase App Check.
  El JSON-LD de `index.html` no es JavaScript ejecutable, así que no lo bloquea.
- **`style-src` con `'unsafe-inline'`** — React escribe dos atributos `style` en
  línea (la altura del logo). Sin esto, el logo se descoloca. Quitando esos dos
  casos se podría endurecer.
- **`font-src 'self'`** — las fuentes están autoalojadas en `/fonts`.
- **`img-src` con `data:`** — las fotos subidas desde el panel se guardan en
  Firestore como WebP y se muestran como URL de datos. `https:` se conserva para
  imágenes externas de artículos anteriores; puede retirarse cuando se migren.
- **`connect-src`** — los hosts con los que habla el sitio:
  Firestore (contenido y formularios), Identity Toolkit (sesión anónima al
  enviar algo y acceso al panel), Secure Token (renovación de sesión del panel)
  y Firebase App Check/reCAPTCHA Enterprise (tokens contra abuso).
  La analítica **no** aparece aquí a propósito: con inyección automática el
  beacon manda las medidas a `/cdn-cgi/rum`, que es el mismo origen y lo cubre
  `'self'`. Si algún día se embebe el script a mano en `index.html`, pasa a
  mandarlas a `https://cloudflareinsights.com` y **hay que añadir ese host**.
- **`frame-ancestors 'none'`** — nadie puede meter el sitio en un iframe.
  `X-Frame-Options: DENY` es lo mismo para navegadores antiguos.
- **`frame-src`** — permite únicamente el marco invisible de reCAPTCHA
  Enterprise que genera las acreditaciones de App Check.

**Si se añade cualquier cosa externa** —analítica, un mapa, un vídeo incrustado,
un tipo de letra de un CDN— hay que añadir su host aquí o dejará de cargar
**en silencio**. Es el precio de tener CSP, y merece la pena.

## 2. HSTS (Cloudflare → SSL/TLS → Edge Certificates → HSTS)

Activar con: `max-age` de 6 meses, incluir subdominios, y **sin preload** de
momento.

⚠️ HSTS obliga al navegador a usar HTTPS durante ese plazo y **no se puede
revertir rápido**: si el sitio quedara sin certificado válido, los visitantes que
ya lo hubieran cargado no podrían entrar hasta que expire. Con el certificado de
Cloudflare gestionado no es un riesgo real, pero por eso se deja `preload`
desactivado hasta que el montaje lleve un tiempo estable.

## 3. Analítica (Cloudflare → Web Analytics)

Se activa **desde el panel de Cloudflare, con inyección automática**, no desde
el repositorio: así el beacon no entra en el bundle y se puede quitar sin
desplegar. Es gratis, no usa cookies y no guarda la IP del visitante, por eso el
sitio no necesita banner de consentimiento.

Lo único que hay que tocar aquí es `script-src`, como se explica arriba.

Sus límites, para no buscar en el panel lo que nunca va a estar: **no hay
eventos personalizados ni embudos**, **no registra las query strings** (así que
las campañas por UTM no se ven, aunque los *referrers* sí), muestrea el tráfico
en periodos de más de 24 h y retiene 6 meses.

La otra mitad del embudo —cuántas de esas visitas acaban en consulta— no sale de
aquí: se calcula en la pestaña «Analítica» de /admin agregando la colección
`consultas` de Firestore, que ya guarda `origen` y `creado` en cada envío.

**Al activarlo hay que revisar la política de privacidad.** El texto de
`src/content/legal.ts` describe esta medición y `VERSION_AVISO` se subió por
ello; si se desactiva la analítica, hay que quitar esos párrafos y volver a
subir la versión.

## 4. Comprobación

```bash
curl -sI https://velanus.com/ | grep -iE "content-security|x-content-type|referrer-policy|permissions-policy|x-frame|strict-transport"
```

Y después, **en un navegador**, con la consola abierta:

1. La home, Servicios y el blog: no debe salir ningún error de CSP.
2. `/admin`: iniciar sesión, abrir Consultas y guardar algo. Es la parte que más
   hosts usa (Identity Toolkit y Secure Token) y donde primero se notaría un
   error en `connect-src`.
3. Enviar el formulario de contacto desde la home.
4. Si la analítica está activada, comprobar que `beacon.min.js` carga sin error
   de CSP y que la visita aparece en el panel de Cloudflare. Es justo el tipo de
   recurso externo que falla en silencio.

Si algo falla, el error de la consola dice exactamente qué directiva lo bloqueó.
Para revertir, basta con desactivar la regla en Cloudflare: no hay nada
desplegado que dependa de ella.
