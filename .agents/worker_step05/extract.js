const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');

// Read files
const i18nJs = fs.readFileSync(path.join(root, 'prototype/kaqua-i18n.jsx'), 'utf8');
const pagesJs = fs.readFileSync(path.join(root, 'prototype/kaqua-i18n-pages.jsx'), 'utf8');
const pagesArJs = fs.readFileSync(path.join(root, 'prototype/kaqua-i18n-pages-ar.jsx'), 'utf8');
const geoJs = fs.readFileSync(path.join(root, 'prototype/kaqua-geo.jsx'), 'utf8');

// Extract K_I18N
const kI18nStart = i18nJs.indexOf('const K_I18N = {');
const kI18nEnd = i18nJs.indexOf('const KLangContext');
const kI18nCode = i18nJs.substring(kI18nStart, kI18nEnd);

// Extract K_PAGES_I18N.de
const pagesStart = pagesJs.indexOf('K_PAGES_I18N.de = {');
const pagesEnd = pagesJs.indexOf('Object.assign(window');
const pagesCode = pagesJs.substring(pagesStart, pagesEnd);

// Extract K_PAGES_I18N.en and .ar
const pagesArStart = pagesArJs.indexOf('K_PAGES_I18N.en = {');
const pagesArEnd = pagesArJs.lastIndexOf('};');
const pagesArCode = pagesArJs.substring(pagesArStart, pagesArEnd + 2);

// Extract K_GEO
const kGeoStart = geoJs.indexOf('const K_GEO = [');
const kGeoEnd = geoJs.indexOf('function geoDist');
const kGeoCode = geoJs.substring(kGeoStart, kGeoEnd);

// Context for eval
const context = {
  K_PAGES_I18N: { de: {}, en: {}, ar: {} }
};

// Evaluate i18n code
const evalEnv = (code) => {
  const fn = new Function('K_PAGES_I18N', `${code}; return { K_I18N, K_PAGES_I18N };`);
  return fn(context.K_PAGES_I18N);
};

// 1. Get K_I18N
let tempEnv = evalEnv(kI18nCode);
const K_I18N = tempEnv.K_I18N;

// 2. Get K_PAGES_I18N.de
const tempDeEnv = new Function('K_PAGES_I18N', `${pagesCode}; return K_PAGES_I18N;`);
context.K_PAGES_I18N = tempDeEnv(context.K_PAGES_I18N);

// 3. Get K_PAGES_I18N.en and .ar
const tempEnArEnv = new Function('K_PAGES_I18N', `${pagesArCode}; return K_PAGES_I18N;`);
context.K_PAGES_I18N = tempEnArEnv(context.K_PAGES_I18N);

// 4. Get K_GEO
const tempGeoEnv = new Function(`${kGeoCode}; return K_GEO;`);
const K_GEO = tempGeoEnv();

