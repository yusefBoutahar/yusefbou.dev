/**
 * Verificación de contraste WCAG 2.1 de la paleta del sitio, en los DOS temas.
 *
 * POR QUÉ EXISTE. El sitio sostiene 100 de accesibilidad en Lighthouse, y esa nota
 * se pierde con un solo par mal elegido. Lighthouse además solo mira lo que hay
 * pintado en la página: este script comprueba la paleta ENTERA antes de usarla.
 *
 * Trampa concreta del sistema Convex, que este script existe para cazar: Ash
 * (#a9a9ac) sobre el lienzo crema da 2,17:1. El sistema lo reserva a placeholder y
 * deshabilitado —que WCAG exime—, nunca a contenido real.
 *
 *   node scripts/contrast.mjs        → tabla completa, sale 1 si algo falla
 *   node scripts/contrast.mjs -v     → incluye también los pares que pasan
 *
 * Los valores deben ir sincronizados a mano con la capa cruda de `src/styles/global.css`.
 */

const PALETA = {
  claro: {
    bg: '#f6f6f6',
    surface: '#ffffff',
    'surface-2': '#f7f1ff',
    border: '#e5e5e5',
    'border-strong': '#d7d7d7',
    'border-ui': '#8a8a8d',
    text: '#141414',
    'text-2': '#4f4f52',
    'text-3': '#6d6d70',
    accent: '#141414',
    'accent-fg': '#141414',
    'accent-ink': '#ffffff',
    focus: '#141414',
  },
  oscuro: {
    bg: '#141414',
    surface: '#292929',
    'surface-2': '#38383a',
    border: '#38383a',
    'border-strong': '#4f4f52',
    'border-ui': '#87878a',
    text: '#f6f6f6',
    'text-2': '#c9c9cc',
    'text-3': '#a2a2a6',
    accent: '#69bee2',
    'accent-fg': '#69bee2',
    'accent-ink': '#141414',
    focus: '#69bee2',
  },
};

/** Fondos sobre los que se pinta texto en cada tema. */
const FONDOS = ['bg', 'surface', 'surface-2'];
/** Tokens de texto que llevan CONTENIDO real: exigen 4.5:1. */
const TEXTOS = ['text', 'text-2', 'text-3'];

const hex = (h) => { h = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const l1 = L(a), l2 = L(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return (hi + 0.05) / (lo + 0.05); };

const verbose = process.argv.includes('-v');
let fallos = 0;
let comprobados = 0;

const linea = (nombre, r, minimo) => {
  comprobados++;
  const pasa = r >= minimo;
  if (!pasa) fallos++;
  if (!pasa || verbose) {
    console.log(`  ${pasa ? 'OK  ' : 'FALLA'} ${nombre.padEnd(46)} ${r.toFixed(2).padStart(6)}  (mín. ${minimo})`);
  }
};

for (const [tema, p] of Object.entries(PALETA)) {
  console.log(`\n── Tema ${tema} ──`);

  // 1. Texto de contenido sobre cada superficie: WCAG 1.4.3, 4.5:1.
  for (const fondo of FONDOS) {
    for (const texto of TEXTOS) {
      linea(`${texto} sobre ${fondo}`, ratio(p[texto], p[fondo]), 4.5);
    }
  }

  // 2. La pareja del botón primario: tinta sobre relleno.
  linea('accent-ink sobre accent (botón primario)', ratio(p['accent-ink'], p.accent), 4.5);

  // 3. Acento como TEXTO sobre cada superficie (enlaces, marcas).
  for (const fondo of FONDOS) {
    linea(`accent-fg sobre ${fondo}`, ratio(p['accent-fg'], p[fondo]), 4.5);
  }

  // 4. Anillo de foco: WCAG 2.4.11 / 1.4.11, 3:1 contra lo que lo rodea.
  for (const fondo of FONDOS) {
    linea(`foco sobre ${fondo}`, ratio(p.focus, p[fondo]), 3);
  }

  // 5. Bordes de CONTROL: WCAG 1.4.11, 3:1. Los filetes decorativos (`border`)
  //    quedan fuera a propósito: no identifican ningún control.
  for (const fondo of FONDOS) {
    linea(`border-ui sobre ${fondo} (borde de control)`, ratio(p['border-ui'], p[fondo]), 3);
  }
}

console.log(`\n${comprobados} pares comprobados, ${fallos} fallo(s).`);
process.exit(fallos ? 1 : 0);
