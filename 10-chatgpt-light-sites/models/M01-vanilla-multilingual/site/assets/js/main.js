// M01: locale labels are compiled into static HTML; JS only enhances a compact menu.
const documentRoot = document.documentElement;
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  const openText = toggle.dataset.openLabel || 'Open menu';
  const closeText = toggle.dataset.closeLabel || 'Close menu';
  const narrow = matchMedia('(max-width: 39rem)');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded','false');
    toggle.textContent = openText;
    nav.removeAttribute('data-open');
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded')==='true';
    if (isOpen) closeMenu();
    else {
      toggle.setAttribute('aria-expanded','true');
      toggle.textContent = closeText;
      nav.setAttribute('data-open','true');
    }
  });
  nav.addEventListener('click', event => { if(event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key==='Escape' && toggle.getAttribute('aria-expanded')==='true') {
      closeMenu();
      if(narrow.matches)toggle.focus();
    }
  });
  narrow.addEventListener('change',closeMenu);
  documentRoot.dataset.jsReady='true';
}
