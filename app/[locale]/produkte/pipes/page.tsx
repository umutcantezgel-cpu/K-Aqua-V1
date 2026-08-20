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
import { Shield, Sparkles, CheckCircle2, Waves, Flame, Building2, Factory, Sun, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const titles: Record<string, [string, string]> = {
  de: ['PP-R & PP-RCT Rohre: Hochleistungs-Rohrsysteme | K-Aqua', 'Entdecken Sie das K-Aqua Sortiment an PP-R und PP-RCT Rohren für Trinkwasser, Heizung und Industrie. Made in Germany.'],
  en: ['PP-R & PP-RCT Pipes: High-Performance Piping | K-Aqua', 'Discover K-Aqua\'s range of PP-R and PP-RCT pipes for drinking water, heating, and industrial applications. Made in Germany.'],
  ar: ['مواسير K-Pipe PP-R و PP-RCT للتطبيقات الفردية | K-Aqua', 'اكتشف مجموعة K-Aqua من أنابيب PP-R و PP-RCT لمياه الشرب والتدفئة والتطبيقات الصناعية. صنع في ألمانيا.']
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [title, description] = titles[locale] ?? titles['en']!;
  return constructMetadata({
    title,
    description,
    path: "/produkte/pipes",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.pipes' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.pipes" });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const [title, description] = titles[locale] ?? titles['en']!;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/produkte/pipes",
      type: "CollectionPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/produkte/pipes#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: "/produkte" },
      { name: tNav('pipes') || (locale === "de" ? "Rohre" : locale === "ar" ? "الأنابيب" : "Pipes"), path: "/produkte/pipes" },
    ]),
  ]);

  const pipeCategory = CATALOG.find((c) => c.id === 'pipes');
  const pipeItems = pipeCategory?.items || [];

  const isAr = locale.startsWith('ar');
  const isDe = locale === 'de';

  const PAGE_I18N = {
    de: {
      trustLifespan: '50+ Jahre Lebensdauer',
      viewCatalog: 'Produktkatalog ansehen',
      techConsult: 'Technische Beratung',
      catalogTitle: 'PP-R & PP-RCT Rohrserien im Überblick',
      catalogSub: 'Wählen Sie aus Monolayer-, Faserverbund- (K-Fiber) und UV-geschützten Rohren in allen gängigen SDR-Klassen von d20 bis d630 mm.',
      sdrEyebrow: 'INGENIEUR-KENNDATEN',
      sdrTitle: 'SDR-Klassen & Druckstufen im technischen Vergleich',
      sdrLead: 'Präzise Abstimmung von Wandstärke, Betriebsdruck und Längsausdehnung für maximale hydraulische Effizienz und Wirtschaftlichkeit.',
      sdrNote: 'Berechnungsgrundlage: Betriebsdauer 50 Jahre bei Sicherheitsbeiwert SF = 1,25 (Wasser) nach DIN EN ISO 15874. Ausdehnungskoeffizient ermittelt bei ΔT = 50 K.',
      fiberEyebrow: '3-SCHICHT-KOEXTRUSION',
      fiberTitle: 'K-Fiber: Glasfaserverstärkung für minimale Ausdehnung',
      fiberLead: 'Durch die molekulare Integration einer Glasfaserschicht reduziert K-Aqua die thermische Längsdehnung um 75 % – für stabilere Trassen und reduzierte Schellenanzahl.',
      fiberL1Tag: 'SCHICHT 1 (INNEN)',
      fiberL1Title: 'PP-RCT Basisschicht',
      fiberL1Desc: 'Spiegelglatte Innenwand (Rauigkeit k = 0,007 mm) für minimale Reibungsverluste, keine Inkrustation und absolute Beständigkeit gegen Desinfektionsmittel und Chlor.',
      fiberL1Badge: '✓ k = 0,007 mm · pH 1–14',
      fiberL2Tag: 'SCHICHT 2 (KERN)',
      fiberL2BadgeTop: 'Kerntechnologie',
      fiberL2Title: 'PP-RCT Glasfaser-Compound',
      fiberL2Desc: 'Homogene Faserorientierung hemmt die thermische Längsausdehnung auf α = 0,035 mm/(m·K). Erhöht die Biegesteifigkeit und vergrößert Stützabstände um bis zu 30 %.',
      fiberL2Badge: '✓ -75 % Längsausdehnung',
      fiberL3Tag: 'SCHICHT 3 (AUSSEN)',
      fiberL3Title: 'PP-RCT Schutzmantel / UV-Ruß',
      fiberL3Desc: 'Mechanischer Schlagschutz für den rauen Baustellenalltag. Bei K-Fiber UV mit integrierter Ruß-Schutzschicht für 100 % UV- und Witterungsresistenz im Freien.',
      fiberL3Badge: '✓ UV-beständig · Schlagzäh',
      appEyebrow: 'EINSATZBEREICHE',
      appTitle: 'Für jede Anforderung das optimal zertifizierte Rohrsystem',
      appLead: 'K-Aqua PP-R und PP-RCT Rohre sind in tausenden Großprojekten weltweit im zuverlässigen Dauereinsatz.',
      apps: [
        { t: 'Trinkwasser & Hygiene', d: 'Biologisch inert, geruchs- und geschmacksneutral. Zertifiziert nach DVGW W270 und KTW für höchste hygienische Reinheit ohne Schwermetallabgabe.' },
        { t: 'Heizung & Nahwärme', d: 'K-Fiber und K-Stabi Systeme halten Dauerbetriebstemperaturen bis 70 °C (Spitzen bis 95 °C) stand. Geringer Wärmeverlust dank niedriger Wärmeleitfähigkeit (0,15 W/mK).' },
        { t: 'HVAC & Kaltwasser', d: 'K-Fiberclima Rohre verhindern störende Kondensatbildung an Rohrtrassen in Rechenzentren, Hotels und Flughäfen. Optimale Schalldämpfung nach DIN 4109.' },
        { t: 'Industrieller Anlagenbau', d: 'Hohe Druckfestigkeit und Unempfindlichkeit gegen Vibrationen und Druckstöße (Water Hammer). Verlässlicher Transport von Druckluft und Kühlmedien.' },
        { t: 'Chemie & Prozessmedien', d: 'Universelle Resistenz gegen Laugen, Säuren und Salzlösungen (pH 1–14). Keine Korrosion, kein Lochfraß und keine chemische Zersetzung.' },
        { t: 'Außen- & Dachinstallation', d: 'K-Fiber UV mit UV-blockierender Rußmatrix ermöglicht die ungeschützte Verlegung auf Industriedächern, Brücken und an Fassaden in sonnenintensiven Regionen.' },
      ],
      fusionEyebrow: 'SICHERE VERBINDUNGSTECHNIK',
      fusionTitle: 'Polyfusion: 100 % stoffschlüssig & dauerhaft dicht',
      fusionLead: 'Das Heizelementmuffenschweißen bei 260 °C verschmilzt Rohr und Fitting zu einer homogenen Polymereinheit. Ohne fehleranfällige O-Ringe, Klebstoffe oder offene Flammen.',
      fusionBtn: 'Passende Schweißwerkzeuge ansehen',
      timelineTitle: 'Evolution der K-Aqua Rohrtechnologie',
      timelineDesc: 'Über 25 Jahre kontinuierliche Werkstoff- und Verfahrensentwicklung in Deutschland.',
      guideEyebrow: 'FACHWISSEN & TECHNISCHER LEITFADEN',
      faqTitle: 'Häufig gestellte Fragen (FAQ)',
      faqLead: 'Wichtige Antworten rund um Werkstoffwahl, Druckstufen und Schweißtechnik.',
      ctaContact: 'Kontakt aufnehmen',
    },
    en: {
      trustLifespan: '50+ Years Lifespan',
      viewCatalog: 'View Product Catalog',
      techConsult: 'Technical Consultation',
      catalogTitle: 'PP-R & PP-RCT Pipe Series Overview',
      catalogSub: 'Choose from Monolayer, Fiber-reinforced (K-Fiber), and UV-protected pipes across all SDR classes from d20 to d630 mm.',
      sdrEyebrow: 'ENGINEERING SPECIFICATIONS',
      sdrTitle: 'SDR Classes & Pressure Ratings in Technical Comparison',
      sdrLead: 'Precise matching of wall thickness, operating pressure, and thermal expansion for maximum hydraulic efficiency and economy.',
      sdrNote: 'Calculation basis: 50-year service life at safety coefficient SF = 1.25 (water) per DIN EN ISO 15874. Expansion coefficient determined at ΔT = 50 K.',
      fiberEyebrow: '3-LAYER CO-EXTRUSION',
      fiberTitle: 'K-Fiber: Glass-Fiber Reinforcement for Minimal Expansion',
      fiberLead: 'By integrating a specialized glass-fiber core, K-Aqua reduces linear thermal expansion by 75% – enabling straighter pipe runs and fewer support brackets.',
      fiberL1Tag: 'LAYER 1 (INNER)',
      fiberL1Title: 'PP-RCT Base Layer',
      fiberL1Desc: 'Mirror-smooth inner wall (roughness k = 0.007 mm) for minimal pressure drop, zero incrustation, and full resistance to chlorination and disinfectants.',
      fiberL1Badge: '✓ k = 0.007 mm · pH 1–14',
      fiberL2Tag: 'LAYER 2 (CORE)',
      fiberL2BadgeTop: 'Core Technology',
      fiberL2Title: 'PP-RCT Glass-Fiber Compound',
      fiberL2Desc: 'Homogeneous fiber orientation inhibits thermal linear expansion to α = 0.035 mm/(m·K). Enhances rigidity and widens support spacing by up to 30%.',
      fiberL2Badge: '✓ -75% Linear Expansion',
      fiberL3Tag: 'LAYER 3 (OUTER)',
      fiberL3Title: 'PP-RCT Protective Jacket / Carbon UV',
      fiberL3Desc: 'Mechanical impact barrier for demanding construction environments. On K-Fiber UV, integrated carbon black ensures 100% weather and solar UV resistance.',
      fiberL3Badge: '✓ UV Resistant · High Impact',
      appEyebrow: 'APPLICATION DOMAINS',
      appTitle: 'Certified Piping Systems Engineered for Every Requirement',
      appLead: 'K-Aqua PP-R and PP-RCT pipes deliver dependable performance across thousands of large-scale infrastructure projects globally.',
      apps: [
        { t: 'Potable Water & Hygiene', d: 'Biologically inert, taste- and odor-neutral. Certified to DVGW W270, WRAS, NSF 61 for utmost hygiene with zero heavy metal leaching.' },
        { t: 'Heating & District Energy', d: 'K-Fiber and K-Stabi systems handle continuous operation up to 70 °C (peaks to 95 °C). Low heat dissipation due to 0.15 W/mK thermal conductivity.' },
        { t: 'HVAC & Chilled Water', d: 'K-Fiberclima pipes prevent condensation in data centers, hotels, and airports. Superior acoustic damping compliant with DIN 4109.' },
        { t: 'Industrial Plant Engineering', d: 'High pressure resistance and resilience against water hammer and mechanical vibration. Reliable transport of compressed air and process coolants.' },
        { t: 'Chemical & Process Fluids', d: 'Broad resistance to aggressive acids, alkalis, and saline solutions (pH 1–14). Zero corrosion, pitting, or chemical degradation.' },
        { t: 'Outdoor & Rooftop Installation', d: 'K-Fiber UV with UV-absorbing carbon matrix allows unshielded installation on industrial rooftops, pipe bridges, and sunny exterior facades.' },
      ],
      fusionEyebrow: 'SECURE JOINING TECHNOLOGY',
      fusionTitle: 'Polyfusion: 100% Molecular Bonding & Permanent Seal',
      fusionLead: 'Socket fusion welding at 260 °C fuses pipe and fitting into a single homogeneous polymer unit. No vulnerable O-rings, adhesives, or open flame hazards.',
      fusionBtn: 'View Matching Fusion Tools',
      timelineTitle: 'Evolution of K-Aqua Pipe Technology',
      timelineDesc: 'Over 25 years of continuous polymer science and manufacturing engineering in Germany.',
      guideEyebrow: 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE',
      faqTitle: 'Frequently Asked Questions (FAQ)',
      faqLead: 'Key technical insights into material grades, pressure classes, and fusion welding procedures.',
      ctaContact: 'Contact our Team',
    },
    ar: {
      trustLifespan: 'عمر تشغيلي أكثر من 50 عاماً',
      viewCatalog: 'عرض كتالوج المنتجات',
      techConsult: 'الاستشارة الفنية',
      catalogTitle: 'نظرة عامة على سلاسل أنابيب PP-R و PP-RCT',
      catalogSub: 'اختر من بين الأنابيب الأحادية، والأنابيب المعززة بالألياف (K-Fiber)، والأنابيب المقاومة للأشعة فوق البنفسجية بجميع فئات SDR من d20 إلى d630 مم.',
      sdrEyebrow: 'البيانات والمواصفات الهندسية',
      sdrTitle: 'مقارنة فنية لفئات SDR وفئات الضغط التشغيلي',
      sdrLead: 'ملاءمة دقيقة بين سماكة الجدار وضغط التشغيل والتمدد الحراري لتحقيق أقصى كفاءة هيدروليكية واقتصادية.',
      sdrNote: 'أساس الحساب: عمر خدمة 50 عاماً عند معامل أمان SF = 1.25 (ماء) وفقاً لمعيار DIN EN ISO 15874. معامل التمدد محدد عند ΔT = 50 K.',
      fiberEyebrow: 'بثق مشترك ثلاثي الطبقات',
      fiberTitle: 'K-Fiber: تعزيز بالألياف الزجاجية لأدنى تمدد طولي',
      fiberLead: 'من خلال الدمج الجزيئي لطبقة الألياف الزجاجية، تقلل K-Aqua التمدد الحراري الطولي بنسبة 75% – لخطوط أنابيب مستقيمة ومسافات تثبيت متباعدة.',
      fiberL1Tag: 'الطبقة 1 (الداخلية)',
      fiberL1Title: 'طبقة الأساس PP-RCT',
      fiberL1Desc: 'جدار داخلي فائق النعومة (خشونة k = 0.007 مم) لأقل فقد في الضغط، وانعدام التكلس، ومقاومة كاملة للكلور والمطهرات.',
      fiberL1Badge: '✓ k = 0.007 مم · pH 1–14',
      fiberL2Tag: 'الطبقة 2 (القلب)',
      fiberL2BadgeTop: 'التكنولوجيا المركزية',
      fiberL2Title: 'مركب الألياف الزجاجية PP-RCT',
      fiberL2Desc: 'توجيه متجانس للألياف يكبح التمدد الحراري الطولي حتى α = 0.035 مم/(م·كلفن). يزيد الصلابة ويزيد مسافات الدعم حتى 30%.',
      fiberL2Badge: '✓ -75% تمدد طولي',
      fiberL3Tag: 'الطبقة 3 (الخارجية)',
      fiberL3Title: 'غلاف الحماية PP-RCT / كربون UV',
      fiberL3Desc: 'حماية ميكانيكية ضد الصدمات لمواقع البناء القاسية. وفي أنابيب K-Fiber UV تضمن طبقة الكربون مقاومة 100% لأشعة الشمس والطقس.',
      fiberL3Badge: '✓ مقاوم للأشعة UV · مقاوم للصدمات',
      appEyebrow: 'مجالات التطبيق',
      appTitle: 'أنظمة أنابيب معتمدة ومصممة لكل المتطلبات الهندسية',
      appLead: 'أنابيب K-Aqua المصنوعة من PP-R و PP-RCT تعمل بكفاءة واعتمادية مطلقة في آلاف المشاريع الكبرى حول العالم.',
      apps: [
        { t: 'مياه الشرب والصحة العامة', d: 'خاملة بيولوجياً، عديمة الطعم والرائحة. معتمدة وفق DVGW W270 و WRAS و NSF 61 لنقاء صحي تام دون أي تسريب للمعادن الثقيلة.' },
        { t: 'التدفئة وشبكات التوزيع المركزية', d: 'تتحمل أنظمة K-Fiber و K-Stabi درجات حرارة تشغيل حتى 70 °م (وقمم حتى 95 °م) مع فقد حراري ضئيل بفضل الموصلية 0.15 واط/م.كلفن.' },
        { t: 'التكييف HVAC والمياه المبردة', d: 'أنابيب K-Fiberclima تمنع تكثف الرطوبة في مراكز البيانات والفنادق والمطارات، مع عزل صوتي متفوق وفق DIN 4109.' },
        { t: 'المنشآت الصناعية والمصانع', d: 'مقاومة فائقة للضغط والصدمات الهيدروليكية (Water Hammer) والاهتزازات. نقل موثوق للهواء المضغوط ووسائط التبريد.' },
        { t: 'المواد الكيميائية والعمليات الصناعية', d: 'مقاومة شاملة للأحماض والقلويات والمحاليل الملحية (pH 1–14). انعدام تام للتآكل والصدأ والتفتت الكيميائي.' },
        { t: 'التركيبات الخارجية والأسطح', d: 'أنابيب K-Fiber UV مع مصفوفة الكربون الماصة للأشعة تتيح التمديد المكشوف على أسطح المصانع والواجهات في المناطق المشمسة.' },
      ],
      fusionEyebrow: 'تقنية الربط الآمن',
      fusionTitle: 'اللحام بالانصهار: اندماج جزيئي 100% وإحكام دائم ضد التسريب',
      fusionLead: 'اللحام الحراري عند 260 °م يدمج الأنبوب والوصلة في بنية بوليمرية متجانسة واحدة. بدون حلقات مطاطية أو مواد لاصقة أو لهب مكشوف.',
      fusionBtn: 'عرض أدوات ومكائن اللحام',
      timelineTitle: 'تطور تكنولوجيا أنابيب K-Aqua',
      timelineDesc: 'أكثر من 25 عاماً من البحث والتطوير المستمر في علوم البوليمرات والهندسة الألمانية.',
      guideEyebrow: 'الخبرة الفنية والدليل الهندسي',
      faqTitle: 'الأسئلة الشائعة (FAQ)',
      faqLead: 'إجابات تقنية هامة حول اختيار المواد وفئات الضغط وتقنيات اللحام.',
      ctaContact: 'تواصل مع خبرائنا',
    }
  };

  const p = isAr ? PAGE_I18N.ar : isDe ? PAGE_I18N.de : PAGE_I18N.en;

  const pipeStats = [
    { n: "14.000+", u: "m", l: isDe ? "Ständiger Vorrat ab Werk" : isAr ? "مخزون دائم متاح للتسليم" : "Stock available on demand" },
    { n: "20–630", u: "mm", l: isDe ? "Lieferbare Außendurchmesser" : isAr ? "الأقطار الخارجية المتاحة" : "Available outer diameters" },
    { n: "-75", u: "%", l: isDe ? "Weniger Längsausdehnung (K-Fiber)" : isAr ? "أقل تمدداً طولياً (K-Fiber)" : "Reduced linear expansion (K-Fiber)" },
    { n: "50+", u: isDe ? "Jahre" : isAr ? "عاماً" : "Years", l: isDe ? "Zertifizierte Lebensdauer nach ISO" : isAr ? "عمر تشغيلي معتمد حسب ISO" : "Certified service lifespan" },
  ];

  const sdrMatrixHead = [
    isDe ? "SDR-Klasse" : isAr ? "فئة SDR" : "SDR Class",
    isDe ? "Material" : isAr ? "المادة" : "Material",
    isDe ? "Druckstufe (20°C / 70°C)" : isAr ? "فئة الضغط (20°م / 70°م)" : "Pressure rating (20°C / 70°C)",
    isDe ? "Ausdehnungskoeffizient α" : isAr ? "معامل التمدد α" : "Expansion coeff. α",
    isDe ? "Hauptanwendung" : isAr ? "التطبيق الرئيسي" : "Primary Application",
  ];

  const sdrMatrixRows = [
    ["SDR 6", "PP-R Monolayer", "PN 20 / PN 10", "0,150 mm/(m·K)", isDe ? "Hochdruck-Kaltwasser & Steigstränge" : isAr ? "مياه باردة عالية الضغط وأعمدة صاعدة" : "High pressure cold water & risers"],
    ["SDR 7.4", "PP-R / PP-RCT", "PN 16 / PN 8", "0,150 mm/(m·K)", isDe ? "Universelle Sanitär- & Heizungsleitungen" : isAr ? "خطوط صحية وتدفئة شاملة" : "Universal sanitary & heating lines"],
    ["K-Fiber SDR 7.4", "PP-RCT Faserverbund", "PN 20 / PN 10", "0,035 mm/(m·K)", isDe ? "Warmwasser, Zirkulation, Heizung" : isAr ? "مياه ساخنة، تدوير وتدفئة" : "Hot water, circulation, heating"],
    ["K-Fiberclima SDR 9/11", "PP-RCT Faserverbund", "PN 16 / PN 10", "0,035 mm/(m·K)", isDe ? "Klima, Kaltwasser & Geothermie (HVAC)" : isAr ? "تكييف، مياه مثلجة وطاقة حرارية (HVAC)" : "HVAC, chilled water & geothermal"],
    ["K-Fiber UV SDR 7.4/9/11", "PP-RCT + UV-Schutz", "PN 20 / PN 16 / PN 10", "0,035 mm/(m·K)", isDe ? "Außenverlegung, Dächer & Freileitungen" : isAr ? "تمديدات خارجية، أسطح وخطوط مكشوفة" : "Outdoor, roofs & exposed lines"],
    ["K-Stabi SDR 6", "PP-R + Aluminiumverbund", "PN 20 / PN 10", "0,030 mm/(m·K)", isDe ? "Sauerstoffdichte Heizungsnetze" : isAr ? "شبكات تدفئة مانعة لنفاذ الأكسجين" : "Oxygen-tight heating networks"],
  ];

  const fusionSteps = [
    {
      t: isDe ? "1. Vorbereitung & Rechtwinkliger Schnitt" : isAr ? "1. التحضير والقطع بزاوية قائمة" : "1. Preparation & Right-Angle Cut",
      d: isDe ? "Das Rohr wird mit der K-Aqua Rohrschere exakt rechtwinklig (90°) abgelängt und von Spänen gesäubert. Die Einstecktiefe wird markiert." : isAr ? "يتم قطع الأنبوب بزاوية 90° دقيقة باستخدام مقص K-Aqua وتنظيفه من الشوائب مع تحديد عمق الإدخال." : "The pipe is cut at a 90° angle using K-Aqua pipe shears and cleaned of burrs. Insertion depth is marked."
    },
    {
      t: isDe ? "2. Gleichzeitiges Erwärmen bei 260 °C" : isAr ? "2. التسخين المتزامن عند 260 °م" : "2. Simultaneous Heating at 260 °C",
      d: isDe ? "Rohr und Fitting werden ohne Verdrehen zeitgleich auf die teflonbeschichteten Heizwerkzeuge des Schweißgeräts aufgeschoben und nach DVS-Tabelle temperiert." : isAr ? "يتم دفع الأنبوب والوصلة معاً دون تدوير على قوالب التسخين المطلية بالتفلون عند 260 °م وفق جدول معيار DVS." : "Pipe and fitting are simultaneously pushed onto the PTFE heating tools at 260 °C without twisting according to DVS standards."
    },
    {
      t: isDe ? "3. Fügen & Makromolekulare Verschmelzung" : isAr ? "3. التجميع والاندماج الجزيئي الفوري" : "3. Joining & Macromolecular Fusion",
      d: isDe ? "Beide Komponenten werden zügig und axial ohne Drehung bis zur Markierung zusammengefügt. Die Schmelzen verbinden sich zu einer homogenen Einheit." : isAr ? "يتم دمج المكونين بسرعة ومحورياً دون دوران حتى علامة العمق، لتتحد المصهورات في وحدة متجانسة." : "Both components are immediately joined axially without twisting. The molten polymers fuse into a single homogeneous structure."
    },
    {
      t: isDe ? "4. Abkühlung & Sofortige Belastbarkeit" : isAr ? "4. التبريد والجاهزية التامة للضغط" : "4. Cooling & Immediate Load Bearing",
      d: isDe ? "Nach kurzer Fixierung und Abkühlzeit ist die stoffschlüssige Schweißnaht 100 % dauerhaft leckagefrei und mechanisch voll belastbar." : isAr ? "بعد فترة تبريد وجيزة، تصبح الوصلة الملحومة مانعة للتسريب بنسبة 100% وجاهزة للتشغيل الهيدروليكي الكامل." : "After a brief cooling period, the molecular weld is 100% leak-proof and ready for full operating pressure."
    }
  ];

  const pipesTimeline = [
    {
      year: "1998",
      title: isDe ? "Pionierarbeit im PP-R Spritzguss" : isAr ? "ريادة حقن وتصنيع PP-R" : "Pioneering PP-R Injection",
      text: isDe ? "Entwicklung der ersten Generation homogener PP-R Druckrohrsysteme in Deutschland." : isAr ? "تطوير الجيل الأول من أنظمة أنابيب الضغط المتجانسة PP-R في ألمانيا." : "Development of first generation homogeneous PP-R pressure pipe systems in Germany."
    },
    {
      year: "2008",
      title: isDe ? "K-Fiber 3-Schicht-Koextrusion" : isAr ? "تقنية K-Fiber ثلاثية الطبقات" : "K-Fiber 3-Layer Co-Extrusion",
      text: isDe ? "Einführung der Glasfaser-Mittelphase zur Reduzierung der thermischen Längsausdehnung um 75 %." : isAr ? "إدخال طبقة الألياف الزجاجية المركزية لتقليل التمدد الحراري الطولي بنسبة 75%." : "Introduction of the glass-fiber core layer reducing thermal linear expansion by 75%."
    },
    {
      year: "2016",
      title: isDe ? "PP-RCT Werkstoff-Evolution" : isAr ? "تطور مادة PP-RCT المتقدمة" : "PP-RCT Material Evolution",
      text: isDe ? "Umstellung auf modifizierte Kristallinität für höhere Dauerbetriebsdrücke bei dünneren Wandstärken." : isAr ? "الانتقال إلى البنية البلورية المعدلة لرفع ضغوط التشغيل مع تقليل سماكة الجدار." : "Transition to modified crystallinity enabling higher pressures with thinner walls."
    },
    {
      year: "2024+",
      title: isDe ? "K-Fiber UV & Großdimensionen" : isAr ? "أنابيب K-Fiber UV والمقاسات الضخمة" : "K-Fiber UV & Large Dimensions",
      text: isDe ? "Ausbau des Portfolios bis d630 mm sowie weltweite Zertifizierungen für Green-Building-Projekte." : isAr ? "توسيع التشكيلة حتى قطر d630 مم والحصول على اعتماد المباني الخضراء العالمية." : "Portfolio expansion up to d630 mm and worldwide green building certifications."
    }
  ];

  const pipesFaq = [
    {
      q: isDe ? "Was ist der fundamentale Unterschied zwischen PP-R und PP-RCT?" : isAr ? "ما هو الفرق الجوهري بين PP-R و PP-RCT؟" : "What is the key difference between PP-R and PP-RCT?",
      a: isDe ? "PP-RCT (Polypropylen Random-Copolymer mit modifizierter Kristallinität) besitzt ein optimiertes Kristallgefüge, das bei höheren Temperaturen (bis 95 °C) eine um bis zu 50 % höhere Druckbeständigkeit bietet. Dadurch können bei gleichem Druck dünnere Rohrwandungen gewählt werden, was den Innendurchmesser und den hydraulischen Durchfluss um bis zu 17 % steigert." : isAr ? "تتميز مادة PP-RCT ببنية بلورية معدلة توفر مقاومة أعلى للضغط بنسبة تصل إلى 50% عند درجات الحرارة العالية (حتى 95 °م)، مما يتيح جدراناً أنحف وزيادة في التدفق الهيدروليكي بنسبة 17%." : "PP-RCT features modified crystalline structure providing up to 50% higher pressure resistance at high temperatures, allowing thinner walls and 17% higher flow rates."
    },
    {
      q: isDe ? "Wie funktioniert die Reduzierung der Längsausdehnung bei K-Fiber Rohren?" : isAr ? "كيف تعمل تقنية K-Fiber على تقليل التمدد الطولي للأنابيب؟" : "How does K-Fiber reduce linear expansion?",
      a: isDe ? "K-Fiber Rohre werden im 3-Schicht-Koextrusionsverfahren gefertigt. Die mittlere Schicht besteht aus einem speziellen glasfaserverstärkten PP-RCT Compound. Diese Faserverstärkung reduziert den Längenausdehnungskoeffizienten auf α = 0,035 mm/(m·K) – das sind 75 % weniger als bei Standard-Kunststoffrohren." : isAr ? "تُصنع أنابيب K-Fiber عبر البثق المشترك ثلاثي الطبقات مع قلب مركب من ألياف الزجاج، مما يقلل معامل التمدد الطولي إلى α = 0.035 مم/(م·كلفن) أي أقل بنسبة 75% من البلاستيك التقليدي." : "K-Fiber pipes feature a 3-layer co-extruded structure with a glass-fiber reinforced core that reduces linear expansion coefficient to α = 0.035 mm/(m·K)."
    },
    {
      q: isDe ? "Können K-Aqua Rohre im Freien oder auf Flachdächern verlegt werden?" : isAr ? "هل يمكن تركيب أنابيب K-Aqua في الهواء الطلق أو على الأسطح؟" : "Can K-Aqua pipes be installed outdoors or on rooftops?",
      a: isDe ? "Ja, speziell dafür bieten wir die Serie K-Fiber UV an. Diese Rohre verfügen über eine coextrudierte äußere Schutzschicht mit Ruß-UV-Stabilisatoren, die das Rohr dauerhaft vor solarer UV-Strahlung und Witterungseinflüssen schützen, ohne dass ein zusätzlicher Schutzanstrich erforderlich ist." : isAr ? "نعم، نقدم سلسلة K-Fiber UV المزودة بطبقة خارجية معززة بمثبتات كربونية تحمي الأنبوب تماماً من الأشعة فوق البنفسجية والظروف الجوية دون الحاجة لدهانات واقية." : "Yes, our K-Fiber UV series features a co-extruded carbon-black outer protective layer offering total solar UV stability without external coatings."
    },
    {
      q: isDe ? "Welche Verbindungstechnik kommt bei K-Aqua Rohren zum Einsatz?" : isAr ? "ما هي تقنية الربط المستخدمة في أنابيب K-Aqua؟" : "Which joining method is used for K-Aqua pipes?",
      a: isDe ? "K-Aqua Rohre und Formteile werden mittels Heizelementmuffenschweißung (Polyfusion bei 260 °C) oder im Großrohrbereich mittels Stumpf- bzw. Elektromuffenschweißung verbunden. Dies erzeugt eine molekular homogene, 100 % leckagefreie und unlösbare Materialeinheit." : isAr ? "تُربط الأنابيب والوصلات عبر لحام الجلب الحراري عند 260 °م أو اللحام التناكبي واللحام الكهربائي للأقطار الكبيرة، لإنتاج وحدة جزيئية متجانسة ومانعة للتسريب بنسبة 100%." : "K-Aqua pipes use 260 °C socket fusion welding, butt welding, or electrofusion, creating a homogeneous, permanently leak-free molecular joint."
    },
    {
      q: isDe ? "Sind K-Aqua Rohre trinkwasserzertifiziert?" : isAr ? "هل أنابيب K-Aqua معتمدة لمياه الشرب النقية؟" : "Are K-Aqua pipes certified for drinking water?",
      a: isDe ? "Ja, unsere Rohrsysteme sind nach den strengsten internationalen Normen geprüft und zertifiziert, darunter DVGW, WRAS, NSF 61, hygiene-geprüft und 100 % frei von Schwermetallen und Weichmachern." : isAr ? "نعم، أنظمتنا معتمدة ومختبرة وفق أعلى المعايير الدولية مثل DVGW و WRAS و NSF 61، وهي خالية تماماً من المعادن الثقيلة والملدنات الضارة." : "Yes, our systems carry DVGW, WRAS, NSF 61, and international hygiene certifications, completely free of heavy metals and plasticizers."
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
              DIN EN ISO 15874
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              DVGW · WRAS · NSF
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-accent-strong text-xs font-mono font-bold">
              {p.trustLifespan}
            </span>
          </div>

          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow') || "HOCHLEISTUNGS-ROHRSYSTEME"}
            title={t('hero.title') || "PP-R & PP-RCT Rohrsysteme für höchste industrielle Ansprüche"}
            lead={t('hero.lead') || "Zertifizierte Druckrohre aus Polypropylen Random-Copolymer für Sanitär-, HVAC-, Geothermie- und Chemieanlagen. Maximale Betriebssicherheit und überlegene Hydraulik."}
            align="center"
            className="mb-8 max-w-4xl mx-auto"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Button variant="primary" href="#catalog-section">
              {p.viewCatalog}
            </Button>
            <Button variant="secondary" href="/projektanfrage">
              {p.techConsult}
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metric StatBand */}
      <section className="py-12 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <StatBand stats={pipeStats} />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CategoryCatalogSection
        category="pipes"
        items={pipeItems}
        title={p.catalogTitle}
        subtitle={p.catalogSub}
        locale={locale}
      />

      {/* SDR & Material Technical Matrix */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu size={14} />
              <span>{p.sdrEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.sdrTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.sdrLead}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm">
            <DeepMatrix
              head={sdrMatrixHead}
              rows={sdrMatrixRows}
              heroCol={2}
              note={p.sdrNote}
            />
          </div>
        </div>
      </section>

      {/* K-Fiber Co-Extrusion Technology Showcase */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-strong/10 text-accent-strong text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>{p.fiberEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.fiberTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.fiberLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-card border border-card-border p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block p-3 rounded-xl bg-primary/10 text-primary mb-4 font-mono font-bold text-sm">
                  {p.fiberL1Tag}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {p.fiberL1Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.fiberL1Desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border text-xs font-mono text-primary font-bold">
                {p.fiberL1Badge}
              </div>
            </div>

            <div className="rounded-2xl bg-card border-2 border-primary/40 p-8 shadow-md flex flex-col justify-between relative">
              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2 py-0.5 rounded bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider">
                {p.fiberL2BadgeTop}
              </div>
              <div>
                <span className="inline-block p-3 rounded-xl bg-accent-strong/10 text-accent-strong mb-4 font-mono font-bold text-sm">
                  {p.fiberL2Tag}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {p.fiberL2Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.fiberL2Desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border text-xs font-mono text-accent-strong font-bold">
                {p.fiberL2Badge}
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-card-border p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block p-3 rounded-xl bg-primary/10 text-primary mb-4 font-mono font-bold text-sm">
                  {p.fiberL3Tag}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {p.fiberL3Title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.fiberL3Desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border text-xs font-mono text-primary font-bold">
                {p.fiberL3Badge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Application Domains */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 size={14} />
              <span>{p.appEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.appTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.appLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.apps.map((app, idx) => {
              const icons = [Waves, Flame, Building2, Factory, ShieldAlert, Sun];
              const IconComp = icons[idx] || Building2;
              return (
                <div key={idx} className="rounded-2xl bg-card border border-card-border p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <IconComp size={20} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{app.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {app.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Polyfusion 4-Step Process */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} />
                <span>{p.fusionEyebrow}</span>
              </div>
              <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
                {p.fusionTitle}
              </h2>
              <p className="text-lead text-muted-foreground mt-4 leading-relaxed">
                {p.fusionLead}
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/produkte/tools">
                  {p.fusionBtn}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-card border border-card-border p-8 shadow-sm">
              <StepFlow steps={fusionSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <HorizontalTimeline
        title={p.timelineTitle}
        description={p.timelineDesc}
        items={pipesTimeline}
      />

      {/* Comprehensive SEO Article / Technical Guide */}
      {tSeo.has("guideText") && (
        <section id="pipes-engineering-guide" className="py-20 bg-background border-b border-card-border scroll-mt-24">
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

      {/* Technical FAQ Accordion */}
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
            <DeepFAQ items={pipesFaq} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title') || "Starten Sie Ihr Rohrleitungsprojekt mit K-Aqua"}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc') || "Unsere Anwendungstechniker unterstützen Sie bei der Dimensionierung, Druckverlustberechnung und Ausschreibung."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('cta.primary') || "Projektanfrage senden"}
              </Button>
              <Button variant="secondary" href="/kontakt">
                {p.ctaContact}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>
    </div>
  );
}

