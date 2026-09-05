/* ============================================================================
   icons.ts — datos del set de iconos «EXPEDIENTE».
   Solo geometría: el envoltorio <svg>, el color, el tamaño y la accesibilidad
   los pone `Icon.astro`. Aquí no hay un solo atributo de presentación.

   REGLAS DEL SET (no se negocian; son lo que separa un set de un recortable):
   · Rejilla 24 × 24, `viewBox="0 0 24 24"`, sin `width`/`height` en los nodos.
   · `kind: 'stroke'` — trazo de 1,5 px, extremos y uniones redondeados, SIN
     relleno. Es el 90 % del set: los iconos de interfaz son dibujo de línea,
     que es lo que pesa lo mismo que el texto al que acompañan.
   · `kind: 'brand'` — logotipo oficial de la marca, relleno sólido y SIN trazo.
     Las marcas son las únicas excepciones y lo son por obligación: un logotipo
     es una forma cerrada con proporciones registradas; redibujarlo a trazo de
     1,5 px para «que pegue» lo convierte en otra cosa y deja de ser el logo.
     Trazados oficiales de cada marca, sin retocar.
   · Nada de `fill="#hex"` ni `stroke="#hex"`: el color lo hereda del texto por
     `currentColor`, así el icono funciona en los dos temas sin una regla más.
   ========================================================================= */

interface IconDef {
  /** 'stroke' → dibujo de línea 1,5 px · 'brand' → logotipo relleno. */
  readonly kind: 'stroke' | 'brand';
  /** Nodos internos del <svg>, sobre rejilla de 24 × 24. */
  readonly body: string;
}

export const ICONS = {
  /* --- Marcas · relleno sólido, trazados oficiales ----------------------- */

  github: {
    kind: 'brand',
    body:
      '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
  },
  linkedin: {
    kind: 'brand',
    body:
      '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  },
  youtube: {
    kind: 'brand',
    body:
      '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  },

  /* --- Tema · conmutador de tres estados --------------------------------- */

  sun: {
    kind: 'stroke',
    body:
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  },
  moon: {
    kind: 'stroke',
    body: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  },
  /** Estado «según el sistema»: la pantalla decide, no el usuario. */
  monitor: {
    kind: 'stroke',
    body:
      '<rect x="2" y="3" width="20" height="14" rx="2"/>' +
      '<path d="M8 21h8M12 17v4"/>',
  },

  /* --- Acciones ---------------------------------------------------------- */

  mail: {
    kind: 'stroke',
    body:
      '<rect x="2" y="4" width="20" height="16" rx="2"/>' +
      '<path d="m22 7.5-9.04 5.65a2 2 0 0 1-1.92 0L2 7.5"/>',
  },
  copy: {
    kind: 'stroke',
    body:
      '<rect x="8" y="8" width="14" height="14" rx="2"/>' +
      '<path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
  },
  check: {
    kind: 'stroke',
    body: '<path d="M20 6 9 17l-5-5"/>',
  },
  download: {
    kind: 'stroke',
    body:
      '<path d="M12 3v12"/>' +
      '<path d="m7 10 5 5 5-5"/>' +
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
  },
  play: {
    kind: 'stroke',
    body: '<path d="M6.5 4.5v15L18.5 12Z"/>',
  },
  /** Reproducir sobre una miniatura: el disco le da masa encima de la imagen. */
  'play-circle': {
    kind: 'stroke',
    body: '<circle cx="12" cy="12" r="9"/><path d="M10.25 8.5 15.5 12l-5.25 3.5Z"/>',
  },

  /* --- Enlaces ----------------------------------------------------------- */

  /** Sale del sitio y abre pestaña nueva. */
  'external-link': {
    kind: 'stroke',
    body:
      '<path d="M15 3h6v6"/>' +
      '<path d="M21 3 10 14"/>' +
      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  },
  /** El «↗» de toda la vida, para enlaces mono donde la caja pesaría de más. */
  'arrow-up-right': {
    kind: 'stroke',
    body: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  },
  link: {
    kind: 'stroke',
    body:
      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
      '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  },
  'arrow-right': {
    kind: 'stroke',
    body: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  },
  'arrow-down': {
    kind: 'stroke',
    body: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  },
} as const satisfies Record<string, IconDef>;

/**
 * Unión de literales con TODOS los nombres del set. Usar un nombre que no está
 * aquí es un error de compilación, no un hueco silencioso en la página.
 */
export type IconName = keyof typeof ICONS;

/** Lista en orden de declaración. Útil para páginas de catálogo y para tests. */
export const ICON_NAMES = Object.keys(ICONS) as readonly IconName[];
