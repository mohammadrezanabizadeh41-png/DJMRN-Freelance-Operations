// M01 S08: isolated progressive enhancement; public content and anchors work without JS.
const documentRoot = document.documentElement;
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');

if (toggle && nav) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Open menu';
    nav.removeAttribute('data-open');
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = 'Close menu';
      nav.setAttribute('data-open', 'true');
    }
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      if (matchMedia('(max-width: 39rem)').matches) toggle.focus();
    }
  });
  matchMedia('(min-width: 39.001rem)').addEventListener('change', closeMenu);
  documentRoot.dataset.jsReady = 'true';
}
