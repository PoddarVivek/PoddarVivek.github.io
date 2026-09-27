/* ============================================================
   Motion & graphics layer — runs after site.js
   (REDUCE, HOVER, $, $$, clamp, observe come from site.js)
   ============================================================ */

/* ---------- smooth, inertial scrolling ---------- */
if (!REDUCE && window.Lenis){
  window.lenis = new Lenis({autoRaf:true, anchors:{offset:-72}, lerp:.09});
}

/* ---------- headings: words rise out of a mask ---------- */
$$('main h2').forEach(h => {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3){
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)){ frag.append(part); return; }
        const m = document.createElement('span'); m.className = 'wm';
        const w = document.createElement('span'); w.className = 'wi'; w.style.setProperty('--d', i++); w.textContent = part;
        m.append(w); frag.append(m);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
  });
  walk(h);
  h.classList.add('split', 'reveal');
});
observe();

/* ---------- ghost chapter numerals ---------- */
const ghosts = $$('[data-ch^="Chapter"]').map(s => {
  const g = document.createElement('span');
  g.className = 'ch-num'; g.setAttribute('aria-hidden', 'true');
  g.textContent = s.dataset.ch.slice(-2);
  ($('.sticky, .pin', s) || s).prepend(g);
  return g;
});

/* ---------- live screens: wrap for the 3D tilt ---------- */
const screens = $$('.screen');

/* ---------- one rAF-driven scroll pass for motion ---------- */
let mTick = false;
function motionFrame(){
  mTick = false;
  const vh = innerHeight;
  if (!REDUCE){
    ghosts.forEach(g => {
      const r = g.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      g.style.transform = `translate3d(0,${(r.top * -.18).toFixed(1)}px,0)`;
    });
    screens.forEach(s => {
      const r = s.getBoundingClientRect();
      s.style.setProperty('--t', clamp((vh - r.top) / (vh * .75)).toFixed(3));
    });
  }
}
addEventListener('scroll', () => { if (!mTick){ mTick = true; requestAnimationFrame(motionFrame); } }, {passive:true});
motionFrame();

/* ============================================================
   HERO ART — a single glass product card that swings into place
   and tilts toward the pointer
   ============================================================ */
(() => {
  const stage = $('#stage');
  if (!stage || REDUCE) return;
  stage.classList.add('pre');
  setTimeout(() => { stage.classList.remove('pre'); setTimeout(() => stage.classList.add('settled'), 1600); }, 1100);
  if (HOVER){
    $('#prologue').addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      stage.style.setProperty('--ry', (-14 + x * 22).toFixed(2) + 'deg');
      stage.style.setProperty('--rx', (8 - y * 16).toFixed(2) + 'deg');
    });
  }
})();

/* ============================================================
   MAGNETIC BUTTONS (pointer devices only)
   ============================================================ */
if (HOVER && !REDUCE){
  $$('.btn.primary, .pill, .lchip, .mail').forEach(b => {
    b.classList.add('mag');
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .28, y = (e.clientY - r.top - r.height / 2) * .38;
      b.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* ============================================================
   THEME — Floodlights ⇄ Test whites, revealed as a circle from the toggle
   ============================================================ */
(() => {
  const btn = $('#modeBtn'), txt = $('#modeTxt'), root = document.documentElement;
  const label = () => { const w = root.dataset.theme === 'whites'; txt.textContent = w ? 'Test whites' : 'Floodlights'; btn.setAttribute('aria-label', `Switch to ${w ? 'Floodlights' : 'Test whites'} theme`); };
  label();
  btn.addEventListener('click', e => {
    const next = root.dataset.theme === 'whites' ? '' : 'whites';
    const apply = () => {
      if (next) root.dataset.theme = next; else delete root.dataset.theme;
      try { localStorage.setItem('theme', next || 'floodlights'); } catch {}
      label(); dispatchEvent(new Event('themechange'));
    };
    if (!document.startViewTransition || REDUCE){ apply(); return; }
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`]},
        {duration:750, easing:'cubic-bezier(.2,.7,.2,1)', pseudoElement:'::view-transition-new(root)'});
    }).catch(() => {});
    vt.finished.catch(() => {});
  });
})();
