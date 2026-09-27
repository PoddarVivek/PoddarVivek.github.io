/* ============================================================
   Render + interactions. Content lives in data.js.
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER = matchMedia('(hover: hover)').matches;
const host = u => new URL(u).host;
const goTo = el => window.lenis ? window.lenis.scrollTo(el, {offset:-72}) : el.scrollIntoView({behavior: REDUCE ? 'auto' : 'smooth'});

$('#yr').textContent = new Date().getFullYear();

function toast(msg){
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- reveal + count-up, checked from the scroll loop below ---------- */
let pending = [];
const observe = (root = document) => {
  pending.push(...$$('.reveal:not(.in), [data-count]:not(.counted)', root));
  if (typeof checkViewport === 'function') checkViewport();
};
function countUp(el){
  el.classList.add('counted');
  const end = +el.dataset.count, suf = el.dataset.suffix || '';
  const fmt = v => Math.round(v).toLocaleString('en-IN') + suf;
  if (REDUCE){ el.textContent = fmt(end); return; }
  const t0 = performance.now(), D = 1300;
  (function tick(now){
    const p = Math.min(1, (now - t0) / D);
    el.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
function checkViewport(){
  const vh = innerHeight;
  pending = pending.filter(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * .9 && r.bottom > 0){
      el.dataset.count !== undefined && !el.classList.contains('reveal') ? countUp(el) : el.classList.add('in');
      return false;
    }
    return true;
  });
  // chapter label: the last chapter whose top has passed the middle of the screen
  let cur = null;
  for (const s of chapters) if (s.getBoundingClientRect().top < vh * .5) cur = s;
  if (cur && $('#chName').textContent !== cur.dataset.name){
    $('#chNum').textContent = cur.dataset.ch;
    $('#chName').textContent = cur.dataset.name;
    chEl.classList.remove('swap'); void chEl.offsetWidth; chEl.classList.add('swap');
  }
}
const chapters = $$('[data-ch]'), chEl = $('.chapter');

/* ============================================================
   PROLOGUE — live chips + spotlight that follows the cursor
   ============================================================ */
$('#liveChips').innerHTML = LIVE.map(l =>
  `<a class="lchip" href="${esc(l.url)}" target="_blank" rel="noopener"><i></i>${esc(l.name)} <small>↗</small></a>`).join('');
if (HOVER && !REDUCE){
  const pro = $('#prologue'), glow = $('.glow', pro);
  pro.addEventListener('pointermove', e => {
    const r = pro.getBoundingClientRect();
    glow.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    glow.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
}

/* ============================================================
   CHAPTER 3 — live product showcases
   ============================================================ */
$('#shows').innerHTML = LIVE.map((l, i) => `
  <article class="show reveal" id="s-${l.id}">
    <div class="copy">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <span class="sector">${esc(l.sector)} · ${esc(l.year)}</span>
      <h3>${esc(l.name)}</h3>
      <p class="brief">${esc(l.brief)}</p>
      <div class="learned"><b>What I had to learn first</b><p>${esc(l.learned)}</p></div>
      <ul class="shipped">${l.shipped.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="tags">${l.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="go">
        ${l.cs ? `<a class="btn primary" href="${esc(l.cs)}">Read the case study →</a>` : ''}
        <a class="btn ghost" href="${esc(l.url)}" target="_blank" rel="noopener">Open ${esc(host(l.url))} ↗</a>
      </div>
      ${l.note ? `<span class="note">${esc(l.note)}</span>` : ''}
    </div>
    <div class="sw"><a class="screen${l.tall ? ' tall' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="Open ${esc(l.name)} live site">
      <span class="chrome"><i></i><i></i><i></i><span class="url"><em>live</em>${esc(host(l.url))}</span></span>
      <span class="viewport"><img src="${esc(l.img)}" alt="Screenshot of ${esc(l.name)}" loading="lazy"></span>
    </a></div>
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

/* cursor label over the screens */
if (HOVER){
  const tag = $('#cursorTag');
  $$('.screen').forEach(s => {
    s.addEventListener('mouseenter', () => tag.classList.add('on'));
    s.addEventListener('mouseleave', () => tag.classList.remove('on'));
    s.addEventListener('mousemove', e => { tag.style.left = e.clientX + 'px'; tag.style.top = e.clientY + 'px'; });
  });
}

/* ============================================================
   CHAPTER 1 — scroll-scrubbed paragraph
   CHAPTER 2 — pinned horizontal learning curve
   ============================================================ */
const FLAT = REDUCE || innerWidth < 760;
const KEYWORDS = new Set(['electronics.', 'other', 'side', 'teaching', 'myself']);
const scrub = $('#scrub');
scrub.innerHTML = scrub.textContent.trim().split(/\s+/).map(w =>
  `<span class="w${KEYWORDS.has(w.toLowerCase().replace(/[,—]/g, '')) ? ' key' : ''}">${esc(w)}</span> `).join('');
const words = $$('.w', scrub);

const curve = $('#curve'), track = $('#track');
curve.style.setProperty('--steps', CURVE.length);
track.innerHTML = CURVE.map((c, i) => `<li class="step" style="--i:${i}">
  <span class="yr">${esc(c.year)}</span><span class="tg">${esc(c.tag)}</span>
  <h3>${esc(c.learned)}</h3>
  <p><b>Proof</b>${esc(c.proof)}</p></li>`).join('');
const steps = $$('.step', track);

if (FLAT){
  $('#detour').classList.add('flat'); curve.classList.add('flat');
  words.forEach(w => w.classList.add('on'));
  steps.forEach(s => s.classList.add('lit'));
}

const svg = $('#curveSvg'), pathBg = $('#curvePath'), pathDraw = $('#curveDraw');
let curveLen = 0, maxShift = 0;
function layoutCurve(){
  if (FLAT) return;
  const wrap = $('.track-wrap');
  const cardH = Math.max(...steps.map(s => s.offsetHeight));
  track.style.setProperty('--rise', Math.max(0, (wrap.offsetHeight - cardH) / (steps.length - 1)) + 'px');
  maxShift = Math.max(0, track.scrollWidth - innerWidth);
  // path through the top-centre of every card, as a smooth rising curve
  const pts = steps.map(s => [s.offsetLeft + s.offsetWidth / 2, s.offsetTop - 18]);
  let d = `M${pts[0][0] - 160} ${pts[0][1] + 60} C${pts[0][0] - 60} ${pts[0][1] + 40} ${pts[0][0] - 40} ${pts[0][1]} ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++){
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
    d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
  }
  svg.setAttribute('width', track.scrollWidth); svg.setAttribute('height', wrap.offsetHeight);
  pathBg.setAttribute('d', d); pathDraw.setAttribute('d', d);
  curveLen = pathDraw.getTotalLength();
  pathDraw.style.strokeDasharray = curveLen;
}

/* ---------- one scroll loop drives the scrub, the curve and the HUD ---------- */
const bar = $('#progress');
let ticking = false;
function onScroll(){
  ticking = false;
  const y = scrollY, vh = innerHeight;
  bar.style.transform = `scaleX(${clamp(y / (document.documentElement.scrollHeight - vh))})`;
  checkViewport();
  if (FLAT) return;
  const det = $('#detour');
  const pd = clamp((y - det.offsetTop) / (det.offsetHeight - vh) * 1.15);
  const lit = Math.round(pd * words.length);
  words.forEach((w, i) => w.classList.toggle('on', i < lit));

  const pc = clamp((y - curve.offsetTop) / (curve.offsetHeight - vh));
  const tx = -pc * maxShift;
  track.style.transform = `translate3d(${tx}px,0,0)`;
  svg.style.transform = `translate3d(${tx}px,0,0)`;
  pathDraw.style.strokeDashoffset = curveLen * (1 - clamp(pc * 1.08));
  steps.forEach(s => s.classList.toggle('lit', s.offsetLeft + tx < innerWidth * .72));
  $('#curveHint').textContent = pc > .96 ? 'Keep scrolling ↓' : 'Keep scrolling →';
}
addEventListener('scroll', () => { if (!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
addEventListener('resize', () => { layoutCurve(); onScroll(); });
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { layoutCurve(); onScroll(); });

/* ============================================================
   CHAPTER 4 — the workbench
   ============================================================ */
const TOOL_MATCH = {
  'UI Design':['ui/ux','dashboard design','design system'], 'UX Research':['ux research','user research','ux'],
  'Design Systems':['design system'], 'Prototyping':['prototype'], 'PRD Writing':['prd'],
};
const textOf = p => [p.name, p.title, p.sector, p.blurb, p.brief, ...(p.tags || []), ...(p.shipped || [])].join(' ').toLowerCase();
const matches = (p, skill) => (TOOL_MATCH[skill] || [skill.toLowerCase()]).some(k => textOf(p).includes(k));
const GLYPHS = {
  data:'<rect class="gb" x="6" y="22" width="5" height="12" rx="1"/><rect class="gb" x="14" y="14" width="5" height="20" rx="1"/><rect class="gb" x="22" y="18" width="5" height="16" rx="1"/><rect class="gb" x="30" y="8" width="5" height="26" rx="1"/>',
  ml:'<path d="M8 10 20 20 8 30M20 20h12M32 20 20 8M32 20 20 32"/><circle class="node" cx="8" cy="10" r="3"/><circle class="node" cx="8" cy="30" r="3"/><circle class="node" cx="20" cy="20" r="3.5"/><circle class="node" cx="32" cy="20" r="3"/><circle class="node" cx="20" cy="8" r="2.5"/><circle class="node" cx="20" cy="32" r="2.5"/>',
  product:'<rect x="5" y="6" width="30" height="28" rx="4"/><path d="M5 13h30"/><rect class="blk" x="10" y="18" width="18" height="3" rx="1.5"/><rect class="blk" x="10" y="25" width="12" height="3" rx="1.5"/>',
  hw:'<g class="chip"><rect x="11" y="11" width="18" height="18" rx="3"/><rect x="16" y="16" width="8" height="8" rx="1"/><path d="M15 11V6M20 11V6M25 11V6M15 29v5M20 29v5M25 29v5M11 15H6M11 20H6M11 25H6M29 15h5M29 20h5M29 25h5"/></g>',
};
const glyph = kind => `<svg class="glyph" viewBox="0 0 40 40" aria-hidden="true">${GLYPHS[kind] || GLYPHS.product}</svg>`;
const B_INITIAL = 6;
const bench = {kind:'all', skill:null, expanded:false};
function benchCard(p){
  const live = LIVE.includes(p);
  const links = live
    ? `<a href="#s-${p.id}">See it in chapter 03 ↑</a>`
    : p.links.length ? p.links.map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')
    : `<span>Walkthrough on request</span>`;
  return `<article class="bcard reveal">${glyph(live ? 'product' : p.kind)}
    <div class="meta"><em>${live ? 'Live product' : esc(KINDS[p.kind])}</em><span>${esc(p.year)}</span></div>
    <h3>${esc(live ? p.name : p.title)}</h3>
    <p>${esc(live ? p.brief : p.blurb)}</p>
    <div class="tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    <div class="links">${links}</div>
  </article>`;
}
function renderBench(){
  const {kind, skill} = bench;
  const list = skill ? [...LIVE, ...BUILDS].filter(p => matches(p, skill))
                     : BUILDS.filter(p => kind === 'all' || p.kind === kind);
  const chips = [['all', 'Everything'], ...Object.entries(KINDS)];
  $('#benchFilters').innerHTML = chips.map(([k, l]) =>
    `<button type="button" class="chip" data-kind="${k}" aria-pressed="${!skill && kind === k}">${l}</button>`).join('')
    + (skill ? `<button type="button" class="chip skillf" data-clear>${esc(skill)} ✕</button>` : '')
    + `<span class="count">${list.length} project${list.length === 1 ? '' : 's'}</span>`;
  const collapse = kind === 'all' && !skill && !bench.expanded && list.length > B_INITIAL;
  $('#benchGrid').innerHTML = (collapse ? list.slice(0, B_INITIAL) : list).map(benchCard).join('');
  const more = $('#bMore');
  if (more){
    more.hidden = !(kind === 'all' && !skill && list.length > B_INITIAL);
    more.textContent = bench.expanded ? 'Show fewer ↑' : `Show all ${list.length} ↓`;
  }
  observe($('#benchGrid'));
}
$('#benchGrid').insertAdjacentHTML('afterend', '<button class="btn ghost more" type="button" id="bMore"></button>');
$('#benchFilters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.clear !== undefined) bench.skill = null;
  else { bench.kind = b.dataset.kind; bench.skill = null; }
  renderBench();
});
$('#bMore').addEventListener('click', () => { bench.expanded = !bench.expanded; renderBench(); });
$('#benchGrid').addEventListener('pointermove', e => {
  const c = e.target.closest('.bcard'); if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px');
});
$('#toolkit').innerHTML = TOOLKIT.map(t => {
  const has = [...LIVE, ...BUILDS].some(p => matches(p, t));
  return `<button type="button" data-skill="${esc(t)}" class="${has ? '' : 'none'}"${has ? '' : ' aria-disabled="true"'}>${esc(t)}</button>`;
}).join('');
$('#toolkit').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || b.classList.contains('none')) return;
  bench.skill = b.dataset.skill; renderBench();
  goTo($('#workbench'));
});
renderBench();

