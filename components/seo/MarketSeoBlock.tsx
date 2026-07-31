import React from 'react';

export function MarketSeoBlock({ locale, locationName, isCity = false }: { locale: string; locationName: string; isCity?: boolean }) {
  if (locale === 'de') {
    return (
      <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
        <p className="mb-4">
          Die wachsenden Anforderungen an moderne Infrastrukturprojekte in {locationName} erfordern kompromisslose Materialqualität und Systemzuverlässigkeit. Als führender Hersteller liefert K-Aqua speziell entwickelte {isCity ? `PP-R/PPRCT Rohrsysteme in ${locationName}` : `PP-R/PPRCT Rohrsysteme für ${locationName}`}, die exakt auf die klimatischen und regulatorischen Herausforderungen {isCity ? "dieser Metropolregion" : "dieses Marktes"} abgestimmt sind. Unsere zertifizierten <strong className="font-medium text-foreground">{isCity ? `PP-R Rohrsysteme in ${locationName}` : `PP-R Rohrsysteme für ${locationName}`}</strong> garantieren absolute Korrosionsfreiheit, verhindern Inkrustationen und bieten eine außergewöhnliche thermische Isolationsfähigkeit, die den Energieverlust in Warmwasser- und Klimakreisläufen minimiert.
        </p>
        <p className="mb-4">
          Besonders im Bereich der Trinkwasserhygiene setzen K-Aqua Produkte höchste Standards. Die porenfreie, extrem glatte Innenoberfläche der Rohre verhindert effektiv die Bildung von Biofilmen und Legionellen, wodurch eine makellose Wasserqualität vom Einspeisepunkt bis zur Entnahmestelle gewährleistet bleibt. Egal ob in komplexen Hochhaus-Steigleitungen, weitläufigen industriellen Kühlsystemen oder anspruchsvollen kommunalen Fernwärmenetzen in {locationName} – unsere nahtlose Schweißtechnik sorgt für eine hundertprozentig homogene, dauerhaft dichte Verbindung.
        </p>
        <p className="mb-4">
          Nachhaltigkeit und Effizienz stehen im Zentrum unserer Entwicklungsphilosophie. Die lange Lebensdauer von über 50 Jahren reduziert die Total Cost of Ownership drastisch, während die vollständige Recycelbarkeit unserer Kunststoffe aktiv zu Green-Building-Zertifizierungen (wie LEED oder BREEAM) beiträgt. Planer, Ingenieure und Installateure in {locationName} vertrauen auf das kompromisslose "German Engineering" von K-Aqua, um selbst die anspruchsvollsten wasserführenden Systeme sicher, effizient und zukunftssicher zu realisieren.
        </p>
      </div>
    );
  }

  if (locale === 'en') {
    return (
      <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
        <p className="mb-4">
          The growing demands of modern infrastructure projects in {locationName} require uncompromising material quality and system reliability. As a leading manufacturer, K-Aqua delivers specially developed {isCity ? `PP-R/PP-RCT Piping Systems in ${locationName}` : `PP-R/PP-RCT Piping Systems for ${locationName}`} tailored precisely to the climatic and regulatory challenges of {isCity ? "this metropolitan area" : "this market"}. Our certified <strong className="font-medium text-foreground">{isCity ? `PP-R Piping Systems in ${locationName}` : `PP-R Piping Systems for ${locationName}`}</strong> guarantee absolute corrosion resistance, prevent scale buildup, and offer exceptional thermal insulation capabilities that minimize energy loss in hot water and HVAC circuits.
        </p>
        <p className="mb-4">
          Particularly in the realm of potable water hygiene, K-Aqua products set the highest standards. The non-porous, extremely smooth inner surface of our pipes effectively prevents the formation of biofilms and Legionella, ensuring pristine water quality from the point of supply to the point of use. Whether in complex high-rise risers, expansive industrial cooling systems, or demanding municipal district heating networks in {locationName} – our seamless welding technology ensures a one-hundred-percent homogeneous, permanently leak-proof connection.
        </p>
        <p className="mb-4">
          Sustainability and efficiency are at the core of our development philosophy. The extended lifespan of over 50 years drastically reduces the Total Cost of Ownership, while the complete recyclability of our plastics actively contributes to Green Building certifications (such as LEED or BREEAM). Planners, engineers, and installers in {locationName} rely on the uncompromising "German Engineering" of K-Aqua to realize even the most demanding water-bearing systems safely, efficiently, and future-proof.
        </p>
      </div>
    );
  }

  // Arabic
  return (
    <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8" dir="rtl">
      <p className="mb-4">
        تتطلب المتطلبات المتزايدة لمشاريع البنية التحتية الحديثة في {locationName} جودة مواد وموثوقية نظام لا تقبل المساومة. بصفتها شركة رائدة، تقدم K-Aqua حلول {isCity ? `أنظمة أنابيب PP-R/PP-RCT في ${locationName}` : `أنظمة أنابيب PP-R/PP-RCT لـ${locationName}`} تم تطويرها خصيصًا ومصممة لتناسب التحديات المناخية والتنظيمية في {isCity ? "هذه المنطقة الحضرية" : "هذا السوق"}. تضمن منتجاتنا المعتمدة <strong className="font-medium text-foreground">{isCity ? `أنظمة أنابيب PP-R في ${locationName}` : `أنظمة أنابيب PP-R لـ${locationName}`}</strong> مقاومة مطلقة للتآكل، وتمنع تكون القشور، وتوفر قدرات عزل حراري استثنائية تقلل من فقدان الطاقة في دوائر الماء الساخن وتكييف الهواء.
      </p>
      <p className="mb-4">
        تضع منتجات K-Aqua أعلى المعايير بشكل خاص في مجال نظافة مياه الشرب. يمنع السطح الداخلي للأنابيب، الخالي من المسام والناعم للغاية، بشكل فعال تكوين الأغشية الحيوية والبكتيريا الفيلقية (Legionella)، مما يضمن جودة مياه نقية من نقطة الإمداد إلى نقطة الاستخدام. سواء في أنابيب الرفع المعقدة في المباني الشاهقة، أو أنظمة التبريد الصناعية الواسعة، أو شبكات التدفئة المركزية البلدية الصعبة في {locationName} - تضمن تقنية اللحام السلسة لدينا اتصالًا متجانسًا بنسبة مائة بالمائة ومقاومًا للتسرب بشكل دائم.
      </p>
      <p className="mb-4">
        الاستدامة والكفاءة هما في صميم فلسفتنا التطويرية. يقلل العمر الافتراضي الطويل الذي يزيد عن 50 عامًا من التكلفة الإجمالية للملكية بشكل كبير، بينما تساهم قابلية إعادة التدوير الكاملة للمواد البلاستيكية لدينا بنشاط في شهادات المباني الخضراء (مثل LEED أو BREEAM). يعتمد المخططون والمهندسون والمقاولون في {locationName} على "الهندسة الألمانية" التي لا تقبل المساومة من K-Aqua لتنفيذ حتى أكثر أنظمة المياه تطلبًا بأمان وكفاءة واستدامة.
      </p>
    </div>
  );
}
