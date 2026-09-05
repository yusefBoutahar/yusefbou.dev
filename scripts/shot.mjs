/**
 * Captura con emulación de dispositivo REAL, por el protocolo de DevTools.
 *
 * POR QUÉ EXISTE. En Windows, Chrome no acepta `--window-size` por debajo de
 * unos 497 px: pide 390 y te devuelve una maqueta de 497 recortada a 390. Es
 * una trampa silenciosa —parece que el texto se desborda cuando en realidad
 * estás mirando un recorte— y ya nos costó un diagnóstico falso.
 * `Emulation.setDeviceMetricsOverride` sí respeta el ancho pedido.
 *
 *   node scripts/shot.mjs <url> <salida.png> [ancho] [alto] [--full]
 *
 * Con `--full` captura la página entera; si no, solo el primer pantallazo.
 * Devuelve además el ancho de scroll, que es la forma fiable de detectar
 * desbordamiento horizontal.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const [url, salida, ancho = '390', alto = '844'] = process.argv.slice(2);
const full = process.argv.includes('--full');

if (!url || !salida) {
  console.error('Uso: node scripts/shot.mjs <url> <salida.png> [ancho] [alto] [--full]');
  process.exit(1);
}

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PUERTO = 9333 + (process.pid % 500);
const perfil = `${process.env.TEMP}/chrome-shot-${process.pid}`;

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${PUERTO}`,
  `--user-data-dir=${perfil}`,
  'about:blank',
], { stdio: 'ignore' });

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** El puerto tarda un momento en aceptar conexiones. */
async function objetivo() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PUERTO}/json/list`);
      const pestañas = await res.json();
      const p = pestañas.find((t) => t.type === 'page');
      if (p?.webSocketDebuggerUrl) return p.webSocketDebuggerUrl;
    } catch {}
    await espera(250);
  }
  throw new Error('Chrome no abrió el puerto de depuración.');
}

const ws = new WebSocket(await objetivo());
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pendientes = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pendientes.has(m.id)) { pendientes.get(m.id)(m.result); pendientes.delete(m.id); }
});
const cmd = (method, params = {}) => new Promise((res) => {
  const n = ++id;
  pendientes.set(n, res);
  ws.send(JSON.stringify({ id: n, method, params }));
});

await cmd('Page.enable');
await cmd('Emulation.setDeviceMetricsOverride', {
  width: Number(ancho), height: Number(alto),
  deviceScaleFactor: 2, mobile: Number(ancho) < 700,
});
await cmd('Page.navigate', { url });
await espera(3500);

// Las animaciones de entrada dejan elementos en opacity 0 hasta que el
// observador los cruza: para una captura de revisión hay que neutralizarlas.
await cmd('Runtime.evaluate', {
  expression: `document.querySelectorAll('[data-reveal]').forEach(el=>{el.style.opacity='1';el.style.transform='none'});`,
});
await espera(400);

const medidas = await cmd('Runtime.evaluate', {
  expression: `JSON.stringify({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight})`,
  returnByValue: true,
});
const { vw, sw, sh } = JSON.parse(medidas.result.value);

const captura = await cmd('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: full,
  ...(full ? { clip: { x: 0, y: 0, width: Number(ancho), height: Math.min(sh, 30000), scale: 1 } } : {}),
});

fs.writeFileSync(salida, Buffer.from(captura.data, 'base64'));

console.log(`${salida}  viewport=${vw}  scrollWidth=${sw}  alto=${sh}`);
console.log(sw > vw + 1 ? `  ⚠ DESBORDAMIENTO HORIZONTAL: ${sw - vw} px` : '  sin desbordamiento horizontal');

ws.close();
chrome.kill();
try { fs.rmSync(perfil, { recursive: true, force: true }); } catch {}
