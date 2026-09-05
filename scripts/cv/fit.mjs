/**
 * Mide cuánto sobra o cuánto falta para que el CV quepa en dos páginas A4.
 *
 * Reproduce la caja de impresión (182 × 269 mm con márgenes de 14 mm), recorre
 * los bloques de primer nivel respetando `break-inside: avoid` y dice en qué
 * bloque cae cada salto de página. Uso:
 *   node cv/fit.mjs cv-es.html
 */
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(process.argv[2]);
const probe = join(here, '.fit-probe.html');

const PAGE = 1016.69; // 269 mm de alto útil, en px CSS

const script = `<script>
window.addEventListener('load', () => {
  document.documentElement.style.width = '182mm';
  document.body.style.width = '182mm';
  const PAGE = ${PAGE};
  const flat = [...document.body.children].flatMap((el) =>
    el.tagName === 'SECTION' ? [...el.children] : [el]
  );
  const label = (el) => {
    const h2 = el.querySelector && el.querySelector('h2');
    if (h2) return 'SEC ' + h2.textContent.trim();
    const h3 = el.querySelector && el.querySelector('h3');
    if (h3) return h3.textContent.trim().slice(0, 34);
    return (el.className || el.tagName).toString().slice(0, 26);
  };
  const rows = flat.map((el) => {
    const r = el.getBoundingClientRect();
    return { l: label(el), t: Math.round(r.top + scrollY), b: Math.round(r.bottom + scrollY) };
  });
  const total = Math.round(document.body.scrollHeight);
  const breaks = [];
  for (const r of rows) {
    const page = Math.floor(r.t / PAGE);
    if (Math.floor((r.b - 1) / PAGE) > page) breaks.push(r.l + ' cruza el corte ' + (page + 1));
  }
  document.title =
    'FIT|total=' + total + '|paginas=' + (total / PAGE).toFixed(3) +
    '|sobra=' + Math.round(total - 2 * PAGE) + 'px' +
    '|cruces=' + (breaks.join('; ') || 'ninguno') +
    '|' + rows.map((r) => r.l + ' ' + r.t + '-' + r.b).join(' // ');
});
<\/script>`;

writeFileSync(probe, readFileSync(src, 'utf8').replace('</body>', script + '\n</body>'), 'utf8');
try {
  const dom = execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--virtual-time-budget=4000', '--dump-dom', probe],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const title = /<title>([\s\S]*?)<\/title>/.exec(dom)?.[1] ?? '(sin título)';
  for (const part of title.split('|')) console.log(part.replaceAll(' // ', '\n    '));
} finally {
  unlinkSync(probe);
}
