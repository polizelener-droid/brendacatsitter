let activeScroll: number | null = null;

/** Responsive ease-out scroll — starts right away, soft landing */
export function smoothScrollTo(targetY: number) {
  if (activeScroll !== null) {
    cancelAnimationFrame(activeScroll);
    activeScroll = null;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    window.scrollTo(0, targetY);
    return;
  }

  // Short jumps = quick; long jumps = a bit longer, still snappy
  const duration = Math.min(380, Math.max(180, Math.abs(distance) * 0.28));
  const startTime = performance.now();

  // Ease-out cubic: moves immediately, decelerates at the end
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) {
      activeScroll = requestAnimationFrame(step);
    } else {
      activeScroll = null;
    }
  };

  // First frame now so there's no idle gap after click
  step(startTime);
}

export function scrollToHash(hash: string, headerOffset = 88) {
  if (!hash || hash === '#') {
    smoothScrollTo(0);
    return;
  }

  const id = hash.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  smoothScrollTo(Math.max(0, top));
}
