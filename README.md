# yusefbou.dev

Portfolio personal de **Yousuf Boutahar El Maachi**, ingeniero fullstack senior.

Sitio estático bilingüe (español e inglés), sin JavaScript de terceros, sin analítica
y sin cookies.

## Stack

- [Astro 6](https://astro.build) en modo estático, con TypeScript estricto
- [Tailwind CSS 4](https://tailwindcss.com) por el plugin de Vite, con los tokens en `@theme`
- Enrutado de internacionalización nativo de Astro: español en la raíz, inglés en `/en/`
- Fuentes autoalojadas con `@fontsource-variable` (Source Serif 4, Inter, JetBrains Mono)
- Imágenes generadas en tiempo de construcción con `astro:assets` (AVIF, WebP y JPEG)
- Desplegado en [Cloudflare Pages](https://pages.cloudflare.com)

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/
npm run check      # astro check + comprobación de tipos
```

Requiere Node 22.12 o superior.

## Estructura

```
src/
  assets/      imágenes y capturas, optimizadas en construcción
  components/  una sección por componente, más el sistema de iconos
  i18n/        types.ts es el contrato; es.ts y en.ts, los diccionarios
  layouts/     Layout.astro: SEO, tarjetas sociales y datos estructurados
  lib/         utilidades de formato
  pages/       index.astro y en/index.astro
  styles/      global.css: tokens, base y clases canónicas
public/        _headers, _redirects, robots.txt, favicons, CV e imágenes sociales
```

Todo el texto del sitio vive en los dos diccionarios: los componentes no llevan
cadenas literales, y `types.ts` obliga a que las dos versiones tengan la misma forma.

## Accesibilidad y rendimiento

Objetivo del proyecto: 100 en accesibilidad y 98 o más en rendimiento en Lighthouse,
en las cuatro combinaciones de idioma y dispositivo, con CLS por debajo de 0,02.
Contrastes verificados por script, tema claro y oscuro, y la página completa visible
con JavaScript desactivado.

## Licencia

El código es de uso libre como referencia. El contenido, los textos y las imágenes
son propiedad de su autor.
