import fs from 'fs';
import path from 'path';

export function generateAllLocales(messagesDir, enBase) {
  // 1. English
  fs.writeFileSync(path.join(messagesDir, 'en.json'), JSON.stringify(enBase, null, 2), 'utf-8');

  // 2. Arabic (العربية)
  const ar = JSON.parse(JSON.stringify(enBase));
  ar.home.metadata = {
    title: "Ironix — تدرّب بهدف. تقدّم بالأرقام والأدلة.",
    description: "تطبيق التمارين الرياضية المدعوم بالذكاء الاصطناعي مع تسجيل أوفلاين فوري، تشريح العضلات ثلاثي الأبعاد، بطاقة GymID الرقمية، وبطاقات المعارك التحفيزية."
  };
  ar.nav = {
    features: "المميزات",
    splitCalculator: "محدد الجداول",
    comparison: "المقارنة",
    howItWorks: "كيف يعمل",
    pricing: "الأسعار",
    testimonials: "آراء الأبطال",
    faq: "الأسئلة الشائعة",
    download: "تحميل التطبيق"
  };
  ar.hero = {
    badge: "لياقة بدنية بالذكاء الاصطناعي",
    title: "تدرّب بهدف واضح.",
    titleAccent: "وتقدّم بالأدلة والأرقام.",
    subtitle: "سجّل كل جولة، شاهد عضلاتك بتقنية 3D التفاعلية، استمع لمدرب الذكاء الاصطناعي، وادخل جيمك بلمسة واحدة — أوفلاين 100%.",
    ctaDownload: "حمّل الآن مجاناً",
    ctaLearnMore: "اكتشف المميزات",
    liveWorkout: "تمرين مباشر",
    set: "الجولة",
    reps: "تكرار",
    weight: "الوزن",
    logSet: "تسجيل الجولة",
    restTimer: "مؤقت الراحة",
    startWorkout: "بدء التمرين",
    finishWorkout: "إنهاء التمرين"
  };
  ar.socialProof = {
    downloads: "+50 ألف",
    downloadsLabel: "تحميل",
    rating: "4.9",
    ratingLabel: "تقييم المتجر",
    users: "+2.6 مليون",
    usersLabel: "مستخدم نشط"
  };
  ar.features = {
    title: "أطلق أقصى إمكانياتك البدنية",
    subtitle: "كل ما تحتاجه للتدريب بذكاء أكبر، ورفع أوزان أثقل، وتحقيق أهدافك بسرعة فائقة.",
    items: {
      "1": {
        title: "تسجيل أوفلاين فوري",
        description: "سجّل الجولات والتكرارات والأوزان بدون أي تأخير وبدون إنترنت."
      },
      "2": {
        title: "تشريح العضلات 3D",
        description: "خرائط حرارية مجسمة توضح شدة التمرين واستشفاء كل عضلة بدقة."
      },
      "3": {
        title: "مدرب صوتي ذكي",
        description: "توجيه صوتي فوري أثناء الجولات مع خطط تدريبية تتكيف معك تلقائياً."
      },
      "4": {
        title: "بطاقة GymID الرقمية",
        description: "ادخل ناديك الرياضي عبر رمز QR والباركود وتصاميم بطاقات حصرية."
      },
      "5": {
        title: "بطاقات المعارك والألعاب",
        description: "اجمع نقاط XP، وحافظ على سلسلة أيام التمرين، وشارك بطاقاتك مع أصدقائك."
      },
      "6": {
        title: "8 سمات تصميم فاخرة",
        description: "من مظهر Iron Dark الفولاذي إلى Cyber Neon المبهر."
      }
    }
  };
  ar.showcase = {
    title: "شاهد Ironix في الميدان",
    subtitle: "واجهة فائقة السرعة مصممة خصيصاً للأداء العالي وسهولة الاستخدام أثناء التمرين.",
    screens: {
      "1": "نظرة عامة على لوحة التحكم تعرض التقدم اليومي وسلسلة الاستمرارية.",
      "2": "مسجل التمارين الذكي مع واجهة بديهية ومؤقتات راحة دقيقة."
    }
  };
  ar.splitCalculator = {
    badge: "محدد الجداول وحجم التمرين بالذكاء الاصطناعي",
    title: "احسب جدولك التدريبي",
    titleAccent: "الأمثل لنمو العضلات",
    subtitle: "اختر جدول تمرينك ومستوى خبرتك لمشاهدة توقعات الحجم العضلي وزيادة القوة لـ 12 أسبوعاً مقبلة.",
    step1: "1. اختر نظام التدريب",
    step2: "2. اختر مستوى الخبرة",
    blueprintTitle: "مخطط الأداء الحيوي المتوقع",
    gainTitle: "زيادة متوقعة في القوة القصوى (1RM)",
    gainDesc: "في التمارين المركبة الأساسية على مدار 12 أسبوعاً من زيادة الأحمال التدريجية.",
    weeklyVolume: "حجم الجولات الأسبوعي",
    weeklyVolumeDesc: "المنطقة المثالية لتحفيز البناء العضلي وتفادي الإجهاد.",
    sqliteProof: "استجابة 0ms بقاعدة بيانات محلية",
    sqliteProofDesc: "مزامنة سريعة عبر أجهزتك دون أي بطء في الشبكة.",
    ctaPlan: "توليد جدول تدريبي مخصص",
    daysPerWeek: "أيام / أسبوع",
    levels: {
      beginner: "مبتدئ (0-1 سنة)",
      intermediate: "متوسط (1-3 سنوات)",
      advanced: "متقدم (3+ سنوات)"
    },
    splits: {
      ppl: {
        name: "دفع سحب أرجل (PPL)",
        desc: "نظام عالي التردد لاستهداف العضلات الأساسية مع 72 ساعة استشفاء مثالية."
      },
      upper_lower: {
        name: "علوي / سفلي",
        desc: "المعيار الذهبي لتوازن القوة والكثافة العضلية العالية."
      },
      full_body: {
        name: "جسم كامل 3x",
        desc: "أقصى تحفيز للألياف العضلية مع زيادة تخليق البروتين العضلي."
      },
      arnold: {
        name: "جدول آرنولد للتضخيم",
        desc: "سوبر ست عضلات متقابلة (صدر+ظهر، أكتاف+ذراعين، أرجل) لضخ دم خرافي وتناسق مذهل."
      }
    }
  };
  ar.comparison = {
    badge: "مقارنة هندسية شاملة",
    title: "لماذا يختار الرياضيون",
    titleAccent: "تطبيق Ironix؟",
    subtitle: "شاهد تفوق Ironix على تطبيقات التمارين التقليدية الأخرى.",
    featureCol: "الميزة / القدرة الهندسية",
    ironixCol: "Ironix",
    hevyCol: "Hevy",
    strongCol: "Strong",
    appleCol: "Apple Fitness+",
    whoopCol: "Whoop",
    ctaTitle: "جاهز لتجربة تطبيق أسرع وأذكى؟",
    ctaSubtitle: "انضم إلى أكثر من 2.6 مليون رياضي يتمرنون بدون تأخير مع تشريح 3D المتطور.",
    ctaButton: "حمّل Ironix الآن",
    features: {
      offline: "بنية أوفلاين 100% بدون إنترنت (SQLite)",
      offlineIronix: "استجابة 0ms فوري",
      offlineHevy: "انتظار السيرفرات (شاشة تحميل)",
      offlineStrong: "أوفلاين جزئي",
      anatomy3d: "تشريح العضلات 3D وخريطة حرارية",
      anatomyHevy: "رسومات 2D ثابتة",
      aiCoach: "مدرب صوتي بالذكاء الاصطناعي وشخصيات متعددة",
      aiCoachApple: "فيديوهات مسجلة مسبقاً",
      gymId: "بطاقة النادي GymID عبر NFC والباركود",
      velocity: "قياس سرعة التكرار بالحساسات الحركية",
      i18nRtl: "دعم عالمي لـ 19 لغة مع دعم كامل للغة العربية (RTL)",
      i18nIronix: "19 لغة + RTL كامل",
      i18nHevy: "5 لغات فقط",
      i18nStrong: "8 لغات فقط",
      i18nApple: "مناطق محدودة",
      i18nWhoop: "إنجليزية فقط",
      founderPass: "عضوية مدى الحياة بدفعة واحدة",
      founderIronix: "مدى الحياة 89.99$ (المؤسسين)",
      founderSubOnly: "اشتراك شهري/سنوي فقط",
      battlecards: "بطاقات ملخص التمارين المشوقة",
      themes: "8 سمات تصميم متقنة"
    }
  };
  ar.pricing = {
    badge: "أسعار شفافة • بدون إعلانات إطلاقاً",
    title: "استثمر في",
    titleAccent: "أعلى أداء بدني لك",
    subtitle: "ابدأ مجاناً 100% مع تسجيل التمارين أوفلاين، أو افتح جميع أدوات التشريح 3D والمدرب الذكي.",
    monthly: "دفع شهري",
    annual: "دفع سنوي",
    saveBadge: "وفّر 42%",
    freeTier: {
      name: "الباقة الأساسية",
      price: "0$",
      period: "/ مجاناً دائماً",
      badge: "الأساسية",
      desc: "كل ما تحتاجه لتسجيل تمارينك أوفلاين بسرعة 0ms وبدون أي قيود أساسية.",
      features: [
        "تسجيل أوفلاين 100% بدون إنترنت",
        "تمارين وسجلات غير محدودة",
        "بطاقة GymID الرقمية للنادي",
        "مؤقت الراحة وحاسبة أوزان البار",
        "تصدير واستيراد بيانات التمارين"
      ]
    },
    proTier: {
      name: "Ironix برو",
      priceMonthly: "4.99$",
      priceAnnual: "3.33$",
      period: "/ شهرياً",
      badge: "الأكثر طلباً",
      desc: "مدرب الذكاء الاصطناعي الكامل، الخرائط الحرارية 3D، وتحليلات التقدم المتقدمة.",
      features: [
        "جميع مميزات الباقة الأساسية",
        "تشريح العضلات 3D والخرائط الحرارية التفاعلية",
        "المدرب الصوتي بالذكاء الاصطناعي مع شخصيات مخصصة",
        "دخول GymID عبر NFC وثيمات بطاقات مخصصة",
        "قياس سرعة التكرارات بمستشعرات الحركة",
        "مزامنة سحابية غير محدودة عبر جميع أجهزتك",
        "فتح جميع سمات التطبيق الـ 8 الفاخرة"
      ]
    },
    founderTier: {
      name: "عضوية المؤسسين",
      price: "89.99$",
      period: "/ لمرة واحدة مدى الحياة",
      badge: "إصدار محدود",
      desc: "ادفع مرة واحدة واحصل على وصول دائم لجميع مميزات Pro الحالية والمستقبلية مدى الحياة.",
      features: [
        "وصول دائم لجميع مميزات Ironix Pro للأبد",
        "أيقونة التطبيق والشارة الذهبية الحصرية للمؤسسين",
        "أولوية طلب الميزات والتحديثات التجريبية",
        "تواصل مباشر مع فريق المطورين الأساسي عبر Discord",
        "بدون أي اشتراكات دورية نهائياً"
      ]
    },
    guarantee: "ضمان استرجاع الأموال خلال 30 يوماً • إلغاء في أي وقت • بدون رسوم خفية",
    getStarted: "ابدأ مجاناً الآن",
    startTrial: "ابدأ تجربة Pro لـ 7 أيام",
    getFounder: "احصل على عضوية المؤسسين"
  };
  ar.downloadCta = {
    title: "جاهز لتغيير مستوى تمرينك بالكامل؟",
    subtitle: "حمّل Ironix اليوم وعِش مستقبل تسجيل ومتابعة اللياقة البدنية.",
    badges: "متوفر على iOS و Android و Huawei AppGallery"
  };
  ar.faq = {
    title: "الأسئلة الشائعة",
    questions: {
      "1": {
        question: "هل تطبيق Ironix يعمل فعلاً بدون إنترنت (أوفلاين)؟",
        answer: "نعم 100%! يمكنك تسجيل كافة تمارينك وجولاتك وأوزانك بدون الحاجة للاتصال بالإنترنت، وتتم المزامنة تلقائياً عند توفر الشبكة."
      },
      "2": {
        question: "هل التطبيق مجاني؟",
        answer: "نعم، يقدم Ironix باقة مجانية أساسية مدى الحياة بدون إعلانات، مع توفر باقة Pro للميزات المتقدمة كالتشريح ثلاثي الأبعاد والمدرب الصوتي."
      },
      "3": {
        question: "ما هي المنصات المدعومة؟",
        answer: "يتوفر Ironix على متجر App Store (iOS) و Google Play (Android) و Huawei AppGallery."
      },
      "4": {
        question: "كيف تعمل بطاقة GymID الرقمية؟",
        answer: "يمكنك حفظ باركود أو رمز QR لعضويتك بالنادي داخل التطبيق أو الدخول عبر NFC بلمسة واحدة."
      },
      "5": {
        question: "هل بيانات تماريني وصحتي محمية وخاصة؟",
        answer: "نحن نضع خصوصيتك في المقام الأول. بياناتك محفوظة محلياً وتتحكم بالكامل بما تشاركه."
      },
      "6": {
        question: "هل يمكنني استيراد بياناتي من تطبيقات أخرى؟",
        answer: "نعم، ندعم استيراد سجل التمارين بسهولة عبر ملفات CSV من أشهر تطبيقات اللياقة البدنية."
      }
    }
  };
  ar.footer = {
    brand: "Ironix",
    tagline: "تدرّب بهدف. تقدّم بالأدلة والأرقام.",
    productLinks: "المنتج",
    companyLinks: "الشركة",
    legalLinks: "الشروط القانونية",
    newsletter: "اشترك في نشرتنا البريدية للحصول على نصائح تدريبية وتحديثات التطبيق.",
    copyright: "© 2026 Ironix. جميع الحقوق محفوظة.",
    socialLinks: "حسابات التواصل"
  };
  ar.privacy.title = "سياسة الخصوصية";
  ar.terms.title = "شروط الاستخدام والخدمة";

  fs.writeFileSync(path.join(messagesDir, 'ar.json'), JSON.stringify(ar, null, 2), 'utf-8');

  // Helper to build other languages based on key locales
  const otherLanguages = [
    {
      code: 'es',
      name: 'Español',
      title: "Ironix — Entrena con propósito. Progresa con pruebas.",
      badge: "Fitness con Inteligencia Artificial",
      heroTitle: "Entrena con propósito.",
      heroAccent: "Progresa con pruebas.",
      heroSub: "Registra cada serie, visualiza tus músculos en 3D, recibe asesoramiento de IA y lleva tu pase de gimnasio en la muñeca, 100% offline.",
      ctaDownload: "Descargar gratis",
      ctaLearnMore: "Saber más",
      splitTitle: "Calcula tu rutina",
      splitAccent: "óptima de hipertrofia",
      compareTitle: "¿Por qué los atletas serios",
      compareAccent: "eligen Ironix?",
      pricingTitle: "Invierte en tu",
      pricingAccent: "máximo rendimiento",
      freeName: "Core Gratis",
      proName: "Ironix Pro",
      founderName: "Pase de Fundador",
      monthly: "Facturación mensual",
      annual: "Facturación anual",
      saveBadge: "Ahorra 42%"
    },
    {
      code: 'fr',
      name: 'Français',
      title: "Ironix — Entraînez-vous avec intention. Progressez avec des preuves.",
      badge: "Fitness propulsé par l'IA",
      heroTitle: "Entraînez-vous avec intention.",
      heroAccent: "Progressez avec des preuves.",
      heroSub: "Enregistrez chaque série, visualisez vos muscles en 3D, profitez d'un coach IA et gardez votre passe de gym au poignet — hors-ligne en priorité.",
      ctaDownload: "Télécharger gratuitement",
      ctaLearnMore: "En savoir plus",
      splitTitle: "Calculez votre programme",
      splitAccent: "d'hypertrophie optimal",
      compareTitle: "Pourquoi les athlètes exigeants",
      compareAccent: "choisissent Ironix",
      pricingTitle: "Investissez dans votre",
      pricingAccent: "performance maximale",
      freeName: "Core Gratuit",
      proName: "Ironix Pro",
      founderName: "Passe Fondateur",
      monthly: "Facturation mensuelle",
      annual: "Facturation annuelle",
      saveBadge: "Économisez 42%"
    },
    {
      code: 'de',
      name: 'Deutsch',
      title: "Ironix — Trainiere mit Ziel. Wachse mit Beweisen.",
      badge: "KI-gestützte Fitness",
      heroTitle: "Trainiere mit Ziel.",
      heroAccent: "Wachse mit Beweisen.",
      heroSub: "Logge jeden Satz, visualisiere deine Muskeln in 3D, erhalte KI-Coaching und trage deinen Gym-Pass am Handgelenk — 100% Offline-First.",
      ctaDownload: "Jetzt herunterladen",
      ctaLearnMore: "Mehr erfahren",
      splitTitle: "Berechne deinen optimalen",
      splitAccent: "Trainings-Split",
      compareTitle: "Warum ambitionierte Athleten",
      compareAccent: "Ironix wählen",
      pricingTitle: "Investiere in deine",
      pricingAccent: "Höchstleistung",
      freeName: "Core Kostenlos",
      proName: "Ironix Pro",
      founderName: "Gründer-Pass",
      monthly: "Monatliche Abrechnung",
      annual: "Jährliche Abrechnung",
      saveBadge: "42% sparen"
    },
    {
      code: 'zh',
      name: '中文',
      title: "Ironix — 目标明确的训练，用数据见证进步。",
      badge: "AI 驱动的专业健身",
      heroTitle: "目标明确的训练。",
      heroAccent: "用数据见证进步。",
      heroSub: "离线记录每组动作，3D 可视化肌肉热力图，实时 AI 语音指导，腕上数字 GymID 健身卡。",
      ctaDownload: "立即免费下载",
      ctaLearnMore: "了解更多",
      splitTitle: "计算您的最佳",
      splitAccent: "肌肥大分化训练方案",
      compareTitle: "为什么硬核健身者",
      compareAccent: "选择 Ironix",
      pricingTitle: "投资您的",
      pricingAccent: "巅峰运动表现",
      freeName: "核心免费版",
      proName: "Ironix Pro 专业版",
      founderName: "终身创始人卡",
      monthly: "按月订阅",
      annual: "按年订阅",
      saveBadge: "立省 42%"
    },
    {
      code: 'ja',
      name: '日本語',
      title: "Ironix — 目的を持って鍛え、証拠を持って成長する。",
      badge: "AI搭載フィットネス",
      heroTitle: "目的を持って鍛え、",
      heroAccent: "証拠を持って成長する。",
      heroSub: "すべてのセットをオフラインで記録、3D筋肉アナトミー、AI音声コーチング、スマートなGymIDパスを腕元に。",
      ctaDownload: "今すぐ無料ダウンロード",
      ctaLearnMore: "詳しく見る",
      splitTitle: "最適な",
      splitAccent: "筋肥大分割法を計算",
      compareTitle: "本格的なアスリートが",
      compareAccent: "Ironixを選ぶ理由",
      pricingTitle: "あなたの",
      pricingAccent: "最高パフォーマンスへ投資",
      freeName: "コア無料版",
      proName: "Ironix Pro",
      founderName: "ファウンダーパス",
      monthly: "月額払い",
      annual: "年額払い",
      saveBadge: "42% お得"
    },
    {
      code: 'pt',
      name: 'Português',
      title: "Ironix — Treine com propósito. Evolua com provas.",
      badge: "Fitness com Inteligência Artificial",
      heroTitle: "Treine com propósito.",
      heroAccent: "Evolua com provas.",
      heroSub: "Registe cada série, visualize os seus músculos em 3D, receba coaching por IA e leve o seu passe de ginásio no pulso — 100% offline.",
      ctaDownload: "Descarregar agora",
      ctaLearnMore: "Saber mais",
      splitTitle: "Calcule a sua divisão",
      splitAccent: "ideal de treino",
      compareTitle: "Por que atletas dedicados",
      compareAccent: "escolhem o Ironix",
      pricingTitle: "Invista na sua",
      pricingAccent: "alta performance",
      freeName: "Core Grátis",
      proName: "Ironix Pro",
      founderName: "Passe Fundador",
      monthly: "Faturação mensal",
      annual: "Faturação anual",
      saveBadge: "Poupe 42%"
    },
    {
      code: 'ru',
      name: 'Русский',
      title: "Ironix — Тренируйтесь с целью. Растите с доказательствами.",
      badge: "Фитнес на базе ИИ",
      heroTitle: "Тренируйтесь с целью.",
      heroAccent: "Растите с доказательствами.",
      heroSub: "Записывайте каждый подход без интернета, изучайте 3D-анатомию мышц, слушайте ИИ-тренера и держите пропуск в зал на запястье.",
      ctaDownload: "Скачать бесплатно",
      ctaLearnMore: "Узнать больше",
      splitTitle: "Рассчитайте оптимальный",
      splitAccent: "сплит для гипертрофии",
      compareTitle: "Почему серьезные атлеты",
      compareAccent: "выбирают Ironix",
      pricingTitle: "Инвестируйте в свои",
      pricingAccent: "пиковые результаты",
      freeName: "Базовый бесплатно",
      proName: "Ironix Pro",
      founderName: "Пропуск основателя",
      monthly: "Ежемесячно",
      annual: "Ежегодно",
      saveBadge: "Скидка 42%"
    },
    {
      code: 'hi',
      name: 'हिन्दी',
      title: "Ironix — लक्ष्य के साथ अभ्यास करें। प्रमाण के साथ प्रगति करें।",
      badge: "एआई-संचालित फिटनेस",
      heroTitle: "लक्ष्य के साथ अभ्यास करें।",
      heroAccent: "प्रमाण के साथ प्रगति करें।",
      heroSub: "हर सेट को ऑफलाइन रिकॉर्ड करें, 3D मांसपेशियों की बनावट देखें, AI कोच से मार्गदर्शन लें और कलाई पर जिम पास रखें।",
      ctaDownload: "अभी डाउनलोड करें",
      ctaLearnMore: "और जानें",
      splitTitle: "अपना इष्टतम",
      splitAccent: "वर्कआउट स्प्लिट गणना करें",
      compareTitle: "गंभीर एथलीट",
      compareAccent: "Ironix क्यों चुनते हैं",
      pricingTitle: "अपने",
      pricingAccent: "सर्वश्रेष्ठ प्रदर्शन में निवेश करें",
      freeName: "कोर फ्री",
      proName: "Ironix प्रो",
      founderName: "फाउंडर पास",
      monthly: "मासिक बिलिंग",
      annual: "वार्षिक बिलिंग",
      saveBadge: "42% बचाएं"
    },
    {
      code: 'tr',
      name: 'Türkçe',
      title: "Ironix — Hedefle çalış. Kanıtla ilerle.",
      badge: "Yapay Zeka Destekli Fitness",
      heroTitle: "Hedefle çalış.",
      heroAccent: "Kanıtla ilerle.",
      heroSub: "Her seti internetsiz kaydet, 3D kas anatomisini incele, yapay zeka koçundan rehberlik al ve salon kartını bileğinde taşı.",
      ctaDownload: "Hemen İndir",
      ctaLearnMore: "Daha Fazla Bilgi",
      splitTitle: "Optimal Antrenman",
      splitAccent: "Programını Hesapla",
      compareTitle: "Ciddi Sporcular Neden",
      compareAccent: "Ironix'i Seçiyor?",
      pricingTitle: "Zirve Performansına",
      pricingAccent: "Yatırım Yap",
      freeName: "Core Ücretsiz",
      proName: "Ironix Pro",
      founderName: "Kurucu Kartı",
      monthly: "Aylık Ödeme",
      annual: "Yıllık Ödeme",
      saveBadge: "%42 Tasarruf"
    },
    {
      code: 'id',
      name: 'Bahasa Indonesia',
      title: "Ironix — Latihan dengan tujuan. Maju dengan bukti nyata.",
      badge: "Fitness Bertenaga AI",
      heroTitle: "Latihan dengan tujuan.",
      heroAccent: "Maju dengan bukti nyata.",
      heroSub: "Catat setiap set tanpa internet, visualisasikan otot dalam 3D, dapatkan bimbingan pelatih AI, dan simpan pass gym di pergelangan tangan.",
      ctaDownload: "Unduh Sekarang",
      ctaLearnMore: "Pelajari Lebih Lanjut",
      splitTitle: "Hitung Split Latihan",
      splitAccent: "Optimal Anda",
      compareTitle: "Mengapa Atlet Serius",
      compareAccent: "Memilih Ironix",
      pricingTitle: "Investasikan untuk",
      pricingAccent: "Performa Puncak Anda",
      freeName: "Core Gratis",
      proName: "Ironix Pro",
      founderName: "Pass Founder",
      monthly: "Tagihan Bulanan",
      annual: "Tagihan Tahunan",
      saveBadge: "Hemat 42%"
    },
    {
      code: 'ko',
      name: '한국어',
      title: "Ironix — 목표를 갖고 훈련하고, 데이터로 증명하라.",
      badge: "AI 기반 스마트 피트니스",
      heroTitle: "목표를 갖고 훈련하고,",
      heroAccent: "데이터로 증명하라.",
      heroSub: "오프라인으로 모든 세트 기록, 3D 근육 해부도 시각화, AI 음성 코칭, 스마트 디지털 GymID 패스.",
      ctaDownload: "지금 무료 다운로드",
      ctaLearnMore: "자세히 알아보기",
      splitTitle: "최적의 맞춤형",
      splitAccent: "분할 루틴 계산하기",
      compareTitle: "진지한 운동인들이",
      compareAccent: "Ironix를 선택하는 이유",
      pricingTitle: "당신의",
      pricingAccent: "최고 퍼포먼스에 투자하세요",
      freeName: "코어 무료",
      proName: "Ironix Pro",
      founderName: "파운더 평생 패스",
      monthly: "월간 결제",
      annual: "연간 결제",
      saveBadge: "42% 절약"
    },
    {
      code: 'it',
      name: 'Italiano',
      title: "Ironix — Allenati con uno scopo. Progredisci con le prove.",
      badge: "Fitness Guidato dall'IA",
      heroTitle: "Allenati con uno scopo.",
      heroAccent: "Progredisci con le prove.",
      heroSub: "Registra ogni serie offline, visualizza i muscoli in 3D, ricevi coaching vocale IA e porta il pass palestra al polso.",
      ctaDownload: "Scarica Gratis",
      ctaLearnMore: "Scopri di più",
      splitTitle: "Calcola la tua scheda",
      splitAccent: "ottimale di ipertrofia",
      compareTitle: "Perché gli atleti seri",
      compareAccent: "scelgono Ironix",
      pricingTitle: "Investi nella tua",
      pricingAccent: "massima prestazione",
      freeName: "Core Gratuito",
      proName: "Ironix Pro",
      founderName: "Pass Fondatore",
      monthly: "Fatturazione mensile",
      annual: "Fatturazione annuale",
      saveBadge: "Risparmia il 42%"
    },
    {
      code: 'nl',
      name: 'Nederlands',
      title: "Ironix — Train doelgericht. Groei met bewijs.",
      badge: "AI-gedreven Fitness",
      heroTitle: "Train doelgericht.",
      heroAccent: "Groei met bewijs.",
      heroSub: "Log elke set 100% offline, bekijk je spieren in 3D, krijg AI-coaching en draag je gym-pas om je pols.",
      ctaDownload: "Download Nu",
      ctaLearnMore: "Meer informatie",
      splitTitle: "Bereken jouw optimale",
      splitAccent: "trainingsschema",
      compareTitle: "Waarom serieuze atleten",
      compareAccent: "voor Ironix kiezen",
      pricingTitle: "Investeer in jouw",
      pricingAccent: "topprestaties",
      freeName: "Core Gratis",
      proName: "Ironix Pro",
      founderName: "Founder Pas",
      monthly: "Maandelijkse facturatie",
      annual: "Jaarlijkse facturatie",
      saveBadge: "Bespaar 42%"
    },
    {
      code: 'pl',
      name: 'Polski',
      title: "Ironix — Trenuj z celem. Rozwijaj się z dowodami.",
      badge: "Fitness napędzany przez AI",
      heroTitle: "Trenuj z celem.",
      heroAccent: "Rozwijaj się z dowodami.",
      heroSub: "Zapisuj każdą serię w trybie offline, oglądaj mięśnie w 3D, korzystaj z trenera AI i miej karnet na siłownię na nadgarstku.",
      ctaDownload: "Pobierz Teraz",
      ctaLearnMore: "Dowiedz się więcej",
      splitTitle: "Oblicz swój optymalny",
      splitAccent: "split treningowy",
      compareTitle: "Dlaczego ambitni sportowcy",
      compareAccent: "wybierają Ironix",
      pricingTitle: "Zainwestuj w swoją",
      pricingAccent: "szczytową formę",
      freeName: "Core Bezpłatny",
      proName: "Ironix Pro",
      founderName: "Karnet Założyciela",
      monthly: "Płatność miesięczna",
      annual: "Płatność roczna",
      saveBadge: "Zaoszczędź 42%"
    },
    {
      code: 'th',
      name: 'ไทย',
      title: "Ironix — ฝึกซ้อมอย่างมีเป้าหมาย พัฒนาด้วยข้อมูลที่พิสูจน์ได้",
      badge: "ฟิตเนสขับเคลื่อนด้วย AI",
      heroTitle: "ฝึกซ้อมอย่างมีเป้าหมาย",
      heroAccent: "พัฒนาด้วยข้อมูลที่พิสูจน์ได้",
      heroSub: "บันทึกทุกเซ็ตแบบออฟไลน์ 100% ดูภาพจำลองกล้ามเนื้อ 3D พร้อมโค้ชเสียง AI และบัตรยิมดิจิทัลบนข้อมือ",
      ctaDownload: "ดาวน์โหลดฟรีทันที",
      ctaLearnMore: "ดูรายละเอียดเพิ่มเติม",
      splitTitle: "คำนวณตารางฝึกซ้อม",
      splitAccent: "ที่เหมาะสมที่สุดสำหรับคุณ",
      compareTitle: "ทำไมนักกีฬาที่จริงจัง",
      compareAccent: "ถึงเลือก Ironix",
      pricingTitle: "ลงทุนเพื่อ",
      pricingAccent: "ประสิทธิภาพสูงสุดของคุณ",
      freeName: "Core ฟรี",
      proName: "Ironix Pro",
      founderName: "Founder Pass ตลอดชีพ",
      monthly: "ชำระรายเดือน",
      annual: "ชำระรายปี",
      saveBadge: "ประหยัด 42%"
    },
    {
      code: 'vi',
      name: 'Tiếng Việt',
      title: "Ironix — Tập luyện có mục đích. Tiến bộ có bằng chứng.",
      badge: "Thể hình hỗ trợ bởi AI",
      heroTitle: "Tập luyện có mục đích.",
      heroAccent: "Tiến bộ có bằng chứng.",
      heroSub: "Ghi chép từng hiệp tập ngoại tuyến không độ trễ, giải phẫu cơ bắp 3D, huấn luyện viên giọng nói AI và thẻ GymID ngay trên cổ tay.",
      ctaDownload: "Tải ngay miễn phí",
      ctaLearnMore: "Tìm hiểu thêm",
      splitTitle: "Tính toán lịch tập",
      splitAccent: "tối ưu nhất cho bạn",
      compareTitle: "Tại sao các vận động viên",
      compareAccent: "lựa chọn Ironix",
      pricingTitle: "Đầu tư cho",
      pricingAccent: "hiệu suất đỉnh cao",
      freeName: "Core Miễn Phí",
      proName: "Ironix Pro",
      founderName: "Thẻ Sáng Lập",
      monthly: "Thanh toán theo tháng",
      annual: "Thanh toán theo năm",
      saveBadge: "Tiết kiệm 42%"
    },
    {
      code: 'uk',
      name: 'Українська',
      title: "Ironix — Тренуйтеся з метою. Прогресуйте з доказами.",
      badge: "Фітнес на базі ШІ",
      heroTitle: "Тренуйтеся з метою.",
      heroAccent: "Прогресуйте з доказами.",
      heroSub: "Записуйте кожен підхід офлайн, досліджуйте 3D-анатомію м'язів, слухайте тренера ШІ та тримайте абонемент у зал на зап'ясті.",
      ctaDownload: "Завантажити безкоштовно",
      ctaLearnMore: "Дізнатися більше",
      splitTitle: "Розрахуйте оптимальний",
      splitAccent: "тренувальний спліт",
      compareTitle: "Чому серйозні атлети",
      compareAccent: "обирають Ironix",
      pricingTitle: "Інвестуйте у свої",
      pricingAccent: "найкращі результати",
      freeName: "Core Безкоштовно",
      proName: "Ironix Pro",
      founderName: "Абонемент Засновника",
      monthly: "Щомісячна оплата",
      annual: "Щорічна оплата",
      saveBadge: "Знижка 42%"
    }
  ];

  for (const item of otherLanguages) {
    const loc = JSON.parse(JSON.stringify(enBase));
    loc.home.metadata.title = item.title;
    loc.hero.badge = item.badge;
    loc.hero.title = item.heroTitle;
    loc.hero.titleAccent = item.heroAccent;
    loc.hero.subtitle = item.heroSub;
    loc.hero.ctaDownload = item.ctaDownload;
    loc.hero.ctaLearnMore = item.ctaLearnMore;

    loc.splitCalculator.title = item.splitTitle;
    loc.splitCalculator.titleAccent = item.splitAccent;

    loc.comparison.title = item.compareTitle;
    loc.comparison.titleAccent = item.compareAccent;

    loc.pricing.title = item.pricingTitle;
    loc.pricing.titleAccent = item.pricingAccent;
    loc.pricing.monthly = item.monthly;
    loc.pricing.annual = item.annual;
    loc.pricing.saveBadge = item.saveBadge;
    loc.pricing.freeTier.name = item.freeName;
    loc.pricing.proTier.name = item.proName;
    loc.pricing.founderTier.name = item.founderName;

    fs.writeFileSync(path.join(messagesDir, `${item.code}.json`), JSON.stringify(loc, null, 2), 'utf-8');
  }
}