// Clean up: K_GEO contains items. We need their translations.
const geoTranslations = {
  en: {
    frankfurt: {
      regulator: "DVGW / Drinking Water Ordinance (TrinkwV)",
      water: "Hard water (14–20 °dH) — corrosion-free PP-R/PP-RCT prevents scale incrustation on rough metal surfaces.",
      focus: ["High-rise riser pipes (Banking District)", "Hotel & office renovation", "Data center cooling water"],
      note: "In the Rhine-Main region, K-Aqua delivers ex-works Waldsolms — often on the same day."
    },
    berlin: {
      regulator: "DVGW / TrinkwV, Berliner Wasserbetriebe",
      water: "Moderately hard water from bank filtrate — hygienic neutrality of PP prevents biofilm formation in extensive networks.",
      focus: ["New residential quarters", "School & administrative buildings", "Renovation of existing old buildings"],
      note: "Major projects in the capital region are delivered via forwarding partners within 24 hours."
    },
    muenchen: {
      regulator: "DVGW / TrinkwV, SWM",
      water: "Soft Alpine water with a low pH range — PP is stable where copper faces increased solubility.",
      focus: ["Premium residential construction", "Hospital & laboratory construction", "Brewery & process water"],
      note: "Southern Germany logistics via overnight delivery; on-site welding training can be booked."
    },
    hamburg: {
      regulator: "DVGW / TrinkwV, Hamburg Wasser",
      water: "Soft to moderately hard groundwater — taste-neutral PP systems preserve the high raw water quality.",
      focus: ["HafenCity new development", "Hotels", "Maritime utility engineering"],
      note: "Northern Germany from stock; large dimensions d250+ project-specific directly from extrusion."
    },
    wien: {
      regulator: "ÖVGW / Drinking Water Ordinance (AT)",
      water: "Mountain spring water of excellent quality — value preservation through absolutely inert pipe materials.",
      focus: ["Municipal housing renovation", "Hotel & commercial projects", "District heating sub-distribution"],
      note: "EU internal market: no customs formalities, delivery in 48 hours."
    },
    zuerich: {
      regulator: "SVGW / TBDV",
      water: "Lake and spring water mix — Swiss hygiene requirements demand certified material neutrality.",
      focus: ["High-end residential construction", "Bank & office renovation", "Hospital construction"],
      note: "Export processing including Swiss certificates of conformity from a single source."
    },
    london: {
      regulator: "WRAS — Water Regulations Approval Scheme",
      water: "Very hard water (Thames Basin) — PP-RCT remains free from scale build-up and cross-section narrowing.",
      focus: ["High-rise residential", "Heritage renovation", "District-wide hot water networks"],
      note: "WRAS-compliant documentation and English data sheets available."
    },
    paris: {
      regulator: "ACS — Attestation de Conformité Sanitaire",
      water: "Hard Seine water with lime load — smooth PP inner surfaces keep pressure losses constant over decades.",
      focus: ["Grand Paris residential quarters", "Hotel & heritage renovation", "Olympic legacy reuse"],
      note: "ACS certificates of conformity and French installation guidelines included."
    },
    mailand: {
      regulator: "DM 174/2004 (Drinking Water Contact, IT)",
      water: "Groundwater from the Po Valley with high hardness — scale-free systems perceptibly reduce maintenance costs.",
      focus: ["Porta Nuova high-rise cluster", "Fashion & retail flagships", "Northern Italy industry"],
      note: "Alpine transit logistics 48–72 hours; Italian documentation available."
    },
    warschau: {
      regulator: "PZH Hygiene Certificate (Państwowy Zakład Higieny)",
      water: "Vistula bank filtrate — fast-growing housing market with high demand for fast-to-install systems.",
      focus: ["New residential quarters", "Logistics & industrial halls", "Modernization of prefabricated concrete buildings"],
      note: "EU logistics 24–48 hours; Polish processing guidelines available."
    },
    prag: {
      regulator: "SZÚ Hygiene Approval (CZ)",
      water: "Vltava reservoir water — stable quality, strong renovation market in historical buildings.",
      focus: ["Old building riser renovation", "Hotels", "Automotive supply industry"],
      note: "Neighboring market ex-works: delivery in 24 hours, technical hotline in German and English."
    },
    dubai: {
      regulator: "DEWA — Dubai Electricity & Water Authority",
      water: "Desalinated seawater with high chloride load and continuous temperatures >30 °C — the core scenario for PP-RCT temperature reserves.",
      focus: ["Super-high-rise towers", "Hotel resorts", "District cooling make-up"],
      note: "Ocean freight FCL from Hamburg; butt fusion welding supervision can be booked on site."
    },
    abudhabi: {
      regulator: "DoE Abu Dhabi / Estidama",
      water: "Desalinated water with post-hardening — Estidama sustainability points reward recyclable pipe materials.",
      focus: ["Government & cultural buildings", "Saadiyat resorts", "KIZAD industrial zones"],
      note: "Estidama Pearl Rating documentation (material transparency) is attached to the quote."
    },
    doha: {
      regulator: "Kahramaa — Qatar General Electricity & Water Corp.",
      water: "99% desalinated water, network temperatures up to 40 °C in summer — long-term hydrostatic strength is the key selection criterion.",
      focus: ["Lusail city development", "Stadium legacy reuse", "Hospitality"],
      note: "Kahramaa QCS-compliant submittal packages and third-party test reports available."
    },
    riad: {
      regulator: "SASO / Saudi Water Authority",
      water: "Mix of desalination (SWCC pipelines) and fossil groundwater — extreme summer heat demands PP-RCT reserves.",
      focus: ["Vision 2030 Giga projects", "King Salman Park", "Residential city expansions"],
      note: "SASO certification and SABER registration are provided on a project-specific basis."
    },
    dschidda: {
      regulator: "SASO / SWCC",
      water: "Red Sea desalination with high local salt load — absolute freedom from corrosion is a knock-out criterion against metal here.",
      focus: ["Jeddah Central Project", "Port & logistics buildings", "Pilgrim hospitality (Makkah corridor)"],
      note: "Ocean freight directly to Jeddah Islamic Port; Arabic data sheets in progress."
    },
    neom: {
      regulator: "NEOM Authority / SASO",
      water: "100% renewable-powered desalination planned — the project demands fully circular materials: Recycling Code 5 included.",
      focus: ["Linear city infrastructure", "Oxagon industrial port", "Trojena mountain resorts"],
      note: "Early planning phase: K-Aqua supports with EPD data and parametric piping network models."
    },
    kuwait: {
      regulator: "MEW — Ministry of Electricity & Water",
      water: "Desalinated Gulf water mixed with brackish water — chloride-resistant plastic systems are the standard recommendation.",
      focus: ["Silk City planning", "Residential cities (PAHW)", "Oil & gas auxiliary infrastructure"],
      note: "MEW pre-qualification via local partners; delivery via Shuwaikh Port."
    },
    maskat: {
      regulator: "Nama Water Services (formerly Diam)",
      water: "Desalination plus Aflaj tradition — Oman rewards durable, low-maintenance systems in public tenders.",
      focus: ["Duqm port city", "Hotel & tourism projects", "Mosque & cultural buildings"],
      note: "GCC logistics corridor via Jebel Ali; technical acceptance according to Nama protocol."
    },
    manama: {
      regulator: "EWA — Electricity & Water Authority",
      water: "Fully desalinated network with high summer temperatures — PP-RCT maintains the pressure reserve where PVC ages.",
      focus: ["Bahrain Bay", "Banking district renovation", "Island developments"],
      note: "Compact market with short distances — complete packages including welding equipment rental."
    },
    amman: {
      regulator: "WAJ — Water Authority of Jordan / Miyahuna",
      water: "One of the most water-scarce countries in the world — leak-free welded joints are active water conservation policy (Non-Revenue Water < 2%).",
      focus: ["Disi pipeline sub-networks", "Hospital & university construction", "Refugee camp infrastructure"],
      note: "Development bank funded projects: K-Aqua delivers tender-compliant documentation."
    },
    kairo: {
      regulator: "HCWW — Holding Company for Water & Wastewater",
      water: "Nile water with seasonal turbidity — smooth PP surfaces minimize deposition in domestic installations.",
      focus: ["New Administrative Capital", "Residential cities (NUCA)", "Red Sea hotel corridor"],
      note: "EOS registration via local partners; Mediterranean sea freight from Hamburg 10–14 days."
    },
    istanbul: {
      regulator: "İSKİ / TSE Certification",
      water: "Reservoir water with seasonal variations — earthquake-safe, ductile pipe behavior is a key design criterion.",
      focus: ["Hotel complexes", "High-rise residential", "New hospital construction"],
      note: "Flexible supply chains via road (5–7 days) or ocean freight."
    },
    singapur: {
      regulator: "PUB — Public Utilities Board",
      water: "NEWater & desalinated water, tropical continuous heat — highest demands on long-term hydrostatic strength.",
      focus: ["Public Housing (HDB)", "Marina high-rises", "Semiconductor ultra-pure water pre-stages"],
      note: "Ocean freight from Hamburg; complete PUB submission documents available."
    },
    kualalumpur: {
      regulator: "SPAN — National Water Services Commission",
      water: "Tropical surface water, high ambient humidity — UV and aging-resistant systems are standard.",
      focus: ["TRX Financial District", "Mixed-use towers", "Johor industrial corridor"],
      note: "SPAN listing via distribution partners; ASEAN hub for the region."
    },
    mumbai: {
      regulator: "BIS — Bureau of Indian Standards",
      water: "Monsoon-influenced reservoir supply with intermittent operation — pressure surge resistant welded joints count twice.",
      focus: ["High-rise redevelopment", "Hospital & pharmaceutical construction", "Smart Cities program"],
      note: "BIS compliance on a project-specific basis; technical training remote + on-site."
    },
    kapstadt: {
      regulator: "SABS / SANS standards system",
      water: "Water scarcity after 'Day Zero' — leak-free welded joints are active water conservation policy here.",
      focus: ["Hospital & hotel construction", "Township infrastructure", "Winery process water"],
      note: "Project business with local partner network; training of welding teams included."
    },
    nairobi: {
      regulator: "KEBS — Kenya Bureau of Standards",
      water: "Reservoir and groundwater mix in rapidly growing metropolis — robust, easy-to-train connection technology in demand.",
      focus: ["Affordable Housing Program", "Tatu City", "Hospital & education buildings"],
      note: "East Africa hub: delivery via Mombasa; welding training as capacity building."
    }
  },
  ar: {
    frankfurt: {
      regulator: "DVGW / لوائح مياه الشرب (TrinkwV)",
      water: "مياه عسرة (14–20 °dH) — يمنع نظام PP-R/PP-RCT الخالي من التآكل تراكم التكلسات على الأسطح المعدنية الخشنة.",
      focus: ["أنابيب صاعدة للمباني الشاهقة (المنطقة المصرفية)", "تجديد الفنادق والمكاتب", "مياه تبريد مراكز البيانات"],
      note: "في منطقة راين ماين، تقوم K-Aqua بالتوصيل من مصنع فالدزولمس — غالبًا في نفس اليوم."
    },
    berlin: {
      regulator: "DVGW / TrinkwV، شركة مياه برلين",
      water: "مياه متوسطة العسر من مرشحات الضفاف — الحياد الصحي للـ PP يمنع تكوين الغشاء الحيوي في الشبكات الواسعة.",
      focus: ["إنشاء الأحياء السكنية الجديدة", "مباني المدارس والإدارة", "تجديد المباني القديمة القائمة"],
      note: "يتم تسليم المشاريع الكبرى في منطقة العاصمة عبر شركاء الشحن في غضون 24 ساعة."
    },
    muenchen: {
      regulator: "DVGW / TrinkwV، مرافق بلدية ميونخ (SWM)",
      water: "مياه جبال الألب العذبة مع نطاق أس هيدروجيني منخفض — يتميز PP بالاستقرار حيث يواجه النحاس قابلية ذوبان متزايدة.",
      focus: ["البناء السكني الفاخر", "بناء المستشفيات والمختبرات", "مياه المصانع والعمليات"],
      note: "اللوجستيات في جنوب ألمانيا عبر الشحن الليلي؛ يمكن حجز التدريب على تقنيات اللحام في الموقع."
    },
    hamburg: {
      regulator: "DVGW / TrinkwV، شركة مياه هامبورغ",
      water: "مياه جوفية عذبة إلى متوسطة العسر — تحافظ أنظمة PP المحايدة الطعم على الجودة العالية للمياه الخام.",
      focus: ["مشروع هافن سيتي الجديد", "الفنادق", "تقنية الإمداد البحرية"],
      note: "شمال ألمانيا من المخزون؛ الأبعاد الكبيرة d250+ مباشرة من المصنع حسب المشروع."
    },
    wien: {
      regulator: "ÖVGW / لوائح مياه الشرب (النمسا)",
      water: "مياه الينابيع الجبلية بجودة ممتازة — الحفاظ على القيمة من خلال مواد أنابيب خاملة تمامًا.",
      focus: ["تجديد الإسكان البلدي", "مشاريع الفنادق والمشاريع التجارية", "التوزيع الفرعي لتدفئة المناطق"],
      note: "السوق الداخلية للاتحاد الأوروبي: لا توجد إجراءات جمركية، التوصيل في 48 ساعة."
    },
    zuerich: {
      regulator: "SVGW / TBDV",
      water: "مزيج من مياه البحيرات والينابيع — تتطلب متمتطلبات النظافة السويسرية حيادية معتمدة للمواد.",
      focus: ["البناء السكني الفاخر", "تجديد البنوك والمكاتب", "بناء المستشفيات"],
      note: "تخليص التصدير بما في ذلك شهادات المطابقة السويسرية من مصدر واحد."
    },
    london: {
      regulator: "WRAS — مخطط موافقة لوائح المياه",
      water: "مياه عسرة للغاية (حوض التايمز) — يظل PP-RCT خاليًا من تراكم التكلسات وضيق المقطع العرضي.",
      focus: ["المباني السكنية الشاهقة", "تجديد المباني التراثية", "شبكات المياه الساخنة على مستوى المنطقة"],
      note: "تتوفر مستندات متوافقة مع WRAS وأوراق بيانات باللغة الإنجليزية."
    },
    paris: {
      regulator: "ACS — شهادة المطابقة الصحية الفرنسية",
      water: "مياه نهر Seine العسرة المحملة بالكلس — تحافظ أسطح PP الداخلية الملساء على استقرار فقدان الضغط لعقود.",
      focus: ["الأحياء السكنية في باريس الكبرى", "تجديد الفنادق والمعالم الأثرية", "إعادة استخدام إرث الأولمبياد"],
      note: "تتوفر شهادات المطابقة الصحية (ACS) وإرشادات التركيب الفرنسية مع الشحنة."
    },
    mailand: {
      regulator: "DM 174/2004 (ملامسة مياه الشرب، إيطاليا)",
      water: "مياه جوفية من وادي بو ذات عسر عالٍ — تقلل الأنظمة الخالية من التكلس تكاليف الصيانة بشكل ملحوظ.",
      focus: ["مجمع ناطحات السحاب بورتا نوفا", "متاجر الأزياء والتجزئة الكبرى", "صناعة شمال إيطاليا"],
      note: "لوجستيات العبور عبر جبال الألب 48-72 ساعة؛ المستندات الإيطالية متوفرة."
    },
    warschau: {
      regulator: "شهادة النظافة PZH (المعهد الوطني للصحة)",
      water: "مياه مرشحة من ضفاف نهر فيستولا — سوق إسكان سريع النمو مع طلب مرتفع على الأنظمة سريعة التركيب.",
      focus: ["إنشاء الأحياء السكنية الجديدة", "القاعات اللوجستية والصناعية", "تحديث المباني الجاهزة (ألواح الخرسانة)"],
      note: "اللوجستيات داخل الاتحاد الأوروبي 24-48 ساعة؛ تتوفر إرشادات المعالجة باللغة البولندية."
    },
    prag: {
      regulator: "موافقة النظافة الصحية SZÚ (جمهورية التشيك)",
      water: "مياه خزان نهر فلتانا — جودة مستقرة، سوق تجديد قوي في المباني التاريخية.",
      focus: ["تجديد الأnaبيب الصاعدة للمباني القديمة", "الفنادق", "صناعة توريد السيارات"],
      note: "سوق مجاور من المصنع: التوصيل في غضون 24 ساعة، خط ساخن فني بالألمانية والإنجليزية."
    },
    dubai: {
      regulator: "DEWA — هيئة كهرباء ومياه دبي",
      water: "مياه بحر محلاة ذات محتوى كلوريد عالٍ ودرجات حرارة مستمرة تزيد عن 30 درجة مئوية — السيناريو الأساسي لاحتياطيات درجات الحرارة لـ PP-RCT.",
      focus: ["أبراج شاهقة الارتفاع", "المنتجعات الفندقية", "مياه تعويض التبريد للمناطق"],
      note: "شحن بحري FCL من هامبورغ؛ يمكن حجز إشراف على اللحام التناكبي في موقع البناء."
    },
    abudhabi: {
      regulator: "دائرة الطاقة أبوظبي / استدامة",
      water: "مياه محلاة مع معالجة ما بعد التقسية — تمنح نقاط استدامة مكافآت لمواد الأنابيب القابلة لإعادة التدوير.",
      focus: ["المباني الحكومية والثقافية", "منتجعات جزيرة السعديات", "المناطق الصناعية بكيزاد"],
      note: "تتوفر مستندات تصنيف اللؤلؤ لاستدامة (شفافية المواد) مع العرض."
    },
    doha: {
      regulator: "كهرماء — المؤسسة العامة القطرية للكهرباء والماء",
      water: "مياه محلاة بنسبة 99%، ودرجة حرارة الشبكة تصل إلى 40 درجة مئوية في الصيف — مقاومة الضغط على المدى الطويل هي معيار الاختيار الرئيسي.",
      focus: ["تطوير مدينة لوسيل", "إعادة استخدام الملاعب", "قطاع الضيافة"],
      note: "تتوفر مستندات التقديم المتوافقة مع QCS وتقارير فحص الطرف الثالث."
    },
    riad: {
      regulator: "SASO / المؤسسة العامة للري / هيئة المياه السعودية",
      water: "مزيج من المياه المحلاة (خطوط أنابيب SWCC) والمياه الجوفية الأحفورية — تتطلب حرارة الصيف الشديدة احتياطيات PP-RCT.",
      focus: ["مشاريع رؤية 2030 الكبرى", "حديقة الملك سلمان", "توسعات المدن السكنية"],
      note: "يتم توفير شهادة SASO والتسجيل في منصة سابر (SABER) حسب المشروع."
    },
    dschidda: {
      regulator: "SASO / SWCC",
      water: "تحلية مياه البحر الأحمر بتركيز ملحي عالٍ في البيئة المحيطة — الخلو التام من التآكل معيار حاسم ضد المعادن هنا.",
      focus: ["مشروع وسط جدة", "مباني الموانئ واللوجستيات", "ضيافة الحجاج (ممر مكة)"],
      note: "شحن بحري مباشر إلى ميناء جدة الإسلامي؛ أوراق البيانات باللغة العربية قيد الإعداد."
    },
    neom: {
      regulator: "سلطة نيوم / SASO",
      water: "التخطيط لتحلية مياه تعمل بالطاقة المتجددة بنسبة 100% — يتطلب المشروع مواد دائرية بالكامل: بما في ذلك رمز إعادة التدوير 5.",
      focus: ["البنية التحتية للمدينة الخطية (ذا لاين)", "ميناء أوكساجون الصناعي", "منتجعات تروجينا الجبلية"],
      note: "مرحلة التخطيط المبكر: تدعم K-Aqua المشروع ببيانات EPD ونماذج شبكات الأنابيب البارامترية."
    },
    kuwait: {
      regulator: "MEW — وزارة الكهرباء والماء",
      water: "مياه الخليج المحلاة المخلوطة بالمياه المالحة — أنظمة البلاستيك المقاومة للكلوريد هي التوصية القياسية.",
      focus: ["تخطيط مدينة الحرير", "المدن السكنية (المؤسسة العامة للرعاية السكنية)", "البنية التحتية المصاحبة للنفط والغاز"],
      note: "التأهيل المسبق لدى وزارة الكهرباء والماء عبر شركاء محليين؛ التوصيل عبر ميناء الشويخ."
    },
    maskat: {
      regulator: "نماء لخدمات المياه (ديام سابقًا)",
      water: "التحلية بالإضافة إلى تقليد الأفلاج — يمنح عمان مكافآت للأنظمة المتينة وقليلة الصيانة في المناقصات العامة.",
      focus: ["مدينة الدقم الاقتصادية", "مشاريع الفنادق والسياحة", "المساجد والمباني الثقافية"],
      note: "الممر اللوجستي لدول مجلس التعاون الخليجي عبر جبل علي؛ القبول الفني وفقًا لبروتوكول نماء."
    },
    manama: {
      regulator: "EWA — هيئة الكهرباء والماء",
      water: "شبكة محلاة بالكامل مع درجات حرارة صيفية عالية — يحافظ PP-RCT على احتياطي الضغط حيث يتقادم PVC.",
      focus: ["خليج البحرين", "تجديد المنطقة المصرفية", "تطوير الجزر"],
      note: "سوق مدمج بمسافات قصيرة — حزم كاملة بما في ذلك تأجير معدات اللحام."
    },
    amman: {
      regulator: "WAJ — سلطة المياه الأردنية / مياهنا",
      water: "واحد من أكثر البلدان شحًا في المياه في العالم — وصلات اللحام الخالية من التسرب هي سياسة نشطة لتوفير المياه (المياه غير المحسوبة < 2%).",
      focus: ["الشبكات الفرعية لخط أنابيب الديسي", "بناء المستشفيات والجامعات", "البنية التحتية لمخيمات اللاجئين"],
      note: "المشاريع الممولة من بنوك التنمية: تقدم K-Aqua الوثائق المتوافقة مع المناقصات."
    },
    kairo: {
      regulator: "HCWW — الشركة القابضة لمياه الشرب والصرف الصحي",
      water: "مياه النيل مع عكرة موسمية — تقلل أسطح PP الملساء الترسبات في التوصيلات المنزلية.",
      focus: ["العاصمة الإدارية الجديدة", "المدن السكنية الجديدة (NUCA)", "ممر الفنادق بالبحر الأحمر"],
      note: "التسجيل في الهيئة المصرية العامة للمواصفات والجودة عبر شركاء محليين؛ شحن بحري بالبحر المتوسط من هامبورغ في غضون 10-14 يومًا."
    },
    istanbul: {
      regulator: "İSKİ / شهادة TSE التركية",
      water: "مياه الخزانات مع تغيرات موسمية — سلوك الأنابيب المرن والمقاوم للزلازل هو معيار للتصميم.",
      focus: ["المجمعات الفندقية", "المباني السكنية الشاهقة", "بناء المستشفيات الجديدة"],
      note: "سلاسل إمداد مرنة عبر الطريق البري (5-7 أيام) أو الشحن البحري."
    },
    singapur: {
      regulator: "PUB — مجلس المرافق العامة بسنغافورة",
      water: "مياه NEWater والمياه المحلاة، حرارة استوائية مستمرة — أعلى المتطلبات لمقاومة الضغط على المدى الطويل.",
      focus: ["الإسكان العام (HDB)", "أبراج مارينا الشاهقة", "المراحل الأولية للمياه فائقة النقاء لأشباه الموصلات"],
      note: "شحن بحري من هامبورغ; تتوفر مستندات التقديم الكاملة الخاصة بـ PUB."
    },
    kualalumpur: {
      regulator: "SPAN — اللجنة الوطنية لخدمات المياه بماليزيا",
      water: "مياه سطحية استوائية، رطوبة محيطة عالية — الأنظمة المقاومة للأشعة فوق البنفسجية والتقادم هي المعيار.",
      focus: ["منطقة TRX المالية", "الأبراج متعددة الاستخدامات", "الممر الصناعي بجوهر"],
      note: "التأهيل لدى SPAN عبر شركاء التوزيع؛ مركز الآسيان (ASEAN) للمنطقة."
    },
    mumbai: {
      regulator: "BIS — مكتب المعايير الهندية",
      water: "إمدادات الخزانات المتأثرة بالرياح الموسمية مع تشغيل متقطع — وصلات اللحام المقاومة لارتفاع الضغط المفاجئ تكتسب أهمية مضاعفة.",
      focus: ["إعادة تطوير المباني الشاهقة", "بناء المستشفيات والصيدلة", "برنامج المدن الذكية"],
      note: "مطابقة معايير BIS حسب المشروع؛ تدريب فني عن بعد وفي الموقع."
    },
    kapstadt: {
      regulator: "SABS / نظام معايير SANS بجنوب أفريقيا",
      water: "شح المياه بعد 'اليوم صفر' — وصلات اللحام الخالية من التسرب هي سياسة نشطة لتوفير المياه هنا.",
      focus: ["بناء المستشفيات والفنادق", "البنية التحتية للبلدات", "مياه العمليات لمزارع العنب"],
      note: "أعمال المشاريع مع شبكة شركاء محليين؛ يشمل تدريب فرق اللحام."
    },
    nairobi: {
      regulator: "KEBS — مكتب كينيا للمعايير",
      water: "مزيج من مياه الخزانات والمياه الجوفية في عاصمة سريعة النمو — تقنية توصيل قوية وسهلة التدريب مطلوبة.",
      focus: ["برنامج الإسكان الميسر", "تطوير تاتو سيتي", "المباني الصحية والتعليمية"],
      note: "مركز شرق إفريقيا: التوصيل عبر مومباسا؛ التدريب على اللحام كبناء للقدرات."
    }
  }
};

