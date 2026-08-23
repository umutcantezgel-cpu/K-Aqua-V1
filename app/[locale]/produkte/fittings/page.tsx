import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode, getItemListGraphNode, getFaqGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { StatBand } from '@/components/ui/StatBand';
import { DeepMatrix } from '@/components/ui/DeepMatrix';
import { DeepFAQ } from '@/components/ui/DeepFAQ';
import { StepFlow } from '@/components/ui/StepFlow';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { CategoryCatalogSection } from '@/components/product/CategoryCatalogSection';
import { CATALOG } from '@/lib/data/catalog';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Shield, Sparkles, CheckCircle2, Layers, Cpu, CornerUpRight, GitFork, Disc, Zap, Flame } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const titles: Record<string, [string, string]> = {
  de: ['PP-R & PP-RCT Formteile & Fittings für Rohrsysteme | K-Aqua', 'K-Aqua PP-R Formteile und Fittings für hochdruckfeste, korrosionsfreie Rohrverbindungen. Zertifiziert nach DVGW.'],
  en: ['PP-R & PP-RCT Fittings & Connectors for Piping Systems | K-Aqua', 'K-Aqua PP-R fittings and connectors for high-pressure, corrosion-free pipe connections. DVGW certified.'],
  ar: ['تركيبات PP-R وموصلات لأنظمة الأنابيب | K-Aqua', 'تركيبات وموصلات PP-R من K-Aqua لتوصيلات أنابيب عالية الضغط ومقاومة للتآكل. معتمدة وفق DVGW.']
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [title, description] = titles[locale] ?? titles['en']!;
  return constructMetadata({
    title,
    description,
    path: "/produkte/fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.fittings' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.fittings" });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const [title, description] = titles[locale] ?? titles['en']!;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");

  const fittingCategory = CATALOG.find((c) => c.id === 'fittings');
  const fittingItems = fittingCategory?.items || [];

  const isAr = locale.startsWith('ar');
  const isDe = locale === 'de';

  const PAGE_I18N = {
    de: {
      trustPressure: 'PN 25 Belastbarkeit',
      browseCatalog: 'Fittingkatalog durchsuchen',
      sendRfq: 'Projektanfrage stellen',
      catalogTitle: 'Formteile & Fittings im Katalog',
      catalogSub: 'Entdecken Sie Muffen, Winkel, T-Stücke, Reduzierungen, Flansche und Elektroschweißmuffen in allen Dimensionen.',
      bentoEyebrow: 'SORTIMENTSTIEFE',
      bentoTitle: 'Die 6 Formteil-Familien von K-Aqua',
      bentoLead: 'Perfekt abgestimmte Formstücke für jede bauliche Herausforderung und komplexe Leitungsführungen.',
      families: [
        { t: 'Muffen & Reduzierungen', d: 'Standardmuffen (Sockets), Reduzierstücke (Reducing Bushes) und Endkappen von d20 bis d315 mm für schlanke, leckagefreie Leitungsverbindungen.' },
        { t: 'Winkel 45° & 90°', d: 'Strömungsgünstige Innenradien minimieren Druckverluste bei Richtungswechseln. Erhältlich als Muffe/Muffe sowie Muffe/Stutzen für enge Bauräume.' },
        { t: 'T-Stücke & Kreuzungen', d: 'Egal- und Reduzier-T-Stücke für gleichmäßige hydraulische Verteilungen in Steigsträngen und verzweigten Industrietrassen.' },
        { t: 'Flanschadapter & Bundbuchsen', d: 'Bundbuchsen nach DIN EN 1092 mit stahlarmierten Losflanschen für lösbare Übergänge an Pumpen, Absperrklappen und Behälteranschlüsse.' },
        { t: 'Elektroschweißmuffen', d: 'Integrierte Heizdrähte mit Barcode-Erkennung für automatisierte, lückenlos protokollierte Verschweißung in engen Schächten und bei Großrohren.' },
        { t: 'Verschraubungen & Formstücke', d: 'Kunststoff-Verschraubungen (Unions), Überbrückungsbögen für kreuzende Rohrleitungen und Sonderformteile für maßgeschneiderte Vorfertigung.' },
      ],
      matrixEyebrow: 'HYDRAULIK-BENCHMARK',
      matrixTitle: 'Glatte Innenwände für minimale Pumpenleistung',
      matrixLead: 'Vergleich der hydraulischen Wandrauigkeit und der Verbindungssicherheit gegenüber metallischen Rohrsystemen.',
      matrixNote: 'Rauigkeitswerte k nach Colebrook-White. Geringere Rauigkeit bedeutet reduzierten Strömungswiderstand und messbare Stromeinsparungen bei Umwälzpumpen über 50 Jahre Betriebsdauer.',
      workflowEyebrow: 'SCHWEISSPROZESS DVS 2207',
      workflowTitle: 'In 4 Schritten zur unlösbaren Verbindung',
      workflowLead: 'Durch das Heizelementmuffenschweißen bei 260 °C entsteht eine makromolekulare Verschmelzung. Keine mechanischen Schwachstellen, keine Dichtungsalterung.',
      workflowBtn: 'Passende Schweißgeräte entdecken',
      timelineTitle: 'Meilensteine der K-Aqua Fittingproduktion',
      timelineDesc: 'Kontinuierliche Werkzeugoptimierung und Ausbau des Formteilsortiments.',
      guideEyebrow: 'FACHWISSEN & TECHNISCHER LEITFADEN',
      faqTitle: 'Häufig gestellte Fragen zu Fittings',
      faqLead: 'Alles Wichtige zu Schweißparametern, Maßtoleranzen und Druckbeständigkeit.',
      ctaOverview: 'Zurück zur Übersicht',
    },
    en: {
      trustPressure: 'PN 25 Rated Strength',
      browseCatalog: 'Browse Fittings Catalog',
      sendRfq: 'Submit Project RFQ',
      catalogTitle: 'Fittings & Socket Components Catalog',
      catalogSub: 'Explore sockets, elbows, tees, reducers, flanges, and electrofusion fittings across all dimensions.',
      bentoEyebrow: 'COMPONENT FAMILIES',
      bentoTitle: 'The 6 Fitting Families of K-Aqua',
      bentoLead: 'Precision-engineered fittings for complex pipe routing and heavy-duty building services.',
      families: [
        { t: 'Sockets & Reducers', d: 'Standard sockets, reducing bushes, and end caps from d20 to d315 mm for slim, permanently leak-free connections.' },
        { t: 'Elbows 45° & 90°', d: 'Flow-optimized interior radii minimize pressure drops during directional changes. Available as socket/socket and socket/spigot.' },
        { t: 'Tees & Crosses', d: 'Equal and reducing tees for uniform hydraulic distribution across vertical risers and manifold networks.' },
        { t: 'Flange Adapters & Stub Ends', d: 'DIN EN 1092 stub flanges with steel-reinforced backing rings for demountable connections to pumps, valves, and tanks.' },
        { t: 'Electrofusion Sockets', d: 'Integrated heating elements with barcode recognition for automated, fully documented welding in tight shafts and large diameters.' },
        { t: 'Unions & Transition Parts', d: 'Plastic unions, crossover bridges for crossing pipe routes, and specialty molded components for custom prefabrication.' },
      ],
      matrixEyebrow: 'HYDRAULIC BENCHMARK',
      matrixTitle: 'Smooth Inner Walls for Minimal Pumping Power',
      matrixLead: 'Comparison of hydraulic roughness and joint security against metallic piping systems.',
      matrixNote: 'Roughness values k according to Colebrook-White. Lower roughness translates to reduced flow friction and power savings for circulation pumps over 50 years.',
      workflowEyebrow: 'DVS 2207 WELDING PROCESS',
      workflowTitle: 'In 4 Steps to an Inseparable Molecular Joint',
      workflowLead: 'Socket fusion at 260 °C produces a seamless macromolecular bond with zero elastomeric aging or mechanical weak points.',
      workflowBtn: 'Explore Matching Welding Equipment',
      timelineTitle: 'Milestones of K-Aqua Fitting Production',
      timelineDesc: 'Continuous mold engineering and spectrum expansion in Germany.',
      guideEyebrow: 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE',
      faqTitle: 'Frequently Asked Questions on Fittings',
      faqLead: 'Essential answers regarding fusion parameters, tolerances, and pressure ratings.',
      ctaOverview: 'Back to Overview',
    },
    ar: {
      trustPressure: 'تحمل ضغط PN 25',
      browseCatalog: 'تصفح كتالوج الوصلات',
      sendRfq: 'تقديم طلب مشروع',
      catalogTitle: 'الوصلات وقطع الربط في الكتالوج',
      catalogSub: 'اكتشف الجلب والأكواع والوصلات T والمخفضات والفلنجات ووصلات اللحام الكهربائي بجميع المقاسات.',
      bentoEyebrow: 'عائلات المنتجات',
      bentoTitle: 'عائلات الوصلات الست من K-Aqua',
      bentoLead: 'قطع ربط مصممة بدقة هندسية لأكثر مسارات الأنابيب تعقيداً وأعلى متطلبات البناء.',
      families: [
        { t: 'الجلب والمخفضات', d: 'جلب قياسية ومخفضات وسدادات نهائية من d20 إلى d315 مم لتوصيلات مدمجة ومانعة للتسريب تماماً.' },
        { t: 'أكواع 45° و 90°', d: 'انحناءات داخلية هيدروليكية تقلل فقدان الضغط عند تغيير المسار. متوفرة بنظام جلبة/جلبة وجلبة/طرف.' },
        { t: 'وصلات T والتفريعات', d: 'وصلات T متساوية ومخفضة لتوزيع هيدروليكي منتظم في الأعمدة الصاعدة وشبكات التوزيع.' },
        { t: 'محولات الفلنجات والشفاه', d: 'حواف فلنجات وفق DIN EN 1092 مع حلقات دعم فولاذية للتوصيل بمضخات وصمامات وخزانات قابلة للفك.' },
        { t: 'وصلات اللحام الكهربائي', d: 'أسلاك تسخين مدمجة مع باركود للحام آلي موثق بالكامل في الأماكن الضيقة والأقطار الكبيرة.' },
        { t: 'الوصلات القلاووظ والقطع الخاصة', d: 'وصلات فك وتركيب بلاستيكية، وأقواس عبور للمسارات المتقاطعة، ومكونات خاصة للتجهيز المسبق.' },
      ],
      matrixEyebrow: 'معيار الكفاءة الهيدروليكية',
      matrixTitle: 'جدران داخلية ملساء لأقل استهلاك لطاقة المضخات',
      matrixLead: 'مقارنة الخشونة الهيدروليكية وأمان الربط مقابل الأنظمة المعدنية التقليدية.',
      matrixNote: 'قيم الخشونة k وفقاً لمعادلة Colebrook-White. انخفاض الخشونة يعني مقاومة تدفق أقل وتوفيراً ملموساً في استهلاك مضخات التدوير على مدى 50 عاماً.',
      workflowEyebrow: 'عملية اللحام وفق DVS 2207',
      workflowTitle: 'في 4 خطوات لوصلة دائمة وغير قابلة للانفصال',
      workflowLead: 'اللحام الحراري للجلب عند 260 °م يحقق اندماجاً جزيئياً متكاملاً بدون نقاط ضعف ميكانيكية أو تقادم للمطاط.',
      workflowBtn: 'اكتشف مكائن وأدوات اللحام المناسبة',
      timelineTitle: 'محطات بارزة في إنتاج وصلات K-Aqua',
      timelineDesc: 'تطوير مستمر لقوالب الحقن وتوسيع نطاق التشكيلة في ألمانيا.',
      guideEyebrow: 'الخبرة الفنية والدليل الهندسي',
      faqTitle: 'الأسئلة الشائعة حول الوصلات',
      faqLead: 'إجابات أساسية حول معايير اللحام والتفاوتات المسموحة ومقاومة الضغط.',
      ctaOverview: 'العودة لنظرة عامة على المنتجات',
    }
  };

  const p = isAr ? PAGE_I18N.ar : isDe ? PAGE_I18N.de : PAGE_I18N.en;

  const fittingStats = [
    { n: "20–630", u: "mm", l: isDe ? "Umfassendes Dimensionsspektrum" : isAr ? "نطاق مقاسات شامل" : "Comprehensive dimension range" },
    { n: "100", u: "%", l: isDe ? "Stoffschlüssige Dichtheit" : isAr ? "إحكام جزيئي متجانس" : "Homogeneous leak-tightness" },
    { n: "0,007", u: "mm", l: isDe ? "Hydraulische Wandrauigkeit k" : isAr ? "معامل الخشونة الهيدروليكية k" : "Hydraulic roughness coefficient k" },
    { n: "50+", u: isDe ? "Jahre" : isAr ? "عاماً" : "Years", l: isDe ? "Wartungsfreie Lebensdauer" : isAr ? "عمر افتراضي خالٍ من الصيانة" : "Maintenance-free lifespan" },
  ];

  const hydraulicMatrixHead = [
    isDe ? "Rohr- / Fittingwerkstoff" : isAr ? "مادة الأنبوب / الوصلة" : "Material",
    isDe ? "Rauigkeit k" : isAr ? "الخشونة k" : "Roughness k",
    isDe ? "Druckverlust" : isAr ? "فقدان الضغط" : "Pressure loss",
    isDe ? "Inkrustationsrisiko" : isAr ? "مخاطر التكلس والترسب" : "Scaling risk",
    isDe ? "Verbindungssicherheit" : isAr ? "أمان وموثوقية الربط" : "Joint integrity",
  ];

  const hydraulicMatrixRows = [
    ["K-Aqua PP-R / PP-RCT", "0,007 mm", isDe ? "Minimal (Basis 100%)" : isAr ? "أدنى حد ممكن (الأساس 100%)" : "Minimal (Baseline 100%)", isDe ? "Kein Risiko (0 %)" : isAr ? "منعدم تماماً (0%)" : "Zero risk (0%)", isDe ? "100% stoffschlüssig verschweißt" : isAr ? "لحام اندماجي جزيئي 100%" : "100% molecularly welded"],
    [isDe ? "Edelstahl (Pressfitting)" : isAr ? "استانلس ستيل (كبس)" : "Stainless Steel (Press)", "0,040 mm", isDe ? "+ 28 % Reibung" : isAr ? "+ 28% احتكاك" : "+ 28% friction", isDe ? "Gering (Biofilm möglich)" : isAr ? "منخفض (احتمال غشاء حيوي)" : "Low (Biofilm possible)", isDe ? "Elastomer-O-Ring (Alterungsrisiko)" : isAr ? "حلقة O-Ring مطاطية (معرضة للتلف)" : "Elastomer O-Ring (Aging risk)"],
    [isDe ? "Kupfer (Löt-/Pressfitting)" : isAr ? "نحاس (لحام قصدير/كبس)" : "Copper (Solder/Press)", "0,050 mm", isDe ? "+ 35 % Reibung" : isAr ? "+ 35% احتكاك" : "+ 35% friction", isDe ? "Mittel (Lochfraßgefahr)" : isAr ? "متوسط (خطر النقر والتآكل)" : "Medium (Pitting corrosion)", isDe ? "Mechanisch / Geklemmt" : isAr ? "ميكانيكي / مضغوط" : "Mechanical / Clamped"],
    [isDe ? "Stahl verzinkt (Gewinde)" : isAr ? "حديد مجلفن (سن قلاووظ)" : "Galvanized Steel (Thread)", "0,150 mm", isDe ? "+ 95 % Reibung" : isAr ? "+ 95% احتكاك" : "+ 95% friction", isDe ? "Sehr hoch (Verrostung/Kalk)" : isAr ? "مرتفع جداً (صدأ وتكلس)" : "Very high (Rust/Limescale)", isDe ? "Hanf / Teflonband (Leckagerisiko)" : isAr ? "تفلون / كتان (عرضة للتسريب)" : "Thread sealant (Leak risk)"],
  ];

  const fusionWorkflow = [
    {
      t: isDe ? "1. Schnitt & Einstecktiefe" : isAr ? "1. القطع وتحديد عمق الإدخال" : "1. Cut & Insertion Depth",
      d: isDe ? "Rechtwinkliger Schnitt ohne Gratbildung. Die Einstecktiefe wird mit der Schablone markiert, um eine Querschnittsverengung zu verhindern." : isAr ? "قطع بزاوية قائمة بدون نتوءات، مع تحديد عمق الإدخال بالمسطرة لمنع تضيق القطر الداخلي." : "Square cut without burrs. Insertion depth marked to ensure zero cross-section narrowing."
    },
    {
      t: isDe ? "2. Elektronisch geregelte Erwärmung" : isAr ? "2. التسخين المنضبط إلكترونياً" : "2. Electronically Regulated Heating",
      d: isDe ? "Gleichzeitiges Aufschieben von Fitting und Rohr auf die 260 °C heißen PTFE-Heizwerkzeuge. Die Anwärmzeit richtet sich exakt nach DVS 2207." : isAr ? "دفع الوصلة والأنبوب معاً على قوالب PTFE عند 260 °م مع الالتزام التام بأوقات التسخين حسب DVS 2207." : "Simultaneous insertion into 260 °C PTFE dies. Heating times strictly follow DVS 2207 standards."
    },
    {
      t: isDe ? "3. Fügen ohne Drehung" : isAr ? "3. التجميع المحوري بدون دوران" : "3. Non-Rotational Joining",
      d: isDe ? "Axiales Zusammenfügen bis zur Markierung. Die Polymerketten verschlingen sich auf molekularer Ebene zu einer homogenen Naht." : isAr ? "دمج محوري سريع حتى العلامة المحددة، حيث تتشابك سلاسل البوليمر جزيئياً في درز متجانس." : "Axial insertion without rotation. Polymer chains interlock into a single continuous macromolecular weld."
    },
    {
      t: isDe ? "4. Fixierung & Druckprüfung" : isAr ? "4. التثبيت والجاهزية للضغط" : "4. Fixation & Pressure Testing",
      d: isDe ? "Nach kurzer Fixierung kühlt das Formteil aus und kann sofort mit vollem Nenndruck (PN 25) beaufschlagt werden." : isAr ? "بعد تبريد قصير تصبح الوصلة جاهزة فوراً لتحمل كامل الضغط الاسمي (PN 25) والإجهاد الميكانيكي." : "After cooling, the fitting withstands full nominal pressure (PN 25) and mechanical tension."
    }
  ];

  const fittingsTimeline = [
    {
      year: "2000",
      title: isDe ? "Werkzeugbau & Spritzgussfertigung" : isAr ? "صناعة القوالب والحقن الدقيق" : "Toolmaking & Injection Molding",
      text: isDe ? "Aufbau der hochpräzisen Formenfertigung für PP-R Muffen, Winkel und T-Stücke bis d110 mm." : isAr ? "تأسيس مصنع قوالب الحقن عالي الدقة لجلب وأكواع وتفريعات PP-R حتى قطر d110 مم." : "Establishment of high-precision injection tooling for PP-R sockets, elbows, and tees up to d110 mm."
    },
    {
      year: "2010",
      title: isDe ? "Strömungsoptimierte Formteilgeometrien" : isAr ? "هندسة هيدروليكية متطورة للتدفق" : "Flow-Optimized Geometries",
      text: isDe ? "CFD-gestützte Neukonstruktion der Innenradien zur Reduzierung von Turbulenzen und Kavitation." : isAr ? "إعادة تصميم الانحناءات الداخلية بمساعدة محاكاة CFD لتقليل الاضطراب والدوامات." : "CFD-assisted redesign of interior radii minimizing turbulence and cavitation."
    },
    {
      year: "2018",
      title: isDe ? "Elektroschweißmuffen & Großfittings" : isAr ? "وصلات اللحام الكهربائي والقطع الكبيرة" : "Electrofusion & Large Fittings",
      text: isDe ? "Einführung des barcode-gesteuerten Elektroschweißprogramms und Großdimensionen bis d630 mm." : isAr ? "إطلاق برنامج اللحام الكهربائي الموجه بالباركود والمقاسات الضخمة حتى d630 مم." : "Launch of barcode-controlled electrofusion sockets and large fittings up to d630 mm."
    },
    {
      year: "2024+",
      title: isDe ? "Vollsortiment PP-RCT Formteile" : isAr ? "تشكيلة متكاملة من وصلات PP-RCT" : "Full PP-RCT Fitting Spectrum",
      text: isDe ? "Vollständige Zertifizierung des gesamten Formteilprogramms für anspruchsvolle Industrie- & B2B-Projekte." : isAr ? "اعتماد شامل لكافة خطوط الوصلات للمشاريع الصناعية والتجارية الكبرى." : "Full certification of all fitting lines for high-demand industrial and commercial B2B projects."
    }
  ];

  const fittingsFaq = [
    {
      q: isDe ? "Wie stabil ist die Schweißverbindung im Vergleich zum Rohr?" : isAr ? "ما مدى متانة الوصلة الملحومة مقارنة بالأنبوب نفسه؟" : "How strong is the welded joint compared to the pipe?",
      a: isDe ? "Bei der Polyfusionsschweißung (Heizelementmuffenschweißen bei 260 °C) verschmelzen Rohr und Fitting molekular zu einem einzigen Werkstück. Berstdruckprüfungen zeigen regelmäßig, dass bei extremem Überdruck das Rohr selbst birst, während die Schweißnaht intakt bleibt." : isAr ? "في اللحام الحراري عند 260 °م يندمج الأنبوب والوصلة في قطعة واحدة متصلة، وتثبت اختبارات ضغط الانفجار أن الوصلة الملحومة أقوى من جسم الأنبوب نفسه." : "In polyfusion welding, the pipe and fitting melt into a single continuous macromolecule. Burst tests prove the joint is stronger than the pipe itself."
    },
    {
      q: isDe ? "Warum verursachen K-Aqua Fittings weniger Druckverlust als metallische Pressfittings?" : isAr ? "لماذا تسبب وصلات K-Aqua فقداً أقل في الضغط مقارنة بوصلات الكبس المعدنية؟" : "Why do K-Aqua fittings have lower pressure losses than metal press fittings?",
      a: isDe ? "Metallische Pressfittings besitzen konstruktionsbedingt innenliegende Stützhülsen, die den Strömungsquerschnitt um bis zu 30 % verengen. K-Aqua Schweißfittings werden über das Rohr geschoben (Muffe) und behalten den vollen Innendurchmesser des Rohres ohne Querschnittsverengung bei." : isAr ? "تحتوي وصلات الكبس المعدنية على حلقات دعم داخلية تضيق مساحة التدفق حتى 30%، بينما تحافظ وصلات K-Aqua على القطر الداخلي الكامل دون تضييق." : "Metal press fittings have internal support sleeves narrowing flow cross-sections by up to 30%, whereas K-Aqua socket fittings maintain full inner diameters."
    },
    {
      q: isDe ? "Können K-Aqua Formteile mit Rohren anderer Hersteller verschweißt werden?" : isAr ? "هل يمكن لحام وصلات K-Aqua مع أنابيب من مصنعين آخرين؟" : "Can K-Aqua fittings be welded with pipes from other manufacturers?",
      a: isDe ? "K-Aqua Fittings aus PP-R und PP-RCT entsprechen den strengen Maß- und Werkstofftoleranzen nach DIN 8077/8078 und DIN EN ISO 15874. Sie können mit allen normgerechten PP-R und PP-RCT Rohren verschweißt werden. Für garantierte Systemgewährleistung empfehlen wir das K-Aqua Gesamtsystem." : isAr ? "تتوافق وصلات K-Aqua مع معايير DIN 8077/8078 و DIN EN ISO 15874 ويمكن لحامها مع أي أنابيب مطابقة للمواصفات، ونوصي بالنظام الكامل لضمان الضمان الشامل." : "K-Aqua fittings conform to DIN 8077/8078 and DIN EN ISO 15874 and can be welded to all standardized PP-R/PP-RCT pipes."
    },
    {
      q: isDe ? "Bis zu welchem Druck sind K-Aqua Formteile zugelassen?" : isAr ? "ما هي فئات الضغط المعتمدة لوصلات K-Aqua؟" : "What pressure ratings do K-Aqua fittings have?",
      a: isDe ? "Unsere Standardformteile sind für Betriebsdrücke bis PN 25 (25 bar bei 20 °C) bzw. PN 10 (10 bar bei 70 °C Dauerlast) ausgelegt und zertifiziert." : isAr ? "وصلاتنا القياسية مصممة ومعتمدة لضغوط تشغيل حتى PN 25 (25 بار عند 20 °م) و PN 10 (10 بار عند 70 °م حمل مستمر)." : "Standard K-Aqua fittings are rated for up to PN 25 (25 bar at 20 °C) and PN 10 (10 bar at 70 °C continuous load)."
    },
    {
      q: isDe ? "Wie werden Großdimensionen über d160 mm verschweißt?" : isAr ? "كيف يتم لحام المقاسات الكبيرة التي تتجاوز d160 مم؟" : "How are large dimensions over d160 mm welded?",
      a: isDe ? "Für Dimensionen von d160 bis d630 mm kommen K-Aqua Stumpfschweißmaschinen (Heizelementstumpfschweißen) oder K-Aqua Elektroschweißmuffen mit Barcode-Schweißautomaten zum Einsatz." : isAr ? "للأقطار من d160 إلى d630 مم تُستخدم مكائن اللحام التناكبي من K-Aqua أو وصلات اللحام الكهربائي المزودة بماسح باركود آلي." : "For dimensions from d160 to d630 mm, butt welding machines or electrofusion sockets with barcode scanning are utilized."
    }
  ];

  // Der Graph wird erst hier gebaut, nachdem Katalogliste und FAQ feststehen.
  // Beide sind auf der Seite sichtbar und gehörten von Anfang an ausgezeichnet:
  // Die statische Route überschattet `produkte/[category]`, wo ItemList und
  // FAQPage bereits erzeugt wurden — die fünf größten Kategorien bekamen
  // deshalb das dünnere Schema. `mainEntity` zeigt jetzt auf die Liste statt
  // auf die Organisation; Hauptgegenstand einer Kategorieseite ist ihr Sortiment.
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/produkte/fittings",
      type: "CollectionPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/produkte/fittings#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/produkte/fittings#itemlist`,
      hasPartIds: [`${siteUrl}/${locale}/produkte/fittings#faq`],
    }),
    getItemListGraphNode({ locale, category: 'fittings', name: title, items: fittingItems }),
    getFaqGraphNode(
      fittingsFaq.map((f) => ({ question: f.q, answer: f.a })),
      `${siteUrl}/${locale}/produkte/fittings`
    ),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: "/produkte" },
      { name: tNav('fittings') || (locale === "de" ? "Fittings" : locale === "ar" ? "الوصلات" : "Fittings"), path: "/produkte/fittings" },
    ]),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={jsonLd} />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background border-b border-card-border relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Shield size={13} />
              Made in Germany
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              DIN EN ISO 15874
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              DVGW W270 · KTW
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-accent-strong text-xs font-mono font-bold">
              {p.trustPressure}
            </span>
          </div>

          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow') || "HOCHPRÄZISE FORMTEILE"}
            title={t('hero.title') || "PP-R & PP-RCT Fittings für dauerhaft dichte Rohrleitungsnetze"}
            lead={t('hero.lead') || "Umfassendes Sortiment an Muffen, Winkeln, T-Stücken, Reduzierungen und Flanschen von d20 bis d630 mm. Homogen verschweißt für 100 % Leckagefreiheit."}
            align="center"
            className="mb-8 max-w-4xl mx-auto"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Button variant="primary" href="#catalog-section">
              {p.browseCatalog}
            </Button>
            <Button variant="secondary" href="/projektanfrage">
              {p.sendRfq}
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics StatBand */}
      <section className="py-12 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <StatBand stats={fittingStats} />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CategoryCatalogSection
        category="fittings"
        items={fittingItems}
        title={p.catalogTitle}
        subtitle={p.catalogSub}
        locale={locale}
      />

      {/* 6 Fitting Component Families Bento Grid */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Layers size={14} />
              <span>{p.bentoEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.bentoTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.bentoLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.families.map((fam, idx) => {
              const icons = [Disc, CornerUpRight, GitFork, Layers, Zap, Flame];
              const IconComp = icons[idx] || Layers;
              return (
                <div key={idx} className="rounded-2xl bg-card border border-card-border p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <IconComp size={20} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{fam.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fam.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hydraulic & Roughness Comparison Matrix */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu size={14} />
              <span>{p.matrixEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.matrixTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.matrixLead}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm">
            <DeepMatrix
              head={hydraulicMatrixHead}
              rows={hydraulicMatrixRows}
              heroCol={0}
              note={p.matrixNote}
            />
          </div>
        </div>
      </section>

      {/* Polyfusion Socket Fusion Workflow */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} />
                <span>{p.workflowEyebrow}</span>
              </div>
              <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
                {p.workflowTitle}
              </h2>
              <p className="text-lead text-muted-foreground mt-4 leading-relaxed">
                {p.workflowLead}
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/produkte/tools">
                  {p.workflowBtn}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-card border border-card-border p-8 shadow-sm">
              <StepFlow steps={fusionWorkflow} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <HorizontalTimeline
        title={p.timelineTitle}
        description={p.timelineDesc}
        items={fittingsTimeline}
      />

      {/* Structured SEO Guide */}
      {tSeo.has("guideText") && (
        <section id="fittings-engineering-guide" className="py-20 bg-background border-b border-card-border scroll-mt-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="max-w-4xl mx-auto rounded-2xl bg-card border border-card-border p-8 md:p-12 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span>{p.guideEyebrow}</span>
              </div>
              <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
                <div dangerouslySetInnerHTML={{ __html: String(tSeo.raw("guideText")).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>') }} />
              </article>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.faqTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.faqLead}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <DeepFAQ items={fittingsFaq} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title') || "Finden Sie die passenden Formteile für Ihr Projekt"}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc') || "Unser Team hilft Ihnen bei der Stücklistenerstellung, Mengenermittlung und technischen Auslegung."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('cta.primary') || "Projektanfrage senden"}
              </Button>
              <Button variant="secondary" href="/produkte">
                {p.ctaOverview}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>
    </div>
  );
}

