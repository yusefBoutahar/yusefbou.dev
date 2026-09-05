/**
 * Genera los DOS currículos en PDF de yusefbou.dev:
 *
 *   public/cv-yousuf-boutahar.pdf     → español
 *   public/cv-yousuf-boutahar-en.pdf  → inglés
 *
 * Uso:  node scripts/cv/build.mjs            (HTML + PDF)
 *       node scripts/cv/build.mjs --solo-html (deja el HTML y no llama a Chrome)
 *
 * PIEZAS. `style.css` es la hoja —sistema Convex, tema claro fijo— y
 * `body-es.html` / `body-en.html` son los cuerpos. Este script les incrusta las
 * fuentes en base64 y los envuelve en un documento completo dentro de
 * `.build/`, que luego imprime Chrome.
 *
 * POR QUÉ CHROME. Es lo único de la máquina que pagina bien (`break-inside`,
 * `@page`), incrusta subconjuntos de fuentes variables y escribe los enlaces
 * como anotaciones `/URI` de verdad en lugar de como texto azul. Se invoca en
 * modo `--headless=new` sin cabecera ni pie.
 *
 * VERIFICACIÓN. `node scripts/cv/fit.mjs scripts/cv/.build/cv-es.html` dice
 * cuánto sobra para las dos páginas y si algún bloque cruza el corte;
 * `node scripts/cv/extract.mjs public/cv-yousuf-boutahar.pdf` vuelca el texto
 * incrustado, página a página, para comprobar tildes y eñes.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const BUILD = join(HERE, '.build');
const PUB = join(ROOT, 'public');
const FONTS = join(ROOT, 'node_modules', '@fontsource-variable');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const soloHtml = process.argv.includes('--solo-html');

/* ---------------------------------------------------------------------------
 * Antigüedad profesional, calculada al generar el PDF.
 *
 * Réplica exacta de `experienceSince` / `experienceLabel` de
 * `src/i18n/utils.ts`: mismo día de inicio (1 de agosto de 2022), mismos meses
 * cumplidos, mismos singulares y plurales, misma salvaguarda de cero. Los
 * cuerpos del CV escriben `{{EXP}}` igual que los diccionarios del sitio, así
 * que la cifra nunca se codifica a mano en el HTML.
 * ------------------------------------------------------------------------- */

const EXPERIENCE_TOKEN = '{{EXP}}';
const EXPERIENCE_START = { year: 2022, month: 8, day: 1 };

const durationWords = {
  es: { year: ['año', 'años'], month: ['mes', 'meses'], and: 'y', zero: 'menos de un mes' },
  en: { year: ['year', 'years'], month: ['month', 'months'], and: 'and', zero: 'less than a month' },
};

function experienceSince(now) {
  let total =
    (now.getFullYear() - EXPERIENCE_START.year) * 12 +
    (now.getMonth() + 1 - EXPERIENCE_START.month);
  if (now.getDate() < EXPERIENCE_START.day) total -= 1;
  if (total < 0) total = 0;
  return { years: Math.floor(total / 12), months: total % 12 };
}

const plural = (count, forms) => `${count} ${count === 1 ? forms[0] : forms[1]}`;

function experienceLabel(lang, now) {
  const { years, months } = experienceSince(now);
  const words = durationWords[lang];
  const parts = [];
  if (years > 0) parts.push(plural(years, words.year));
  if (months > 0) parts.push(plural(months, words.month));
  if (parts.length === 0) return words.zero;
  return parts.join(` ${words.and} `);
}

/** Momento de la generación; se congela para que los dos idiomas coincidan. */
const BUILD_DATE = new Date();

/* --- Fuentes: las DOS del sistema, y ninguna más --------------------------
   Convex tiene una sola familia de texto (Inter) y reserva la monoespaciada a
   datos y metadatos. La serif se retiró del sistema, así que aquí tampoco
   está: si vuelve a aparecer una tercera cara, es que el CV se ha separado del
   sitio. Se incrustan como fuente variable completa (`woff2-variations`), que
   es lo que permite pedir el peso 700 de verdad en lugar de fingirlo.
   ------------------------------------------------------------------------- */
const faces = [
  ['Inter CV', `${FONTS}/inter/files/inter-latin-wght-normal.woff2`],
  ['JetBrains Mono CV', `${FONTS}/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2`],
];

const fontCss = faces
  .map(([family, file]) => {
    const b64 = readFileSync(file).toString('base64');
    return `@font-face{font-family:'${family}';font-style:normal;font-display:block;font-weight:100 900;src:url(data:font/woff2;base64,${b64}) format('woff2-variations');}`;
  })
  .join('\n');

const css = readFileSync(join(HERE, 'style.css'), 'utf8');

const docs = [
  {
    lang: 'es',
    title: 'Currículum — Yousuf Boutahar El Maachi',
    html: 'cv-es.html',
    body: 'body-es.html',
    pdf: 'cv-yousuf-boutahar.pdf',
  },
  {
    lang: 'en',
    title: 'CV — Yousuf Boutahar El Maachi',
    html: 'cv-en.html',
    body: 'body-en.html',
    pdf: 'cv-yousuf-boutahar-en.pdf',
  },
];

mkdirSync(BUILD, { recursive: true });

for (const doc of docs) {
  const label = experienceLabel(doc.lang, BUILD_DATE);
  const body = readFileSync(join(HERE, doc.body), 'utf8').split(EXPERIENCE_TOKEN).join(label);
  if (body.includes(EXPERIENCE_TOKEN)) throw new Error(`${doc.body}: token sin sustituir`);

  const html = `<!doctype html>
<html lang="${doc.lang}">
<head>
<meta charset="utf-8">
<title>${doc.title}</title>
<style>
${fontCss}
${css}
</style>
</head>
<body>
${body}
</body>
</html>
`;
  const target = join(BUILD, doc.html);
  writeFileSync(target, html, 'utf8');

  let nota = '';
  if (!soloHtml) {
    const pdf = join(PUB, doc.pdf);
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdf}`,
      target,
    ]);
    const buf = readFileSync(pdf);
    const paginas = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    const uris = new Set(
      [...buf.toString('latin1').matchAll(/\/URI\s*\(([^)]*)\)/g)].map((m) => m[1]),
    );
    if (paginas !== 2) throw new Error(`${doc.pdf}: ${paginas} páginas, deben ser 2`);
    if (uris.size !== 4) throw new Error(`${doc.pdf}: ${uris.size} enlaces /URI, deben ser 4`);
    nota = ` → ${doc.pdf} ${(statSync(pdf).size / 1024).toFixed(0)} KB · ${paginas} páginas · ${uris.size} enlaces`;
  }

  console.log(
    `${doc.html.padEnd(10)} ${(statSync(target).size / 1024).toFixed(0).padStart(4)} KB · antigüedad: ${label}${nota}`,
  );
}
