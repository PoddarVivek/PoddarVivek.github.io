/* Theme switch for the case studies: shares the portfolio's saved choice */
(() => {
  const btn = document.getElementById('modeBtn'), root = document.documentElement;
  if (!btn) return;
  const label = () => { btn.textContent = root.dataset.theme === 'whites' ? 'Test whites' : 'Floodlights'; };
  label();
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'whites' ? '' : 'whites';
    if (next) root.dataset.theme = next; else delete root.dataset.theme;
    try { localStorage.setItem('theme', next || 'floodlights'); } catch {}
    label();
  });
})();
