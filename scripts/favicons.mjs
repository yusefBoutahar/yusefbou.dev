/**
 * Deriva los iconos rasterizados a partir de `public/favicon.svg`.
 *
 *   node scripts/favicons.mjs
 *
 *   public/favicon.ico         → contenedor ICO con 32 × 32 y 16 × 16 (PNG dentro)
 *   public/apple-touch-icon.png → 180 × 180, a sangre
 *
 * El SVG es la ÚNICA fuente de verdad del monograma: si cambia la marca se
 * edita ese fichero y se vuelve a ejecutar esto. El monograma es «YB» en Inter
 * 700 —la única familia del sistema— en azul señal #69bee2 sobre la losa de
 * tinta #141414, que es la única superficie donde Convex permite el azul.
 *
 * El icono de Apple va SIN esquinas redondeadas: iOS aplica su propia máscara
 * de supereelipse encima, y redondear dos veces deja un halo del lienzo
 * asomando por las esquinas. Por eso se le quita el `rx` al cuadrado de fondo.
 *
 * `sharp` viene con Astro; no hace falta instalar nada.
 */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');
const sharp = createRequire(join(ROOT, 'package.json'))('sharp');

const svg = readFileSync(join(PUB, 'favicon.svg'), 'utf8');
if (!svg.includes('rx="12"')) {
  throw new Error('favicon.svg ya no lleva rx="12": revisa el recorte del icono de Apple.');
}
const svgCuadrado = svg.replace('rx="12"', 'rx="0"');

/** Rasteriza el SVG a N × N. `density` alto = la curva se resuelve antes de escalar. */
const png = (fuente, size) =>
  sharp(Buffer.from(fuente), { density: 1200 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

/* --- ICO: cabecera de 6 bytes + una entrada de 16 por imagen + los PNG ----- */
function ico(imagenes) {
  const dir = Buffer.alloc(6 + 16 * imagenes.length);
  dir.writeUInt16LE(0, 0); // reservado
  dir.writeUInt16LE(1, 2); // tipo 1 = icono
  dir.writeUInt16LE(imagenes.length, 4);

  let offset = dir.length;
  imagenes.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    dir.writeUInt8(size === 256 ? 0 : size, e); // ancho (0 = 256)
    dir.writeUInt8(size === 256 ? 0 : size, e + 1); // alto
    dir.writeUInt8(0, e + 2); // paleta: 0 = sin paleta fija
    dir.writeUInt8(0, e + 3); // reservado
    dir.writeUInt16LE(1, e + 4); // planos
    dir.writeUInt16LE(32, e + 6); // bits por píxel
    dir.writeUInt32LE(data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([dir, ...imagenes.map((i) => i.data)]);
}

const imagenes = [];
for (const size of [16, 32]) imagenes.push({ size, data: await png(svg, size) });
writeFileSync(join(PUB, 'favicon.ico'), ico(imagenes));

await sharp(Buffer.from(svgCuadrado), { density: 1200 })
  .resize(180, 180)
  .flatten({ background: '#141414' })
  .png({ compressionLevel: 9 })
  .toFile(join(PUB, 'apple-touch-icon.png'));

for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
  console.log(`${f.padEnd(22)} ${(statSync(join(PUB, f)).size / 1024).toFixed(2).padStart(6)} KB`);
}
