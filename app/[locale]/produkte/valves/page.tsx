import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
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
import { Shield, Sparkles, CheckCircle2, CircleDot, Sliders, ShieldCheck, Gauge, Layers, Cpu, ArrowUpDown } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const titles: Record<string, [string, string]> = {
  de: ['PP-R & PP-RCT Ventile & Absperrorgane | K-Aqua', 'Robuste Kunststoff-Kugelhähne, Unterputzventile und Rückschlagventile für Industrie- und Gebäudetechnik. Direkt verschweißbar.'],
  en: ['PP-R & PP-RCT Valves & Fluid Controls | K-Aqua', 'Robust plastic ball valves, concealed valves, and check valves for industrial and commercial plumbing. Direct socket fusion.'],
  ar: ['صمامات PP-R و PP-RCT للتحكم في السوائل | K-Aqua', 'صمامات كروية وصمامات مدفونة وصمامات عدم رجوع متينة لتطبيقات السباكة الصناعية والتجارية.']
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [title, description] = titles[locale] ?? titles['en']!;
  return constructMetadata({
    title,
    description,
    path: "/produkte/valves",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.valves' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.valves" });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const [title, description] = titles[locale] ?? titles['en']!;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/produkte/valves",
      type: "CollectionPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/produkte/valves#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: "/produkte" },
      { name: tNav('valves') || (locale === "de" ? "Ventile" : locale === "ar" ? "الصمامات" : "Valves"), path: "/produkte/valves" },
    ]),
  ]);

  const valveCategory = CATALOG.find((c) => c.id === 'valves');
  const valveItems = valveCategory?.items || [];

  const isAr = locale.startsWith('ar');
  const isDe = locale === 'de';

  const PAGE_I18N = {
    de: {
      trustDirect: '100 % Direktverschweißung',
      trustFullBore: 'Full Bore (Voller Durchgang)',
      trustHydro: '100 % Hydrostatisch geprüft',
      catalogBtn: 'Ventilkatalog durchsuchen',
      rfqBtn: 'Projektanfrage stellen',
      catalogTitle: 'Ventile & Absperrorgane im Überblick',
      catalogSub: 'Entdecken Sie direkt verschweißbare Kugelhähne, Unterputzventile, Geradsitz-, Schrägsitz- und Rückschlagventile von d20 bis d110 mm.',
      bentoEyebrow: 'ARMATUREN-ARCHETYPEN',
      bentoTitle: 'Die 4 Kern-Ventilfamilien von K-Aqua',
      bentoLead: 'Präzise Absperrung und Regulierung ohne metallische Schwachstellen oder Korrosionsrisiken.',
      archetypes: [
        { t: 'Kugelhähne (Ball Valves)', d: 'Voller Durchgang (Full Bore) für minimalen Druckverlust. 90°-Vierteldrehung, ausblassichere Spindel und isolierter Bedienhebel gegen Kondensat.', badge: '✓ Full Bore · d20–d110' },
        { t: 'Unterputzventile', d: 'Elegante Sichtmontage in Sanitärräumen, Hotels und Krankenhäusern. Mit langlebigen austauschbaren Oberteilen und verchromten Griffen.', badge: '✓ Austauschbare Oberteile' },
        { t: 'Schrägsitzventile', d: 'Perfekt für die feinfühlige Einregulierung und sichere Drosselung von Volumenströmen in Steigleitungen und Verteilerstationen.', badge: '✓ Feine Einregulierung' },
        { t: 'Rückschlagventile', d: 'Automatischer Schutz vor schädlichem Rückfluss und gefährlichen Druckschlägen an Umwälzpumpen und Kältemaschinen.', badge: '✓ Rückflussschutz' },
      ],
      matrixEyebrow: 'ARMATUREN-VERGLEICH',
      matrixTitle: 'PP-R Vollkunststoff vs. Konventionelle Metall-Armaturen',
      matrixLead: 'Warum direkt verschweißte Kunststoffarmaturen im B2B-Projektbetrieb erhebliche Kosten- und Sicherheitsvorteile bieten.',
      matrixNote: 'K-Aqua Kunststoffarmaturen eliminieren das Problem festsitzender Spindeln durch Kalkinkrustation vollständig. Wartungsintervalle entfallen über die gesamte Lebensdauer.',
      qaEyebrow: 'QUALITÄTSSICHERUNG',
      qaTitle: '100 % geprüft für 50+ Jahre Betriebssicherheit',
      qaLead: 'Jedes K-Aqua Ventil wird im Werk einzeln druckgeprüft und kann ohne zusätzliche Übergangsflansche direkt in das Rohrsystem eingeschweißt werden.',
      qaBtn: 'Beratung für Ventilauslegung anfragen',
      timelineTitle: 'Evolution der K-Aqua Ventiltechnik',
      timelineDesc: 'Von einfachen Absperrhähnen zu zertifizierten B2B-Vollkunststoff-Armaturen.',
      guideEyebrow: 'FACHWISSEN & TECHNISCHER LEITFADEN',
      faqTitle: 'Häufig gestellte Fragen zu Armaturen & Ventilen',
      faqLead: 'Antworten zu Durchflusskoeffizienten, Werkstoffbeständigkeit und Schweißanschluss.',
      ctaOverview: 'Zur Produktübersicht',
    },
    en: {
      trustDirect: '100% Direct Socket Fusion',
      trustFullBore: 'Full Bore Flow Profile',
      trustHydro: '100% Hydrostatically Tested',
      catalogBtn: 'Search Valves Catalog',
      rfqBtn: 'Submit Project RFQ',
      catalogTitle: 'Valves & Isolation Equipment Overview',
      catalogSub: 'Explore direct-fusion ball valves, concealed valves, globe/slant valves, and non-return check valves from d20 to d110 mm.',
      bentoEyebrow: 'VALVE ARCHETYPES',
      bentoTitle: 'The 4 Core Valve Families of K-Aqua',
      bentoLead: 'Precise isolation and flow regulation without metallic vulnerabilities or corrosion hazards.',
      archetypes: [
        { t: 'Ball Valves', d: 'Full bore design for minimal pressure drop. 90° quarter-turn operation, blowout-proof stem, and insulated handle preventing condensation.', badge: '✓ Full Bore · d20–d110' },
        { t: 'Concealed Valves', d: 'Architectural in-wall installation for hotels, commercial restrooms, and hospitals. Replaceable top parts and chrome handles.', badge: '✓ Replaceable Top Inserts' },
        { t: 'Globe & Slant Valves', d: 'Engineered for fine volume throttling and precise hydraulic balancing across vertical risers and distribution manifolds.', badge: '✓ Fine Throttling Flow' },
        { t: 'Check Valves', d: 'Automatic backflow prevention protecting pumps, chillers, and district systems against damaging hydraulic water hammer.', badge: '✓ Backflow Prevention' },
      ],
      matrixEyebrow: 'VALVE BENCHMARK',
      matrixTitle: 'PP-R Polymer Valves vs Conventional Metal Valves',
      matrixLead: 'Why directly welded plastic valves offer superior durability, safety, and total cost of ownership in commercial B2B projects.',
      matrixNote: 'K-Aqua plastic valves completely eliminate seized stems caused by limescale encrustation, eliminating maintenance routines across the entire service life.',
      qaEyebrow: 'QUALITY ASSURANCE',
      qaTitle: '100% Tested for 50+ Years Operational Reliability',
      qaLead: 'Every K-Aqua valve is individually hydrostatic pressure-tested in the factory and welds directly into piping without extra transition flanges.',
      qaBtn: 'Request Valve Sizing Consultation',
      timelineTitle: 'Evolution of K-Aqua Valve Engineering',
      timelineDesc: 'From basic shutoff cocks to certified commercial polymer valve systems in Germany.',
      guideEyebrow: 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE',
      faqTitle: 'Frequently Asked Questions on Valves & Actuation',
      faqLead: 'Technical answers regarding flow coefficients, chemical resistance, and fusion connection.',
      ctaOverview: 'To Product Overview',
    },
    ar: {
      trustDirect: 'لحام حراري مباشر 100%',
      trustFullBore: 'تدفق كامل (Full Bore)',
      trustHydro: 'اختبار هيدروستاتيكي 100%',
      catalogBtn: 'تصفح كتالوج الصمامات',
      rfqBtn: 'تقديم طلب مشروع',
      catalogTitle: 'نظرة عامة على الصمامات وأجهزة العزل',
      catalogSub: 'اكتشف محابس الكرة القابلة للحام المباشر، الصمامات المدفونة، صمامات المقعد المائل وصمامات عدم الرجوع من d20 إلى d110 مم.',
      bentoEyebrow: 'أنماط وعائلات الصمامات',
      bentoTitle: 'عائلات الصمامات الأربع الأساسية من K-Aqua',
      bentoLead: 'عزل وتحكم دقيق في التدفق دون أي نقاط ضعف معدنية أو مخاطر للتآكل والترسب.',
      archetypes: [
        { t: 'محابس الكرة (Ball Valves)', d: 'تدفق كامل (Full Bore) لأدنى فقد في الضغط، مع حركة 90° ومقبض معزول حرارياً لمنع تكثف الرطوبة.', badge: '✓ تدفق كامل · d20–d110' },
        { t: 'الصمامات المدفونة (Concealed)', d: 'تصميم أنيق داخل الجدار للفنادق والمستشفيات والمنشآت الصحية، مع أجزاء علوية قابلة للاستبدال ومقابض كروم.', badge: '✓ أجزاء علوية قابلة للتغيير' },
        { t: 'صمامات المقعد المائل (Globe)', d: 'مثالية للموازنة الهيدروليكية الدقيقة وضبط تدفق السوائل في الأعمدة الصاعدة ومحطات التوزيع.', badge: '✓ معايرة هيدروليكية دقيقة' },
        { t: 'صمامات عدم الرجوع (Check)', d: 'حماية تلقائية ضد التدفق العكسي والصدمات الهيدروليكية لحماية مضخات التدوير وأجهزة التبريد.', badge: '✓ حماية من التدفق العكسي' },
      ],
      matrixEyebrow: 'مقارنة الصمامات',
      matrixTitle: 'صمامات البوليمر PP-R مقابل الصمامات المعدنية التقليدية',
      matrixLead: 'لماذا توفر صمامات البوليمر الملحومة مباشرة مزايا تشغيلية واقتصادية متفوقة للمشاريع الكبرى.',
      matrixNote: 'صمامات K-Aqua البلاستيكية تقضي تماماً على مشكلة تصلب الجلب الناتجة عن التكلس، مما يلغي فترات الصيانة طوال عمرها التشغيلي.',
      qaEyebrow: 'ضمان الجودة والاختبار',
      qaTitle: 'مختبرة 100% لأكثر من 50 عاماً من الاعتمادية',
      qaLead: 'يتم اختبار كل صمام من K-Aqua فردياً في المصنع تحت الضغط ويلحم مباشرة بالأنبوب دون الحاجة لشفاه أو محولات إضافية.',
      qaBtn: 'طلب استشارة لتحديد مقاسات الصمامات',
      timelineTitle: 'تطور هندسة الصمامات في K-Aqua',
      timelineDesc: 'من محابس الغلق البسيطة إلى أنظمة صمامات البوليمر المعتمدة للمشاريع في ألمانيا.',
      guideEyebrow: 'الخبرة الفنية والدليل الهندسي',
      faqTitle: 'الأسئلة الشائعة حول الصمامات والمحابس',
      faqLead: 'إجابات فنية حول معاملات التدفق ومقاومة المواد الكيميائية والتوصيل باللحام.',
      ctaOverview: 'إلى نظرة عامة على المنتجات',
    }
  };

  const p = isAr ? PAGE_I18N.ar : isDe ? PAGE_I18N.de : PAGE_I18N.en;

  const valveStats = [
    { n: "20–110", u: "mm", l: isDe ? "Direkt verschweißbare Dimensionen" : isAr ? "مقاسات اللحام المباشر" : "Direct socket fusion dimensions" },
    { n: "100", u: "%", l: isDe ? "Werkseitige Druckprüfung" : isAr ? "اختبار هيدروستاتيكي مصنعي" : "Factory hydrostatic pressure tested" },
    { n: "Full Bore", u: "DN", l: isDe ? "Voller Durchgang ohne Verengung" : isAr ? "تدفق كامل دون أي تضييق" : "Full bore flow profile" },
    { n: "-20 bis +95", u: "°C", l: isDe ? "Thermischer Einsatzbereich" : isAr ? "نطاق درجات حرارة التشغيل" : "Operating temperature range" },
  ];

  const valveMatrixHead = [
    isDe ? "Armaturen-Merkmal" : isAr ? "خاصية الصمام" : "Feature",
    isDe ? "K-Aqua PP-R Kunststoff-Armatur" : isAr ? "صمام K-Aqua البوليمري PP-R" : "K-Aqua PP-R Valve",
    isDe ? "Konventionelle Messing-/Guss-Armatur" : isAr ? "الصمام المعدني التقليدي (نحاس/حديد)" : "Conventional Metal Valve",
  ];

  const valveMatrixRows = [
    [isDe ? "Verbindungstechnik" : isAr ? "تقنية الربط" : "Joining method", isDe ? "100% homogene Polyfusion (Schweißmuffe)" : isAr ? "لحام حراري متجانس 100% (بدون فواصل)" : "Direct socket fusion weld", isDe ? "Schraubgewinde / Flansch mit Dichtungsalterung" : isAr ? "سن قلاووظ أو فلنجة مع تقادم الجوانات" : "Threaded / Flanged with gasket aging"],
    [isDe ? "Korrosions- & Inkrustationsrisiko" : isAr ? "مخاطر التآكل والتكلس" : "Corrosion / Scaling", isDe ? "Absolut 0 % (Glattes Polymer k=0,007 mm)" : isAr ? "منعدم تماماً 0% (جدار أملس k=0.007 مم)" : "Zero (k=0.007 mm)", isDe ? "Hoch (Kalkansatz, Rost, Entzinkung)" : isAr ? "مرتفع (ترسبات كلسية، صدأ، نزع الزنك)" : "High (Limescale, rust, dezincification)"],
    [isDe ? "Gewicht & Handhabung" : isAr ? "الوزن وسهولة التركيب" : "Weight & handling", isDe ? "Sehr leicht (~ 70 % leichter als Metall)" : isAr ? "خفيف جداً (~ 70% أخف من المعادن)" : "~ 70% lighter than metal", isDe ? "Schwer (benötigt zusätzliche Konsolen)" : isAr ? "ثقيل (يتطلب تدعيماً وحوامل إضافية)" : "Heavy (requires extra brackets)"],
    [isDe ? "Kondenswasserbildung (Kälte)" : isAr ? "تكثف الرطوبة (التكييف)" : "Condensation (HVAC)", isDe ? "Minimiert (thermisch isolierter Hebel & Körper)" : isAr ? "شبه منعدم (مقبض وجسم معزول حرارياً)" : "Minimized (insulated body & lever)", isDe ? "Sehr stark (Kältebrücke am Metallgehäuse)" : isAr ? "مرتفع جداً (جسر حراري على المعدن)" : "High (thermal bridge on metal)"],
    [isDe ? "Wartungs- & Lebenszykluskosten" : isAr ? "تكاليف الصيانة ودورة الحياة" : "Maintenance & TCO", isDe ? "Wartungsfrei über 50+ Jahre" : isAr ? "خالٍ من الصيانة لأكثر من 50 عاماً" : "Maintenance-free 50+ years", isDe ? "Regelmäßiger Dichtungs- und Ventiltausch" : isAr ? "استبدال دوري للجوانات وقلب المحبس" : "Periodic gasket & valve replacement"],
  ];

  const qaSteps = [
    {
      t: isDe ? "1. Präzisions-Spritzguss der Schweißenden" : isAr ? "1. الحقن الدقيق لنهايات اللحام" : "1. Precision Injection Molding",
      d: isDe ? "Die Ventilgehäuse werden aus hochgradig druckfestem PP-R/PP-RCT mit exakten Muffenmaßen für das Polyfusionsschweißen gefertigt." : isAr ? "تُصنع أجسام الصمامات من مادة PP-R/PP-RCT عالية المقاومة للضغط مع تفاوتات دقيقة لنهايات اللحام الحراري." : "Valve bodies molded from high-grade PP-R/PP-RCT with calibrated socket tolerances."
    },
    {
      t: isDe ? "2. Hochleistungs-Dichtungspaket (PTFE & EPDM)" : isAr ? "2. حزمة إحكام فائقة (PTFE و EPDM)" : "2. High-Performance PTFE/EPDM Seals",
      d: isDe ? "Reines PTFE für die Kugelpackung und ozonbeständiges EPDM für die Spindel garantieren dauerhaft leichtgängige Betätigung ohne Festsetzen." : isAr ? "تفلون PTFE نقي لمقعد الكرة ومطاط EPDM المقاوم للأوزون للعمود يضمنان حركة سلسة دائمة دون أي تصلب." : "Pure PTFE seats and ozone-resistant EPDM O-rings ensure smooth operation without seizing."
    },
    {
      t: isDe ? "3. 100 % Hydrostatische Werkprüfung" : isAr ? "3. اختبار ضغط هيدروستاتيكي 100%" : "3. 100% Hydrostatic Pressure Testing",
      d: isDe ? "Jedes einzelne Absperrorgan durchläuft vor der Freigabe eine automatisierte Dichtheits- und Druckprüfung mit dem 1,5-fachen Nenndruck." : isAr ? "يخضع كل صمام لاختبار ضغط هيدروستاتيكي آلي فردي عند 1.5 ضعف الضغط الاسمي قبل اعتماده وشحنه." : "Every single valve undergoes individual automated pressure testing at 1.5x nominal pressure before dispatch."
    },
    {
      t: isDe ? "4. Homogene Direkteinschweißung vor Ort" : isAr ? "4. اللحام المباشر المتجانس في الموقع" : "4. Direct Socket Fusion On Site",
      d: isDe ? "Keine teuren Übergangsstücke oder Flansche erforderlich. Das Ventil verschmilzt direkt und unlösbar mit der Rohrleitung." : isAr ? "لا حاجة لمقاطع انتقال أو فلنجات باهظة التكلفة، حيث يندمج الصمام جزيئياً ومباشرة مع خط الأنابيب." : "No costly transition adapters needed. The valve welds directly and permanently into the pipe network."
    }
  ];

  const valvesTimeline = [
    {
      year: "2004",
      title: isDe ? "Erste Vollkunststoff-Kugelhähne" : isAr ? "أول محابس كرة بلاستيكية بالكامل" : "1st Full-Plastic Ball Valves",
      text: isDe ? "Entwicklung der ersten direkt verschweißbaren PP-R Kugelhähne mit PTFE-Dichtsitz." : isAr ? "تطوير أول محابس كرة PP-R قابلة للحام المباشر مع مقاعد تفلون PTFE." : "Development of first direct-welded PP-R ball valves with PTFE seats."
    },
    {
      year: "2013",
      title: isDe ? "Unterputz- & Schrägsitzarmaturen" : isAr ? "صمامات المقعد المائل والصمامات المدفونة" : "Concealed & Globe Valves",
      text: isDe ? "Einführung von Unterputzventilen mit verchromten Rosetten für Hotels und Krankenhäuser." : isAr ? "إطلاق الصمامات المدفونة مع لمسات كروم أنيقة للمستشفيات والفنادق الفاخرة." : "Launch of concealed valves with chrome handles for commercial hotels and healthcare."
    },
    {
      year: "2020",
      title: isDe ? "HVAC Isolierhebel & Full-Bore Optimierung" : isAr ? "مقابض معزولة للتكييف وتدفق كامل" : "HVAC Insulated Levers & Full Bore",
      text: isDe ? "Integration thermisch entkoppelter Bedienhebel gegen Kondensatbildung in Kältenetzen." : isAr ? "دمج مقابض تشغيل معزولة حرارياً لمنع تكثف قطرات الماء في شبكات المياه المبردة." : "Integration of thermally isolated handles preventing sweat water in chilled water networks."
    },
    {
      year: "2024+",
      title: isDe ? "Industrie-Großarmaturen bis d110 mm" : isAr ? "صمامات صناعية ضخمة حتى d110 مم" : "Large Industrial Valves up to d110 mm",
      text: isDe ? "Erweiterung auf Großabsperrventile für Rechenzentren, Geothermie und industrielle Prozessströme." : isAr ? "توسيع تشكيلة الصمامات الكبيرة لمراكز البيانات والطاقة الجوفية والعمليات الصناعية." : "Expansion to large isolation valves for data centers, geothermal, and process flows."
    }
  ];

  const valvesFaq = [
    {
      q: isDe ? "Warum ist die direkte Polyfusionsschweißung bei Ventilen überlegen?" : isAr ? "لماذا يعتبر اللحام الحراري المباشر للصمامات متفوقاً هندسياً؟" : "Why is direct socket fusion superior for valves?",
      a: isDe ? "Weil das Ventilgehäuse direkt mit dem K-Aqua PP-R/PP-RCT Rohr verschmilzt. Dadurch entfallen metallische Schraubgewinde, Hanf/Teflonband und lösbare Dichtungen, die im Laufe der Jahre durch Vibrationen oder Druckstöße leckschlagen können." : isAr ? "لأن جسم الصمام يندمج جزيئياً مع الأنبوب مما يلغي الأسنان القلاووظ والجوانات التي تتقادم بمرور السنين وتسبب التسريب بفعل الاهتزازات أو الطرق المائي." : "Because the valve body fuses directly into the PP-R pipe, eliminating metal threads and gaskets that degrade over time from vibration or water hammer."
    },
    {
      q: isDe ? "Wie verhindert der Spezialhebel Schwitzwasser in Kühlsystemen?" : isAr ? "كيف يمنع المقبض الخاص تكثف قطرات الماء في أنظمة التبريد؟" : "How does the insulated lever prevent condensation in HVAC systems?",
      a: isDe ? "Unsere K-Aqua Kugelhähne verfügen über einen thermisch isolierten Bedienhebel und eine verlängerte Spindelführung. Dadurch wird die thermische Kältebrücke zum Raum unterbrochen, sodass sich keine Feuchtigkeit am Griff niederschlägt." : isAr ? "تتميز محابس K-Aqua بمقبض معزول حرارياً مع رقبة ممتدة تقطع الجسر الحراري وتمنع تشكل الرطوبة أو العرق على المقبض في شبكات التكييف." : "Our ball valves feature thermally isolated handles and extended stems preventing thermal bridging and sweat water in cooling systems."
    },
    {
      q: isDe ? "Sind die Dichtelemente (PTFE/EPDM) beständig gegen aggressive Medien?" : isAr ? "هل عناصر الإحكام (PTFE/EPDM) مقاومة للمواد الكيميائية؟" : "Are the PTFE/EPDM seals resistant to chemicals?",
      a: isDe ? "Ja, reines PTFE (Polytetrafluorethylen) und hochwertiges EPDM bieten hervorragende chemische Resistenz gegenüber wässrigen Salzlösungen, verdünnten Säuren, Laugen und Glykol-Wassergemischen (pH 1–14)." : isAr ? "نعم، يوفر التفلون PTFE ومطاط EPDM مقاومة كيميائية فائقة للمحاليل الملحية والأحماض والقلويات المخففة ومخاليط الجليكول (pH 1–14)." : "Yes, pure PTFE and premium EPDM offer superior chemical resistance to saline solutions, dilute acids, alkalis, and glycol mixtures."
    },
    {
      q: isDe ? "Können Ventiloberteile im laufenden Gebäudebetrieb gewartet werden?" : isAr ? "هل يمكن صيانة واستبدال الأجزاء العلوية للصمام أثناء تشغيل المبنى؟" : "Can valve tops be serviced during building operation?",
      a: isDe ? "Ja, insbesondere unsere Unterputz- und Schrägsitzventile besitzen austauschbare Spindeloberteile. Das Schweißgehäuse bleibt fest in der Wand oder Trasse verrohrt, während der Ventileinsatz bei Bedarf schnell erneuert werden kann." : isAr ? "نعم، تتميز الصمامات المدفونة وصمامات المقعد المائل بأجزاء علوية قابلة للاستبدال بسهولة مع بقاء جسم الصمام الملحوم ثابتاً في الجدار دون تكسير." : "Yes, concealed and globe valves feature replaceable head parts while the welded body remains securely in the wall or pipe chase."
    },
    {
      q: isDe ? "Welcher Druckverlust entsteht bei K-Aqua Kugelhähnen?" : isAr ? "ما هو معدل فقدان الضغط في محابس كرة K-Aqua؟" : "What is the pressure loss across K-Aqua ball valves?",
      a: isDe ? "K-Aqua Kugelhähne sind als 'Full Bore' (voller Durchgang) konstruiert. Die Bohrung in der Kugel entspricht exakt dem Rohrinnendurchmesser, sodass der Druckverlustbeiwert zeta (ζ) vernachlässigbar gering ist." : isAr ? "صُممت محابس كرة K-Aqua بتدفق كامل (Full Bore) يطابق القطر الداخلي للأنبوب، مما يجعل معامل فقدان الضغط (zeta) ضئيلاً جداً ولا يذكر." : "K-Aqua ball valves feature full bore design with ball apertures matching pipe inner diameters, keeping pressure loss coefficient zeta negligible."
    }
  ];

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
              {p.trustDirect}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              {p.trustFullBore}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-accent-strong text-xs font-mono font-bold">
              {p.trustHydro}
            </span>
          </div>

          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow') || "INDUSTRIE- & GEBÄUDEARMATUREN"}
            title={t('hero.title') || "Robuste PP-R & PP-RCT Ventile für präzise Mediensteuerung"}
            lead={t('hero.lead') || "Kugelhähne, Unterputzventile, Schrägsitzventile und Rückschlagklappen aus Hochleistungspolymeren. Korrosionsfrei, inkrustationssicher und direkt ins Rohrsystem einschweißbar."}
            align="center"
            className="mb-8 max-w-4xl mx-auto"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Button variant="primary" href="#catalog-section">
              {p.catalogBtn}
            </Button>
            <Button variant="secondary" href="/projektanfrage">
              {p.rfqBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metric StatBand */}
      <section className="py-12 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <StatBand stats={valveStats} />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CategoryCatalogSection
        category="valves"
        items={valveItems}
        title={p.catalogTitle}
        subtitle={p.catalogSub}
        locale={locale}
      />

      {/* 4 Valve Archetypes Bento Grid */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.archetypes.map((arch, idx) => {
              const icons = [CircleDot, Sparkles, Sliders, ArrowUpDown];
              const IconComp = icons[idx] || CircleDot;
              return (
                <div key={idx} className="rounded-2xl bg-card border border-card-border p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">{arch.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {arch.d}
                    </p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-card-border text-xs font-mono font-bold ${idx === 2 ? 'text-accent-strong' : 'text-primary'}`}>
                    {arch.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Polymer vs Metal Valves */}
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
              head={valveMatrixHead}
              rows={valveMatrixRows}
              heroCol={1}
              note={p.matrixNote}
            />
          </div>
        </div>
      </section>

      {/* 4-Step QA and Direct Fusion Process */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck size={14} />
                <span>{p.qaEyebrow}</span>
              </div>
              <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
                {p.qaTitle}
              </h2>
              <p className="text-lead text-muted-foreground mt-4 leading-relaxed">
                {p.qaLead}
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/projektanfrage">
                  {p.qaBtn}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-card border border-card-border p-8 shadow-sm">
              <StepFlow steps={qaSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <HorizontalTimeline
        title={p.timelineTitle}
        description={p.timelineDesc}
        items={valvesTimeline}
      />

      {/* Structured SEO Guide */}
      {tSeo.has("guideText") && (
        <section id="valves-engineering-guide" className="py-20 bg-background border-b border-card-border scroll-mt-24">
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
            <DeepFAQ items={valvesFaq} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t.has('cta.title') ? t('cta.title') : (isDe ? "Präzise und sichere Absperrorgane für Ihr Rohrnetz" : isAr ? "صمامات تحكم دقيقة وآمنة لشبكتك" : "Precise and Secure Fluid Control Valves")}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t.has('cta.desc') ? t('cta.desc') : (isDe ? "Vermeiden Sie Korrosionsschäden und teure Wartungsausfälle durch vollverschweißte K-Aqua Qualitätsventile." : isAr ? "تجنب أضرار التآكل وتكاليف الصيانة الباهظة مع صمامات K-Aqua الملحومة بالكامل." : "Eliminate corrosion failures and costly maintenance with fully welded K-Aqua valves.")}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t.has('cta.primary') ? t('cta.primary') : (isDe ? "Projektanfrage senden" : isAr ? "إرسال طلب مشروع" : "Submit Project Inquiry")}
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

