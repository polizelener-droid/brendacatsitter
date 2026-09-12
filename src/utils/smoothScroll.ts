let activeScroll: number | null = null;

/** Smooth in-page scroll for clicks — slower ease-in-out, native wheel stays untouched */
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

  // Click jumps should feel unhurried; wheel scrolling stays native.
  const duration = Math.min(1000, Math.max(560, Math.abs(distance) * 0.52));
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
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

export function handleHashLinkClick(
  event: { preventDefault: () => void },
  href: string,
) {
  event.preventDefault();
  scrollToHash(href);
  if (href && href !== '#') history.replaceState(null, '', href);
  else history.replaceState(null, '', window.location.pathname);
}
