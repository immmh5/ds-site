/* ============================================================
   DSH Quiz Engine — محرّك الاختبارات المشترك
   الاستخدام: عرّف window.QUIZ_DATA قبل تحميل هذا الملف ثم نفّذ
   DSH_Quiz.init();
   ============================================================ */
(function () {
  'use strict';

  var DIFF = {
    1: ['سهل', 'd1'],
    2: ['متوسط', 'd2'],
    3: ['صعب', 'd3']
  };

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function h(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function bestKey() { return 'dsh-quiz-best:' + location.pathname; }

  function getBest() {
    try { return parseInt(localStorage.getItem(bestKey()) || '0', 10) || 0; }
    catch (e) { return 0; }
  }
  function setBest(v) {
    try { if (v > getBest()) localStorage.setItem(bestKey(), String(v)); } catch (e) {}
  }

  function init(opts) {
    opts = opts || {};
    var mount = document.querySelector(opts.mount || '#quiz');
    if (!mount) return;
    var data = opts.data || window.QUIZ_DATA || [];
    if (!data.length) { mount.textContent = 'لا توجد أسئلة في هذا الاختبار.'; return; }

    var countEasy = data.filter(function (q) { return (q.diff || 2) === 1; }).length;
    var countMed  = data.filter(function (q) { return (q.diff || 2) === 2; }).length;
    var countHard = data.filter(function (q) { return (q.diff || 2) === 3; }).length;

    var state = null;
    var cleanup = null; // إزالة مستمع لوحة المفاتيح عند الانتقال

    function teardown() {
      if (cleanup) { cleanup(); cleanup = null; }
    }

    function newRun() {
      // ترتيب عشوائي للأسئلة + ترتيب عشوائي للخيارات في كل محاولة
      var idxs = shuffle(data.map(function (_, i) { return i; }));
      state = {
        order: idxs,
        optMaps: {},
        answers: {},
        pos: 0,
        score: 0,
        wrongList: []
      };
      idxs.forEach(function (qi) {
        state.optMaps[qi] = shuffle(data[qi].options.map(function (_, i) { return i; }));
      });
      renderQ();
    }

    function prog() {
      return Math.round((state.pos / data.length) * 100);
    }

    function renderQ() {
      teardown();
      mount.innerHTML = '';
      var shell = h('div', 'quiz-shell');

      var qi = state.order[state.pos];
      var q = data[qi];
      var map = state.optMaps[qi];

      var top = h('div', 'quiz-top');
      top.appendChild(h('span', 'quiz-meta',
        'السؤال ' + (state.pos + 1) + ' من ' + data.length + ' · النقاط: <b>' + state.score + '</b>'));
      top.appendChild(h('span', 'quiz-meta', 'أفضل نتيجة: ' + getBest() + '/' + data.length));
      shell.appendChild(top);
      shell.appendChild(h('div', 'qprog', '<i style="width:' + prog() + '%"></i>'));

      var card = h('div', 'qcard');
      var d = DIFF[q.diff || 2] || DIFF[2];
      card.appendChild(h('span', 'qdiff ' + d[1], d[0]));
      card.appendChild(h('div', 'qtext', q.q));

      var chosen = false;
      var btns = [];

      map.forEach(function (oi, shownPos) {
        var btn = h('button', 'qopt');
        btn.type = 'button';
        btn.appendChild(h('span', 'k', String(shownPos + 1)));
        btn.appendChild(h('span', null, q.options[oi]));
        btn.addEventListener('click', function () { pick(oi, btn); });
        btns.push(btn);
        card.appendChild(btn);
      });

      var fb = h('div');
      card.appendChild(fb);

      var foot = h('div', 'qfoot');
      var next = h('button', 'btn btn-primary', 'التالي ←');
      next.type = 'button';
      next.disabled = true;
      next.addEventListener('click', function () {
        if (!chosen) return;
        state.pos++;
        if (state.pos >= data.length) renderEnd(); else renderQ();
      });
      foot.appendChild(next);
      card.appendChild(foot);

      shell.appendChild(card);
      mount.appendChild(shell);

      function pick(oi, btn) {
        if (chosen) return;
        chosen = true;
        state.answers[qi] = oi;
        var correct = (oi === q.answer);
        btns.forEach(function (b) { b.disabled = true; b.classList.add('dim'); });
        // إظهار الإجابة الصحيحة دائمًا بالأخضر
        btns.forEach(function (b, k) {
          if (map[k] === q.answer) { b.classList.add('correct'); b.classList.remove('dim'); }
        });
        if (!correct) btn.classList.add('wrong');
        else state.score++;
        if (!correct) state.wrongList.push(qi);

        var box = h('div', 'qfb ' + (correct ? 'ok' : 'bad'));
        box.appendChild(h('b', null, correct ? '✔ إجابة صحيحة' : '✘ إجابة خاطئة — الصحيح مظلل بالأخضر'));
        box.appendChild(h('div', null, q.explain || ''));
        fb.innerHTML = '';
        fb.appendChild(box);
        next.disabled = false;
      }

      // لوحة المفاتيح: 1-4 للاختيار، Enter للتالي
      function onKey(e) {
        if (e.key >= '1' && e.key <= '9') {
          var k = parseInt(e.key, 10) - 1;
          if (btns[k] && !btns[k].disabled) { e.preventDefault(); btns[k].click(); }
        } else if ((e.key === 'Enter' || e.key === ' ') && chosen && !next.disabled) {
          e.preventDefault();
          next.click();
        }
      }
      document.addEventListener('keydown', onKey);
      cleanup = function () { document.removeEventListener('keydown', onKey); };
    }

    function renderIntro() {
      teardown();
      mount.innerHTML = '';
      var shell = h('div', 'quiz-shell');
      shell.appendChild(h('div', 'box-title', '📋 بنك أسئلة الحصة'));
      shell.appendChild(h('p', null,
        'عدد الأسئلة: <b>' + data.length + '</b> — ' +
        '🟢 سهل: ' + countEasy + ' · 🟡 متوسط: ' + countMed + ' · 🔴 صعب: ' + countHard));
      shell.appendChild(h('p', null,
        'الأسئلة تمزج المفاهيم والمصائد الشائعة، وترتيب الخيارات يتغير كل محاولة حتى لا تحفظ مكان الإجابة. ' +
        'بعد كل إجابة سترى التصحيح والشرح. استخدم مفاتيح الأرقام <b>1-4</b> للإجابة و<b>Enter</b> للتالي.'));
      var start = h('button', 'btn btn-primary', 'ابدأ الاختبار');
      start.type = 'button';
      start.addEventListener('click', function () { newRun(); });
      var row = h('div', 'btn-row');
      row.appendChild(start);
      shell.appendChild(row);
      mount.appendChild(shell);
    }

    function renderEnd() {
      teardown();
      setBest(state ? state.score : 0);
      mount.innerHTML = '';
      var shell = h('div', 'quiz-shell end-card');
      var pct = Math.round((state.score / data.length) * 100);
      var grade, gcls, msg;
      if (pct >= 90) { grade = '🏆'; gcls = 'g-high'; msg = 'ممتاز! أنت جاهز للاختبار الحقيقي.'; }
      else if (pct >= 75) { grade = '👏'; gcls = 'g-mid'; msg = 'جيد جدًا! راجع أخطاءك ثم انتقل للحصة التالية.'; }
      else if (pct >= 60) { grade = '🙂'; gcls = 'g-mid'; msg = 'لا بأس — أعد قراءة صناديق «حيل الحفظ» ثم أعد المحاولة.'; }
      else { grade = '💪'; gcls = 'g-low'; msg = 'راجع الشرح كاملًا من البداية ثم عد. الاستعداد للاختبار يُبنى بالتكرار.'; }

      shell.appendChild(h('div', 'grade ' + gcls, grade + ' ' + pct + '%'));
      shell.appendChild(h('div', 'score-line', 'أجبت بشكل صحيح عن <b>' + state.score + '</b> من <b>' + data.length + '</b> سؤالًا'));
      shell.appendChild(h('div', 'score-line', msg));

      if (state.wrongList.length) {
        shell.appendChild(h('h3', null, '🧐 مراجعة الأخطاء (' + state.wrongList.length + ')'));
        state.wrongList.forEach(function (qi) {
          var q = data[qi];
          var item = h('div', 'review-item');
          item.appendChild(h('div', 'rq', q.q));
          item.appendChild(h('div', null,
            '<span class="ry">إجابتك لم تكن صحيحة.</span> الإجابة الصحيحة: <span class="ra">' +
            q.options[q.answer] + '</span>'));
          item.appendChild(h('div', 'rx', q.explain || ''));
          shell.appendChild(item);
        });
      } else {
        shell.appendChild(h('p', null, 'لا توجد أخطاء — نتيجة كاملة! 🎉'));
      }

      var row = h('div', 'btn-row');
      row.style.justifyContent = 'center';
      var again = h('button', 'btn btn-primary', 'إعادة الاختبار بترتيب جديد');
      again.type = 'button';
      again.addEventListener('click', newRun);
      row.appendChild(again);
      shell.appendChild(row);
      mount.appendChild(shell);
      shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    renderIntro();
  }

  window.DSH_Quiz = { init: init };
})();
