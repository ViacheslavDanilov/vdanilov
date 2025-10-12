// Mobile menu toggle logic
(function () {
  const openBtn = document.getElementById('mobile-menu-button');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  if (!openBtn || !menu) return;

  function openMenu() {
    menu.classList.remove('translate-x-full');
    menu.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    openBtn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    const firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    menu.classList.remove('translate-x-0');
    menu.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    openBtn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (openBtn.getAttribute('aria-expanded') === 'true') closeMenu();
    }
  });

  // Close when clicking menu links
  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
})();