/* ============================================================
   CHAPTER 5 — the person (experience, education, certs, beyond)
   ============================================================ */
const GALLERIES = [];
const gal = (proofs, sub) => GALLERIES.push(proofs.map(p => ({...p, sub}))) - 1;
const thumbs = (proofs, sub) => {
  if (!proofs.length) return '<span></span>';
  const g = gal(proofs, sub);
  return `<div class="thumbs">${proofs.map((p, i) =>
    `<button type="button" class="thumb" data-g="${g}" data-p="${i}" aria-label="Open ${esc(p.label)}"><img src="${esc(p.src)}" alt="" loading="lazy"></button>`).join('')}</div>`;
};
$('#xp').innerHTML = EXPERIENCE.map(x => `<div class="xrow">
  <span class="when">${esc(x.when)}</span>
  <h4><span class="typ">${esc(x.type)}</span><br>${esc(x.title)}<small>${esc(x.org)}</small></h4>
  <p>${esc(x.detail)}</p>
  ${thumbs(x.proofs, `${x.title} · ${x.when}`)}
</div>`).join('');
$('#edu').innerHTML = EDUCATION.map(e => `<div class="ecard">
  <div><span class="when">${esc(e.when)}</span><h4>${esc(e.title)}</h4><small>${esc(e.org)}</small></div>
  ${thumbs(e.proofs, e.title)}
</div>`).join('');
$('#certs').innerHTML = CERTS.map(c => `<button type="button" class="cert" data-g="${gal([{label:c.title, src:c.src}], c.org)}" data-p="0">
  <img src="${esc(c.src)}" alt="" loading="lazy"><span><b>${esc(c.title)}</b><small>${esc(c.org)}</small></span></button>`).join('');
