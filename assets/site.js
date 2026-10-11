/* The only two behaviours on the page: the Spotted demo plays while it's on screen,
   and the email can be copied. */
const demo = document.querySelector('.phone video');
if (demo && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { demo.preload = 'auto'; demo.play().catch(() => {}); }
    else demo.pause();
  }, { threshold: 0.4 }).observe(demo);
}

const copy = document.getElementById('copy');
copy.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(copy.dataset.email); copy.textContent = 'Copied'; }
  catch { copy.textContent = 'Select the address to copy'; }
  setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
});