const locales = ['de', 'en', 'ar'];
const defaultThemeKeys = {
  de: {
    toggle_theme_light: "Zu hellem Design wechseln",
    toggle_theme_dark: "Zu dunklem Design wechseln"
  },
  en: {
    toggle_theme_light: "Switch to light theme",
    toggle_theme_dark: "Switch to dark theme"
  },
  ar: {
    toggle_theme_light: "التبديل إلى المظهر الفاتح",
    toggle_theme_dark: "التبديل إلى المظهر الداكن"
  }
};

for (const lang of locales) {
  const base = K_I18N[lang];
  const pagesData = context.K_PAGES_I18N[lang];

  const out = {
    ...defaultThemeKeys[lang],
    nav: base.nav,
    groups: base.groups,
    pages: base.pages,
    home: base.home,
    geo: base.geo,
    footer: base.footer,
    regions: context.K_PAGES_I18N[lang].regions || context.K_PAGES_I18N.de.regions // fallback if not defined
  };

  // Merge the view namespaces
  const views = [
    'homex', 'products', 'solutions', 'service', 'about', 'news', 'career',
    'contact', 'imprint', 'finder', 'co2', 'trust', 'partner', 'academy',
    'refs', 'buyers', 'rfq'
  ];

  for (const view of views) {
    out[view] = pagesData[view];
  }

  // Generate geoContent
  out.geoContent = {};
  for (const market of K_GEO) {
    const slug = market.slug;
    if (lang === 'de') {
      out.geoContent[slug] = {
        regulator: market.regulator,
        water: market.water,
        focus: market.focus,
        note: market.note,
        focusHeading: `Typische Projekte in ${market.city}`
      };
    } else {
      const trans = geoTranslations[lang][slug];
      out.geoContent[slug] = {
        regulator: trans.regulator,
        water: trans.water,
        focus: trans.focus,
        note: trans.note,
        focusHeading: lang === 'ar' ? `مشاريع نموذجية في ${market.city}` : `Typical projects in ${market.city}`
      };
    }
  }

  // Write out the result
  const outPath = path.join(root, `messages/${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${outPath}`);
}
