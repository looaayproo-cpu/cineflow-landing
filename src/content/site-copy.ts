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
      name: 'CutToClient Notion Roadmap',
      tagline: 'دليلك الشامل من الصفر حتى أول عميل',
      ctaButton: 'احصل على الخطة دلوقتي',
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
      pillBadge: 'دليلك الشامل من الصفر حتى أول عميل',
      eyebrow: 'دليلك الشامل من الصفر حتى أول عميل',
      headline: 'طريقك من الصفر لمونتير معاه بورتفوليو وعملاء جاهزين',
      headlinePart1: 'طريقك من الصفر لمونتير',
      headlineHighlight: 'معاه بورتفوليو وعملاء جاهزين',
      headlinePart2: '',
      subheadline:
        'وفر شهور من التوهان في شروحات اليوتيوب. ملف نوشن تفاعلي يوجهك. هتتعلم اللي السوق طالبه فعلاً، وتبني بورتفوليو احترافي، وتتعلم إزاي تجيب أول عميل.',
      description:
        'وفر شهور من التوهان في شروحات اليوتيوب. ملف نوشن تفاعلي يوجهك. هتتعلم اللي السوق طالبه فعلاً، وتبني بورتفوليو احترافي، وتتعلم إزاي تجيب أول عميل.',
      ctaPrimary: 'احصل على الخطة دلوقتي',
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
        badge: 'المحور الأول: الأدوات والأساسيات',
        title: 'المحور الأول: إتقان أدوات المونتاج والأساسيات',
        subtitle: 'فيديوهات يوتيوب منتقاة، فهم البريمير والأفتر، وبناء الريلز',
        description:
          'مش هنسيبك تايه بين الأدوات والواجهات المعقدة. الخطة بتدخلك في المفيد علطول: معاك مجموعة فيديوهات مجمعة من اليوتيوب مترتبة بترتيب متقن عشان تتأكد انك مش هتتعمق في حاجه قبل ما تبقا عارف اساسياتها وتوفر على نفسك تشتيت وتوهان كتير. هتفهم البريمير والأفتر إفكتس كأدوات في إيدك، وتتعلم إزاي تستخدمهم مباشرة في بناء ريلز بمستوى مطلوب في سوق الفريلانس.',
        tools: [
          { name: 'Premiere Pro', badge: 'Pr', color: '#5D5FEF' },
          { name: 'After Effects', badge: 'Ae', color: '#8B5CF6' },
          { name: 'Reels', badge: 'Reels', color: '#0EA5E9' },
        ],
        milestones: [
          'أساسيات Premiere Pro',
          'أساسيات After Effects',
          'أساسيات بناء الـ Reels',
        ],
        metric: { label: 'أساسيات متينة وتطبيق عملي', value: 'جاهزية لسوق الريلز' },
      },
      {
        id: 'stage-2',
        index: 1,
        timecode: '00:00:30:00',
        badge: 'المحور الثاني: التغذية والبورتفوليو',
        title: 'المحور الثاني: التغذية البصرية وبناء سابقة الأعمال',
        subtitle: 'تحليل الفيديوهات الناجحة وتجهيز معرض أعمال مقنع',
        description:
          'المهارة لوحدها مش كفاية، الأهم عينك بتشوف إزاي وشغلك معروض إزاي. في المحور ده هتدرب عينك على تحليل الفيديوهات الناجحة، وهتطبق ده عملياً عشان تبني بورتفوليو قوي ومقنع يخلي العميل يطلبك بالاسم حتى لو لسه بتبدأ.',
        tools: [
          { name: 'التغذية البصرية', badge: 'Eye', color: '#8B5CF6' },
          { name: 'بناء البورتفوليو', badge: 'Port', color: '#6366F1' },
        ],
        milestones: [
          'التغذية البصرية: إزاي تفكك أي فيديو عاجبك وتفهم اتعمل إزاي.',
          'بناء سابقة أعمال: تجهيز معرض أعمال احترافي تستخدمه في التقديم لأي شغل وانت واثق.',
        ],
        metric: { label: 'بورتفوليو يطلبك بالاسم', value: 'معرض أعمال مقنع' },
      },
      {
        id: 'stage-3',
        index: 2,
        timecode: '00:00:45:00',
        badge: 'المحور الثالث: صيد العملاء',
        title: 'المحور الثالث: استراتيجيات اقتناص أول عميل',
        subtitle: 'خطتان واضحتان لجلب أول عميل وبناء قاعدة مستمرة',
        description:
          'سيبك من نصايح "قدم في مواقع الفريلانس واستنى". في المحور ده هتمشي على خطتين واضحين عشان تجيب أول عميل في أسرع وقت، وتبدأ تبني قاعدة عملاء مستمرين يعتمدوا عليك في مونتاج فيديوهاتهم.',
        tools: [
          { name: 'استراتيجية 1', badge: 'S1', color: '#10B981' },
          { name: 'استراتيجية 2', badge: 'S2', color: '#0EA5E9' },
        ],
        milestones: [
          'إيجاد أول عميل (الاستراتيجية الأولى)',
          'إيجاد أول عميل (الاستراتيجية الثانية)',
        ],
        metric: { label: 'اقتناص العملاء الفعليين', value: 'أول عميل مدفوع' },
      },
      {
        id: 'stage-4',
        index: 3,
        timecode: '00:01:00:00',
        badge: 'المحور الرابع: صندوق الأدوات',
        title: 'المحور الرابع: صندوق أدوات المونتير',
        subtitle: 'ستوك فوتدج، أيقونات ضخمة، عناصر 3D ومؤثرات صوتية جاهزة',
        description:
          'مش هتبدأ من الصفر ولا تدوّر بالساعات. جمعنالك كل الموارد والأدوات اللي بيعتمد عليها المحترفون يومياً لتسريع شغلهم ورفع جودة الفيديوهات: من ستوك فوتدج احترافي ومكتبات أيقونات ضخمة، لعناصر 3D ومؤثرات صوتية جاهزة تخلص اسرع وتختصر وقتك.',
        tools: [
          { name: 'Stock & SFX', badge: 'Vault', color: '#EC4899' },
          { name: '3D & Icons', badge: '3D', color: '#8B5CF6' },
        ],
        milestones: [],
        metric: { label: 'توفير الوقت وتسريع الإنجاز', value: 'تسريع الشغل 2x' },
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
      badge: 'تجارب الشباب',
      title: 'اسمع بنفسك: إزاي نقلتهم الخطة من الصفر لأول عميل؟',
      subtitle:
        'فويسات من شباب كانوا مكانك تايهين بين الفيديوهات، ودلوقتي بيقبضوا من شغلهم مع صناع محتوى وشركات.',
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
      title: 'خطة 30 يوم مونتاج (من الصفر لأول دولار)',
      subtitle: 'دفعة واحدة بس لمرة واحدة، وهتاخد وصول دائم لكل محاور الخطة.',
      tierName: 'خطة 30 يوم مونتاج (من الصفر لأول دولار)',
      tierSubtitle: 'دفعة واحدة بس لمرة واحدة، وهتاخد وصول دائم لكل محاور الخطة.',
      launchPrice: '399 ج.م',
      originalPrice: '',
      discountBadge: 'وفر 73% لفترة محدودة',
      period: 'دفعة واحدة لمدى الحياة (بدون أي اشتراكات إضافية)',
      ctaButton: 'احصل على الخطة دلوقتي',
      guaranteeBadge: '',
      guaranteeDetails: '',
      stackHeader: '',
      totalValueLabel: '',
      totalValue: '',
      includedBadge: '',
      bonusBadge: '',
      items: [],
    },
    faq: {
      badge: 'الأسئلة المتكررة',
      title: 'الأسئلة الشائعة حول الخطة',
      subtitle: 'كل ما تحتاج معرفته عن خطة CutToClient وطريقة البداية والاستفادة القصوى.',
      helpNotice: 'عندك سؤال تاني مش موجود هنا؟ فريقنا معاك على مدار الساعة.',
      contactButton: 'تواصل معنا فوراً',
      items: [
        {
          id: 'faq-1',
          question: 'هل الخطة مناسبة ليا لو أنا لسه زيرو في المونتاج ومعنديش أي خبرة؟',
          answer:
            'أكيد طبعاً. الخطة متصممة تبدأ معاك من الصفر خطوة بخطوة، بنبدأ بأساسيات البرامج بطريقة مبسطة وعملية من غير تعقيد، لحد ما تتقن الأدوات وتبني بورتفوليو وتوصل لأول عميل.',
        },
        {
          id: 'faq-2',
          question: 'إيه إمكانيات الجهاز اللي محتاجها عشان أبدأ أطبق الخطة؟',
          answer:
            'مش محتاج جهاز خارق في البداية. أي جهاز كمبيوتر أو لابتوب متوسط بإمكانيات مقبولة يقدر يشغل البرامج الأساسية زي Premiere وAfter Effects هيكون كافي جداً تبدأ بيه وتطبق كل مشاريع الخطة.',
        },
        {
          id: 'faq-3',
          question: 'إزاي هوصل لملف الخطة بعد ما اشتري، وهل بيحتاج اشتراك مدفوع في نوشن؟',
          answer:
            'أول ما بتتم عملية الدفع هتاخد وصول فوري لملف نوشن المنظم. نوشن مجاني تماماً 100% ومش هتحتاج تدفع فيه أي اشتراك، مجرد ضغطة زرار Duplicate وهتلاقي الخطة كاملة في حسابك.',
        },
        {
          id: 'faq-4',
          question: 'هل الخطة بتضمنلي إني ألاقي عميل فعلاً بعد الـ 30 يوم؟',
          answer:
            'الخطة بتديك كل الأدوات، البورتفوليو، والاستراتيجيات اللي اتجربت ونجحت في جلب عملاء فعليين. لكن الوصول للعميل بيعتمد على تطبيقك العملي والتزامك بالخطوات واستمرارية السعي.',
        },
        {
          id: 'faq-5',
          question: 'هل الخطة فيديوهات مسجلة ولا نظامها إيه بالظبط؟',
          answer:
            'الخطة عبارة عن مساحة عمل تفاعلية على نوشن، مترتب فيها مسارك التعليمي بالكامل، فيها لينكات لأفضل الشروحات المجانية المجمعة بعناية، مهام عملية وتطبيقات، وقوالب ومصادر جاهزة توفر عليك شهور من البحث العشوائي.',
        },
      ],
    },
    modal: {
      badge: 'عرض الإطلاق الحصري',
      title: 'تأكيد حجز خطة CutToClient الشاملة',
      subtitle: 'سجل بياناتك عشان تحجز نسختك بسعر الإطلاق المخفض فوراً (399 ج.م).',
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
      submitButton: 'إتمام الطلب وتأكيد الحجز (399 ج.م)',
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
      tagline: 'خارطة طريق عملية تأخذك من الصفر حتى بناء بورتفوليو احترافي وجلب أول عميل مدفوع.',
      copyright: 'جميع الحقوق محفوظة © 2026 CutToClient Roadmap.',
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
        { label: 'تجارب الشباب', href: '#wall' },
        { label: 'سعر الباقة', href: '#pricing' },
        { label: 'الأسئلة الشائعة', href: '#faq' },
      ],
    },
  },
  en: {
    brand: {
      name: 'CutToClient Notion Roadmap',
      tagline: 'Your Complete Zero-to-First-Client Roadmap',
      ctaButton: 'Get The Plan Now',
      exploreButton: 'Explore Curriculum',
      lifetimeBadge: 'Lifetime Access + Free Updates Included',
      guaranteeText: 'Instant Notion Access & Continuous Guidance',
    },
    navbar: {
      roadmap: 'Overview',
      curriculum: 'Interactive Timeline',
      stack: 'Tech Stack',
      wall: 'Student Reviews',
      pricing: 'Pricing',
      faq: 'FAQ',
      cta: 'Get Access',
      switchLang: 'العربية',
      switchTheme: 'Toggle Theme',
    },
    hero: {
      pillBadge: 'Your Complete Zero-to-First-Client Roadmap',
      eyebrow: 'Your Complete Zero-to-First-Client Roadmap',
      headline: 'From Scratch to an In-Demand Video Editor with a Killer Portfolio & Paying Clients',
      headlinePart1: 'From Scratch to an In-Demand Video Editor with a',
      headlineHighlight: 'Killer Portfolio & Paying Clients',
      headlinePart2: '',
      subheadline:
        'Skip months of tutorial paralysis on YouTube. An interactive Notion roadmap that guides your every move: master market-demanded editing skills, build a high-converting portfolio, and land your first client fast.',
      description:
        'Skip months of tutorial paralysis on YouTube. An interactive Notion roadmap that guides your every move: master market-demanded editing skills, build a high-converting portfolio, and land your first client fast.',
      ctaPrimary: 'Get The Plan Now',
      ctaSecondary: 'Try Interactive Timeline',
      proofCount: '1,420+ Editors',
      proofSubtext: 'Broke out of tutorial paralysis and landed real paying clients',
      scrubHint: 'Drag the interactive timeline to explore all 4 actionable modules',
      timelineHeader: 'The Actionable Curriculum Timeline',
      currentTimeLabel: 'Roadmap Milestone Timecode',
    },
    stages: [
      {
        id: 'stage-1',
        index: 0,
        timecode: '00:00:15:00',
        badge: 'Module 1: Tools & Foundations',
        title: 'Module 1: Mastering Editing Tools & Core Foundations',
        subtitle: 'Curated YouTube gems, deep software mastery, and short-form architecture',
        description:
          "No more getting lost in endless complex interfaces and bloated tutorials. The roadmap gets straight to the point: a hand-curated, structured sequence of high-impact YouTube tutorials so you build rock-solid foundations before diving deep—saving you months of confusion. You'll master Premiere Pro and After Effects as extensions of your hand, learning how to assemble high-retention Reels at the exact standard freelance clients eagerly pay for.",
        tools: [
          { name: 'Premiere Pro', badge: 'Pr', color: '#5D5FEF' },
          { name: 'After Effects', badge: 'Ae', color: '#8B5CF6' },
          { name: 'Reels', badge: 'Reels', color: '#0EA5E9' },
        ],
        milestones: [
          'Premiere Pro Essentials',
          'After Effects Essentials',
          'Short-Form Reels Architecture',
        ],
        metric: { label: 'Solid Foundations & Practical Execution', value: 'Market-Ready for Reels' },
      },
      {
        id: 'stage-2',
        index: 1,
        timecode: '00:00:30:00',
        badge: 'Module 2: Visual Taste & Portfolio',
        title: 'Module 2: Visual Deconstruction & High-Converting Portfolio',
        subtitle: 'Analyze viral videos and build an undeniable portfolio',
        description:
          "Technical skills alone won't land clients—how your creative eye perceives pacing and how your work is showcased matters even more. In this module, you'll train your visual instincts by deconstructing viral high-performing videos. You will apply these insights immediately to craft a punchy, compelling portfolio that makes clients request you by name, even if you are just getting started.",
        tools: [
          { name: 'Visual Taste', badge: 'Eye', color: '#8B5CF6' },
          { name: 'Portfolio Building', badge: 'Port', color: '#6366F1' },
        ],
        milestones: [
          'Visual Deconstruction: How to reverse-engineer any inspiring video and understand exactly how it was created.',
          'Portfolio Building: Assemble a battle-tested, professional portfolio you can pitch with total confidence.',
        ],
        metric: { label: 'A Portfolio That Converts', value: 'High-Impact Showcase' },
      },
      {
        id: 'stage-3',
        index: 2,
        timecode: '00:00:45:00',
        badge: 'Module 3: Client Acquisition',
        title: 'Module 3: Battle-Tested Client Acquisition Strategies',
        subtitle: 'Two clear action plans to land your first client and build predictable income',
        description:
          'Forget generic advice like "make a profile on freelance sites and pray". In this module, you\'ll execute two proven, step-by-step game plans designed to land your first paying client in record time—and build a recurring client roster that depends on you for their weekly video production.',
        tools: [
          { name: 'Strategy 1', badge: 'S1', color: '#10B981' },
          { name: 'Strategy 2', badge: 'S2', color: '#0EA5E9' },
        ],
        milestones: [
          'Landing Your First Client (Strategy 1)',
          'Landing Your First Client (Strategy 2)',
        ],
        metric: { label: 'Real Client Acquisition', value: 'First Paid Client' },
      },
      {
        id: 'stage-4',
        index: 3,
        timecode: '00:01:00:00',
        badge: 'Module 4: Toolkit & Assets',
        title: 'Module 4: The Ultimate Editor’s Tool Vault',
        subtitle: 'Cinematic stock footage, huge icon packs, 3D elements, and ready-to-use SFX',
        description:
          'Never start from scratch or waste hours hunting for assets again. We curated the exact resources top industry editors use daily to dramatically accelerate turnaround times and elevate production quality: professional stock footage, massive icon libraries, 3D elements, and sound effects ready to drop straight into your timeline.',
        tools: [
          { name: 'Stock & SFX', badge: 'Vault', color: '#EC4899' },
          { name: '3D & Icons', badge: '3D', color: '#8B5CF6' },
        ],
        milestones: [],
        metric: { label: 'Time Saved & Velocity', value: '2x Faster Delivery' },
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
      badge: 'Student Reviews',
      title: 'Hear It for Yourself: How the Roadmap Took Them from Scratch to Paying Clients',
      subtitle:
        'Real voice notes from editors who were once stuck in tutorial hell—now getting paid monthly by creators and agencies.',
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
      badge: 'Launch Offer',
      title: '30-Day Video Editing Roadmap (From Scratch to First Dollar)',
      subtitle: 'One single payment. Lifetime access to all modules and future updates.',
      tierName: '30-Day Video Editing Roadmap (From Scratch to First Dollar)',
      tierSubtitle: 'One single payment. Lifetime access to all modules and future updates.',
      launchPrice: '399 EGP',
      originalPrice: '',
      discountBadge: 'Save 73% — Limited Time Launch Offer',
      period: 'One-time payment for lifetime access (No recurring fees)',
      ctaButton: 'Get The Plan Now',
      guaranteeBadge: '',
      guaranteeDetails: '',
      stackHeader: '',
      totalValueLabel: '',
      totalValue: '',
      includedBadge: '',
      bonusBadge: '',
      items: [],
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about CutToClient and accelerating your editing journey.',
      helpNotice: 'Have a question not answered here? Reach out to our community support anytime.',
      contactButton: 'Contact Support',
      items: [
        {
          id: 'faq-1',
          question: 'Is this roadmap suitable if I am a complete beginner with zero editing experience?',
          answer:
            'Absolutely. The roadmap was engineered from the ground up to take you step-by-step from zero. We start with the software essentials in a simple, practical, fluff-free format until you master the tools, assemble a killer portfolio, and close your very first paying client.',
        },
        {
          id: 'faq-2',
          question: 'What computer specs do I need to get started and apply the roadmap?',
          answer:
            "You don't need an expensive high-end machine to start. Any standard, mid-range desktop PC or laptop capable of running basic versions of Premiere Pro and After Effects is more than enough to follow along and execute every project in the plan.",
        },
        {
          id: 'faq-3',
          question: 'How do I access the roadmap after purchase, and does it require a paid Notion subscription?',
          answer:
            "Immediately after completing checkout, you'll receive instant access to your organized Notion workspace. Notion is 100% free forever—no paid plan required. With a single click on 'Duplicate', the entire roadmap copies straight into your own Notion account.",
        },
        {
          id: 'faq-4',
          question: 'Does the roadmap guarantee I will land a paying client after 30 days?',
          answer:
            'The roadmap hands you the exact tools, portfolio frameworks, and client acquisition strategies that have repeatedly produced real results. However, signing clients depends on your personal commitment, hands-on practice, and consistency.',
        },
        {
          id: 'faq-5',
          question: 'Is the roadmap pre-recorded video lectures, or how does it work exactly?',
          answer:
            'The roadmap is a structured, interactive Notion workspace designed as a clear roadmap. It combines hand-picked, carefully sequenced tutorials, practical milestone projects, production checklists, and asset vaults—saving you endless months of random, chaotic searching.',
        },
      ],
    },
    modal: {
      badge: 'Launch Offer',
      title: 'Secure Your CutToClient Roadmap Access',
      subtitle: 'Enter your details below to lock in the special launch price (399 EGP).',
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
      submitButton: 'Complete Order & Get Access (399 EGP)',
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
      tagline: 'Your step-by-step roadmap from absolute scratch to an in-demand video editor with paying clients.',
      copyright: 'All Rights Reserved © 2026 CutToClient Roadmap.',
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
        { label: 'Student Reviews', href: '#wall' },
        { label: 'Pricing Vault', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
  },
};
