/**
 * Animación de entrada. Cero librerías: veinte líneas y un IntersectionObserver.
 *
 * El contenido es visible por defecto en el HTML. El estado inicial de la
 * animación solo existe bajo `:root[data-anim="on"]`, que pone el script en
 * línea del <head>. Si este fichero no llega a ejecutarse, no se oculta nada.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // Escalonado opcional: `data-reveal-delay` en milisegundos, máx. 6 pasos.
        const delay = Number(el.dataset.revealDelay ?? 0);
        if (delay > 0) el.style.transitionDelay = `${Math.min(delay, 270)}ms`;
        el.classList.add('is-in');
        observer.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
  );
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add('is-in'));
}
