# Cabeceras de seguridad

GitHub Pages no permite configurar cabeceras HTTP, así que las pone **Cloudflare**,
que ya está delante del dominio. Eso significa que **no viven en este repositorio**:
este documento es la copia de lo que hay configurado allí, para que se pueda
revisar, reproducir y —sobre todo— actualizar cuando el sitio cambie.

> Si algún día el frontend se mueve a Firebase Hosting, estas cabeceras pasan a
> `firebase.json` y se despliegan con el código. Sería mejor sitio para ellas.

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
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

Por qué cada parte, para poder mantenerla:

- **`script-src 'self'`** — todo el JavaScript se sirve desde el propio dominio.
  No hay CDN ni etiquetas de terceros. El JSON-LD de `index.html` no es
  JavaScript ejecutable, así que no lo bloquea.
- **`style-src` con `'unsafe-inline'`** — React escribe dos atributos `style` en
  línea (la altura del logo). Sin esto, el logo se descoloca. Quitando esos dos
  casos se podría endurecer.
- **`font-src 'self'`** — las fuentes están autoalojadas en `/fonts`.
- **`img-src` con `https:`** — las imágenes de los artículos del blog se indican
  por URL desde el panel y pueden estar en un servicio externo, porque Cloud
  Storage exige facturación. Si algún día todas las imágenes viven en el repo,
  esto se puede reducir a `'self' data:`.
- **`connect-src`** — los tres únicos hosts con los que habla el sitio:
  Firestore (contenido y formularios), Identity Toolkit (sesión anónima al
  enviar algo y acceso al panel) y Secure Token (renovación de sesión del panel).
- **`frame-ancestors 'none'`** — nadie puede meter el sitio en un iframe.
  `X-Frame-Options: DENY` es lo mismo para navegadores antiguos.

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

## 3. Comprobación

```bash
curl -sI https://velanus.com/ | grep -iE "content-security|x-content-type|referrer-policy|permissions-policy|x-frame|strict-transport"
```

Y después, **en un navegador**, con la consola abierta:

1. La home, Servicios y el blog: no debe salir ningún error de CSP.
2. `/admin`: iniciar sesión, abrir Consultas y guardar algo. Es la parte que más
   hosts usa (Identity Toolkit y Secure Token) y donde primero se notaría un
   error en `connect-src`.
3. Enviar el formulario de contacto desde la home.

Si algo falla, el error de la consola dice exactamente qué directiva lo bloqueó.
Para revertir, basta con desactivar la regla en Cloudflare: no hay nada
desplegado que dependa de ella.
