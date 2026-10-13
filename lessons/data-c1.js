/* ============================================================
   data-c1.js — Lesson 1: Data-Science Questions & the Data Cycle
   ============================================================ */
window.LESSON_C1 = {
  id: 'c1',
  title: 'Data-Science Questions & the Data Cycle',
  titleAr: 'أسئلة علم البيانات ودورة البيانات',
  unit: 'Unit 1 · Data Literacy',
  num: 1,
  hook: 'مجلس الطلاب يقول: طابور الكافتيريا صار أسوأ هالترم. والمدير يقول: نفس الشيء دائمًا. ولا واحد فيهم كتب أي رقم. كيف تحلّون النقاش بالبيانات؟',

  eli5: [
    'تخيّل إنك تبي تعرف إذا طابور الكافتيريا صار أبطأ. ما تقدر تحكم من راسك — لازم تقيس. هذا بالضبط ما يفعله <b>عالم البيانات</b>: يحوّل سؤالًا غامضًا إلى أرقام، ثم يجاوب عليه بأدلة.',
    'في هذا الدرس تتعلم ثلاث أشياء: (1) الفرق بين علم البيانات وقاعدة البيانات وتعلّم الآلة — كل وحدة لها وظيفة مختلفة. (2) كيف تكتب سؤالًا قابلًا للإجابة: مين بالضبط تسأل عنه، وإيش بصف واحد من الجدول. (3) دورة من خمس خطوات: اسأل ← اجمع ← هيّئ ← حلّل ← اعرض.',
    'القاعدة الذهبية: كل نتيجة تقولها لازم تقول معها قيدها. مثلًا: «الطابور زاد 3 دقايق — بس سجّلنا 8 أيام، والأيام الماطرة ناقصة».',
  ],
  eli52: [
    '<b>علم البيانات (Data Science):</b> حقل يدرّس كيفية جمع البيانات وإدارتها وتحليلها لإيجاد رؤية ذات معنى — والغرض الأساسي هو <b>الإجابة عن سؤال</b>، والدليل يُتتبّع من البداية للنهاية.',
    '<b>قاعدة البيانات (Database):</b> مخزن منظّم للبيانات — تعطيك ما تم إدخاله فيها، والغرض <b>التخزين والاسترجاع</b> فقط.',
    '<b>تعلّم الآلة (Machine Learning):</b> نموذج يُدرّب على بيانات سابقة ليقيم حالة جديدة — الغرض <b>التنبؤ بقيمة</b>، والدليل مجرد رقم من غير تتبع.',
  ],

  objectives: [
    'نفرّق بين Data Science و Database و Machine Learning حسب الغرض والدليل وسير العمل',
    'نصيغ سؤالًا قابلًا للإجابة: Population (المجتمع) + Unit of Analysis (وحدة التحليل) + Variables (المتغيرات)',
    'نرسم المراحل الخمس للدورة، ونشغّل تشخيص الاستعداد (Readiness Diagnostic)، ونسمّي قيدًا واحدًا على الأقل',
  ],

  sections: [
    {
      id: 'three-ways',
      t: 'ثلاث طرق للتعامل مع البيانات',
      blocks: [
        { type: 'p', t: 'كثير من الطلاب يخلطون بين المصطلحات الثلاثة. الحيلة: اسأل عن <b>الغرض</b> (Purpose)، و<b>الدليل</b> (Evidence)، و<b>سير العمل</b> (Workflow). كل اختلاف يظهر في الثلاثة.' },
        {
          type: 'cards',
          items: [
            { h: 'Data Science · علم البيانات', body: ['الغرض: <b>الإجابة عن سؤال</b>', 'الدليل: يُتتبّع من أول جمع لآخر عرض', 'سير العمل: الدورة الكاملة', 'مثال: هل الحضور يؤثر في الدرجات؟ نراجع السجلات ثم نجيب'] },
            { h: 'Database · قاعدة البيانات', body: ['الغرض: <b>التخزين والاسترجاع</b>', 'الدليل: السجل الخام نفسه', 'سير العمل: خزّن ثم استعلم (query)', 'مثال: بوابة المدرسة تعرض حضور الطالب عند الطلب'] },
            { h: 'Machine Learning · تعلّم الآلة', body: ['الغرض: <b>التنبؤ بقيمة</b>', 'الدليل: رقم من غير سياق (bare score)', 'سير العمل: درّب ثم قيّم (train → score)', 'مثال: نظام يتوقع مين معرّض للرسوب الترم الجاي'] },
          ],
        },
        {
          type: 'callout', kind: 'good', h: 'إشارة ذهبية للسؤال',
          p: ['إذا السؤال يقول «<b>يتوقع / يتنبّأ</b>» ⟵ الجواب Machine Learning. وإذا يقول «<b>يخزّن / يسترجع</b>» ⟵ الجواب Database. وإذا يقول «<b>يجيب عن سؤال / يفحص السجلات</b>» ⟵ الجواب Data Science.'],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 230" class="diagram" role="img" aria-label="ثلاث أعمدة تفرّق بين Data Science و Database و Machine Learning"><defs><marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#57c7d8"/></marker></defs><g font-size="15" text-anchor="middle"><rect x="20" y="20" width="200" height="44" rx="10" fill="none" stroke="#57c7d8" stroke-width="2"/><text x="120" y="47" fill="#dff3f7">Question · سؤال</text><rect x="260" y="20" width="200" height="44" rx="10" fill="none" stroke="#8fd3c0" stroke-width="2"/><text x="360" y="47" fill="#dff3f7">Store · تخزين</text><rect x="500" y="20" width="200" height="44" rx="10" fill="none" stroke="#d8b65a" stroke-width="2"/><text x="600" y="47" fill="#dff3f7">Predict · تنبؤ</text><rect x="20" y="90" width="200" height="110" rx="10" fill="#0f2229" stroke="#57c7d8" stroke-width="1.5"/><text x="120" y="122" fill="#57c7d8" font-weight="700">Data Science</text><text x="120" y="146" fill="#9fb8c0" font-size="12">trace evidence</text><text x="120" y="166" fill="#9fb8c0" font-size="12">دليل متتبّع كامل</text><rect x="260" y="90" width="200" height="110" rx="10" fill="#0f2229" stroke="#8fd3c0" stroke-width="1.5"/><text x="360" y="122" fill="#8fd3c0" font-weight="700">Database</text><text x="360" y="146" fill="#9fb8c0" font-size="12">raw record</text><text x="360" y="166" fill="#9fb8c0" font-size="12">السجل الخام</text><rect x="500" y="90" width="200" height="110" rx="10" fill="#0f2229" stroke="#d8b65a" stroke-width="1.5"/><text x="600" y="122" fill="#d8b65a" font-weight="700">Machine Learning</text><text x="600" y="146" fill="#9fb8c0" font-size="12">bare score</text><text x="600" y="166" fill="#9fb8c0" font-size="12">رقم بلا سياق</text><line x1="120" y1="64" x2="120" y2="88" stroke="#57c7d8" stroke-width="2" marker-end="url(#ar1)"/><line x1="360" y1="64" x2="360" y2="88" stroke="#8fd3c0" stroke-width="2" marker-end="url(#ar1)"/><line x1="600" y1="64" x2="600" y2="88" stroke="#d8b65a" stroke-width="2" marker-end="url(#ar1)"/></g></svg>` },
      ],
    },
    {
      id: 'answerable',
      t: 'متى يكون السؤال قابلًا للإجابة؟',
      blocks: [
        { type: 'p', t: 'سؤال «هل الكافتيريا أسوأ؟» سؤال غير قابل للإجابة لأن كلمة <b>أسوأ</b> ما تتقاس. نحتاج ثلاث قطع قبل أي بيانات:' },
        {
          type: 'kv',
          items: [
            ['Population · المجتمع', 'المجموعة الكاملة التي يدور حولها السؤال — <b>تُحدّد قبل</b> جمع أي بيانات. مثال: كل طلاب الصف 11 هالترم في هالمدرسة.'],
            ['Unit of Analysis · وحدة التحليل', 'ماذا يمثّل <b>صف واحد</b> من الجدول — وهي <b>أبدًا نفس</b> المجتمع. مثال: يوم واحد لطالب واحد (30 طالب × 5 أيام = 150 صف).'],
            ['Variables · المتغيرات', 'الحقول التي تسجّلها؛ لكل واحد <b>دور</b> (مفسّر/استجابة/تجميع/معرّف)، و<b>نوع</b>، و<b>وحدة</b>. مثال: عدد الخطوات = استجابة رقمية. المجموعة = مفسّر اسمي.'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'فخّ الاختبار الكبير',
          p: ['<b>وحدة التحليل ≠ المجتمع.</b> إذا قال السؤال: «الجدول فيه صف لكل طالب في كل يوم» — فالوحدة هي <b>طالب-يوم</b>، مو «الطالب»، وأكيد مو «المدرسة». غالبًا يجونك سؤالين عن هالفرق.'],
        },
        {
          type: 'table', head: ['السؤال', 'Population', 'Unit of Analysis', 'نوع المتغير'],
          rows: [
            ['كم ينتظر طالب الكافتيريا؟', 'طلاب الصف 11 هالترم', 'طالب واحد في يوم واحد', 'دقايق الانتظار (رقم)'],
            ['هل النوم يؤثر في الدرجات؟', 'طلاب الصف 11', 'طالب واحد', 'ساعات النوم (رقم)'],
            ['أكثر مادة مفضّلة؟', 'طلاب المدرسة', 'طالب واحد', 'المادة (اسم/فئة)'],
          ],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 260" class="diagram" role="img" aria-label="سؤال واحد يتحلل إلى Population ثم Unit of Analysis ثم Variables"><defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#8fd3c0"/></marker></defs><g font-size="14" text-anchor="middle"><rect x="260" y="14" width="200" height="46" rx="22" fill="#1d3a44" stroke="#57c7d8" stroke-width="2"/><text x="360" y="34" fill="#dff3f7">سؤال قابل للإجابة</text><text x="360" y="52" fill="#9fb8c0" font-size="11">«كم ينتظر الطالب في الكافتيريا؟»</text><rect x="20" y="120" width="200" height="60" rx="10" fill="none" stroke="#8fd3c0" stroke-width="2"/><text x="120" y="142" fill="#8fd3c0" font-weight="700">Population</text><text x="120" y="161" fill="#9fb8c0" font-size="11">كل طلاب الصف 11 هالترم</text><rect x="260" y="120" width="200" height="60" rx="10" fill="none" stroke="#d8b65a" stroke-width="2"/><text x="360" y="142" fill="#d8b65a" font-weight="700">Unit of Analysis</text><text x="360" y="161" fill="#9fb8c0" font-size="11">طالب واحد · يوم واحد</text><rect x="500" y="120" width="200" height="60" rx="10" fill="none" stroke="#c792ea" stroke-width="2"/><text x="600" y="142" fill="#c792ea" font-weight="700">Variables</text><text x="600" y="161" fill="#9fb8c0" font-size="11">دقايق الانتظار = رقم</text><line x1="310" y1="62" x2="150" y2="116" stroke="#8fd3c0" stroke-width="2" marker-end="url(#ar2)"/><line x1="360" y1="62" x2="360" y2="116" stroke="#d8b65a" stroke-width="2" marker-end="url(#ar2)"/><line x1="410" y1="62" x2="570" y2="116" stroke="#c792ea" stroke-width="2" marker-end="url(#ar2)"/><rect x="120" y="210" width="480" height="38" rx="10" fill="#0f2229" stroke="#57c7d8" stroke-width="1.5"/><text x="360" y="234" fill="#9fb8c0">حدّد المجتمع <b>قبل</b> الجمع — وحدة التحليل أبدًا ما تكون نفس المجتمع</text></g></svg>` },
      ],
    },
    {
      id: 'cycle',
      t: 'دورة التحقيق في البيانات (خمس مراحل)',
      blocks: [
        { type: 'p', t: 'كل تحقيق يمرّ بخمس مراحل — وكل ادّعاء يحمل قيوده معه. السبب الأكثر شيوعًا للفشل: البدء بالأداة (Dashboard) بدل السؤال.' },
        {
          type: 'flow', items: ['Ask اسأل', 'Collect اجمع', 'Prepare هيّئ', 'Analyse حلّل', 'Communicate اعرض'],
        },
        {
          type: 'steps',
          items: [
            { h: 'Ask · اسأل', p: 'صياغة سؤال محدّد قابل للقياس قبل التفكير في أي أداة.', ex: 'هل زاد وقت انتظار الغداء؟' },
            { h: 'Collect · اجمع', p: 'قياس ما يحلّل السؤال من مصدر مذكور.', ex: 'ساعة انتظار 40 طالب على 8 أيام.' },
            { h: 'Prepare · هيّئ', p: 'تنظيف البيانات وحذف الناقص وتوحيد الوحدات.', ex: 'حذف التوقيتات الناقصة.' },
            { h: 'Analyse · حلّل', p: 'مقارنة الفترات أو المجموعات بالإحصاء.', ex: 'مقارنة هذا الترم بالسابق.' },
            { h: 'Communicate · اعرض', p: 'عرض النتيجة <b>والقيود</b> معًا.', ex: 'زيادة 3 دقائق — 8 أيام فقط.' },
          ],
        },
        {
          type: 'callout', kind: 'bad', h: 'تخطّوا مرحلة Ask',
          p: ['فريق بنى لوحة معلومات (dashboard) أولًا، ثم بحث عن سؤال. المرحلة المتخطّاة هي <b>Ask</b> — الدورة تبدأ بسؤال أبدًا بأداة.'],
        },
        { type: 'sim', kind: 'sampling', h: 'محاكاة: من المجتمع إلى العينة', foot: 'شوف كيف تختلف العينات عن بعضها — هذا فكرة الدرس الرابع والسادس بالضبط.' },
      ],
    },
    {
      id: 'readiness',
      t: 'تشخيص الاستعداد (Readiness Diagnostic)',
      blocks: [
        { type: 'p', t: 'قبل ما تحلّل، اسأل نفسك ثلاث أسئلة جوابها (نعم/لا). إذا أي وحدة «لا» — السؤال لسه ما جهز.' },
        {
          type: 'cards', cols: 3,
          items: [
            { h: '1 · Question ready؟', body: ['الغرض والمجتمع والفترة مسمّيات', 'والنتيجة قابلة للقياس', 'مثال: انتظار الغداء 12–1، طلاب 11، هذا الترم مقابل السابق'] },
            { h: '2 · Data ready؟', body: ['الصف الواحد معرّف', 'كل متغيّر له دور ووحدة', 'والمصدر مسمّى', 'مثال: انتظار طالب في يوم، بالدقايق، سجّله الموظفون'] },
            { h: '3 · Limits ready؟', body: ['فجوة واحدة محدّدة في الأدلة', 'مكتوبة <b>قبل</b> التحليل', 'مثال: 8 أيام فقط، والأيام الماطرة ناقصة'] },
          ],
        },
        {
          type: 'callout', kind: 'warn', h: '«لا توجد قيود» = إجابة خاطئة',
          p: ['إذا كتب الفريق «no limitations»، فالسؤال <b>غير جاهز</b>. دائمًا يوجد قيد واحد على الأقل — اذكره صراحةً.'],
        },
      ],
    },
  ],

  glossary: [
    { en: 'Data Science', ar: 'علم البيانات', def: 'الإجابة عن سؤال بأدلة من البيانات، من الجمع حتى العرض.' },
    { en: 'Database', ar: 'قاعدة البيانات', def: 'مخزن منظّم للبيانات يمكن استرجاعها عند الطلب.' },
    { en: 'Machine Learning', ar: 'تعلّم الآلة', def: 'استخدام بيانات سابقة للتنبؤ بقيمة جديدة.' },
    { en: 'Population', ar: 'المجتمع الإحصائي', def: 'المجموعة الكاملة التي تُدرَس، وتُحدّد قبل الجمع.' },
    { en: 'Unit of Analysis', ar: 'وحدة التحليل', def: 'ما يمثّله صف واحد من جدول البيانات.' },
    { en: 'Variable', ar: 'المتغيّر', def: 'حقل يتم قياسه أو تسجيله لكل وحدة.' },
    { en: 'Data Cycle', ar: 'دورة البيانات', def: 'اسأل، اجمع، هيّئ، حلّل، ثم اعرض.' },
    { en: 'Limitation', ar: 'قيد / حد', def: 'ما لا تستطيع البيانات أن تخبرك به.' },
    { en: 'Readiness Diagnostic', ar: 'تشخيص الاستعداد', def: 'قائمة فحص تبيّن أن السؤال جاهز للتحليل.' },
  ],

  apps: [
    {
      h: '📱 تطبيق 1: سؤال الكافتيريا',
      p: ['السؤال: «هل صار الطابور أبطأ؟» — حوّلوه لشيء يُقاس: «كم دقيقة ينتظر الطالب بين 12:00 و1:00».', 'Population = طلاب الصف 11 هذا الترم. Unit of Analysis = طالب-يوم. Variable = دقايق الانتظار.', 'النتيجة: زيادة 3 دقائق، مع قيد: 8 أيام مسجّلة فقط.'],
    },
    {
      h: '🏫 تطبيق 2: الحضور والدرجات',
      p: ['السؤال: هل الحضور يؤثر في الدرجات؟ Data science حقيقية: نراجع سجلات الحضور ثم نقارن الدرجات.', 'الدليل متتبّع من السجل حتى الإجابة — وهذا ما يميّزها عن قاعدة البيانات (اللي تخزّن فقط).'],
    },
    {
      h: '🤖 تطبيق 3: تنبؤ الرسوب',
      p: ['نظام يتنبّأ بمين معرّض للرسوب الترم الجاي = Machine Learning.', 'الفرق عن علم البيانات: الناتج «درجة خطر» من غير قصة كاملة (bare score).'],
    },
  ],

  tips: [
    { kw: 'purpose: predict / score', ans: 'Machine Learning', hint: 'كلمات: يتوقع، يتنبّأ، يصنّف حالة جديدة' },
    { kw: 'purpose: store / return', ans: 'Database', hint: 'بوابة، استعلام، إرجاع سجل' },
    { kw: 'purpose: answer a question', ans: 'Data Science', hint: 'يفحص السجلات ويتبع الدليل' },
    { kw: 'what one row represents', ans: 'Unit of Analysis', hint: 'صف واحد = وحدة التحليل، مو المجتمع' },
    { kw: 'skipped a stage', ans: 'Ask', hint: 'الدورة تبدأ بسؤال أبدًا بأداة' },
    { kw: 'no limitations', ans: 'السؤال غير جاهز', hint: 'Limits ready لازم تذكر قيد واحد' },
  ],

  games: [
    {
      h: '🎮 لعبة 3D: رتّب المراحل الخمس',
      p: 'حرّك الكرة بـ WASD أو الماوس ولمس البلورات بالترتيب الصحيح لدورة البيانات.',
      kind: '3d',
      config: JSON.stringify({ mode: 'order', title: 'رتّب دورة البيانات', steps: ['Ask', 'Collect', 'Prepare', 'Analyse', 'Communicate'], ars: ['اسأل', 'اجمع', 'هيّئ', 'حلّل', 'اعرض'] }),
      foot: 'الترتيب الصحيح: Ask ← Collect ← Prepare ← Analyse ← Communicate.',
    },
  ],

  quiz: [
    { q: 'A team wants to answer "Does attendance affect grades?" and checks school records. What is this?', opts: ['Data Science', 'Database', 'Machine Learning', 'Spreadsheet'], a: 0, why: 'الغرض هو الإجابة عن سؤال، والدليل متتبّع من السجل حتى النتيجة — هذا تعريف Data Science.', tag: 'C1', diff: 'سهل' },
    { q: 'A school portal stores grades and shows them to a teacher on request. What is it?', opts: ['Machine Learning', 'Database', 'Data Science', 'Data Cycle'], a: 1, why: 'الغرض تخزين واسترجاع — البيانات تعطيك ما أُدخل فيها فقط.', tag: 'C1', diff: 'سهل' },
    { q: 'A system predicts which students may fail next term. What is it?', opts: ['Database', 'Data Science', 'Machine Learning', 'Readiness Diagnostic'], a: 2, why: 'الغرض التنبؤ بقيمة جديدة، والدليل درجة من غير سياق.', tag: 'C1', diff: 'سهل' },
    { q: 'What distinguishes a Data Science claim from a Machine Learning claim?', opts: ['Data Science simply uses much bigger numbers of rows', 'Data Science traces evidence; ML gives a bare score', 'ML is built without using any real data at all', 'There is no real difference between the two'], a: 1, why: 'الكلمة المفتاحية: traced end to end مقابل bare score.', tag: 'C1', diff: 'متوسط' },
    { q: 'Question: "How many minutes does a Grade 11 student wait in the cafeteria?" What is the Population?', opts: ['Just one individual student', 'One meal at the cafeteria', 'All Grade 11 students this term', 'The total minutes that got counted'], a: 2, why: 'Population = المجموعة الكاملة التي يدور حولها السؤال، وتُحدّد قبل الجمع.', tag: 'C1', diff: 'سهل' },
    { q: 'A table has one row per student per day (30 students × 5 days = 150 rows). What is the Unit of Analysis?', opts: ['The whole school, every grade', 'A single student, all five days', 'One student on one day', 'One complete school week'], a: 2, why: 'الصف الواحد يمثّل طالب-يوم، وهذا غير المجتمع أبدًا.', tag: 'C1', diff: 'متوسط' },
    { q: 'Why is the Unit of Analysis not the same as the Population?', opts: ['The population is always the larger of the two values', 'A row is one unit; the population is all units', 'They are treated as identical in every table', 'The unit changes once the analysis is done'], a: 1, why: 'الصف = وحدة قياس واحدة؛ المجتمع = كل الوحدات.', tag: 'C1', diff: 'متوسط' },
    { q: 'For the variable "daily step count", what is its role and type?', opts: ['Grouping / nominal label', 'Response / quantitative', 'Identifier / free text', 'Explanatory / calendar date'], a: 1, why: 'الخطوات هي ما ن measured (response) وهي رقم (quantitative).', tag: 'C1', diff: 'متوسط' },
    { q: 'How many stages are in the data cycle, and which one starts it?', opts: ['Four, starting at Analyse', 'Five, starting at Ask', 'Three, starting at Collect', 'Six, starting at Communicate'], a: 1, why: 'Ask → Collect → Prepare → Analyse → Communicate، وتبدأ بسؤال أبدًا بأداة.', tag: 'C1', diff: 'سهل' },
    { q: 'A team builds a dashboard first, then looks for a question. Which stage did they skip?', opts: ['Collect', 'Prepare', 'Ask', 'Communicate'], a: 2, why: 'الدورة تبدأ بسؤال — أداة بلا سؤال تخطّت مرحلة Ask.', tag: 'C1', diff: 'متوسط' },
    { q: 'The stage where missing timestamps get removed is:', opts: ['Ask the question', 'Collect the data', 'Prepare data', 'Analyse the results'], a: 2, why: 'التنظيف وحذف الناقص يحدث في Prepare (التهيئة).', tag: 'C1', diff: 'سهل' },
    { q: 'A result like "waiting rose by 3 minutes" must be written with:', opts: ['A single photo of the cafeteria queue', 'A stated limit, e.g. "only 8 days"', 'Nothing at all, just the bare number', 'A password that protects the file'], a: 1, why: 'كل ادّعاء يحمل قيوده معه (every claim carries its limits).', tag: 'C1', diff: 'سهل' },
    { q: 'In the readiness diagnostic, "Question ready" requires:', opts: ['A finished dashboard full of charts', 'Purpose, population, period, outcome', 'At least ten thousand rows of raw data', 'The teacher’s personal approval'], a: 1, why: 'الثلاثة: purpose + population + period + outcome measurable.', tag: 'C1', diff: 'متوسط' },
    { q: 'A table lists "steps" but never names the device or the window. Which "Data ready" element is missing?', opts: ['The source', 'The colours used', 'The student count', 'The school name'], a: 0, why: 'Data ready يحتاج: صف معرّف + دور ووحدة لكل متغيّر + <b>مصدر مسمّى</b>.', tag: 'C1', diff: 'صعب' },
    { q: 'A team writes "there are no limits". Is the question ready?', opts: ['Fully ready, with no further checks needed', 'Not ready: at least one limit is needed', 'Ready if the dataset is large and clean', 'Ready if the teacher agrees with it'], a: 1, why: 'Limits ready تعني كتابة فجوة محدّدة قبل التحليل — دائمًا توجد واحدة.', tag: 'C1', diff: 'متوسط' },
    { q: 'Why is "Is the cafeteria worse this year?" not a ready question?', opts: ['It is far too long for any student', '"Worse" is vague; no population or period', 'It is written in English, not in Arabic', 'It needs more than one person to even ask it'], a: 1, why: 'النتيجة غير قابلة للقياس + لا population ولا period.', tag: 'C1', diff: 'متوسط' },
    { q: 'Step data was collected only from students who own a smartwatch. What is the limit?', opts: ['It describes smartwatch owners only', 'It describes all students in the school', 'There is no real limit to worry about', 'The data is simply wrong overall'], a: 0, why: 'الطلاب بدون ساعة مفقودون، فالاستنتاج ينطبق على tracker owners only.', tag: 'C1', diff: 'صعب' },
    { q: 'Which pairing is correct?', opts: ['Database → quick predictions on demand', 'Machine Learning → storing all the data', 'Data Science → answering a question', 'Data Cycle → a bare score alone'], a: 2, why: 'كل تصنيف يرتبط بغرض واحد فقط: تخزين / تنبؤ / إجابة.', tag: 'C1', diff: 'سهل' },
    { q: 'A system gives every student a risk score with no story behind it. This is:', opts: ['A Database', 'Machine Learning', 'Data Science', 'A Readiness Diagnostic'], a: 1, why: '«درجة خام» (bare score) بصمة Machine Learning.', tag: 'C1', diff: 'متوسط' },
    { q: 'Which variable has a grouping / ID role?', opts: ['Minutes spent waiting', 'Student ID number', 'The final test score', 'The price paid'], a: 1, why: 'المعرّف يجمع الصفوف ولا يُقاس كميًا (grouping/ID role).', tag: 'C1', diff: 'متوسط' },
    { q: 'What is the difference between Collect and Prepare?', opts: ['There is no real difference between them', 'Collect = measure; Prepare = clean and unify', 'Collect happens only after Prepare is finished', 'Prepare happens before the Ask stage'], a: 1, why: 'الجمع من المصدر أولًا، ثم التهيئة (حذف الناقص، توحيد الوحدات).', tag: 'C1', diff: 'متوسط' },
    { q: 'What makes a question "answerable" in the first place?', opts: ['It is written in English, which is what matters', 'A measurable outcome, plus a named population', 'It is a long question with a lot of extra words', 'It contains the word data somewhere in the text'], a: 1, why: 'نتيجة قابلة للقياس + مجتمع محدّد + فترة محدّدة.', tag: 'C1', diff: 'متوسط' },
    { q: 'In the data cycle, Communicate means:', opts: ['Deleting the data so it is truly gone', 'Presenting the result with its limits', 'Storing it in a secure database', 'Training a brand new model from scratch'], a: 1, why: 'العرض يشمل النتيجة + قيودها، وإلا فالادّعاء ناقص.', tag: 'C1', diff: 'سهل' },
    { q: 'A team says: "We’ll collect any data and see what comes out." Which stage is weak?', opts: ['Collect', 'Ask', 'Communicate', 'Prepare'], a: 1, why: 'بدون سؤال محدّد، الجمع عشوائي والتحليل بلا اتجاه.', tag: 'C1', diff: 'صعب' },
    { q: '30 students × 5 days = 150 rows. This expression describes:', opts: ['The population of the whole school', 'The sample size and row count of the unit', 'The total number of variables in the table', 'The number of limits they could find'], a: 1, why: 'الوحدة (طالب-يوم) تتكرر لكل صف: 150 صف = 150 وحدة قياس.', tag: 'C1', diff: 'صعب' },
    { q: 'Which word should worry you if you see it in a "ready" question?', opts: ['a measurable outcome', '"worse" or "better"', 'the target population', 'the unit of analysis'], a: 1, why: 'كلمات مثل «أسوأ» غير قابلة للقياس مباشرة.', tag: 'C1', diff: 'متوسط' },
    { q: 'The correct order of the stages is:', opts: ['Analyse first → Ask → Collect → Prepare → Communicate', 'Ask → Collect → Prepare → Analyse → Communicate', 'Collect → Ask → Prepare → Analyse → Communicate', 'Ask → Prepare → Collect → Analyse → Communicate'], a: 1, why: 'السؤال أولًا، ثم الجمع، ثم التهيئة، ثم التحليل، ثم العرض.', tag: 'C1', diff: 'سهل' },
    { q: 'The role of the "class schedule group" variable in the steps question is:', opts: ['The response value that we measure', 'Explanatory (it groups the classes)', 'A unique identifier for every single row', 'The main unit of measurement here'], a: 1, why: 'الجدول يصنّف (explanatory/label)، والخطوات هي المُقاسة (response).', tag: 'C1', diff: 'صعب' },
    { q: 'Question: "Does sleep affect grades?" — which source must be named for Data ready?', opts: ['The full name of the teacher asking', 'How the sleep hours were recorded', 'The colour of the student’s own bed', 'The number of rooms in the whole school'], a: 1, why: 'Data ready يطلب مصدرًا مسمّى: من قاس وكيف.', tag: 'C1', diff: 'صعب' },
    { q: 'Which sentence expresses "every claim carries its limits"?', opts: ['"The result is always correct, for sure"', '"Up 3 minutes, but logged only 8 days"', '"There are no limits at all here"', '"Numbers never, ever lie at all"'], a: 1, why: 'النتيجة تُعرض مع القيد الذي يحيط بها.', tag: 'C1', diff: 'سهل' },
    { q: 'Why is Machine Learning "not enough" to answer a school question?', opts: ['It needs powerful, costly hardware to run', 'It gives a score with no traced evidence', 'It cannot work with any numbers at all', 'It only works with Arabic language text'], a: 1, why: 'التنبؤ وحده لا يبيّن من أين أتت الأدلة ولا هل السؤال جاهز أصلًا.', tag: 'C1', diff: 'صعب' },
    { q: 'A readiness diagnostic is run:', opts: ['Right after the whole analysis is complete', 'Before the analysis, to check readiness', 'During the final Communicate stage', 'Once every school year, no more'], a: 1, why: 'الغرض من التشخيص: لا تضيّع التحليل على سؤال غير جاهز.', tag: 'C1', diff: 'متوسط' },
  ],
};
