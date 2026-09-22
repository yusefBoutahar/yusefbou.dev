import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang, SiteContent, VideoRef } from './types';
import { es } from './es';
import { en } from './en';

export type { Lang, SiteContent, VideoRef };

/** Los dos idiomas del sitio, con su nombre nativo para `hreflang` y menús. */
export const languages = {
  es: 'Español',
  en: 'English',
} as const satisfies Record<Lang, string>;

export const langCodes = ['es', 'en'] as const satisfies readonly Lang[];

export const defaultLang: Lang = 'es';

/** Etiqueta BCP 47 completa. La usa el sitemap y los `hreflang`. */
export const bcp47 = {
  es: 'es-ES',
  en: 'en',
} as const satisfies Record<Lang, string>;

/** `og:locale`. */
export const ogLocale = {
  es: 'es_ES',
  en: 'en_GB',
} as const satisfies Record<Lang, string>;

/**
 * Datos del sitio que no son texto traducible: direcciones, rutas y ficheros.
 * Viven aquí y no en el diccionario porque son idénticos en los dos idiomas.
 */
export const SITE = {
  origin: 'https://yusefbou.dev',
  /**
   * Nombre legal completo. Es el mismo en los dos idiomas, así que vive aquí y
   * no en el diccionario. Va en el JSON-LD; el cintillo del hero usa la forma
   * corta de `hero.name`.
   */
  fullName: 'Yousuf Boutahar El Maachi',
  /** Retrato social de 1200 × 630. Se genera aparte, en `public/`. */
  ogImage: '/og-image.jpg',
  github: 'https://github.com/yusefBoutahar',
  linkedin: 'https://www.linkedin.com/in/yousuf-boutahar/',
  /** Canal propio. Los vídeos sueltos se enlazan con `youtubeWatchUrl()`. */
  youtube: 'https://www.youtube.com/@yusefboutahar4168',
  /** Aparece en el JSON-LD; el correo visible sale de `contact.email`. */
  locality: 'Las Palmas de Gran Canaria',
  region: 'Las Palmas',
  country: 'ES',
  university: 'Universidad de Las Palmas de Gran Canaria',
} as const;

/**
 * Página del vídeo en YouTube. Los diccionarios guardan solo el identificador
 * —que es además la clave de la miniatura local—, así que la dirección se
 * compone en un único sitio. Los vídeos se enlazan, nunca se incrustan.
 */
export function youtubeWatchUrl(id: string): string {
  return `https://youtu.be/${id}`;
}

/**
 * Anclas de sección. Son deliberadamente neutras respecto al idioma: la misma
 * cadena sirve en `/` y en `/en/`, así la navegación y la cinta de índice no
 * dependen del diccionario y un enlace copiado funciona en las dos versiones.
 */
export const SECTION_IDS = {
  hero: 'inicio',
  about: 'about',
  experience: 'experience',
  work: 'work',
  stack: 'stack',
  teaching: 'teaching',
  education: 'education',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/**
 * Currículum en PDF, uno por idioma: los dos ficheros están en `public/`. Es
 * una ruta, no texto traducible, así que vive aquí y no en el diccionario.
 */
const CV_PATH = {
  es: '/cv-yousuf-boutahar.pdf',
  en: '/cv-yousuf-boutahar-en.pdf',
} as const satisfies Record<Lang, string>;

export function cvPath(lang: Lang): string {
  return CV_PATH[lang];
}

/** Numeración visible de las secciones. El hero no lleva número. */
export const SECTION_INDEX = {
  about: '01',
  experience: '02',
  work: '03',
  stack: '04',
  teaching: '05',
  education: '06',
  contact: '07',
} as const;

const dictionaries: Record<Lang, SiteContent> = { es, en };

/**
 * Antigüedad profesional, calculada en tiempo de construcción.
 *
 * Los diccionarios no escriben la cifra a mano: escriben el token `{{EXP}}` y
 * `useContent()` lo sustituye por el texto del idioma activo. Así la página no
 * empieza a mentir el día que cambia el mes; basta con reconstruir el sitio.
 */
export const EXPERIENCE_TOKEN = '{{EXP}}';

/** Primer día del primer empleo de ingeniería: 1 de agosto de 2022. */
const EXPERIENCE_START = { year: 2022, month: 8, day: 1 } as const;

interface DurationWords {
  /** `[singular, plural]`. */
  year: readonly [string, string];
  month: readonly [string, string];
  /** Conjunción entre los dos tramos. */
  and: string;
  /** Salvaguarda para una duración de cero meses; hoy inalcanzable. */
  zero: string;
}

const durationWords: Record<Lang, DurationWords> = {
  es: {
    year: ['año', 'años'],
    month: ['mes', 'meses'],
    and: 'y',
    zero: 'menos de un mes',
  },
  en: {
    year: ['year', 'years'],
    month: ['month', 'months'],
    and: 'and',
    zero: 'less than a month',
  },
};

export interface Duration {
  years: number;
  months: number;
}

/**
 * Meses completos entre el inicio y `now`, repartidos en años y meses.
 * Cuenta solo lo cumplido: el 31 de julio todavía no suma el año.
 */
export function experienceSince(now: Date): Duration {
  let total =
    (now.getFullYear() - EXPERIENCE_START.year) * 12 +
    (now.getMonth() + 1 - EXPERIENCE_START.month);
  if (now.getDate() < EXPERIENCE_START.day) total -= 1;
  if (total < 0) total = 0;
  return { years: Math.floor(total / 12), months: total % 12 };
}

function plural(count: number, forms: readonly [string, string]): string {
  return `${count} ${count === 1 ? forms[0] : forms[1]}`;
}

/**
 * La antigüedad en palabras: «4 años y 1 mes», «4 years and 1 month».
 * Omite el tramo de meses cuando es cero y respeta singulares y plurales.
 */
export function experienceLabel(lang: Lang, now: Date = new Date()): string {
  const { years, months } = experienceSince(now);
  const words = durationWords[lang];
  const parts: string[] = [];
  if (years > 0) parts.push(plural(years, words.year));
  if (months > 0) parts.push(plural(months, words.month));
  if (parts.length === 0) return words.zero;
  return parts.join(` ${words.and} `);
}

/** Momento de la construcción. Se congela al cargar el módulo. */
const BUILD_DATE = new Date();

/**
 * Recorre el diccionario en profundidad y aplica `replace` a cada cadena.
 * Devuelve una estructura nueva con la misma forma; los componentes no se
 * enteran de que hay tokens.
 */
function mapStrings(value: unknown, replace: (text: string) => string): unknown {
  if (typeof value === 'string') return replace(value);
  if (Array.isArray(value)) {
    const items: readonly unknown[] = value;
    return items.map((item) => mapStrings(item, replace));
  }
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    return Object.fromEntries(entries.map(([key, item]) => [key, mapStrings(item, replace)]));
  }
  return value;
}