$('#beyond').innerHTML = BEYOND.map(b => `<button type="button" class="bey" data-g="${gal(b.proofs, b.title)}" data-p="0">
  <img src="${esc(b.proofs[0].src)}" alt="" loading="lazy"><span><b>${esc(b.title)}</b><small>${esc(b.note)}</small></span></button>`).join('');

/* ---------- proof viewer ---------- */
let gallery = [], gIdx = 0, lastFocus = null;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-g]'); if (!b) return;
  gallery = GALLERIES[+b.dataset.g]; lastFocus = b; openProof(+b.dataset.p);
});
function openProof(i){
  gIdx = i;
  const p = gallery[i];
  $('#mTitle').textContent = p.label; $('#mSub').textContent = p.sub;
  $('#mImg').src = p.src; $('#mImg').alt = p.label;
  $('#mPos').textContent = gallery.length > 1 ? `${i + 1} / ${gallery.length}` : '';
  $('#mPrev').disabled = i === 0; $('#mNext').disabled = i === gallery.length - 1;
  $('.mnav').style.display = gallery.length > 1 ? '' : 'none';
  $('#modal').classList.add('open'); $('#mClose').focus();
}
function closeProof(){ $('#modal').classList.remove('open'); if (lastFocus) lastFocus.focus(); }
$('#mClose').onclick = closeProof;
$('#mPrev').onclick = () => gIdx > 0 && openProof(gIdx - 1);
$('#mNext').onclick = () => gIdx < gallery.length - 1 && openProof(gIdx + 1);
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeProof(); });

