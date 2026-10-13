/* ============================================================
   data-c2.js — Lesson 2: Provenance & Fitness for Purpose
   ============================================================ */
window.LESSON_C2 = {
  id: 'c2',
  title: 'Provenance & Fitness for Purpose',
  titleAr: 'مصدر البيانات والملاءمة للغرض',
  unit: 'Unit 1 · Data Literacy',
  num: 2,
  hook: 'تشتغل ملف «Youth Sports Participation» من بوابة حكومية مفتوحة. يفتح، يطلع أرقام، يبدو رسمي. هل هو رسمي = ينفع لسؤالك؟ لا — ورجع للسؤال: «هل مراهقي المنطقة 3 يحققون مستويات النشاط الموصى بها هذا العام؟»',

  eli5: [
    'تخيّل إنك تشتري ساعة يد مستعملة. الموثوق يقول لك مين البائع، كم رقم الموديل، إذا فيه ضمان، ويسمح لك ترجعها. <b>Provenance</b> هو نفس الشيء للبيانات: سجل يوضّح من أين أتت، مين يملكها، أي إصدار، وأي رخصة.',
    '<b>الملاءمة للغرض (Fitness for Purpose)</b> تعني: هل البيانات تجاوب <b>سؤالك أنت</b>؟ ملف رسمي ممكن يكون ممتاز ومو مناسب. مثال: استبياع 2016 للكبار ما يصف طلاب الصف 11 هذا الترم — ناس غلط، مكان غلط، وقت غلط.',
    'ستة اختبارات (Scope, Currency, Granularity, Comparability, Permitted Use, Coverage) — بعدها تختار فعلًا واحدًا من أربعة: Approve (موافق) · Narrow (ضيّق) · Supplement (كمّل) · Reject (ارفض). وتقول الدليل، وتسمّي موعد إعادة الفحص.',
  ],
  eli52: [
    '<b>Provenance:</b> سجل يربط كل خطوة من رحلة البيانات — المصدر، المالك، سياق الجمع، الإصدار، الرخصة، تاريخ الوصول، والتغييرات — بحيث <b>يقدر أي شخص يعيد إنتاج نفس النتيجة</b>.',
    '<b>Checksum (البصمة الرقمية):</b> سلسلة محسوبة من محتوى الملف. لو تغيّر أي بايت، تغيّرت البصمة — فتثبت إن الملف ما تعبث.',
  ],

  objectives: [
    'نكتب سجل provenance كامل: publisher, owner, context, version, licence, access date, changes, checksum',
    'نبني data dictionary لكل حقل: meaning, type, unit, valid values, blank meaning, sensitivity',
    'نطبّق ستة اختبارات ملاءمة (fitness tests) ثم نختار فعلًا واحدًا مع دليل وموعد مراجعة',
  ],

  sections: [
    {
      id: 'provenance',
      t: 'تتبّع المصدر: من أين أتت البيانات؟',
      blocks: [
        { type: 'p', t: 'رابط وحده ما يكفي أبدًا. لو تقول «نزّلته من الإنترنت»، ما يقدر أحد يتأكد من شيء. سجل Provenance الكامل يحتوي ثمانية عناصر:' },
        {
          type: 'table', head: ['العنصر', 'السؤال', 'مثال'],
          rows: [
            ['Publisher · الناشر', 'من نشر الملف؟', 'National Sports Authority'],
            ['Owner · المالك', 'من يملك البيانات؟', 'وزارة الرياضة'],
            ['Collection context · سياق الجمع', 'لماذا وكيف جُمعت؟', 'استبياع وطني سنوي'],
            ['Version · الإصدار', 'أي نسخة بالضبط؟', 'v3.1 (2024)'],
            ['Licence · الرخصة', 'ما الذي تسمح به؟', 'Open use, non-commercial only'],
            ['Access date · تاريخ الوصول', 'متى نزّلتها؟', '2025-09-01'],
            ['Changes · التغييرات', 'هل عُدّلت؟ ومتى؟', 'سجّل التغييرات v3.1'],
            ['Checksum · البصمة', 'هل الملف سليم؟', 'SHA-256 يطابق'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'لماذا يهمّ هذا؟',
          p: ['هدف واحد: <b>أن يستطيع أي شخص إعادة إنتاج نتيجتك</b> (reproducibility). بدون إصدار أو بصمة، ما يقدر أحد يتأكد إن أرقامك نفسها أرقامه.'],
        },
        {
          type: 'svg', html: `<svg viewBox="0 0 720 200" class="diagram" role="img" aria-label="سلسلة المصدر من الناشر حتى ملفك مع بصمة تتحقق"><defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#57c7d8"/></marker></defs><g font-size="14" text-anchor="middle"><rect x="20" y="60" width="120" height="60" rx="10" fill="#0f2229" stroke="#57c7d8"/><text x="80" y="85" fill="#dff3f7">Publisher</text><text x="80" y="105" fill="#93a0b2" font-size="11">الناشر</text><rect x="180" y="60" width="120" height="60" rx="10" fill="#0f2229" stroke="#8fd3c0"/><text x="240" y="85" fill="#dff3f7">Version</text><text x="240" y="105" fill="#93a0b2" font-size="11">الإصدار</text><rect x="340" y="60" width="120" height="60" rx="10" fill="#0f2229" stroke="#d8b65a"/><text x="400" y="85" fill="#dff3f7">Licence</text><text x="400" y="105" fill="#93a0b2" font-size="11">الرخصة</text><rect x="500" y="60" width="120" height="60" rx="10" fill="#0f2229" stroke="#c79fe8"/><text x="560" y="85" fill="#dff3f7">Checksum</text><text x="560" y="105" fill="#93a0b2" font-size="11">البصمة</text><line x1="140" y1="90" x2="176" y2="90" stroke="#57c7d8" marker-end="url(#ar2)"/><line x1="300" y1="90" x2="336" y2="90" stroke="#57c7d8" marker-end="url(#ar2)"/><line x1="460" y1="90" x2="496" y2="90" stroke="#57c7d8" marker-end="url(#ar2)"/><text x="360" y="165" fill="#93a0b2" font-size="12">reproducible: أي شخص يعيد نفس النتيجة</text></g></svg>`,
        },
      ],
    },
    {
      id: 'dictionary',
      t: 'قاموس البيانات: ماذا يعني كل حقل؟',
      blocks: [
        { type: 'p', t: 'قبل أي تحليل، يجب أن يعرف <b>كل حقل</b> ستة أشياء. القاموس يحوّل الأعمدة المجهولة إلى حقول قابلة للاستخدام.' },
        {
          type: 'steps',
          items: [
            { h: 'Meaning · المعنى', p: 'ماذا يقيس الحقل بالضبط؟', ex: 'activity_type = نوع النشاط الرياضي' },
            { h: 'Type · النوع', p: 'numeric / categorical / date / text.', ex: 'numeric للـ participation_rate' },
            { h: 'Unit · الوحدة', p: 'ما وحدة القياس؟', ex: 'participation_rate = نسبة مئوية (%)' },
            { h: 'Valid values · القيم الصحيحة', p: 'ما المدى أو القائمة المسموحة؟', ex: 'age_group: 5–9, 10–14, 15–19' },
            { h: 'Blank meaning · معنى الفراغ', p: 'هل الفراغ يعني صفرًا أم «غير معروف»؟', ex: 'blank = لم يُجب على السؤال (وليس 0%)' },
            { h: 'Sensitivity · الحساسية', p: 'هل الحقل شخصي أو قابل للتعرف؟', ex: 'رقم الهاتف = حساس' },
          ],
        },
        {
          type: 'callout', kind: 'bad', h: 'الفراغ ليس صفرًا!',
          p: ['<b>Blank ≠ Zero.</b> طالب غائب عن اختبار = فراغ (غير معروف). صفر تعني: حضر واختبار وأجاب صفر. خلط الاثنين يفسد المتوسط.'],
        },
        {
          type: 'table', head: ['الحقل', 'Meaning', 'Type', 'Valid', 'Blank'],
          rows: [
            ['age_group', 'الفئة العمرية', 'categorical', '5-9 / 10-14 / 15-19', 'غير معروف'],
            ['region_code', 'رمز المنطقة', 'categorical', 'R1–R13', 'خطأ في الإدخال'],
            ['participation_rate', 'نسبة المشاركة', 'numeric (%)', '0–100', 'لم يُقاس'],
            ['activity_type', 'نوع النشاط', 'coded 1–5', 'غير موثّق!', 'غير معروف'],
          ],
        },
        {
          type: 'callout', kind: 'warn', h: 'مشكلة الكود غير الموثّق',
          p: ['حقل <b>activity_type</b> مرمّز 1–5 بدون كتاب تفسّر الأرقام. النتيجة: الحقل <b>لا يمكن استخدامه كما هو</b> — تحتاج codebook أو تكميل.'],
        },
      ],
    },
    {
      id: 'fitness',
      t: 'ستة اختبارات للملاءمة (Fitness Tests)',
      blocks: [
        { type: 'p', t: 'الملاءمة تحكم دائمًا <b>على سؤالك أنت</b>، أبدًا بشكل عام. ستة اختبارات:' },
        {
          type: 'cards', cols: 3,
          items: [
            { h: '1 · Scope · النطاق', body: ['هل تغطي البيانات الأشخاص والمكان والفترة <b>الذين يسأل عنهم سؤالي</b>؟', 'مثال: استبياع 2016 للكبار يفشل لطلاب 2025'] },
            { h: '2 · Currency · الحداثة', body: ['هل البيانات حديثة بما يكفي لسؤالي؟', 'مثال: بيانات 2016 لا تصف عادات 2025'] },
            { h: '3 · Granularity · التفصيل', body: ['هل الصف الواحد دقيق بما يكفي؟', 'مثال: معدل شهري لا يجاوب عن «أي ساعة الذروة»'] },
            { h: '4 · Comparability · المقارنة', body: ['هل قِيست المجموعات بنفس الطريقة؟', 'مثال: مدرستان بطرق جمع مختلفتين غير قابلتين للمقارنة'] },
            { h: '5 · Permitted Use · الاستخدام', body: ['هل تسمح الرخصة بهذا الاستخدام؟', 'مثال: بيانات شخصية بدون موافقة = استخدام مرفوض'] },
            { h: '6 · Coverage · التغطية', body: ['هل يوجد فجوة حيث يفوت الإطار جزءًا من المجتمع؟', 'مثال: مدارس خاصة غير مشمولة'] },
          ],
        },
        {
          type: 'callout', kind: 'good', h: 'مثال محلول: استبياع 2016 للكبار لطلاب الصف 11',
          p: ['<b>Scope</b> فشل: ناس غلط (كبار، طلاب)، مكان غلط، فترة غلط (2016 بدل هذا الترم). <b>الإجراء:</b> reject — أو أعد صياغة السؤال ليناسب الكبار.'],
        },
        { type: 'svg', html: `<svg viewBox="0 0 720 250" class="diagram" role="img" aria-label="سؤالك في الوسط، وستة اختبارات ملاءمة حوله — أي فشل يعني رفض البيانات"><g font-size="12" text-anchor="middle"><rect x="270" y="98" width="180" height="54" rx="12" fill="#1d3a44" stroke="#57c7d8" stroke-width="2"/><text x="360" y="120" fill="#dff3f7" font-weight="700">سؤالك</text><text x="360" y="138" fill="#9fb8c0" font-size="11">هل تصلح هذه البيانات؟</text><g font-weight="700"><rect x="40" y="26" width="150" height="40" rx="20" fill="none" stroke="#8fd3c0" stroke-width="2"/><text x="115" y="51" fill="#8fd3c0">1 Scope · النطاق</text><rect x="530" y="26" width="150" height="40" rx="20" fill="none" stroke="#d8b65a" stroke-width="2"/><text x="605" y="51" fill="#d8b65a">2 Currency · الحداثة</text><rect x="20" y="186" width="160" height="40" rx="20" fill="none" stroke="#c792ea" stroke-width="2"/><text x="100" y="211" fill="#c792ea">3 Granularity</text><rect x="260" y="200" width="200" height="36" rx="18" fill="none" stroke="#e76f7b" stroke-width="2"/><text x="360" y="223" fill="#e76f7b">4 Comparability · المقارنة</text><rect x="540" y="186" width="160" height="40" rx="20" fill="none" stroke="#5fcf80" stroke-width="2"/><text x="620" y="211" fill="#5fcf80">5 Permitted Use</text><rect x="540" y="96" width="150" height="40" rx="20" fill="none" stroke="#e0a458" stroke-width="2"/><text x="615" y="121" fill="#e0a458">6 Coverage</text></g><g stroke="#3a5a68" stroke-width="1.5" fill="none" stroke-dasharray="4 4"><line x1="190" y1="60" x2="290" y2="100"/><line x1="530" y1="60" x2="430" y2="100"/><line x1="180" y1="196" x2="280" y2="150"/><line x1="300" y1="200" x2="340" y2="154"/><line x1="540" y1="196" x2="440" y2="150"/><line x1="540" y1="116" x2="452" y2="122"/></g><text x="360" y="245" fill="#9fb8c0" font-size="11">أي دائرة تفشل ⟹ reject أو أعد صياغة السؤال (ما تعدّل البيانات)</text></g></svg>` },
        { type: 'svg', html: `<svg viewBox="0 0 720 190" class="diagram" role="img" aria-label="الملاءمة: قارن البيانات بسؤالك عبر ستة اختبارات"><g font-size="14" text-anchor="middle"><circle cx="150" cy="100" r="62" fill="none" stroke="#d8b65a" stroke-width="2" stroke-dasharray="6 5"/><text x="150" y="95" fill="#d8b65a">سؤالك</text><text x="150" y="115" fill="#93a0b2" font-size="11">place + people + time</text><circle cx="570" cy="100" r="62" fill="#0f2229" stroke="#57c7d8" stroke-width="2"/><text x="570" y="95" fill="#57c7d8">البيانات</text><text x="570" y="115" fill="#93a0b2" font-size="11">الملف وأصفاره</text><g font-size="12" fill="#8fd3c0"><text x="360" y="55">Scope · Currency · Granularity</text><text x="360" y="80">Comparability · Permitted · Coverage</text></g><text x="360" y="150" fill="#93a0b2" font-size="12">ستة اختبارات بين السؤال والبيانات</text></g></svg>` },
      ],
    },
    {
      id: 'decision',
      t: 'اتخذ القرار: Approve · Narrow · Supplement · Reject',
      blocks: [
        { type: 'p', t: 'بعد الاختبارات الستة، تختار <b>فعلًا واحدًا</b> — محكومًا بسؤالك، أبدًا بشكل عام. وكل قرار يحتاج ثلاثة أجزاء:' },
        {
          type: 'cards', cols: 2,
          items: [
            { h: '✅ Approve · موافق', body: ['البيانات تجاوزت كل الاختبارات لسؤالك.', 'مثال: ملف حديث، نفس الفئة، رخصة مسموحة'] },
            { h: '🎯 Narrow · ضيّق', body: ['استخدم البيانات لجزء فقط من سؤالك، وقل ذلك في كل ادّعاء.', 'مثال: استخدمها للمدارس الحكومية فقط'] },
            { h: '➕ Supplement · كمّل', body: ['أضف بيانات أخرى تغطي النقص.', 'مثال: متوسطات شهرية لا تجاوب عن الساعة → أضف بيانات يومية'] },
            { h: '⛔ Reject · ارفض', body: ['فشل جوهري (scope أو permission) لا يُصلح.', 'مثال: بيانات شخصية بدون موافقة'] },
          ],
        },
        {
          type: 'kv',
          items: [
            ['State the Evidence · اذكر الدليل', 'سمِّ كل اختبار نجح أو فشل، والحقيقة في الملف التي تثبته. مثال: «Scope يفشل: ملاحظات الملف تقول المدارس الحكومية فقط».'],
            ['Set a Review Trigger · موعد المراجعة', 'سمِّ الحدث الذي يفرض إعادة الفحص: إصدار جديد، تغيّر الرخصة، أو سؤال جديد. مثال: «راجع عندما يصدر codebook أو تتغيّر الرخصة».'],
          ],
        },
        {
          type: 'callout', kind: 'good', h: 'حل الـ Capstone: Youth Sports Participation',
          p: ['السؤال: «هل مراهقي المنطقة 3 يحققون مستويات النشاط الموصى بها هذا العام؟»', '<b>Trace:</b> الناشر معروف، لكن لا إصدار ولا بصمة، والمنهج مذكور فقط «استبياع وطني»، والرخصة «استخدام مفتوح غير تجاري».', '<b>Define:</b> activity_type مرمّز 1–5 بدون توثيق → الحقل غير قابل للاستخدام كما هو.', '<b>Judge:</b> Narrow — participation_rate ≠ activity level. والمراجعة عند نشر codebook.'],
        },
      ],
    },
  ],

  glossary: [
    { en: 'Provenance', ar: 'مصدر البيانات', def: 'سجل يوضّح من أين أتت البيانات، حتى يستطيع أي شخص إعادة إنتاج النتيجة.' },
    { en: 'Source Chain', ar: 'سلسلة المصدر', def: 'الناشر، الإصدار، والرخصة — عناصر المصدر الأساسية.' },
    { en: 'Collection Context', ar: 'سياق الجمع', def: 'لماذا وكيف جُمعت البيانات.' },
    { en: 'Data Dictionary', ar: 'قاموس البيانات', def: 'تعريف مكتوب لكل حقل: معناه، نوعه، وحدته، قيمه الصحيحة، ومعنى الفراغ.' },
    { en: 'Fitness for Purpose', ar: 'الملاءمة للغرض', def: 'هل تلائم البيانات سؤالي تحديدًا (وليس بشكل عام).' },
    { en: 'Granularity', ar: 'مستوى التفصيل', def: 'مدى دقة ما يمثّله الصف الواحد.' },
    { en: 'Currency', ar: 'حداثة البيانات', def: 'مدى حداثة البيانات بالنسبة لسؤالك.' },
    { en: 'Permitted Use', ar: 'الاستخدام المسموح', def: 'ما تسمح به رخصة البيانات.' },
    { en: 'Checksum', ar: 'البصمة الرقمية', def: 'رمز يثبت أن الملف لم يتغيّر.' },
    { en: 'Review Trigger', ar: 'محفّز المراجعة', def: 'الحدث الذي يستدعي إعادة فحص القرار.' },
  ],

  apps: [
    {
      h: '🏥 تطبيق 1: بيانات المستشفى',
      p: ['ملف من مستشفى فيه متوسط شهري لكل قسم. سؤالك: أي ساعة الذروة في الطوارئ؟', 'النتيجة: Granularity تفشل — صف شهري لا يجاوب عن سؤال ساعي. الإجراء: Supplement (أضف بيانات بالساعة).'],
    },
    {
      h: '🏫 تطبيق 2: استبياع الطلاب',
      p: ['استبياع وطني للكبار سنة 2016، تريد وصف طلاب الصف 11 هذا الترم.', 'Scope فاشل من ثلاث جهات (ناس، مكان، فترة). الإجراء: Reject أو أعد صياغة السؤال ليناسب الكبار.'],
    },
    {
      h: '⌚ تطبيق 3: بيانات الساعات الذكية',
      p: ['نسخ معلم بيانات صحة الطلاب من ساعاتهم في مشروع صف بدون استئذان.', 'Permitted Use تفشل: بيانات شخصية بدون موافقة. الإجراء: Reject — أو اطلب الموافقة أولًا.'],
    },
  ],

  tips: [
    { kw: 'anyone can reproduce / إعادة الإنتاج', ans: 'Provenance', hint: 'سجل المصدر كامل' },
    { kw: 'blank vs zero / فراغ', ans: 'الفراغ = غير معروف، ليس صفرًا', hint: 'غائب ≠ درجة صفر' },
    { kw: 'wrong people / wrong period', ans: 'Scope', hint: 'استبياع 2016 للكبار لطلاب 2025' },
    { kw: 'how recent / قديمة', ans: 'Currency', hint: 'الحداثة بالنسبة لسؤالك' },
    { kw: 'one row too coarse / متوسط شهري لسؤال ساعي', ans: 'Granularity', hint: 'مدى دقة الصف' },
    { kw: 'measured the same way / بنفس الطريقة', ans: 'Comparability', hint: 'مجموعتان بطرق جمع مختلفتين' },
    { kw: 'licence / consent / موافقة', ans: 'Permitted Use', hint: 'ما تسمح به الرخصة' },
    { kw: 'part of population missing / فجوة', ans: 'Coverage', hint: 'الإطار يفوته جزء' },
    { kw: 'use it for a subset only / جزء فقط', ans: 'Narrow', hint: 'وقوله في كل ادّعاء' },
    { kw: 'add more data / أضف بيانات', ans: 'Supplement', hint: 'تغطية النقص' },
    { kw: 'when to re-check / أعد الفحص', ans: 'Review Trigger', hint: 'إصدار جديد أو رخصة تغيّرت' },
  ],

  games: [
    {
      h: '🎮 لعبة 3D: صنف حقائق المصدر',
      p: 'أشياء تثبت أن المصدر موثّق (خضرا) مقابل أشياء ناقصة (حمرا). التقط الأخضر فقط!',
      kind: '3d',
      config: JSON.stringify({
        mode: 'sort', title: 'مصدر موثّق؟', time: 45,
        good: [['version 3.2', 'إصدار', 1], ['SHA-256', 'بصمة', 1], ['licence: open', 'رخصة', 1], ['owner named', 'مالك', 1], ['method noted', 'المنهج', 1]],
        bad: [['no version', 'بدون إصدار', 30], ['no licence', 'بدون رخصة', 30], ['unknown owner', 'مالك مجهول', 30], ['codes 1-5?', 'أكواد غامضة', 30], ['bare link', 'رابط وحده', 30]],
      }),
      foot: 'الأخضر = عنصر مصدر موجود · الأحمر = ثغرة تمنع إعادة الإنتاج.',
    },
  ],

  quiz: [
    { q: 'What is the main goal of a full Provenance record?', opts: ['To make the file look more official', 'So anyone can reproduce your work', 'To make the file much larger', 'To hide where the data came from'], a: 1, why: 'الإمكانية لإعادة الإنتاج (reproducibility) هي الجوهر: بدون إصدار أو بصمة لا أحد يتأكد.', tag: 'C2', diff: 'سهل' },
    { q: 'Which two of the eight Provenance elements are most often missing?', opts: ['Publisher and Owner', 'Version and Checksum', 'Colour scheme and fonts', 'Rows and columns listed'], a: 1, why: 'الإصدار والبصمة هما اللذان يضمنان أن الملف نفسه — لكنهما نادران في الروابط العارية.', tag: 'C2', diff: 'متوسط' },
    { q: 'What does a Checksum prove?', opts: ['That the file is unchanged', 'That the file is the official one', 'That the file is really large', 'That the file is free of cost'], a: 0, why: 'الصمة محسوبة من المحتوى؛ أي تغيير يغيّرها.', tag: 'C2', diff: 'سهل' },
    { q: 'A bare link versus a full provenance record — which statement is right?', opts: ['A bare link is always enough', 'A link alone verifies nothing', 'There is really no difference', 'The record replaces the data itself'], a: 1, why: 'السجل الكامل يربط كل خطوة، والرابط وحده مجرد عنوان.', tag: 'C2', diff: 'متوسط' },
    { q: 'A dictionary field is typed numeric with unit %. What else makes it complete?', opts: ['The colour scheme used for this table', 'Valid values, blank meaning, sensitivity', 'The total number of rows in the file', 'The name of the agency that published the file'], a: 1, why: 'ستة عناصر: meaning, type, unit, valid values, blank meaning, sensitivity.', tag: 'C2', diff: 'متوسط' },
    { q: 'Why is a blank not the same as zero?', opts: ['Because zero is bigger than a blank', 'A blank is unknown; zero is measured', 'Because a blank is always a data error', 'There is no difference between them'], a: 1, why: 'غاب عن الاختبار (مجهول) ≠ حضر وأجاب صفر. الخلط يفسد المتوسط.', tag: 'C2', diff: 'متوسط' },
    { q: 'A field "activity_type" is coded 1–5 with no book explaining the codes. What is the verdict?', opts: ['Use it as it currently stands', 'It is unusable without a codebook', 'Delete the whole file and start again', 'Replace it with a new checksum'], a: 1, why: 'قيم غير موثّقة = معنى مجهول = لا يمكن تفسير النتيجة.', tag: 'C2', diff: 'صعب' },
    { q: 'What does Sensitivity mean in a data dictionary?', opts: ['The precision of each measurement', 'Whether it is personal or identifying', 'How fast the field gets refreshed', 'The number of distinct values in the field'], a: 1, why: 'الحساسية: هل البيانات شخصية (رقم هاتف، صحة) فتحتاج حماية.', tag: 'C2', diff: 'متوسط' },
    { q: 'A 2016 national adult survey is used to describe Grade 11 students this term. Which test fails?', opts: ['Granularity', 'Scope', 'Checksum', 'Comparability'], a: 1, why: 'ناس غلط، مكان غلط، فترة غلط — كلها تحت Scope.', tag: 'C2', diff: 'سهل' },
    { q: 'A file gives one monthly average, but your question is "which hour of the day is busiest". Which test fails?', opts: ['Scope', 'Currency', 'Granularity', 'Permitted Use'], a: 2, why: 'الصف الشهري غير دقيق بما يكفي لسؤال ساعي.', tag: 'C2', diff: 'متوسط' },
    { q: 'Smartwatch hours from pupils were copied into a project without permission. Which test fails?', opts: ['Permitted Use', 'Granularity of the rows', 'Currency of the data', 'Scope of the data'], a: 0, why: 'الاستخدام غير مسموح: بيانات شخصية بدون موافقة.', tag: 'C2', diff: 'سهل' },
    { q: 'Two groups were measured in completely different ways. Which test fails?', opts: ['Coverage of the sample', 'Comparability', 'Currency of the data', 'Scope of the dataset'], a: 1, why: 'المقارنة تتطلب نفس طريقة القياس.', tag: 'C2', diff: 'متوسط' },
    { q: 'A frame covers state schools only; the population is all schools. Which test fails?', opts: ['Coverage', 'Granularity', 'Permitted Use', 'Checksum'], a: 0, why: 'فجوة: جزء من المجتمع مفقود = coverage bias.', tag: 'C2', diff: 'متوسط' },
    { q: 'Data from 2019 used for a question about 2025 habits. Which test fails?', opts: ['Scope', 'Currency', 'Comparability', 'Coverage'], a: 1, why: 'الحداثة: البيانات قديمة بالنسبة للسؤال.', tag: 'C2', diff: 'سهل' },
    { q: 'How many fitness tests are there?', opts: ['Four', 'Five', 'Six', 'Eight'], a: 2, why: 'ستة اختبارات: Scope و Currency و Granularity و Comparability و Permitted Use و Coverage.', tag: 'C2', diff: 'سهل' },
    { q: 'After a Granularity failure (monthly averages for an hourly question), which action fits best?', opts: ['Reject the file', 'Narrow the claim', 'Supplement', 'Approve the file'], a: 2, why: 'أضف بيانات أدق تغطي النقص! هذا تعريف Supplement.', tag: 'C2', diff: 'متوسط' },
    { q: 'You use a state-schools-only file and say so in every claim. What is the action?', opts: ['Narrow', 'Supplement', 'Reject', 'Approve'], a: 0, why: 'تضييق النطاق لجزء مغطى مع الإفصاح = Narrow.', tag: 'C2', diff: 'متوسط' },
    { q: 'A file fails Permitted Use (no consent). What is the right action?', opts: ['Approve it anyway', 'Narrow it to a subset', 'Supplement it with consent', 'Reject, or get consent'], a: 3, why: 'الاستخدام غير المسموح فشل جوهري لا يُصلح بالتكميل.', tag: 'C2', diff: 'متوسط' },
    { q: 'What must "State the Evidence" include?', opts: ['Your personal opinion about the whole dataset', 'Each test that passed or failed, and why', 'A picture of the file with clear labels', 'The number of rows in the whole file'], a: 1, why: 'الدليل = الحقيقة في الملف (مثل: «الملاحظات تقول حكومي فقط»).', tag: 'C2', diff: 'متوسط' },
    { q: 'Which is a correct Review Trigger?', opts: ['"Review whenever you remember to do so"', '"Review when a codebook or licence changes"', '"Review when all the typos are fixed"', '"Review only when somebody complains about it"'], a: 1, why: 'الحدث المحدد: إصدار جديد، تغيّر رخصة، أو سؤال جديد.', tag: 'C2', diff: 'متوسط' },
    { q: 'In the Capstone, why is participation_rate not enough to answer "recommended activity level"?', opts: ['Because it is outdated and covers the wrong years', 'Because participation is not an activity level', 'Because it is stored as plain text only', 'Because it has no unit of measurement at all'], a: 1, why: 'الملاءمة مفهومية: participation ≠ activity level، فهذا Narrow.', tag: 'C2', diff: 'صعب' },
    { q: '"The data is official, so it is fit." This sentence is:', opts: ['Always true for official sources', 'False — official does not mean fit', 'Sometimes true, depending on the case', 'Depends on the size of the file'], a: 1, why: 'Trustworthy ≠ fit. موثوق من الناشر، ملائم لسؤالك.', tag: 'C2', diff: 'صعب' },
    { q: 'Which element-to-question pairing is correct?', opts: ['Owner → which file version?', 'Version → who owns the data?', 'Licence → what is allowed?', 'Checksum → when did you download?'], a: 2, why: 'كل عنصر يجاوب سؤالًا واحدًا محددًا.', tag: 'C2', diff: 'سهل' },
    { q: 'An access date matters because:', opts: ['Files change; the version pins yours', 'It controls the size of the downloaded file', 'It gives the file its colour scheme', 'It never matters for the analysis'], a: 0, why: 'بدون إصدار وتاريخ، قد يكون ملف زميلك مختلفًا عن ملفك.', tag: 'C2', diff: 'صعب' },
    { q: 'In the data dictionary, the type of "region code" (R1–R13) is:', opts: ['numeric (a number)', 'categorical', 'date (a calendar day)', 'free text (words)'], a: 1, why: 'قيم من قائمة محدودة = categorical.', tag: 'C2', diff: 'متوسط' },
    { q: 'What separates Narrow from Supplement?', opts: ['Narrow adds data, and Supplement restricts it', 'Narrow uses a part; Supplement adds data', 'There is no real difference between them', 'Narrow rejects the whole file outright'], a: 1, why: 'الضييق = استخدم ما يصح وصرّح؛ التكميل = غطّ النقص بمصدر آخر.', tag: 'C2', diff: 'صعب' },
    { q: 'If only the Scope test fails, is Reject always required?', opts: ['Yes, always, without exception', 'No — you may reframe the question', 'Yes, if the file is large enough for it', 'It does not matter either way'], a: 1, why: 'الحل البديل: أعد صياغة السؤال ليناسب نطاق البيانات.', tag: 'C2', diff: 'صعب' },
    { q: 'Which scenario fails two tests at once?', opts: ['2016 adult data, no personal-use licence', 'Recent, licensed data that fits your question', 'Data measured the same way in both groups', 'A file with a valid checksum attached'], a: 0, why: 'Scope (ناس/فترة! + Permitted Use معًا.', tag: 'C2', diff: 'صعب' },
    { q: 'What does a Provenance record link from start to end?', opts: ['Only the colours used in the report', 'Every step of the data journey', 'The number of lines in the file', 'The name of the source site'], a: 1, why: 'المصدر → المالك → الجمع → الإصدار → الرخصة → التغييرات → البصمة.', tag: 'C2', diff: 'متوسط' },
    { q: 'Name the test: "Were the groups measured the same way?"', opts: ['Coverage of the sample', 'Comparability', 'Currency of the data', 'Scope of the dataset'], a: 1, why: 'مقارنة عادلة تتطلب نفس طريقة القياس.', tag: 'C2', diff: 'سهل' },
    { q: 'Name the test: "Is one row detailed enough for my question?"', opts: ['Granularity', 'Permitted Use', 'Comparability', 'Currency'], a: 0, why: 'مدى دقة الصف = granularity.', tag: 'C2', diff: 'سهل' },
    { q: 'What makes a decision "governed by your question"?', opts: ['It is written in clear English', 'It is judged on your own question', 'It is reached as fast as possible', 'It follows the opinion of the majority'], a: 1, why: 'الملاءمة دائمًا نسبة لسؤال محدد.', tag: 'C2', diff: 'متوسط' },
  ],
};
