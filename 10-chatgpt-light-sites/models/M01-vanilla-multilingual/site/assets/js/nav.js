// S09 — native-link disclosure navigation; no menu/menubar ARIA roles.
export function initNavigation() {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  const root = document.documentElement;
  if (!nav || !toggle) return;

  const compact = window.matchMedia('(max-width: 56rem)');
  const labelOpen = toggle.dataset.openLabel || 'Open menu';
  const labelClose = toggle.dataset.closeLabel || 'Close menu';

  function close({ returnFocus = false } = {}) {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = labelOpen;
    nav.removeAttribute('data-open');
    if (returnFocus && wasOpen && compact.matches) toggle.focus();
  }

  function open() {
    if (!compact.matches) return;
    nav.setAttribute('data-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = labelClose;
  }

  function syncSection() {
    const fragment = window.location.hash;
    for (const link of document.querySelectorAll('.site-nav a[href^="#"], .footer-nav a[href^="#"]')) {
      if (fragment && link.getAttribute('href') === fragment) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  // Progressive enhancement: without JavaScript the navigation remains visible.
  // The same semantic links and DOM work for compact and wide screens.
  toggle.hidden = false;
  root.dataset.jsReady = 'true';
  close();
  syncSection();

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') close();
    else open();
  });
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    close();
    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        window.requestAnimationFrame(() => {
          target.focus({ preventScroll: true });
          syncSection();
        });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      close({ returnFocus: true });
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true'
        && !nav.contains(event.target)
        && !toggle.contains(event.target)) close();
  });
  document.addEventListener('focusin', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true'
        && !nav.contains(event.target)
        && !toggle.contains(event.target)) close();
  });
  compact.addEventListener('change', () => {
    const navHadFocus = nav.contains(document.activeElement);
    close();
    if (navHadFocus && compact.matches) toggle.focus();
  });
  window.addEventListener('hashchange', syncSection);
}
