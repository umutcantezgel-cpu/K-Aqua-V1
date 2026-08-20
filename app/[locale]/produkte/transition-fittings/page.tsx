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
import { Shield, Sparkles, CheckCircle2, Hexagon, ShieldAlert, Cpu, Wrench, Link2, Gauge, Layers } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const titles: Record<string, [string, string]> = {
  de: ['PP-R & PP-RCT Übergangsformteile: Metall-Kunststoff-Schnittstellen | K-Aqua', 'K-Aqua PP-R Übergangsformteile für sichere Verbindungen zwischen Metall- und Kunststoffrohren. DZR-Messing und Edelstahl.'],
  en: ['PP-R & PP-RCT Transition Fittings: Metal-to-Plastic Connections | K-Aqua', 'K-Aqua PP-R transition fittings for secure metal-to-plastic pipe connections. DZR Brass and Stainless Steel.'],
  ar: ['تركيبات انتقالية PP-R: وصلات المعدن بالبلاستيك | K-Aqua', 'تركيبات انتقالية PP-R من K-Aqua لتوصيلات آمنة بين الأنابيب المعدنية والبلاستيكية. نحاس DZR وفولاذ مقاوم للصدأ.']
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [title, description] = titles[locale] ?? titles['en']!;
  return constructMetadata({
    title,
    description,
    path: "/produkte/transition-fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.transitionFittings' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.transitionFittings" });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const [title, description] = titles[locale] ?? titles['en']!;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/produkte/transition-fittings",
      type: "CollectionPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/produkte/transition-fittings#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: "/produkte" },
      { name: locale === "de" ? "Übergangsformteile" : locale === "ar" ? "التركيبات الانتقالية" : "Transition Fittings", path: "/produkte/transition-fittings" },
    ]),
  ]);

  const transCategory = CATALOG.find((c) => c.id === 'transition-fittings');
  const transItems = transCategory?.items || [];

  const isAr = locale.startsWith('ar');
  const isDe = locale === 'de';

  const PAGE_I18N = {
    de: {
      trustTorque: '> 300 Nm Torsionssicherheit',
      catalogBtn: 'Übergangsfittings im Katalog',
      consultBtn: 'Ausschreibungstexte & Beratung',
      catalogTitle: 'Übergangsformteile im Überblick',
      catalogSub: 'Entdecken Sie Übergangsmuffen (IG/AG), Übergangswinkel 90°, Wandwinkel, Doppelwandwinkel, T-Stücke und trennbare Verschraubungen.',
      pillarEyebrow: 'HYBRID-ENGINEERING',
      pillarTitle: '4 Schutzsäulen gegen Leckagen und Torsionsbrüche',
      pillarLead: 'K-Aqua Übergangsfittings kombinieren Hochleistungspolymere mit präzisionsgedrehten Metalleinsätzen für dauerhafte Festigkeit.',
      pillars: [
        { t: 'DZR-Messing (CW617N)', d: 'Entzinkungsbeständige Sonderlegierung nach europäischer UBA-Positivliste. Kein Lochfraß bei aggressiven Trinkwässern.', badge: '✓ UBA Trinkwasserkonform' },
        { t: 'V4A Edelstahl (1.4404)', d: 'Für vollentsalztes (VE) Wasser, pharmazeutische Reinstmedien und chemische Prozessleitungen unter aggressiver Dauerlast.', badge: '✓ Reinstwasser & Chemie' },
        { t: 'Anti-Torsion Hexagon', d: 'Integrierter Sechskantkragen am Metalleinsatz ermöglicht sicheres Gegenhalten mit dem Gabelschlüssel ohne Spannungen im Kunststoff.', badge: '✓ > 300 Nm Drehmoment' },
        { t: '2.000 bar Umspritzung', d: 'Polygonale Verankerungsrippen werden unter Höchstdruck umspritzt. Vollkommen ausreißfest und dauerhaft gas- sowie flüssigkeitsdicht.', badge: '✓ Formschlüssige Sperre' },
      ],
      matrixEyebrow: 'WERKSTOFFVERGLEICH',
      matrixTitle: 'Metalleinsätze im technischen Härtetest',
      matrixLead: 'Vergleich der Korrosionsbeständigkeit, mechanischen Belastbarkeit und Trinkwassereignung.',
      matrixNote: 'K-Aqua verwendet für alle Standard-Übergangsfittings entzinkungsbeständiges Messing (DZR / CW617N / CW602N). Für Reinstwasser- und Industrieanwendungen stehen Sonderausführungen in V4A (1.4404) zur Verfügung.',
      assemblyEyebrow: 'MONTAGELEITFADEN',
      assemblyTitle: 'Fachgerechte Installation in 5 Schritten',
      assemblyLead: 'Um die maximale Torsionsfestigkeit und Lebensdauer sicherzustellen, beachten Sie den standardisierten Montageablauf für Hybridverbindungen.',
      assemblyBtn: 'Technisches Datenblatt anfordern',
      timelineTitle: 'Evolution der K-Aqua Hybridtechnik',
      timelineDesc: 'Von einfachen Rändelbuchsen zu patentierten Anti-Torsions-Präzisionsbauteilen.',
      guideEyebrow: 'FACHWISSEN & TECHNISCHER LEITFADEN',
      faqTitle: 'Häufig gestellte Fragen zu Übergangsfittings',
      faqLead: 'Praxiswissen zur sicheren Verbindung von PP-R/PP-RCT Rohren mit metallischen Bauteilen.',
      ctaOverview: 'Zur Produktübersicht',
    },
    en: {
      trustTorque: '> 300 Nm Torque Resistance',
      catalogBtn: 'Transition Fittings Catalog',
      consultBtn: 'Tender Specs & Consultation',
      catalogTitle: 'Transition Fittings Spectrum Overview',
      catalogSub: 'Explore transition sockets (female/male threads), 90° elbows, wall plates, double elbows, tees, and demountable unions.',
      pillarEyebrow: 'HYBRID ENGINEERING',
      pillarTitle: '4 Pillars of Protection Against Leaks and Torsional Failure',
      pillarLead: 'K-Aqua transition fittings fuse high-performance polymers with precision-machined metal inserts for permanent mechanical integrity.',
      pillars: [
        { t: 'DZR Brass (CW617N)', d: 'Dezincification-resistant alloy complying with European UBA drinking water standards. Zero pitting in aggressive water.', badge: '✓ UBA Potable Water Certified' },
        { t: '316L Stainless Steel (1.4404)', d: 'Engineered for demineralized (DI) water, pharmaceutical fluids, and aggressive chemical processing lines.', badge: '✓ DI Water & Chemicals' },
        { t: 'Anti-Torsion Hexagon', d: 'Integrated collar flats allow secure open-end wrench counter-holding without inducing shear stress on the polymer.', badge: '✓ > 300 Nm Shear Torque' },
        { t: '2,000 bar Overmolding', d: 'Polygon ribs overmolded under ultra-high injection pressures ensure gas- and fluid-tight blowout resistance.', badge: '✓ Form-Locked Anchor' },
      ],
      matrixEyebrow: 'MATERIAL BENCHMARK',
      matrixTitle: 'Metal Inserts in Technical Endurance Testing',
      matrixLead: 'Comparison of corrosion resistance, mechanical strength, and potable water suitability.',
      matrixNote: 'K-Aqua utilizes dezincification-resistant brass (DZR CW617N/CW602N) as standard, with V4A stainless steel (1.4404) available for ultrapure water and chemical process engineering.',
      assemblyEyebrow: 'INSTALLATION GUIDELINES',
      assemblyTitle: 'Professional Installation in 5 Steps',
      assemblyLead: 'Follow the standardized 5-step workflow to guarantee maximum torsional integrity and 50-year joint lifespan.',
      assemblyBtn: 'Request Technical Datasheet',
      timelineTitle: 'Evolution of K-Aqua Hybrid Technology',
      timelineDesc: 'From knurled bushings to patented anti-torsion precision components in Germany.',
      guideEyebrow: 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE',
      faqTitle: 'Frequently Asked Questions on Transition Fittings',
      faqLead: 'Practical engineering insights for connecting PP-R/PP-RCT pipes to metallic equipment.',
      ctaOverview: 'To Product Overview',
    },
    ar: {
      trustTorque: 'مقاومة عزم دوران > 300 نيوتن.متر',
      catalogBtn: 'الوصلات الانتقالية في الكتالوج',
      consultBtn: 'نصوص المواصفات والاستشارة',
      catalogTitle: 'نظرة عامة على الوصلات الانتقالية',
      catalogSub: 'اكتشف جلب الانتقال (سن داخلي/خارجي)، أكواع 90°، أكواع الحائط، الأكواع المزدوجة، تفريعات T والوصلات القابلة للفك.',
      pillarEyebrow: 'الهندسة الهجينة المتقدمة',
      pillarTitle: '4 ركائز حماية ضد التسريب وكسور عزم الدوران',
      pillarLead: 'تجمع وصلات K-Aqua الانتقالية بين البوليمرات فائقة الأداء والقلوب المعدنية المشغولة بدقة لضمان المتانة الدائمة.',
      pillars: [
        { t: 'نحاس DZR مقاوم للتآكل (CW617N)', d: 'سبيكة خاصة مقاومة لنزع الزنك معتمدة وفق معايير مياه الشرب الأوروبية UBA بدون أي نخر.', badge: '✓ معتمد لمياه الشرب UBA' },
        { t: 'استانلس ستيل V4A (1.4404)', d: 'مخصص للمياه منزوعة المعادن VE والصناعات الدوائية وخطوط المعالجة الكيميائية القاسية.', badge: '✓ للمياه النقية والكيماويات' },
        { t: 'سداسي مانع للالتواء (Anti-Torsion)', d: 'طوق سداسي مدمج بالقلب المعدني يتيح التثبيت بمفتاح الربط لمنع إجهاد البوليمر.', badge: '✓ عزم دوران > 300 نيوتن.متر' },
        { t: 'حقن تحت ضغط 2,000 بار', d: 'أضلاع تثبيت مضلعة محقونة تحت ضغط فائق لمنع الانفصال ومقاومة التسريب تماماً.', badge: '✓ قفل هندسي مانع للإفلات' },
      ],
      matrixEyebrow: 'مقارنة المواد الهندسية',
      matrixTitle: 'القلوب المعدنية في اختبارات التحمل الفنية',
      matrixLead: 'مقارنة مقاومة التآكل والمتانة الميكانيكية وملاءمة مياه الشرب.',
      matrixNote: 'تستخدم K-Aqua النحاس المقاوم لنزع الزنك (DZR CW617N/CW602N) قياسياً، وتوفر استانلس ستيل V4A (1.4404) للمياه فائقة النقاء والصناعات الكيميائية.',
      assemblyEyebrow: 'دليل التركيب الفني',
      assemblyTitle: 'التركيب الهندسي الصحيح في 5 خطوات',
      assemblyLead: 'لضمان أقصى مقاومة لعزم الدوران وعمر تشغيلي 50 عاماً، اتبع الخطوات القياسية المعتمدة للتركيب.',
      assemblyBtn: 'طلب صحيفة البيانات الفنية',
      timelineTitle: 'تطور التقنية الهجينة في K-Aqua',
      timelineDesc: 'من الجلب المسننة البسيطة إلى المكونات الهندسية الدقيقة المقاومة للعزم في ألمانيا.',
      guideEyebrow: 'الخبرة الفنية والدليل الهندسي',
      faqTitle: 'الأسئلة الشائعة حول الوصلات الانتقالية',
      faqLead: 'معلومات تطبيقية لتوصيل أنابيب PP-R/PP-RCT بالمكونات والأجهزة المعدنية بأمان تام.',
      ctaOverview: 'إلى نظرة عامة على المنتجات',
    }
  };

  const p = isAr ? PAGE_I18N.ar : isDe ? PAGE_I18N.de : PAGE_I18N.en;

  const transStats = [
    { n: "20–315", u: "mm", l: isDe ? "Abgedeckter Dimensionsbereich" : isAr ? "نطاق المقاسات المشمول" : "Covered dimension range" },
    { n: "> 300", u: "Nm", l: isDe ? "Torsions- & Verdrehsicherheit" : isAr ? "مقاومة إجهاد عزم الدوران" : "Torsional shear resistance" },
    { n: "PN 25", u: "bar", l: isDe ? "Nenndruckklasse nach DIN" : isAr ? "فئة الضغط الاسمي حسب DIN" : "Nominal pressure class" },
    { n: "100", u: "%", l: isDe ? "Entzinkungsresistent (DZR CW617N)" : isAr ? "مقاومة تامة لنزع الزنك (DZR)" : "Dezincification resistant (DZR)" },
  ];

  const materialMatrixHead = [
    isDe ? "Gewinde- / Einsatzwerkstoff" : isAr ? "مادة السن / القلب المعدني" : "Insert Material",
    isDe ? "Entzinkungsrisiko" : isAr ? "مخاطر نزع الزنك والتآكل" : "Dezincification Risk",
    isDe ? "UBA Trinkwasserkonform" : isAr ? "مطابقة مياه الشرب UBA" : "Drinking Water Certified",
    isDe ? "Max. Torsionsmoment" : isAr ? "أقصى عزم دوران" : "Max. Torque",
    isDe ? "Empfohlener Einsatzbereich" : isAr ? "مجال التطبيق الموصى به" : "Recommended Application",
  ];

  const materialMatrixRows = [
    ["K-Aqua DZR-Messing (CW617N / CW602N)", isDe ? "0 % (Hochgradig immun)" : isAr ? "0% (محصن تماماً)" : "0% (Immune)", isDe ? "Ja (UBA Positivliste)" : isAr ? "نعم (قائمة UBA المعتمدة)" : "Yes (UBA List)", "> 300 Nm", isDe ? "Trinkwasser, Sanitär, Heizung, Kühlsysteme" : isAr ? "مياه الشرب، التدفئة، التكييف والأنظمة الصحية" : "Potable water, HVAC, heating, cooling"],
    ["K-Aqua V4A Edelstahl (1.4404 / 316L)", isDe ? "0 % (Vollkommen immun)" : isAr ? "0% (محصن بنسبة 100%)" : "0% (Immune)", isDe ? "Ja (Höchste Reinheit)" : isAr ? "نعم (أعلى درجات النقاء)" : "Yes (High Purity)", "> 380 Nm", isDe ? "Demineralisiertes VE-Wasser, Chemie & Pharma" : isAr ? "المياه منزوعة المعادن، الكيماويات والصيدلة" : "Demineralized water, chemicals & pharma"],
    [isDe ? "Standard-Messing (Nicht entzinkungsfrei)" : isAr ? "نحاس قياسي (غير مقاوم للنزع)" : "Standard Brass", isDe ? "Hoch (Lochfraßgefahr)" : isAr ? "مرتفع (خطر تآكل ونقر)" : "High (Pitting risk)", isDe ? "Eingeschränkt" : isAr ? "محدود ومشروط" : "Restricted", "~ 180 Nm", isDe ? "Nicht empfohlen für saures/weiches Wasser" : isAr ? "غير موصى به للمياه الحمضية أو منخفضة الكالسيوم" : "Not recommended for acidic/soft water"],
  ];

  const assemblySteps = [
    {
      t: isDe ? "1. Gewindeabdichtung vorbereiten" : isAr ? "1. تجهيز مادة إحكام السن" : "1. Thread Sealant Preparation",
      d: isDe ? "Aufbringen von geprüftem Dichtfaden, PTFE-Band oder Hanf auf das metallische Außen- bzw. Innengewinde nach Herstellervorgabe." : isAr ? "تطبيق خيط إحكام معتمد أو شريط تفلون أو كتان على السن المعدني وفقاً لتعليمات المصنع." : "Apply certified thread sealant (PTFE tape, sealing cord, or hemp) according to manufacturer instructions."
    },
    {
      t: isDe ? "2. Sicheres Gegenhalten am Sechskant" : isAr ? "2. التثبيت الآمن بمفتاح على السداسي" : "2. Anti-Torsion Hexagon Counter-Hold",
      d: isDe ? "Beim Eindrehen metallischer Armaturen oder Rohre MUSS mit einem Schraubenschlüssel am integrierten Messing-Sechskant gegengehalten werden." : isAr ? "عند ربط الصمامات أو الأنابيب المعدنية يجب تثبيت السداسي النحاسي المدمج بمفتاح ربط لمنع إجهاد البوليمر." : "Always counter-hold the integrated brass hexagon using an open-end wrench to prevent torsional stress on the polymer."
    },
    {
      t: isDe ? "3. Drehmomentgerechter Anzug" : isAr ? "3. الشد بعزم دوران معاير" : "3. Calibrated Torque Tightening",
      d: isDe ? "Festziehen der Verschraubung ohne Überschreiten der Grenzmomente. Der formschlüssige Rillenkörper nimmt alle axialen Zugkräfte auf." : isAr ? "ربط الوصلة بعزم منضبط دون تجاوز الحدود، حيث تمتص الأضلاع المضلعة كافة قوى السحب المحورية." : "Tighten the threaded component securely. The polygon-locked ribs absorb all axial tension forces."
    },
    {
      t: isDe ? "4. Polyfusion Heizelementmuffenschweißen" : isAr ? "4. اللحام الحراري للجلب عند 260 °م" : "4. Polyfusion Socket Welding",
      d: isDe ? "Verschweißen der Kunststoffseite bei 260 °C mit dem K-Aqua PP-R/PP-RCT Rohrsystem für eine 100 % homogene, dichte Einheit." : isAr ? "لحام الطرف البلاستيكي عند 260 °م مع أنابيب K-Aqua لإنتاج وحدة جزيئية متجانسة ومانعة للتسريب تماماً." : "Fuse the polymer socket at 260 °C with the K-Aqua pipe system for a homogeneous molecular bond."
    },
    {
      t: isDe ? "5. Druckprobe nach DIN 1988" : isAr ? "5. اختبار الضغط الهيدروستاتيكي" : "5. Pressure Testing to DIN 1988",
      d: isDe ? "Nach dem Auskühlen ist die Verbindung sofort mechanisch und hydraulisch mit vollem Prüfdruck (bis PN 25) belastbar." : isAr ? "بعد التبريد تصبح الوصلة الهجينة جاهزة فوراً لاختبار الضغط الكامل حتى PN 25 وتحمل الأحمال الميكانيكية." : "Following cooling, the hybrid joint is ready for full hydrostatic pressure testing up to PN 25."
    }
  ];

  const hybridTimeline = [
    {
      year: "2002",
      title: isDe ? "Erste Generation Metalleinsätze" : isAr ? "الجيل الأول من القلوب المعدنية" : "1st Gen Metal Inserts",
      text: isDe ? "Entwicklung runder Gewindebuchsen mit einfachen Rändelungen für PP-R Übergänge." : isAr ? "تطوير جلب قلاووظ دائرية مع تسنين بسيط لوصلات الانتقال PP-R." : "Development of knurled brass inserts for PP-R pipe transitions."
    },
    {
      year: "2012",
      title: isDe ? "Anti-Torsion Hexagon & DZR-Messing" : isAr ? "سداسي منع الالتواء ونحاس DZR" : "Anti-Torsion Hexagon & DZR Brass",
      text: isDe ? "Einführung des patentierten Sechskantkragens und Umstellung auf entzinkungsbeständige Legierungen." : isAr ? "إطلاق طوق التثبيت السداسي والانتقال لسبائك النحاس المقاومة لنزع الزنك." : "Introduction of anti-torsion hexagon collars and switch to dezincification-resistant alloys."
    },
    {
      year: "2019",
      title: isDe ? "Edelstahl 1.4404 (V4A) Serie" : isAr ? "سلسلة استانلس ستيل 1.4404 (V4A)" : "Stainless Steel 1.4404 Series",
      text: isDe ? "Markteinführung der säure- und vollentsalzungswasserbeständigen Edelstahl-Hybridformteile." : isAr ? "إطلاق الوصلات الهجينة من الاستانلس ستيل المقاوم للأحماض والمياه النقية." : "Launch of acid- and demineralized-water-resistant stainless steel hybrid fittings."
    },
    {
      year: "2024+",
      title: isDe ? "Großflansche & 2.000 bar Spritzguss" : isAr ? "الفلنجات الكبيرة وحقن 2,000 بار" : "Large Flanges & High-Pressure Injection",
      text: isDe ? "Ausbau der Übergangsflansche bis d315 mm für industrielle Hochdruck-Pumpenstationen." : isAr ? "توسيع فلنجات الانتقال حتى d315 مم لمحطات الضخ الصناعية عالية الضغط." : "Expansion of transition flange systems up to d315 mm for industrial high-pressure pumping stations."
    }
  ];

  const transFaq = [
    {
      q: isDe ? "Warum ist entzinkungsbeständiges Messing (DZR) so wichtig?" : isAr ? "لماذا يعتبر النحاس المقاوم لنزع الزنك (DZR) فائق الأهمية؟" : "Why is dezincification-resistant brass (DZR) essential?",
      a: isDe ? "Standard-Messing neigt in kalkarmen, chlorierten oder kohlensäurehaltigen Wässern zur selektiven Entzinkung, was zu porösen, brüchigen Metallgittern und Leckagen führt. K-Aqua verwendet zertifiziertes DZR-Messing (CW617N/CW602N), das nach UBA-Positivliste trinkwasserzugelassen ist und dauerhaft korrosionsfrei bleibt." : isAr ? "يتعرض النحاس العادي لفقدان الزنك في المياه المعالجة أو العسرة مما يسبب هشاشة وتآكلاً وتسريباً، بينما تستخدم K-Aqua نحاس DZR معتمداً يضمن بقاء المعدن سليماً دون تآكل." : "Standard brass can suffer dezincification in aggressive waters, causing brittleness and leaks. K-Aqua exclusively uses certified DZR brass (CW617N) compliant with UBA drinking water directives."
    },
    {
      q: isDe ? "Welche Funktion hat der außenliegende Sechskant am Metallteil?" : isAr ? "ما هي وظيفة السداسي الخارجي على الجزء المعدني؟" : "What is the function of the outer hexagon on the metal insert?",
      a: isDe ? "Der Sechskant dient als definierte Angriffsfläche für den Gabelschlüssel. Beim Festziehen metallischer Gegenstücke (z. B. Ventile oder Manometer) wird das Anzugsmoment direkt am Metall abgefangen, sodass keine Torsionsspannungen in den Kunststoffkörper eingeleitet werden." : isAr ? "يوفر السداسي مساحة ارتكاز لمفتاح الربط، بحيث يمتص القلب المعدني كامل عزم الشد دون نقل أي إجهاد التواء إلى البوليمر." : "The hexagon provides a secure wrench flat so that tightening torque is absorbed entirely by the metal insert, preventing shear strain on the polymer body."
    },
    {
      q: isDe ? "Kann zwischen PP-R und dem Metalleinsatz galvanische Korrosion entstehen?" : isAr ? "هل يمكن أن يحدث تآكل جلفاني بين البوليمر والقلب المعدني؟" : "Can galvanic corrosion occur between PP-R and the metal insert?",
      a: isDe ? "Nein. PP-R ist ein elektrischer Nichtleiter. Dadurch wird die Entstehung galvanischer Mikroelemente an der Grenzfläche vollständig unterbunden. Der Kunststoffkörper schirmt das Metall zusätzlich gegen aggressive Umgebungsluft ab." : isAr ? "لا، لأن مادة PP-R عازلة كهربائياً مما يمنع تشكل التيارات الجلفانية تماماً ويحمي المعدن من التأثيرات البيئية الخارجية." : "No. Polypropylene is an electrical insulator, completely preventing galvanic corrosion cells at the interface and shielding metal from ambient corrosive atmospheres."
    },
    {
      q: isDe ? "Welche Gewindeausführungen stehen zur Verfügung?" : isAr ? "ما هي أنواع الأسنان القلاووظ المتوفرة؟" : "Which thread types are available?",
      a: isDe ? "K-Aqua liefert Innengewinde (Rp nach ISO 7/1 zylindrisch) und Außengewinde (R nach ISO 7/1 kegelig bzw. G nach ISO 228 zylindrisch) in Nennweiten von ½″ bis 4″ sowie Sonderflanschanschlüsse bis d315 mm." : isAr ? "توفر K-Aqua أسنان داخلية (Rp حسب ISO 7/1) وخارجية (R و G حسب ISO 228) بمقاسات من 1/2 إلى 4 بوصة، وفلنجات حتى مقاس d315 مم." : "We supply female threads (Rp to ISO 7/1) and male threads (R to ISO 7/1 / G to ISO 228) from 1/2\" to 4\", plus flanged transitions up to d315 mm."
    },
    {
      q: isDe ? "Können Übergangsverschraubungen (Unions) mehrfach geöffnet werden?" : isAr ? "هل يمكن فك وتركيب وصلات الـ Union الانتقالية عدة مرات؟" : "Can transition unions be opened multiple times?",
      a: isDe ? "Ja, unsere trennbaren 2-teiligen Übergangsverschraubungen mit hochwertiger EPDM-Flachdichtung ermöglichen den schnellen Ausbau von Pumpen, Filtern oder Messgeräten für Wartungsarbeiten, ohne das Rohr zerschneiden zu müssen." : isAr ? "نعم، تتيح وصلات الـ Union القابلة للفك المزودة بحلقات EPDM فك المضخات والفلاتر بسهولة لأعمال الصيانة الدورية دون الحاجة لقطع الأنابيب." : "Yes, our demountable 2-piece unions with EPDM flat seals allow rapid equipment removal for pump or filter maintenance without cutting the piping."
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground selection:bg-primary/30">
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
              DZR-Messing CW617N
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-foreground text-xs font-mono font-medium">
              V4A Edelstahl 1.4404
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-accent-strong text-xs font-mono font-bold">
              {p.trustTorque}
            </span>
          </div>

          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow') || "HYBRID-VERBINDUNGSTECHNIK"}
            title={t('hero.title') || "PP-R & PP-RCT Übergangsformteile: Die sichere Schnittstelle zu Metall"}
            lead={t('hero.lead') || "Hochbelastbare Übergangsmuffen, Wandwinkel, T-Stücke und Verschraubungen mit tief verankerten Metalleinsätzen. Höchste Ausreißfestigkeit und UBA-geprüfte Trinkwasserhygiene."}
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
          <StatBand stats={transStats} />
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <CategoryCatalogSection
        category="transition-fittings"
        items={transItems}
        title={p.catalogTitle}
        subtitle={p.catalogSub}
        locale={locale}
      />

      {/* 4 Pillars of Hybrid Engineering */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu size={14} />
              <span>{p.pillarEyebrow}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {p.pillarTitle}
            </h2>
            <p className="text-lead text-muted-foreground mt-2">
              {p.pillarLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.pillars.map((pil, idx) => {
              const icons = [Shield, Sparkles, Hexagon, Layers];
              const IconComp = icons[idx] || Shield;
              return (
                <div key={idx} className="rounded-2xl bg-card border border-card-border p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2">{pil.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pil.d}
                    </p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-card-border text-xs font-mono font-bold ${idx === 2 ? 'text-accent-strong' : 'text-primary'}`}>
                    {pil.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Material & Performance Matrix */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Gauge size={14} />
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
              head={materialMatrixHead}
              rows={materialMatrixRows}
              heroCol={0}
              note={p.matrixNote}
            />
          </div>
        </div>
      </section>

      {/* 5-Step Safe Assembly Workflow */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Wrench size={14} />
                <span>{p.assemblyEyebrow}</span>
              </div>
              <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
                {p.assemblyTitle}
              </h2>
              <p className="text-lead text-muted-foreground mt-4 leading-relaxed">
                {p.assemblyLead}
              </p>
              <div className="mt-8">
                <Button variant="secondary" href="/kontakt">
                  {p.assemblyBtn}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-card border border-card-border p-8 shadow-sm">
              <StepFlow steps={assemblySteps} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <HorizontalTimeline
        title={p.timelineTitle}
        description={p.timelineDesc}
        items={hybridTimeline}
      />

      {/* Structured SEO Guide */}
      {tSeo.has("guideText") && (
        <section id="transition-engineering-guide" className="py-20 bg-background border-b border-card-border scroll-mt-24">
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
            <DeepFAQ items={transFaq} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title') || "Kompromisslose Schnittstellensicherheit für Ihr Projekt"}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc') || "Sichern Sie sich verlässliche Hybridkomponenten mit DZR-Messing oder Edelstahl für anspruchsvolle Industrie- und TGA-Anwendungen."}
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


