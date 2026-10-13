/* ============================================================
   data-c4.js — Lesson 4: Population, Frame & Sampling Design
   ============================================================ */
window.LESSON_C4 = {
  id: 'c4',
  title: 'Population, Frame & Sampling Design',
  titleAr: 'المجتمع والإطار وتصميم العيّنة',
  unit: 'Unit 2 · Sampling & Descriptive Stats',
  num: 4,
  hook: 'تريد أن تقيس مدى رضا طلاب المدرسة كلها (500 طالب). هل تسألهم جميعًا؟ مستحيل. إذًا تختار عيّنة. لكن السؤال الذكي ليس «كم عدد من سألت»، بل: «بأي طريقة اخترتهم؟» — لأن الطريقة هي التي تحدد هل تقدر تعمّم النتيجة على الـ 500.',

  eli5: [
    '<b>Population (المجتمع)</b> = كل الناس الذين تريد أن تستنتج عنهم. <b>Frame (الإطار)</b> = القائمة التي تسحب منها فعليًا (جدول الأسماء). <b>Sample (العيّنة)</b> = من اخترت فعلًا. لو اختلفت القائمة عن المجتمع، فالعيّنة لا تمثّل أحدًا — مهما كبرت.',
    'العيّنة الجيدة ليست «كبيرة»، بل <b>عشوائية بإمكانية معروفة</b>: كل وحدة لها فرصة معروفة غير صفرية للاختيار (known non-zero selection probability). هذا ما يسمح لك أن تعمّم.',
    'أخطر أنواع التصاميم: <b>Stratified</b> (قسّم لطبقات متجانسة، ثم عيّنة عشوائية داخل كل طبقة) لأنه يضمن تمثيل كل مجموعة، و<b>Cluster</b> (اختر عنقودًا كاملًا عشوائيًا) لأنه أرخص لكنه قد يخفي اختلافات داخل العنقود.',
  ],
  eli52: [
    '<b>Simple Random Sampling (SRS):</b> كل عيّنة محتملة من الحجم n لها نفس الفرصة. صعب تطبيقه بدون قائمة كاملة.',
    '<b>Stratified:</b> قسّم المجتمع لطبقات (strata) متجانسة داخليًا، ثم SRS داخل كل طبقة — أدق لكل مجموعة على حدة.',
    '<b>Cluster:</b> اختر بعض العناقيد عشوائيًا ثم ادرس كل وحداتها — أرخص، لكنه أقل دقة لو اختلفت الوحدات داخل العنقود.',
    '<b>Systematic:</b> اختر كل عنصر k من قائمة — احذر نمطًا في ترتيب القائمة (order bias).',
    '<b>Multistage:</b> سلسلة تصاميم (cluster ثم SRS داخل العنقود).',
    '<b>Non-probability:</b> convenience / voluntary / judgmental / quota — <b>لا يمكن التعميم</b> أبدًا.',
    '<b>مشاكل الإطار:</b> omissions (فئة مفقودة)، duplications (مدرج مرتين)، outdated (انتقل)، vague (وحدة غامضة).',
  ],

  objectives: [
    'نفرّق بين population و frame و sample ونسمّي شروط العيّنة الاحتمالية',
    'نشخّص أربع مشاكل في الإطار: omissions, duplications, outdated, vague',
    'نختار التصميم الأنسب (SRS / stratified / cluster / systematic / multistage) ونبرر، ونميّز غير الاحتمالي',
  ],

  sections: [
    {
      id: 'pfs',
      t: 'المجتمع والإطار والعيّنة',
      blocks: [
        {
          type: 'kv',
          items: [
            ['Population · المجتمع', 'مجموعة كل الوحدات التي تريد الاستنتاج عنها. مثال: 500 طالب في المدرسة.'],
            ['Frame · الإطار', 'القائمة الفعلية التي تسحب منها. مثال: جدول الأسماء الرسمي.'],
            ['Sample · العيّنة', 'الوحدات التي تدرسها فعلًا. مثال: 50 طالبًا.'],
            ['Snapshot · لقطة زمنية', 'العيّنة تصف المجتمع في لحظة الجمع — والمجتمع قد يتغيّر بعدها.'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'الشرط الجوهري للاحتمالية',
          p: ['العيّنة الاحتمالية (probability sample) تختار كل وحدة بـ <b>فرصة معروفة غير صفرية</b> (known non-zero selection probability). فقط هذا التصميم يسمح بالتعميم على المجتمع.'],
        },
        {
          type: 'svg', html: `<svg viewBox="0 0 720 210" class="diagram" role="img" aria-label="من المجتمع إلى الإطار إلى العيّنة مع جزء يسقط من الإطار"><g font-size="13"><rect x="20" y="40" width="200" height="130" rx="12" fill="#0f2229" stroke="#57c7d8" stroke-width="2"/><text x="120" y="68" text-anchor="middle" fill="#57c7d8" font-size="15">Population</text><text x="120" y="90" text-anchor="middle" fill="#93a0b2">المجتمع كله</text><text x="120" y="118" text-anchor="middle" fill="#93a0b2">500 طالب</text><rect x="260" y="40" width="200" height="130" rx="12" fill="#0f2229" stroke="#d8b65a" stroke-width="2"/><text x="360" y="68" text-anchor="middle" fill="#d8b65a" font-size="15">Frame</text><text x="360" y="90" text-anchor="middle" fill="#93a0b2">قائمة الأسماء</text><text x="360" y="118" text-anchor="middle" fill="#93a0b2">437 مسجّل</text><rect x="500" y="40" width="200" height="130" rx="12" fill="#0f2229" stroke="#5fcf80" stroke-width="2"/><text x="600" y="68" text-anchor="middle" fill="#5fcf80" font-size="15">Sample</text><text x="600" y="90" text-anchor="middle" fill="#93a0b2">عيّنة عشوائية</text><text x="600" y="118" text-anchor="middle" fill="#93a0b2">50 طالبًا</text><g stroke="#57c7d8" marker-end="url(#ar2)"><line x1="222" y1="105" x2="256" y2="105"/><line x1="462" y1="105" x2="496" y2="105"/></g><text x="360" y="185" text-anchor="middle" fill="#e06a6a">63 طالب غير مسجّل → omission (فجوة في الإطار)</text></g></svg>`,
        },
      ],
    },
    {
      id: 'frame',
      t: 'مشاكل الإطار: أربع عيوب قاتلة',
      blocks: [
        { type: 'p', t: 'الإطار هو الرابط بين سؤالك والمجتمع. أي عيب فيه ينتقل مباشرةً إلى نتيجتك:' },
        {
          type: 'cards', cols: 2,
          items: [
            { h: '🕳 Omissions · نقص', body: ['فئة كاملة مفقودة من القائمة', 'مثال: الطلاب المسجلون متأخرًا غير مدرجين'] },
            { h: '👯 Duplications · تكرار', body: ['نفس الوحدة مدرجة مرتين', 'مثال: طالب في قائمتين لنفس الغرض', 'النتيجة: فرصة مضاعفة في الاختيار'] },
            { h: '🏚 Outdated · قديم', body: ['القائمة لم تعد تطابق الواقع', 'مثال: طلاب انتقلوا من المدرسة'] },
            { h: '❓ Vague · غامض', body: ['تعريف الوحدة نفسه غير واضح', 'مثال: «الأسرة» — هل تشمل غير المقيمين؟'] },
          ],
        },
        {
          type: 'callout', kind: 'bad', h: 'خطأ شائع في الاختبار',
          p: ['«العيّنة كبيرة جدًا، إذًا الإطار سليم» — <b>خطأ</b>. حجم العيّنة لا يصلح فجوة في الإطار: لو كان 63 طالبًا خارج القائمة، فزيادة العيّنة داخل القائمة تزيد الفجوة صرامةً، لا تقللها.'],
        },
      ],
    },
    {
      id: 'designs',
      t: 'التصاميم الاحتمالية الخمسة',
      blocks: [
        {
          type: 'table', head: ['التصميم', 'كيف يتم', 'متى ينفع', 'احذر'],
          rows: [
            ['Simple Random (SRS)', 'كل عيّنة محتملة من n لها نفس الفرعة', 'عند وجود قائمة كاملة ومتجانسة', 'صعب بدون قائمة'],
            ['Stratified', 'قسّم لطبقات متجانسة، SRS داخل كل طبقة', 'تريد دقة لكل مجموعة على حدة', 'تقسيم خاطئ للطبقات'],
            ['Cluster', 'اختر عناقيد عشوائيًا، ادرس وحداتها', 'الوحدات متقاربة داخل العنقود', 'اختلاف كبير داخل العنقود'],
            ['Systematic', 'كل عنصر k من قائمة', 'قائمة بترتيب عشوائي', 'نمط في ترتيب القائمة'],
            ['Multistage', 'سلسلة: cluster ثم SRS داخل كل عنقود', 'مجتمعات كبيرة ومتفرقة', 'فقدان السيطرة على الاحتمالات'],
          ],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 270" class="diagram" role="img" aria-label="ثلاثة تصاميم سحب على نفس المجتمع: SRS عشوائي مطلق، Stratified يضمن كل طبقة، Cluster يأخذ عناقيد كاملة"><g font-size="13" text-anchor="middle"><text x="120" y="26" fill="#57c7d8" font-weight="700">SRS · عشوائي بسيط</text><text x="360" y="26" fill="#8fd3c0" font-weight="700">Stratified · طبقات</text><text x="600" y="26" fill="#d8b65a" font-weight="700">Cluster · عناقيد</text><g fill="#26505c"><circle cx="60" cy="60" r="7"/><circle cx="100" cy="60" r="7"/><circle cx="140" cy="60" r="7"/><circle cx="180" cy="60" r="7"/><circle cx="60" cy="100" r="7"/><circle cx="100" cy="100" r="7"/><circle cx="140" cy="100" r="7"/><circle cx="180" cy="100" r="7"/><circle cx="60" cy="140" r="7"/><circle cx="100" cy="140" r="7"/><circle cx="140" cy="140" r="7"/><circle cx="180" cy="140" r="7"/></g><g fill="#57c7d8"><circle cx="60" cy="60" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="140" cy="100" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="180" cy="140" r="8" stroke="#dff3f7" stroke-width="1.5"/></g><g fill="#26505c"><circle cx="290" cy="60" r="7"/><circle cx="330" cy="60" r="7"/><circle cx="370" cy="60" r="7"/><circle cx="410" cy="60" r="7"/><circle cx="290" cy="100" r="7"/><circle cx="330" cy="100" r="7"/><circle cx="370" cy="100" r="7"/><circle cx="410" cy="100" r="7"/><circle cx="290" cy="140" r="7"/><circle cx="330" cy="140" r="7"/><circle cx="370" cy="140" r="7"/><circle cx="410" cy="140" r="7"/></g><g fill="#8fd3c0"><circle cx="290" cy="60" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="330" cy="60" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="370" cy="100" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="410" cy="100" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="330" cy="140" r="8" stroke="#dff3f7" stroke-width="1.5"/><circle cx="370" cy="140" r="8" stroke="#dff3f7" stroke-width="1.5"/></g><rect x="262" y="44" width="176" height="30" rx="8" fill="none" stroke="#8fd3c0" stroke-width="1" opacity="0.6"/><rect x="262" y="84" width="176" height="30" rx="8" fill="none" stroke="#8fd3c0" stroke-width="1" opacity="0.6"/><rect x="262" y="124" width="176" height="30" rx="8" fill="none" stroke="#8fd3c0" stroke-width="1" opacity="0.6"/><g fill="#26505c"><circle cx="540" cy="60" r="7"/><circle cx="580" cy="60" r="7"/><circle cx="620" cy="60" r="7"/><circle cx="660" cy="60" r="7"/><circle cx="540" cy="100" r="7"/><circle cx="580" cy="100" r="7"/><circle cx="620" cy="100" r="7"/><circle cx="660" cy="100" r="7"/><circle cx="540" cy="140" r="7"/><circle cx="580" cy="140" r="7"/><circle cx="620" cy="140" r="7"/><circle cx="660" cy="140" r="7"/></g><rect x="512" y="44" width="176" height="30" rx="8" fill="#8fd3c0" opacity="0.22" stroke="#d8b65a" stroke-width="1.5"/><rect x="512" y="124" width="176" height="30" rx="8" fill="none" stroke="#d8b65a" stroke-width="1.5" opacity="0.6"/><text x="120" y="196" fill="#9fb8c0" font-size="12">3 من 12 — لا ضمان لأي مجموعة</text><text x="360" y="196" fill="#9fb8c0" font-size="12">6 من 12 — كل طبقة ممثّلة</text><text x="600" y="196" fill="#9fb8c0" font-size="12">كل وحدات العنقود المختار</text><rect x="60" y="216" width="600" height="40" rx="10" fill="#0f2229" stroke="#57c7d8" stroke-width="1.5"/><text x="360" y="240" fill="#9fb8c0" font-size="12">نفس المجتمع ونفس الحجم — التوزيع وحده يختلف. السؤال الامتحاني: «أي تصميم يضمن تمثيل المجموعات؟»</text></g></svg>` },
        {
          type: 'callout', kind: 'good', h: 'مثال الاختبار: 500 طالب، عيّنة 50',
          p: ['الفرصة لكل طالب = 50 / 500 = <b>10%</b>. لكن في stratified (5 طبقات × 10) تبقى 10% لكل طالب <b>داخل كل طبقة</b> — مع ضمان تمثيل كل طبقة. وفي cluster (10 فصول × 5) تختلف الفرص حسب حجم الفصل.'],
        },
        {
          type: 'sim', kind: 'sampling', h: '🔬 محاكاة: اسحب عيّنة بنفسك',
          foot: 'غيّر تصميم السحب وشاهد: هل كل منطقة من المجتمع ممثّلة؟ لاحظ الفرق بين SRS و Stratified و Cluster.',
        },
      ],
    },
    {
      id: 'nonprob',
      t: 'التصاميم غير الاحتمالية: لا يمكن التعميم',
      blocks: [
        { type: 'p', t: 'أربعة تصاميم شائعة لكنها <b>لا تسمح بأي تعميم</b> على المجتمع، لأنها ليست عشوائية:' },
        {
          type: 'cards', cols: 2,
          items: [
            { h: '🛒 Convenience · بالراحة', body: ['أسهل من يمكن الوصول إليهم', 'مثال: أصدقاؤك في الكافتيريا'] },
            { h: '📢 Voluntary · ذاتي', body: ['من يختار المشاركة بنفسه', 'مثال: استبياع مفتوح على الإنترنت'] },
            { h: '🧠 Judgmental · بحكمك', body: ['تختار «الممثلين» بنفسك', 'مثال: «أذكى الطلاب»'] },
            { h: '🎯 Quota · بحصة', body: ['أعداد ثابتة لكل فئة، لكن الاختيار غير عشوائي', 'مثال: 10 من كل صف بأي طريقة'] },
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'كيف نميّز سريعًا؟',
          p: ['اسأل: <b>«هل كل وحدة في المجتمع لها فرصة معروفة غير صفرية للاختيار؟»</b> لو الجواب لا — فالتصميم غير احتمالي، ولا يمكنك قول «يمثل المدرسة».'],
        },
        {
          type: 'flow', items: ['Define population', 'Build / audit frame', 'Choose design', 'Draw sample', 'Audit estimates'],
        },
      ],
    },
  ],

  glossary: [
    { en: 'Population', ar: 'المجتمع', def: 'مجموعة كل الوحدات التي تريد الاستنتاج عنها.' },
    { en: 'Sampling Frame', ar: 'إطار العيّنة', def: 'القائمة الفعلية التي تسحب منها العيّنة.' },
    { en: 'Sample', ar: 'العيّنة', def: 'الوحدات التي تدرسها فعلًا.' },
    { en: 'Probability Sample', ar: 'العيّنة الاحتمالية', def: 'كل وحدة لها فرصة معروفة غير صفرية للاختيار.' },
    { en: 'Stratified Sampling', ar: 'العينة الطبقية', def: 'قسّم لطبقات متجانسة ثم SRS داخل كل طبقة.' },
    { en: 'Cluster Sampling', ar: 'عينة العنقود', def: 'اختر عناقيد عشوائيًا وادرس كل وحداتها.' },
    { en: 'Systematic Sampling', ar: 'العينة المنتظمة', def: 'اختر كل عنصر k من القائمة.' },
    { en: 'Multistage Sampling', ar: 'العينة متعددة المراحل', def: 'سلسلة من التصاميم متتالية.' },
    { en: 'Convenience Sample', ar: 'عينة الصدفة', def: 'أسهل الوحدات وصولًا — لا تسمح بالتعميم.' },
    { en: 'Voluntary Sample', ar: 'العينة الذاتية', def: 'يشارك من يختار نفسه — لا تسمح بالتعميم.' },
  ],

  apps: [
    {
      h: '🏫 تطبيق 1: رضا الطلاب',
      p: ['500 طالب، 50 عيّنة. تريد دقة لكل صف (الصفوف تختلف كثيرًا). التصميم: <b>stratified</b> — قسّم لـ 5 طبقات (صفوف) ثم SRS لـ 10 داخل كل طبقة. كل طالب 10% وكل صف ممثّل بالتساوي.'],
    },
    {
      h: '🏘 تطبيق 2: استبياع الأسر',
      p: ['مجتمع مدينتين متباعدتين، وقائمة واحدة لكل أسرة. التصميم: <b>multistage</b> — اختر الأحياء (cluster) عشوائيًا، ثم SRS للبيوت داخل الحي. أرخص بكثير من SRS على كل بيت.'],
    },
    {
      h: '📱 تطبيق 3: استبياع التطبيق (فخ)',
      p: ['استبياع مفتوح في تطبيق المدرسة، ويشارك من يهتم. <b>غير احتمالي (voluntary)</b> — لا يمكنك قول «يمثل الطلاب»، فقط «يمثل المشاركين».'],
    },
    {
      h: '🗂 تطبيق 4: إطار قديم',
      p: ['قائمة الطلاب من العام الماضي، و20% انتقلوا. <b>outdated frame</b>. الحل: حدّث القائمة أولًا، أو صرّح بالقيود في كل ادّعاء (نوعية النتيجة: «الطلاب المسجلون العام الماضي»).'],
    },
  ],

  tips: [
    { kw: 'everyone you conclude about', ans: 'Population', hint: 'المجتمع كله' },
    { kw: 'list you draw from', ans: 'Frame', hint: 'جدول الأسماء' },
    { kw: 'known non-zero selection probability', ans: 'Probability sample', hint: 'شرط التعميم' },
    { kw: 'homogeneous groups, SRS inside each', ans: 'Stratified', hint: 'دقة لكل مجموعة' },
    { kw: 'whole group chosen at random', ans: 'Cluster', hint: 'أرخص، احذر داخله' },
    { kw: 'every k-th from a list', ans: 'Systematic', hint: 'احذر نمط الترتيب' },
    { kw: 'sequence of designs', ans: 'Multistage', hint: 'cluster ثم SRS' },
    { kw: 'easiest to reach', ans: 'Convenience', hint: 'لا تعميم' },
    { kw: 'whoever chooses to respond', ans: 'Voluntary', hint: 'لا تعميم' },
    { kw: 'you pick the representatives', ans: 'Judgmental', hint: 'لا تعميم' },
    { kw: 'fixed counts, non-random choice', ans: 'Quota', hint: 'لا تعميم' },
    { kw: 'group entirely missing from the list', ans: 'Omission', hint: 'فجوة في الإطار' },
    { kw: 'same unit listed twice', ans: 'Duplication', hint: 'فرصة مضاعفة' },
    { kw: 'list no longer matches reality', ans: 'Outdated', hint: 'انتقلوا' },
    { kw: 'unit definition unclear', ans: 'Vague', hint: 'ما هي «الأسرة»؟' },
  ],

  games: [
    {
      h: '🎮 لعبة 3D: احتمالي أم لا؟',
      p: 'التقط التصاميم الاحتمالية (خضرا)، وتجنّب غير الاحتمالية (حمرا).',
      kind: '3d',
      config: JSON.stringify({
        mode: 'sort', title: 'probability؟', time: 45,
        good: [['SRS', 'عشوائي بسيط', 1], ['stratified', 'طبقي', 1], ['cluster', 'عنقودي', 1], ['systematic (random order)', 'منتظم بترتيب عشوائي', 1], ['multistage', 'متعدد المراحل', 1], ['random digit dial', 'اتصال أرقام عشوائية', 1]],
        bad: [['convenience', 'بالراحة', 30], ['voluntary', 'ذاتي', 30], ['judgmental', 'بحكمك', 30], ['quota', 'بحصة', 30], ['friends only', 'الأصدقاء فقط', 30], ['first 10 in list', 'أول 10 في القائمة', 30]],
      }),
      foot: 'السؤال الجوهري: هل لكل وحدة فرصة معروفة غير صفرية؟',
    },
  ],

  quiz: [
    { q: 'What is the key difference between Population and Frame?', opts: ['They are two names for the same thing', 'Population = who you infer; Frame = the list', 'The frame is always larger than the population', 'The population is just the sample drawn'], a: 1, why: 'Population هو هدف الاستنتاج، والـ Frame هو الأداة العملية — وقد يختلفان.', tag: 'C4', diff: 'سهل' },
    { q: 'What is the requirement for a probability sample?', opts: ['It must be drawn at random entirely by hand', 'Each unit needs a known non-zero chance', 'It must include only the smartest units', 'It must be a very large sample indeed'], a: 1, why: 'known non-zero selection probability — هذا ما يسمح بالتعميم.', tag: 'C4', diff: 'سهل' },
    { q: 'A sample of 50 from 500 students. Each student’s chance under SRS:', opts: ['50%', '10%', '2%', '100%'], a: 1, why: 'الاحتمال = n/N = 50 ÷ 500 = 10%.', tag: 'C4', diff: 'متوسط' },
    { q: 'Late-enrolled students are missing from the list. Which frame flaw?', opts: ['Outdated', 'Omission', 'Vague', 'Duplication'], a: 1, why: 'فئة كاملة مفقودة من القائمة = omission.', tag: 'C4', diff: 'سهل' },
    { q: 'One student appears on two lists. Which flaw?', opts: ['Omission — missing', 'Duplication', 'Vague — unclear', 'Outdated — stale'], a: 1, why: 'التكرار يمنحه فرصة مضاعفة في الاختيار.', tag: 'C4', diff: 'متوسط' },
    { q: 'Last year’s student list, and 20% have moved away. Which flaw?', opts: ['Vague', 'Outdated', 'Omission', 'Duplication'], a: 1, why: 'القائمة لم تعد تطابق الواقع.', tag: 'C4', diff: 'سهل' },
    { q: '"Family" — does it include non-residents? Which frame flaw?', opts: ['Outdated — the list is stale', 'Vague (unclear unit)', 'Omission — a group is missing', 'Duplication — listed twice'], a: 1, why: 'تعريف الوحدة نفسه غير واضح = vague.', tag: 'C4', diff: 'متوسط' },
    { q: 'A bigger sample size fixes an omission gap. True or false?', opts: ['True — a bigger sample fixes it', 'False — the gap remains', 'True if you double the size', 'False only for tiny samples'], a: 1, why: 'الحجم لا يعالج خطأ الإطار؛ الفجوة تبقى.', tag: 'C4', diff: 'صعب' },
    { q: 'You split students into grades, then draw 10 at random from each grade. This design is:', opts: ['Just SRS', 'Stratified', 'Cluster sampling', 'Systematic'], a: 1, why: 'طبقات متجانسة + SRS داخل كل طبقة.', tag: 'C4', diff: 'سهل' },
    { q: 'You pick 10 classes at random and study all their students. This design is:', opts: ['Cluster', 'Stratified', 'Systematic', 'Voluntary'], a: 0, why: 'عناقيد تُختار عشوائيًا وتُدرس كاملة.', tag: 'C4', diff: 'متوسط' },
    { q: 'You take every tenth student from a list. The design is:', opts: ['Systematic', 'Stratified', 'Cluster', 'Convenience'], a: 0, why: 'كل عنصر k = systematic.', tag: 'C4', diff: 'سهل' },
    { q: 'The biggest risk in Systematic sampling:', opts: ['The cost of sampling every single unit', 'Order bias from a matching interval', 'Drawing a very small sample', 'Working without any list at all'], a: 1, why: 'إذا كان للقائمة دوريّة تطابق k، تتحول لعينة متحيّزة.', tag: 'C4', diff: 'متوسط' },
    { q: 'You pick districts at random, then houses at random inside each. This is:', opts: ['Multistage', 'Plain SRS', 'Quota sampling', 'Voluntary reply'], a: 0, why: 'سلسلة تصاميم متتالية = multistage.', tag: 'C4', diff: 'متوسط' },
    { q: 'You ask your friends in the cafeteria. What kind of design is it?', opts: ['Convenience sampling', 'Stratified sampling', 'Simple random sampling', 'Systematic sampling'], a: 0, why: 'سهولة الوصول فقط = غير احتمالي.', tag: 'C4', diff: 'سهل' },
    { q: 'An open survey joined by whoever cares. What design and what limit?', opts: ['Voluntary — only participants', 'SRS — it represents the whole school', 'Quota — it covers the community', 'Cluster — it covers all classes'], a: 0, why: 'غير احتمالي، فالاستنتاج محدود بالمشاركين.', tag: 'C4', diff: 'متوسط' },
    { q: 'Why prefer Stratified over SRS when you need accuracy per group?', opts: ['It is much cheaper when budgets are tight', 'All strata are represented by design', 'It is simply faster to do', 'It needs no list at all'], a: 1, why: 'الضمان: كل طبقة ممثّلة بنيّة، لا بالصدفة.', tag: 'C4', diff: 'صعب' },
    { q: 'When is Cluster sampling risky?', opts: ['When all the units are similar', 'When units differ inside', 'When the clusters are very large', 'It is always a risky choice'], a: 1, why: 'الاختلاف الداخلي الكبير يخفي التنوع ويزيد الخطأ.', tag: 'C4', diff: 'صعب' },
    { q: 'Which design needs a complete, homogeneous list to work ideally?', opts: ['Cluster', 'SRS', 'Voluntary', 'Quota'], a: 1, why: 'SRS يختار من القائمة كلها بالتساوي، فنقصها يفسده.', tag: 'C4', diff: 'متوسط' },
    { q: 'A sample describes the population at:', opts: ['A future point in time only', 'The moment of collection', 'Always in the past', 'At all times, forever'], a: 1, why: 'المجتمع قد يتغيّر بعد الجمع، فالعيّنة لقطة زمنية.', tag: 'C4', diff: 'متوسط' },
    { q: 'Which question quickly reveals whether a design is probabilistic?', opts: ['What is the size of the whole sample?', 'Does each unit have a known chance?', 'How long did the collection take?', 'Is the dataset big enough to use?'], a: 1, why: 'هذا تعريف العيّنة الاحتمالية نفسه.', tag: 'C4', diff: 'سهل' },
    { q: 'Quota sampling (10 from each grade, any which way) — why no generalising?', opts: ['Because the total number asked is quite small', 'Because choice within quotas is not random', 'Because the quotas are of equal size', 'Because it takes far too long to do'], a: 1, why: 'شكل العيّنة يشبه الطبقي لكن الاختيار غير عشوائي.', tag: 'C4', diff: 'صعب' },
    { q: 'Which statement about Duplication in a frame is correct?', opts: ['It quietly shrinks the usable sample size', 'It gives that unit a doubled chance', 'It improves the frame representation', 'It has no real effect on results'], a: 1, why: 'الظهور مرتين = وزن مضاعف في الاحتمال.', tag: 'C4', diff: 'صعب' },
    { q: 'Why is SRS hard for a scattered city population with no list?', opts: ['A full per-unit list rarely exists', 'Because most residents refuse to reply', 'Because the law forbids doing it', 'Because the sample size n is small'], a: 0, why: 'بدون إطار كامل تنتقل لبدائل: cluster/multistage.', tag: 'C4', diff: 'صعب' },
    { q: 'Example: "The smartest students represent the school." What design, and why does it fail?', opts: ['Judgmental — a biased choice', 'SRS — it is fully correct here', 'Stratified — also quite correct', 'Cluster — a correct design too'], a: 0, why: 'حكم شخصي في الاختيار = غير احتمالي.', tag: 'C4', diff: 'متوسط' },
    { q: 'Which design keeps strata proportions while keeping selection random?', opts: ['Quota', 'Stratified', 'Convenience', 'Voluntary'], a: 1, why: 'الطبقية تضمن التمثيل بالنسبة، والسحب عشوائي داخلها.', tag: 'C4', diff: 'متوسط' },
    { q: 'In multistage (districts then houses), each house’s final chance is:', opts: ['Always the same as the district rate', 'The product of both stages', 'Always 100% in total', 'It is always zero here'], a: 1, why: 'احتمال اختيار الحي × احتمال البيت داخله.', tag: 'C4', diff: 'صعب' },
    { q: 'The difference between Non-response bias and Omission in a frame:', opts: ['None — they are the exact same thing', 'Never listed vs. never replied', 'It is the exact reverse of that', 'Both occur during the analysis'], a: 1, why: 'الأول خطأ إطار، والثاني يحدث بعد السحب.', tag: 'C4', diff: 'صعب' },
    { q: 'Why is Voluntary sampling both common and misleading?', opts: ['Cheap, but keen only', 'It is always accurate', 'It needs permission first', 'It relies on AI tools'], a: 0, why: 'السهولة تجعله شائعًا، والانتقاء الذاتي يجعله متحيّزًا.', tag: 'C4', diff: 'متوسط' },
    { q: 'The first step before choosing a sample design:', opts: ['Setting the sample size n right away', 'Defining the population and frame', 'Choosing the report colours', 'Writing up the final report'], a: 1, why: 'بدون تعريف المجتمع وإطار سليم لا يوجد تصميم صحيح.', tag: 'C4', diff: 'متوسط' },
    { q: 'Which claim from a convenience survey can be made safely?', opts: ['"The whole school is satisfied"', '"The people we asked are satisfied"', '"Students in general are all satisfied"', '"The entire community is satisfied"'], a: 1, why: 'حدود الاستنتاج تتبع التصميم، وتقف عند المشاركين.', tag: 'C4', diff: 'صعب' },
    { q: 'Which design is usual when no full list exists, but units cluster naturally (classes, districts)?', opts: ['Simple random sampling', 'Cluster or multistage', 'Systematic sampling', 'Convenience sampling'], a: 1, why: 'العناقيد تستغني عن قائمة كل وحدة وتخفّض التكلفة.', tag: 'C4', diff: 'صعب' },
    { q: 'In stratified, what is each student’s chance for 5 strata × 10 out of 500?', opts: ['About 5% for every student', '10% inside each stratum', 'Only 1% in total', 'It varies by stratum'], a: 1, why: '10 من كل 100 داخل الطبقة = 10% لكل طالب، مع تمثيل مضمون لكل طبقة.', tag: 'C4', diff: 'متوسط' },
  ],
};
