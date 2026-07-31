import React from 'react';

export function MarketSeoBlock({ locale, locationName, isCity = false }: { locale: string; locationName: string; isCity?: boolean }) {
  if (locale === 'de') {
    if (isCity) {
      return (
        <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
          <p className="mb-4">
            Lokale Bauprojekte in {locationName} verlangen nach innovativen Lösungen, die den städtischen Bauvorschriften entsprechen. K-Aqua bietet maßgeschneiderte PP-R/PP-RCT Rohrsysteme in {locationName}, die sich ideal für die spezifischen Anforderungen dieser Metropolregion eignen. Durch unsere bewährten <strong className="font-medium text-foreground">PP-R Rohrsysteme in {locationName}</strong> sichern wir eine dauerhafte Widerstandsfähigkeit gegen Korrosion und Ablagerungen. Gleichzeitig profitieren lokale Installationen von einer hervorragenden Wärmedämmung, was die Betriebskosten von Heiz- und Kühlsystemen erheblich senkt.
          </p>
          <p className="mb-4">
            Im städtischen Umfeld hat die Reinhaltung des Trinkwassers höchste Priorität. K-Aqua Polypropylen-Rohre zeichnen sich durch eine extrem glatte Oberfläche aus, die das Bakterienwachstum stark hemmt und somit die Gesundheit der Endverbraucher schützt. Für komplexe Gebäude in {locationName} – von Wolkenkratzern über Krankenhäuser bis hin zu Industrieanlagen – bietet unsere Polyfusionsschweißtechnik auslaufsichere und wartungsfreie Verbindungen.
          </p>
          <p className="mb-4">
            Zusätzlich unterstützen wir umweltfreundliches Bauen in der Stadt. Unsere vollständig recycelbaren Materialien und die lange Einsatzdauer von über 50 Jahren helfen Entwicklern in {locationName}, strenge Umweltziele zu erreichen und Zertifizierungen für grünes Bauen (wie LEED oder BREEAM) zu erlangen. Fachbetriebe und Planer vertrauen auf unsere deutsche Qualität, um zukunftsfähige Wassernetzwerke zu schaffen.
          </p>
        </div>
      );
    }
    return (
      <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
        <p className="mb-4">
          Die wachsenden Anforderungen an moderne Infrastrukturprojekte in {locationName} erfordern kompromisslose Materialqualität und Systemzuverlässigkeit. Als führender Hersteller liefert K-Aqua speziell entwickelte PP-R/PPRCT Rohrsysteme für {locationName}, die exakt auf die klimatischen und regulatorischen Herausforderungen dieses Marktes abgestimmt sind. Unsere zertifizierten <strong className="font-medium text-foreground">PP-R Rohrsysteme für {locationName}</strong> garantieren absolute Korrosionsfreiheit, verhindern Inkrustationen und bieten eine außergewöhnliche thermische Isolationsfähigkeit, die den Energieverlust in Warmwasser- und Klimakreisläufen minimiert.
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
    if (isCity) {
      return (
        <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
          <p className="mb-4">
            Urban construction projects in {locationName} demand innovative solutions that comply with local building regulations. K-Aqua provides customized PP-R/PP-RCT Piping Systems in {locationName}, perfectly suited for the specific requirements of this metropolitan area. With our proven <strong className="font-medium text-foreground">PP-R Piping Systems in {locationName}</strong>, we ensure long-lasting resistance against corrosion and deposits. At the same time, local installations benefit from outstanding thermal insulation, significantly reducing the operating costs of heating and cooling systems.
          </p>
          <p className="mb-4">
            In urban environments, maintaining drinking water purity is a top priority. K-Aqua polypropylene pipes feature an extremely smooth surface that strongly inhibits bacterial growth, thereby protecting end-user health. For complex buildings in {locationName} – from skyscrapers and hospitals to industrial plants – our polyfusion welding technology offers leak-proof and maintenance-free connections.
          </p>
          <p className="mb-4">
            Furthermore, we support eco-friendly construction in the city. Our fully recyclable materials and an extended operational life of over 50 years help developers in {locationName} achieve strict environmental goals and secure green building certifications (such as LEED or BREEAM). Specialized contractors and planners trust our German quality to build future-ready water networks.
          </p>
        </div>
      );
    }
    return (
      <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8">
        <p className="mb-4">
          The growing demands of modern infrastructure projects in {locationName} require uncompromising material quality and system reliability. As a leading manufacturer, K-Aqua delivers specially developed PP-R/PP-RCT Piping Systems for {locationName} tailored precisely to the climatic and regulatory challenges of this market. Our certified <strong className="font-medium text-foreground">PP-R Piping Systems for {locationName}</strong> guarantee absolute corrosion resistance, prevent scale buildup, and offer exceptional thermal insulation capabilities that minimize energy loss in hot water and HVAC circuits.
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
  if (isCity) {
    return (
      <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8" dir="rtl">
        <p className="mb-4">
          تتطلب مشاريع البناء الحضرية في {locationName} حلولاً مبتكرة تتوافق مع لوائح البناء المحلية. توفر K-Aqua أنظمة أنابيب PP-R/PP-RCT مخصصة في {locationName}، وهي مناسبة تمامًا للمتطلبات الخاصة لهذه المنطقة الحضرية. من خلال <strong className="font-medium text-foreground">أنظمة أنابيب PP-R في {locationName}</strong> الموثوقة لدينا، نضمن مقاومة طويلة الأمد ضد التآكل والرواسب. وفي الوقت نفسه، تستفيد التركيبات المحلية من عزل حراري متميز، مما يقلل بشكل كبير من تكاليف تشغيل أنظمة التدفئة والتبريد.
        </p>
        <p className="mb-4">
          في البيئات الحضرية، يعتبر الحفاظ على نقاء مياه الشرب أولوية قصوى. تتميز أنابيب البولي بروبلين من K-Aqua بسطح أملس للغاية يمنع نمو البكتيريا بقوة، مما يحمي صحة المستخدم النهائي. بالنسبة للمباني المعقدة في {locationName} - من ناطحات السحاب والمستشفيات إلى المصانع الصناعية - توفر تقنية اللحام الانصهاري لدينا وصلات مانعة للتسرب ولا تحتاج إلى صيانة.
        </p>
        <p className="mb-4">
          علاوة على ذلك، نحن ندعم البناء الصديق للبيئة في المدينة. تساعد موادنا القابلة لإعادة التدوير بالكامل وعمرها التشغيلي الممتد لأكثر من 50 عامًا المطورين في {locationName} على تحقيق أهداف بيئية صارمة وتأمين شهادات المباني الخضراء (مثل LEED أو BREEAM). يثق المقاولون والمخططون المتخصصون في جودتنا الألمانية لبناء شبكات مياه جاهزة للمستقبل.
        </p>
      </div>
    );
  }

  return (
    <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start mt-8" dir="rtl">
      <p className="mb-4">
        تتطلب المتطلبات المتزايدة لمشاريع البنية التحتية الحديثة في {locationName} جودة مواد وموثوقية نظام لا تقبل المساومة. بصفتها شركة رائدة، تقدم K-Aqua حلول أنظمة أنابيب PP-R/PP-RCT لـ{locationName} تم تطويرها خصيصًا ومصممة لتناسب التحديات المناخية والتنظيمية في هذا السوق. تضمن منتجاتنا المعتمدة <strong className="font-medium text-foreground">أنظمة أنابيب PP-R لـ{locationName}</strong> مقاومة مطلقة للتآكل، وتمنع تكون القشور، وتوفر قدرات عزل حراري استثنائية تقلل من فقدان الطاقة في دوائر الماء الساخن وتكييف الهواء.
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
