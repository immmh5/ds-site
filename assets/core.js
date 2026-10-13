/* ============================================================
   core.js — shared engine: nav, progress, lesson renderer,
   quiz engine (practice + exam), flashcards, TOC spy.
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const LESSONS = [
    { id: 'c1', n: 1, t: 'الدرس الأول', en: 'Data-Science Questions & the Data Cycle', unit: 'Unit 1 · Data Literacy' },
    { id: 'c2', n: 2, t: 'الدرس الثاني', en: 'Provenance & Fitness for Purpose', unit: 'Unit 1 · Data Literacy' },
    { id: 'c3', n: 3, t: 'الدرس الثالث', en: 'Ethics, Privacy, Bias & Approval', unit: 'Unit 1 · Data Literacy' },
    { id: 'c4', n: 4, t: 'الدرس الرابع', en: 'Population, Frame & Sampling Design', unit: 'Unit 2 · Sampling & Descriptive Stats' },
    { id: 'c5', n: 5, t: 'الدرس الخامس', en: 'Distribution, Centre & Spread', unit: 'Unit 2 · Sampling & Descriptive Stats' },
    { id: 'c6', n: 6, t: 'الدرس السادس', en: 'Linear Models, Correlation & the CLT', unit: 'Unit 2 · Sampling & Descriptive Stats' },
  ];

  /* ---------------- progress (localStorage) ---------------- */
  const P = {
    read() { try { return JSON.parse(localStorage.getItem('ds_progress') || '{}'); } catch (e) { return {}; } },
    write(o) { try { localStorage.setItem('ds_progress', JSON.stringify(o)); } catch (e) {} },
    done(id, v) { const o = this.read(); o['done_' + id] = v !== false; this.write(o); },
    isDone(id) { return !!this.read()['done_' + id]; },
    score(id, n, tot) { const o = this.read(); const k = 'quiz_' + id; const cur = o[k] || { p: -1 }; if (n > cur.p) o[k] = { p: n, t: tot, at: Date.now() }; this.write(o); },
    best(id) { return this.read()['quiz_' + id] || null; },
    reset() { localStorage.removeItem('ds_progress'); },
  };

  /* ---------------- nav ---------------- */
  function nav(active) {
    const host = $('#nav');
    if (!host) return;
    host.innerHTML = `
    <div class="topbar">
      <div class="wrap topbar-in">
        <a class="brand" href="../index.html" style="color:var(--text);text-decoration:none">
          <span class="dot"></span> Data Science <small>· مركز المراجعة</small>
        </a>
        <nav>
          <a href="../index.html" class="${active === 'home' ? 'on' : ''}">الرئيسية</a>
          <a href="../quiz.html" class="${active === 'quiz' ? 'on' : ''}">الاختبار الشامل</a>
          <a href="../tips.html" class="${active === 'tips' ? 'on' : ''}">نصايح الاختبار</a>
          ${LESSONS.map(l => `<a href="c${l.n}.html" class="${active === l.id ? 'on' : ''}">C${l.n}</a>`).join('')}
        </nav>
      </div>
      <div class="progress-line"><i id="pgline"></i></div>
    </div>`;
    const done = LESSONS.filter(l => P.isDone(l.id)).length;
    const line = $('#pgline');
    if (line) line.style.width = Math.round(done / LESSONS.length * 100) + '%';
  }

  /* ---------------- block renderer ---------------- */
  let CUR = null; // current lesson, set by renderLesson (used by B.game)
  const B = {
    p: b => `<p>${b.t}</p>`,
    small: b => `<p class="small muted">${b.t}</p>`,
    h: b => `<h4>${b.t}</h4>`,
    cards: b => `<div class="grid ${b.cols === 3 ? 'g3' : 'g2'}">${b.items.map(c =>
      `<div class="mini"><h4>${esc(c.h)}</h4><div class="ar">${(c.body || []).join('<br>')}</div></div>`).join('')}</div>`,
    callout: b => `<div class="callout ${b.kind || ''}"><h4>${esc(b.h)}</h4>${(b.p || []).map(x => `<p>${x}</p>`).join('')}</div>`,
    steps: b => `<div class="steps">${b.items.map((s, i) =>
      `<div class="step"><div class="n">${i + 1}</div><div><h4>${esc(s.h)}</h4><p>${s.p}</p>${s.ex ? `<p class="small muted">مثال: ${s.ex}</p>` : ''}</div></div>`).join('')}</div>`,
    flow: b => `<div class="flow">${b.items.map((x, i) => `<span class="node">${esc(x)}</span>${i < b.items.length - 1 ? '<span class="arr">←</span>' : ''}`).join('')}</div>`,
    table: b => `<div class="mini" style="overflow-x:auto"><table><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
    svg: b => b.html,
    kv: b => `<div class="mini"><dl class="kv">${b.items.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl></div>`,
    game: b => `<div class="game-box" data-game="${b.kind}" data-id="${b.id || (CUR && CUR.id)}" data-config='${(b.config || '').replace(/'/g, "\\'")}'></div>`,
    sim: b => `<div class="game-box"><div class="game-head"><h4>${esc(b.h)}</h4></div><canvas class="sim" data-sim="${b.kind}" height="${b.hgt || 300}"></canvas><div class="game-foot">${b.foot || ''}</div></div>`,
    qzone: b => `<div id="${b.id || 'qz'}" class="q-zone"></div>`,
    flash: b => `<div class="fc-zone" data-flash></div>`,
    quiz: b => `<div id="${b.id}" class="q-zone" data-quiz="${b.src}" data-mode="${b.mode || 'practice'}"></div>`,
  };

  function renderLesson(L) {
    CUR = L;
    const root = $('#lesson');
    if (!root) return;
    const total = (L.quiz || []).length;
    const best = P.best(L.id);
    root.innerHTML = `
      <div class="wrap hero">
        <span class="badge">${esc(L.unit)} · Class ${L.num}</span>
        <h1>${esc(L.titleAr)} <span class="small muted" style="font-family:var(--font-en)">${esc(L.title)}</span></h1>
        <p class="sub">${esc(L.hook)}</p>
        <div class="chips">
          <div class="chip"><div class="v">${L.objectives.length}</div><div class="k">أهداف</div></div>
          <div class="chip"><div class="v">${L.glossary.length}</div><div class="k">مصطلح</div></div>
          <div class="chip"><div class="v">${total}</div><div class="k">سؤال</div></div>
          <div class="chip"><div class="v">${best ? best.p + '/' + best.t : '—'}</div><div class="k">أفضل نتيجة</div></div>
        </div>
        <div class="objectives">
          ${L.objectives.map((o, i) => `<div class="obj"><div class="num">${i + 1}</div><div>${o}</div></div>`).join('')}
        </div>
      </div>

      <div class="wrap lesson-grid">
        <aside class="toc"><div class="mini">
          <a href="#eli5" class="toc-a">شرح مبسط <span style="color:var(--warn)">🎈</span></a>
          ${L.sections.map(s => `<a href="#${s.id}" class="toc-a">${esc(s.idx ? s.idx + '. ' : '')}${esc(s.t)}</a>`).join('')}
          <a href="#glossary" class="toc-a">المصطلحات 📖</a>
          <a href="#apps" class="toc-a">تطبيقات عملية 🛠️</a>
          <a href="#tips" class="toc-a">نصايح الاختبار 💡</a>
          <a href="#games" class="toc-a">الألعاب 🎮</a>
          <a href="#quiz" class="toc-a">اختبر نفسك ✅</a>
          <div class="divider" style="margin:14px 0"></div>
          <button class="btn sm" id="markDone">${P.isDone(L.id) ? '✓ مكتمل — إلغاء' : 'حدّد الدرس كمكتمل'}</button>
          <div class="small muted" style="margin-top:10px">يلعّب تلقائيًا: اضغط على البطاقة لقلبها · اسحب في الألعاب بالماوس أو اللمس.</div>
        </div></aside>

        <div class="lesson-body">
          <section class="lesson-sec" id="eli5">
            <div class="sec-head"><span class="idx">00</span><h2>شرح مبسط كأنك تسمعه أول مرة 🎈</h2></div>
            <div class="callout eli5"><h4>القصة باختصار (شرح الأطفال)</h4>${L.eli5.map(p => `<p>${p}</p>`).join('')}</div>
            ${L.eli52 ? `<div class="callout"><h4>والمعنى التقني</h4>${L.eli52.map(p => `<p>${p}</p>`).join('')}</div>` : ''}
          </section>

          ${L.sections.map((s, i) => `
          <section class="lesson-sec" id="${s.id}">
            <div class="sec-head"><span class="idx">${String(i + 1).padStart(2, '0')}</span><h2>${esc(s.t)}</h2></div>
            ${(s.blocks || []).map(b => (B[b.type] || (x => `<p>⚠ block: ${esc(x.type)}</p>`))(b)).join('')}
          </section>`).join('')}

          <section class="lesson-sec" id="glossary">
            <div class="sec-head"><span class="idx">📖</span><h2>المصطلحات بالإنجليزي (احفظها للتختبر)</h2></div>
            <div class="fc-zone" data-flash></div>
            ${L.glossary && L.glossary.length >= 4 ? `<h3 style="margin:18px 0 4px">🎮 لعبة الوصل — صِل كل مصطلح بمعناه</h3>
              <p class="small muted">اضغط مصطلح في اليمين، بعدها معناه في اليسار. الإجابة الصح تثتت خضرا.</p>
              <div class="match-box"><script type="application/json" data-match-json>${JSON.stringify(L.glossary.slice(0, 8).map((g, i) => ({ id: i, a: g.en + ' · ' + g.ar, b: g.def })))}</script></div>` : ''}
          </section>

          <section class="lesson-sec" id="apps">
            <div class="sec-head"><span class="idx">🛠️</span><h2>تطبيقات عملية على الواقع</h2></div>
            ${L.apps.map(a => `<div class="callout"><h4>${esc(a.h)}</h4>${a.p.map(x => `<p>${x}</p>`).join('')}</div>`).join('')}
          </section>

          <section class="lesson-sec" id="tips">
            <div class="sec-head"><span class="idx">💡</span><h2>نصايح الاختبار: شفت الكلمة ⟵ الجواب</h2></div>
            <p class="small muted">الإجابة الصح في الاختبار تتبع إشارة. هذي الإشارات: إذا جت الكلمة في السؤال، الجواب الغالب يكون زي ما هو مكتوب.</p>
            ${L.tips.map(t => `<div class="tiprow"><div class="kw">لو شفت: <b>${esc(t.kw)}</b><br><span class="small muted">${esc(t.hint || '')}</span></div><div class="ans">الجواب: <b>${t.ans}</b></div></div>`).join('')}
          </section>

          <section class="lesson-sec" id="games">
            <div class="sec-head"><span class="idx">🎮</span><h2>الألعاب التفاعلية — افهم وأنت تلعب</h2></div>
            ${(L.games || []).map(g => `<h3 style="margin-top:6px">${esc(g.h)}</h3><p class="small muted">${g.p || ''}</p>${B.game(g)}${g.foot ? `<p class="small muted">${g.foot}</p>` : ''}`).join('')}
          </section>

          <section class="lesson-sec" id="quiz">
            <div class="sec-head"><span class="idx">✅</span><h2>اختبر نفسك (${total} سؤال)</h2></div>
            <div class="mode-tabs" data-tabs>
              <button class="btn sm on" data-m="practice">تدريب (فيديك فوري)</button>
              <button class="btn sm ghost" data-m="exam">امتحان (نتيجة بالنهاية)</button>
            </div>
            <div id="qz" class="q-zone"></div>
          </section>
        </div>
      </div>
      <footer><div class="wrap center">Data Science Study Hub · ${esc(L.title)} — مبروك، خلصت الدرس ✨</div></footer>`;

    // mark done
    const md = $('#markDone');
    md.onclick = () => { P.done(L.id, !P.isDone(L.id)); md.textContent = P.isDone(L.id) ? '✓ مكتمل — إلغاء' : 'حدّد الدرس كمكتمل'; nav(L.id); };

    // flashcards from glossary
    const fc = $('[data-flash]');
    if (fc && L.glossary) flashcards(fc, L.glossary.map(g => ({ front: g.en, sub: g.ar, back: g.def })));

    // tabs → quiz
    const tabs = $('[data-tabs]');
    let mode = 'practice';
    tabs.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      mode = b.dataset.m;
      $$('button', tabs).forEach(x => x.classList.toggle('on', x === b));
      $$('button', tabs).forEach(x => x.classList.toggle('ghost', x !== b));
      startQuiz();
    });
    function startQuiz() { quiz($('#qz'), L.quiz, { mode, id: L.id, title: L.titleAr }); }
    startQuiz();

    // TOC spy
    const links = $$('.toc a');
    const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const spy = () => {
      let cur = null;
      secs.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= 110) cur = s; });
      links.forEach(a => a.classList.toggle('on', cur && a.getAttribute('href') === '#' + cur.id));
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }

  /* ---------------- flashcards ---------------- */
  function flashcards(host, cards) {
    shuffle(cards);
    let i = 0;
    host.innerHTML = `<div class="fc" id="fcard"></div>
      <div class="ctrl center" style="justify-content:center">
        <button class="btn sm ghost" id="fprev">← السابق</button>
        <span class="small muted" id="fcount"></span>
        <button class="btn sm" id="fnext">التالي →</button>
        <button class="btn sm ghost" id="fshuf">خلط</button>
      </div>
      <div class="fc-hint">اضغط على البطاقة لقلبها · ${cards.length} بطاقة</div>`;
    const card = $('#fcard', host);
    const draw = () => {
      const c = cards[i];
      card.classList.remove('flip');
      card.innerHTML = `
        <div class="fc-face fc-front"><div class="t">${esc(c.front)}</div><div class="ar">${esc(c.sub || '')}</div></div>
        <div class="fc-face fc-back"><div class="d">${c.back}</div></div>`;
      $('#fcount', host).textContent = (i + 1) + ' / ' + cards.length;
    };
    card.onclick = () => card.classList.toggle('flip');
    $('#fnext', host).onclick = () => { i = (i + 1) % cards.length; draw(); };
    $('#fprev', host).onclick = () => { i = (i - 1 + cards.length) % cards.length; draw(); };
    $('#fshuf', host).onclick = () => { shuffle(cards); i = 0; draw(); };
    draw();
  }

  /* ---------------- quiz engine ---------------- */
  function quiz(host, questions, opts) {
    opts = opts || {};
    const mode = opts.mode || 'practice';
    const state = { qs: questions.map(q => { const c = shuffle(q.opts.map((o, oi) => ({ o, ok: oi === q.a }))); return { q: q.q, opts: c, why: q.why, tag: q.tag, diff: q.diff }; }), i: 0, picked: [], correct: 0 };

    if (mode === 'practice') {
      // shuffle question order too
      state.qs = shuffle(state.qs);
      practice();
    } else {
      exam();
    }

    function track(render) {
      const done = state.qs.length;
      return `<div class="q-track">${state.qs.map((q, j) => {
        const p = state.picked[j];
        const cls = p == null ? (j === state.i ? 'cur' : '') : (p ? 'ok' : 'no');
        return `<i class="${cls}"></i>`;
      }).join('')}</div>`;
    }

    function practice() {
      const Q = state.qs[state.i];
      host.innerHTML = `${track()}<div class="q-card">
        <div class="q-num">سؤال ${state.i + 1} / ${state.qs.length} ${Q.diff ? `· <span style="color:var(--warn)">${Q.diff}</span>` : ''} ${Q.tag ? `· <span class="pill"><b>${esc(Q.tag)}</b></span>` : ''}</div>
        <div class="q-text">${Q.q}</div>
        <div class="q-opts">${Q.opts.map((o, oi) => `<button class="q-opt" data-i="${oi}"><span class="ltr">${'ABCD'[oi]}</span><span>${o.o}</span></button>`).join('')}</div>
        <div id="qexpl"></div>
        <div class="q-actions">
          <button class="btn" id="qnext" disabled>التالي ←</button>
          <span class="small muted" id="qscore"></span>
        </div>
      </div>`;

      $$('[data-i]', host).forEach(btn => {
        btn.onclick = () => {
          const oi = +btn.dataset.i, o = Q.opts[oi];
          $$('[data-i]', host).forEach(b => { b.disabled = true; });
          btn.classList.add(o.ok ? 'correct' : 'wrong');
          if (!o.ok) {
            const good = Q.opts.findIndex(x => x.ok);
            $$('[data-i]', host)[good].classList.add('correct');
          }
          state.picked[state.i] = o.ok;
          if (o.ok) state.correct++;
          $('#qexpl', host).innerHTML = `<div class="q-expl"><b>الشرح:</b> ${Q.why || ''}<br>
            <span class="${o.ok ? 'why-good' : 'why-bad'}">${o.ok ? '✓ إجابة صحيحة' : '✗ خطأ — الإجابة الصحيحة مميزة باللون الأخضر'}</span></div>`;
          $('#qnext', host).disabled = false;
          $('#qscore', host).textContent = `النتيجة حتى الآن: ${state.correct}/${state.i + 1}`;
          $('#qnext', host).onclick = () => {
            if (state.i < state.qs.length - 1) { state.i++; practice(); }
            else finish();
          };
        };
      });
    }

    function exam() {
      // all questions, sequential, no feedback, then result + review
      let cur = 0;
      const ans = Array(state.qs.length).fill(null);
      function draw() {
        const Q = state.qs[cur];
        host.innerHTML = `<div class="q-track">${state.qs.map((q, j) => `<i class="${ans[j] != null ? (q.opts[ans[j]].ok ? 'ok' : 'no') : (j === cur ? 'cur' : '')}"></i>`).join('')}</div>
        <div class="q-card">
          <div class="q-num">امتحان · سؤال ${cur + 1} / ${state.qs.length} ${Q.tag ? `· <span class="pill"><b>${esc(Q.tag)}</b></span>` : ''}</div>
          <div class="q-text">${Q.q}</div>
          <div class="q-opts">${Q.opts.map((o, oi) => `<button class="q-opt ${ans[cur] === oi ? (o.ok ? 'correct' : 'wrong') : ''}" data-i="${oi}" ${ans[cur] != null ? 'disabled' : ''}><span class="ltr">${'ABCD'[oi]}</span><span>${o.o}</span></button>`).join('')}</div>
          <div class="q-actions">
            <button class="btn ghost sm" id="qprev" ${cur === 0 ? 'disabled' : ''}>→ السابق</button>
            <button class="btn" id="qnx" ${cur === state.qs.length - 1 ? 'disabled' : ''}>التالي ←</button>
            <button class="btn good" id="qfin" ${cur === state.qs.length - 1 ? '' : 'disabled'}>إنهاء وعرض النتيجة</button>
          </div>
        </div>`;
        $$('[data-i]', host).forEach(b => {
          b.onclick = () => { ans[cur] = +b.dataset.i; draw(); };
        });
        if ($('#qprev', host)) $('#qprev', host).onclick = () => { cur--; draw(); };
        if ($('#qnx', host)) $('#qnx', host).onclick = () => { cur++; draw(); };
        if ($('#qfin', host)) $('#qfin', host).onclick = finishExam;
      }
      function finishExam() {
        const score = state.qs.reduce((s, q, j) => s + (ans[j] != null && q.opts[ans[j]].ok ? 1 : 0), 0);
        const tot = state.qs.length;
        const pct = Math.round(score / tot * 100);
        P.score(opts.id || 'x', score, tot);
        const msg = pct === 100 ? '🏆 درجة كاملة! فايت الاختبار زي الفل' : pct >= 80 ? '🔥 ممتاز — باقي شوية وتاخذ الكامل' : pct >= 60 ? '💪 لا بأس، راجع الأسئلة الغلط وأعد المحاولة' : '📚 يحتاج مراجعة — عيد الدرس وحاول مرة ثانية';
        host.innerHTML = `<div class="q-card q-result">
          <div class="big" style="color:${pct >= 80 ? 'var(--good)' : pct >= 60 ? 'var(--warn)' : 'var(--bad)'}">${score} / ${tot}</div>
          <div class="q-meta">${pct}% · ${msg}</div>
          <div class="chips" style="justify-content:center">
            <div class="chip"><div class="v">${state.qs.filter((q, j) => ans[j] != null && q.opts[ans[j]].ok).length}</div><div class="k">صح</div></div>
            <div class="chip"><div class="v">${tot - score}</div><div class="k">خطأ / فارغة</div></div>
          </div>
          <div class="q-actions" style="justify-content:center">
            <button class="btn" id="qretry">إعادة الاختبار 🔄</button>
            <button class="btn ghost" id="qreview">مراجعة الإجابات</button>
          </div>
          <div id="qrev"></div>
        </div>`;
        $('#qretry', host).onclick = () => quiz(host, questions, opts);
        $('#qreview', host).onclick = () => {
          $('#qrev', host).innerHTML = state.qs.map((q, j) => {
            const mine = ans[j];
            const ok = mine != null && q.opts[mine].ok;
            return `<div class="mini" style="margin-top:10px;border-inline-start:3px solid ${ok ? 'var(--good)' : 'var(--bad)'}">
              <div class="small"><b>س${j + 1}:</b> ${q.q}</div>
              <div class="small" style="color:${ok ? 'var(--good)' : 'var(--bad)'};margin-top:4px">${ok ? '✓ إجابتك: ' + q.opts[mine].o : (mine != null ? '✗ إجابتك: ' + q.opts[mine].o + ' — الصحيح: ' + q.opts.find(o => o.ok).o : 'لم تُجب — الصحيح: ' + q.opts.find(o => o.ok).o)}</div>
              ${q.why ? `<div class="small muted" style="margin-top:4px">الشرح: ${q.why}</div>` : ''}
            </div>`;
          }).join('');
        };
      }
      draw();
    }

    function finish() {
      const tot = state.qs.length, score = state.correct, pct = Math.round(score / tot * 100);
      P.score(opts.id || 'x', score, tot);
      const msg = pct === 100 ? '🏆 درجة كاملة! تبي تنتقل للدرس الثاني' : pct >= 80 ? '🔥 ممتاز' : pct >= 60 ? '💪 حلو، عيد الأسئلة الغلط' : '📚 راجع الدرس بعدين ارجع';
      host.innerHTML = `<div class="q-card q-result">
        <div class="big" style="color:${pct >= 80 ? 'var(--good)' : pct >= 60 ? 'var(--warn)' : 'var(--bad)'}">${score} / ${tot}</div>
        <div class="q-meta">${pct}% · ${msg}</div>
        <div class="q-actions" style="justify-content:center">
          <button class="btn" id="qagain">أعد الأسئلة 🔄</button>
          ${opts.next ? `<a class="btn ghost" href="${opts.next}">الدرس التالي ←</a>` : ''}
        </div>
      </div>`;
      $('#qagain', host).onclick = () => quiz(host, questions, opts);
    }
  }

  /* ---------------- expose ---------------- */
  window.DS = { nav, renderLesson, quiz, flashcards, P, LESSONS, shuffle, esc, $, $$ };
})();
