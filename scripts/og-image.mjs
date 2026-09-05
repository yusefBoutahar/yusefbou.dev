/**
 * Regenera las DOS imágenes sociales de yusefbou.dev, 1200 × 630:
 *
 *   public/og-image.jpg     → español, «Ingeniero Fullstack Senior»
 *   public/og-image-en.jpg  → inglés,  «Senior Fullstack Engineer»
 *
 * Uso:  node scripts/og-image.mjs
 *
 * SISTEMA. Convex, el cuaderno de ingeniería sobre papel crema: lienzo crema
 * #f6f6f6 y, encima, la LOSA OSCURA #141414 con radio 16 donde vive el
 * contenido — exactamente la misma pieza que abre la página (`.hero` en
 * `src/styles/global.css`). El azul señal #69bee2 solo aparece dentro de la
 * losa, que es la única superficie donde el sistema lo permite. Cero sombras,
 * filetes de 1 px, una sola familia de texto (Inter) y la monoespaciada
 * reservada a datos: el cintillo y la dirección.
 *
 * POR QUÉ CHROME Y NO TRAZADOS. La versión anterior componía el texto como
 * trazado con `opentype.js` + `wawoff2` y simulaba la negrita engordando el
 * contorno. Ese apaño servía con la serif retirada, pero el sistema nuevo pide
 * Inter 700 de verdad, con su tracking negativo y su kerning. Chrome ya es
 * dependencia del repositorio (genera los PDF del CV en `scripts/cv/`) y
 * rasteriza las fuentes variables tal cual, así que la composición se escribe
 * en HTML y se fotografía. Con eso el generador no necesita NINGÚN paquete
 * fuera de los que ya están instalados: `sharp` (que trae Astro) para pasar el
 * PNG a JPEG, y nada más.
 *
 * Se dispara a 2× y se reduce a 1200 × 630 con Lanczos: el supermuestreo deja
 * los remates de Inter limpios a tamaño de miniatura.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const PUB = join(ROOT, 'public');
const WORK = join(HERE, '.og-build');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sharp = createRequire(join(ROOT, 'package.json'))('sharp');

/* --- Paleta: tokens de Convex, rama oscura (DESIGN «Surfaces» y §1) -------- */
const C = {
  canvas: '#f6f6f6', // lienzo crema, el papel
  slab: '#141414', // losa oscura, «momento de producto»
  border: '#38383a', // filete sobre oscuro
  text: '#f6f6f6',
  text2: '#c9c9cc',
  text3: '#a2a2a6',
  accent: '#69bee2', // azul señal — SOLO sobre superficie oscura
};

/* --- Geometría, idéntica en las dos imágenes ------------------------------ */
const W = 1200;
const H = 630;
const FRAME = 32; // aire de papel alrededor de la losa
const PAD = 48; // gutter interno de la losa
const GAP = 48;
const PLATE_W = 336; // placa de retrato 4:5, como en el hero
const PLATE_H = 420;
const COL = W - 2 * FRAME - 2 * PAD - GAP - PLATE_W; // 656 px de columna de texto

const KICKER = 'FRONTEND · BACKEND · DEVOPS';
const NAME_1 = 'Yousuf Boutahar';
const NAME_2 = 'El Maachi';
const ADDR = 'yusefbou.dev';

/** Lo único que distingue las dos imágenes. */
const VARIANTS = [
  { file: 'og-image.jpg', lang: 'es', role: 'Ingeniero Fullstack Senior' },
  { file: 'og-image-en.jpg', lang: 'en', role: 'Senior Fullstack Engineer' },
];

/* --- Fuentes y retrato, incrustados: el HTML no toca la red ni el disco ---- */
const dataFont = (rel) =>
  `data:font/woff2;base64,${readFileSync(join(ROOT, rel)).toString('base64')}`;

const INTER = dataFont(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
);
const MONO = dataFont(
  'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
);
const PORTRAIT = `data:image/jpeg;base64,${readFileSync(
  join(ROOT, 'src/assets/yusef-perfil.jpg'),
).toString('base64')}`;

