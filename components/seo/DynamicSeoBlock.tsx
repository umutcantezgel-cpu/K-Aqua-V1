'use client';

import React from 'react';
import { usePathname } from '@/lib/i18n/navigation';

export default function DynamicSeoBlock({ locale }: { locale: string }) {
  const pathname = usePathname();
  
  // Clean the pathname to use as a basis for unique text generation
  const pathParts = pathname.split('/').filter(Boolean);
  const mainRoute = pathParts[0] || 'home';
  const subRoute = pathParts[1] || '';
  const itemRoute = pathParts[2] || '';

  // Generate a deterministic index (0-4) based on pathname characters
  const charSum = pathname.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const tplIdx = charSum % 5;

  const generateText = () => {
    const isDe = locale === 'de';
    const isAr = locale === 'ar';

    const formatSegment = (seg: string) => seg.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const kMain = formatSegment(mainRoute);
    const kSub = subRoute ? formatSegment(subRoute) : '';
    const kItem = itemRoute ? formatSegment(itemRoute) : '';
    const focusKeyword = [kMain, kSub, kItem].filter(Boolean).join(" - ");
    const h1Simulated = kItem || kSub || kMain || "K-Aqua";

    const paragraphsDe = [
      `Willkommen im Informationsbereich zu ${focusKeyword}. Als renommierter Hersteller von fortschrittlichen Rohrleitungssystemen aus Polypropylen (PP-R und PP-RCT) bietet K-Aqua maßgeschneiderte Lösungen, die exakt auf die Anforderungen von ${h1Simulated} abgestimmt sind. Die Langlebigkeit und Zuverlässigkeit unserer Produkte setzen dabei branchenweit Maßstäbe.`,
      `Die Qualitätssicherung hat bei K-Aqua oberste Priorität, was sich besonders bei Projekten rund um ${focusKeyword} auszahlt. Durch kontinuierliche Überwachung und strenge deutsche Ingenieursstandards gewährleisten wir, dass jede Komponente für ${h1Simulated} höchste internationale Normen erfüllt und dauerhaft sicheren Betrieb garantiert.`,
      `Unsere Kunststoffrohrsysteme zeichnen sich durch enorme Vielseitigkeit aus. Wenn es um ${focusKeyword} geht, profitieren Installateure und Planer von der hohen Temperaturbeständigkeit und Druckfestigkeit. Dies macht unsere Lösungen ideal für den Einsatz in komplexen Umgebungen, die mit ${h1Simulated} in Verbindung stehen.`,
      `Nachhaltigkeit und Umweltschutz sind fundamentale Werte unserer Unternehmensphilosophie. Die umweltfreundlichen Eigenschaften unserer Systeme unterstützen ${focusKeyword} maßgeblich. Mit einer exzellenten Ökobilanz und vollständiger Recyclingfähigkeit leisten unsere Produkte für ${h1Simulated} einen wichtigen Beitrag zum nachhaltigen Bauen der Zukunft.`,
      `Ein wesentlicher Vorteil für ${focusKeyword} liegt in der einfachen und sicheren Installationstechnologie. Durch das homogene Verschweißen der PP-R und PP-RCT Komponenten entsteht eine unlösbare, absolut dichte Verbindung, die Ausfallzeiten bei ${h1Simulated} minimiert und die Wartungskosten drastisch senkt.`,
      `Weltweit vertrauen Bauherren, Ingenieure und Architekten auf unsere Expertise. Auch im Segment ${focusKeyword} bieten wir umfassenden technischen Support. Unsere globale Präsenz in Kombination mit lokalem Know-how stellt sicher, dass Anforderungen an ${h1Simulated} stets professionell und zeitnah umgesetzt werden.`,
      `Forschung und kontinuierliche Innovation treiben uns täglich an. Die stetige Weiterentwicklung unserer Werkstoffe ermöglicht es uns, selbst die spezifischsten Herausforderungen im Bereich ${focusKeyword} zu meistern. So bleiben unsere Systeme für ${h1Simulated} stets auf dem neuesten Stand der Technik.`,
      `Ein besonderes Merkmal unserer Systeme ist die hervorragende Korrosionsbeständigkeit. Speziell bei ${focusKeyword} verhindert das glatte Innenprofil Ablagerungen und Inkrustationen. Dies garantiert über Jahrzehnte hinweg eine konstante Durchflussleistung und maximale Wasserhygiene für alle Anwendungen im Umfeld von ${h1Simulated}.`,
      `Schallschutz und reduzierte Strömungsgeräusche sind weitere entscheidende Vorteile. Bei Installationen im Rahmen von ${focusKeyword} sorgen die schallabsorbierenden Eigenschaften von PP-R für einen extrem leisen Betrieb. Dies erhöht den Komfort bei ${h1Simulated} signifikant, insbesondere in sensiblen Gebäudestrukturen wie Krankenhäusern.`,
      `Zusammenfassend lässt sich festhalten, dass ${focusKeyword} nachhaltig von unseren ganzheitlichen Systemlösungen profitiert. Wir laden Sie ein, die technischen Spezifikationen und Zertifizierungen zu ${h1Simulated} in unseren detaillierten Datenblättern zu studieren und sich von der Qualität unserer Arbeit zu überzeugen.`,
      `Die Wirtschaftlichkeit unserer Systeme ist ein weiterer entscheidender Faktor für ${focusKeyword}. Durch die schnelle Verlegung und die wartungsfreie Betriebsweise amortisieren sich Investitionen im Umfeld von ${h1Simulated} in kürzester Zeit, was eine langfristige Kostenersparnis garantiert.`,
      `Wir danken Ihnen für Ihr Interesse an ${focusKeyword} und freuen uns darauf, gemeinsam mit Ihnen anspruchsvolle Projekte im Bereich ${h1Simulated} zu realisieren. K-Aqua bleibt Ihr verlässlicher Partner für zukunftsweisende Rohrleitungslösungen weltweit.`
    ];

    const paragraphsEn = [
      `Welcome to the information section for ${focusKeyword}. As a renowned manufacturer of advanced polypropylene (PP-R and PP-RCT) piping systems, K-Aqua offers tailored solutions perfectly aligned with the requirements of ${h1Simulated}. The durability and reliability of our products set industry-wide benchmarks.`,
      `Quality assurance is our top priority at K-Aqua, which pays off particularly in projects involving ${focusKeyword}. Through continuous monitoring and strict German engineering standards, we ensure that every component for ${h1Simulated} meets the highest international norms and guarantees long-term safe operation.`,
      `Our plastic piping systems are characterized by enormous versatility. When it comes to ${focusKeyword}, installers and planners benefit from high temperature and pressure resistance. This makes our solutions ideal for complex environments associated with ${h1Simulated}.`,
      `Sustainability and environmental protection are fundamental values of our corporate philosophy. The eco-friendly properties of our systems significantly support ${focusKeyword}. With an excellent ecological footprint and full recyclability, our products for ${h1Simulated} make a crucial contribution to sustainable future building.`,
      `A major advantage for ${focusKeyword} lies in the simple and secure installation technology. The homogeneous welding of PP-R and PP-RCT components creates an inseparable, absolutely leak-proof joint that minimizes downtime for ${h1Simulated} and drastically reduces maintenance costs.`,
      `Builders, engineers, and architects worldwide trust our expertise. We also provide comprehensive technical support in the ${focusKeyword} segment. Our global presence combined with local know-how ensures that requirements for ${h1Simulated} are always implemented professionally and promptly.`,
      `Research and continuous innovation drive us every day. The constant advancement of our materials enables us to overcome even the most specific challenges in the area of ${focusKeyword}. Thus, our systems for ${h1Simulated} always remain at the cutting edge of technology.`,
      `A special feature of our systems is their excellent corrosion resistance. Especially in ${focusKeyword}, the smooth inner profile prevents deposits and incrustations. This guarantees a constant flow rate and maximum water hygiene over decades for all applications related to ${h1Simulated}.`,
      `Sound insulation and reduced flow noise are further decisive advantages. For installations within the scope of ${focusKeyword}, the sound-absorbing properties of PP-R ensure extremely quiet operation. This significantly increases comfort for ${h1Simulated}, particularly in sensitive building structures like hospitals.`,
      `In summary, ${focusKeyword} sustainably benefits from our holistic system solutions. We invite you to study the technical specifications and certifications for ${h1Simulated} in our detailed data sheets and convince yourself of the outstanding quality of our work.`,
      `The economic efficiency of our systems is another decisive factor for ${focusKeyword}. Thanks to rapid installation and maintenance-free operation, investments in the context of ${h1Simulated} amortize in a very short time, guaranteeing long-term cost savings.`,
      `We thank you for your interest in ${focusKeyword} and look forward to realizing demanding projects in the area of ${h1Simulated} together with you. K-Aqua remains your reliable partner for pioneering piping solutions worldwide.`
    ];

    const paragraphsAr = [
      `مرحباً بكم في قسم المعلومات الخاص بـ ${focusKeyword}. كشركة مصنعة رائدة لأنظمة أنابيب البولي بروبيلين المتقدمة (PP-R و PP-RCT)، تقدم K-Aqua حلولاً مخصصة تتماشى تماماً مع متطلبات ${h1Simulated}. إن متانة وموثوقية منتجاتنا تضع معايير عالية على مستوى الصناعة.`,
      `ضمان الجودة هو أولويتنا القصوى في K-Aqua، وهو ما يؤتي ثماره بشكل خاص في المشاريع التي تتضمن ${focusKeyword}. من خلال المراقبة المستمرة والمعايير الهندسية الألمانية الصارمة، نضمن أن كل مكون لـ ${h1Simulated} يلبي أعلى المعايير الدولية ويضمن التشغيل الآمن على المدى الطويل.`,
      `تتميز أنظمة الأنابيب البلاستيكية لدينا بتعدد استخدامات هائل. عندما يتعلق الأمر بـ ${focusKeyword}، يستفيد فنيو التركيب والمخططون من المقاومة العالية للحرارة والضغط. هذا يجعل حلولنا مثالية للبيئات المعقدة المرتبطة بـ ${h1Simulated}.`,
      `تعتبر الاستدامة وحماية البيئة قيماً أساسية في فلسفة شركتنا. تدعم الخصائص الصديقة للبيئة لأنظمتنا ${focusKeyword} بشكل كبير. بفضل البصمة البيئية الممتازة وقابلية إعادة التدوير الكاملة، تساهم منتجاتنا لـ ${h1Simulated} بشكل حاسم في البناء المستدام للمستقبل.`,
      `تكمن الميزة الرئيسية لـ ${focusKeyword} في تقنية التركيب البسيطة والآمنة. يخلق اللحام المتجانس لمكونات PP-R و PP-RCT مفصلاً غير قابل للانفصال ومانعاً للتسرب تماماً، مما يقلل من وقت التوقف عن العمل لـ ${h1Simulated} ويقلل بشكل كبير من تكاليف الصيانة.`,
      `يثق البناؤون والمهندسون والمهندسون المعماريون في جميع أنحاء العالم بخبرتنا. كما نقدم دعماً فنياً شاملاً في قطاع ${focusKeyword}. إن وجودنا العالمي بالإضافة إلى المعرفة المحلية يضمن تنفيذ متطلبات ${h1Simulated} باحترافية وفي الوقت المناسب دائماً.`,
      `البحث والابتكار المستمر يدفعاننا كل يوم. يتيح لنا التطوير المستمر لموادنا التغلب حتى على التحديات الأكثر تحديداً في مجال ${focusKeyword}. وبالتالي، تظل أنظمتنا الخاصة بـ ${h1Simulated} دائماً في طليعة التكنولوجيا.`,
      `ميزة خاصة لأنظمتنا هي مقاومتها الممتازة للتآكل. خاصة في ${focusKeyword}، يمنع المظهر الجانبي الداخلي الأملس الرواسب والترسبات. هذا يضمن معدل تدفق ثابت وأقصى درجات النظافة للمياه على مدى عقود لجميع التطبيقات المتعلقة بـ ${h1Simulated}.`,
      `عزل الصوت وتقليل ضوضاء التدفق هي مزايا حاسمة أخرى. بالنسبة للتركيبات في نطاق ${focusKeyword}، تضمن خصائص امتصاص الصوت لـ PP-R تشغيلاً هادئاً للغاية. هذا يزيد بشكل كبير من الراحة لـ ${h1Simulated}، لا سيما في هياكل المباني الحساسة مثل المستشفيات.`,
      `باختصار، يستفيد ${focusKeyword} بشكل مستدام من حلول الأنظمة الشاملة لدينا. ندعوكم لدراسة المواصفات الفنية والشهادات الخاصة بـ ${h1Simulated} في أوراق البيانات التفصيلية لدينا والتأكد من الجودة المتميزة لعملنا.`,
      `الكفاءة الاقتصادية لأنظمتنا هي عامل حاسم آخر لـ ${focusKeyword}. بفضل التركيب السريع والتشغيل الخالي من الصيانة، يتم استرداد الاستثمارات في سياق ${h1Simulated} في وقت قصير جداً، مما يضمن توفير التكاليف على المدى الطويل.`,
      `نشكركم على اهتمامكم بـ ${focusKeyword} ونتطلع إلى تنفيذ مشاريع متطلبة في مجال ${h1Simulated} معكم. تظل K-Aqua شريككم الموثوق لحلول الأنابيب الرائدة في جميع أنحاء العالم.`
    ];

    const paragraphs = isDe ? paragraphsDe : isAr ? paragraphsAr : paragraphsEn;

    return (
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#050505] pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-[11px] text-white/30 leading-relaxed text-justify opacity-80 hover:opacity-100 transition-opacity duration-500">
        <h2 className="sr-only">SEO Context for {mainRoute}</h2>
        {generateText()}
      </div>
    </div>
  );
}
