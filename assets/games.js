/* ============================================================
   games.js — DOM matching game (terminology practice)
   Auto-initialises every .match-box carrying data-match-json.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);
  const trunc = s => (s.length > 90 ? s.slice(0, 88) + '…' : s);

  function matchGame(box) {
    const script = $('[data-match-json]', box);
    if (!script) return;
    let pairs = [];
    try { pairs = JSON.parse(script.textContent); } catch (e) { return; }
    script.remove();
    if (!pairs.length) return;

    const cols = document.createElement('div');
    cols.className = 'm-cols';
    const Lc = document.createElement('div');
    Lc.className = 'm-col';
    const Rc = document.createElement('div');
    Rc.className = 'm-col';
    const meta = document.createElement('div');
    meta.className = 'm-meta small muted';
    box.appendChild(meta);
    box.appendChild(cols);
    cols.appendChild(Rc);   // terms on right (RTL natural reading start)
    cols.appendChild(Lc);   // definitions on left

    let done = 0, moves = 0, sel = null, started = false, t0 = 0;
    const byId = {};

    function chip(p, side) {
      const d = document.createElement('button');
      d.className = 'm-chip';
      d.dataset.id = p.id;
      d.dataset.side = side;
      d.innerHTML = side === 't' ? `<span class="m-en">${esc(p.a)}</span>` : `<span>${esc(trunc(p.b))}</span>`;
      byId[side + p.id] = d;
      d.onclick = () => click(d, side);
      return d;
    }

    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

    function click(d, side) {
      if (d.classList.contains('ok')) return;
      if (!started) { started = true; t0 = Date.now(); tick(); }
      if (d.classList.contains('sel')) { d.classList.remove('sel'); sel = null; return; }
      if (sel && sel.side === side) sel.el.classList.remove('sel');
      d.classList.add('sel');
      if (!sel) { sel = { el: d, side, id: d.dataset.id }; return; }
      // two chips selected
      moves++;
      if (sel.id === d.dataset.id) {
        d.classList.remove('sel'); sel.el.classList.remove('sel');
        d.classList.add('ok'); sel.el.classList.add('ok');
        d.disabled = true; sel.el.disabled = true;
        done++;
        meta.textContent = `✓ ${done} / ${pairs.length} صحيح · ${moves} محاولة`;
        if (done === pairs.length) win();
      } else {
        const bad = d, other = sel.el;
        bad.classList.add('no'); other.classList.add('no');
        setTimeout(() => { bad.classList.remove('no'); other.classList.remove('no'); bad.classList.remove('sel'); other.classList.remove('sel'); }, 550);
      }
      sel = null;
    }

    function tick() {
      if (done === pairs.length) return;
      const s = Math.floor((Date.now() - t0) / 1000);
      if (started) meta.textContent = `${done} / ${pairs.length} · ${moves} محاولة · ⏱ ${s}ث`;
      setTimeout(tick, 1000);
    }

    function win() {
      const s = Math.floor((Date.now() - t0) / 1000);
      const banner = document.createElement('div');
      banner.className = 'm-win';
      banner.innerHTML = `🏆 حليت كل الـ ${pairs.length} في ${moves} محاولة و ${s} ثانية!<br><button class="btn sm" id="magain">العب مرة ثانية 🔄</button>`;
      box.appendChild(banner);
      $('#magain', banner).onclick = () => matchGame(box);
      meta.textContent = `🎉 كامل ${pairs.length} / ${pairs.length} في ${moves} محاولة`;
    }

    shuffle(pairs).forEach(p => Rc.appendChild(chip(p, 't')));
    shuffle(pairs).forEach(p => Lc.appendChild(chip(p, 'd')));
    meta.textContent = `0 / ${pairs.length} — اضغط مصطلح ثم معناه`;
  }

  function initAll() { $$('.match-box').forEach(matchGame); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