const page = (variant) => `<!doctype html>
<html lang="${variant.lang}"><head><meta charset="utf-8"><title>og</title><style>
@font-face{font-family:'Inter OG';font-weight:100 900;font-display:block;src:url(${INTER}) format('woff2-variations')}
@font-face{font-family:'Mono OG';font-weight:100 900;font-display:block;src:url(${MONO}) format('woff2-variations')}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:${C.canvas};font-family:'Inter OG',sans-serif;-webkit-font-smoothing:antialiased}

/* La losa: la misma pieza del hero — radio 16, sin borde, sin sombra. */
.slab{position:absolute;inset:${FRAME}px;background:${C.slab};border-radius:16px;
  display:flex;align-items:center;gap:${GAP}px;padding:0 ${PAD}px}

.col{width:${COL}px;flex:none}

/* Cintillo con el tick de 24 × 2 px que abre cada sección del sitio. */
.eyebrow{display:flex;align-items:center;gap:14px}
.tick{width:24px;height:2px;background:${C.accent};flex:none}
.eyebrow span{font-family:'Mono OG',monospace;font-weight:500;font-size:17px;line-height:1;
  letter-spacing:.09em;color:${C.text3};white-space:nowrap}

/* Display de Convex: Inter 700 con tracking negativo, interlineado 1,04. */
h1{margin-top:30px;font-weight:700;font-size:66px;line-height:1.04;letter-spacing:-.025em;
  color:${C.text};white-space:nowrap}

.role{margin-top:24px;font-weight:500;font-size:28px;line-height:1.25;color:${C.text2};
  white-space:nowrap}

.rule{margin-top:30px;width:62%;height:1px;background:${C.border}}

.addr{margin-top:24px;font-family:'Mono OG',monospace;font-weight:500;font-size:22px;
  line-height:1;letter-spacing:.02em;color:${C.accent};white-space:nowrap}

/* Placa rectangular: filete de 1 px y nada más. Sin máscara y sin duotono. */
.plate{width:${PLATE_W}px;height:${PLATE_H}px;flex:none;border:1px solid ${C.border};
  border-radius:12px;overflow:hidden}
.plate img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;
  filter:saturate(.94) contrast(1.02)}
</style></head><body>
<div class="slab">
  <div class="col">
    <p class="eyebrow"><span class="tick"></span><span>${KICKER}</span></p>
    <h1>${NAME_1}<br>${NAME_2}</h1>
    <p class="role">${variant.role}</p>
    <div class="rule"></div>
    <p class="addr">${ADDR}</p>
  </div>
  <div class="plate"><img src="${PORTRAIT}" alt=""></div>
</div>
<script>
  /* Sonda de encaje: con todo a \`nowrap\`, cualquier texto que se pase de la
     columna se sale de la losa en silencio. Se mide y se publica en el título;
     el generador aborta si algo desborda. */
  window.addEventListener('load', () => {
    const col = document.querySelector('.col').getBoundingClientRect().width;
    const parts = [...document.querySelectorAll('h1,.role,.addr,.eyebrow')].map((el) => {
      const w = Math.ceil([...el.childNodes].reduce((max, n) => {
        const r = document.createRange();
        r.selectNodeContents(n);
        return Math.max(max, ...[...r.getClientRects()].map((b) => b.right));
      }, 0) - el.getBoundingClientRect().left);
      return el.tagName.toLowerCase() + (el.className ? '.' + el.className : '') + '=' + w;
    });
    const box = document.querySelector('.col');
    document.title = 'FIT|col=' + Math.round(col) + '|alto=' + Math.round(box.scrollHeight) +
      '|' + parts.join('|');
  });
<\/script>
</body></html>`;

mkdirSync(WORK, { recursive: true });
const chrome = (args) =>
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

try {
  for (const variant of VARIANTS) {
    const html = join(WORK, `og-${variant.lang}.html`);
    const png = join(WORK, `og-${variant.lang}.png`);
    writeFileSync(html, page(variant), 'utf8');

    // 1. Sonda de encaje.
    const dom = chrome([`--window-size=${W},${H}`, '--virtual-time-budget=4000', '--dump-dom', html]);
    const title = /<title>([\s\S]*?)<\/title>/.exec(dom)?.[1] ?? '';
    const medidas = Object.fromEntries(
      title
        .split('|')
        .filter((p) => p.includes('='))
        .map((p) => p.split('=').map((s) => s.trim()))
        .map(([k, v]) => [k, Number(v)]),
    );
    const col = medidas.col ?? COL;
    for (const [k, v] of Object.entries(medidas)) {
      if (k === 'col' || k === 'alto') continue;
      if (v > col) throw new Error(`[${variant.lang}] «${k}» no cabe: ${v} > ${col} px`);
    }

    // 2. Captura a 2× y reducción a 1200 × 630: supermuestreo.
    chrome([
      `--window-size=${W},${H}`,
      '--force-device-scale-factor=2',
      '--virtual-time-budget=4000',
      `--screenshot=${png}`,
      html,
    ]);

    const out = join(PUB, variant.file);
    await sharp(png)
      .resize(W, H, { kernel: 'lanczos3' })
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toFile(out);

    const meta = await sharp(out).metadata();
    const holgura = col - Math.max(...Object.entries(medidas).filter(([k]) => k !== 'col' && k !== 'alto').map(([, v]) => v));
    console.log(
      `${variant.file.padEnd(18)} ${meta.width}×${meta.height} ` +
        `${(statSync(out).size / 1024).toFixed(1).padStart(6)} KB · ` +
        `columna ${col} px · bloque ${medidas.alto} px de alto · ` +
        `holgura ${holgura} px · ${title.split('|').slice(3).join(' ')}`,
    );
  }
} finally {
  rmSync(WORK, { recursive: true, force: true });
}
