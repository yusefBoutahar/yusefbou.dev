// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yusefbou.dev',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    // Two copies of Vite's types are installed (Astro nests its own alongside
    // the one hoisted for @tailwindcss/vite), so the plugin needs a cast here.
    // The runtime value is correct.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en',
        },
      },
    }),
  ],
});