/* ============================================================
   CHAPTER 6 — face an over: each question is a delivery
   ============================================================ */
const OVER_RUNS = [4, 6, 4, 6, 6, 4];
const over = {n:0, faced:[], runs:0, busy:false};
const overQs = () => QNA.slice(over.n * 6, over.n * 6 + 6);
function renderOver(){
  const qs = overQs();
  $('#overNo').textContent = over.n + 1;
  $('#deliveries').innerHTML = qs.map((p, i) =>
    `<button type="button" class="dlv${over.faced.includes(i) ? ' done' : ''}" data-i="${i}"><span>${over.n + 1}.${i + 1}</span>${esc(p.q)}</button>`).join('');
  $('#balls').innerHTML = Array.from({length:6}, (_, i) => {
    const f = over.faced.includes(i);
    return `<i class="${f ? 'hit' : ''}">${f ? OVER_RUNS[i] : ''}</i>`;
  }).join('');
}
function bowl(label, q, answer, runs){
  if (over.busy) return;
  over.busy = true;
  const pitch = $('.pitch'), ball = $('#delivery'), cm = $('#commentary');
  pitch.classList.remove('bowling'); void pitch.offsetWidth; pitch.classList.add('bowling');
  cm.classList.add('waiting');
  $('#cmTag').textContent = `${label} · bowling…`;
  $('#cmQ').textContent = q;
  $('#cmA').textContent = '';
  setTimeout(() => {
    cm.classList.remove('waiting');
    $('#cmTag').textContent = runs ? `${label} · ${runs === 6 ? 'SIX' : 'FOUR'}` : `${label} · dot ball`;
    if (runs){ over.runs += runs; $('#runs').textContent = over.runs; $('#runs').classList.remove('pop'); void $('#runs').offsetWidth; $('#runs').classList.add('pop'); }
    const words = answer.split(' '); let n = 0;
    const el = $('#cmA');
    if (REDUCE){ el.innerHTML = answer; over.busy = false; return; }
    const iv = setInterval(() => {
      el.innerHTML = words.slice(0, ++n).join(' ');
      if (n >= words.length){ clearInterval(iv); over.busy = false; afterBall(); }
    }, 24);
  }, REDUCE ? 0 : 1050);
}
function afterBall(){
  if (over.faced.length < 6) return;
  const more = (over.n + 1) * 6 < QNA.length;
  $('#cmTag').textContent += ' · over complete';
  $('#cmA').insertAdjacentHTML('beforeend', `<span class="over-end">${more
    ? `That's the over. <button type="button" class="lnk-btn" id="nextOver">Bowl another →</button> or <a href="#next">let's talk</a>.`
    : `That's the innings. <a href="#next">Let's talk</a> — I'd rather answer the rest in person.`}</span>`);
  const nb = $('#nextOver');
  if (nb) nb.onclick = () => { over.n++; over.faced = []; renderOver(); $('#cmTag').textContent = `Over ${over.n + 1}`; $('#cmQ').textContent = 'New over. Pick a delivery.'; $('#cmA').textContent = ''; };
}
$('#deliveries').addEventListener('click', e => {
  const b = e.target.closest('.dlv'); if (!b || over.busy) return;
  const i = +b.dataset.i, p = overQs()[i];
  if (!over.faced.includes(i)) over.faced.push(i);
  bowl(`${over.n + 1}.${i + 1}`, p.q, esc(p.a), OVER_RUNS[i]);
  renderOver();
});
function answerFor(text){
  const s = text.toLowerCase();
  let best = null, score = 0;
  QNA.forEach(p => {
    const sc = p.k.reduce((a, k) => a + (s.includes(k) ? k.length : 0), 0);
    if (sc > score){ score = sc; best = p; }
  });
  return best;
}
$('#askForm').addEventListener('submit', e => {
  e.preventDefault();
  const inp = $('#askInput'), q = inp.value.trim();
  if (!q || over.busy) return;
  inp.value = '';
  const p = answerFor(q);
  if (p) bowl('Your ball', q, esc(p.a), 6);
  else bowl('Your ball', q, `Good ball — that one deserves a real conversation, not a prepared answer. <a href="#next">Send it to me</a> and I'll play it properly.`, 0);
});
renderOver();

/* ============================================================
   CHAPTER 7 — brief builder: drafts an email
   ============================================================ */
const bf = $('#briefForm');
function buildBrief(){
  const about = (bf.querySelector('input[name=about]:checked') || {}).value;
  const name = $('#bName').value.trim(), co = $('#bCompany').value.trim();
  const intro = name ? `I'm ${name}${co ? ` from ${co}` : ''}. ` : co ? `I'm reaching out from ${co}. ` : '';
  const topic = about && about !== 'something else' ? ` about ${about}` : '';
  return [`Hi Vivek,`, ``, `${intro}I went through your portfolio and would like to talk${topic}.`, ``,
    `When are you free for a quick call?`, ``, name ? `Thanks,\n${name}` : `Thanks!`].join('\n');
}
function subject(){
  const about = (bf.querySelector('input[name=about]:checked') || {}).value;
  const co = $('#bCompany').value.trim();
  const what = about && about !== 'something else' ? about[0].toUpperCase() + about.slice(1) : 'Hello';
  return `${what}${co ? ' — ' + co : ''} (via your portfolio)`;
}
function renderBrief(){ $('#bPreview').innerHTML = '<b>Your email</b>' + esc(buildBrief()); }
bf.addEventListener('input', renderBrief); renderBrief();
bf.addEventListener('submit', e => {
  e.preventDefault();
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(buildBrief())}`;
  toast('Opening your email app');
});
$('#bCopy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(`To: ${CONFIG.email}\nSubject: ${subject()}\n\n${buildBrief()}`); toast('Copied'); }
  catch { toast('Copy failed — select the preview text instead'); }
});

/* ---------- résumé + keyboard shortcuts ---------- */
document.addEventListener('click', e => { if (e.target.closest('[data-resume]')) toast('Résumé downloading — thanks for reading'); });
document.addEventListener('keydown', e => {
  const open = $('#modal').classList.contains('open');
  if (open){
    if (e.key === 'Escape') closeProof();
    if (e.key === 'ArrowLeft') $('#mPrev').click();
    if (e.key === 'ArrowRight') $('#mNext').click();
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === 'r') $('.hud [data-resume]').click();
  if (k === 'w') goTo($('#proof'));
  if (k === 'c') location.href = 'case-studies/';
});

observe();
