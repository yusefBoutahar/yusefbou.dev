/**
 * Hashes SHA-256 de los bloques en línea de `dist/` para la Content-Security-Policy
 * de `public/_headers`.
 *
 * POR QUÉ EXISTE. La CSP del sitio no usa 'unsafe-inline': autoriza cada `<script>`
 * y cada `<style>` en línea por su hash exacto. Eso significa que **cualquier cambio
 * en el script de tema, en el CSS crítico del Layout o en el JSON-LD cambia su hash**,
 * y si no se actualiza `_headers` el navegador bloquea ese bloque EN SILENCIO.
 *
 * Y no se ve en local: el servidor de desarrollo no aplica `_headers`. El fallo solo
 * aparece desplegado. Ha pasado dos veces; de ahí este script.
 *
 *   node scripts/csp-hashes.mjs         → lista los hashes del build actual
 *   node scripts/csp-hashes.mjs check   → verifica que _headers los cubre (sale 1 si no)
 *   node scripts/csp-hashes.mjs write   → reescribe _headers con los hashes correctos
 *
 * Requiere un `npx astro build` previo: lee de `dist/`, no del código fuente.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const HEADERS = path.join(ROOT, 'public', '_headers');

const modo = process.argv[2] ?? 'list';

if (!fs.existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta primero: npx astro build');
  process.exit(1);
}

const sha = (cuerpo) => `sha256-${crypto.createHash('sha256').update(cuerpo, 'utf8').digest('base64')}`;

/** Todos los .html de dist/, en profundidad. */
const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

// Map hash -> dónde aparece. Dos páginas con el mismo bloque comparten hash: el Map
// deduplica solo, que es justo lo que la CSP necesita.
const scripts = new Map();
const styles = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  // `(?![^>]*\ssrc=)` excluye los <script src="...">: esos no necesitan hash.
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    scripts.set(sha(m[2]), `${rel} · <script${m[1]}> ${m[2].length} B`);
  }
  for (const m of html.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)) {
    styles.set(sha(m[2]), `${rel} · <style${m[1]}> ${m[2].length} B`);
  }
}

const cabeceras = fs.readFileSync(HEADERS, 'utf8');

if (modo === 'list') {
  console.log('script-src:');
  for (const [h, donde] of scripts) console.log(`  '${h}'   # ${donde}`);
  console.log('\nstyle-src:');
  for (const [h, donde] of styles) console.log(`  '${h}'   # ${donde}`);
  process.exit(0);
}

if (modo === 'check') {
  let problemas = 0;
  for (const [tipo, mapa] of [['script', scripts], ['style', styles]]) {
    for (const [h, donde] of mapa) {
      if (cabeceras.includes(h)) console.log(`OK    ${tipo} ${h} ← ${donde}`);
      else { console.log(`FALTA ${tipo} ${h} ← ${donde}`); problemas++; }
    }
  }
  // Hashes en _headers que ya no corresponden a ningún bloque: no rompen nada,
  // pero delatan que la política arrastra restos de una versión anterior.
  for (const m of cabeceras.matchAll(/'(sha256-[A-Za-z0-9+/=]+)'/g)) {
    if (!scripts.has(m[1]) && !styles.has(m[1])) { console.log(`SOBRA ${m[1]}`); problemas++; }
  }
  console.log(problemas ? `\n${problemas} problema(s).` : '\nCSP al día.');
  process.exit(problemas ? 1 : 0);
}

if (modo === 'write') {
  const scriptSrc = [...scripts.keys()].sort().map((h) => `'${h}'`).join(' ');
  const styleSrc = [...styles.keys()].sort().map((h) => `'${h}'`).join(' ');
  const re = /(Content-Security-Policy: default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; script-src 'self' )[^;]*(; style-src 'self' )[^;]*(; .*)$/m;

  if (!re.test(cabeceras)) {
    console.error('No encuentro la línea de Content-Security-Policy en public/_headers.');
    process.exit(1);
  }
  fs.writeFileSync(HEADERS, cabeceras.replace(re, (_, pre, mid, post) => `${pre}${scriptSrc}${mid}${styleSrc}${post}`));
  console.log(`CSP actualizada: ${scripts.size} scripts, ${styles.size} estilos.`);
  process.exit(0);
}

console.error(`Modo desconocido: ${modo}. Usa list, check o write.`);
process.exit(1);
