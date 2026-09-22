/**
 * Contrato de contenido del sitio.
 * `es.ts` y `en.ts` deben satisfacer `SiteContent` de forma idéntica en estructura:
 * los componentes se escriben una sola vez y reciben el diccionario del idioma activo.
 */

export type Lang = 'es' | 'en';

export interface Stat {
  value: string;
  label: string;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  /** Una frase que resume el puesto. */
  summary: string;
  bullets: string[];
  tags: string[];
  /** El puesto actual se destaca visualmente. */
  current?: boolean;
}

export interface CaseStudy {
  id: string;
  /** Etiqueta corta sobre el título: dominio o contexto. */
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  metrics?: Stat[];
}

export interface SiteProject {
  name: string;
  url: string;
  description: string;
  tech: string[];
  metrics: Stat[];
  /** Clave de la captura en `src/assets/shots/`, sin extensión. */
  shot: string;
  shotAlt: string;
}

export interface StackGroup {
  name: string;
  items: string[];
}

/**
 * Un vídeo de YouTube que sirve de prueba de algo que el resto del sitio
 * solo afirma. Se ENLAZA, nunca se incrusta: la miniatura es local y el enlace
 * abre YouTube en una pestaña nueva, así la página sigue sin terceros.
 */
export interface VideoRef {
  /**
   * Identificador del vídeo en YouTube. Es también la clave de la miniatura:
   * `src/assets/video/<id>.jpg`, ya recortada a 16:9. La URL no se escribe a
   * mano en el diccionario; la compone `youtubeWatchUrl(id)` en `utils.ts`.
   */
  id: string;
  /** Título del vídeo. Da el nombre accesible del enlace. */
  title: string;
  /** Qué prueba el vídeo, en una línea dirigida a quien contrata. */
  caption: string;
  /**
   * Texto alternativo de la miniatura. Describe solo lo que se ve en el
   * fotograma, sin repetir el título ni el pie.
   */
  thumbAlt: string;
}

export interface TeachingItem {
  role: string;
  org: string;
  period: string;
  description: string;
  /** Vídeos que prueban este trabajo. La mayoría de los ítems no tiene. */
  videos?: VideoRef[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  detail: string;
  /** Vídeos que prueban este trabajo. La mayoría de los ítems no tiene. */
  videos?: VideoRef[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogAlt: string;
    localeTag: string;
  };
  nav: {
    about: string;
    experience: string;
    work: string;
    stack: string;
    teaching: string;
    contact: string;
    /** Texto del conmutador hacia el otro idioma. */
    switchLang: string;
    switchLangAria: string;
    skipToContent: string;
    menuLabel: string;
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    intro: string;
    location: string;
    availability: string;
    stats: Stat[];
    ctaPrimary: string;
    ctaSecondary: string;
    photoAlt: string;
    scrollHint: string;
  };
  about: {
    title: string;
    lead: string;
    paragraphs: string[];
    pillars: { title: string; body: string }[];
  };
  experience: {
    title: string;
    lead: string;
    jobs: Job[];
    presentLabel: string;
  };
  work: {
    title: string;
    lead: string;
    confidentialityNote: string;
    caseStudies: CaseStudy[];
    problemLabel: string;
    approachLabel: string;
    resultLabel: string;
    sitesTitle: string;
    sitesLead: string;
    sites: SiteProject[];
    visitLabel: string;
  };
  stack: {
    title: string;
    lead: string;
    groups: StackGroup[];
    note: string;
  };
  teaching: {
    title: string;
    lead: string;
    paragraphs: string[];
    items: TeachingItem[];
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  contact: {
    title: string;
    lead: string;
    email: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    /** Nombre visible del enlace al canal; la URL vive en `SITE.youtube`. */
    youtubeLabel: string;
    note: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    sourceLabel: string;
  };
}