/** Un diccionario ya resuelto por idioma; se calcula una sola vez por build. */
const resolved = new Map<Lang, SiteContent>();

function resolveTokens(lang: Lang): SiteContent {
  const label = experienceLabel(lang, BUILD_DATE);
  const replace = (text: string): string =>
    text.includes(EXPERIENCE_TOKEN) ? text.split(EXPERIENCE_TOKEN).join(label) : text;
  // `mapStrings` conserva la forma del diccionario: solo cambia el texto.
  return mapStrings(dictionaries[lang], replace) as SiteContent;
}

/**
 * Microcopia de interfaz que no cabe en el contrato de contenido: el botón de
 * copiar el correo y el conmutador de tema. Vive en la capa de i18n, no en los
 * componentes, para que ningún componente lleve texto literal.
 */
export interface UiStrings {
  copy: string;
  copied: string;
  copyAria: string;
  themeLabel: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  indexLabel: string;
  /** Rótulo del grupo de vídeos de un ítem. */
  videoLabel: string;
  /** Texto del enlace que abre el vídeo. */
  videoWatch: string;
  /**
   * Aviso de destino, para leerlo solo con lector de pantalla dentro del
   * nombre accesible del enlace: el vídeo se abre fuera del sitio.
   */
  videoNewTab: string;
  /** Nombre accesible del enlace al canal cuando solo se ve el icono. */
  videoChannel: string;
}

const ui: Record<Lang, UiStrings> = {
  es: {
    copy: 'copiar',
    copied: 'Copiado',
    copyAria: 'Copiar la dirección de correo al portapapeles',
    themeLabel: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    indexLabel: 'Índice del documento',
    videoLabel: 'En vídeo',
    videoWatch: 'Ver en YouTube',
    videoNewTab: 'se abre en YouTube, en una pestaña nueva',
    videoChannel: 'Canal de YouTube',
  },
  en: {
    copy: 'copy',
    copied: 'Copied',
    copyAria: 'Copy the email address to the clipboard',
    themeLabel: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    indexLabel: 'Document index',
    videoLabel: 'On video',
    videoWatch: 'Watch on YouTube',
    videoNewTab: 'opens on YouTube in a new tab',
    videoChannel: 'YouTube channel',
  },
};

/** `'en'` si el primer segmento de la ruta es `en`; si no, español. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : defaultLang;
}

/**
 * Diccionario completo del idioma activo, con `{{EXP}}` ya sustituido por la
 * antigüedad calculada en la construcción.
 */
export function useContent(lang: Lang): SiteContent {
  const cached = resolved.get(lang);
  if (cached) return cached;
  const content = resolveTokens(lang);
  resolved.set(lang, content);
  return content;
}

/** Microcopia de interfaz del idioma activo. */
export function useUi(lang: Lang): UiStrings {
  return ui[lang];
}

/** Deja la ruta como `/algo/`: barra delante, barra detrás, sin dobles. */
function normalizePath(path: string): string {
  const clean = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return clean === '/' ? '/' : `${clean}/`;
}

/** Quita el prefijo de idioma para quedarse con la ruta neutra. */
function stripLangPrefix(path: string): string {
  const normalized = normalizePath(path);
  for (const code of langCodes) {
    if (normalized === `/${code}/`) return '/';
    if (normalized.startsWith(`/${code}/`)) return normalized.slice(code.length + 1);
  }
  return normalized;
}

/**
 * Ruta absoluta del sitio para una ruta neutra en el idioma dado.
 * `prefixDefaultLocale: false`, así que el español vive en la raíz: `/`, `/en/`.
 */
export function localizePath(lang: Lang, path = '/'): string {
  const neutral = stripLangPrefix(path);
  return normalizePath(getRelativeLocaleUrl(lang, neutral === '/' ? '' : neutral));
}

/** URL absoluta sobre el origen del sitio. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.origin).href;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/**
 * Las tres etiquetas `hreflang` de una página: los dos idiomas y `x-default`,
 * que apunta al español porque es el idioma por defecto del enrutado.
 */
export function alternatePaths(currentPath: string): AlternateLink[] {
  const neutral = stripLangPrefix(currentPath);
  const esHref = absoluteUrl(localizePath('es', neutral));
  const enHref = absoluteUrl(localizePath('en', neutral));
  return [
    { hreflang: bcp47.es, href: esHref },
    { hreflang: bcp47.en, href: enHref },
    { hreflang: 'x-default', href: esHref },
  ];
}
