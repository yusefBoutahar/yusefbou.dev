/**
 * Utilidades de presentación compartidas por las secciones.
 *
 * Existen porque tres componentes distintos habían escrito su propia versión de
 * lo mismo con reglas ligeramente diferentes: Experiencia no separaba `Pydantic
 * v2`, Casos no contemplaba `PostgreSQL 16 y 17` y Stack sí, y el escalonado de
 * entrada se pasaba del tope en dos secciones. Un solo sitio, un solo criterio.
 */

/** Una entrada de tecnología ya partida en nombre y segmento de versión. */
export interface TechEntry {
  name: string;
  /** `null` cuando la entrada no termina en una versión. */
  version: string | null;
}

/**
 * La versión solo se separa cuando la entrada TERMINA en cifra, que es cuando
 * la cifra ES el dato: `Python 3.12`, `Pydantic v2`, `PostgreSQL 16 y 17`.
 * `JavaScript ES2020+`, `Semantic HTML5` o `Neo4j 5 con grafo bitemporal` se
 * quedan enteras: ahí la cifra va dentro del nombre y partirla mentiría.
 * El par `y` / `and` cubre los dos idiomas sin que el componente sepa en cuál está.
 */
const VERSION_TAIL = /\s+(v?\d[\w.]*(?:\s+(?:y|and)\s+v?\d[\w.]*)?)$/;

export function splitVersion(item: string): TechEntry {
  const match = VERSION_TAIL.exec(item);
  // `index === 0` sería un chip sin nombre: `3.12` a secas se queda entero.
  if (match === null || match.index === 0) return { name: item, version: null };
  return { name: item.slice(0, match.index), version: match[1] ?? null };
}

/** Tope del escalonado de entrada: seis pasos de 45 ms (DESIGN §7). */
const REVEAL_STEP = 45;
const REVEAL_MAX = REVEAL_STEP * 6;

/**
 * Retardo de `data-reveal-delay` para el elemento `index` de una rejilla o una
 * lista. Del séptimo en adelante entran juntos; el primero no lleva atributo.
 */
export function revealDelay(index: number): string | undefined {
  if (index <= 0) return undefined;
  return String(Math.min(index * REVEAL_STEP, REVEAL_MAX));
}
