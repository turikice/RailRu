const english = document.documentElement.lang === "en";
const menuLabel = open => english ? (open ? "Close menu" : "Open menu") : (open ? "Закрыть меню" : "Открыть меню");
const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#mobile-nav');
button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', menuLabel(open));
  nav.hidden = !open;
});
nav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  nav.hidden = true;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', menuLabel(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || nav.hidden) return;
  nav.hidden = true;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', menuLabel(false));
  button.focus();
});
