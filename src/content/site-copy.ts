/**
 * Unified Bilingual Content Dictionary
 * File: src/content/site-copy.ts
 *
 * Strict single-source-of-truth for all Arabic (RTL) and English (LTR) copy,
 * curricula, tool metadata, testimonials, and value stack details.
 */

export interface RoadmapTool {
  name: string;
  badge: string;
  color: string;
}

export interface RoadmapStageData {
  id: string;
  index: number;
  timecode: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tools: RoadmapTool[];
  milestones: string[];
  metric: { label: string; value: string };
}

export interface NotionPillarStep {
  id: string;
  stepNumber: number;
  title: string;
  tag: string;
  done: boolean;
}

export interface NotionPillar {
  id: string;
  pillarNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  quote: string;
  description: string;
  stepsCountBadge: string;
  icon: string;
  color: string;
  steps: NotionPillarStep[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  role: string;
  badge: string;
  quote: string;
  voiceCaption: string;
  /**
   * Real MP3 asset path in public/ (e.g. '/audio/review-1.mp3').
   * Left empty "" by default to prevent 404 network errors and trigger the built-in
   * Web Audio API studio tone & waveform playback simulation.
   */
  audioSrc?: string;
  audioUrl?: string; // backwards-compatible alias
  durationSeconds: number;
  waveformBars: number[];
  row?: 1 | 2;
}

export interface ValueStackItem {
  id: string;
  title: string;
  description: string;
  value: string;
  isBonus?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteDictionary {
  brand: {
    name: string;
    tagline: string;
    ctaButton: string;
    exploreButton: string;
    lifetimeBadge: string;
    guaranteeText: string;
  };
  navbar: {
    roadmap: string;
    curriculum: string;
    stack: string;
    wall: string;
    pricing: string;
    faq: string;
    cta: string;
    switchLang: string;
    switchTheme: string;
  };
  hero: {
    pillBadge: string;
    eyebrow: string;
    headline: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proofCount: string;
    proofSubtext: string;
    scrubHint: string;
    timelineHeader: string;
    currentTimeLabel: string;
  };
  stages: RoadmapStageData[];
  bento: {
    badge: string;
    title: string;
    subtitle: string;
    notionCard: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      hint: string;
      sidePeekHeader: string;
      actionableModulesLabel: string;
      syncStatusText: string;
      pillars: NotionPillar[];
      tasks: Array<{ id: string; text: string; done: boolean; tag: string }>;
    };
    stackCard: {
      badge: string;
      title: string;
      description: string;
      status: string;
      pipelineNodes: Array<{ name: string; role: string; badge: string; color: string }>;
    };
    blueprintCard: {
      badge: string;
      title: string;
      description: string;
      features: string[];
      calculatorValue: string;
      calculatorLabel: string;
    };
  };
  editorsWall: {
    badge: string;
    title: string;
    subtitle: string;
    hoverNotice: string;
    prevButton: string;
    nextButton: string;
    voiceNoteBadge: string;
    testimonials: TestimonialItem[];
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    tierName: string;
    tierSubtitle: string;
    launchPrice: string;
    originalPrice: string;
    discountBadge: string;
    period: string;
    ctaButton: string;
    guaranteeBadge: string;
    guaranteeDetails: string;
    stackHeader: string;
    totalValueLabel: string;
    totalValue: string;
    includedBadge: string;
    bonusBadge: string;
    items: ValueStackItem[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    helpNotice: string;
    contactButton: string;
    items: FAQItem[];
  };
  modal: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    receiptLabel: string;
    receiptUploadBtn: string;
    receiptAttached: string;
    receiptHint: string;
    removeReceipt: string;
    experienceLabel: string;
    experienceOptions: {
      beginner: string;
      intermediate: string;
      freelancer: string;
    };
    paymentNote: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    orderIdLabel: string;
    orderDeliveryNotice: string;
    closeButton: string;
    validationErrors: {
      nameRequired: string;
      emailRequired: string;
      phoneRequired: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
    builtFor: string;
    privacy: string;
    terms: string;
    quickLinksTitle: string;
    socialTitle: string;
    legalTitle: string;
    refundGuarantee: string;
    allRights: string;
    backToTop: string;
    links: Array<{ label: string; href: string }>;
  };
}

export const siteCopy: Record<'ar' | 'en', SiteDictionary> = {
  ar: {
    brand: {
      name: 'CineFlow Notion Roadmap',
      tagline: 'من الصفر لحد ما تقبض من أول عميل فيديو مونتاج',
      ctaButton: 'احجز نسختك من الخارطة دلوقتي',
      exploreButton: 'استكشف محاور المنهج',
      lifetimeBadge: 'وصول دائم لمدى الحياة + كل التحديثات الجاية مجاناً',
      guaranteeText: 'ضمان دهبي 30 يوم ترجع فلوسك كاملة لو ما استفدتش',
    },
    navbar: {
      roadmap: 'نظرة عامة',
      curriculum: 'التايم لاين العملي',
      stack: 'العدة والأدوات',
      wall: 'تجارب الشباب',
      pricing: 'سعر الباقة',
      faq: 'الأسئلة الشائعة',
      cta: 'ابدأ دلوقتي',
      switchLang: 'English',
      switchTheme: 'تبديل المظهر',
    },
    hero: {
      pillBadge: 'خريطة طريق 2026 لمونتير الفيديو المحترف',
      eyebrow: 'خريطة طريق 2026 لمونتير الفيديو المحترف',
      headline: 'حوّل شغفك بالمونتاج إلى مهارة تفتحلك فرص حقيقية',
      headlinePart1: 'حوّل شغفك بالمونتاج إلى',
      headlineHighlight: 'مهارة تفتحلك فرص حقيقية',
      headlinePart2: '',
      subheadline:
        'اتعلم المونتاج بأسلوب عملي، وابني مهاراتك خطوة بخطوة عشان تبدأ رحلتك في عالم صناعة الفيديو.',
      description:
        'اتعلم المونتاج بأسلوب عملي، وابني مهاراتك خطوة بخطوة عشان تبدأ رحلتك في عالم صناعة الفيديو.',
      ctaPrimary: 'احجز خريطة الطريق دلوقتي',
      ctaSecondary: 'جرّب التايم لاين التفاعلي',
      proofCount: '1,420+ مونتير',
      proofSubtext: 'دخلوا المسار وبدأوا يقفلوا عملاء محليين وبرة مصر',
      scrubHint: 'حرّك مؤشر التايم لاين بالماوس أو التاتش واستكشف مراحل الكورس الأربعة',
      timelineHeader: 'التايم لاين العملي للمنهج',
      currentTimeLabel: 'الوقت المقطوع في المنهج',
    },
    stages: [
      {
        id: 'stage-1',
        index: 0,
        timecode: '00:00:15:00',
        badge: 'المحور الأول: Premiere Pro',
        title: 'المحور الأول: احتراف Premiere Pro',
        subtitle: 'القص السريع، ضبط الصوت، وتلوين الفيديو بجد',
        description:
          'هنعلمك الزتونة والمسار الواضح من الآخر؛ إزاي تقص بسرعة، تظبط الصوت، وتلون عشان تطلع فيديو نضيف واحترافي من أول يوم وتدخل في الجد فوراً.',
        tools: [{ name: 'Premiere Pro', badge: 'Pr', color: '#5D5FEF' }],
        milestones: [
          'المحطة 1: إتقان التقطيع السريع، ضبط هندسة الصوت، وتلوين Lumetri الاحترافي',
          'تظبيط مساحات العمل واختصارات الكيبورد اللي هتسرّع قصك 3 أضعاف',
          'تكنيكات المزامنة الصوتية (J & L Cuts) وبناء الـ Pacing اللي يشد الودن',
        ],
        metric: { label: 'سرعة التقطيع والإنجاز', value: '3 أضعاف أسرع' },
      },
      {
        id: 'stage-2',
        index: 1,
        timecode: '00:00:30:00',
        badge: 'المحور الثاني: After Effects',
        title: 'المحور الثاني: إبداع After Effects والموشن',
        subtitle: 'موشن جرافيكس، كتابة حركية، وتأثيرات بصرية تخطف العين',
        description:
          'هتعرف إزاي تضيف موشن جرافيكس وكابشنز احترافية ومؤثرات تحول أي فيديو لقطعة فنية تجبر المشاهد يفضل مسمر قدام الشاشة لآخر ثانية.',
        tools: [{ name: 'After Effects', badge: 'Ae', color: '#8B5CF6' }],
        milestones: [
          'المحطة 2: إضافة موشن جرافيكس، كابشنز سينمائية، ومؤثرات بصرية مبهرة',
          'إتقان منحنيات السرعة (Speed Graph) عشان تطلع حركات ناعمة ومن غير كلكعة',
          'بناء مكتبة تمبلتس وقوالب MOGRTs وتأثيرات الـ Hooks عشان متضيعش وقتك كل مرة',
        ],
        metric: { label: 'نسبة بقاء المشاهد (Retention)', value: '+68% مشاهدة كاملة' },
      },
      {
        id: 'stage-3',
        index: 2,
        timecode: '00:00:45:00',
        badge: 'المحور الثالث: صناعة الريلز',
        title: 'المحور الثالث: صناعة الريلز والشوريل القوي',
        subtitle: 'أسرار الهوك، التغذية البصرية، وبورتفوليو يقفل الصفقات',
        description:
          'هتتعلم سر الـ 3 ثواني الأولى اللي بتمنع الـ Scroll، وإزاي تعمل تغذية بصرية تميز ستايلك، وصولاً لبناء بورتفوليو وشوريل مقنع يخلي أي صانع محتوى يشتغل معاك فوراً.',
        tools: [
          { name: 'Reels Studio', badge: 'Reels', color: '#0EA5E9' },
          { name: 'Showreel OS', badge: 'Port', color: '#6366F1' },
        ],
        milestones: [
          'المحطة 3: أساسيات صناعة الريلز ومعادلة أول 3 ثواني (Hook Formula)',
          'المحطة 4: أسرار التغذية البصرية اليومية وبناء ستايل بصري فريد يميزك عن غيرك',
          'المحطة 5: بناء بورتفوليو وشوريل 45 ثانية مقنع يقفل أي ديل من أول قعدة',
        ],
        metric: { label: 'معدل إقناع العملاء بالشوريل', value: '4.8x تحويل أعلى' },
      },
      {
        id: 'stage-4',
        index: 3,
        timecode: '00:01:00:00',
        badge: 'المحور الرابع: صيد العملاء والـ AI',
        title: 'المحور الرابع: اقتناص العملاء وأدوات الذكاء الاصطناعي',
        subtitle: 'استراتيجيتين لجلب أول عميل مدفوع وكنز أدوات الذكاء الاصطناعي',
        description:
          'استراتيجيتين متجربين في السوق المصري والخليجي عشان تجيب أول عميل وتثبت معاه عقود شهرية (Retainers)، زائد كنز أدوات الذكاء الاصطناعي اللي هيخلص شغلك في نص الوقت.',
        tools: [
          { name: 'صيد العملاء', badge: 'ج.م', color: '#10B981' },
          { name: 'أدوات الـ AI', badge: 'AI', color: '#0EA5E9' },
        ],
        milestones: [
          'المحطة 6: استراتيجية صيد العميل الأول بصيغ رسايل حقيقية بتجيب ردود فورية',
          'المحطة 7: تحويل العملاء لعقود شهرية ثابتة (Retainers) تضمنلك دخل شهري مستقر',
          'المحطة 8: كنز أدوات الذكاء الاصطناعي لرفع كفاءتك وتوفير 70% من وقت المونتاج',
        ],
        metric: { label: 'أول عقد شهري متوقع', value: '15,000 - 35,000 ج.م' },
      },
    ],
    bento: {
      badge: 'نظام Notion المتكامل',
      title: 'كل اللي محتاجه عشان تقلب المونتاج لبيزنس حقيقي',
      subtitle: 'جمعنالك كل حاجة في مكان واحد منظم: الشروحات، القوالب، نماذج العقود، وقوائم المتابعة التفاعلية.',
      notionCard: {
        badge: 'مساحة عمل Notion',
        title: 'خطة الـ 30 يوم: 4 محاور رئيسية مقسمة لـ 8 محطات عملية',
        subtitle: 'من الصفر لحد ما تقبض أول شيك أو تحويل كاش من المونتاج',
        description:
          'دوس على أي محور تحت وشوف تفاصيل المحطات وتجربة قوائم المهام (Checklists) التفاعلية بنفسك.',
        hint: 'دوس على المحاور تحت عشان تعاين المحطات وتعلّم على اللي خلصته:',
        sidePeekHeader: 'تفاصيل المحور',
        actionableModulesLabel: 'المحطات والخطوات المشمولة:',
        syncStatusText: 'تزامن فوري مع مساحة الـ Notion بتاعتك',
        pillars: [
          {
            id: 'pillar-1',
            pillarNumber: 1,
            title: 'المحور الأول: احتراف Premiere Pro',
            shortTitle: 'احتراف Premiere',
            subtitle: 'المسار السريع من التقطيع لتلوين الفيديو',
            quote:
              'هنعلمك الزتونة والمسار الواضح؛ إزاي تقص وتظبط الصوت وتلون عشان تطلع فيديو احترافي يدخل في الجد فوراً.',
            description:
              'هنعلمك الزتونة والمسار الواضح؛ إزاي تقص وتظبط الصوت وتلون عشان تطلع فيديو احترافي يدخل في الجد فوراً.',
            stepsCountBadge: 'محطة عملية شاملة',
            icon: 'Pr',
            color: '#4F46E5',
            steps: [
              {
                id: 'p1-s1',
                stepNumber: 1,
                title: 'المحطة 1: التقطيع السريع، هندسة الصوت، وتلوين Lumetri الاحترافي',
                tag: 'Premiere Pro',
                done: true,
              },
            ],
          },
          {
            id: 'pillar-2',
            pillarNumber: 2,
            title: 'المحور الثاني: إبداع After Effects والموشن',
            shortTitle: 'إبداع After Effects',
            subtitle: 'الموشن جرافيكس، الكابشنز والمؤثرات البصرية',
            quote:
              'هتعرف إزاي تضيف موشن جرافيكس وكابشن احترافي وتأثيرات بصرية تحول أي فيديو لقطعة فنية تجبر المشاهد يكمل للآخر.',
            description:
              'هتعرف إزاي تضيف موشن جرافيكس وكابشن احترافي وتأثيرات بصرية تحول أي فيديو لقطعة فنية تجبر المشاهد يكمل للآخر.',
            stepsCountBadge: 'محطة عملية شاملة',
            icon: 'Ae',
            color: '#0EA5E9',
            steps: [
              {
                id: 'p2-s2',
                stepNumber: 2,
                title: 'المحطة 2: موشن جرافيكس حركي، كابشنز سينمائية، ومؤثرات بصرية متقدمة',
                tag: 'After Effects',
                done: true,
              },
            ],
          },
          {
            id: 'pillar-3',
            pillarNumber: 3,
            title: 'المحور الثالث: صناعة الريلز وسابقة الأعمال',
            shortTitle: 'صناعة الريلز والشوريل',
            subtitle: 'الـ Hooks السريعة، التغذية البصرية، وبناء البورتفوليو',
            quote:
              'هتتعلم سر الـ Hooks السريعة، وإزاي تعمل تغذية بصرية تميز ستايلك، وصولاً لبناء بورتفوليو وشوريل قوي يقنع أي عميل يسلمك شغله فوراً.',
            description:
              'هتتعلم سر الـ Hooks السريعة، وإزاي تعمل تغذية بصرية تميز ستايلك، وصولاً لبناء بورتفوليو وشوريل قوي يقنع أي عميل يسلمك شغله فوراً.',
            stepsCountBadge: '3 محطات عملية',
            icon: 'Reels',
            color: '#EA580C',
            steps: [
              {
                id: 'p3-s3',
                stepNumber: 3,
                title: 'المحطة 3: أساسيات صناعة الريلز وسر الـ Hooks السريعة لمنع السكرول',
                tag: 'Reels Basics',
                done: false,
              },
              {
                id: 'p3-s4',
                stepNumber: 4,
                title: 'المحطة 4: أسرار التغذية البصرية اليومية وتطوير ستايل بصري مميز',
                tag: 'Visual Feeding',
                done: false,
              },
              {
                id: 'p3-s5',
                stepNumber: 5,
                title: 'المحطة 5: بناء بورتفوليو وشوريل 45 ثانية مقنع يقفل أي عميل',
                tag: 'Portfolio Building',
                done: false,
              },
            ],
          },
          {
            id: 'pillar-4',
            pillarNumber: 4,
            title: 'المحور الرابع: اقتناص العملاء وأدوات التسريع',
            shortTitle: 'صيد العملاء والـ AI',
            subtitle: 'استراتيجيتين مجربتين لجلب العملاء وكنز أدوات الذكاء الاصطناعي',
            quote:
              'استراتيجيتين متجربين في السوق المصري والخليجي لجلب أول عميل ثم مضاعفة شغلك لعقود شهرية، مع كنز أدوات الذكاء الاصطناعي اللي هتسرع شغلك 3x.',
            description:
              'استراتيجيتين متجربين في السوق المصري والخليجي لجلب أول عميل ثم مضاعفة شغلك لعقود شهرية، مع كنز أدوات الذكاء الاصطناعي اللي هتسرع شغلك 3x.',
            stepsCountBadge: '3 محطات عملية',
            icon: '$$',
            color: '#10B981',
            steps: [
              {
                id: 'p4-s6',
                stepNumber: 6,
                title: 'المحطة 6: استراتيجية صيد أول عميل بصيغ رسايل مقنعة بتجيب ردود',
                tag: 'First Client',
                done: false,
              },
              {
                id: 'p4-s7',
                stepNumber: 7,
                title: 'المحطة 7: تثبيت العقود الشهرية المستدامة (Retainers) لدخل ثابت',
                tag: 'Client Scaling',
                done: false,
              },
              {
                id: 'p4-s8',
                stepNumber: 8,
                title: 'المحطة 8: كنز أدوات الذكاء الاصطناعي لتسريع الإنتاج وتوفير وقتك',
                tag: 'AI Tools',
                done: false,
              },
            ],
          },
        ],
        tasks: [
          { id: 't1', text: 'المحطة 1: التقطيع السريع وضبط هندسة الصوت وتلوين Lumetri في Premiere', done: true, tag: 'Premiere' },
          { id: 't2', text: 'المحطة 2: موشن جرافيكس حركي وكابشنز احترافية ومؤثرات في AE', done: true, tag: 'After Effects' },
          { id: 't3', text: 'المحطات 3-5: صناعة الريلز، سر الهوكس، وشوريل قوي يقفل العملاء', done: false, tag: 'Reels & Port' },
          { id: 't4', text: 'المحطات 6-8: استراتيجيتين لجلب العملاء وعقود شهرية وأدوات الذكاء الاصطناعي', done: false, tag: 'Clients & AI' },
        ],
      },
      stackCard: {
        badge: 'العدة والأدوات المتصلة',
        title: 'ورك فلو سريع ومترابط من غير تشتيت',
        description: 'ربط ذكي يخليك تنتقل من التقطيع والقص في Premiere للموشن في After Effects ثم التسليم للعميل في ثواني.',
        status: 'سيرفر الأدوات شغال // 60 FPS SYNC',
        pipelineNodes: [
          { name: 'Premiere Pro', role: 'التقطيع والقص السريع', badge: 'Pr', color: '#4F46E5' },
          { name: 'After Effects', role: 'الهوكات والموشن جرافيكس', badge: 'Ae', color: '#0EA5E9' },
          { name: 'AI Accelerators', role: 'الكابشنز وتنقية الصوت بالذكاء الاصطناعي', badge: 'AI', color: '#38BDF8' },
          { name: 'Notion Hub', role: 'إدارة ملفات وملاحظات العملاء', badge: 'N', color: '#6366F1' },
        ],
      },
      blueprintCard: {
        badge: 'مخطط صيد العملاء والعقود',
        title: 'مخطط الفوز بالعملاء وحاسبة الدخل الشهري',
        description: 'صيغ رسايل جاهزة تاخدها كوبي وبيست وعقود رسمية تضمن حقوقك وفلوسك مقدماً من غير فصال.',
        features: [
          'صيغ رسايل التواصل المباشر (Instagram DMs & LinkedIn Scripts)',
          'نموذج العقد الرسمي باللغتين لحفظ حقوقك والدفعات المقدمة',
          'حاسبة تسعير الريتينر الشهري حسب عدد الفيديوهات ونوع الشغل',
        ],
        calculatorValue: '25,000 ج.م/شهر',
        calculatorLabel: 'متوسط دخل متوقع من عميلين ريتينر بس (شغل 4 فيديوهات في الأسبوع)',
      },
    },
    editorsWall: {
      badge: 'تجارب المونتيرين',
      title: 'اسمع بنفسك: مونتيرين بدأوا من الصفر وقفلوا أول عميل',
      subtitle: 'فويسات حقيقية من مونتيرين كانوا تايهين في يوتيوب، ودلوقتي شغالين مع صُنّاع محتوى وشركات بدخل شهري ثابت.',
      hoverNotice: 'اضغط تشغيل على أي فويس نوت عشان تسمع التجربة كاملة وتتحكم في سرعة الصوت',
      prevButton: 'الفويس السابق',
      nextButton: 'الفويس التالي',
      voiceNoteBadge: 'تسجيل صوتي موثق',
      testimonials: [
        {
          id: 't-1',
          name: 'عمر التميمي',
          handle: '@omar_visuals',
          role: 'مونتير يوتيوب وصُنّاع محتوى',
          badge: 'أول عقد شهري بـ 28,000 ج.م',
          quote: 'الخارطة وفرت عليا سنتين توهان وتخبط على يوتيوب. صيغ الرسايل بالذات هي اللي خلتني أقفل أول عميل ليا في دبي في أقل من أسبوعين!',
          voiceCaption: 'صيغ الرسايل جابتلي أول عميل في دبي في 12 يوم بالظبط!',
          audioSrc: '', // Add real MP3 path here (e.g. '/audio/review-1.mp3') once dropped into public/audio/. Empty string activates studio tone & Web Audio simulation without 404s.
          audioUrl: '',
          durationSeconds: 28,
          waveformBars: [0.25, 0.45, 0.7, 0.9, 0.4, 0.65, 0.85, 1.0, 0.55, 0.35, 0.75, 0.95, 0.8, 0.6, 0.3, 0.5, 0.85, 0.7, 0.9, 0.65, 0.4, 0.75, 0.85, 0.6, 0.35, 0.55, 0.4, 0.25],
        },
        {
          id: 't-2',
          name: 'ياسين بلمقدم',
          handle: '@yassine_cuts',
          role: 'موشن جرافيكس ومونتير ريلز',
          badge: 'عميلين بـ 45,000 ج.م/شهر',
          quote: 'طريقة تنظيم التايم لاين والـ Speed Graph غيرت شكل شغلي 180 درجة. العملاء لاحظوا الفرق في شغلي على طول وبدأت أقفل شغل شهري ثابت ومريح.',
          voiceCaption: 'تنظيم الـ Speed Graph نقل شغلي من هاوي لشغل احترافي يقفل عقود ثابتة.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 34,
          waveformBars: [0.35, 0.6, 0.8, 0.45, 0.75, 0.95, 0.7, 0.5, 0.9, 0.8, 0.6, 0.4, 0.7, 0.9, 0.55, 0.8, 0.7, 0.6, 0.4, 0.85, 1.0, 0.65, 0.5, 0.75, 0.6, 0.45, 0.3, 0.2],
        },
        {
          id: 't-3',
          name: 'سارة عبد الرحمن',
          handle: '@sara_edits',
          role: 'مونتيرة ومخرجة محتوى بودكاست',
          badge: 'أول عميل ريتينر بـ 18,000 ج.م',
          quote: 'كنت بخاف جداً من نقطة التسعير وإزاي أطلب حقي من الشركات. حاسبة التسعير وصيغة العقد ادوني ثقة جبارة وأنا بتفاوض من غير أي إحراج.',
          voiceCaption: 'حاسبة التسعير وصيغة العقد ادوني ثقة أطلب حقي كامل من غير تردد.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 22,
          waveformBars: [0.3, 0.5, 0.75, 0.6, 0.9, 0.8, 0.4, 0.7, 0.95, 0.65, 0.8, 0.5, 0.7, 0.85, 0.6, 0.4, 0.65, 0.9, 0.75, 0.55, 0.35, 0.6, 0.8, 0.5, 0.35, 0.45, 0.3, 0.2],
        },
        {
          id: 't-4',
          name: 'كريم عز الدين',
          handle: '@karim_fx',
          role: 'مونتير إعلانات وشورتس',
          badge: '3 عملاء في أول شهر',
          quote: 'دمج أدوات الذكاء الاصطناعي مع After Effects ضاعف سرعتي جداً. بقيت أسلّم الفيديو في 3 ساعات بدل ما كان بياخد مني يومين مجهود!',
          voiceCaption: 'دمج الـ AI مع الـ After Effects وفر عليا 60% من وقت الريندر والتنفيذ.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 26,
          waveformBars: [0.4, 0.7, 0.9, 0.55, 0.8, 0.65, 0.95, 1.0, 0.75, 0.6, 0.45, 0.8, 0.6, 0.9, 0.7, 0.5, 0.75, 0.9, 0.6, 0.4, 0.7, 0.85, 0.6, 0.4, 0.55, 0.4, 0.3, 0.2],
        },
        {
          id: 't-5',
          name: 'محمود الصاوي',
          handle: '@sawi_prod',
          role: 'مؤسس ستوديو إنتاج مصغر',
          badge: 'عقد 6 شهور بـ 75,000 ج.م',
          quote: 'نظام تنظيم الـ Notion لوحده يسوى أضعاف تمن الخارطة. سيستم نضيف بيخلي شكلك قدام العميل محترف جداً وبيريحك من الفوضى وملاحظات التعديلات.',
          voiceCaption: 'سيستم الـ Notion بيخلي شكلك قدام الكلاينت زي استوديو إنتاج كبير.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 31,
          waveformBars: [0.35, 0.55, 0.85, 0.65, 0.9, 0.7, 0.5, 0.8, 1.0, 0.7, 0.5, 0.75, 0.6, 0.8, 0.95, 0.7, 0.5, 0.65, 0.85, 0.6, 0.4, 0.7, 0.8, 0.55, 0.4, 0.5, 0.35, 0.2],
        },
        {
          id: 't-6',
          name: 'طارق المصلحي',
          handle: '@tariq_edits',
          role: 'مونتير وثائقيات رقمية',
          badge: 'أول صفقة بـ 30,000 ج.م',
          quote: 'القيمة الحقيقية مش بس في شرح الأدوات؛ القيمة في عقلية البيزنس. أخيرًا فهمت العميل بيفكر إزاي وإيه اللي مستعد يدفع فيه فلوس كويسة.',
          voiceCaption: 'عقلية البيزنس والتفاوض هي السر اللي خلاني أقفل أول ديل عالي القيمة.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 25,
          waveformBars: [0.25, 0.45, 0.7, 0.55, 0.85, 0.75, 0.5, 0.8, 0.95, 0.7, 0.6, 0.4, 0.75, 0.6, 0.9, 0.7, 0.5, 0.8, 0.65, 0.45, 0.65, 0.8, 0.6, 0.4, 0.5, 0.35, 0.3, 0.2],
        },
      ],
    },
    pricing: {
      badge: 'عرض الإطلاق',
      title: 'استثمر في مستقبلك وامتلك الخارطة الشاملة',
      subtitle: 'دفعة واحدة بس لمرة واحدة، وهتاخد وصول دائم لكل المحاور والتحديثات والقوالب اللي بنضيفها.',
      tierName: 'باقة المونتير المحترف الشاملة',
      tierSubtitle: 'كل اللي محتاجه عشان تنقل شغلك من الهواية لإغلاق عقود شهرية محترمة بثقة',
      launchPrice: '499 ج.م',
      originalPrice: '1,500 ج.م',
      discountBadge: 'وفر 67% لفترة محدودة',
      period: 'دفعة واحدة لمدى الحياة (بدون اشتراكات شهرية)',
      ctaButton: 'احجز نسختك واحصل على وصول فوري دلوقتي',
      guaranteeBadge: 'ضمان دهبي 30 يوم',
      guaranteeDetails: 'لو حسيت إن الخارطة ما فادتكش وما وفرتش عليك شهور من التوهان والتجربة، ابعتلنا وهنرجعلك الـ 499 ج.م كاملة فوراً ومن غير أي أسئلة.',
      stackHeader: 'كل اللي هتاخده فوراً أول ما تشترك:',
      totalValueLabel: 'إجمالي القيمة الحقيقية لكل الأدوات:',
      totalValue: '3,200 ج.م',
      includedBadge: 'مشمول فوراً',
      bonusBadge: 'هدية مجانية (Bonus)',
      items: [
        {
          id: 'p1',
          title: 'مساحة العمل الكاملة على Notion (4 محاور شاملة 8 محطات)',
          description: 'نظام متكامل فيه كل الشروحات، مصادر التحميل، وقوائم المتابعة التفاعلية.',
          value: '1,200 ج.م',
        },
        {
          id: 'p2',
          title: 'مكتبة البريسيتس والمؤثرات الجاهزة (Premiere & AE Presets)',
          description: 'قوالب تدرجات ألوان سينمائية، حركات نصوص، ومؤثرات صوتية SFX منتقاة.',
          value: '600 ج.م',
          isBonus: true,
        },
        {
          id: 'p3',
          title: 'صيغ ورسايل صيد العملاء المجربة (DMs & Email Scripts)',
          description: 'رسايل متجربة ومكتوبة باحترافية عشان تخطف اهتمام صناع المحتوى والشركات.',
          value: '450 ج.م',
          isBonus: true,
        },
        {
          id: 'p4',
          title: 'نموذج العقد الرسمي المعتمد وحاسبة تسعير الريتينر',
          description: 'عقود جاهزة باللغتين تضمن حقوقك والدفعات المقدمة وتمنع مشاكل المماطلة.',
          value: '550 ج.م',
          isBonus: true,
        },
        {
          id: 'p5',
          title: 'دليل أدوات الذكاء الاصطناعي لإنجاز أسرع 3 أضعاف',
          description: 'أقوى أدوات الـ AI المجانية والمدفوعة مع أوامر تشغيل سريعة جاهزة.',
          value: '400 ج.م',
          isBonus: true,
        },
      ],
    },
    faq: {
      badge: 'الأسئلة المتكررة',
      title: 'إجابات واضحة على كل الأسئلة اللي في بالك',
      subtitle: 'كل التفاصيل اللي محتاج تعرفها قبل ما تدوس وتبدأ معانا.',
      helpNotice: 'عندك سؤال تاني مش موجود هنا؟ فريقنا معاك على الواتساب وتيليجرام على مدار الساعة.',
      contactButton: 'تواصل مع الدعم الفني فوراً',
      items: [
        {
          id: 'faq-1',
          question: 'هل الخارطة دي مناسبة ليا لو أنا لسه زيرو ومبتدئ تماماً في المونتاج؟',
          answer:
            'أكيد طبعاً! أول محور معمول مخصوص عشان ياخد بإيدك من أول تثبيت البرامج وفهم الواجهة وأهم الاختصارات لحد ما تقص وتلون وتطلع أول فيديو احترافي كامل بجودة عالية.',
        },
        {
          id: 'faq-2',
          question: 'إيه إمكانيات الجهاز والبرامج اللي محتاجها عشان أبدأ؟',
          answer:
            'محتاج لابتوب أو كمبيوتر يقدر يشغل Premiere Pro وAfter Effects بشكل معقول. كمان هنشرحلك بدائل خفيفة وتكنيكات البروكسي وأدوات ذكاء اصطناعي كلاود تخفف الحمل جداً على الأجهزة المتوسطة.',
        },
        {
          id: 'faq-3',
          question: 'إزاي هستلم مساحة الـ Notion بعد ما أدفع؟',
          answer:
            'أول ما تأكد طلبك، هيوصلك إيميل فوري فيه لينك مساحة الـ Notion الخاصة بيك، وبضغطة زر واحدة (Duplicate) هتتنقل لحسابك الشخصي على Notion وتبدأ فوراً.',
        },
        {
          id: 'faq-4',
          question: 'طب إيه الضمان لو المحتوى معجبنيش أو محستش بفرق؟',
          answer:
            'إحنا واثقين جداً في الشغل والقيمة اللي بنقدمهالك، عشان كده بنديك ضمان دهبي لمدة 30 يوم؛ لو حسيت إنها ما فادتكش، ابعتلنا وهنرجعلك الـ 499 ج.م كاملة من غير أي شروط ولا أسئلة.',
        },
        {
          id: 'faq-5',
          question: 'إيه طرق الدفع المتاحة؟ هل ينفع فودافون كاش أو إنستاباي؟',
          answer:
            'أيوه طبعاً وبكل سهولة! تقدر تدفع عن طريق فودافون كاش أو إنستاباي أو البطاقة البنكية، وبمجرد ما تسجل بياناتك في الفورم وترفع سكرين شوت التحويل هيتم تفعيل نسختك في دقايق.',
        },
      ],
    },
    modal: {
      badge: 'عرض الإطلاق الحصري',
      title: 'تأكيد حجز خارطة المونتاج الشاملة',
      subtitle: 'سجل بياناتك عشان تحجز نسختك بسعر الإطلاق المخفض فوراً (499 ج.م بدل 1,500 ج.م).',
      nameLabel: 'الاسم بالكامل',
      namePlaceholder: 'مثال: أحمد محمد',
      emailLabel: 'الإيميل اللي هيوصلك عليه لينك الـ Notion',
      emailPlaceholder: 'name@example.com',
      phoneLabel: 'رقم فودافون كاش أو حساب إنستاباي (للتأكيد)',
      phonePlaceholder: '010XXXXXXXX أو username@instapay',
      receiptLabel: 'سكرين شوت إيصال التحويل (اختياري / تأكيد فوري)',
      receiptUploadBtn: 'ارفع صورة الإيصال أو التحويل',
      receiptAttached: 'تم إرفاق صورة الإيصال بنجاح',
      receiptHint: 'تقدر ترفع سكرين شوت التحويل عشان نفعل حسابك في دقايق من غير انتظار',
      removeReceipt: 'حذف الإيصال',
      experienceLabel: 'مستواك الحالي في المونتاج',
      experienceOptions: {
        beginner: 'مبتدئ تماماً (عايز اتعلم الأساسيات والزتونة)',
        intermediate: 'متوسط (بعرف اشتغل على البرامج بس محتاج عملاء)',
        freelancer: 'شغال فريلانسر (عايز أرفع أسعاري وأقفل عقود شهرية ثابتة)',
      },
      paymentNote: 'الدفع آمن ومتاح عبر فودافون كاش، إنستاباي، والبطاقات البنكية.',
      submitButton: 'إتمام الطلب وتأكيد الحجز (499 ج.م)',
      submittingButton: 'ثواني وبنجهز نسختك...',
      successTitle: 'تم تأكيد حجزك بنجاح!',
      successMessage: 'تسلم يا بطل! بياناتك اتسجلت وهيتبعت على إيميلك لينك مساحة الـ Notion مع خطوات البداية فوراً.',
      orderIdLabel: 'رقم الطلب المرجعي:',
      orderDeliveryNotice: 'السيستم الآلي هيبعتلك لينك التفعيل وإرشادات البداية على إيميلك خلال دقايق معدودة.',
      closeButton: 'قفل النافذة',
      validationErrors: {
        nameRequired: 'يا ريت تكتب اسمك بالكامل عشان نتابع معاك',
        emailRequired: 'يا ريت تدخل إيميل صحيح عشان يوصلك عليه لينك الـ Notion',
        phoneRequired: 'يا ريت تكتب رقم فودافون كاش أو عنوان إنستاباي اللي حولت منه',
      },
    },
    footer: {
      tagline: 'خارطة الطريق الشاملة لكل مونتير طموح عايز يبني دخل شهري ثابت ومستقر من الفريلانس.',
      copyright: 'جميع الحقوق محفوظة © 2026 CineFlow Roadmap.',
      builtFor: 'صُنعت بحرفية وشغف لكل مونتير وصانع محتوى في مصر والوطن العربي.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      quickLinksTitle: 'أقسام الموقع',
      socialTitle: 'مجتمع المونتيرين',
      legalTitle: 'الضمانات والحقوق',
      refundGuarantee: 'ضمان استرجاع 30 يوماً',
      allRights: 'جميع الحقوق محفوظة',
      backToTop: 'الرجوع للأعلى',
      links: [
        { label: 'التايم لاين العملي', href: '#curriculum' },
        { label: 'منظومة الأدوات (Bento)', href: '#stack' },
        { label: 'آراء وتجارب الشباب', href: '#wall' },
        { label: 'سعر الباقة', href: '#pricing' },
        { label: 'الأسئلة الشائعة', href: '#faq' },
      ],
    },
  },
  en: {
    brand: {
      name: 'CineFlow Notion Roadmap',
      tagline: 'From Zero to Your First Paid Video Editing Client',
      ctaButton: 'Get The Roadmap Now',
      exploreButton: 'Explore Curriculum',
      lifetimeBadge: 'Lifetime Access + Free Updates Included',
      guaranteeText: '30-Day 100% Money-Back Guarantee, No Questions Asked',
    },
    navbar: {
      roadmap: 'Overview',
      curriculum: 'Interactive Timeline',
      stack: 'Tech Stack',
      wall: 'Editors Wall',
      pricing: 'Pricing',
      faq: 'FAQ',
      cta: 'Get Access',
      switchLang: 'العربية',
      switchTheme: 'Toggle Theme',
    },
    hero: {
      pillBadge: '2026 Professional Video Editor Roadmap',
      eyebrow: '2026 Professional Video Editor Roadmap',
      headline: 'Turn Your Passion for Video Editing into Real Opportunities',
      headlinePart1: 'Turn Your Passion for Editing into',
      headlineHighlight: 'Real Opportunities',
      headlinePart2: '',
      subheadline:
        'Learn editing through practical, hands-on projects, and build your skills step-by-step to launch your video career.',
      description:
        'Learn editing through practical, hands-on projects, and build your skills step-by-step to launch your video career.',
      ctaPrimary: 'Get The Roadmap Now',
      ctaSecondary: 'Try Interactive Timeline',
      proofCount: '1,420+ Editors',
      proofSubtext: 'Transformed their creative workflow and landed paying clients',
      scrubHint: 'Drag the timeline playhead with mouse or touch to explore all 4 curriculum stages',
      timelineHeader: 'Interactive Curriculum Timeline',
      currentTimeLabel: 'Curriculum Progress Timecode',
    },
    stages: [
      {
        id: 'stage-1',
        index: 0,
        timecode: '00:00:15:00',
        badge: 'Pillar 1: Premiere Pro',
        title: 'Pillar 1: Premiere Pro Mastery',
        subtitle: 'Shortcut Velocity, Audio Polishing & Lumetri Color',
        description:
          'Master the exact shortcut workflows: cutting, audio mixing, and color grading to produce professional videos from day one.',
        tools: [{ name: 'Premiere Pro', badge: 'Pr', color: '#5D5FEF' }],
        milestones: [
          'Step 1: Rough cut velocity, sound design & Lumetri color grading',
          'Hollywood studio folder bins & ergonomic keyboard mappings',
          'Psychological retention pacing & seamless J / L cut audio flow',
        ],
        metric: { label: 'Editing Velocity', value: '3x Faster' },
      },
      {
        id: 'stage-2',
        index: 1,
        timecode: '00:00:30:00',
        badge: 'Pillar 2: After Effects',
        title: 'Pillar 2: After Effects Creativity',
        subtitle: 'Kinetic Motion, Viral Captions & VFX',
        description:
          'Learn how to craft dynamic motion graphics, viral kinetic captions, and visual effects that hook viewers until the final second.',
        tools: [{ name: 'After Effects', badge: 'Ae', color: '#0EA5E9' }],
        milestones: [
          'Step 2: Kinetic motion graphics, viral captions & visual retention effects',
          'Speed graph easing curves for buttery natural animations',
          'Reusable MOGRT templates & the 3-second visual hook formula',
        ],
        metric: { label: 'Audience Retention Rate', value: '+68% Retention' },
      },
      {
        id: 'stage-3',
        index: 2,
        timecode: '00:00:45:00',
        badge: 'Pillar 3: Reels & Portfolio',
        title: 'Pillar 3: Reels Production & Portfolio',
        subtitle: 'Viral Hooks, Visual Feeding & Magnetic Showreel',
        description:
          'Master rapid visual hooks, curated visual feeding to craft your unique style, and build an irresistible portfolio that converts clients on the spot.',
        tools: [
          { name: 'Reels Studio', badge: 'Reels', color: '#0EA5E9' },
          { name: 'Showreel OS', badge: 'Port', color: '#6366F1' },
        ],
        milestones: [
          'Step 3: Reels architecture & 3-second rapid hook formula',
          'Step 4: Visual feeding & developing your signature editing style',
          'Step 5: Building a magnetic portfolio & high-converting showreel',
        ],
        metric: { label: 'Conversion & Engagement', value: '4.8x Higher' },
      },
      {
        id: 'stage-4',
        index: 3,
        timecode: '00:01:00:00',
        badge: 'Pillar 4: Clients & AI',
        title: 'Pillar 4: Client Acquisition & AI Speed',
        subtitle: '2 Proven Client Strategies & Curated AI Workflow',
        description:
          'Two proven strategies to land your first client and scale your roster, paired with a treasure trove of AI tools to accelerate your workflow.',
        tools: [
          { name: 'Client Acquisition', badge: '$$', color: '#10B981' },
          { name: 'AI Workflows', badge: 'AI', color: '#0EA5E9' },
        ],
        milestones: [
          'Step 6: Battle-tested cold outreach & landing your first paid client',
          'Step 7: Client scaling system & high-ticket monthly retainers',
          'Step 8: Curated AI workflow stack for 3x editing acceleration',
        ],
        metric: { label: 'Target Monthly Retainer', value: '$1,500 - $3,000' },
      },
    ],
    bento: {
      badge: 'Notion Workspace',
      title: 'Everything You Need to Become a High-Paid Editor',
      subtitle: 'A single, unified workspace combining all video assets, project trackers, and business templates.',
      notionCard: {
        badge: 'Notion Workspace',
        title: '30-Day Roadmap: 4 Core Pillars (8 Actionable Modules)',
        subtitle: 'From Zero to Your First High-Ticket Video Client',
        description:
          'Click any pillar to open Notion Side-Peek view and interact with real checklist progress tracking.',
        hint: 'Click pillars below to preview actionable sub-modules and toggle progress:',
        sidePeekHeader: 'Curriculum Details',
        actionableModulesLabel: 'Included Actionable Modules:',
        syncStatusText: 'Realtime Sync with Notion Workspace',
        pillars: [
          {
            id: 'pillar-1',
            pillarNumber: 1,
            title: 'Pillar 1: Premiere Pro Mastery',
            shortTitle: 'Premiere Pro',
            subtitle: 'Cutting velocity, sound design & Lumetri color',
            quote:
              'Master the exact shortcut workflows: cutting, audio mixing, and color grading to produce professional videos from day one.',
            description:
              'Master the exact shortcut workflows: cutting, audio mixing, and color grading to produce professional videos from day one.',
            stepsCountBadge: '1 Actionable Module',
            icon: 'Pr',
            color: '#4F46E5',
            steps: [
              {
                id: 'p1-s1',
                stepNumber: 1,
                title: 'Step 1: Rough cut velocity, sound design & Lumetri color grading',
                tag: 'Premiere Pro',
                done: true,
              },
            ],
          },
          {
            id: 'pillar-2',
            pillarNumber: 2,
            title: 'Pillar 2: After Effects Creativity',
            shortTitle: 'After Effects',
            subtitle: 'Kinetic motion, viral captions & visual retention effects',
            quote:
              'Learn how to craft dynamic motion graphics, viral kinetic captions, and visual effects that hook viewers until the final second.',
            description:
              'Learn how to craft dynamic motion graphics, viral kinetic captions, and visual effects that hook viewers until the final second.',
            stepsCountBadge: '1 Actionable Module',
            icon: 'Ae',
            color: '#0EA5E9',
            steps: [
              {
                id: 'p2-s2',
                stepNumber: 2,
                title: 'Step 2: Kinetic motion graphics, viral captions & visual retention effects',
                tag: 'After Effects',
                done: true,
              },
            ],
          },
          {
            id: 'pillar-3',
            pillarNumber: 3,
            title: 'Pillar 3: Reels Production & Portfolio',
            shortTitle: 'Reels & Portfolio',
            subtitle: 'Fast visual hooks, visual feeding & magnetic showreel',
            quote:
              'Master rapid visual hooks, curated visual feeding to craft your unique style, and build an irresistible portfolio that converts clients on the spot.',
            description:
              'Master rapid visual hooks, curated visual feeding to craft your unique style, and build an irresistible portfolio that converts clients on the spot.',
            stepsCountBadge: '3 Actionable Modules',
            icon: 'Reels',
            color: '#10B981',
            steps: [
              {
                id: 'p3-s3',
                stepNumber: 3,
                title: 'Step 3: Reels fundamentals & 3-second rapid hook formula',
                tag: 'Reels Basics',
                done: false,
              },
              {
                id: 'p3-s4',
                stepNumber: 4,
                title: 'Step 4: Visual feeding & developing your signature editing style',
                tag: 'Visual Feeding',
                done: false,
              },
              {
                id: 'p3-s5',
                stepNumber: 5,
                title: 'Step 5: Building a magnetic portfolio & high-converting showreel',
                tag: 'Portfolio Building',
                done: false,
              },
            ],
          },
          {
            id: 'pillar-4',
            pillarNumber: 4,
            title: 'Pillar 4: Client Acquisition & AI Speed',
            shortTitle: 'Clients & AI',
            subtitle: '2 battle-tested client strategies & curated AI stack',
            quote:
              'Two proven strategies to land your first client and scale your roster, paired with a treasure trove of AI tools to accelerate your workflow.',
            description:
              'Two proven strategies to land your first client and scale your roster, paired with a treasure trove of AI tools to accelerate your workflow.',
            stepsCountBadge: '3 Actionable Modules',
            icon: '$$',
            color: '#059669',
            steps: [
              {
                id: 'p4-s6',
                stepNumber: 6,
                title: 'Step 6: Battle-tested cold outreach & landing your first paid client',
                tag: 'First Client',
                done: false,
              },
              {
                id: 'p4-s7',
                stepNumber: 7,
                title: 'Step 7: Client scaling system & high-ticket monthly retainers',
                tag: 'Client Scaling',
                done: false,
              },
              {
                id: 'p4-s8',
                stepNumber: 8,
                title: 'Step 8: Curated AI workflow stack for 3x editing acceleration',
                tag: 'AI Tools',
                done: false,
              },
            ],
          },
        ],
        tasks: [
          { id: 't1', text: 'Step 1: Rough cut velocity, sound design & Lumetri color grading', done: true, tag: 'Premiere' },
          { id: 't2', text: 'Step 2: Kinetic motion graphics, viral captions & visual effects', done: true, tag: 'After Effects' },
          { id: 't3', text: 'Steps 3-5: Reels production, rapid hooks & magnetic portfolio', done: false, tag: 'Reels & Port' },
          { id: 't4', text: 'Steps 6-8: 2 client acquisition strategies & AI workflow engine', done: false, tag: 'Clients & AI' },
        ],
      },
      stackCard: {
        badge: 'Interconnected Pipeline',
        title: 'A Unified Creative Toolchain',
        description: 'Seamless signal flow taking you from assembly cut to kinetic motion and client delivery.',
        status: 'SIGNAL FLOW ACTIVE // 60 FPS SYNC',
        pipelineNodes: [
          { name: 'Premiere Pro', role: 'Rough Cut & Pacing', badge: 'Pr', color: '#4F46E5' },
          { name: 'After Effects', role: 'Hooks & Kinetic VFX', badge: 'Ae', color: '#0EA5E9' },
          { name: 'AI Accelerators', role: 'Voice & Captions', badge: 'AI', color: '#38BDF8' },
          { name: 'Notion Hub', role: 'Client & Asset OS', badge: 'N', color: '#6366F1' },
        ],
      },
      blueprintCard: {
        badge: 'Client Acquisition Engine',
        title: 'The Predictable Retainer Blueprint',
        description: 'Copy-paste outreach scripts, pricing models, and legal freelance agreements.',
        features: [
          'Direct-response outreach templates for Instagram & LinkedIn',
          'Ironclad legal agreements with advance payment milestones',
          'Content-tier calculator to price recurring monthly retainers',
        ],
        calculatorValue: '$2,500/mo',
        calculatorLabel: 'Average retainer from just 2 clients (4 videos/week each)',
      },
    },
    editorsWall: {
      badge: 'The Editors’ Audio Wall',
      title: 'Hear Authentic Reviews from Fellow Editors',
      subtitle: 'Real voice notes from editors who started from scratch and landed high-ticket monthly retainers.',
      hoverNotice: 'Press play on any voice note to hear their story and control audio speed',
      prevButton: 'Previous Voice Note',
      nextButton: 'Next Voice Note',
      voiceNoteBadge: 'Verified Voice Note',
      testimonials: [
        {
          id: 't-1',
          name: 'Omar Al-Tamimi',
          handle: '@omar_visuals',
          role: 'YouTube & Creator Editor',
          badge: 'Signed 1st Client at $1,800/mo',
          quote: 'This roadmap saved me 2 years of trial and error. The cold DM scripts alone landed my first creator client in Dubai within 12 days!',
          voiceCaption: 'Cold outreach scripts landed my first Dubai creator client in just 12 days!',
          audioSrc: '', // Add real MP3 path here (e.g. '/audio/review-1.mp3') once dropped into public/audio/. Empty string activates studio tone & Web Audio simulation without 404s.
          audioUrl: '',
          durationSeconds: 28,
          waveformBars: [0.25, 0.45, 0.7, 0.9, 0.4, 0.65, 0.85, 1.0, 0.55, 0.35, 0.75, 0.95, 0.8, 0.6, 0.3, 0.5, 0.85, 0.7, 0.9, 0.65, 0.4, 0.75, 0.85, 0.6, 0.35, 0.55, 0.4, 0.25],
        },
        {
          id: 't-2',
          name: 'Yassine Belmokadem',
          handle: '@yassine_cuts',
          role: 'Motion Designer & Short-Form Editor',
          badge: '2 Clients at $3,200/mo',
          quote: 'The timeline pacing and speed graph sections completely upgraded my visual output. Clients immediately noticed the retention difference.',
          voiceCaption: 'Mastering the Speed Graph instantly turned my edits into high-ticket retainer magnets.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 34,
          waveformBars: [0.35, 0.6, 0.8, 0.45, 0.75, 0.95, 0.7, 0.5, 0.9, 0.8, 0.6, 0.4, 0.7, 0.9, 0.55, 0.8, 0.7, 0.6, 0.4, 0.85, 1.0, 0.65, 0.5, 0.75, 0.6, 0.45, 0.3, 0.2],
        },
        {
          id: 't-3',
          name: 'Sara Abdulrahman',
          handle: '@sara_edits',
          role: 'Podcast & Interview Editor',
          badge: 'First Retainer at $1,500/mo',
          quote: 'I used to fear pitching clients and discussing money. The pricing calculator and contract template gave me immense confidence.',
          voiceCaption: 'The pricing calculator gave me total confidence to negotiate without hesitation.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 22,
          waveformBars: [0.3, 0.5, 0.75, 0.6, 0.9, 0.8, 0.4, 0.7, 0.95, 0.65, 0.8, 0.5, 0.7, 0.85, 0.6, 0.4, 0.65, 0.9, 0.75, 0.55, 0.35, 0.6, 0.8, 0.5, 0.35, 0.45, 0.3, 0.2],
        },
        {
          id: 't-4',
          name: 'Karim Ezzeldin',
          handle: '@karim_fx',
          role: 'Commercial & Ad Video Editor',
          badge: '3 Clients in Month 1',
          quote: 'Pairing AI audio cleanup with After Effects doubled my turnaround speed. I finish edits in 3 hours that used to take 2 full days!',
          voiceCaption: 'Combining AI tools with After Effects cut my turnaround time by more than 60%.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 26,
          waveformBars: [0.4, 0.7, 0.9, 0.55, 0.8, 0.65, 0.95, 1.0, 0.75, 0.6, 0.45, 0.8, 0.6, 0.9, 0.7, 0.5, 0.75, 0.9, 0.6, 0.4, 0.7, 0.85, 0.6, 0.4, 0.55, 0.4, 0.3, 0.2],
        },
        {
          id: 't-5',
          name: 'Mahmoud El-Sawy',
          handle: '@sawi_prod',
          role: 'Micro-Agency Founder',
          badge: '6-Month Retainer at $4,500',
          quote: 'The Notion project architecture alone is worth 10x the price. A spotless client review system that makes you look ultra-pro.',
          voiceCaption: 'The Notion workspace makes you look like a top-tier production studio to every client.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 31,
          waveformBars: [0.35, 0.55, 0.85, 0.65, 0.9, 0.7, 0.5, 0.8, 1.0, 0.7, 0.5, 0.75, 0.6, 0.8, 0.95, 0.7, 0.5, 0.65, 0.85, 0.6, 0.4, 0.7, 0.8, 0.55, 0.4, 0.5, 0.35, 0.2],
        },
        {
          id: 't-6',
          name: 'Tariq Al-Moslihy',
          handle: '@tariq_edits',
          role: 'Documentary & Narrative Editor',
          badge: 'First High-Ticket Deal $2,200',
          quote: 'The real magic is the business mindset. It turns you from a software operator into a high-value strategic media partner.',
          voiceCaption: 'The client psychology mindset turned me into a trusted, high-value media partner.',
          audioSrc: '',
          audioUrl: '',
          durationSeconds: 25,
          waveformBars: [0.25, 0.45, 0.7, 0.55, 0.85, 0.75, 0.5, 0.8, 0.95, 0.7, 0.6, 0.4, 0.75, 0.6, 0.9, 0.7, 0.5, 0.8, 0.65, 0.45, 0.65, 0.8, 0.6, 0.4, 0.5, 0.35, 0.3, 0.2],
        },
      ],
    },
    pricing: {
      badge: 'Launch Pricing',
      title: 'Invest in Your Craft with Lifetime Access',
      subtitle: 'One-time payment for lifetime access to the curriculum, template updates, and private community.',
      tierName: 'The Complete Video Editor OS',
      tierSubtitle: 'Everything you need to go from zero to signing high-ticket monthly retainers',
      launchPrice: '$47',
      originalPrice: '$197',
      discountBadge: 'Save 76% for a limited time',
      period: 'One-time lifetime access',
      ctaButton: 'Unlock Immediate Access Now',
      guaranteeBadge: '30-Day Money-Back Guarantee',
      guaranteeDetails: 'If this roadmap doesn’t shave months off your learning curve, email us for a 100% refund without hesitation.',
      stackHeader: 'Everything included in your access today:',
      totalValueLabel: 'Total Real Value:',
      totalValue: '$263',
      includedBadge: 'Included',
      bonusBadge: 'FREE BONUS',
      items: [
        {
          id: 'p1',
          title: 'Full 4-Stage Notion Roadmap & Workspace',
          description: 'Step-by-step interactive curriculum with progress trackers and checklists.',
          value: '$97',
        },
        {
          id: 'p2',
          title: 'Premiere Pro & After Effects Preset Vault',
          description: 'Custom color LUTs, speed ramp presets, and kinetic caption templates.',
          value: '$49',
          isBonus: true,
        },
        {
          id: 'p3',
          title: 'Battle-Tested Cold Outreach Scripts (DMs & Email)',
          description: 'Proven templates for pitching YouTubers, podcasters, and brand creators.',
          value: '$39',
          isBonus: true,
        },
        {
          id: 'p4',
          title: 'Ironclad Freelance Contract & Pricing Calculator',
          description: 'Bilingual legal agreement templates and recurring retainer pricing formula.',
          value: '$49',
          isBonus: true,
        },
        {
          id: 'p5',
          title: 'AI Velocity Toolstack & Prompt Playbook',
          description: 'Curated list of AI speech enhancers, b-roll tools, and prompt recipes.',
          value: '$29',
          isBonus: true,
        },
      ],
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Clear Answers to Your Questions',
      subtitle: 'Everything you need to know before stepping into the curriculum.',
      helpNotice: 'Have a question not answered here? Reach out to our community support anytime.',
      contactButton: 'Contact Support',
      items: [
        {
          id: 'faq-1',
          question: 'Is this roadmap suitable if I am a complete beginner?',
          answer:
            'Absolutely! Stage 1 assumes zero prior experience and walks you through software installation, timeline layout, core cutting mechanics, and exporting your first professional video.',
        },
        {
          id: 'faq-2',
          question: 'What software and computer specs do I need?',
          answer:
            'You will need access to Adobe Premiere Pro and After Effects. We also teach proxy workflows and cloud AI tools so you can edit smoothly even on modest laptops.',
        },
        {
          id: 'faq-3',
          question: 'How do I access the Notion workspace after checkout?',
          answer:
            'Immediately after completing checkout, you will receive an email with your direct Notion link and a 1-click "Duplicate" button to add it to your own Notion account.',
        },
        {
          id: 'faq-4',
          question: 'What if the roadmap is not right for me?',
          answer:
            'We offer an unconditional 30-day money-back guarantee. If you are not completely thrilled with the curriculum depth, simply let us know for a prompt 100% refund.',
        },
        {
          id: 'faq-5',
          question: 'Will there be local payment options available in the future?',
          answer:
            'Yes! You can reserve your access today via our checkout modal. In Phase 2, automated Vodafone Cash, InstaPay, and credit card payments will be directly integrated.',
        },
      ],
    },
    modal: {
      badge: 'Launch Offer',
      title: 'Secure Your Video Editor Roadmap Access',
      subtitle: 'Enter your details below to lock in the special launch price.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Email Address for Notion Delivery',
      emailPlaceholder: 'name@example.com',
      phoneLabel: 'Vodafone Cash or InstaPay Number',
      phonePlaceholder: '010XXXXXXXX or username@instapay',
      receiptLabel: 'Transfer Receipt (Instant Activation)',
      receiptUploadBtn: 'Attach Receipt Screenshot',
      receiptAttached: 'Receipt screenshot attached successfully',
      receiptHint: 'Upload payment screenshot for instant order clearance and fast-track delivery',
      removeReceipt: 'Remove receipt',
      experienceLabel: 'Current Editing Experience',
      experienceOptions: {
        beginner: 'Complete Beginner (Learning fundamentals)',
        intermediate: 'Intermediate (Know tools, seeking paid clients)',
        freelancer: 'Freelancer (Scaling to monthly retainers)',
      },
      paymentNote: 'Architecture ready for seamless Phase 2 payment gateway integration.',
      submitButton: 'Complete Order & Get Access ($47)',
      submittingButton: 'Securing your access...',
      successTitle: 'Order Successfully Reserved!',
      successMessage: 'Thank you! Your access has been recorded and delivery instructions have been dispatched to your email.',
      orderIdLabel: 'Order Reference ID:',
      orderDeliveryNotice: 'Our automated system will dispatch your direct Notion invitation link within minutes.',
      closeButton: 'Close Window',
      validationErrors: {
        nameRequired: 'Please enter your full name',
        emailRequired: 'Please enter a valid email for Notion workspace delivery',
        phoneRequired: 'Please enter your Vodafone Cash or InstaPay account',
      },
    },
    footer: {
      tagline: 'The ultimate operating system for ambitious video editors building predictable freelance revenue.',
      copyright: 'All Rights Reserved © 2026 CineFlow Roadmap.',
      builtFor: 'Engineered with high craft for creators worldwide.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      quickLinksTitle: 'Navigation',
      socialTitle: 'Community',
      legalTitle: 'Legal & Guarantee',
      refundGuarantee: '30-Day Money-Back Guarantee',
      allRights: 'All Rights Reserved',
      backToTop: 'Back to Top',
      links: [
        { label: 'Interactive Timeline', href: '#curriculum' },
        { label: 'Tech Stack (Bento)', href: '#stack' },
        { label: 'Editors Wall', href: '#wall' },
        { label: 'Pricing Vault', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
  },
};
