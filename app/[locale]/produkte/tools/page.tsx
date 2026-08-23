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
import { Shield, Sparkles, CheckCircle2, Wrench, Thermometer, Scissors, Disc, Layers, Cpu, Flame } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const titles: Record<string, [string, string]> = {
  de: ['Profi-Schweißwerkzeuge & Montagemaschinen | K-Aqua', 'Elektronisch geregelte Muffenschweißgeräte, Scheren, Schälgeräte und Sattelwerkzeuge für PP-R und PP-RCT Rohre. DVS 2207 konform.'],
  en: ['Professional Welding Tools & Installation Machinery | K-Aqua', 'Electronically regulated socket fusion machines, pipe shears, peeling tools, and saddle dies for PP-R and PP-RCT pipes. DVS 2207 compliant.'],
  ar: ['أدوات اللحام الاحترافية وآلات التركيب | K-Aqua', 'آلات لحام المقابس المنظمة إلكترونيًا، مقصات الأنابيب، أدوات التقشير وقوالب السرج لأنابيب PP-R و PP-RCT.']
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [title, description] = titles[locale] ?? titles['en']!;
  return constructMetadata({
    title,
    description,
    path: "/produkte/tools",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.tools' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.tools" });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const [title, description] = titles[locale] ?? titles['en']!;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");

  const toolCategory = CATALOG.find((c) => c.id === 'tools');
  const toolItems = toolCategory?.items || [];

  const isAr = locale.startsWith('ar');
  const isDe = locale === 'de';

  const PAGE_I18N = {
    de: {
      trustMicro: '260 °C Mikroprozessor-Regelung',
      trustPtfe: 'PTFE-Beschichtung Klasse A',
      trustDvs: 'DVS 2207 / 2208 Konform',
      catalogBtn: 'Werkzeugkatalog durchsuchen',
      consultBtn: 'Werkzeugset-Beratung anfragen',
      catalogTitle: 'Schweißgeräte & Werkzeugkatalog',
      catalogSub: 'Wählen Sie aus Hand-Muffenschweißgeräten, semi-stationären Schweißmaschinen, Schneidwerkzeugen, Schälgeräten und Sattelschweiß-Zubehör.',
      bentoEyebrow: 'GERÄTE-PORTFOLIO',
      bentoTitle: 'Die 4 Werkzeugkategorien von K-Aqua',
      bentoLead: 'Alles für den professionellen Baustellen- und Werkstatteinsatz nach DVS-Standards.',
      families: [
        { t: 'Handschweißgeräte (Koffer)', d: '800 W und 1000 W Komplettsets im stabilen Stahlblechkoffer mit Tischklemme, Haltefuß und PTFE-Schweißaufsätzen für d20 bis d63 mm.', badge: '✓ 260 °C ± 5 °C · d20–d63' },
        { t: 'Schweißmaschinen (d50–125)', d: 'Mechanischer Schlittenantrieb für ermüdungsfreie, exakt axiale Kraftaufbringung bei Großrohren und Vorfertigungen in der Werkstatt.', badge: '✓ Axialer Schlitten · d50–d125' },
        { t: 'Scheren & Abschneider', d: 'Präzise Ratschenscheren bis d40 mm und vierfach kugelgelagerte Rollen-Rohrabschneider bis d125 mm für gratfreie 90°-Rechtwinkelschnitte.', badge: '✓ Gehärtete Klingen · 90°' },
        { t: 'Sattel- & Reparatursets', d: 'Stufenbohrer, konkave Sattelschweißwerkzeuge und Lochreparatur-Heizdorne für sekundenschnelle Leitungsabzweige und Leckageversiegelungen.', badge: '✓ Schnelle Nachrüstung' },
      ],
      matrixEyebrow: 'DVS 2207 SCHWEISSTABELLE',
      matrixTitle: 'Schweißzeiten & Parameter für PP-R & PP-RCT',
      matrixLead: 'Verbindliche Richtwerte nach DVS 2207-11 bei 260 °C Schweißtemperatur für perfekte Molekularverschmelzung.',
      matrixNote: 'Werte gelten bei 20 °C Umgebungstemperatur. Bei Außentemperaturen unter +5 °C ist die Anwärmzeit um ca. 50 % zu verlängern. Eine Schutzumhausung gegen Wind und Zugluft wird dringend empfohlen.',
      workflowEyebrow: 'SCHWEISSANLEITUNG',
      workflowTitle: 'Die 4 Phasen der perfekten Polyfusion',
      workflowLead: 'Präzise Vorbereitung, kontrolliertes Anwärmen und zügiges Fügen ohne Drehung garantieren eine 100 % dichte Nahtstelle, die stärker ist als das Vollrohr.',
      workflowBtn: 'Schulung & Einweisung buchen',
      timelineTitle: 'Meilensteine der K-Aqua Werkzeugentwicklung',
      timelineDesc: 'Von manuellen Geräten zu mikroprozessorgesteuerter Industrietechnik.',
      guideEyebrow: 'FACHWISSEN & TECHNISCHER LEITFADEN',
      faqTitle: 'Häufig gestellte Fragen zu Werkzeugen',
      faqLead: 'Wichtige Antworten zu Temperaturregelung, Pflege von PTFE-Aufsätzen und Reparaturverfahren.',
      ctaOverview: 'Zurück zur Produktübersicht',
    },
    en: {
      trustMicro: '260 °C Microprocessor Control',
      trustPtfe: 'Class A PTFE Die Coating',
      trustDvs: 'DVS 2207 / 2208 Compliant',
      catalogBtn: 'Search Tools Catalog',
      consultBtn: 'Tool Kit Consultation',
      catalogTitle: 'Fusion Welding Equipment & Tools Catalog',
      catalogSub: 'Select from manual socket fusion sets, semi-stationary welding machines, pipe cutters, peeling tools, and saddle fusion accessories.',
      bentoEyebrow: 'EQUIPMENT FAMILIES',
      bentoTitle: 'The 4 Tool Categories of K-Aqua',
      bentoLead: 'Engineered for commercial job sites and prefabrication workshops conforming to DVS standards.',
      families: [
        { t: 'Manual Welding Kits', d: '800 W and 1000 W complete sets in rugged steel cases with table clamp, floor stand, and PTFE dies for d20 to d63 mm.', badge: '✓ 260 °C ± 5 °C · d20–d63' },
        { t: 'Bench Fusion Machines (d50–125)', d: 'Slide-assisted mechanical carriage for fatigue-free, perfectly axial insertion pressure on large pipes and shop prefabrication.', badge: '✓ Axial Carriage · d50–d125' },
        { t: 'Shears & Rotary Cutters', d: 'Precision ratchet shears up to d40 mm and 4-roller heavy-duty cutters up to d125 mm for square 90° cuts without burrs.', badge: '✓ Hardened Blades · 90°' },
        { t: 'Saddle & Repair Kits', d: 'Step drills, concave saddle dies, and hole repair heating pins for fast branch tapping and puncture sealings.', badge: '✓ Fast Retrofit & Repair' },
      ],
      matrixEyebrow: 'DVS 2207 WELDING TABLE',
      matrixTitle: 'Welding Times & Heating Parameters for PP-R & PP-RCT',
      matrixLead: 'Binding technical benchmarks per DVS 2207-11 at 260 °C for flawless molecular polymer fusion.',
      matrixNote: 'Values apply at 20 °C ambient temperature. Below +5 °C, extend heating times by ~50% and shield the welding area from wind.',
      workflowEyebrow: 'FUSION WORKFLOW',
      workflowTitle: 'The 4 Phases of Perfect Polyfusion',
      workflowLead: 'Precise prep, controlled heating, and non-rotational insertion ensure a 100% leak-proof weld that exceeds pipe wall strength.',
      workflowBtn: 'Book Technical Training',
      timelineTitle: 'Milestones of K-Aqua Tool Engineering',
      timelineDesc: 'From manual sets to microprocessor-controlled industrial systems in Germany.',
      guideEyebrow: 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE',
      faqTitle: 'Frequently Asked Questions on Tools',
      faqLead: 'Essential insights into temperature control, PTFE maintenance, and hole repair procedures.',
      ctaOverview: 'Back to Product Overview',
    },
    ar: {
      trustMicro: 'تحكم دقيق بالمعالج عند 260 °م',
      trustPtfe: 'طلاء تفلون PTFE فئة أ',
      trustDvs: 'مطابق لمعايير DVS 2207 / 2208',
      catalogBtn: 'تصفح كتالوج الأدوات والمكائن',
      consultBtn: 'طلب استشارة لأطقم الأدوات',
      catalogTitle: 'أجهزة اللحام وكتالوج الأدوات',
      catalogSub: 'اختر من بين أجهزة لحام الجلب اليدوية، والمكائن شبه الثابتة، وأدوات القطع، وأدوات التقشير وملحقات لحام السروج.',
      bentoEyebrow: 'تشكيلة المعدات والأدوات',
      bentoTitle: 'فئات أدوات K-Aqua الأربع',
      bentoLead: 'كل ما تحتاجه لمواقع البناء وورش التجهيز المسبق وفقاً لأعلى معايير DVS.',
      families: [
        { t: 'أطقم اللحام اليدوية (حقائب)', d: 'أطقم متكاملة بقدرة 800 واط و 1000 واط في حقيبة معدنية متينة مع حامل وقوالب تفلون من d20 إلى d63 مم.', badge: '✓ 260 °م ± 5 °م · d20–d63' },
        { t: 'مكائن اللحام (d50–d125)', d: 'حركة ميكانيكية دقيقة لتطبيق ضغط إدخال محوري متجانس للأقطار الكبيرة وورش التجهيز المسبق.', badge: '✓ مزلقة محورية · d50–d125' },
        { t: 'مقصات وقواطع الأنابيب', d: 'مقصات تروس دقيقة حتى d40 مم وقواطع دوارة بأربع رمانات بلي حتى d125 مم لقطع قائم 90° بدون نتوءات.', badge: '✓ شفرات مقواة · 90°' },
        { t: 'أطقم السروج والإصلاح', d: 'ريش ثقب مدرجة، وقوالب لحام سروج مقعرة، وأدوات إصلاح الثقوب لعمل تفريعات سريعة ومعالجة الحفر غير المقصود.', badge: '✓ تفريع وإصلاح فوري' },
      ],
      matrixEyebrow: 'جدول معايير اللحام DVS 2207',
      matrixTitle: 'أوقات ومعايير اللحام لأنابيب PP-R و PP-RCT',
      matrixLead: 'المعايير المعتمدة وفق معيار DVS 2207-11 عند درجة حرارة 260 °م لاندماج جزيئي متكامل.',
      matrixNote: 'تسري هذه القيم عند 20 °م. وفي درجات الحرارة أقل من +5 °م يجب زيادة وقت التسخين بنسبة 50% وتوفير حماية من الرياح.',
      workflowEyebrow: 'دليل خطوات اللحام',
      workflowTitle: 'المراحل الأربع للحام الحراري المثالي',
      workflowLead: 'التحضير الدقيق، والتسخين المنضبط، والدمج الفوري بدون دوران تضمن درز لحام مانعاً للتسريب وأقوى من جسم الأنبوب.',
      workflowBtn: 'حجز تدريب وإرشادات تقنية',
      timelineTitle: 'محطات تطوير الأدوات في K-Aqua',
      timelineDesc: 'من الأجهزة اليدوية البسيطة إلى التقنيات الصناعية المنضبطة بالمعالجات في ألمانيا.',
      guideEyebrow: 'الخبرة الفنية والدليل الهندسي',
      faqTitle: 'الأسئلة الشائعة حول الأدوات',
      faqLead: 'إجابات أساسية حول ضبط درجات الحرارة وصيانة قوالب التفلون وطرق إصلاح الثقوب.',
      ctaOverview: 'العودة لنظرة عامة على المنتجات',
    }
  };

  const p = isAr ? PAGE_I18N.ar : isDe ? PAGE_I18N.de : PAGE_I18N.en;

  const toolStats = [
    { n: "260 ± 5", u: "°C", l: isDe ? "Elektronische Mikroprozessor-Regelung" : isAr ? "تحكم إلكتروني بالمعالج" : "Microprocessor temp regulation" },
    { n: "20–250", u: "mm", l: isDe ? "Abgedeckter Schweißbereich" : isAr ? "نطاق أقطار اللحام المغطى" : "Covered welding range" },
    { n: "PTFE", u: isDe ? "Klasse A" : isAr ? "فئة أ" : "Class A", l: isDe ? "Antihaft-Beschichtung der Heizwerkzeuge" : isAr ? "طلاء غير لاصق لقوالب التسخين" : "Non-stick PTFE die coating" },
    { n: "100", u: "%", l: isDe ? "Konform nach DVS 2207 / 2208" : isAr ? "مطابق لمعايير DVS 2207 / 2208" : "DVS 2207/2208 compliant" },
  ];

  const sec = isDe ? "Sekunden" : isAr ? "ثوانٍ" : "seconds";
  const min = isDe ? "Minuten" : isAr ? "دقائق" : "minutes";

  const dvsMatrixHead = [
    isDe ? "Rohrdurchmesser d" : isAr ? "قطر الأنبوب d" : "Pipe Diameter d",
    isDe ? "Anwärmzeit (260°C)" : isAr ? "وقت التسخين (260°م)" : "Heating Time (260°C)",
    isDe ? "Umstellzeit (max.)" : isAr ? "وقت التبديل (أقصى حد)" : "Changeover (max.)",
    isDe ? "Fixierzeit" : isAr ? "وقت التثبيت" : "Cooling (fixed)",
    isDe ? "Abkühlzeit gesamt" : isAr ? "إجمالي وقت التبريد" : "Total Cooling",
  ];

  const dvsMatrixRows = [
    ["d 20 mm", `5 ${sec}`, `4 ${sec}`, `6 ${sec}`, `2 ${min}`],
    ["d 25 mm", `7 ${sec}`, `4 ${sec}`, `10 ${sec}`, `2 ${min}`],
    ["d 32 mm", `8 ${sec}`, `6 ${sec}`, `10 ${sec}`, `4 ${min}`],
    ["d 40 mm", `12 ${sec}`, `6 ${sec}`, `20 ${sec}`, `4 ${min}`],
    ["d 50 mm", `18 ${sec}`, `6 ${sec}`, `20 ${sec}`, `4 ${min}`],
    ["d 63 mm", `24 ${sec}`, `8 ${sec}`, `30 ${sec}`, `6 ${min}`],
    ["d 75 mm", `30 ${sec}`, `8 ${sec}`, `30 ${sec}`, `6 ${min}`],
    ["d 90 mm", `40 ${sec}`, `10 ${sec}`, `40 ${sec}`, `6 ${min}`],
    ["d 110 mm", `50 ${sec}`, `10 ${sec}`, `50 ${sec}`, `8 ${min}`],
  ];

  const toolSteps = [
    {
      t: isDe ? "1. Exakter 90°-Schnitt & Anfasen" : isAr ? "1. قطع بزاوية 90° دقيقة وإزالة الشوائب" : "1. Right-Angle 90° Cut & Deburr",
      d: isDe ? "Mit der K-Aqua Ratschen-Rohrschere (bis d40) oder dem Rollenabschneider (bis d125) sauber ablängen. Einstecktiefe markieren." : isAr ? "قطع نظيف ودقيق بمقص K-Aqua ذي التروس أو القاطع الدوار حتى d125 مم مع تحديد عمق الإدخال بالمسطرة." : "Clean square cut using K-Aqua shears or rotary cutters. Mark insertion depth precisely."
    },
    {
      t: isDe ? "2. Heizelementmuffenschweißen bei 260 °C" : isAr ? "2. مرحلة التسخين الحراري عند 260 °م" : "2. Heating Phase at 260 °C",
      d: isDe ? "Rohr und Fitting zeitgleich ohne Verdrehen axial auf die PTFE-Heizwerkzeuge schieben. Anwärmzeit nach DVS-Tabelle exakt einhalten." : isAr ? "دفع الأنبوب والوصلة معاً محورياً دون دوران على قوالب التفلون والالتزام التام بأوقات التسخين حسب جدول DVS." : "Push pipe and fitting simultaneously onto 260 °C PTFE dies without twisting according to DVS times."
    },
    {
      t: isDe ? "3. Zügiges Fügen & Molekulare Verschmelzung" : isAr ? "3. الدمج الفوري والاندماج الجزيئي" : "3. Rapid Joining & Molecular Fusion",
      d: isDe ? "Komponenten von den Heizelementen abziehen und sofort axial bis zur Markierung zusammenfügen. Nicht verdrehen." : isAr ? "سحب المكونين من قوالب التسخين ودمجهما فوراً ومحورياً حتى العلامة دون أي تدوير." : "Remove from heating elements and join immediately along the axis without rotating."
    },
    {
      t: isDe ? "4. Fixieren & Spannungsfreie Abkühlung" : isAr ? "4. التثبيت والتبريد دون إجهاد" : "4. Fixation & Stress-Free Cooling",
      d: isDe ? "Die Schweißverbindung während der Fixierzeit ruhig halten. Nach vollständiger Abkühlung sofort druckfest und mechanisch belastbar." : isAr ? "تثبيت الوصلة الملحومة بثبات أثناء فترة التثبيت، لتصبح بعد التبريد مانعة للتسريب 100% وجاهزة لتحمل الضغط التشغيلي." : "Hold the joint steady during fixation. Once cooled, the weld is 100% leak-proof and fully pressure-resistant."
    }
  ];

  const toolsTimeline = [
    {
      year: "2001",
      title: isDe ? "Erste Handschweißgeräte-Koffersets" : isAr ? "أول حقائب لأجهزة اللحام اليدوية" : "1st Manual Welding Kits",
      text: isDe ? "Einführung robuster Metallkoffer mit 800W Heizelementen und Zubehör für d20–d32 mm." : isAr ? "إطلاق حقائب معدنية متينة مع سخانات 800 واط وملحقات للأقطار d20–d32 مم." : "Launch of rugged steel case kits with 800W heating elements for d20–d32 mm."
    },
    {
      year: "2011",
      title: isDe ? "Elektronische Mikroprozessor-Regelung" : isAr ? "التحكم الإلكتروني الدقيق بالمعالج" : "Microprocessor Temperature Control",
      text: isDe ? "Präzise digitale Temperaturüberwachung mit optischer & akustischer Schweißsignalisation." : isAr ? "مراقبة رقمية دقيقة لدرجة الحرارة مع إشارات ضوئية وصوتية لمراحل اللحام." : "Precise digital temperature monitoring with optical and acoustic welding signals."
    },
    {
      year: "2017",
      title: isDe ? "Semi-stationäre Montagemaschinen" : isAr ? "مكائن اللحام شبه الثابتة للورش" : "Semi-Stationary Welding Machines",
      text: isDe ? "Schlittengestützte Werkstatt- und Baustellenmaschinen für gleichmäßigen Fügedruck bis d125 mm." : isAr ? "مكائن ذات مزلقة للورش والمواقع لتطبيق ضغط إدخال متجانس حتى d125 مم." : "Slide-assisted bench machines for uniform insertion pressure up to d125 mm."
    },
    {
      year: "2024+",
      title: isDe ? "Digitale Schweißdaten-Dokumentation" : isAr ? "التوثيق الرقمي لبيانات اللحام" : "Digital Weld Data Logging",
      text: isDe ? "Barcode-gesteuerte Elektroschweißautomaten mit USB-Protokollierung für sensible Industrieanlagen." : isAr ? "مكائن لحام كهربائي موجهة بالباركود مع حفظ السجلات عبر USB للمشاريع الصناعية الحساسة." : "Barcode-controlled electrofusion machines with USB data export for industrial quality logs."
    }
  ];

  const toolsFaq = [
    {
      q: isDe ? "Warum ist die Schweißtemperatur von exakt 260 °C so kritisch?" : isAr ? "لماذا تعتبر درجة حرارة 260 °م بالغة الأهمية للحام؟" : "Why is the exact 260 °C welding temperature so critical?",
      a: isDe ? "Bei 260 °C erreicht das Polypropylen (PP-R/PP-RCT) den idealen plastischen Schmelzzustand, bei dem sich die Makromoleküle beider Fügepartner vollständig durchdringen. Unter 250 °C droht eine 'Kaltschweißung' mit unvollständiger Bindung; über 275 °C beginnt die thermische Zersetzung des Polymers." : isAr ? "عند 260 °م تصل مادة PP-R/PP-RCT إلى حالة الانصهار المثالية لتشابك الجزيئات، وأقل من 250 °م يسبب لحاماً بارداً غير متماسك، بينما فوق 275 °م يحدث تفكك حراري للبوليمر." : "At 260 °C, PP-R/PP-RCT reaches optimum melt viscosity for macromolecular intertwining. Below 250 °C risks cold welds, while above 275 °C thermal degradation begins."
    },
    {
      q: isDe ? "Wie werden die PTFE-Schweißaufsätze gereinigt und gepflegt?" : isAr ? "كيف يتم تنظيف وصيانة قوالب التفلون PTFE؟" : "How are the PTFE heating dies cleaned and maintained?",
      a: isDe ? "Schweißaufsätze sollten noch im warmen Zustand ausschließlich mit saugfähigem, fusselfreiem Papiertuch oder Baumwolltuch gereinigt werden. Niemals metallische Drahtbürsten oder scharfe Gegenstände verwenden, da Kratzer in der Teflonbeschichtung das Anhaften von Polymerresten verursachen." : isAr ? "يجب تنظيف القوالب وهي دافئة باستخدام مناديل ورقية أو قماش قطني فقط، ويحظر استخدام الفرش السلكية أو الأدوات الحادة حتى لا يُخدش طلاء التفلون غير اللاصق." : "Clean dies while warm using only lint-free paper or cotton cloths. Never use metal wire brushes, which scratch the PTFE anti-stick coating."
    },
    {
      q: isDe ? "Wann ist der Einsatz eines Rotations-Schälgeräts erforderlich?" : isAr ? "متى يلزم استخدام جهاز التقشير الدوار؟" : "When is a rotary peeling tool required?",
      a: isDe ? "Schälgeräte sind zwingend erforderlich bei K-Stabi Rohren (Aluminium-Verbundrohre). Vor dem Schweißvorgang muss die äußere Kunststoff- und Aluminiumdeckschicht auf der genauen Einstecktiefe abgetragen werden, um die reine PP-R Schweißzone freizulegen. Bei K-Fiber Faserverbundrohren ist KEIN Schälen nötig." : isAr ? "يلزم التقشير حصرياً لأنابيب K-Stabi المركبة بالألمنيوم لإزالة الطبقة الخارجية وكشف طبقة PP-R، بينما أنابيب K-Fiber المعززة بالألياف الزجاجية لا تحتاج إلى أي تقشير." : "Peeling tools are mandatory for aluminum-reinforced K-Stabi pipes to remove outer layers prior to fusion. K-Fiber pipes require NO peeling."
    },
    {
      q: isDe ? "Wie funktioniert das K-Aqua Lochreparatur-Set bei versehentlichen Anbohrungen?" : isAr ? "كيف يعمل طقم إصلاح الثقوب من K-Aqua عند ثقب الأنبوب بالمثقاب؟" : "How does the K-Aqua hole repair kit work for drill punctures?",
      a: isDe ? "Das Loch wird zunächst gratfrei auf 7 mm aufgebohrt. Mit dem Reparatur-Heizdorn werden Bohrung und ein passender PP-R Reparaturstopfen auf 260 °C erhitzt und verschmolzen. Nach 5 Minuten ist die Rohrleitung wieder dauerhaft und 100 % druckdicht, ohne dass Rohrstränge aufgetrennt werden müssen." : isAr ? "يتم توسيع الثقب إلى 7 مم بدقة، ثم يُسخن الثقب وسدادة PP-R بقالب الإصلاح عند 260 °م ودمجهما، لتستعيد الماسورة إحكامها الكامل 100% خلال 5 دقائق دون الحاجة لقطع الخط." : "The puncture is enlarged to 7 mm, heated with the repair die, and fused with a PP-R repair plug, restoring 100% pressure tightness within 5 minutes without pipe cutting."
    },
    {
      q: isDe ? "Welche Werkzeuge eignen sich für Großrohre ab d125 mm?" : isAr ? "ما هي الأدوات المناسبة للمقاسات الكبيرة التي تتجاوز d125 مم؟" : "Which tools are suitable for large pipes above d125 mm?",
      a: isDe ? "Für Dimensionen von d125 bis d250 mm empfiehlt K-Aqua unsere mechanischen oder hydraulischen Werkstatt-Schweißmaschinen für Heizelementmuffen- oder Stumpfschweißung sowie Barcode-Elektroschweißgeräte." : isAr ? "للأقطار من d125 إلى d250 مم توصي K-Aqua بمكائن اللحام الميكانيكية أو الهيدروليكية للحام الجلب والتناكبي وأجهزة اللحام الكهربائي بالباركود." : "For d125 to d250 mm, K-Aqua offers mechanical and hydraulic bench machines for socket and butt fusion as well as barcode electrofusion units."
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
      path: "/produkte/tools",
      type: "CollectionPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/produkte/tools#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/produkte/tools#itemlist`,
      hasPartIds: [`${siteUrl}/${locale}/produkte/tools#faq`],
    }),
    getItemListGraphNode({ locale, category: 'tools', name: title, items: toolItems }),
    getFaqGraphNode(
      toolsFaq.map((f) => ({ question: f.q, answer: f.a })),
      `${siteUrl}/${locale}/produkte/tools`
    ),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: "/produkte" },
      { name: tNav('tools') || (locale === "de" ? "Werkzeuge" : locale === "ar" ? "الأدوات" : "Tools"), path: "/produkte/tools" },
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
              {p.trustMicro}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              {p.trustPtfe}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-accent-strong text-xs font-mono font-bold">
              {p.trustDvs}
            </span>
          </div>

          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow') || "PROFI-WERKZEUGE & SCHWEISSTECHNIK"}
            title={t('hero.title') || "Präzisions-Schweißwerkzeuge für PP-R & PP-RCT Rohrleitungssysteme"}
            lead={t('hero.lead') || "Mikroprozessorgeregelte Muffenschweißgeräte, PTFE-Heizwerkzeuge, Rohrscheren, Schälgeräte und Sattel-Bohrsets für eine fehlerfreie, normgerechte Polyfusionsverarbeitung."}
            align="center"
            className="mb-8 max-w-4xl mx-auto"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Button variant="primary" href="#catalog-section">
              {p.catalogBtn}
            </Button>
            <Button variant="secondary" href="/projektanfrage">
              {p.consultBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metric StatBand */}
      <section className="py-12 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <StatBand stats={toolStats} />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CategoryCatalogSection
        category="tools"
        items={toolItems}
        title={p.catalogTitle}
        subtitle={p.catalogSub}
        locale={locale}
      />

      {/* 4 Equipment Families Bento Grid */}
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
            {p.families.map((fam, idx) => {
              const icons = [Thermometer, Wrench, Scissors, Disc];
              const IconComp = icons[idx] || Thermometer;
              return (
                <div key={idx} className="rounded-2xl bg-card border border-card-border p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">{fam.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fam.d}
                    </p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-card-border text-xs font-mono font-bold ${idx === 2 ? 'text-accent-strong' : 'text-primary'}`}>
                    {fam.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DVS 2207 Welding Parameter Matrix */}
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
              head={dvsMatrixHead}
              rows={dvsMatrixRows}
              heroCol={1}
              note={p.matrixNote}
            />
          </div>
        </div>
      </section>

      {/* 4-Phase DVS Welding Workflow */}
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
                <Button variant="ghost" href="/kontakt">
                  {p.workflowBtn}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-card border border-card-border p-8 shadow-sm">
              <StepFlow steps={toolSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <HorizontalTimeline
        title={p.timelineTitle}
        description={p.timelineDesc}
        items={toolsTimeline}
      />

      {/* Structured SEO Guide */}
      {tSeo.has("guideText") && (
        <section id="tools-engineering-guide" className="py-20 bg-background border-b border-card-border scroll-mt-24">
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
            <DeepFAQ items={toolsFaq} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle') || "Statten Sie Ihr Team mit Profi-Schweißgeräten aus"}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('ctaDesc') || "Bestellen Sie komplette Schweißkoffersets, Ersatz-Heizdorne oder semi-stationäre Maschinen für Ihr nächstes Bauvorhaben."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('ctaBtn') || "Werkzeugangebot anfragen"}
              </Button>
              <Button variant="ghost" href="/produkte">
                {p.ctaOverview}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>
    </div>
  );
}

