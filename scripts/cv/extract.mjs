import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const file = process.argv[2];
const buf = readFileSync(file);
const s = buf.toString('latin1');

// --- index all "N 0 obj ... endobj"
const objs = new Map();
for (const m of s.matchAll(/(\d+)\s+0\s+obj\b/g)) {
  const start = m.index + m[0].length;
  const end = s.indexOf('endobj', start);
  objs.set(+m[1], { start, end, body: s.slice(start, end) });
}

function streamOf(num) {
  const o = objs.get(num);
  if (!o) return null;
  const i = o.body.indexOf('stream');
  if (i < 0) return null;
  let j = i + 6;
  if (o.body[j] === '\r') j++;
  if (o.body[j] === '\n') j++;
  const k = o.body.indexOf('endstream', j);
  const raw = buf.subarray(o.start + j, o.start + k);
  if (/\/FlateDecode/.test(o.body.slice(0, i))) {
    try { return inflateSync(raw).toString('latin1'); } catch { return null; }
  }
  return raw.toString('latin1');
}

function toUnicodeMap(num) {
  const cmap = streamOf(num);
  const map = new Map();
  if (!cmap) return map;
  for (const b of cmap.matchAll(/beginbfchar([\s\S]*?)endbfchar/g))
    for (const m of b[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g))
      map.set(parseInt(m[1], 16), String.fromCharCode(...m[2].match(/.{4}/g).map(h => parseInt(h, 16))));
  for (const b of cmap.matchAll(/beginbfrange([\s\S]*?)endbfrange/g))
    for (const m of b[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const lo = parseInt(m[1], 16), hi = parseInt(m[2], 16), st = parseInt(m[3], 16);
      for (let i = 0; i <= hi - lo; i++) map.set(lo + i, String.fromCharCode(st + i));
    }
  return map;
}

// --- pages in order
const pages = [];
for (const [num, o] of objs) if (/\/Type\s*\/Page[^s]/.test(o.body)) pages.push(num);
pages.sort((a, b) => a - b);

const parseStr = (lit) => {
  const out = [];
  for (let i = 0; i < lit.length; i++) {
    let c = lit[i];
    if (c === '\\') {
      const n = lit[++i];
      if (n === 'n') out.push(10); else if (n === 'r') out.push(13); else if (n === 't') out.push(9);
      else if (n >= '0' && n <= '7') { let oct = n; while (lit[i + 1] >= '0' && lit[i + 1] <= '7' && oct.length < 3) oct += lit[++i]; out.push(parseInt(oct, 8)); }
      else out.push(n.charCodeAt(0));
    } else out.push(c.charCodeAt(0));
  }
  return out;
};

let total = 0;
for (const [pi, pnum] of pages.entries()) {
  const body = objs.get(pnum).body;
  const fonts = new Map();
  const fdict = body.match(/\/Font\s*<<([^>]*)>>/);
  if (fdict) for (const m of fdict[1].matchAll(/\/(\w+)\s+(\d+)\s+0\s+R/g)) {
    const fo = objs.get(+m[2]);
    const tu = fo && fo.body.match(/\/ToUnicode\s+(\d+)\s+0\s+R/);
    fonts.set(m[1], tu ? toUnicodeMap(+tu[1]) : new Map());
  }
  const contents = body.match(/\/Contents\s+(\d+)\s+0\s+R/);
  const content = contents ? streamOf(+contents[1]) : '';
  let cur = new Map(), text = '', lastX = null, lastY = null;
  const hexBytes = (h) => (h.replace(/\s+/g, '').match(/.{1,2}/g) || []).map(x => parseInt(x.padEnd(2, '0'), 16));
  const dec = (codes) => codes.map(c => cur.get(c) ?? '?').join('');
  // OJO con el orden: el array de `TJ` va ANTES que las cadenas sueltas. Chrome
  // escribe casi todo el texto como `[(Con)-3(struyo)]TJ` —con los ajustes de
  // kerning intercalados—, y una alternativa que solo mire `(...)Tj` se deja
  // renglones enteros fuera sin avisar. Dentro del corchete puede haber cadenas
  // literales y hexadecimales mezcladas; se recorren todas.
  const re = /\/(\w+)\s+[\d.]+\s+Tf|\[((?:[^\][()]|\((?:\\.|[^\\()])*\))*)\]\s*TJ|<([0-9A-Fa-f\s]*)>\s*Tj|\(((?:\\.|[^\\()])*)\)\s*Tj|(-?[\d.]+)\s+(-?[\d.]+)\s+Td|1 0 0 -1 (-?[\d.]+) (-?[\d.]+) Tm|(T\*|ET|BT)/g;
  /** Contenido de un `[...]TJ`: cadenas en orden, con espacio donde el ajuste
      de kerning es tan grande que en realidad separa palabras. */
  const decArray = (arr) => {
    let out = '';
    for (const t of arr.matchAll(/<([0-9A-Fa-f\s]*)>|\(((?:\\.|[^\\()])*)\)|(-?[\d.]+)/g)) {
      if (t[1] !== undefined) out += dec(hexBytes(t[1]));
      else if (t[2] !== undefined) out += dec(parseStr(t[2]));
      else if (parseFloat(t[3]) < -120) out += ' ';
    }
    return out;
  };
  let m;
  while ((m = re.exec(content))) {
    if (m[1]) { cur = fonts.get(m[1]) || new Map(); continue; }
    if (m[2] !== undefined) { text += decArray(m[2]); continue; }
    if (m[3] !== undefined) { text += dec(hexBytes(m[3])); continue; }
    if (m[4] !== undefined) { text += dec(parseStr(m[4])); continue; }
    if (m[5] !== undefined) { if (parseFloat(m[5]) > 3) text += ' '; continue; }
    if (m[7] !== undefined) {
      const x = parseFloat(m[7]), y = parseFloat(m[8]);
      if (lastY !== null && Math.abs(y - lastY) > 2) text += '\n';
      else if (lastX !== null && x - lastX > 3) text += ' ';
      lastX = x; lastY = y;
      continue;
    }
    if (m[9] === 'T*') text += '\n';
  }
  text = text.replace(/ {2,}/g, ' ').replace(/\n{2,}/g, '\n').trim();
  total += text.length;
  console.log(`\n===== ${file} — PÁGINA ${pi + 1} (${text.length} caracteres) =====`);
  console.log(text);
}
console.log(`\n--- total ${pages.length} páginas, ${total} caracteres ---`);
