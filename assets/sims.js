/* ============================================================
   sims.js — 2D canvas simulations
   data-sim="stats"   (C5: centre & spread lab, draggable dots)
   data-sim="sampling"(C4: population, frame & sampling designs)
   data-sim="clt"     (C6: central limit theorem builder)
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
  const median = a => {
    if (!a.length) return 0;
    const s = a.slice().sort((x, y) => x - y);
    const m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  const sd = a => { if (a.length < 2) return 0; const m = mean(a); return Math.sqrt(mean(a.map(v => (v - m) ** 2))); };
  const quantile = (a, q) => {
    if (!a.length) return 0;
    const s = a.slice().sort((x, y) => x - y);
    const p = (s.length - 1) * q;
    const lo = Math.floor(p), hi = Math.ceil(p);
    return s[lo] + (s[hi] - s[lo]) * (p - lo);
  };
  const fmt = (x, d) => (Math.round(x * 10 ** (d || 1)) / 10 ** (d || 1)).toFixed(d || 1);

  function ctx2d(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || canvas.parentElement.clientWidth || 700;
    const h = +canvas.getAttribute('height') || 320;
    canvas.width = w * dpr; canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx, w, h };
  }

  /* ============================================================
     SIM: stats — centre & spread lab (C5)
     ============================================================ */
  function simStats(canvas, cfg) {
    const box = canvas.parentElement;
    let data = (cfg.start || [8, 14, 20, 26, 34, 40, 46, 52, 58, 64, 70, 76, 82]).map(Number);
    let drag = null;

    const ui = document.createElement('div');
    ui.className = 'game-foot';
    ui.innerHTML = `
      <button class="btn sm" data-a="add">+ نقطة عشوائية</button>
      <button class="btn sm" data-a="out">+ نقطة شاذة</button>
      <button class="btn sm ghost" data-a="pop">- آخر نقطة</button>
      <button class="btn sm ghost" data-a="reset">تصفير</button>
      <span class="small muted">اسحب أي نقطة لتغيّر قيمتها وشوف كيف يتغير Mean / Median</span>`;
    box.appendChild(ui);
    ui.addEventListener('click', e => {
      const a = e.target.dataset && e.target.dataset.a;
      if (a === 'add') data.push(Math.round(rand(5, 90)));
      else if (a === 'out') data.push(Math.random() < 0.5 ? Math.round(rand(0, 4)) : Math.round(rand(96, 100)));
      else if (a === 'pop') data.pop();
      else if (a === 'reset') data = (cfg.start || []).map(Number);
      draw();
    });

    function draw() {
      const { ctx, w, h } = ctx2d(canvas);
      const pad = 30;
      const X = v => pad + (v / 100) * (w - pad * 2);
      const lineY = h * 0.22;

      // axis
      ctx.strokeStyle = '#22333f'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad, lineY); ctx.lineTo(w - pad, lineY); ctx.stroke();
      ctx.fillStyle = '#5b7282'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
      for (let v = 0; v <= 100; v += 20) {
        ctx.fillText(v, X(v), lineY + 14);
        ctx.strokeStyle = '#16232e';
        ctx.beginPath(); ctx.moveTo(X(v), lineY - 4); ctx.lineTo(X(v), lineY + 4); ctx.stroke();
      }

      // dot plot (stacked)
      const bins = {};
      data.forEach(v => { const b = Math.round(v / 4) * 4; bins[b] = (bins[b] || 0) + 1; });
      const counts = {};
      Object.keys(bins).forEach(b => counts[b] = 0);
      data.forEach(v => {
        const b = Math.round(v / 4) * 4;
        const x = X(v);
        const y = lineY - 12 - counts[b] * 11;
        counts[b]++;
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, 7);
        ctx.fillStyle = drag && drag.i === data.indexOf(v) ? '#ffd98a' : '#57c7d8';
        ctx.fill();
      });

      // histogram
      const hY = h * 0.42, hH = h * 0.26;
      const nB = 25, bw = (w - pad * 2) / nB;
      const hist = new Array(nB).fill(0);
      data.forEach(v => hist[clamp(Math.floor(v / 100 * nB), 0, nB - 1)]++);
      const mx = Math.max(...hist, 1);
      hist.forEach((c, i) => {
        const bh = (c / mx) * hH;
        ctx.fillStyle = 'rgba(87,199,216,.35)';
        ctx.fillRect(pad + i * bw + 1, hY + hH - bh, bw - 2, bh);
        ctx.strokeStyle = 'rgba(87,199,216,.6)';
        ctx.strokeRect(pad + i * bw + 1, hY + hH - bh, bw - 2, bh);
      });

      // boxplot
      const bY = h * 0.80;
      const q1 = quantile(data, .25), q2 = median(data), q3 = quantile(data, .75);
      const mn = Math.min.apply(null, data.concat([0])), mxv = Math.max.apply(null, data.concat([0]));
      const iqr = q3 - q1;
      const loFence = Math.max(mn, q1 - 1.5 * iqr), hiFence = Math.min(mxv, q3 + 1.5 * iqr);
      ctx.strokeStyle = '#8fd3c0'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(X(loFence), bY); ctx.lineTo(X(hiFence), bY); ctx.stroke();
      ctx.strokeRect(X(q1), bY - 11, Math.max(2, X(q3) - X(q1)), 22);
      ctx.beginPath(); ctx.moveTo(X(q2), bY - 13); ctx.lineTo(X(q2), bY + 13); ctx.stroke();
      data.forEach(v => {
        if (v < loFence || v > hiFence) {
          ctx.beginPath(); ctx.arc(X(v), bY, 3.5, 0, 7);
          ctx.fillStyle = '#e08a8a'; ctx.fill();
        }
      });
      ctx.fillStyle = '#8fd3c0'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
      ctx.fillText('Q1 ' + fmt(q1), X(q1), bY + 26);
      ctx.fillText('Median ' + fmt(q2), X(q2), bY - 18);
      ctx.fillText('Q3 ' + fmt(q3), X(q3), bY + 26);

      // mean & median lines
      const m = mean(data), md = median(data);
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#d8b65a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(X(m), lineY - 70); ctx.lineTo(X(m), bY + 8); ctx.stroke();
      ctx.strokeStyle = '#5fcf80';
      ctx.beginPath(); ctx.moveTo(X(md), lineY - 70); ctx.lineTo(X(md), bY + 8); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#d8b65a'; ctx.textAlign = m > md ? 'left' : 'right';
      ctx.fillText('Mean ' + fmt(m), X(m) + (m > md ? 5 : -5), lineY - 74);
      ctx.fillStyle = '#5fcf80'; ctx.textAlign = m > md ? 'right' : 'left';
      ctx.fillText('Median ' + fmt(md), X(md) + (m > md ? -5 : 5), lineY - 60);

      // readout
      const s = sd(data), skew = m - md;
      const note = Math.abs(skew) < 1.5 ? 'البيانات تقريبًا متناظرة ⟹ Mean ≈ Median'
        : skew > 0 ? 'ملتوية لليمين (right-skewed) ⟹ Mean > Median — القيم الشاذة العالية تسحب المتوسط'
          : 'ملتوية لليسار (left-skewed) ⟹ Mean < Median — القيم الشاذة الواطية تسحب المتوسط';
      ctx.fillStyle = '#9fb3c1'; ctx.font = '12px Tajawal, sans-serif'; ctx.textAlign = 'right';
      const ro = `n = ${data.length}   Mean = ${fmt(m)}   Median = ${fmt(md)}   SD = ${fmt(s)}   IQR = ${fmt(iqr)}   Range = ${fmt(Math.max.apply(null, data.concat([0])) - Math.min.apply(null, data.concat([0])))}`;
      ctx.fillStyle = '#cfe8ee';
      ctx.fillText(ro, w - pad, 16);
      ctx.fillStyle = '#8fa6b8';
      ctx.font = '11px Tajawal, sans-serif';
      ctx.fillText(note, w - pad, h - 6);
    }

    canvas.addEventListener('pointerdown', e => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const pad = 30;
      const X = v => pad + (v / 100) * (r.width - pad * 2);
      let best = -1, bd = 1e9;
      data.forEach((v, i) => { const d = Math.abs(X(v) - x); if (d < bd) { bd = d; best = i; } });
      if (bd < 20) { drag = { i: best }; canvas.setPointerCapture(e.pointerId); }
    });
    canvas.addEventListener('pointermove', e => {
      if (!drag) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const pad = 30;
      data[drag.i] = clamp(Math.round((x - pad) / (r.width - pad * 2) * 100), 0, 100);
      draw();
    });
    canvas.addEventListener('pointerup', () => { drag = null; draw(); });
    new ResizeObserver(() => draw()).observe(canvas);
    draw();
  }

  /* ============================================================
     SIM: sampling — population, frame & designs (C4)
     ============================================================ */
  function simSampling(canvas, cfg) {
    const box = canvas.parentElement;
    const COLS = 20, ROWS = 10, N = COLS * ROWS;
    const units = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const stratum = c < 7 ? 0 : c < 13 ? 1 : 2;      // 3 vertical strata
        units.push({ r, c, stratum, inFrame: !(r >= 7 && c >= 16), sel: 0 });   // bottom-right corner outside frame
      }
    const SCOL = ['#57c7d8', '#8fd3c0', '#c79fe8'];
    let method = 'srs', anim = null;

    const ui = document.createElement('div');
    ui.className = 'game-foot';
    ui.innerHTML = `
      <label><input type="radio" name="m" value="srs" checked> SRS</label>
      <label><input type="radio" name="m" value="strat"> Stratified</label>
      <label><input type="radio" name="m" value="sys"> Systematic</label>
      <label><input type="radio" name="m" value="cluster"> Cluster</label>
      <label><input type="radio" name="m" value="conv"> Convenience</label>
      <button class="btn sm" id="sdraw">اسحب عيّنة (n=20)</button>
      <span class="small muted">الزاوية اليمنى السفلى = وحدات خارج الإطار (X) — جرب كل طريقة وشوف أي وحدة تختار</span>`;
    box.appendChild(ui);
    $$('input', ui).forEach(i => i.onchange = () => { method = i.value; });
    $('#sdraw', ui).onclick = draw;

    function pick(n) {
      const frame = units.filter(u => u.inFrame);
      const chosen = [];
      if (method === 'srs') {
        const pool = frame.slice();
        for (let i = 0; i < n && pool.length; i++)
          chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      } else if (method === 'strat') {
        const strata = [[], [], []];
        frame.forEach(u => strata[u.stratum].push(u));
        const per = [0, 0, 0];
        for (let i = 0; i < n; i++) per[i % 3]++;
        strata.forEach((s, si) => {
          const pool = s.slice();
          for (let i = 0; i < per[si] && pool.length; i++)
            chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
        });
      } else if (method === 'sys') {
        const k = Math.floor(frame.length / n);
        const start = Math.floor(Math.random() * k);
        for (let i = 0; i < n; i++) chosen.push(frame[(start + i * k) % frame.length]);
      } else if (method === 'cluster') {
        // clusters = rows; pick 2 rows, take 10 each
        const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(rw => frame.some(u => u.r === rw));
        const a = rows.splice(Math.floor(Math.random() * rows.length), 1)[0];
        const b = rows.splice(Math.floor(Math.random() * rows.length), 1)[0];
        frame.filter(u => u.r === a || u.r === b).slice(0, n).forEach(u => chosen.push(u));
      } else {
        // convenience: only units on the outer edge (easy to reach)
        const easy = frame.filter(u => u.r === 0 || u.r === ROWS - 1 || u.c === 0 || u.c === COLS - 1);
        const pool = easy.slice();
        for (let i = 0; i < n && pool.length; i++)
          chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      }
      return chosen;
    }

    function draw() {
      const { ctx, w, h } = ctx2d(canvas);
      const cw = (w - 40) / COLS, ch = (h - 46) / ROWS;
      const ox = 20, oy = 8;
      units.forEach(u => {
        const x = ox + u.c * cw, y = oy + u.r * ch;
        ctx.beginPath();
        ctx.arc(x + cw / 2, y + ch / 2, Math.min(cw, ch) * 0.34, 0, 7);
        if (!u.inFrame) {
          ctx.fillStyle = '#1a2630'; ctx.fill();
          ctx.strokeStyle = '#e08a8a'; ctx.lineWidth = 1.2; ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + cw * .3, y + ch * .3); ctx.lineTo(x + cw * .7, y + ch * .7);
          ctx.moveTo(x + cw * .7, y + ch * .3); ctx.lineTo(x + cw * .3, y + ch * .7);
          ctx.strokeStyle = 'rgba(224,138,138,.7)'; ctx.stroke();
        } else {
          ctx.fillStyle = u.sel ? '#ffd98a' : SCOL[u.stratum];
          ctx.fill();
          if (u.sel) { ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 1.5; ctx.stroke(); }
        }
      });
      // legend
      ctx.font = '11px Tajawal, sans-serif'; ctx.textAlign = 'right';
      ctx.fillStyle = '#8fa6b8';
      ctx.fillText('ألوان البقع = شرائح (Strata) — أصفر = العيّنة المختارة — X = خارج الإطار (undercoverage)', w - 12, h - 8);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#cfe8ee'; ctx.font = 'bold 12px Tajawal, sans-serif';
      const names = { srs: 'Simple Random Sampling', strat: 'Stratified Sampling', sys: 'Systematic Sampling', cluster: 'Cluster Sampling', conv: 'Convenience Sampling' };
      ctx.fillText(names[method] || '', 12, h - 8);
    }

    $('#sdraw', ui).onclick = () => {
      units.forEach(u => u.sel = 0);
      const chosen = pick(20);
      if (anim) clearInterval(anim);
      let i = 0;
      anim = setInterval(() => {
        if (i < chosen.length) { chosen[i].sel = 1; i++; draw(); }
        else {
          clearInterval(anim); anim = null;
          draw();
          const box2 = canvas.parentElement;
          let note = box2.querySelector('.sim-note');
          if (!note) { note = document.createElement('div'); note.className = 'sim-note game-foot'; box2.appendChild(note); }
          const counts = [0, 0, 0];
          chosen.forEach(u => counts[u.stratum]++);
          const msgs = {
            srs: 'كل وحدة في الإطار لها نفس الفرصة — لكن يمكن يطلع توزيع الشرائح غير متوازن بالصدفة.',
            strat: 'موازن بين الشرائح الثلاثة → تقدير أدق لكل المجمتمع.',
            sys: 'منتظم وسهل، لكن خطورته لو في نمط دوري يطابق الخطوة k.',
            cluster: 'رخيص وسريع (الصفوف)، لكن أقل دقة لو الصفوف غير متجانسة.',
            conv: '⚠ تحيّز واضح: وحدات من الحافة فقط — الشرائح الداخلية مفقودة تمامًا!',
          };
          note.innerHTML = `<b>العيّنة:</b> ${chosen.length} وحدة · شرائح: ${counts.join(' / ')} — ${msgs[method]}`;
        }
      }, 90);
    };

    new ResizeObserver(() => draw()).observe(canvas);
    draw();
  }

  /* ============================================================
     SIM: clt — central limit theorem (C6)
     ============================================================ */
  const CLT_POPS = {
    skewed: { name: 'Right-skewed (exponential)', gen: () => -Math.log(1 - Math.random()) * 40, mu: 40, sg: 40 },
    uniform: { name: 'Uniform', gen: () => rand(0, 80), mu: 40, sg: 23.1 },
    bimodal: { name: 'Bimodal', gen: () => Math.random() < 0.5 ? 15 + rand(0, 12) : 60 + rand(0, 12), mu: 37.5, sg: 23.4 },
    normal: { name: 'Normal', gen: () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return 40 + 12 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }, mu: 40, sg: 12 },
  };
  function simCLT(canvas, cfg) {
    const box = canvas.parentElement;
    let pop = cfg.pop || 'skewed', n = cfg.n || 30, means = [];
    const P = () => CLT_POPS[pop];

    const ui = document.createElement('div');
    ui.className = 'game-foot';
    ui.innerHTML = `
      <label>المجتمع:
        <select id="cpop">
          <option value="skewed">منحرف لليمين</option>
          <option value="uniform">منتظم</option>
          <option value="bimodal">ثنائي القمة</option>
          <option value="normal">طبيعي</option>
        </select></label>
      <label>حجم العيّنة n: <input type="range" id="cn" min="1" max="80" value="${n}" style="width:110px"> <b id="cnv">${n}</b></label>
      <button class="btn sm" id="cone">ارسم عيّنة</button>
      <button class="btn sm" id="cmany">ارسم 100 عيّنة</button>
      <button class="btn sm ghost" id="creset">تصفير</button>`;
    box.appendChild(ui);
    $('#cpop', ui).onchange = e => { pop = e.target.value; means = []; draw(); };
    $('#cn', ui).oninput = e => { n = +e.target.value; $('#cnv', ui).textContent = n; means = []; draw(); };
    $('#cone', ui).onclick = () => { sample(1); };
    $('#cmany', ui).onclick = () => { sample(100); };
    $('#creset', ui).onclick = () => { means = []; draw(); };

    function sample(k) {
      for (let s = 0; s < k; s++) {
        const v = [];
        for (let i = 0; i < n; i++) v.push(P().gen());
        means.push(mean(v));
      }
      draw();
    }

    function draw() {
      const { ctx, w, h } = ctx2d(canvas);
      const half = w / 2;
      const drawHist = (vals, x0, x1, y0, y1, color, binCount) => {
        const lo = Math.min.apply(null, vals.concat([0])), hi = Math.max.apply(null, vals.concat([90]));
        const nB = binCount || 24, bw = (x1 - x0) / nB;
        const hist = new Array(nB).fill(0);
        vals.forEach(v => { const b = clamp(Math.floor((v - lo) / (hi - lo + 1e-9) * nB), 0, nB - 1); hist[b]++; });
        const mx = Math.max.apply(null, hist.concat([1]));
        const hh = y1 - y0;
        hist.forEach((c, i) => {
          const bh = (c / mx) * hh * 0.92;
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(x0 + i * bw + 1, y1 - bh, bw - 2, bh);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = color;
          ctx.strokeRect(x0 + i * bw + 1, y1 - bh, bw - 2, bh);
        });
        return { lo, hi, mx, nB, bw, hh, y1 };
      };

      // population panel
      const popVals = [];
      for (let i = 0; i < 4000; i++) popVals.push(P().gen());
      ctx.fillStyle = '#8fa6b8'; ctx.font = 'bold 12px Tajawal, sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('Population · المجتمع — ' + P().name, 14, 18);
      const pg = drawHist(popVals, 14, half - 8, 30, h - 30, '#d8b65a', 30);
      ctx.fillStyle = '#e7d3a3'; ctx.font = '10px monospace';
      ctx.fillText('μ = ' + fmt(P().mu, 0) + '   σ = ' + fmt(P().sg, 1), 14, h - 10);

      // sampling distribution panel
      ctx.fillStyle = '#8fa6b8'; ctx.font = 'bold 12px Tajawal, sans-serif';
      ctx.fillText('Sampling distribution of x̄ · وسائل العينات (n = ' + n + ')', half + 8, 18);
      if (means.length) {
        const sg = drawHist(means, half + 8, w - 14, 30, h - 30, '#57c7d8', 26);
        // normal overlay
        const mu = mean(means), se = sd(means) || 1;
        ctx.beginPath();
        for (let px = 0; px <= half - 22; px += 2) {
          const xv = sg.lo + (px / (half - 22)) * (sg.hi - sg.lo);
          const pdf = Math.exp(-((xv - mu) ** 2) / (2 * se * se)) / (se * Math.sqrt(2 * Math.PI));
          const cnt = pdf * means.length * (sg.hi - sg.lo) / sg.nB;
          const y = sg.y1 - (cnt / sg.mx) * sg.hh * 0.92;
          px === 0 ? ctx.moveTo(half + 8 + px, y) : ctx.lineTo(half + 8 + px, y);
        }
        ctx.strokeStyle = '#5fcf80'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#cfe8ee'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
        ctx.fillText(`عينات: ${means.length}   mean(x̄) = ${fmt(mu)} ≈ μ   SD(x̄) = ${fmt(se)} ≈ σ/√n = ${fmt(P().sg / Math.sqrt(n))}`, w - 16, h - 10);
        ctx.textAlign = 'left';
        ctx.fillStyle = means.length >= 25 ? '#5fcf80' : '#8fa6b8';
        ctx.font = '11px Tajawal, sans-serif';
        if (means.length >= 25) ctx.fillText('🔔 مهما كان شكل المجتمع — وسائل العينات تتشكّل تقريبًا طبيعي!', half + 8, h - 24);
      } else {
        ctx.fillStyle = '#5b7282'; ctx.font = '12px Tajawal, sans-serif';
        ctx.fillText('اضغط «ارسم عيّنة» لتبدأ', half + 30, h / 2);
      }
      ctx.textAlign = 'right';
      ctx.fillStyle = '#5fcf80'; ctx.font = '10px monospace';
      if (means.length) ctx.fillText('— المنحنى الأخضر = Normal(μ, σ/√n)', w - 16, 30);
    }
    new ResizeObserver(() => draw()).observe(canvas);
    draw();
  }

  /* ---------- boot ---------- */
  const SIMS = { stats: simStats, sampling: simSampling, clt: simCLT };
  function initAll() {
    $$('[data-sim]').forEach(c => {
      let cfg = {};
      try { cfg = JSON.parse(c.dataset.config || '{}'); } catch (e) {}
      try { (SIMS[c.dataset.sim] || function () {})(c, cfg); }
      catch (e) { c.parentElement.innerHTML = '<div class="game-foot">تعذّر تشغيل المحاكاة: ' + (e && e.message) + '</div>'; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
