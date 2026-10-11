/* ============================================================
   Render + interactions. Content lives in data.js.
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER = matchMedia('(hover: hover)').matches;
const host = u => new URL(u).host;

$('#yr').textContent = new Date().getFullYear();

function toast(msg){
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- selected work ---------- */
$('#projects').innerHTML = WORK.map((w, i) => `
  <article class="project reveal" id="p-${w.id}">
    <div class="copy">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <span class="meta">${esc(w.kind)} · ${esc(w.sector)} · ${esc(w.year)}</span>
      <h3>${esc(w.name)}</h3>
      <p class="brief">${esc(w.brief)}</p>
      <p class="role"><b>My role</b>${esc(w.role)}</p>
      <ul class="did">${w.did.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      <div class="tags">${w.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="go">
        ${w.cs ? `<a class="btn primary" href="${esc(w.cs)}">Read the case study</a>` : ''}
        <a class="btn ghost" href="${esc(w.url)}" target="_blank" rel="noopener">Open ${esc(w.label || host(w.url))} ↗</a>
      </div>
      ${w.note ? `<span class="note">${esc(w.note)}</span>` : ''}
    </div>
    <a class="screen${w.tall ? ' tall' : ''}" href="${esc(w.url)}" target="_blank" rel="noopener" aria-label="Open ${esc(w.name)} live">
      <span class="chrome"><i></i><i></i><i></i><span class="url"><em>live</em>${esc(w.label || host(w.url))}</span></span>
      <span class="viewport"><img src="${esc(w.img)}" alt="Screenshot of ${esc(w.name)}" loading="lazy"></span>
    </a>
  </article>`).join('');

/* hover to scroll through the page; touch devices get a slow autoscroll instead */
$$('.screen.tall').forEach(s => {
  const img = $('img', s), vp = $('.viewport', s);
  const shift = () => Math.max(0, img.offsetHeight - vp.offsetHeight);
  const setEnd = () => img.style.setProperty('--end', `-${shift()}px`);
  img.complete ? setEnd() : img.addEventListener('load', setEnd);
  addEventListener('resize', setEnd);
  if (!HOVER || REDUCE) return;
  s.addEventListener('mouseenter', () => {
    const d = shift();
    s.style.setProperty('--dur', (d / 260).toFixed(2) + 's');
    s.classList.add('scrolling');
    img.style.transform = `translateY(-${d}px)`;
  });
  s.addEventListener('mouseleave', () => { s.classList.remove('scrolling'); img.style.transform = ''; });
});

/* ---------- experience ---------- */
$('#xp').innerHTML = EXPERIENCE.map(x => `<div class="xrow reveal">
  <span class="when">${esc(x.when)}</span>
  <div><h3>${esc(x.title)}</h3><small>${esc(x.org)}</small>
  <ul>${x.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
</div>`).join('');
$('#leadership').textContent = LEADERSHIP;

/* ---------- more work ---------- */
$('#moreList').innerHTML = MORE.map(m => `<div class="mrow reveal">
  <span class="kind">${esc(m.kind)}</span>
  <div><h3>${esc(m.title)}</h3><p>${esc(m.blurb)}</p></div>
  <div class="links">${m.links.map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>
</div>`).join('');

/* ---------- skills ---------- */
$('#skillGrid').innerHTML = SKILLS.map(s => `<div class="sgroup reveal">
  <h3>${esc(s.group)}</h3>
  <ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
</div>`).join('');

/* ---------- reveal on scroll ---------- */
if ('IntersectionObserver' in window && !REDUCE){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }), {rootMargin:'0px 0px -8% 0px'});
  $$('.reveal').forEach(el => io.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('in'));

/* ---------- nav: progress bar + current section ---------- */
const bar = $('#progress'), links = $$('.sections a[href^="#"]');
const targets = links.map(a => $(a.getAttribute('href')));
let ticking = false;
function onScroll(){
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  let cur = -1;
  targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('on', i === cur));
}
addEventListener('scroll', () => { if (!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
onScroll();

/* ---------- contact ---------- */
$('#copyMail').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(CONFIG.email); toast('Email copied'); }
  catch { toast('Copy failed. Select the address instead'); }
});

/* ---------- theme: Floodlights ⇄ Test whites, revealed as a circle from the toggle ---------- */
(() => {
  const btn = $('#modeBtn'), txt = $('#modeTxt'), root = document.documentElement;
  const label = () => {
    const w = root.dataset.theme === 'whites';
    txt.textContent = w ? 'Test whites' : 'Floodlights';
    btn.setAttribute('aria-label', `Switch to ${w ? 'Floodlights' : 'Test whites'} theme`);
  };
  label();
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'whites' ? '' : 'whites';
    const apply = () => {
      if (next) root.dataset.theme = next; else delete root.dataset.theme;
      try { localStorage.setItem('theme', next || 'floodlights'); } catch {}
      label();
    };
    if (!document.startViewTransition || REDUCE){ apply(); return; }
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`]},
        {duration:700, easing:'cubic-bezier(.2,.7,.2,1)', pseudoElement:'::view-transition-new(root)'});
    }).catch(() => {});
    vt.finished.catch(() => {});
  });
})();
