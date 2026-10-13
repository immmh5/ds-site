/* ============================================================
   data-c6.js — Lesson 6: Linear Models, Correlation & CLT
   ============================================================ */
window.LESSON_C6 = {
  id: 'c6',
  title: 'Linear Models, Correlation & the CLT',
  titleAr: 'النماذج الخطية والارتباط والنظرية المركزية',
  unit: 'Unit 2 · Sampling & Descriptive Stats',
  num: 6,
  hook: 'أنت تتصل بصديقك كل ليلة. مع الوقت لاحظت: كلما طالت المكالمة، زادت فاتورتك. هذا ارتباط. لكن هل المكالمة تسبّب الفاتورة؟ نعم هنا — لكن على الأرجح لا في قصة «القميص الأحمر والدرجات». السؤال الذكي: هل تتحرك المتغيّرات معًا (ارتباط) أم تؤثّر واحدة في الأخرى (سببية)؟',

  eli5: [
    '<b>الارتباط (correlation):</b> المتغيّران يتحركان معًا — تزداد واحدًا فتزداد الأخرى. لكن <b>السببية (causation):</b> واحد يصنع التغيير في الآخر. كل سببية هي ارتباط، لكن <b>ليس كل ارتباط سببية</b>.',
    '<b>الارتباط لا يعني السببية</b> — قد يكون هناك متغيّر ثالث (confounder) يتحكم في كليهما: مثلًا درجات الرياضيات ودرجات الفيزياء مرتبطتان لأن وراءهما «ساعات الدراسة». تأكد دائمًا من المتغيّر الثالث.',
    '<b>النظرية المركزية (CLT):</b> مهما كان شكل المجتمع، فإن <b>توزيع متوسطات العيّنات</b> يقترب من التوزيع الطبيعي كلما كبرت العيّنة (عادةً n ≥ 30). هذه هي السحر الذي يجعل النتائج قابلة للتعميم.',
  ],
  eli52: [
    '<b>Correlation coefficient r:</b> قيمة بين −1 و+1. +1 علاقة قوية طردية، −1 علاقة قوية عكسية، 0 لا علاقة.',
    '<b>الخط الأحمر:</b> <b>الميل (slope)</b> = مقدار التغيّر في y لكل وحدة في x، و<b>التقاطع (intercept)</b> = قيمة y عندما x = 0.',
    '<b>الطريقة الأقل تربيعًا (OLS):</b> الخط الذي يقلّل مجموع مربّعات البواقي (residuals) — أي أخطاء التنبّؤ.',
    '<b>Residual:</b> الفرق بين القيمة الحقيقية وقيمة التنبّؤ. النموذج الجيد = بواقٍ صغيرة وعشوائية.',
    '<b>النقاط المؤثرة (influential points):</b> نقاط وحيدة تحرّك الخط كله — أحذرها قبل الثقة في النموذج.',
    '<b>Extrapolation:</b> التنبّؤ خارج نطاق البيانات — خطر كبير، النموذج قد لا يستمر.',
  ],

  objectives: [
    'نفسّر الفرق بين correlation و causation ونكتشف المتغيّر الثالث (confounder)',
    'نحسب وندلل r، ونرسم خط الانحدار ونفسّر slope و intercept و residual',
    'نطبّق النظرية المركزية: عيّنات أكبر → متوسطات أقرب للطبيعي',
  ],

  sections: [
    {
      id: 'corr',
      t: 'الارتباط: القوة والاتجاه',
      blocks: [
        { type: 'p', t: 'الارتباط يجاوب: «هل تتحركان معًا، وبأي قوة وفي أي اتجاه؟» — ولا يقول شيئًا عن السبب.' },
        {
          type: 'cards', cols: 3,
          items: [
            { h: '📈 r > 0 · طردية', body: ['x يزيد → y يزيد', 'r = +1 ارتباط تام', 'مثال: ساعات الدراسة و الدرجة'] },
            { h: '📉 r < 0 · عكسية', body: ['x يزيد → y يقل', 'r = −1 ارتباط تام', 'مثال: التدخين و اللياقة'] },
            { h: '🌫 r ≈ 0 · لا شيء', body: ['لا علاقة منظمة', 'النقاط مبعثرة', 'مثال: القميص و الدرجة'] },
          ],
        },
        {
          type: 'svg', html: `<svg viewBox="0 0 720 190" class="diagram" role="img" aria-label="ثلاثة رسوم متناثرة: ارتباط طرد قوي، عكسي قوي، لا ارتباط"><g font-size="13" text-anchor="middle"><g transform="translate(40,20)"><rect width="200" height="140" fill="#0f2229" stroke="#1e3441"/><g fill="#5fcf80"><circle cx="40" cy="105" r="5"/><circle cx="70" cy="88" r="5"/><circle cx="100" cy="70" r="5"/><circle cx="130" cy="55" r="5"/><circle cx="160" cy="35" r="5"/></g><line x1="30" y1="115" x2="170" y2="28" stroke="#5fcf80" stroke-width="2"/><text x="100" y="162" fill="#5fcf80">r ≈ +1 (طردية)</text></g><g transform="translate(260,20)"><rect width="200" height="140" fill="#0f2229" stroke="#1e3441"/><g fill="#e06a6a"><circle cx="40" cy="35" r="5"/><circle cx="70" cy="55" r="5"/><circle cx="100" cy="72" r="5"/><circle cx="130" cy="90" r="5"/><circle cx="160" cy="110" r="5"/></g><line x1="30" y1="28" x2="170" y2="118" stroke="#e06a6a" stroke-width="2"/><text x="100" y="162" fill="#e06a6a">r ≈ −1 (عكسية)</text></g><g transform="translate(480,20)"><rect width="200" height="140" fill="#0f2229" stroke="#1e3441"/><g fill="#93a0b2"><circle cx="45" cy="90" r="5"/><circle cx="80" cy="40" r="5"/><circle cx="110" cy="110" r="5"/><circle cx="140" cy="55" r="5"/><circle cx="170" cy="85" r="5"/><circle cx="90" cy="70" r="5"/></g><text x="100" y="162" fill="#93a0b2">r ≈ 0 (لا ارتباط)</text></g></g></svg>`,
        },
        {
          type: 'callout', kind: 'warn', h: 'فخ شائع: القوة ≠ الاتجاه',
          p: ['r = −0.9 <b>أقوى</b> من r = +0.5. القوة في القيمة المطلقة |r|، والاتجاه في الإشارة. الاتفاق التام يعني |r| = 1.'],
        },
      ],
    },
    {
      id: 'causal',
      t: 'الارتباط لا يعني السببية',
      blocks: [
        {
          type: 'steps',
          items: [
            { h: 'الحقيقة الأولى · الارتباط', p: 'متغيّران يتحركان معًا في بياناتك.', ex: 'القميص الأحمر ↔ درجات أعلى' },
            { h: 'الحقيقة الثانية · التفسير الخاطئ', p: 'افتراض أن أحدهما <b>يسبّب</b> الآخر.', ex: '«القميص يجلب الدرجات»' },
            { h: 'الحقيقة الثالثة · المتغيّر الثالث', p: 'confounder يحرّك الاثنين معًا.', ex: 'ساعات الدراسة = السبب المشترك' },
          ],
        },
        {
          type: 'table', head: ['السيناريو', 'r مرتفع', 'السببية؟', 'التفسير الذكي'],
          rows: [
            ['ساعات الدراسة ↔ الدرجة', 'نعم', '✅ مباشرة', 'الدراسة ترفع الدرجة'],
            ['القميص الأحمر ↔ الدرجة', 'نعم', '❌ لا', 'confounder: ساعات الدراسة'],
            ['المكالمات ↔ فاتورة الهاتف', 'نعم', '✅ مباشرة', 'الساعات تسبّب الفاتورة'],
            ['الآيس كريم ↔ الغرق', 'نعم', '❌ لا', 'confounder: فصل الصيف'],
          ],
        },
        {
          type: 'callout', kind: 'bad', h: 'أشهر مثال في علم البيانات',
          p: ['بيع الآيس كريم وغرق الناس يرتفعان معًا. هل الآيس كريم يسبّب الغرق؟ <b>لا</b> — الحرارة الصيفية تسبّب الاثنين. هذا confounder، والاختبار يختبره دائمًا.'],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 240" class="diagram" role="img" aria-label="متغير ثالث (الصيف) يحرّك الآيس كريم والغرق معًا — لا علاقة سببية مباشرة بينهما"><g font-size="13" text-anchor="middle"><rect x="260" y="24" width="200" height="48" rx="24" fill="#1d3a44" stroke="#e76f7b" stroke-width="2"/><text x="360" y="46" fill="#e76f7b" font-weight="700">فصل الصيف</text><text x="360" y="64" fill="#9fb8c0" font-size="11">confrunder · السبب المشترك</text><rect x="60" y="140" width="220" height="52" rx="10" fill="#0f2229" stroke="#8fd3c0" stroke-width="2"/><text x="170" y="163" fill="#8fd3c0" font-weight="700">بيع الآيس كريم ↑</text><text x="170" y="181" fill="#9fb8c0" font-size="11">x</text><rect x="440" y="140" width="220" height="52" rx="10" fill="#0f2229" stroke="#57c7d8" stroke-width="2"/><text x="550" y="163" fill="#57c7d8" font-weight="700">حالات الغرق ↑</text><text x="550" y="181" fill="#9fb8c0" font-size="11">y</text><path d="M300 70 C250 100 210 120 180 136" stroke="#e76f7b" stroke-width="2" fill="none" marker-end="url(#ar6)"/><path d="M420 70 C470 100 510 120 540 136" stroke="#e76f7b" stroke-width="2" fill="none" marker-end="url(#ar6)"/><line x1="282" y1="166" x2="436" y2="166" stroke="#e76f7b" stroke-width="2" stroke-dasharray="7 6"/><polygon points="436,161 446,166 436,171" fill="#e76f7b"/><text x="360" y="154" fill="#e76f7b" font-size="11">r مرتفع — لكنه وهم</text><text x="360" y="212" fill="#9fb8c0" font-size="12">الاختبار: «سمِّ المتغيّر الثالث» ⟵ الحل دائمًا الصراخ: confounder</text></g><defs><marker id="ar6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#e76f7b"/></marker></defs></svg>` },
        {
          type: 'callout', kind: 'good', h: 'كيف تتأكد من السببية؟',
          p: ['تجربة محكومة (randomised experiment): قسّم الناس عشوائيًا، غيّر متغيّرًا واحدًا فقط، وقِس النتيجة. بدون تجربة، السببية <b>افتراض</b> لا نتيجة.'],
        },
      ],
    },
    {
      id: 'regression',
      t: 'الانحدار الخطي: الخط الأحمر',
      blocks: [
        {
          type: 'kv',
          items: [
            ['الخط النموذجي', 'y = slope · x + intercept — أفضل خط يصف العلاقة.'],
            ['Slope · الميل', 'مقدار تغيّر y لكل وحدة زيادة في x.'],
            ['Intercept · التقاطع', 'قيمة y عندما x = 0 (قد لا يكون منطقيًا!).'],
            ['OLS', 'الطريقة التي تختار الخط الأقل مجموعًا لمربّعات البواقي.'],
            ['Residual · الباقي', 'الفرق بين القيمة الحقيقية وتنبّؤ الخط.'],
            ['Extrapolation · الاستقراء', 'التنبّؤ خارج نطاق البيانات — خطر كبير.'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'مثال: الدرجة = 2 × ساعات + 40',
          p: ['slope = 2: كل ساعة إضافية تضيف 2 درجة. intercept = 40: درجة مفترضة عند الصفر ساعات. <b>تنبّؤ 20 ساعة؟</b> extrapolation — لم نقس أحدًا هناك.'],
        },
        {
          type: 'callout', kind: 'bad', h: 'النقاط المؤثرة',
          p: ['نقطة واحدة بعيدة جدًا قد تحرّك الخط كله (influential point). افحصها قبل الثقة بالنموذج — قد تكون خطأ في البيانات.'],
        },
      ],
    },
    {
      id: 'clt',
      t: 'النظرية المركزية: سحر العيّنات',
      blocks: [
        { type: 'p', t: 'النظرية المركزية (CLT): <b>متوسطات</b> العيّنات تتوزّع تقريبًا طبيعيًا، مهما كان شكل المجتمع الأصلي — شرط أن تكون العيّنة كبيرة كفاية.' },
        {
          type: 'cards', cols: 3,
          items: [
            { h: '🎲 شكل المجتمع', body: ['أي شكل: منحرف، مزدوج، منتظم', 'لا يهم'] },
            { h: '⚖️ متوسطات العيّنات', body: ['نأخذ عيّنات كثيرة ونحسب متوسط كل واحدة', 'هذه المتوسطات هي التي تصبح طبيعية'] },
            { h: '📏 الشرط', body: ['n كبير (القاعدة: n ≥ 30)', 'كلما زاد n اقتربنا من الطبيعي'] },
          ],
        },
        {
          type: 'callout', kind: 'good', h: 'لماذا هذا سحر؟',
          p: ['الطبيعي موصوف بمعاملين فقط (المتوسط وσ)، وموجود في كل مكان. فإذا عرفت أن متوسطات العيّنات طبيعية، تستطيع أن تتوقّع مدى خطأ تقديرك — وهذا أساس كل استدلال.'],
        },
        {
          type: 'sim', kind: 'clt', h: '🔬 محاكاة: ابنِ التوزيع الطبيعي',
          foot: 'اختر شكل المجتمع، واسحب عيّنات كثيرة. شاهد كيف تتجمّع المتوسطات في جرس طبيعي مهما كان الأصل منحرفًا.',
        },
        {
          type: 'flow', items: ['Population (any shape)', 'Sample n', 'mean', 'repeat', 'Normal bell'],
        },
      ],
    },
  ],

  glossary: [
    { en: 'Correlation', ar: 'الارتباط', def: 'مقدار تحرّك متغيّرين معًا — لا يعني سببًا.' },
    { en: 'Causation', ar: 'السببية', def: 'متغيّر واحد يؤثّر فعليًا في الآخر.' },
    { en: 'Confounder', ar: 'المتغيّر الثالث', def: 'متغيّر يسبّب الاثنين معًا فيظنّ ارتباطًا سببيًا.' },
    { en: 'Correlation coefficient r', ar: 'معامل الارتباط', def: 'قوة واتجاه العلاقة، بين −1 و+1.' },
    { en: 'Slope', ar: 'الميل', def: 'تغيّر y لكل وحدة في x.' },
    { en: 'Intercept', ar: 'التقاطع', def: 'قيمة y عندما x = 0.' },
    { en: 'Residual', ar: 'الباقي', def: 'الفرق بين القيمة الحقيقية والتنبّؤ.' },
    { en: 'OLS', ar: 'المربعات الصغرى', def: 'الخط الأقل خطأً في مجموع مربّعات البواقي.' },
    { en: 'Influential Point', ar: 'النقطة المؤثرة', def: 'نقطة واحدة تحرّك خط الانحدار كله.' },
    { en: 'Central Limit Theorem', ar: 'النظرية المركزية', def: 'متوسطات العيّنات تصبح طبيعية مع كبر n.' },
  ],

  apps: [
    {
      h: '👕 تطبيق 1: القميص الأحمر',
      p: ['طلاب يلبسون القميص الأحمر حصلوا على درجات أعلى. r = 0.6.', 'التفسير السطحي: القميص يسبّب الدرجات. <b>خطأ</b>. المتغيّر الثالث: ساعات الدراسة (الطلاب المجتهدون يهتمون بالحضور والتنظيم).'],
    },
    {
      h: '🍦 تطبيق 2: الآيس كريم والغرق',
      p: ['المبيعات وحوادث الغرق ترتفعان معًا صيفًا. r مرتفع.', 'السببية الحقيقية: الحرارة (confounder) ترفع السباحة وأكل الآيس كريم. هذا المثال الكلاسيكي يدخل في كل اختبار.'],
    },
    {
      h: '📚 تطبيق 3: ساعات الدراسة',
      p: ['النموذج: الدرجة = 2 × ساعات + 40. slope = 2، intercept = 40.', 'تنبّؤ لـ 20 ساعة = 80 درجة — لكنها extrapolation إذا لم نقس أحدًا فوق 10 ساعات. ووحدة واحدة عند 15 ساعة قد تحرّك الخط كله (influential).'],
    },
  ],

  tips: [
    { kw: 'moves together', ans: 'Correlation (ارتباط)', hint: 'ليس بالضرورة سببًا' },
    { kw: 'one causes the other', ans: 'Causation (سببية)', hint: 'يحتاج تجربة' },
    { kw: 'third variable drives both', ans: 'Confounder (متغيّر ثالث)', hint: 'الصيف/ساعات الدراسة' },
    { kw: 'ice cream & drowning', ans: 'Confounder = Summer heat', hint: 'مثال كلاسيكي' },
    { kw: 'r between −1 and +1', ans: 'Correlation coefficient', hint: 'القوة في |r| والاتجاه في الإشارة' },
    { kw: 'r = −0.9', ans: 'أقوى من r = +0.5 (عكسية قوية)', hint: 'القوة بالقيمة المطلقة' },
    { kw: 'change in y per unit x', ans: 'Slope (الميل)', hint: 'معامل x' },
    { kw: 'y when x = 0', ans: 'Intercept (التقاطع)', hint: 'قد يكون غير منطقي' },
    { kw: 'actual − predicted', ans: 'Residual (الباقي)', hint: 'خطأ التنبّؤ' },
    { kw: 'one point moves the whole line', ans: 'Influential point', hint: 'افحصه قبل الثقة' },
    { kw: 'predicting outside data range', ans: 'Extrapolation — خطر', hint: 'النموذج قد لا يستمر' },
    { kw: 'means of samples become normal', ans: 'Central Limit Theorem', hint: 'n ≥ 30 قاعدة شائعة' },
    { kw: 'how to confirm causation', ans: 'Randomised experiment', hint: 'غيّر متغيّرًا واحدًا فقط' },
  ],

  games: [
    {
      h: '🎮 لعبة 3D: سبب أم مجرد ارتباط؟',
      p: 'سيناريوهات تظهر — التقط السببية الحقيقية (خضرا) وتجنّب ما هو مجرد ارتباط خادع (حمرا).',
      kind: '3d',
      config: JSON.stringify({
        mode: 'sort', title: 'سبب أم ارتباط؟', time: 45,
        good: [['study hours → grade', 'ساعات الدراسة → الدرجة', 1], ['phone calls → bill', 'المكالمات → الفاتورة', 1], ['hours training → speed', 'التدريب → السرعة', 1], ['rain → wet ground', 'المطر → أرض مبللة', 1]],
        bad: [['red shirt → grade', 'القميذ الأحمر → الدرجة', 30], ['ice cream → drowning', 'الآيس كريم → الغرق', 30], ['shoe size → reading', 'مقاس الحذاء → القراءة', 30], ['coffee → bus late', 'القهوة → تأخر الباص', 30]],
      }),
      foot: 'الخضر = سببية مباشرة · الحمر = confounder خلف الكواليس.',
    },
  ],

  quiz: [
    { q: 'What is the essential difference between correlation and causation?', opts: ['None, they mean the same thing', 'One moves with, one acts upon', 'Causation is the weaker one', 'Correlation is the stronger'], a: 1, why: 'ارتباط = تتحركان معًا؛ سببية = واحد يصنع الآخر.', tag: 'C6', diff: 'سهل' },
    { q: 'The value of r always falls between:', opts: ['0 and 100', '−1 and +1', '0 and 1', '−10 and +10'], a: 1, why: 'معامل الارتباط محصور بين −1 (عكسي تام) و+1 (طردي تام).', tag: 'C6', diff: 'سهل' },
    { q: 'r = −0.9. What does the value mean?', opts: ['A weak correlation, close to zero', 'A strong negative correlation', 'A strong positive correlation', 'No correlation whatsoever'], a: 1, why: 'الإشارة سالبة (عكسي) و|r| كبير (قوي).', tag: 'C6', diff: 'متوسط' },
    { q: 'Which is stronger: r = −0.9 or r = +0.5?', opts: ['The +0.5 value, being positive', '−0.9, since strength is |r|', 'They are both equal', 'They cannot be compared'], a: 1, why: 'القوة = القيمة المطلقة: 0.9 > 0.5.', tag: 'C6', diff: 'متوسط' },
    { q: 'r ≈ 0 means:', opts: ['An inverse relationship between them', 'No organised relationship at all', 'A strong relationship between them', 'Direct causation between them'], a: 1, why: 'النقاط مبعثرة بلا نمط.', tag: 'C6', diff: 'سهل' },
    { q: 'Ice cream sales and drownings rise together. What is the correct explanation?', opts: ['The ice cream itself causes drowning', 'Heat (a confounder) causes both', 'Nothing but a pure coincidence', 'Drowning causes ice cream'], a: 1, why: 'المتغيّر الثالث = فصل الصيف/الحرارة.', tag: 'C6', diff: 'متوسط' },
    { q: 'Red shirts and higher scores. What is the smartest explanation?', opts: ['The shirt itself causes the grades', 'A confounder, like study hours', 'There is no correlation here', 'The grades cause the shirt'], a: 1, why: 'ارتباط بدون آلية سببية معقولة → ابحث عن ثالث.', tag: 'C6', diff: 'متوسط' },
    { q: 'What do we call a variable that causes two others and fools us into seeing causation?', opts: ['A residual error term', 'A confounder', 'The slope of the line', 'An outlier point'], a: 1, why: 'المتغيّر الثالث المشترك = confounder.', tag: 'C6', diff: 'سهل' },
    { q: 'How do you confirm causation between two variables?', opts: ['Increase the sample size a great deal', 'A controlled random experiment', 'Draw a clear scatter plot', 'Just compute the r value'], a: 1, why: 'التجربة هي التي تثبت الأثر، البيانات الرصدية تُظهر الارتباط فقط.', tag: 'C6', diff: 'متوسط' },
    { q: 'Model: Score = 2 × Hours + 40. What does slope = 2 mean?', opts: ['The score always starts at 2', 'Each hour adds two points', 'The maximum score is 2', 'The size of the error is 2'], a: 1, why: 'الميل = تغيّر y لكل وحدة x.', tag: 'C6', diff: 'متوسط' },
    { q: 'In the same model, what is intercept = 40?', opts: ['The score value at 0 study hours', 'The mean score across all students', 'The maximum possible score', 'The deviation from the mean'], a: 0, why: 'التقاطع = قيمة y عندما x = 0.', tag: 'C6', diff: 'سهل' },
    { q: 'We predicted the score for 20 hours while the most we measured was 10. What is this?', opts: ['Interpolation inside the measured range', 'Extrapolation — beyond the data', 'Regression to the mean of the data', 'Confounding by a third variable'], a: 1, why: 'التنبّؤ خارج نطاق البيانات قد يفشل.', tag: 'C6', diff: 'متوسط' },
    { q: 'What is the residual?', opts: ['The fitted regression line itself', 'The gap between actual and predicted', 'The correlation coefficient value itself', 'The third variable behind it'], a: 1, why: 'الباقي = الفعلية − المتوقّعة.', tag: 'C6', diff: 'متوسط' },
    { q: 'What does OLS minimise?', opts: ['The total number of data points', 'The sum of squared residuals', 'The value of the coefficient r', 'The amount of skew present'], a: 1, why: 'أقل تربيعًا = أقل خطأ في مجموع المربّعات.', tag: 'C6', diff: 'متوسط' },
    { q: 'One far-away point moved the whole regression line. What is it called?', opts: ['The mode of the whole data set', 'An influential point', 'The intercept value', 'A frame of reference'], a: 1, why: 'النقطة المؤثرة تتحكم في ميل الخط.', tag: 'C6', diff: 'متوسط' },
    { q: 'The Central Limit Theorem says that sample means:', opts: ['Always follow the population shape', 'Approach a normal bell as n grows', 'Disappear without a trace', 'Become larger over time'], a: 1, why: 'هذا هو جوهر CLT.', tag: 'C6', diff: 'سهل' },
    { q: 'The common rule of thumb for the CLT usually holds when:', opts: ['n = 1', 'n ≥ 30', 'n ≥ 1000', 'Any n'], a: 1, why: 'قاعدة عملية شائعة، رغم أن الأشكال المتطرفة قد تحتاج أكبر.', tag: 'C6', diff: 'متوسط' },
    { q: 'Does the CLT require the original population to be normal?', opts: ['Yes, in every case', 'No — any shape works', 'Only for skewed ones', 'Only for bimodal ones'], a: 1, why: 'هذا ما يجعل النظرية قوية.', tag: 'C6', diff: 'متوسط' },
    { q: 'A heavily skewed population. Sample means of size 50 will be:', opts: ['Skewed the same way', 'Close to normal', 'Perfectly constant', 'Zero'], a: 1, why: 'CLT: n كبير يغلبه الانحراف.', tag: 'C6', diff: 'صعب' },
    { q: 'Why is the CLT so important in data science?', opts: ['Because it removes the need for samples', 'Because error follows a normal curve', 'Because it raises the value of r', 'Because it deletes all outliers'], a: 1, why: 'الطبيعي موصوف بمعاملين، فيسهل الاستدلال.', tag: 'C6', diff: 'صعب' },
    { q: 'All causation is correlation, but:', opts: ['All correlation is also causation', 'Not all correlation is causation', 'There is no link at all', 'The reverse always holds true'], a: 1, why: 'هذه الجملة المحورية في الوحدة.', tag: 'C6', diff: 'سهل' },
    { q: 'A strong positive correlation between maths and physics grades. The likeliest explanation?', opts: ['Maths grades cause physics grades', 'Shared ability and study hours', 'A mere coincidence, nothing more', 'There is no real correlation'], a: 1, why: 'موضوعان يحتاجان نفس المهارات والجهد.', tag: 'C6', diff: 'صعب' },
    { q: 'Does r = 0 necessarily mean there is no relationship at all?', opts: ['Yes, always, no exceptions at all', 'No — a non-linear link may exist', 'Yes, for very large data sets', 'No — it actually means causation'], a: 1, why: 'r يقيس العلاقة الخطية فقط.', tag: 'C6', diff: 'صعب' },
    { q: 'What can make the intercept nonsensical?', opts: ['A very small value of r', 'No x-values near zero', 'A very large data set', 'The use of the OLS method'], a: 1, why: 'التقاطع يفترض أن x = 0 ممكن ومُقاس.', tag: 'C6', diff: 'صعب' },
    { q: 'Small, random residuals around the line indicate:', opts: ['A model that fits poorly', 'A good model that fits', 'An r value of zero', 'Clear extrapolation'], a: 1, why: 'لا نمط واضح في الأخطاء = ملاءمة جيدة.', tag: 'C6', diff: 'متوسط' },
    { q: 'The most practical way to detect a confounder:', opts: ['Increase the sample size a lot', 'Think of a third variable', 'Delete the odd points', 'Use the median instead'], a: 1, why: 'تخمين الثالث ثم قياسه/التحكم فيه.', tag: 'C6', diff: 'متوسط' },
    { q: 'In the CLT, what is exactly normally distributed?', opts: ['The individual values', 'The sample means', 'The deviations', 'The modes'], a: 1, why: 'النظرية عن توزيع sample means.', tag: 'C6', diff: 'متوسط' },
    { q: 'Two samples from a skewed population, n = 5 and n = 100. Which is closer to normal?', opts: ['n = 5', 'n = 100', 'They are equal', 'Both are skewed'], a: 1, why: 'كبر n هو الشرط.', tag: 'C6', diff: 'متوسط' },
    { q: 'Causation without a controlled experiment counts as:', opts: ['A fully proven scientific result', 'An assumption needing evidence', 'A logical impossibility anyway', 'A correlation of exactly zero'], a: 1, why: 'بدون تجربة، السببية استنتاج لا قياس.', tag: 'C6', diff: 'صعب' },
    { q: 'The best regression line minimises:', opts: ['The total number of data points', 'The sum of squared residuals', 'The value of the intercept term', 'The size of the sample used'], a: 1, why: 'تعريف OLS: الخط «الأفضل» هو الذي يجعل مجموع مربّعات المسافات العمودية (residuals) أصغر ما يمكن — ولذلك اسمه Ordinary Least Squares.', tag: 'C6', diff: 'صعب' },
    { q: 'Coffee sales and slipping accidents both rose in the morning. The explanation?', opts: ['The coffee itself causes slipping', 'A confounder: morning crowding', 'An r value equal to zero', 'Extrapolation at work'], a: 1, why: 'وقت اليوم يحرّك الاثنين.', tag: 'C6', diff: 'صعب' },
    { q: 'A large sample from a skewed population: the distribution of its means nears a bell because:', opts: ['The skew vanishes from the population', 'The CLT: averaging cancels the skew', 'The r value slowly approaches 1', 'The mean then equals the median'], a: 1, why: 'تأثير القيم المتطرفة يتلاشى عند متوسط عدد كبير منها.', tag: 'C6', diff: 'صعب' },
  ],
};
