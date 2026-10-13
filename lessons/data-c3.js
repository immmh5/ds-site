/* ============================================================
   data-c3.js — Lesson 3: Ethics, Privacy, Bias & Approval
   ============================================================ */
window.LESSON_C3 = {
  id: 'c3',
  title: 'Ethics, Privacy, Bias & Approval',
  titleAr: 'الأخلاقيات والخصوصية والتحيّز والموافقة',
  unit: 'Unit 1 · Data Literacy',
  num: 3,
  hook: 'مدرّس فيزياء تركّز على درجات الطلاب، مدرّس الكيمياء تركّز على درجات طلابه. كل واحد يرى صورة مختلفة لنفس المدرسة. وفي زاوية تانية: صور بياناتك الشخصية تنشر في مشروع صف. من وافق؟ وهل أحد ممكن يتأذى؟',

  eli5: [
    'الأخلاقيات في البيانات = <b>الإذن + الضرر</b>. قبل ما تستخدم أي ملف، اسأل: «من وافق؟» و«مين ممكن يتأذى؟». إذا ما تعرف الجواب، السيناريو ناقص — وهذا نفسه جواب في الاختبار.',
    'الخصوصية ليست «إخفاء الاسم». <b>Pseudonymisation</b> تستبدل الاسم برمز، لكن يمكن ربطها بسهولة. <b>Anonymisation</b> الحقيقية تمنع <b>أي شخص</b> من ربط البيانات بشخص — وهذا صعب جدًا، وغالبًا مستحيل مع الملفات الصغيرة.',
    'التحيّز = خطأ منهجي يميل بنتيجتك اتجاه واحد. النوع الأخطر في الاختبارات: <b>Coverage bias</b> (جزء من المجتمع مفقود من الإطار) و<b>Voluntary response bias</b> (اللي يشاركون أقوى رأيًا، فينتفخ المتطرفون).',
  ],
  eli52: [
    '<b>Coverage bias:</b> جزء من المجتمع مفقود من الإطار (frame) — مثال: استبياع بالتطبيق يفوّت الطلاب بدون هاتف.',
    '<b>Voluntary response bias:</b> عيّنة ذاتية الاختيار، فيتجمع أقوى المشاعر — مثل: «صوّتوا» في موقع رياضي.',
    '<b>Non-response bias:</b> وحدات اختيرت لكنها لم ترد — وعدم الرد نفسه يحمل معلومة.',
    '<b>Leading question bias:</b> صياغة تدفع لإجابة واحدة — مثل: «هل توافق على هذه الخدمة الممتازة؟».',
    '<b>Small-sample bias:</b> عدد قليل من الوحدات يجعل النتائج المتطرفة محتملة جدًا بالصدفة.',
    '<b>Publication bias:</b> نتائج «مشرقة» تُنشر والنتائج السلبية تُدفن.',
    '<b>Confirmation bias:</b> تقرأ فقط الأدلة التي تدعم رأيك السابق.',
    '<b>Measurement bias:</b> أداة القياس مكسورة أو طريقة التسجيل خاطئة.',
  ],

  objectives: [
    'نطبّق قواعد الموافقة: نعم / ربما / لا — حسب نوع البيانات والاستخدام',
    'نفرّق بين Pseudonymisation و Anonymisation ونسمّي مبدأ خصوصية واحدًا على الأقل',
    'نسمّي سبعة أنواع من التحيّز ونحكم على كل سيناريو حسب نوعه ومصدره',
  ],

  sections: [
    {
      id: 'consent',
      t: 'الموافقة: من وافق، وعلى ماذا؟',
      blocks: [
        { type: 'p', t: 'قاعدة واحدة: <b>الأسئلة الأخلاقية ليست نعم-لا بشكل عام</b> — بل نعم-لا-ربما حسب نوع البيانات. الإجابة الذكية أحيانًا: «السيناريو غير محدد بالكامل»، ثم تسمّي السؤال الناقص.' },
        {
          type: 'cards', cols: 3,
          items: [
            { h: '✅ NO approval', body: ['بيانات عامة مجهولة المصدر', 'مثل: متوسط درجات الحرارة، إحصاءات عامة'] },
            { h: '🟡 MAYBE — ask more', body: ['بيانات شخصية أو شبه قابلة للتعرف', 'أو إعادة استخدام لغرض آخر (reuse)', 'مثل: سجلات الحضور (absence data)'] },
            { h: '⛔ YES + consult', body: ['بيانات حساسة، أو خطر ضرر جماعي (group harm)', 'مثل: بيانات صحية، جماعات مهمّشة'] },
          ],
        },
        {
          type: 'kv',
          items: [
            ['Reuse · إعادة الاستخدام', 'هل البيانات جُمعت لغرض، وأنت تستخدمها لغرض آخر؟ إذًا: <b>MAYBE</b> — تحتاج موافقة على الغرض الجديد.'],
            ['Reputational Harm · ضرر السمعة', 'هل يمكن أن يضر النشر بسمعة الشخص أو المجموعة؟ إذًا: <b>YES</b> + استشر.'],
            ['Prior Consultation · الاستشارة المسبقة', 'استشر الجماعة المعنية <b>قبل</b> الجمع، أبدًا بعده.'],
            ['Special Consent · الموافقة الخاصة', 'البيانات الحساسة تحتاج موافقة صريحة ومخصصة، ليست عامة.'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'سؤال اختبار شائع',
          p: ['«صور الكافتيريا للتحليل — هل تحتاج موافقة؟» <b>الإجابة: لا</b> (بيانات عامة مجهولة). لكن «صور وجوه الطلاب من المقصف دون إذن» <b>الإجابة: نعم</b> (قابلة للتعرف). <b>الفرق: هل يمكن التعرف على الفرد؟</b>'],
        },
      ],
    },
    {
      id: 'anonymise',
      t: 'إخفاء الهوية: Pseudonymisation ≠ Anonymisation',
      blocks: [
        { type: 'p', t: 'أكبر فخ في وحدة الخصوصية. استبدال الاسم برمز <b>ليس</b> تصحيحًا، لأنه يمكن التراجع عنه بسهولة.' },
        {
          type: 'cards', cols: 2,
          items: [
            { h: 'Pseudonymisation · شبه إخفاء', body: ['يستبدل المعرّف المباشر برمز', 'البيانات <b>قابلة للربط</b> بسهولة', 'لا يصحح المشكلة الأخلاقية وحده', 'مثال: student_id بدل الاسم'] },
            { h: 'Anonymisation · إخفاء كامل', body: ['يمنع <b>أي شخص</b> من الربط بالفرد', 'صعب جدًا، وغالبًا مستحيل على الملفات الصغيرة', 'يتطلب حذف أو تعميم الحقول الكاشفة', 'مثال: متوسط منطقة كاملة'] },
          ],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 250" class="diagram" role="img" aria-label="استبدال الاسم برمز يبقي الباب مفتوحًا للربط، بينما الإخفاء الكامل يقطع كل المسارات"><g font-size="14" text-anchor="middle"><rect x="20" y="20" width="200" height="56" rx="10" fill="#0f2229" stroke="#e76f7b" stroke-width="2"/><text x="120" y="42" fill="#e76f7b" font-weight="700">السجل الأصلي</text><text x="120" y="62" fill="#9fb8c0" font-size="11">أحمد · الصف 11 · النادي</text><rect x="260" y="20" width="200" height="56" rx="10" fill="#0f2229" stroke="#d8b65a" stroke-width="2"/><text x="360" y="42" fill="#d8b65a" font-weight="700">Pseudonymisation</text><text x="360" y="62" fill="#9fb8c0" font-size="11">student_id = 7341 · باقي الأعمدة كما هي</text><rect x="500" y="20" width="200" height="56" rx="10" fill="#0f2229" stroke="#8fd3c0" stroke-width="2"/><text x="600" y="42" fill="#8fd3c0" font-weight="700">Anonymisation</text><text x="600" y="62" fill="#9fb8c0" font-size="11">متوسط منطقة · لا تطابق فردي</text><line x1="224" y1="48" x2="254" y2="48" stroke="#d8b65a" stroke-width="2"/><polygon points="254,44 262,48 254,52" fill="#d8b65a"/><line x1="464" y1="48" x2="494" y2="48" stroke="#8fd3c0" stroke-width="2"/><polygon points="494,44 502,48 494,52" fill="#8fd3c0"/><path d="M360 84 C330 120 300 130 260 150" stroke="#d8b65a" stroke-width="2" fill="none" stroke-dasharray="6 5" marker-end="url(#ar3)"/><path d="M600 84 C600 120 600 130 620 150" stroke="#8fd3c0" stroke-width="2" fill="none"/><rect x="140" y="152" width="340" height="72" rx="10" fill="#1d3a44" stroke="#d8b65a" stroke-width="1.5"/><text x="310" y="176" fill="#d8b65a" font-weight="700">قابل للتراجع (Reversible)</text><text x="310" y="196" fill="#9fb8c0" font-size="11">جدول الرموز أو دمج حقول تكشف الهوية</text><text x="310" y="214" fill="#e76f7b" font-size="11">⟵ ليس حلًا أخلاقيًا كاملًا</text><rect x="520" y="152" width="180" height="72" rx="10" fill="#0f2229" stroke="#8fd3c0" stroke-width="1.5"/><text x="610" y="176" fill="#8fd3c0" font-weight="700">قطع نهائي</text><text x="610" y="196" fill="#9fb8c0" font-size="11">لا يوجد مفتاح رجوع</text><text x="610" y="214" fill="#8fd3c0" font-size="11">صعب على المجموعات الصغيرة</text></g><defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#d8b65a"/></marker></defs></svg>` },
        {
          type: 'callout', kind: 'bad', h: 'لماذا يكاد يكون مستحيلًا؟',
          p: ['في مجموعة صغيرة، <b>بعض المتغيّرات تكفي للتعرف</b> (الجنس + الفصل + النادي الرياضي + المدينة). لذلك Anonymisation مطلب قوي، وليست افتراضًا تلقائيًا.'],
        },
        {
          type: 'table', head: ['مبدأ الخصوصية', 'معناه', 'انتهاك شائع'],
          rows: [
            ['Data minimisation · التقليل', 'اجمع أقل قدر يلزم للسؤال', 'تخزين رقم الهاتف لاختبار رياضيات'],
            ['Specified purpose · غرض محدد', 'استخدمها للغرض المذكور فقط', 'بيانات اختبار تُستخدم للتوظيف'],
            ['Storage limitation · حد التخزين', 'احذف بعد انتهاء الحاجة', 'الاحتفاظ بالمحادثات 5 سنوات'],
            ['Informed consent · موافقة واعية', 'اتفاق كامل بما يُجمع ولماذا', 'موافقة مكتوبة بخط صغير'],
            ['Privacy settings · الإعدادات', 'الخصوصية مفعّلة افتراضيًا', 'الكاميرا دائمًا مفتوحة'],
            ['Data accuracy · الدقة', 'البيانات صحيحة وقابلة للتصحيح', 'درجة خاطئة لا تُصحّح'],
            ['Privacy by design · بالتصميم', 'الخصوصية مدمجة من البداية', 'إضافتها «لاحقًا»'],
            ['Security safeguards · الحماية', 'تقييد الوصول والتشفير', 'ملف مشترك علنًا بدون كلمة سر'],
            ['Open & transparent · الشفافية', 'أخبر الأشخاص بوضوح', 'جمع صامت'],
          ],
        },
      ],
    },
    {
      id: 'bias',
      t: 'التحيّز: خطأ منهجي يميل بنتيجتك',
      blocks: [
        { type: 'p', t: 'التحيّز ليس خطأ عشوائيًا — إنه <b>يميل في اتجاه واحد</b> بشكل منهجي. تذكّر الأنواع السبعة الأساسية:' },
        {
          type: 'table', head: ['النوع', 'التعريف', 'مثال'],
          rows: [
            ['Coverage / Selection', 'جزء من المجتمع <b>مفقود من الإطار</b>', 'استبياع بالتطبيق يفوّت من بدون هاتف'],
            ['Voluntary response', 'عيّنة <b>ذاتية الاختيار</b>، تنتفخ المتطرفات', 'تصويت موقع رياضي «هل اللاعب أسوأ؟»'],
            ['Non-response', 'وحدات اختيرت <b>ولم ترد</b> — وعدم الرد يحمل معلومة', 'الطلاب المتغيبون لا يردون'],
            ['Leading question', 'صياغة <b>تدفع لإجابة واحدة</b>', '«هل توافق على هذه الخدمة الممتازة؟»'],
            ['Small sample', 'وحدات قليلة <b>تسهّل النتائج المتطرفة بالصدفة</b>', '3 طلاب فقط'],
            ['Measurement', 'أداة القياس <b>مكسورة أو تسجيل خاطئ</b>', 'ميزان معطوب'],
            ['Publication / Confirmation', 'النشر <b>المتحيز</b> أو قراءة ما يدعم رأيك فقط', 'تجاهل نتائج مخالفة'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'الأنواع الأكثر تكرارًا في الاختبار',
          p: ['<b>Coverage bias</b> (الإطار يفوّت جزءًا) و<b>Voluntary response bias</b> (مشاركون متحمسون ينتفخون المتطرفات). إذا رأيت كلمة «self-selected» أو «who chose to respond» — الجواب فورًا: <b>Voluntary response bias</b>.'],
        },
        {
          type: 'svg', html: `<svg viewBox="0 0 720 200" class="diagram" role="img" aria-label="تحيّز التغطية: لوحة دائرية يسقط فيها بعض أفراد المجتمع"><g><circle cx="200" cy="105" r="78" fill="#13202a" stroke="#57c7d8" stroke-width="2"/><circle cx="200" cy="105" r="50" fill="#0d1117" stroke="#d8b65a" stroke-width="2" stroke-dasharray="5 4"/><g font-size="12" fill="#93a0b2"><text x="200" y="60" text-anchor="middle">Population</text><text x="200" y="135" text-anchor="middle">Frame</text></g><text x="120" y="180" fill="#e06a6a" font-size="12">← سقطوا من الإطار (coverage bias)</text><g font-size="12"><text x="430" y="60" fill="#d8b65a">Voluntary response</text><text x="430" y="85" fill="#93a0b2">اللي يشاركون = أقوى رأيًا</text><text x="430" y="120" fill="#d8b65a">Non-response</text><text x="430" y="145" fill="#93a0b2">عدم الرد نفسه معلومة</text></g></g></svg>`,
        },
      ],
    },
    {
      id: 'harms',
      t: 'الجمع والضم: متى يظهر الضرر؟',
      blocks: [
        { type: 'p', t: 'أخطر عملية: <b>ضم ملفين</b> (join). كل ملف وحده بريء، والمجموع يكشف الناس.' },
        {
          type: 'steps',
          items: [
            { h: 'خطوة 1 · الجمع', p: 'كل ملف وحده لا يكشف أحدًا — مثل: الحضور + النادي.', ex: 'قائمة حضور + قائمة أعضاء نادي' },
            { h: 'خطوة 2 · الضم', p: 'الضم بالاسم أو المعرّف يربط السجلات.', ex: 'ضم بالاسم' },
            { h: 'خطوة 3 · الأضرار', p: 'ثلاثة أضرار تظهر فورًا:', ex: 'Re-identification · Group harm · Privacy violation' },
          ],
        },
        {
          type: 'kv',
          items: [
            ['Re-identification · إعادة التعرف', 'البيانات التي اعتُقد أنها مجهولة أصبحت قابلة للتعرف بعد الضم.'],
            ['Group harm · ضرر جماعي', 'استنتاج عن فئة كاملة يضر أعضاءها (مثل: جماعة مهمشة) — حتى لو كانت مجهولة الاسم.'],
            ['Privacy violation · انتهاك الخصوصية', 'استخدام بيانات شخصية لغرض أو لأشخاص لم يوافقوا.'],
          ],
        },
        {
          type: 'callout', kind: 'good', h: 'سؤال ناقص = جواب ذكي',
          p: ['إذا كان السيناريو ناقصًا، قل: «السيناريو غير محدد بالكامل»، ثم اسأل: (1) <b>من يملكها وما الذي وافق عليه؟</b> (2) <b>هل هي حساسة؟</b> (3) <b>من قد يتأذى؟</b>'],
        },
      ],
    },
  ],

  glossary: [
    { en: 'Consent', ar: 'الموافقة', def: 'إذن صريح بما يُجمع وكيف يُستخدم.' },
    { en: 'Reuse', ar: 'إعادة الاستخدام', def: 'استخدام بيانات لغرض مختلف عن غرض جمعها.' },
    { en: 'Pseudonymisation', ar: 'شبه إخفاء الهوية', def: 'استبدال المعرّف برمز — يمكن التراجع عنه بسهولة.' },
    { en: 'Anonymisation', ar: 'إخفاء الهوية الكامل', def: 'منع أي شخص من ربط البيانات بالفرد — صعب جدًا.' },
    { en: 'Data Minimisation', ar: 'التقليل من البيانات', def: 'جمع أقل قدر يلزم للسؤال.' },
    { en: 'Group Harm', ar: 'الضرر الجماعي', def: 'استنتاج يضر فئة كاملة، حتى لو كانت مجهولة الأسماء.' },
    { en: 'Coverage Bias', ar: 'تحيّز التغطية', def: 'جزء من المجتمع مفقود من الإطار.' },
    { en: 'Voluntary Response Bias', ar: 'تحيّز الاستجابة الذاتية', def: 'عيّنة ذاتية الاختيار تنتفخ فيها المشاعر القوية.' },
    { en: 'Non-response Bias', ar: 'تحيّز عدم الاستجابة', def: 'وحدات اختيرت ولم ترد، وعدم الرد يحمل معلومة.' },
    { en: 'Leading Question', ar: 'السؤال المُوجِّه', def: 'صياغة تدفع المتسائل لإجابة واحدة.' },
  ],

  apps: [
    {
      h: '🏀 تطبيق 1: تصويت الموقع الرياضي',
      p: ['موقع رياضي يسأل: «هل اللاعب X أسوأ لاعب هذا الترم؟» ويعرض النتائج.', 'السؤال موجِّه (leading) + المشاركون ذاتيو الاختيار (voluntary) = انتفاخ المشاعر القوية. النوعان: Leading question bias + Voluntary response bias.'],
    },
    {
      h: '📱 تطبيق 2: استبياع التطبيق',
      p: ['استبياع موزّع عبر تطبيق مدرسي. الطلاب بدون هاتف أو بدون تطبيق لا يصلون له.', 'هذا coverage bias: جزء من المجتمع مفقود من الإطار. والنتيجة تنحاز نحو الطلاب المتصلين.'],
    },
    {
      h: '🗂 تطبيق 3: دمج سجلات المدرسة',
      p: ['ضم بيانات الحضور بقائمة أعضاء النادي بالاسم، ثم تحليل نشاط فئة كاملة.', 'الأضرار الثلاثة: re-identification (الربط بالأسماء)، group harm (استنتاج عن فئة)، privacy violation (لم يوافقوا على هذا الاستخدام).'],
    },
    {
      h: '⏱ تطبيق 4: المحادثات المحفوظة',
      p: ['المدرسة تحتفظ بسجل محادثات الطلاب 5 سنوات «تحسبًا لأي شيء».', 'انتهاك storage limitation: الاحتفاظ بعد انتهاء الحاجة. الحل: سياسة حذف واضحة + غرض محدد.'],
    },
  ],

  tips: [
    { kw: 'public + anonymous data', ans: 'NO approval needed', hint: 'إحصاءات عامة، متوسطات' },
    { kw: 'identifiable / personal data', ans: 'MAYBE — اسأل أكثر', hint: 'قابل للتعرف؟ الغرض؟' },
    { kw: 'sensitive / group harm', ans: 'YES + استشر مسبقًا', hint: 'بيانات حساسة أو جماعة مهمشة' },
    { kw: 'uses for a different purpose', ans: 'Reuse → MAYBE', hint: 'تحتاج موافقة على الغرض الجديد' },
    { kw: 'replaced name with ID', ans: 'Pseudonymisation — ليس كافيًا', hint: 'يمكن التراجع عنه بسهولة' },
    { kw: 'cannot link back to anyone', ans: 'Anonymisation', hint: 'صعب جدًا على الملفات الصغيرة' },
    { kw: 'part missing from the frame', ans: 'Coverage bias', hint: 'الإطار لا يغطي الجميع' },
    { kw: 'who chose to respond / self-selected', ans: 'Voluntary response bias', hint: 'المتحمسون ينتفخون المتطرفات' },
    { kw: 'wording pushes one answer', ans: 'Leading question bias', hint: '«الخدمة الممتازة»' },
    { kw: 'small n, extreme results', ans: 'Small-sample bias', hint: '3 طلاب بالصدفة' },
    { kw: 'joining two files', ans: 'Re-identification + Group harm', hint: 'الملفان بريئان، الضم يكشف' },
    { kw: 'scenario not fully specified', ans: 'قل: غير محدد، واسأل الأسئلة الثلاثة', hint: 'من وافق؟ حساسة؟ من يتأذى؟' },
  ],

  games: [
    {
      h: '🎮 لعبة 3D: تصرّف أخلاقي أم لا؟',
      p: 'التقط الحالات الأخلاقية (خضرا) وتجنّب الانتهاكات (حمرا). سرعة 45 ثانية!',
      kind: '3d',
      config: JSON.stringify({
        mode: 'sort', title: 'أخلاقي أم انتهاك؟', time: 45,
        good: [['public stats', 'إحصاء عام', 1], ['consent given', 'موافقة واعية', 1], ['deleted on time', 'حُذفت في وقتها', 1], ['purpose stated', 'غرض مذكور', 1], ['minimised', 'أقل بيانات', 1], ['group consulted', 'استشارة مسبقة', 1]],
        bad: [['kept 5 years', 'محفوظة 5 سنوات', 30], ['no consent', 'بدون موافقة', 30], ['name replaced by ID only', 'اسم→رمز فقط', 30], ['self-selected poll', 'تصويت ذاتي', 30], ['frame skips group', 'الإطار يفوّت فئة', 30], ['leading wording', 'صياغة موجِّهة', 30]],
      }),
      foot: 'الأخضر = تطبيق سليم لمبادئ الخصوصية · الأحمر = انتهاك شائع.',
    },
  ],

  quiz: [
    { q: 'A team uses average district temperatures (public data). Do they need consent?', opts: ['Yes, in every case', 'No — it is public data', 'Maybe, ask first', 'Yes if the file is large'], a: 1, why: 'البيانات العامة المجهولة المصدر لا تحتاج موافقة.', tag: 'C3', diff: 'سهل' },
    { q: 'A team uses student attendance records for a project beyond their original purpose. What is the call?', opts: ['NO — never reuse any of it', 'MAYBE — new purpose, new consent', 'YES — reuse it right away', 'The original purpose is irrelevant'], a: 1, why: 'Reuse = استخدام لغرض آخر، فالجواب MAYBE يحتاج توضيحًا.', tag: 'C3', diff: 'متوسط' },
    { q: 'A team collects sensitive health data about a marginalised group. What is the call?', opts: ['NO — not under any terms', 'MAYBE — check the rules first', 'YES, after consulting them', 'YES, but only after publishing'], a: 2, why: 'بيانات حساسة + خطر group harm = YES مع استشارة مسبقة.', tag: 'C3', diff: 'متوسط' },
    { q: 'The team swapped student names for student_id. Is the data now anonymous?', opts: ['Yes, fully', 'No — it is only pseudonymisation', 'Yes if there are many rows', 'Yes if another column is added later'], a: 1, why: 'الاستبدال برمز = شبه إخفاء، والربط سهل. ليس anonymisation.', tag: 'C3', diff: 'متوسط' },
    { q: 'Why is Anonymisation nearly impossible on small files?', opts: ['Small files are slow to load and process', 'A few variables can identify a person', 'It is too expensive for a school', 'It is illegal under privacy law'], a: 1, why: 'الجنس + الفصل + النادي + المدينة تكفي لتحديد شخص في مجموعة صغيرة.', tag: 'C3', diff: 'صعب' },
    { q: '"We kept the chat logs for 5 years just in case." Which principle is broken?', opts: ['Data minimisation', 'Storage limitation', 'Privacy by design principle', 'Transparency'], a: 1, why: 'الحد الزمني للتخزين: احذف بعد انتهاء الحاجة.', tag: 'C3', diff: 'متوسط' },
    { q: 'Storing a student’s phone number for a maths test. Which principle is broken?', opts: ['Storage limitation', 'Data minimisation', 'Accuracy', 'Openness'], a: 1, why: 'التقليل: اجمع أقل قدر يلزم — ورقم الهاتف لا يلزم.', tag: 'C3', diff: 'متوسط' },
    { q: '"The camera is always recording; you can turn it off yourself." Which principle is broken?', opts: ['Data minimisation', 'Privacy settings (defaults)', 'Accuracy', 'Storage limitation of the footage'], a: 1, why: 'الخصوصية يجب أن تكون مفعّلة افتراضيًا، لا مغلقة.', tag: 'C3', diff: 'متوسط' },
    { q: 'A survey runs on an app, and students without phones cannot reach it. Which bias?', opts: ['Voluntary response bias', 'Coverage bias', 'Measurement bias', 'Publication bias'], a: 1, why: 'جزء من المجتمع مفقود من الإطار = coverage bias.', tag: 'C3', diff: 'سهل' },
    { q: 'A sports site runs a poll "Is the player worse?" and respondents are avid fans. Which two biases?', opts: ['Coverage + Measurement', 'Voluntary response + Leading question', 'Small sample + Publication', 'Both non-response and confirmation bias'], a: 1, why: 'ذاتيو الاختيار (voluntary) + صياغة موجِّهة (leading).', tag: 'C3', diff: 'متوسط' },
    { q: 'Students who were selected but never replied to the survey represent:', opts: ['Non-response bias', 'Coverage bias', 'Publication bias in the study', 'Measurement bias'], a: 0, why: 'الاختيار حدث والرد لم يحدث — وعدم الرد يحمل معلومة.', tag: 'C3', diff: 'متوسط' },
    { q: '"Do you agree this excellent service is good?" is an example of:', opts: ['Voluntary response bias', 'Leading question bias', 'Coverage bias', 'Small-sample bias'], a: 1, why: 'الصياغة تدفع لإجابة واحدة (كلمة «ممتازة»).', tag: 'C3', diff: 'سهل' },
    { q: 'A team analysed only 3 students and got an extreme result. Which bias?', opts: ['Small-sample bias', 'Coverage bias in the sample', 'Measurement bias', 'Publication bias'], a: 0, why: 'قلة الوحدات تسهّل النتائج المتطرفة بالصدفة.', tag: 'C3', diff: 'سهل' },
    { q: 'A broken thermometer skews every reading. Which bias?', opts: ['Measurement bias', 'Non-response bias', 'Leading question', 'Small sample'], a: 0, why: 'أداة القياس مكسورة = measurement bias.', tag: 'C3', diff: 'سهل' },
    { q: 'A team ignored results that contradicted their expectation. Which bias?', opts: ['Confirmation bias', 'Coverage bias of the sample', 'Measurement bias', 'Small sample'], a: 0, why: 'قراءة الأدلة الداعمة فقط = confirmation bias.', tag: 'C3', diff: 'متوسط' },
    { q: 'The two bias types seen most often in this unit’s tests:', opts: ['Publication bias + Measurement bias', 'Coverage + Voluntary response', 'Small + Leading', 'Non + Confirmation'], a: 1, why: 'فجوة الإطار، والمشاركون ذاتيو الاختيار — الأكثر شيوعًا.', tag: 'C3', diff: 'متوسط' },
    { q: 'Merging attendance and club-member files by name. Which harms can follow?', opts: ['Re-identification, group harm, privacy loss', 'Only a financial loss for the school', 'A spelling mistake that merges two student records', 'A slow computer during the merge'], a: 0, why: 'الجمع يكشف الناس، يضر فئات، ويخترق ما وافقوا عليه.', tag: 'C3', diff: 'صعب' },
    { q: 'A conclusion about a whole category from de-identified data may hurt its members. What is this called?', opts: ['Re-identification', 'Group harm', 'Measurement bias', 'Coverage bias'], a: 1, why: 'الضرر يقع على المجموعة كلها رغم إخفاء الأسماء.', tag: 'C3', diff: 'صعب' },
    { q: 'In an incomplete scenario, the smart answer is:', opts: ['Guess the most common one, since speed matters more than being right', 'Not fully specified — ask who consented and who is harmed', 'Always answer "yes" to save time', 'Always answer "no" to save time'], a: 1, why: 'الأسئلة الأخلاقية الثلاثة الكاشفة.', tag: 'C3', diff: 'متوسط' },
    { q: 'Prior consultation happens:', opts: ['After publishing', 'Before collection', 'During analysis', 'In the final exam week'], a: 1, why: 'استشر الجماعة المعنية قبل الجمع أبدًا بعده.', tag: 'C3', diff: 'سهل' },
    { q: 'Photos of students’ faces in the cafeteria were used in a project. Do they need consent?', opts: ['No — it is a public place', 'Yes — faces are identifiable', 'No, if the crowd in the photo is large', 'Yes only if published'], a: 1, why: 'القابلية للتعرف هي المفتاح، لا مكان التصوير.', tag: 'C3', diff: 'متوسط' },
    { q: 'Which principle means "tell people clearly what you collect and why"?', opts: ['Open & transparent', 'Storage limitation principle', 'Accuracy', 'Minimisation'], a: 0, why: 'الشفافية: لا جمع صامت.', tag: 'C3', diff: 'متوسط' },
    { q: 'The key difference between Bias and random error:', opts: ['There is none', 'Bias leans one way systematically', 'Random error is bigger but has no direction', 'Bias is smaller'], a: 1, why: 'منهجي + في اتجاه واحد = تحيّز.', tag: 'C3', diff: 'صعب' },
    { q: 'Two teachers see the same school in two different pictures. This is an example of:', opts: ['Measurement bias in the reported grades', 'Coverage bias in the data', 'Perspective shaping what you look at', 'Small-sample bias'], a: 2, why: 'ما تختار النظر إليه يصنع الصورة — تحيّز اختاري.', tag: 'C3', diff: 'صعب' },
    { q: 'Positive results get published and negative ones buried. What is this?', opts: ['Publication bias', 'Non-response bias', 'Coverage bias', 'Measurement bias'], a: 0, why: 'النشر المتحيّز لما يبدو جيدًا.', tag: 'C3', diff: 'متوسط' },
    { q: 'Which statement about Pseudonymisation is correct?', opts: ['It solves every ethical problem in the dataset', 'It replaces the name, but linking is easy', 'It prevents all identification', 'It has nothing to do with privacy'], a: 1, why: 'تخفي الاسم المباشر فقط — لا تكفي وحدها.', tag: 'C3', diff: 'متوسط' },
    { q: 'A student agreed to a sleep survey, then their data was used to judge their health. What is violated?', opts: ['Specified purpose', 'Storage limitation', 'Minimisation', 'Accuracy'], a: 0, why: 'الموافقة كانت على سؤال النوم، لا على تقييم الصحة — غرض مختلف.', tag: 'C3', diff: 'صعب' },
    { q: 'A consent form in tiny print with no explanation of what is collected breaks:', opts: ['Informed consent', 'Accuracy of the data collected', 'Openness', 'Minimisation'], a: 0, why: 'الموافقة يجب أن تكون واعية وفاهمة.', tag: 'C3', diff: 'متوسط' },
    { q: 'What separates "coverage" bias from "non-response" bias?', opts: ['Nothing — they are exactly the same error', 'One never replies; one was never listed', 'It is simply the reverse', 'Both are just random errors'], a: 1, why: 'الفارق: هل الوحدة في الإطار أصلًا.', tag: 'C3', diff: 'صعب' },
    { q: 'A school adds privacy "later", after collection. Which principle is broken?', opts: ['Privacy by design', 'Storage limitation', 'Accuracy', 'Transparency'], a: 0, why: 'الخصوصية يجب أن تُصمم من البداية، لا تُلصق بعده.', tag: 'C3', diff: 'متوسط' },
    { q: 'The value of non-response in non-response bias means:', opts: ['Missing replies are random, nothing is lost', 'Non-responders may differ from responders', 'Replies are longer', 'Nothing at all'], a: 1, why: 'لهذا السبب عدم الرد معلومة، لا مجرد نقص.', tag: 'C3', diff: 'صعب' },
    { q: 'Filming school corridors to analyse crowding (no identifiable faces). The closest call:', opts: ['YES — but consult the school first', 'NO — no individuals are revealed', 'MAYBE in every case', 'Reject the whole project'], a: 1, why: 'لا قابلية للتعرف = لا حاجة موافقة، شرط ثبات إخفاء الأفراد.', tag: 'C3', diff: 'صعب' },
  ],
};
