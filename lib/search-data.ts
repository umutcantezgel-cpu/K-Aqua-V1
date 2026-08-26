// lib/search-data.ts
// Zentraler, allumfassender Such- und Wissensindex für die gesamte K-Aqua Plattform

export type SearchCategory =
  | 'products'        // Rohre, Fittings, Ventile, Übergänge, Werkzeuge, Einschweißsättel, Zubehör
  | 'knowledge'       // 50 Fachartikel, Whitepaper, DIN/ISO, Schallschutz, Brandschutz, Hygiene, TCO
  | 'solutions'       // Hochhaus, Krankenhäuser, Industrie, Rechenzentren, Geothermie, Schiffbau, Sport
  | 'tools'           // CO2-Rechner, Produktfinder, BIM/CAD, GAEB Ausschreibungstexte, Druckverlust
  | 'company'         // Über uns, Geschäftsführung, Karriere, Standorte, Partnerschaft, Kontakt
  | 'certifications'; // DVGW, DIN EN ISO 15874, KTW-BWGL, SKZ, CE

export interface SearchEntry {
  id: string;
  category: SearchCategory;
  title: Record<string, string>; // { de: '...', en: '...', ar: '...' }
  description: Record<string, string>;
  origin: {
    section: Record<string, string>;
    path: Record<string, string>;
  };
  keywords: string[];
  href: string;
  anchorId?: string;
  badge: Record<string, string>;
  specs?: string[];
  articleCodes?: string[];
  contentSnippet?: Record<string, string>;
}

export const SEARCH_INDEX: SearchEntry[] = [
  // =========================================================================
  // 1. PIPES & ROHRSYSTEME
  // =========================================================================
  {
    id: 'prod_pipe_k_fiber_rct_sdr74',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-RCT SDR 7.4 (Faserverbundrohr)',
      en: 'K-Fiber Pipe PP-RCT SDR 7.4 (Fiber Composite Pipe)',
      ar: 'أنبوب K-Fiber PP-RCT SDR 7.4 (أنبوب مركب من الألياف)',
    },
    description: {
      de: 'Hochleistungs-Faserverbundrohr mit modifizierter Kristallstruktur (PP-RCT) für Warmwasser, Heizung und Kühlung. 75 % weniger Längenausdehnung, erhöhte Druckfestigkeit bei hohen Temperaturen.',
      en: 'High-performance fiber composite pipe with modified crystalline structure (PP-RCT) for hot water, heating, and cooling. 75% reduced linear expansion, superior high-temperature pressure ratings.',
      ar: 'أنبوب مركب عالي الأداء بالألياف مع بنية بلورية معدلة (PP-RCT) للمياه الساخنة والتدفئة والتبريد. تمدد حراري منخفض بنسبة 75٪.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-RCT SDR 7.4', en: 'K-Aqua > Products > Pipes > PP-RCT SDR 7.4', ar: 'K-Aqua > المنتجات > الأنابيب > PP-RCT SDR 7.4' },
    },
    keywords: ['pp-rct', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'heißwasser', 'kühlwasser', 'steigstrang', 'k-fiber', 'rohr', 'pipe', 'längenausdehnung', 'aq200f', 'aq258f'],
    href: '/produkte/pipes',
    anchorId: 'pipes-rct-74',
    badge: { de: 'PP-RCT Faser', en: 'PP-RCT Fiber', ar: 'ألياف PP-RCT' },
    specs: ['PP-RCT + Glasfaser', 'SDR 7.4 / S 3.2', 'd20 – d315 mm', '2,0 MPa bei 20 °C / 1,0 MPa bei 70 °C', 'Stangenlänge 4 m', 'DIN 8077/8078', 'DIN EN ISO 15874'],
    articleCodes: ['AQ200F20', 'AQ200F25', 'AQ200F32', 'AQ200F40', 'AQ200F50', 'AQ200F63', 'AQ200F75', 'AQ200F90', 'AQ200F110', 'AQ200F125', 'AQ200F160', 'AQ200F200', 'AQ200F250', 'AQ200F315'],
  },
  {
    id: 'prod_pipe_k_fiberclima_rct_sdr11',
    category: 'products',
    title: {
      de: 'K-Fiberclima Pipe PP-RCT SDR 11 (Klima- & Kälteleitungen)',
      en: 'K-Fiberclima Pipe PP-RCT SDR 11 (Chilled Water & HVAC)',
      ar: 'أنبوب K-Fiberclima PP-RCT SDR 11 (التكييف ومياه التبريد)',
    },
    description: {
      de: 'Optimiert für maximale Durchflussmengen bei Kühldecken, Fan-Coils, Kaltwasserleitungen und industriellen Kühlkreisläufen. 20 % höherer Durchfluss durch dünnere Rohrwandung.',
      en: 'Optimized for maximum flow rates in chilled ceilings, fan coils, chilled water piping, and industrial cooling loops. 20% higher flow capacity.',
      ar: 'مُحسَّن لتحقيق أقصى معدلات تدفق في أسقف التبريد وشبكات المياه المبردة الصناعية.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > K-Fiberclima SDR 11', en: 'K-Aqua > Products > Pipes > K-Fiberclima SDR 11', ar: 'K-Aqua > المنتجات > الأنابيب > K-Fiberclima SDR 11' },
    },
    keywords: ['clima', 'klima', 'kaltwasser', 'chilled water', 'sdr 11', 'pp-rct', 'durchfluss', 'hvac', 'kühldecke', 'aq160f'],
    href: '/produkte/pipes',
    badge: { de: 'Klima & Kühlung', en: 'HVAC & Chilled', ar: 'تكييف وتبريد' },
    specs: ['PP-RCT + Faser', 'SDR 11 / S 5', 'd20 – d500 mm', '1,6 MPa bei 20 °C / 0,8 MPa bei 70 °C', 'Stangenlänge 4 m', 'DIN EN ISO 15874'],
    articleCodes: ['AQ160F20', 'AQ160F25', 'AQ160F32', 'AQ160F40', 'AQ160F50', 'AQ160F63', 'AQ160F75', 'AQ160F90', 'AQ160F110', 'AQ160F125', 'AQ160F160', 'AQ160F200', 'AQ160F250', 'AQ160F315', 'AQ160F355', 'AQ160F400', 'AQ160F450', 'AQ160F500'],
  },
  {
    id: 'prod_pipe_k_fiber_uv_rct_sdr74',
    category: 'products',
    title: {
      de: 'K-Fiber UV Pipe PP-RCT SDR 7.4 (UV-beständiges Hochleistungsrohr)',
      en: 'K-Fiber UV Pipe PP-RCT SDR 7.4 (UV-Resistant High-Performance Pipe)',
      ar: 'أنبوب K-Fiber UV من PP-RCT SDR 7.4 (مقاوم للأشعة فوق البنفسجية)',
    },
    description: {
      de: 'Spezial-Faserverbundrohr mit UV-beständiger schwarzer Außenschicht für die dauerhafte Freiverlegung auf Dächern und an Außenfassaden. Lieferbar in PP-RCT (AQ200FUV) und PP-R (AQ200PFUV), jeweils d20 bis d160 mm.',
      en: 'Special fiber composite pipe with UV-resistant black outer layer for permanent outdoor rooftop and facade installations. Available in PP-RCT (AQ200FUV) and PP-R (AQ200PFUV), d20 to d160 mm.',
      ar: 'أنبوب مركب خاص مع طبقة حماية خارجية مقاومة للأشعة فوق البنفسجية للتركيب الخارجي الدائم على الأسطح.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > UV-Rohre PP-RCT', en: 'K-Aqua > Products > Pipes > UV Pipes PP-RCT', ar: 'K-Aqua > المنتجات > الأنابيب > أنابيب UV' },
    },
    keywords: ['uv', 'uv-beständig', 'sonnenschutz', 'außenbereich', 'dachzentrale', 'solar', 'freiverlegung', 'wetterfest', 'aq200fuv', 'aq200pfuv'],
    href: '/produkte/pipes',
    badge: { de: 'UV-Schutz PP-RCT', en: 'UV-Proof PP-RCT', ar: 'حماية UV' },
    specs: ['UV-beständige Außenschicht', 'PP-RCT + Faser', 'SDR 7.4 / S 3.2', 'd20 – d160 mm', 'Außenschicht schwarz, Innenschicht grün', 'DIN EN ISO 15874'],
    articleCodes: ['AQ200FUV20', 'AQ200FUV25', 'AQ200FUV32', 'AQ200FUV40', 'AQ200FUV50', 'AQ200FUV63', 'AQ200FUV75', 'AQ200FUV90', 'AQ200FUV110', 'AQ200FUV125', 'AQ200FUV160', 'AQ200PFUV20', 'AQ200PFUV25', 'AQ200PFUV32', 'AQ200PFUV40', 'AQ200PFUV50', 'AQ200PFUV63', 'AQ200PFUV75', 'AQ200PFUV90', 'AQ200PFUV110', 'AQ200PFUV125', 'AQ200PFUV160'],
  },
  {
    id: 'prod_pipe_k_fiber_r_sdr74',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 7.4 (Standard-Faserverbundrohr)',
      en: 'K-Fiber Pipe PP-R SDR 7.4 (Standard Fiber Composite Pipe)',
      ar: 'أنبوب K-Fiber PP-R SDR 7.4 (أنبوب مركب من الألياف)',
    },
    description: {
      de: 'Dreischichtiges Faserverbundrohr aus Polypropylen Random-Copolymer mit Glasfaserkern für Warmwasser- und Heizungsnetze.',
      en: 'Three-layer fiber composite pipe made from polypropylene random copolymer with glass fiber core for hot water and heating networks.',
      ar: 'أنبوب مركب من ثلاث طبقات من البولي بروبيلين مع قلب من الألياف الزجاجية لشبكات المياه الساخنة والتدفئة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 7.4', en: 'K-Aqua > Products > Pipes > PP-R SDR 7.4', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 7.4' },
    },
    keywords: ['pp-r', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'glasfaser', 'warmwasser', 'heizung', 'rohr', 'pipe', 'aq207pf', 'aq258pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R Faser', en: 'PP-R Fiber', ar: 'ألياف PP-R' },
    specs: ['PP-R + Glasfaser', 'SDR 7.4 / S 3.2', 'd20 – d315 mm', '2,0 MPa bei 20 °C / 1,0 MPa bei 60 °C', 'Stangenlänge 4 m', 'DIN 8077/8078'],
    articleCodes: ['AQ207PF20', 'AQ207PF25', 'AQ207PF32', 'AQ207PF40', 'AQ207PF50', 'AQ207PF63', 'AQ207PF75', 'AQ207PF90', 'AQ207PF110', 'AQ207PF125', 'AQ207PF160', 'AQ207PF200', 'AQ207PF250', 'AQ207PF315'],
  },
  {
    id: 'prod_pipe_k_fiber_r_sdr9',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 9 (Faserverbundrohr PN 16)',
      en: 'K-Fiber Pipe PP-R SDR 9 (Fiber Composite Pipe PN 16)',
      ar: 'أنبوب K-Fiber PP-R SDR 9 (أنبوب مركب PN 16)',
    },
    description: {
      de: 'Faserverbundrohr mit reduzierter Wandstärke für mittlere Druckstufen in Heizungs- und Sanitärsystemen (d32 bis d355 mm).',
      en: 'Fiber composite pipe with reduced wall thickness for medium pressure ratings in heating and plumbing (d32 to d355 mm).',
      ar: 'أنبوب مركب بسماكة جدار مخفضة لمستويات الضغط المتوسطة في التدفئة والسباكة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 9', en: 'K-Aqua > Products > Pipes > PP-R SDR 9', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 9' },
    },
    keywords: ['sdr 9', 'pn16', 'faserverbund', 'heizung', 'sanitär', 'aq169pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R SDR 9', en: 'PP-R SDR 9', ar: 'PP-R SDR 9' },
    specs: ['PP-R + Glasfaser', 'SDR 9 / S 4', 'd32 – d355 mm', '1,6 MPa bei 20 °C / 0,8 MPa bei 60 °C', 'DIN EN ISO 15874'],
    articleCodes: ['AQ169PF32', 'AQ169PF40', 'AQ169PF50', 'AQ169PF63', 'AQ169PF75', 'AQ169PF90', 'AQ169PF110', 'AQ169PF125', 'AQ169PF160', 'AQ169PF200', 'AQ169PF250', 'AQ169PF315', 'AQ169PF355'],
  },
  {
    id: 'prod_pipe_k_fiber_r_sdr11',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 11 (Klimarohr)',
      en: 'K-Fiber Pipe PP-R SDR 11 (HVAC Pipe)',
      ar: 'أنبوب K-Fiber PP-R SDR 11 (أنبوب التكييف)',
    },
    description: {
      de: 'Dünnwandiges Faserverbundrohr für Kaltwasser-, Kühl- und Zirkulationsleitungen bei geringerem Systemdruck (1,2 MPa bei 20 °C), d20 bis d500 mm.',
      en: 'Thin-walled fiber composite pipe for chilled water and cooling systems at lower pressure levels (1.2 MPa at 20 °C), d20 to d500 mm.',
      ar: 'أنبوب مركب رقيق الجدار لمياه التبريد عند مستويات ضغط منخفضة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 11', en: 'K-Aqua > Products > Pipes > PP-R SDR 11', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 11' },
    },
    keywords: ['sdr 11', 'kühlung', 'kaltwasser', 'faser', 'aq111pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R SDR 11', en: 'PP-R SDR 11', ar: 'PP-R SDR 11' },
    specs: ['PP-R + Faser', 'SDR 11 / S 5', 'd20 – d500 mm', '1,2 MPa bei 20 °C / 0,6 MPa bei 60 °C', 'DIN EN ISO 15874'],
    articleCodes: ['AQ111PF20', 'AQ111PF25', 'AQ111PF32', 'AQ111PF40', 'AQ111PF50', 'AQ111PF63', 'AQ111PF75', 'AQ111PF90', 'AQ111PF110', 'AQ111PF125', 'AQ111PF160', 'AQ111PF200', 'AQ111PF250', 'AQ111PF315', 'AQ111PF355', 'AQ111PF400', 'AQ111PF450', 'AQ111PF500'],
  },
  {
    id: 'prod_pipe_k_fiber_r_sdr17',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 17 (Großrohre d90 – d630 mm)',
      en: 'K-Fiber Pipe PP-R SDR 17 (Large Diameter Pipes d90 – d630 mm)',
      ar: 'أنبوب K-Fiber PP-R SDR 17 (أنابيب بأقطار كبيرة)',
    },
    description: {
      de: 'Großdimensionierte Faserverbundrohre für Hauptverteilleitungen, Steigstränge und Kühlturmanbindungen im Industriebau.',
      en: 'Large-scale fiber composite pipes for primary headers, risers, and cooling tower connections in industrial facilities.',
      ar: 'أنابيب مركبة بأقطار كبيرة لشبكات التوزيع الرئيسية والأنابيب الصاعدة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > Großrohre SDR 17', en: 'K-Aqua > Products > Pipes > Large Pipes SDR 17', ar: 'K-Aqua > المنتجات > الأنابيب > أنابيب كبيرة' },
    },
    keywords: ['sdr 17', 'großrohr', 'hauptverteiler', 'd90', 'd110', 'd125', 'd160', 'd200', 'd250', 'd315', 'd355', 'd400', 'd450', 'd500', 'd560', 'd630', 'stumpfschweißen', 'aq117pf'],
    href: '/produkte/pipes',
    badge: { de: 'Großrohre SDR 17', en: 'Large Pipes SDR 17', ar: 'أنابيب كبيرة' },
    specs: ['PP-R + Faser', 'SDR 17 / S 8', 'd90 – d630 mm', '0,8 MPa bei 20 °C / 0,4 MPa bei 60 °C', 'DIN EN ISO 15874'],
    articleCodes: ['AQ117PF90', 'AQ117PF110', 'AQ117PF125', 'AQ117PF160', 'AQ117PF200', 'AQ117PF250', 'AQ117PF315', 'AQ117PF355', 'AQ117PF400', 'AQ117PF450', 'AQ117PF500', 'AQ117PF560', 'AQ117PF630'],
  },
  {
    id: 'prod_pipe_k_pipe_r_sdr6',
    category: 'products',
    title: {
      de: 'K-Pipe PP-R SDR 6 Vollkunststoffrohr (PN 20)',
      en: 'K-Pipe PP-R SDR 6 Solid Wall Pipe (PN 20)',
      ar: 'أنبوب K-Pipe PP-R SDR 6 من البلاستيك الصلب (PN 20)',
    },
    description: {
      de: 'Klassisches dickwandiges Vollkunststoffrohr aus Polypropylen Random-Copolymer für extreme Druckspitzen und Kalt-/Warmwasserinstallationen.',
      en: 'Classic heavy-wall solid polypropylene random copolymer pipe for high pressure demands in cold and hot water plumbing.',
      ar: 'أنبوب كلاسيكي سميك الجدار من البولي بروبيلين لمياه الشرب الساخنة والباردة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > K-Pipe SDR 6', en: 'K-Aqua > Products > Pipes > K-Pipe SDR 6', ar: 'K-Aqua > المنتجات > الأنابيب > K-Pipe SDR 6' },
    },
    keywords: ['k-pipe', 'sdr 6', 'vollwand', 'trinkwasser', 'sanitär', 'kaltwasser', 'druckfest', 'aq200p', 'aq258p'],
    href: '/produkte/pipes',
    badge: { de: 'Vollwand SDR 6', en: 'Solid Wall SDR 6', ar: 'جدار صلب SDR 6' },
    specs: ['PP-R', 'SDR 6 / S 2.5', 'd20 – d125 mm', '2,0 MPa bei 20 °C / 1,0 MPa bei 70 °C', 'Stangenlänge 4 m', 'DIN 8077/8078'],
    articleCodes: ['AQ200P20', 'AQ200P25', 'AQ200P32', 'AQ200P40', 'AQ200P50', 'AQ200P63', 'AQ200P75', 'AQ200P90', 'AQ200P110', 'AQ200P125'],
  },
  {
    id: 'prod_pipe_k_pipe_purple_sdr11',
    category: 'products',
    title: {
      de: 'K-Pipe Purple PP-R SDR 11 (Brauchwasser & Reclaimed Water)',
      en: 'K-Pipe Purple PP-R SDR 11 (Reclaimed & Greywater)',
      ar: 'أنبوب K-Pipe Purple PP-R SDR 11 (المياه المعالجة والرمادية)',
    },
    description: {
      de: 'Violett gekennzeichnetes Spezialrohr für Grauwasser, Regenwassernutzung und Brauchwassernetze zur eindeutigen optischen Trennung vom Trinkwassernetz.',
      en: 'Purple-colored dedicated piping for greywater, rainwater harvesting, and non-potable water systems ensuring unmistakable visual differentiation.',
      ar: 'أنبوب أرجواني مخصص للمياه الرمادية ومياه الأمطار للتمييز البصري الواضح عن شبكة مياه الشرب.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > Purple Pipe Brauchwasser', en: 'K-Aqua > Products > Pipes > Purple Pipe Non-Potable', ar: 'K-Aqua > المنتجات > الأنابيب > أنبوب بنفسجي' },
    },
    keywords: ['purple pipe', 'violett', 'brauchwasser', 'grauwasser', 'regenwasser', 'reclaimed water', 'nicht-trinkwasser', 'aq111pl'],
    href: '/produkte/pipes',
    badge: { de: 'Brauchwasser', en: 'Reclaimed Water', ar: 'مياه معالجة' },
    specs: ['PP-R, Außenschicht violett, Innenschicht grün', 'SDR 11 / S 5', 'd20 – d160 mm', '1,2 MPa bei 20 °C / 0,6 MPa bei 60 °C', 'DIN EN ISO 15874'],
    articleCodes: ['AQ111PL20', 'AQ111PL25', 'AQ111PL32', 'AQ111PL40', 'AQ111PL50', 'AQ111PL63', 'AQ111PL75', 'AQ111PL90', 'AQ111PL110', 'AQ111PL125', 'AQ111PL160'],
  },

  // =========================================================================
  // 2. FITTINGS & FORMTEILE (Winkel, T-Stücke, Reduzierungen, Muffen)
  // =========================================================================
  {
    id: 'prod_fit_elbow_90',
    category: 'products',
    title: {
      de: 'PP-R Winkel 90° (Elbow 90°)',
      en: 'PP-R Elbow 90°',
      ar: 'كوع 90 درجة من PP-R',
    },
    description: {
      de: 'Strömungsgünstiger 90°-Winkel für homogene Muffenschweißung (d20 bis d125 mm); ab d160 mm als SDR-11-Ausführung für Stumpf- oder Elektroschweißung (bis d315 mm).',
      en: 'Flow-optimized 90° elbow for homogeneous socket welding (d20 to d125 mm); from d160 mm as SDR 11 version for butt or electrofusion welding (up to d315 mm).',
      ar: 'كوع 90 درجة مصبوب بالحقن ومحسّن للتدفق للحام المقابس المتجانس.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Winkel 90°', en: 'K-Aqua > Products > Fittings > Elbow 90°', ar: 'K-Aqua > المنتجات > الوصلات > كوع 90' },
    },
    keywords: ['winkel 90', 'elbow 90', 'bogen', '90 grad', 'muffe', 'fitting', 'formteil', 'aq090'],
    href: '/produkte/fittings',
    badge: { de: 'Winkel 90°', en: 'Elbow 90°', ar: 'كوع 90' },
    specs: ['PP-R, grün', 'd20 – d315 mm', 'Muffe/Spitzende-Ausführung AQ091 d20 · d25', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ09020', 'AQ09025', 'AQ09032', 'AQ09040', 'AQ09050', 'AQ09063', 'AQ09075', 'AQ09090', 'AQ090110', 'AQ090125', 'AQ090160', 'AQ090200', 'AQ090250', 'AQ090315', 'AQ09120', 'AQ09125'],
  },
  {
    id: 'prod_fit_elbow_45',
    category: 'products',
    title: {
      de: 'PP-R Winkel 45° (Elbow 45°)',
      en: 'PP-R Elbow 45°',
      ar: 'كوع 45 درجة من PP-R',
    },
    description: {
      de: 'Hydraulisch optimierter 45°-Bogen zur Richtungsänderung bei minimalem Strömungswiderstand und reduzierten Druckverlusten.',
      en: 'Hydraulically optimized 45° elbow for directional changes with minimal friction loss and turbulence.',
      ar: 'كوع 45 درجة مصمم هيدروليكياً لتغيير الاتجاه بأقل قدر من فقدان الضغط.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Winkel 45°', en: 'K-Aqua > Products > Fittings > Elbow 45°', ar: 'K-Aqua > المنتجات > الوصلات > كوع 45' },
    },
    keywords: ['winkel 45', 'elbow 45', '45 grad', 'bogen', 'fitting', 'aq045'],
    href: '/produkte/fittings',
    badge: { de: 'Winkel 45°', en: 'Elbow 45°', ar: 'كوع 45' },
    specs: ['PP-R, grün', 'd20 – d315 mm', 'Muffe/Spitzende-Ausführung AQ041 d20 · d25', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ04520', 'AQ04525', 'AQ04532', 'AQ04540', 'AQ04550', 'AQ04563', 'AQ04575', 'AQ04590', 'AQ045110', 'AQ045125', 'AQ045160', 'AQ045200', 'AQ045250', 'AQ045315', 'AQ04120', 'AQ04125'],
  },
  {
    id: 'prod_fit_tee_equal',
    category: 'products',
    title: {
      de: 'PP-R T-Stück egal (Equal Tee 90°)',
      en: 'PP-R Equal Tee 90°',
      ar: 'محمل تي متساوي 90 درجة من PP-R',
    },
    description: {
      de: 'Symmetrisches T-Stück für Abzweigungen im 90°-Winkel mit drei identischen Anschlüssen (d20 bis d315 mm).',
      en: 'Symmetrical equal tee for 90° branches with three identical connections (d20 to d315 mm).',
      ar: 'محمل تي متماثل للفروع بزاوية 90 درجة مع ثلاثة مقابس لحام متطابقة.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > T-Stücke', en: 'K-Aqua > Products > Fittings > Tees', ar: 'K-Aqua > المنتجات > الوصلات > محملات تي' },
    },
    keywords: ['t-stück', 'tee', 'abzweig', 'egal', 'equal tee', 'fitting', 'aq130'],
    href: '/produkte/fittings',
    badge: { de: 'T-Stück egal', en: 'Equal Tee', ar: 'محمل تي' },
    specs: ['PP-R, grün', 'd20 – d315 mm', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ13020', 'AQ13025', 'AQ13032', 'AQ13040', 'AQ13050', 'AQ13063', 'AQ13075', 'AQ13090', 'AQ130110', 'AQ130125', 'AQ130160', 'AQ130200', 'AQ130250', 'AQ130315'],
  },
  {
    id: 'prod_fit_reducing_tee',
    category: 'products',
    title: {
      de: 'PP-R Reduziertes T-Stück (Reducing Tee)',
      en: 'PP-R Reducing Tee',
      ar: 'محمل تي مخفض من PP-R',
    },
    description: {
      de: 'T-Stück mit verengtem Mittelabzweig zur direkten Reduzierung der Leitungsdimension ohne zusätzliche Reduzierstücke.',
      en: 'Tee with reduced branch outlet for direct line sizing reduction without extra fittings.',
      ar: 'محمل تي بفرع أوسط مخفض لتقليل أبعاد الخط مباشرة.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Reduzierte T-Stücke', en: 'K-Aqua > Products > Fittings > Reducing Tees', ar: 'K-Aqua > المنتجات > الوصلات > محملات مخفضة' },
    },
    keywords: ['reduziertes t-stück', 'reducing tee', 'abzweig reduziert', 'fitting', 'aq1302520', 'aq130'],
    href: '/produkte/fittings',
    badge: { de: 'T-Stück reduziert', en: 'Reducing Tee', ar: 'محمل تي مخفض' },
    specs: ['PP-R, grün', 'd25×20 bis d315×250 mm', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ1302520', 'AQ1303220', 'AQ1303225', 'AQ1304020', 'AQ1304025', 'AQ1304032', 'AQ1305020', 'AQ1305025', 'AQ1305032', 'AQ1305040', 'AQ1306320', 'AQ1306325', 'AQ1306332', 'AQ1306340', 'AQ1306350', 'AQ1307520', 'AQ1307525', 'AQ1307532', 'AQ1307540', 'AQ1307550', 'AQ1307563', 'AQ1309063', 'AQ1309075', 'AQ13011063', 'AQ13011075', 'AQ13011090', 'AQ130125110', 'AQ13016090', 'AQ130160110', 'AQ13020090', 'AQ130200110', 'AQ130200160', 'AQ130250110', 'AQ130250160', 'AQ130315110', 'AQ130315160', 'AQ130315250'],
  },
  {
    id: 'prod_fit_socket_coupler',
    category: 'products',
    title: {
      de: 'PP-R Verbindungsmuffe (Socket / Coupler)',
      en: 'PP-R Socket Coupler',
      ar: 'جلبة توصيل PP-R (مقبس)',
    },
    description: {
      de: 'Schweißmuffe zur geraden Verbindung zweier Rohrabschnitte gleicher Nennweite (AQ270, d20 bis d125 mm). Als Elektroschweißmuffe AQ271 ohne Schweißgerät-Heizspiegel bis d315 mm lieferbar.',
      en: 'Fusion socket for straight in-line coupling of two identical pipe ends (AQ270, d20 to d125 mm). Also available as electrofusion coupler AQ271 up to d315 mm.',
      ar: 'جلبة لحام دقيقة للتوصيل المستقيم بين طرفي أنبوبين متطابقين.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Verbindungsmuffen', en: 'K-Aqua > Products > Fittings > Sockets', ar: 'K-Aqua > المنتجات > الوصلات > جلب التوصيل' },
    },
    keywords: ['muffe', 'socket', 'coupler', 'verbindungsmuffe', 'elektroschweißmuffe', 'electrofusion', 'fitting', 'aq270', 'aq271'],
    href: '/produkte/fittings',
    badge: { de: 'Muffe', en: 'Socket', ar: 'جلبة' },
    specs: ['PP-R, grün', 'Schweißmuffe AQ270 d20 – d125 mm', 'Elektroschweißmuffe AQ271 d20 – d315 mm', 'DIN EN ISO 15874-3', 'DIN 16962', 'DVS 2207-11 (AQ271)'],
    articleCodes: ['AQ27020', 'AQ27025', 'AQ27032', 'AQ27040', 'AQ27050', 'AQ27063', 'AQ27075', 'AQ27090', 'AQ270110', 'AQ270125', 'AQ27120', 'AQ27125', 'AQ27132', 'AQ27140', 'AQ27150', 'AQ27163', 'AQ27175', 'AQ27190', 'AQ271110', 'AQ271125', 'AQ271160', 'AQ271200', 'AQ271250', 'AQ271315'],
  },
  {
    id: 'prod_fit_reducing_bush',
    category: 'products',
    title: {
      de: 'PP-R Reduzierung (Reducing Bush)',
      en: 'PP-R Reducing Bush',
      ar: 'مخفض PP-R (بوش مخفض)',
    },
    description: {
      de: 'Konzentrische Schweißreduzierung zum nahtlosen Übergang auf einen kleineren Rohrdurchmesser (d25×20 bis d315×250 mm).',
      en: 'Concentric fusion reducer for smooth dimension transition to smaller pipe diameters (d25×20 to d315×250 mm).',
      ar: 'مخفض لحام متمركز للانتقال السلس إلى قطر أنبوب أصغر.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Reduzierungen', en: 'K-Aqua > Products > Fittings > Reducers', ar: 'K-Aqua > المنتجات > الوصلات > مخفضات' },
    },
    keywords: ['reduzierung', 'reducing bush', 'reduzierstück', 'dimensionierung', 'fitting', 'aq243'],
    href: '/produkte/fittings',
    badge: { de: 'Reduzierung', en: 'Reducer', ar: 'مخفض' },
    specs: ['PP-R, grün', 'd25×20 bis d315×250 mm', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ2432520', 'AQ2433220', 'AQ2433225', 'AQ2434020', 'AQ2434025', 'AQ2434032', 'AQ2435020', 'AQ2435025', 'AQ2435032', 'AQ2435040', 'AQ2436320', 'AQ2436325', 'AQ2436332', 'AQ2436340', 'AQ2436350', 'AQ2437550', 'AQ2437563', 'AQ2439063', 'AQ2439075', 'AQ24311063', 'AQ24311075', 'AQ24311090', 'AQ243125110', 'AQ24316090', 'AQ243160110', 'AQ243160125', 'AQ243200160', 'AQ243250160', 'AQ243250200', 'AQ243315250'],
  },
  {
    id: 'prod_fit_cap_end',
    category: 'products',
    title: {
      de: 'PP-R Endkappe (End Cap)',
      en: 'PP-R End Cap',
      ar: 'غطاء طرفي PP-R (طبة)',
    },
    description: {
      de: 'Robuste Endkappe zum dauerhaften oder temporären druckfesten Verschließen von Rohrleitungsenden bei Bauabschnitten und Druckprüfungen.',
      en: 'Heavy-duty end cap for permanent or temporary pressure-tight termination of pipe runs.',
      ar: 'غطاء طرفي قوي لإغلاق أطراف الأنابيب بشكل دائم أو مؤقت ومقاوم للضغط.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Endkappen', en: 'K-Aqua > Products > Fittings > Caps', ar: 'K-Aqua > المنتجات > الوصلات > أغطية طرفية' },
    },
    keywords: ['endkappe', 'cap', 'verschlusskappe', 'stopfen', 'abschluss', 'aq301'],
    href: '/produkte/fittings',
    badge: { de: 'Endkappe', en: 'End Cap', ar: 'غطاء طرفي' },
    specs: ['PP-R, grün', 'd20 – d315 mm', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ30120', 'AQ30125', 'AQ30132', 'AQ30140', 'AQ30150', 'AQ30163', 'AQ30175', 'AQ30190', 'AQ301110', 'AQ301125', 'AQ301160', 'AQ301200', 'AQ301250', 'AQ301315'],
  },
  {
    id: 'prod_fit_cross_over',
    category: 'products',
    title: {
      de: 'PP-R Kreuzungsbogen & Überbrückungsrohr (Cross Over)',
      en: 'PP-R Cross Over & Bypass Bridge',
      ar: 'قوس تقاطع وأنبوب عبور PP-R',
    },
    description: {
      de: 'Vorgefertigter Bogen zum eleganten Überkreuzen bestehender Rohrleitungen ohne Achsenversatz in der Vorwand- und Fußbodeninstallation.',
      en: 'Prefabricated crossover bridge for clean pipe-crossing installations without axis misalignment.',
      ar: 'قوس تقاطع جاهز لعبور خطوط الأنابيب دون اختلال في المحاذاة.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Kreuzungsbögen', en: 'K-Aqua > Products > Fittings > Cross Overs', ar: 'K-Aqua > المنتجات > الوصلات > أقواس تقاطع' },
    },
    keywords: ['kreuzungsbogen', 'cross over', 'sprungbogen', 'überbrückung', 'überführung', 'bypass', 'aq287', 'aq285'],
    href: '/produkte/fittings',
    badge: { de: 'Kreuzungsbogen', en: 'Cross Over', ar: 'قوس تقاطع' },
    specs: ['PP-R, grün', 'd20 · d25 · d32 mm', 'Sprungbogen mit Muffen (AQ287) und Sprungbogenrohr (AQ285)', 'DIN EN ISO 15874-3', 'DIN 16962'],
    articleCodes: ['AQ28720', 'AQ28725', 'AQ28732', 'AQ28520', 'AQ28525', 'AQ28532'],
  },

  // =========================================================================
  // 3. TRANSITION FITTINGS (DZR-Messing Übergänge)
  // =========================================================================
  {
    id: 'prod_trans_socket_female',
    category: 'products',
    title: {
      de: 'Übergangsmuffe mit Innengewinde (Messing Rp)',
      en: 'Adaptor Socket with Female Thread (Brass Rp)',
      ar: 'مقبس انتقال مع سن داخلي (نحاس Rp)',
    },
    description: {
      de: 'PP-R Schweißmuffe mit eingegossenem Messing-Innengewinde (Rp) für Armaturenanschlüsse und metallische Rohrnetze, d20×½" bis d110×4".',
      en: 'PP-R fusion socket with embedded brass female thread (Rp) for fixtures and metallic interfaces, d20×½" to d110×4".',
      ar: 'مقبس لحام PP-R مع سن داخلي نحاسي (Rp) لتركيب التجهيزات وشبكات الأنابيب المعدنية.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Muffe IG', en: 'K-Aqua > Products > Transitions > Female Socket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > مقبس سن داخلي' },
    },
    keywords: ['übergangsmuffe', 'innengewinde', 'rp', 'female thread', 'messing', 'adaptor socket', 'aq270g'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Übergang IG', en: 'Female Thread', ar: 'سن داخلي' },
    specs: ['PP-R mit Messing-Gewindeeinsatz', 'd20×½" bis d110×4"', 'DIN EN ISO 15874-3', 'DIN 16962', 'ISO 7 / EN 10226'],
    articleCodes: ['AQ270G2012', 'AQ270G2034', 'AQ270G2512', 'AQ270G2534', 'AQ270G3234', 'AQ270G321', 'AQ270G40114', 'AQ270G50112', 'AQ270G632', 'AQ270G75212', 'AQ270G903', 'AQ270G1104'],
  },
  {
    id: 'prod_trans_socket_male',
    category: 'products',
    title: {
      de: 'Übergangsmuffe mit Außengewinde (Messing R)',
      en: 'Adaptor Socket with Male Thread (Brass R)',
      ar: 'مقبس انتقال مع سن خارجي (نحاس R)',
    },
    description: {
      de: 'PP-R Schweißmuffe mit eingegossenem Messing-Außengewinde (R) für Pumpen, Ventile und Verteilerblöcke, d20×½" bis d110×4".',
      en: 'PP-R fusion socket with embedded brass male thread (R) for pumps, valves, and manifold ports, d20×½" to d110×4".',
      ar: 'مقبس لحام PP-R مع سن خارجي نحاسي (R) للمضخات والصمامات والمشعبات.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Muffe AG', en: 'K-Aqua > Products > Transitions > Male Socket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > مقبس سن خارجي' },
    },
    keywords: ['übergangsmuffe', 'außengewinde', 'male thread', 'r gewinde', 'messing', 'adaptor socket', 'aq243g'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Übergang AG', en: 'Male Thread', ar: 'سن خارجي' },
    specs: ['PP-R mit Messing-Gewindeeinsatz', 'd20×½" bis d110×4"', 'DIN EN ISO 15874-3', 'DIN 16962', 'ISO 7 / EN 10226'],
    articleCodes: ['AQ243G2012', 'AQ243G2034', 'AQ243G2512', 'AQ243G2534', 'AQ243G3234', 'AQ243G321', 'AQ243G40114', 'AQ243G50112', 'AQ243G632', 'AQ243G75212', 'AQ243G903', 'AQ243G1104'],
  },
  {
    id: 'prod_trans_elbow_wall_bracket',
    category: 'products',
    title: {
      de: 'Deckenwinkel & Wandanschlusswinkel 90° (Wall Bracket IG)',
      en: 'Elbow Wall Bracket 90° Female Thread',
      ar: 'قوس جداري 90 درجة مع سن داخلي',
    },
    description: {
      de: 'Montage-Wandwinkel mit Befestigungslasche (AQ090G) bzw. beidseitiger Wandlasche (AQ472G) und Messing-Innengewinde für Sanitärarmaturen und Waschtischanschlüsse.',
      en: 'Mounting wall elbow with single mounting bracket (AQ090G) or double-sided wall bracket (AQ472G) and brass female thread for sanitary fixtures.',
      ar: 'كوع تثبيت جداري مع أذن تثبيت وسن داخلي نحاسي لتركيب التجهيزات الصحية.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Deckenwinkel', en: 'K-Aqua > Products > Transitions > Wall Bracket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > قوس جداري' },
    },
    keywords: ['deckenwinkel', 'wandwinkel', 'wall bracket', 'armaturanschluss', 'waschtisch', 'aq090g', 'aq472g'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Deckenwinkel', en: 'Wall Bracket', ar: 'قوس جداري' },
    specs: ['PP-R mit Messing-Gewindeeinsatz', 'Befestigungslaschen', 'd20×½" bis d32×1"', 'DIN EN ISO 15874-3', 'ISO 7 / EN 10226'],
    articleCodes: ['AQ090G2012', 'AQ090G2512', 'AQ090G2534', 'AQ090G3212', 'AQ090G321', 'AQ472G2012', 'AQ472G2512', 'AQ472G2534', 'AQ472G3234', 'AQ472G321'],
  },
  {
    id: 'prod_trans_metal_union',
    category: 'products',
    title: {
      de: 'PP-R / Messing-Verschraubung lösbar (Metal Union IG/AG)',
      en: 'PP-R / Brass Disconnectable Union (Female/Male)',
      ar: 'وصلة فك وتركيب من PP-R والنحاس (يونيون)',
    },
    description: {
      de: 'Lösbare Verschraubung mit Überwurfmutter zur einfachen Demontage von Pumpen, Filtern und Zählern: PP-R Verschraubung (AQ330A), Metallverschraubung IG/AG (AQ542 / AQ547) und Messing CW617N IG/AG (AQ532 / AQ537), d20 bis d63 mm.',
      en: 'Demountable union with union nut for easy maintenance of pumps, meters, and filters: PP-R union (AQ330A), metal union female/male (AQ542 / AQ547), brass CW617N female/male (AQ532 / AQ537), d20 to d63 mm.',
      ar: 'وصلة يونيون قابلة للفك مع صامولة لسهولة صيانة المضخات والعدادات، من مقاس 20 إلى 63 مم.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Verschraubungen', en: 'K-Aqua > Products > Transitions > Unions', ar: 'K-Aqua > المنتجات > وصلات الانتقال > وصلات يونيون' },
    },
    keywords: ['verschraubung', 'union', 'lösbare verbindung', 'überwurfmutter', 'pumpe', 'zähler', 'cw617n', 'aq330a', 'aq542', 'aq547', 'aq532', 'aq537', 'aq490f'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Verschraubung', en: 'Metal Union', ar: 'يونيون' },
    specs: ['d20×½" bis d63×2"', 'PP-R Überwurfmutter', 'Messing CW617N (AQ532 / AQ537)', 'Flachdichtung AQ490F d20 – d32', 'DIN EN ISO 15874-3', 'EN ISO 228'],
    articleCodes: ['AQ330A20', 'AQ330A25', 'AQ330A32', 'AQ330A40', 'AQ330A50', 'AQ330A63', 'AQ54220', 'AQ54225', 'AQ54232', 'AQ54240', 'AQ54250', 'AQ54263', 'AQ54720', 'AQ54725', 'AQ54732', 'AQ54740', 'AQ54750', 'AQ54763', 'AQ53220', 'AQ53225', 'AQ53232', 'AQ53240', 'AQ53250', 'AQ53263', 'AQ53720', 'AQ53725', 'AQ53732', 'AQ53740', 'AQ53750', 'AQ53763', 'AQ490F20', 'AQ490F25', 'AQ490F32'],
  },

  // =========================================================================
  // 4. VALVES & ARMATUREN (Kugelhähne, Unterputzventile, Schrägsitzventile)
  // =========================================================================
  {
    id: 'prod_valve_ball_brass',
    category: 'products',
    title: {
      de: 'PP-R Kugelhahn mit verchromter Messingkugel',
      en: 'PP-R Ball Valve (Chromium Plated Brass Ball)',
      ar: 'صمام كروي PP-R مع كرة نحاسية مطلية بالكروم',
    },
    description: {
      de: 'Robuster PP-R Kugelhahn mit voller Durchgangsbohrung, PTFE-Dichtsitzen und verchromter Messingkugel für Trinkwasser und Industrie (d20–d90 mm).',
      en: 'Heavy-duty full-bore PP-R ball valve with PTFE seats and chromium-plated brass ball for potable water and industry (d20–d90 mm).',
      ar: 'صمام كروي PP-R قوي مع فتحة تدفق كاملة ومقاعد PTFE وكرة نحاسية مطلية بالكروم.',
    },
    origin: {
      section: { de: 'Armaturen & Ventile', en: 'Valves & Flow Control', ar: 'الصمامات والتحكم بالتدفق' },
      path: { de: 'K-Aqua > Produkte > Ventile > Kugelhahn Messing', en: 'K-Aqua > Products > Valves > Brass Ball Valve', ar: 'K-Aqua > المنتجات > الصمامات > صمام كروي نحاس' },
    },
    keywords: ['kugelhahn', 'ball valve', 'absperrhahn', 'ventil', 'messingkugel', 'voller durchgang', 'aq850'],
    href: '/produkte/valves',
    badge: { de: 'Kugelhahn Messing', en: 'Brass Ball Valve', ar: 'صمام كروي نحاس' },
    specs: ['Voller Durchgang', 'd20 – d90 mm', 'Kugel Messing, verchromt', 'PTFE Dichtungen', 'Muffenschweiß-Anschlüsse'],
    articleCodes: ['AQ85020', 'AQ85025', 'AQ85032', 'AQ85040', 'AQ85050', 'AQ85063', 'AQ85075', 'AQ85090'],
  },
  {
    id: 'prod_valve_ball_pp',
    category: 'products',
    title: {
      de: 'PP-R Vollkunststoff-Kugelhahn (Ball in PP)',
      en: 'PP-R All-Plastic Ball Valve (PP Ball)',
      ar: 'صمام كروي بلاستيكي بالكامل من PP-R (كرة PP)',
    },
    description: {
      de: 'Metallfreier Vollkunststoff-Kugelhahn für hochkorrosive Medien, aggressive Säuren, Laugen und Reinstwasseranwendungen (d20–d63 mm).',
      en: 'Metal-free all-plastic ball valve for corrosive chemicals, aggressive acids, alkalis, and high-purity water circuits.',
      ar: 'صمام كروي بلاستيكي بالكامل وخالٍ من المعادن للسوائل المسببة للتآكل والأحماض والقلويات.',
    },
    origin: {
      section: { de: 'Armaturen & Ventile', en: 'Valves & Flow Control', ar: 'الصمامات والتحكم بالتدفق' },
      path: { de: 'K-Aqua > Produkte > Ventile > Vollkunststoff-Kugelhahn', en: 'K-Aqua > Products > Valves > PP Ball Valve', ar: 'K-Aqua > المنتجات > الصمامات > صمام بلاستيكي بالكامل' },
    },
    keywords: ['vollkunststoff', 'metallfrei', 'kugelhahn pp', 'chemikalien', 'säure', 'reinstwasser', 'aq852'],
    href: '/produkte/valves',
    badge: { de: 'Metallfrei PP', en: 'All-Plastic Valve', ar: 'بلاستيك بالكامل' },
    specs: ['Kugel aus PP', 'Voller Durchgang', 'd20 – d63 mm', 'Muffenschweiß-Anschlüsse'],
    articleCodes: ['AQ85220', 'AQ85225', 'AQ85232', 'AQ85240', 'AQ85250', 'AQ85263'],
  },
  {
    id: 'prod_valve_concealed_chrome',
    category: 'products',
    title: {
      de: 'PP-R Unterputzventil mit Chrom-Bediengriff (Concealed Valve)',
      en: 'PP-R Concealed Valve with Chrome Handle',
      ar: 'صمام مخفي PP-R بمقبض كروم',
    },
    description: {
      de: 'Unterputz-Absperrventil-Oberteil in Chrom (Sichtteil AQ5992, schweres Unterteil AQ5993), Geradsitzventil-Oberteil mit grünem Handrad AQ5991, Verlängerungsstück AQ599E (L 30 mm) sowie das zugehörige T-Stück 90° mit Innengewinde AQ599A für Unterputzventile.',
      en: 'Concealed valve upper part in chrome (light part AQ5992, heavy part AQ5993), straight seat valve upper part with green handle AQ5991, elongation piece AQ599E (L 30 mm), and the matching tee 90° with female thread AQ599A for internal valves.',
      ar: 'الجزء العلوي لصمام الإغلاق المخفي بطلاء كروم مع قطع الإطالة والتيه المخصص للصمامات الداخلية.',
    },
    origin: {
      section: { de: 'Armaturen & Ventile', en: 'Valves & Flow Control', ar: 'الصمامات والتحكم بالتدفق' },
      path: { de: 'K-Aqua > Produkte > Ventile > Unterputzventile', en: 'K-Aqua > Products > Valves > Concealed Valves', ar: 'K-Aqua > المنتجات > الصمامات > صمام مخفي' },
    },
    keywords: ['unterputzventil', 'concealed valve', 'badarmatur', 'geradsitzventil', 'verlängerungsstück', 'hotel', 'aq5991', 'aq5992', 'aq5993', 'aq599e', 'aq599a'],
    href: '/produkte/valves',
    badge: { de: 'Unterputzventil', en: 'Concealed Valve', ar: 'صمام مخفي' },
    specs: ['Gewinde G ¾"', 'Chrom-Ausführung (leicht / schwer)', 'Lieferumfang: nur Oberteil', 'Verlängerungsstück AQ599E, L 30 mm', 'T-Stück AQ599A d20 – d32'],
    articleCodes: ['AQ5991', 'AQ5992', 'AQ5993', 'AQ599E', 'AQ599A2034', 'AQ599A2534', 'AQ599A3234', 'AQ599A321'],
  },

  // =========================================================================
  // 5. WELD-IN SADDLES & SATTELTECHNIK
  // =========================================================================
  {
    id: 'prod_saddle_standard',
    category: 'products',
    title: {
      de: 'Einschweißsattel Standard (Weld-in Saddle)',
      en: 'Weld-in Saddle Standard',
      ar: 'سرج لحام قياسي من PP-R',
    },
    description: {
      de: 'Effizienter Einschweißsattel zur schnellen Nachrüstung von Abgängen und zum rationellen Bau von Heizungs-/Kälteverteilern ohne Trennen des Hauptrohres.',
      en: 'Efficient weld-in saddle for rapid post-installation branching and custom manifold construction without cutting the main pipe.',
      ar: 'سرج لحام فعال للتفريعات السريعة وبناء المشعبات دون قطع الأنبوب الرئيسي.',
    },
    origin: {
      section: { de: 'Einschweißsättel', en: 'Weld-in Saddles', ar: 'سروج اللحام' },
      path: { de: 'K-Aqua > Produkte > Einschweißsättel > Standard', en: 'K-Aqua > Products > Saddles > Standard', ar: 'K-Aqua > المنتجات > سروج اللحام > قياسي' },
    },
    keywords: ['einschweißsattel', 'weld-in saddle', 'verteilerbau', 'abzweig nachrüsten', 'manifold', 'aq130s'],
    href: '/produkte/weld-in-saddles',
    badge: { de: 'Satteltechnik', en: 'Weld-in Saddle', ar: 'سرج لحام' },
    specs: ['Hauptrohr d40 – d63, d75 – d125, d160 – d250 mm', 'Abzweig d20 – d63 mm', 'PP-R, ohne Gewinde', 'Schweißwerkzeug AQ985…', 'Bohrwerkzeug AQ98625 – AQ98663'],
    articleCodes: ['AQ130S406320', 'AQ130S406325', 'AQ130S406332', 'AQ130S7512525', 'AQ130S7512532', 'AQ130S7512540', 'AQ130S16025025', 'AQ130S16025032', 'AQ130S16025040', 'AQ130S16025050', 'AQ130S16025063', 'AQ98504006325', 'AQ98507512525', 'AQ98507512532', 'AQ98507512540', 'AQ98516025025', 'AQ98516025032', 'AQ98516025040', 'AQ98516025050', 'AQ98516025063', 'AQ98625', 'AQ98632', 'AQ98640', 'AQ98650', 'AQ98663'],
  },
  {
    id: 'prod_saddle_female_thread',
    category: 'products',
    title: {
      de: 'Einschweißsattel mit Messinggewinde – Innengewinde (AQ270S) und Außengewinde (AQ243S)',
      en: 'Weld-in Saddle with Brass Thread – Female (AQ270S) and Male (AQ243S)',
      ar: 'سرج لحام مع سن نحاسي – داخلي (AQ270S) وخارجي (AQ243S)',
    },
    description: {
      de: 'Einschweißsattel mit integriertem Messinggewinde zum direkten Einschrauben von Sensoren, Manometern, Entlüftern oder metallischen Absperrventilen. Hauptrohr d40 – d63 und d75 – d125 mm, Gewinde ½" und ¾".',
      en: 'Weld-in saddle with integrated brass thread for direct mounting of sensors, gauges, air vents, and metal valves. Main pipe d40 – d63 and d75 – d125 mm, thread ½" and ¾".',
      ar: 'سرج لحام مع سن نحاسي مدمج للتركيب المباشر لأجهزة الاستشعار ومقاييس الضغط والصمامات.',
    },
    origin: {
      section: { de: 'Einschweißsättel', en: 'Weld-in Saddles', ar: 'سروج اللحام' },
      path: { de: 'K-Aqua > Produkte > Einschweißsättel > Innengewinde', en: 'K-Aqua > Products > Saddles > Female Thread', ar: 'K-Aqua > المنتجات > سروج اللحام > سن داخلي' },
    },
    keywords: ['sattel innengewinde', 'sattel außengewinde', 'sensorabgang', 'manometer', 'entlüfter', 'messing', 'aq270s', 'aq243s'],
    href: '/produkte/weld-in-saddles',
    badge: { de: 'Sattel Gewinde IG/AG', en: 'Threaded Saddle', ar: 'سرج بسن' },
    specs: ['PP-R mit Messingeinsatz', 'Hauptrohr d40 – d125 mm', 'Gewinde ½" und ¾"'],
    articleCodes: ['AQ270S406312', 'AQ270S406334', 'AQ270S7512512', 'AQ270S7512534', 'AQ243S406312', 'AQ243S406334', 'AQ243S7512512', 'AQ243S7512534'],
  },

  // =========================================================================
  // 6. TOOLS & SCHWEISSTECHNIK
  // =========================================================================
  {
    id: 'prod_tool_hand_welder_63',
    category: 'products',
    title: {
      de: 'Heizelement-Muffenschweißgerät 20–63 mm Komplettset',
      en: 'Socket Fusion Welding Machine 20–63 mm Complete Kit',
      ar: 'ماكينة لحام المقابس 20-63 مم مجموعة كاملة',
    },
    description: {
      de: 'Handschweißgerät (Polywelder) mit Thermoelement und elektronischem Thermostat, automatische Temperaturregelung. Komplettset im Metallkoffer: AQ98063 mit Schweißdornen d20–d63, AQ98032 mit Schweißdornen d20–d32.',
      en: 'Hand welding machine (polywelder) with thermoelement and electronic thermostat, automatic temperature control. Complete kit in a metal box: AQ98063 with dies d20–d63, AQ98032 with dies d20–d32.',
      ar: 'ماكينة لحام يدوية مع ثرموستات إلكتروني وتحكم تلقائي في درجة الحرارة، تُسلَّم كمجموعة كاملة في صندوق معدني.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Schweißgerät 20–63', en: 'K-Aqua > Products > Tools > Welding Kit 20–63', ar: 'K-Aqua > المنتجات > الأدوات > ماكينة لحام 20-63' },
    },
    keywords: ['schweißgerät', 'muffenschweißgerät', 'welding kit', 'handschweißgerät', 'polywelder', 'thermostat', 'aq98063', 'aq98032'],
    href: '/produkte/tools',
    badge: { de: 'Schweißset 20–63', en: 'Welding Kit 20–63', ar: 'ماكينة لحام' },
    specs: ['Versorgungsspannung 230 V', 'Elektronischer Thermostat, automatische Temperaturregelung', 'Lieferung im Metallkoffer', 'Schweißdornen d20 – d63 (AQ98063) bzw. d20 – d32 (AQ98032)'],
    articleCodes: ['AQ98063', 'AQ98032'],
  },
  {
    id: 'prod_tool_welder_125',
    category: 'products',
    title: {
      de: 'Schweißmaschinen: Muffenschweißen 50–125, Stumpfschweißen 90–250, Elektroschweißgerät',
      en: 'Welding Machines: Socket Fusion 50–125, Butt Fusion 90–250, Electrofusion Unit',
      ar: 'ماكينات اللحام: لحام المقابس 50-125، اللحام التناكبي 90-250، وحدة اللحام الكهربائي',
    },
    description: {
      de: 'Muffenschweißmaschine AQ988125 für die Baustelle mit selbstzentrierendem Spannsystem (Prismenspanner auf Führungsschlitten) für Rohre und Fittings d50 bis d125 mm; als reiner Heizspiegel ohne Ständer AQ991125. Für große Dimensionen die Stumpfschweißmaschine AQ989250 (90–250 mm), für Elektroschweißmuffen das Elektroschweißgerät AQ990.',
      en: 'Socket fusion machine AQ988125 for on-site use with self-centering clamp system (prismatic clamps on movement slides) for pipes and fittings d50 to d125 mm; heating mirror only as AQ991125. For large diameters the butt welding machine AQ989250 (90–250 mm), and for electrofusion couplers the electrofusion unit AQ990.',
      ar: 'ماكينة لحام المقابس AQ988125 للاستخدام في الموقع، وماكينة اللحام التناكبي AQ989250 للأقطار الكبيرة، ووحدة اللحام الكهربائي AQ990.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Schweißmaschine 50–125', en: 'K-Aqua > Products > Tools > Fusion Machine 50–125', ar: 'K-Aqua > المنتجات > الأدوات > ماكينة لحام 50-125' },
    },
    keywords: ['schweißmaschine', 'muffenschweißmaschine', 'stumpfschweißmaschine', 'elektroschweißgerät', 'heizspiegel', 'großdurchmesser', 'd125', 'd110', 'd90', 'd75', 'aq988125', 'aq991125', 'aq989250', 'aq990', 'aq982'],
    href: '/produkte/tools',
    badge: { de: 'Schweißmaschinen', en: 'Welding Machines', ar: 'ماكينات اللحام' },
    specs: ['AQ988125: Muffenschweißen 50 – 125 mm, selbstzentrierendes Spannsystem', 'AQ991125: nur Heizspiegel 50 – 125 mm', 'AQ989250: Stumpfschweißen 90 – 250 mm', 'AQ990: Elektroschweißgerät für Elektroschweißmuffen', 'Schweißdornen AQ982 d20 – d125 separat'],
    articleCodes: ['AQ988125', 'AQ991125', 'AQ989250', 'AQ990', 'AQ98220', 'AQ98225', 'AQ98232', 'AQ98240', 'AQ98250', 'AQ98263', 'AQ98275', 'AQ98290', 'AQ982110', 'AQ982125'],
  },
  {
    id: 'prod_tool_repair_plug',
    category: 'products',
    title: {
      de: 'Reparaturstopfen & Reparaturschweißdorn (Repairing Plug)',
      en: 'Repairing Plug & Emergency Hole Repair Tool',
      ar: 'سدادة إصلاح الطوارئ وأداة تسخين الثقوب',
    },
    description: {
      de: 'PP-R Reparaturstopfen (AQ5937 für d7, AQ59311 für d11) zum Verschließen angebohrter oder beschädigter Stellen in der Rohrwand; wird mit dem passenden Schweißwerkzeug (AQ9837 bzw. AQ98311) eingeschweißt.',
      en: 'PP-R repairing plug (AQ5937 for d7, AQ59311 for d11) to close a drilled or damaged spot in the pipe wall; fused in place with the matching welding tool (AQ9837 or AQ98311).',
      ar: 'سدادة إصلاح من PP-R لإغلاق الثقوب أو المواضع التالفة في جدار الأنبوب، تُلحَم بأداة اللحام المخصصة.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Reparaturstopfen', en: 'K-Aqua > Products > Tools > Repair Plug', ar: 'K-Aqua > المنتجات > الأدوات > سدادة إصلاح' },
    },
    keywords: ['reparaturstopfen', 'repair plug', 'anbohrschaden', 'notfallreparatur', 'leckage stopfen', 'aq5937', 'aq59311', 'aq9837', 'aq98311'],
    href: '/produkte/tools',
    badge: { de: 'Reparaturstopfen', en: 'Repair Plug', ar: 'سدادة إصلاح' },
    specs: ['Material PP-R', 'd 7 mm und d 11 mm', 'Schweißwerkzeug AQ9837 (d7) / AQ98311 (d11)'],
    articleCodes: ['AQ5937', 'AQ59311', 'AQ9837', 'AQ98311'],
  },
  {
    id: 'prod_tool_pipe_cutter',
    category: 'products',
    title: {
      de: 'Rohrabschneider 20–40 & 50–125 mm und Rohrschaber',
      en: 'Pipe Cutters 20–40 & 50–125 mm and Pipe Scraper',
      ar: 'قواطع أنابيب 20-40 و 50-125 مم وكاشطة الأنابيب',
    },
    description: {
      de: 'Rohrabschneider für Kunststoffrohre zum rechtwinkligen Ablängen vor dem Muffenschweißen: AQ97040 für d20–d40, AQ975125 für d50–d125. Der Rohrschaber AQ974 entfernt die äußere Schicht und reinigt das Rohrende vor dem Schweißen.',
      en: 'Pipe cutters for plastic pipes, used to cut the pipe square before socket fusion welding: AQ97040 for d20–d40, AQ975125 for d50–d125. The pipe scraper AQ974 removes the outer layer and cleans the pipe end before welding.',
      ar: 'قواطع أنابيب بلاستيكية لقطع الأنبوب بزاوية قائمة قبل اللحام، بالإضافة إلى كاشطة لتنظيف سطح الأنبوب.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Rohrschneider', en: 'K-Aqua > Products > Tools > Pipe Cutters', ar: 'K-Aqua > المنتجات > الأدوات > قواطع أنابيب' },
    },
    keywords: ['rohrschneider', 'cutter', 'rohrschere', 'rohrschaber', 'scraper', 'rechtwinklig schneiden', 'aq97040', 'aq975125', 'aq974'],
    href: '/produkte/tools',
    badge: { de: 'Rohrabschneider', en: 'Pipe Cutter', ar: 'قاطع أنابيب' },
    specs: ['AQ97040: Arbeitsbereich 20 – 40 mm', 'AQ975125: Arbeitsbereich 50 – 125 mm', 'AQ974: Rohrschaber, kein Durchmesserbereich angegeben'],
    articleCodes: ['AQ97040', 'AQ975125', 'AQ974'],
  },

  // =========================================================================
  // 7. ACCESSORIES & FLANSCHE (Flansche, Dichtungen, Schellen)
  // =========================================================================
  {
    id: 'prod_acc_flange_pp_steel',
    category: 'products',
    title: {
      de: 'Vorschweißbund & Losflansch PP-Stahl (Backing Flange SF/BF)',
      en: 'Stub End & PP-Steel Backing Flange (SF/BF)',
      ar: 'حلقة شفة وفلانشة PP مع قلب فولاذي',
    },
    description: {
      de: 'Korrosionsgeschützter Losflansch aus PP mit Stahlkern (AQ750, d40 bis d315 mm) für verschraubte Flanschverbindungen, eingesetzt zusammen mit dem Vorschweißbund AQ790 und der Flachdichtung AQ714.',
      en: 'Corrosion-proof PP backing flange with steel core (AQ750, d40 to d315 mm) for bolted flange connections, used together with the flange adaptor AQ790 and the flat gasket AQ714.',
      ar: 'فلانشة PP مقاومة للتآكل مع قلب فولاذي للوصلات المفلنجة، تُستخدم مع محول الفلانشة والحشية المسطحة.',
    },
    origin: {
      section: { de: 'Zubehör & Flansche', en: 'Accessories & Flanges', ar: 'الملحقات والشفاه' },
      path: { de: 'K-Aqua > Produkte > Zubehör > Flansche', en: 'K-Aqua > Products > Accessories > Flanges', ar: 'K-Aqua > المنتجات > الملحقات > فلانشات' },
    },
    keywords: ['losflansch', 'vorschweißbund', 'flansch', 'backing flange', 'stub end', 'flange adaptor', 'flachdichtung', 'aq750', 'aq790', 'aq714'],
    href: '/produkte/accessories',
    badge: { de: 'PP-Stahl Flansch', en: 'Backing Flange', ar: 'فلانشة PP' },
    specs: ['Stahlkern mit PP-Ummantelung', 'd40 – d315 mm', 'System SF/BF (d40 – d75), SF (d90 – d125), BF (d160 – d315)', 'Vorschweißbund AQ790 d40 – d315', 'Flachdichtung AQ714 d40 – d315'],
    articleCodes: ['AQ75040', 'AQ75050', 'AQ75063', 'AQ75075', 'AQ75090', 'AQ750110', 'AQ750125', 'AQ750160', 'AQ750200', 'AQ750250', 'AQ750315', 'AQ79040', 'AQ79050', 'AQ79063', 'AQ79075', 'AQ79090', 'AQ790110', 'AQ790125', 'AQ790160', 'AQ790200', 'AQ790250', 'AQ790315', 'AQ71440', 'AQ71450', 'AQ71463', 'AQ71475', 'AQ71490', 'AQ714110', 'AQ714125', 'AQ714160', 'AQ714200', 'AQ714250', 'AQ714315'],
  },
  {
    id: 'prod_acc_pipe_clamps',
    category: 'products',
    title: {
      de: 'Rohrschellen mit Gummieinlage (Pipe Clamps)',
      en: 'Pipe Clamps with Rubber Insert',
      ar: 'مشابك أنابيب مع بطانة مطاطية',
    },
    description: {
      de: 'Schwerlast-Rohrschellen mit Gummieinlage zur Befestigung von PP-R Rohrinstallationen, d20 bis d250 mm. Die Gummierung dämmt Fließ- und Dehnungsgeräusche und schützt die Rohroberfläche.',
      en: 'Heavy-duty pipe clamps with rubber insert for supporting PP-R pipe installations, d20 to d250 mm. The rubber lining dampens flow and expansion noise and protects the pipe surface.',
      ar: 'مشابك أنابيب قوية مع بطانة مطاطية لتثبيت تركيبات أنابيب PP-R من 20 إلى 250 مم.',
    },
    origin: {
      section: { de: 'Zubehör & Flansche', en: 'Accessories & Flanges', ar: 'الملحقات والشفاه' },
      path: { de: 'K-Aqua > Produkte > Zubehör > Rohrschellen', en: 'K-Aqua > Products > Accessories > Pipe Clamps', ar: 'K-Aqua > المنتجات > الملحقات > مشابك الأنابيب' },
    },
    keywords: ['rohrschelle', 'pipe clamp', 'schallschutz', 'gummieinlage', 'gleitpunkt', 'festpunkt', 'befestigung', 'aq500'],
    href: '/produkte/accessories',
    badge: { de: 'Rohrschellen', en: 'Pipe Clamps', ar: 'مشابك أنابيب' },
    specs: ['d20 – d250 mm', 'Gummieinlage', 'Gewicht 0,06 – 0,52 kg'],
    articleCodes: ['AQ50020', 'AQ50025', 'AQ50032', 'AQ50040', 'AQ50050', 'AQ50063', 'AQ50075', 'AQ50090', 'AQ500110', 'AQ500125', 'AQ500160', 'AQ500200', 'AQ500250'],
  },

  // =========================================================================
  // 8. DIGITALE TOOLS & BERECHNUNG (CO2, Finder, BIM, GAEB, Support)
  // =========================================================================
  {
    id: 'tool_finder_interactive',
    category: 'tools',
    title: {
      de: 'Interaktiver Produktfinder & Dimensionierungsfilter',
      en: 'Interactive Product Finder & Dimensioning Tool',
      ar: 'محدد المنتجات التفاعلي وأداة تحديد الأبعاد',
    },
    description: {
      de: 'Filtern Sie das gesamte K-Aqua Sortiment nach Rohrdurchmesser (d20–d630), SDR-Klasse, Material (PP-R / PP-RCT), Druckstufen und spezifischem Einsatzbereich.',
      en: 'Filter the entire K-Aqua catalog by pipe diameter (d20–d630), SDR class, material (PP-R / PP-RCT), pressure rating, and application.',
      ar: 'قم بتصفية كتالوج K-Aqua بالكامل حسب قطر الأنبوب، وفئة SDR، والمواد، ومستوى الضغط، ومجال التطبيق.',
    },
    origin: {
      section: { de: 'Digitale Tools', en: 'Digital Tools', ar: 'الأدوات الرقمية' },
      path: { de: 'K-Aqua > Tools > Produktfinder', en: 'K-Aqua > Tools > Product Finder', ar: 'K-Aqua > الأدوات > محدد المنتجات' },
    },
    keywords: ['produktfinder', 'finder', 'filter', 'katalog', 'dimension', 'durchmesser', 'sdr', 'pn', 'artikelsuche', 'auswahl'],
    href: '/produkte/finder',
    badge: { de: 'Digital Tool', en: 'Digital Tool', ar: 'أداة رقمية' },
    specs: ['Echtzeitfilter', 'Alle 7 Produktgruppen', 'Direkter Datenblatt-Download'],
  },
  {
    id: 'tool_co2_calculator',
    category: 'tools',
    title: {
      de: 'CO2-Rechner & Ökobilanz-Simulator (LCA / EPD)',
      en: 'CO2 Calculator & Carbon Footprint Analyzer (LCA / EPD)',
      ar: 'حاسبة انبعاثات الكربون ومحاكي الأثر البيئي (LCA / EPD)',
    },
    description: {
      de: 'Berechnen Sie die CO2-Einsparung, das reduzierte Transportgewicht und den ökologischen Fußabdruck von K-Aqua PP-R im Vergleich zu Kupfer, Stahl und Edelstahl.',
      en: 'Calculate carbon savings, transport weight reduction, and the environmental footprint of K-Aqua PP-R compared to copper, steel, and stainless steel.',
      ar: 'احسب توفير انبعاثات الكربون وتقليل وزن النقل والأثر البيئي لأنابيب K-Aqua PP-R مقارنة بالنحاس والفولاذ.',
    },
    origin: {
      section: { de: 'Digitale Tools', en: 'Digital Tools', ar: 'الأدوات الرقمية' },
      path: { de: 'K-Aqua > Tools > CO2-Rechner', en: 'K-Aqua > Tools > CO2 Calculator', ar: 'K-Aqua > الأدوات > حاسبة الكربون' },
    },
    keywords: ['co2', 'co2-rechner', 'nachhaltigkeit', 'ökobilanz', 'lca', 'epd', 'carbon footprint', 'energieeffizienz', 'leed', 'breeam', 'dämmung'],
    href: '/co2-rechner',
    badge: { de: 'CO2-Rechner', en: 'Carbon Tool', ar: 'حاسبة الكربون' },
    specs: ['Vergleich mit 4 Metallwerkstoffen', 'EPD-konforme Datenbasis', 'Direkter PDF-Report'],
  },
  {
    // Dieser Eintrag versprach bis heute Revit-RFA-Familien mit
    // MEP-Konnektoren, eine DWG-Bibliothek und GAEB-XML — nichts davon gab
    // es. Jetzt nennt er, was /ressourcen/bim tatsaechlich ausliefert, und
    // fuehrt auch dorthin statt auf eine Marketingseite ohne Datei.
    id: 'tool_bim_cad_gaeb',
    category: 'tools',
    title: {
      de: 'BIM-Daten: IFC 4, Artikeltabellen & Revit-Typenkataloge',
      en: 'BIM Data: IFC 4, Article Tables & Revit Type Catalogues',
      ar: 'بيانات BIM: ‏IFC 4 وجداول الأصناف وكتالوجات أنواع Revit',
    },
    description: {
      de: '546 Artikel als IFC 4 mit Anschlusspunkten, Werkstoffkennwerten und Verlegedaten. Dazu Artikeltabellen für die Massenermittlung und Revit-Typenkataloge. Ohne Registrierung.',
      en: '546 articles as IFC 4 with ports, material properties and installation data. Plus article tables for quantity take-off and Revit type catalogues. No registration required.',
      ar: '546 صنفًا بصيغة IFC 4 مع نقاط التوصيل وخصائص المواد وبيانات التركيب، إضافة إلى جداول الأصناف وكتالوجات أنواع Revit. بدون تسجيل.',
    },
    origin: {
      section: { de: 'Ressourcen & Planung', en: 'Resources & Planning', ar: 'الموارد والتخطيط' },
      path: { de: 'K-Aqua > Ressourcen > BIM-Daten', en: 'K-Aqua > Resources > BIM Data', ar: 'K-Aqua > الموارد > بيانات BIM' },
    },
    keywords: ['bim', 'revit', 'ifc', 'ifc4', 'cad', 'typenkatalog', 'type catalogue', 'csv', 'massenermittlung', 'ausschreibung', '3d', 'tga', 'planungsdaten'],
    href: '/ressourcen/bim',
    badge: { de: 'BIM & IFC', en: 'BIM & IFC', ar: 'BIM و IFC' },
    specs: ['IFC 4', '546 Artikel', 'CSV / JSON', 'Revit-Typenkatalog'],
  },
  {
    id: 'tool_support_friction_tables',
    category: 'tools',
    title: {
      de: 'Technischer Support, Druckverlusttabellen & Montagehandbuch',
      en: 'Technical Support, Friction Loss Tables & Installation Manual',
      ar: 'الدعم الفني وجداول فقدان الضغط ودليل التركيب',
    },
    description: {
      de: 'Druckverlust-Berechnungen, Rohrreibungsbeiwerte, Richtlinien für Schweißzeiten (DVS 2207), Dehnungsschenkel-Tabellen und Downloadcenter.',
      en: 'Pressure drop calculations, pipe friction coefficients, DVS 2207 welding timer charts, expansion loop calculators, and technical downloads.',
      ar: 'حسابات فقدان الضغط، ومعاملات احتكاك الأنابيب، وجداول أوقات اللحام DVS 2207 ودليل التركيب.',
    },
    origin: {
      section: { de: 'Ressourcen & Support', en: 'Resources & Support', ar: 'الموارد والدعم' },
      path: { de: 'K-Aqua > Ressourcen > Technischer Support', en: 'K-Aqua > Resources > Technical Support', ar: 'K-Aqua > الموارد > الدعم الفني' },
    },
    keywords: ['support', 'druckverlust', 'reibungswert', 'zeta-wert', 'montagehandbuch', 'schweißzeiten', 'ausdehnung', 'datenblatt', 'anleitung'],
    href: '/ressourcen/support',
    badge: { de: 'Technik-Center', en: 'Tech Support', ar: 'الدعم الفني' },
    specs: ['Hydraulische Tabellen', 'DVS 2207 Richtlinien', 'Zeta-Werte für Formteile'],
  },

  // =========================================================================
  // 9. BRANCHENLÖSUNGEN (Solutions)
  // =========================================================================
  {
    id: 'sol_highrise_risers',
    category: 'solutions',
    title: {
      de: 'Hochhausbau & Druckstufen-Steigleitungen (PN 20 / PN 16)',
      en: 'High-Rise Buildings & High-Pressure Riser Systems (PN 20 / PN 16)',
      ar: 'المباني الشاهقة وأنظمة القائم ذات الضغط العالي (PN 20 / PN 16)',
    },
    description: {
      de: 'Druckfeste, gewichtsreduzierte Steigstränge und Etagenverteiler für Wolkenkratzer und Großbauten mit integrierter Längenausdehnungskompensation.',
      en: 'High pressure-resistant, lightweight riser pipes and distribution networks for skyscrapers and mega-structures with expansion compensation.',
      ar: 'أنابيب صاعدة خفيفة الوزن ومقاومة للضغط العالي للمباني الشاهقة وناطحات السحاب مع تعويض التمدد.',
    },
    origin: {
      section: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' },
      path: { de: 'K-Aqua > Lösungen > Hochhausbau', en: 'K-Aqua > Solutions > High-Rise', ar: 'K-Aqua > الحلول > المباني الشاهقة' },
    },
    keywords: ['hochhaus', 'steigleitung', 'riser', 'pn20', 'druckstufe', 'skyscraper', 'etagenverteiler', 'druckstoß', 'gewichtsreduktion'],
    href: '/loesungen',
    anchorId: 'hochhaus',
    badge: { de: 'Hochhausbau', en: 'High-Rise', ar: 'مباني شاهقة' },
    specs: ['Bis 2,0 MPa (PN 20) bei 20 °C', 'SDR 6 und SDR 7.4', 'Homogene Schweißung'],
  },
  {
    id: 'sol_hospital_hygiene',
    category: 'solutions',
    title: {
      de: 'Krankenhäuser, Kliniken & Totraumfreie Trinkwasserhygiene',
      en: 'Hospitals, Healthcare Facilities & Dead-Leg-Free Potable Water',
      ar: 'المستشفيات والمنشآت الصحية ونظافة مياه الشرب',
    },
    description: {
      de: 'Totraumfreie Trinkwasserinstallationen, Biofilm-Resistenz und Legionellenprävention für sensible medizinische Einrichtungen und Pflegeheime.',
      en: 'Dead-leg-free potable water hygiene, biofilm resistance, and Legionella prevention for hospitals, clinics, and healthcare centers.',
      ar: 'نظافة مياه الشرب الخالية من الركود ومقاومة الأغشية الحيوية والوقاية من بكتيريا الفيلقية في المستشفيات.',
    },
    origin: {
      section: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' },
      path: { de: 'K-Aqua > Lösungen > Krankenhäuser & Hygiene', en: 'K-Aqua > Solutions > Hospitals & Hygiene', ar: 'K-Aqua > الحلول > المستشفيات والنظافة' },
    },
    keywords: ['krankenhaus', 'klinik', 'hygiene', 'trinkwasserhygiene', 'legionellen', 'biofilm', 'totraumfrei', 'gesundheit', 'hospital'],
    href: '/loesungen',
    anchorId: 'hygiene',
    badge: { de: 'Krankenhaus', en: 'Healthcare', ar: 'مستشفيات' },
    specs: ['KTW-BWGL / DVGW W270', 'Porenfreie Innenwandung', 'Temperaturbeständig bis 95 °C'],
  },
  {
    id: 'sol_datacenter_cooling',
    category: 'solutions',
    title: {
      de: 'Rechenzentren (Data Centers) & Kaltwasser-Kühlkreisläufe',
      en: 'Data Centers & Mission-Critical Chilled Water Infrastructure',
      ar: 'مراكز البيانات والبنية التحتية لمياه التبريد الحيوية',
    },
    description: {
      de: 'Leckagesichere, kondensationsoptimierte Kaltwasserverrohrung für unterbrechungsfreien Serverbetrieb und extreme Energieeffizienz.',
      en: '100% leak-proof, condensation-optimized chilled water piping for continuous mission-critical server room and data center cooling.',
      ar: 'أنابيب مياه مبردة مقاومة للتسرب بنسبة 100٪ لتبريد الخوادم ومراكز البيانات الحساسة.',
    },
    origin: {
      section: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' },
      path: { de: 'K-Aqua > Lösungen > Rechenzentren', en: 'K-Aqua > Solutions > Data Centers', ar: 'K-Aqua > الحلول > مراكز البيانات' },
    },
    keywords: ['rechenzentrum', 'data center', 'server', 'kühlung', 'kaltwasser', 'chilled water', 'sicherheit', 'ausfallsicher', 'kondensation'],
    href: '/loesungen',
    anchorId: 'datencenter',
    badge: { de: 'Rechenzentrum', en: 'Data Center', ar: 'مراكز بيانات' },
    specs: ['Null-Leckage-Garantie', 'SDR 11 K-Fiberclima', 'Geringer Pumpenergiebedarf'],
  },
  {
    id: 'sol_industrial_chemistry',
    category: 'solutions',
    title: {
      de: 'Industrieanlagen, Chemie & Prozesswasser-Leitungsnetze',
      en: 'Industrial Plants, Chemical Resistance & Process Water Systems',
      ar: 'المنشآت الصناعية ومقاومة الكيماويات ومياه العمليات',
    },
    description: {
      de: 'Chemisch hochbeständige PP-R Rohrleitungssysteme für Säuren, Laugen, Galvanikbäder, Druckluft und anspruchsvolle Prozessfluide.',
      en: 'Chemically highly resistant PP-R piping systems for acids, alkalis, electroplating baths, compressed air, and aggressive process fluids.',
      ar: 'أنظمة أنابيب PP-R عالية المقاومة للمواد الكيميائية والأحماض والقلويات والهواء المضغوط.',
    },
    origin: {
      section: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' },
      path: { de: 'K-Aqua > Lösungen > Industrie & Chemie', en: 'K-Aqua > Solutions > Industrial & Chemical', ar: 'K-Aqua > الحلول > الصناعة والكيمياء' },
    },
    keywords: ['industrie', 'chemie', 'säure', 'lauge', 'prozesswasser', 'galvanik', 'druckluft', 'chemische beständigkeit', 'korrosionsfrei'],
    href: '/loesungen',
    anchorId: 'industrie',
    badge: { de: 'Industrie', en: 'Industrial', ar: 'صناعة' },
    specs: ['pH-Wert 1 bis 14', 'Keine Korrosion', 'Druckluftöl-resistent'],
  },
  {
    id: 'sol_district_geothermal',
    category: 'solutions',
    title: {
      de: 'Nah- & Fernwärme, Geothermie & Wärmepumpen-Anbindung',
      en: 'District Heating, Geothermal Energy & Heat Pump Infrastructure',
      ar: 'التدفئة المركزية والطاقة الحرارية الأرضية ومضخات الحرارة',
    },
    description: {
      de: 'Dauerhaft diffusionsdichte, wärmegedämmte Rohrstränge für erneuerbare Heiznetze, Erdsonden und Wärmepumpen-Kaskaden.',
      en: 'Permanently diffusion-tight, pre-insulated piping for renewable district heating networks, geothermal probes, and heat pumps.',
      ar: 'أنابيب معزولة حرارياً لشبكات التدفئة المتجددة والمضخات الحرارية.',
    },
    origin: {
      section: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' },
      path: { de: 'K-Aqua > Lösungen > Fernwärme & Geothermie', en: 'K-Aqua > Solutions > District Heating', ar: 'K-Aqua > الحلول > التدفئة المركزية' },
    },
    keywords: ['fernwärme', 'nahwärme', 'geothermie', 'wärmepumpe', 'erdwärme', 'heiznetz', 'dämmung', 'vorisoliert'],
    href: '/loesungen',
    anchorId: 'fernwaerme',
    badge: { de: 'Fernwärme', en: 'District Energy', ar: 'طاقة حرارية' },
    specs: ['Betriebstemperaturen bis 90 °C', 'Minimale Wärmeverluste'],
  },

  // =========================================================================
  // 10. 50 FACHARTIKEL & WHITEPAPER (Wissen)
  // =========================================================================
  {
    id: 'news_schallschutz',
    category: 'knowledge',
    title: {
      de: 'Schallschutz & Akustik im Rohrleitungsbau: PP-R vs. Metall',
      en: 'Sound Insulation & Acoustics in Piping: PP-R vs. Metal',
      ar: 'العزل الصوتي والصوتيات في شبكات الأنابيب: PP-R مقابل المعادن',
    },
    description: {
      de: 'Wie molekulare Dämpfung und glatte Innenwandungen Fließgeräusche, Kavitation und Wasserschläge (Water Hammer) um bis zu 15 dB reduzieren.',
      en: 'How molecular damping and smooth inner walls reduce flow noise, cavitation, and water hammer by up to 15 dB compared to metallic pipes.',
      ar: 'كيف يقلل التخميد الجزيئي والجدران الملساء من ضوضاء التدفق وتأثيرات المطرقة المائية بمقدار يصل إلى 15 ديسيبل.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Schallschutz & Akustik', en: 'K-Aqua > Knowledge > Sound Insulation', ar: 'K-Aqua > المعرفة > العزل الصوتي' },
    },
    keywords: ['schallschutz', 'akustik', 'lärm', 'fließgeräusch', 'wasserschlag', 'water hammer', 'din 4109', 'vdi 4100', 'dämpfung', 'hotel', 'schall'],
    href: '/news/schallschutz-akustik-ppr-rohre-hotel-krankenhaus',
    badge: { de: 'Akustik & Komfort', en: 'Acoustics', ar: 'عزل صوتي' },
    specs: ['DIN 4109 Konform', 'VDI 4100 Schallschutzstufe III', 'Molekulare Eigendämpfung'],
  },
  {
    id: 'news_legionellen_hygiene',
    category: 'knowledge',
    title: {
      de: 'Trinkwasserhygiene & Legionellenprävention in Großgebäuden',
      en: 'Potable Water Hygiene & Legionella Prevention in Large Buildings',
      ar: 'نظافة مياه الشرب والوقاية من بكتيريا الفيلقية في المباني الكبيرة',
    },
    description: {
      de: 'Prävention von Biofilmen und Legionellenwachstum durch totraumfreie Hydraulik, glatte PP-R Oberflächen und thermische Desinfektion bis 70 °C.',
      en: 'Biofilm and Legionella prevention through dead-leg-free hydraulics, smooth PP-R surfaces, and thermal disinfection resistance up to 70 °C.',
      ar: 'الوقاية من الأغشية الحيوية ونمو الليجيونيلا من خلال الأسطح الملساء والتطهير الحراري.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Trinkwasserhygiene & Legionellen', en: 'K-Aqua > Knowledge > Drinking Water Hygiene', ar: 'K-Aqua > المعرفة > نظافة مياه الشرب' },
    },
    keywords: ['trinkwasserhygiene', 'legionellen', 'biofilm', 'zirkulation', 'thermische desinfektion', 'trinkwasserverordnung', 'hygiene', 'gesundheit'],
    href: '/news/trinkwasserhygiene-legionellenpraevention-ppr',
    badge: { de: 'Hygiene & Trinkwasser', en: 'Hygiene', ar: 'نظافة المياه' },
    specs: ['DVGW W270 / KTW-BWGL', 'Desinfektionsbeständig', 'Biofilm-resistent'],
  },
  {
    id: 'news_brandschutz',
    category: 'knowledge',
    title: {
      de: 'Brandschutz & Abschottung von PP-R Leitungen (DIN 4102 / EN 13501)',
      en: 'Fire Protection & Pipe Penetration Sealing for PP-R (DIN 4102 / EN 13501)',
      ar: 'الحماية من الحرائق وإغلاق مسارات الأنابيب PP-R',
    },
    description: {
      de: 'Feuerwiderstandsklassen EI 90 / EI 120, Brandschutzmanschetten mit intumeszierendem Material und vorschriftsmäßige Schachtverlegung.',
      en: 'Fire resistance classes EI 90 / EI 120, fire collars with intumescent expanding material, and compliant pipe shaft installations.',
      ar: 'فئات مقاومة الحريق EI 90 / EI 120 وأطواق الحماية من الحرائق القابلة للانتفاخ.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Brandschutz & Abschottung', en: 'K-Aqua > Knowledge > Fire Protection', ar: 'K-Aqua > المعرفة > الحماية من الحريق' },
    },
    keywords: ['brandschutz', 'feuerwiderstand', 'ei90', 'ei120', 'brandschutzmanschette', 'abschottung', 'din 4102', 'en 13501', 'schacht', 'rauch'],
    href: '/news/brandschutz-feuerwiderstandsklasse-b1-ppr-rohre',
    badge: { de: 'Brandschutz', en: 'Fire Safety', ar: 'سلامة الحريق' },
    specs: ['EI 90 / EI 120', 'DIN 4102 / EN 13501', 'Intumeszierende Manschetten'],
  },
  {
    id: 'news_schweisstechnik_dvs',
    category: 'knowledge',
    title: {
      de: 'Schweißtechnik & DVS-Verfahren (Heizelementmuffenschweißen)',
      en: 'Welding Technology & DVS Procedures (Socket & Butt Fusion)',
      ar: 'تقنيات اللحام وإجراءات DVS (لحام المقابس واللحام التناكبي)',
    },
    description: {
      de: 'Fachgerechte Heizelementmuffenschweißung nach DVS 2207-11: Anwärmzeiten, Schweißtemperaturen (260 °C), Abkühlphasen und Null-Fehler-Qualität.',
      en: 'Professional socket fusion welding according to DVS 2207-11: heating times, welding temperature (260 °C), cooling phases, and zero-defect joints.',
      ar: 'لحام المقابس الاحترافي وفقاً لـ DVS 2207-11: أوقات التسخين، ودرجة حرارة 260 مئوية وأوقات التبريد.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Schweißtechnik & DVS', en: 'K-Aqua > Knowledge > Welding & DVS', ar: 'K-Aqua > المعرفة > تقنيات اللحام' },
    },
    keywords: ['schweißen', 'schweißtechnik', 'muffenschweißen', 'dvs 2207', 'stumpfschweißen', 'anwärmzeit', 'temperatur 260', 'homogen', 'verbindung'],
    href: '/news/schweisstechnik-sicherheit-homogene-materialverbindung-ppr',
    badge: { de: 'Schweißtechnik', en: 'Welding', ar: 'لحام حراري' },
    specs: ['DVS 2207-11 Richtlinie', '260 °C Schweißtemperatur', '100% homogen verschweißt'],
  },
  {
    id: 'news_tco_lebensdauer',
    category: 'knowledge',
    title: {
      de: 'Lebenszykluskosten (TCO) & Arrhenius-Berechnung (>50 Jahre)',
      en: 'Total Cost of Ownership (TCO) & Arrhenius Lifespan (>50 Years)',
      ar: 'التكلفة الإجمالية للملكية (TCO) وحساب عمر الأنابيب (>50 عاماً)',
    },
    description: {
      de: 'Wirtschaftlichkeitsanalyse: 40 % geringere Installationszeit, Wartungsfreiheit und wissenschaftliche Lebensdauerberechnung über 50 Jahre.',
      en: 'Economic analysis: 40% reduced installation time, zero maintenance, and scientific lifespan calculations exceeding 50 years via Arrhenius equation.',
      ar: 'تحليل الجدوى الاقتصادية: توفير 40٪ في وقت التركيب وانعدام الصيانة وعمر افتراضي يتجاوز 50 عاماً.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > TCO & Lebenszyklus', en: 'K-Aqua > Knowledge > TCO & Lifespan', ar: 'K-Aqua > المعرفة > التكلفة والعمر الافتراضي' },
    },
    keywords: ['tco', 'lebenszykluskosten', 'lebensdauer', 'arrhenius', 'wirtschaftlichkeit', 'wartungsfrei', 'kostenersparnis', '50 jahre'],
    href: '/news/lebenszykluskosten-tco-investition-ppr-rohre',
    badge: { de: 'TCO & Rentabilität', en: 'TCO & Economy', ar: 'الجدوى الاقتصادية' },
    specs: ['Nutzungsdauer > 50 Jahre', 'Keine Inkrustationen', 'Wartungsfrei'],
  },
  {
    id: 'news_dzr_brass',
    category: 'knowledge',
    title: {
      de: 'DZR-Messing & Polypropylen: Sichere Systemübergänge ohne Korrosion',
      en: 'DZR Brass & Polypropylene: Secure System Transitions without Corrosion',
      ar: 'نحاس DZR والبولي بروبيلين: وصلات انتقال آمنة بدون تآكل',
    },
    description: {
      de: 'Warum herkömmliches Messing im Trinkwasser entzinkt und warum K-Aqua ausschließlich CuZn39Pb3 / CW617N DZR-Messing einsetzt.',
      en: 'Why standard brass suffers from dezincification and why K-Aqua exclusively uses certified CuZn39Pb3 / CW617N DZR brass.',
      ar: 'لماذا يتأثر النحاس العادي بالتآكل ولماذا تستخدم K-Aqua حصرياً نحاس DZR المعتمد.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > DZR-Messing & Übergänge', en: 'K-Aqua > Knowledge > DZR Brass', ar: 'K-Aqua > المعرفة > نحاس DZR' },
    },
    keywords: ['dzr messing', 'entzinkungsbeständig', 'messing', 'korrosion', 'cw617n', 'übergang', 'spannungsriss', 'gewinde', 'metall'],
    href: '/news/messing-trifft-polypropylen-uebergaenge-bestand',
    badge: { de: 'Werkstoffkunde', en: 'Materials', ar: 'علوم المواد' },
    specs: ['CuZn39Pb3 / CW617N', 'DIN EN 12165', 'Keine Entzinkung'],
  },
  {
    id: 'news_normen_zertifikate',
    category: 'knowledge',
    title: {
      de: 'Trinkwasserverordnung, DIN EN ISO 15874 & DVGW Zertifizierung',
      en: 'Drinking Water Ordinance, DIN EN ISO 15874 & DVGW Certification',
      ar: 'لوائح مياه الشرب ومعايير DIN EN ISO 15874 وشهادة DVGW',
    },
    description: {
      de: 'Detaillierter Leitfaden zu internationalen Zulassungen: DVGW W534, KTW-BWGL, DIN 8077/8078, SKZ, CE und ISO 9001/14001.',
      en: 'Comprehensive guide to international standards: DVGW W534, KTW-BWGL, DIN 8077/8078, SKZ, CE, and ISO 9001/14001 certification.',
      ar: 'دليل شامل للمعايير الدولية: DVGW W534 و KTW-BWGL و DIN 8077/8078 و ISO 9001.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Normen & Zertifikate', en: 'K-Aqua > Knowledge > Standards & Certs', ar: 'K-Aqua > المعرفة > المعايير والشهادات' },
    },
    keywords: ['normen', 'zertifikate', 'dvgw', 'iso 15874', 'din 8077', 'ktw-bwgl', 'skz', 'ce', 'trinkwasserverordnung', 'zulassung'],
    href: '/news/trinkwasserverordnung-normen-zertifikate',
    badge: { de: 'Normen & Standards', en: 'Standards', ar: 'معايير وشهادات' },
    specs: ['DVGW DW-8501CS0050', 'DIN EN ISO 15874', 'KTW-BWGL konform'],
  },
  {
    id: 'news_nachhaltigkeit_leed',
    category: 'knowledge',
    title: {
      de: 'Green Building Zertifizierung (LEED / BREEAM / DGNB) mit PP-R',
      en: 'Green Building Certification (LEED / BREEAM / DGNB) with PP-R',
      ar: 'شهادات المباني الخضراء (LEED / BREEAM / DGNB) باستخدام PP-R',
    },
    description: {
      de: 'Umwelt-Produktdeklarationen (EPD), 100 % Recyclingfähigkeit, geringe graue Energie und Beitrag zu LEED v4 und BREEAM Punkten.',
      en: 'Environmental Product Declarations (EPD), 100% recyclability, low embodied energy, and contribution to LEED v4 and BREEAM credits.',
      ar: 'إعلانات المنتجات البيئية (EPD) وقابلية إعادة التدوير بنسبة 100٪ وتوفير نقاط LEED و BREEAM.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Green Building & LEED', en: 'K-Aqua > Knowledge > Green Building', ar: 'K-Aqua > المعرفة > المباني الخضراء' },
    },
    keywords: ['green building', 'leed', 'breeam', 'dgnb', 'nachhaltigkeit', 'epd', 'recycling', 'graue energie', 'ökobilanz', 'kreislaufwirtschaft'],
    href: '/news/green-building-zertifizierung-leed-breeam-ppr',
    badge: { de: 'Nachhaltigkeit', en: 'Sustainability', ar: 'استدامة' },
    specs: ['EPD verifiziert', '100% sortenrein recyclebar', 'Keine Weichmacher/Halogene'],
  },
  {
    id: 'news_waermeausdehnung',
    category: 'knowledge',
    title: {
      de: 'Thermische Längenausdehnung berechnen & kompensieren',
      en: 'Calculating & Compensating Thermal Pipe Expansion in PP-R/PP-RCT',
      ar: 'حساب وتعويض التمدد الحراري للأنابيب في PP-R و PP-RCT',
    },
    description: {
      de: 'Berechnungsformeln für delta L, Auslegung von U-Bögen, Z-Schenkeln und Biegeschenkeln (L_BS) sowie Fest- und Gleitpunkt-Montage.',
      en: 'Calculation formulas for delta L, sizing of expansion loops, U-bends, and sliding/fixed bracket mounting rules.',
      ar: 'معادلات حساب التمدد الحراري وتصميم أقواس التمدد وقواعد التثبيت المنزلق والثابت.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Wärmeausdehnung & Kompensation', en: 'K-Aqua > Knowledge > Thermal Expansion', ar: 'K-Aqua > المعرفة > التمدد الحراري' },
    },
    keywords: ['wärmeausdehnung', 'längenausdehnung', 'u-bogen', 'biegeschenkel', 'festpunkt', 'gleitpunkt', 'kompensation', 'temperaturdelta', 'faserrohr'],
    href: '/news/waermeausdehnung-kunststoffrohre-berechnen-kompensieren-ppr',
    badge: { de: 'Planung & Statik', en: 'Engineering', ar: 'تخطيط وهندسة' },
    specs: ['Ausdehnungskoeffizient 0.035 mm/(m·K)', '75% Ausdehnungsreduktion durch Faser'],
  },
  {
    id: 'news_druckverlust_hydraulik',
    category: 'knowledge',
    title: {
      de: 'Druckverlust & Strömungsdynamik: Reynolds-Zahl & Rauheit',
      en: 'Pressure Loss & Flow Dynamics: Reynolds Number & Pipe Roughness',
      ar: 'فقدان الضغط وديناميكا التدفق: رقم رينولدز وخشونة الأنابيب',
    },
    description: {
      de: 'Geringste Rohrrauheit (k = 0,0070 mm), hydraulische Überlegenheit gegenüber Kupfer und Stahl, Vermeidung von Pumpenergieverlusten.',
      en: 'Ultra-low pipe roughness (k = 0.0070 mm), hydraulic superiority over copper and steel, reducing pumping energy consumption.',
      ar: 'خشونة داخلية منخفضة للغاية (k = 0.0070 مم) وتفوق هيدروليكي يقلل من استهلاك طاقة المضخات.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Hydraulik & Druckverlust', en: 'K-Aqua > Knowledge > Hydraulics & Pressure Drop', ar: 'K-Aqua > المعرفة > الهيدروليكا وفقدان الضغط' },
    },
    keywords: ['druckverlust', 'strömung', 'hydraulik', 'rauheit', 'reynolds', 'durchfluss', 'k-wert', 'zeta-wert', 'pumpenergie', 'strömungswiderstand'],
    href: '/news/druckverlust-stroemungsdynamik-effizienz-ppr',
    badge: { de: 'Hydraulik & Strömung', en: 'Hydraulics', ar: 'هيدروليكا وتدفق' },
    specs: ['Wandkraft k = 0,0070 mm', 'Laminare Strömung', 'Minimaler Zeta-Wert'],
  },
  {
    id: 'news_h2_hydrogen',
    category: 'knowledge',
    title: {
      de: 'Wasserstoff (H2-Ready): Kunststoffrohre in der Gas- & Energieinfrastruktur',
      en: 'Hydrogen (H2-Ready): Plastic Piping in Gas & Energy Infrastructure',
      ar: 'الهيدروجين (جاهز لـ H2): الأنابيب البلاستيكية في بنية الغاز والطاقة',
    },
    description: {
      de: 'Wasserstoffversprödung bei Metallen vs. molekulare Dichtigkeit von Polypropylen: H2-Eignung von PP-R Rohrsystemen.',
      en: 'Hydrogen embrittlement in metals vs. molecular integrity of polypropylene: H2 readiness and gas compatibility of PP-R piping.',
      ar: 'تقصف الهيدروجين في المعادن مقابل التكامل الجزيئي للبولي بروبيلين وجاهزية PP-R لشبكات H2.',
    },
    origin: {
      section: { de: 'Wissen & Fachartikel', en: 'Knowledge & Whitepapers', ar: 'المعرفة والمقالات الفنية' },
      path: { de: 'K-Aqua > Wissen > Wasserstoff & H2-Ready', en: 'K-Aqua > Knowledge > Hydrogen Ready', ar: 'K-Aqua > المعرفة > جاهزية الهيدروجين' },
    },
    keywords: ['wasserstoff', 'h2', 'h2-ready', 'gas', 'energie', 'versprödung', 'molekular', 'zukunft', 'energiewende'],
    href: '/news/wasserstoff-h2-ready-kunststoffrohre-ppr',
    badge: { de: 'Zukunftstechnologie', en: 'Future Tech', ar: 'تقنيات المستقبل' },
    specs: ['Keine Versprödung', 'Geringe Permeation', 'H2-Ready Design'],
  },

  // =========================================================================
  // 11. UNTERNEHMEN, VERTRIEBSNETZ, TRUST & SERVICE
  // =========================================================================
  {
    id: 'comp_about_engineering',
    category: 'company',
    title: {
      de: 'Über K-Aqua: Deutsches Ingenieurwesen & Geschäftsführung',
      en: 'About K-Aqua: German Engineering & Executive Leadership',
      ar: 'عن K-Aqua: الهندسة الألمانية والإدارة التنفيذية',
    },
    description: {
      de: 'Erfahren Sie mehr über die K-Aqua Geschäftsführung (Philipp Nickel, Marcello Gallio), Firmenphilosophie, Standorte und 100 % deutsches Qualitätsversprechen.',
      en: 'Learn more about K-Aqua leadership (Philipp Nickel, Marcello Gallio), corporate philosophy, facilities, and the 100% German Engineering guarantee.',
      ar: 'تعرف على قيادة K-Aqua (Philipp Nickel, Marcello Gallio) وفلسفة الشركة ومرافقها وضمان الجودة الألمانية 100٪.',
    },
    origin: {
      section: { de: 'Unternehmen & Leitung', en: 'Company & Leadership', ar: 'الشركة والقيادة' },
      path: { de: 'K-Aqua > Unternehmen > Über uns', en: 'K-Aqua > Company > About Us', ar: 'K-Aqua > الشركة > من نحن' },
    },
    keywords: ['unternehmen', 'über uns', 'about', 'philipp nickel', 'marcello gallio', 'inhaber', 'geschäftsführung', 'deutschland', 'made in germany', 'qualität', 'standorte'],
    href: '/unternehmen',
    anchorId: 'management',
    badge: { de: 'Unternehmen', en: 'Company', ar: 'الشركة' },
    specs: ['Gegründet in Deutschland', 'Globales Distributionsnetzwerk in über 50 Ländern'],
  },
  {
    id: 'comp_trust_center',
    category: 'certifications',
    title: {
      de: 'Trust Center: Qualitätsprüfungen, DVGW, DIN EN ISO & Prüfberichte',
      en: 'Trust Center: Quality Assurance, DVGW, DIN EN ISO & Test Reports',
      ar: 'مركز الثقة: ضمان الجودة وشهادات DVGW و DIN EN ISO وتقارير الاختبار',
    },
    description: {
      de: 'Zentrales Zertifikats- und Prüfarchiv: DVGW-Zertifikate, ISO 9001/14001, SKZ-Überwachungsverträge, KTW-Hygienegutachten und CE-Konformitätserklärungen.',
      en: 'Central certification and testing repository: DVGW certificates, ISO 9001/14001, SKZ inspection contracts, KTW hygiene reports, and CE declarations.',
      ar: 'مستودع الشهادات والاختبارات المركزي: شهادات DVGW و ISO 9001 وتقارير النظافة KTW وإعلانات CE.',
    },
    origin: {
      section: { de: 'Zertifikate & Qualität', en: 'Certificates & Quality', ar: 'الشهادات والجودة' },
      path: { de: 'K-Aqua > Trust Center > Zertifikate', en: 'K-Aqua > Trust Center > Certificates', ar: 'K-Aqua > مركز الثقة > الشهادات' },
    },
    keywords: ['trust center', 'zertifikat', 'prüfbericht', 'dvgw', 'iso 9001', 'iso 14001', 'skz', 'hygiene', 'konformität', 'audit', 'qualität'],
    href: '/trust-center',
    badge: { de: 'Trust Center', en: 'Trust Center', ar: 'مركز الثقة' },
    specs: ['Laufende Fremdüberwachung durch SKZ', 'Auditierte Prüfzeugnisse'],
  },
  {
    id: 'comp_academy_training',
    category: 'knowledge',
    title: {
      de: 'K-Aqua Academy: Praxis-Schulungen & DVS-Schweißzertifikate',
      en: 'K-Aqua Academy: Hands-on Training & DVS Welding Certifications',
      ar: 'أكاديمية K-Aqua: تدريبات عملية وشهادات لحام DVS',
    },
    description: {
      de: 'Ausbildung und Zertifizierung von Fachhandwerkern, Ingenieuren und Bauleitern: Heizelementmuffenschweißen, Stumpfschweißen und Projektplanung.',
      en: 'Education and certification for plumbers, engineers, and site managers: socket welding, butt fusion, and project design according to DVS standards.',
      ar: 'التعليم والتدريب المعتمد للمهندسين والسباكين ومديري المواقع على لحام المقابس واللحام التناكبي.',
    },
    origin: {
      section: { de: 'Academy & Weiterbildung', en: 'Academy & Training', ar: 'الأكاديمية والتدريب' },
      path: { de: 'K-Aqua > Academy > Schulungen', en: 'K-Aqua > Academy > Trainings', ar: 'K-Aqua > الأكاديمية > التدريبات' },
    },
    keywords: ['academy', 'schulung', 'training', 'kurs', 'dvs zertifikat', 'schweißpass', 'workshop', 'weiterbildung', 'praxis'],
    href: '/academy',
    badge: { de: 'Academy', en: 'Academy', ar: 'الأكاديمية' },
    specs: ['DVS-zertifizierte Trainer', 'Praxis-Workshops & Online-Webinare'],
  },
  {
    id: 'comp_service_prefab',
    category: 'company',
    title: {
      de: 'Service & Vorfertigung: Vorkonfektionierte Verteiler & Baustellen-Support',
      en: 'Service & Prefabrication: Custom Manifolds & On-Site Engineering Support',
      ar: 'الخدمة والتصنيع المسبق: المشعبات المخصصة والدعم الهندسي في الموقع',
    },
    description: {
      de: 'Industrielle Vorfertigung kompletter Steigstränge und Sanitär-/Heizungsverteiler im K-Aqua Werk zur drastischen Reduzierung von Baustellenzeiten.',
      en: 'Industrial prefabrication of complete riser assemblies and distribution manifolds in the factory to drastically cut on-site construction time.',
      ar: 'التصنيع المسبق للمشعبات المعقدة والأنابيب الصاعدة في المصنع لتقليل وقت البناء في الموقع.',
    },
    origin: {
      section: { de: 'Service & Support', en: 'Service & Support', ar: 'الخدمة والدعم' },
      path: { de: 'K-Aqua > Service > Vorfertigung', en: 'K-Aqua > Service > Prefabrication', ar: 'K-Aqua > الخدمة > التصنيع المسبق' },
    },
    keywords: ['service', 'vorfertigung', 'prefabrication', 'verteilerbau', 'steigstrang', 'baustellenbegleitung', 'planungsservice', 'druckprüfung'],
    href: '/service',
    badge: { de: 'Service & Support', en: 'Service', ar: 'الخدمة' },
    specs: ['100% druckgeprüfte Baugruppen', 'Plug & Play Anlieferung'],
  },
  {
    id: 'comp_partnership_network',
    category: 'company',
    title: {
      de: 'Globale Partnerschaft, OEM-Fertigung & Großhandel',
      en: 'Global Partnership, OEM Manufacturing & Wholesale Distribution',
      ar: 'الشراكة العالمية وتصنيع المعدات الأصلية OEM والتوزيع بالجملة',
    },
    description: {
      de: 'Werden Sie offizieller K-Aqua Vertriebspartner, Großhändler oder OEM-Kunde: weltweite Logistik, exklusive Konditionen und technische Unterstützung.',
      en: 'Become an authorized K-Aqua distributor, wholesale partner, or OEM client: worldwide logistics, premium terms, and dedicated technical back-office.',
      ar: 'كن موزعاً معتمداً لـ K-Aqua أو شريكاً بالجملة: خدمات لوجستية عالمية ودعم فني مخصص.',
    },
    origin: {
      section: { de: 'Partnerschaft & Vertrieb', en: 'Partnership & Sales', ar: 'الشراكة والمبيعات' },
      path: { de: 'K-Aqua > Partnerschaft > Distribution', en: 'K-Aqua > Partnership > Distribution', ar: 'K-Aqua > الشراكة > التوزيع' },
    },
    keywords: ['partnerschaft', 'partner', 'distributor', 'großhandel', 'oem', 'vertrieb', 'händler', 'b2b', 'lieferkette'],
    href: '/partnerschaft',
    badge: { de: 'Partnerschaft', en: 'Partnership', ar: 'شراكة' },
    specs: ['Über 50 Länder aktiv', 'Just-in-Time Lieferfähigkeit'],
  },
  {
    id: 'comp_global_markets',
    category: 'company',
    title: {
      de: 'Internationale Märkte, Standorte & Ländervertretungen',
      en: 'Global Markets, Worldwide Hubs & Country Representations',
      ar: 'الأسواق العالمية والمراكز الدولية وممثلو الدول',
    },
    description: {
      de: 'K-Aqua ist weltweit in über 50 Märkten präsent: Europa, Naher Osten, GCC, Nordafrika, Asien und Lateinamerika.',
      en: 'K-Aqua operates globally in over 50 countries across Europe, the Middle East, GCC, North Africa, Asia, and the Americas.',
      ar: 'تعمل K-Aqua عالمياً في أكثر من 50 دولة عبر أوروبا والشرق الأوسط ودول مجلس التعاون الخليجي.',
    },
    origin: {
      section: { de: 'Globale Märkte', en: 'Global Markets', ar: 'الأسواق العالمية' },
      path: { de: 'K-Aqua > Märkte > Global Footprint', en: 'K-Aqua > Markets > Global Footprint', ar: 'K-Aqua > الأسواق > التواجد العالمي' },
    },
    keywords: ['märkte', 'markets', 'länder', 'standorte', 'global', 'dubai', 'mena', 'europa', 'gcc', 'saudi arabien', 'deutschland'],
    href: '/maerkte',
    badge: { de: 'Globale Märkte', en: 'Markets', ar: 'أسواق عالمية' },
    specs: ['Internationale Logistikzentren', 'Mehrsprachige Ingenieurteams'],
  },
  {
    id: 'comp_references',
    category: 'company',
    title: {
      de: 'Referenzprojekte & Internationale Case Studies',
      en: 'Reference Projects & International Landmark Case Studies',
      ar: 'المشاريع المرجعية ودراسات الحالة الدولية للمشاريع الكبرى',
    },
    description: {
      de: 'Erfolgreich realisierte Großprojekte mit K-Aqua: Luxushotels, Regierungskomplexe, Mega-Krankenhäuser und High-Tech Industrieanlagen.',
      en: 'Landmark projects built with K-Aqua piping: 5-star luxury hotels, government megaprojects, hospitals, and high-tech industrial plants.',
      ar: 'مشاريع بارزة تم بناؤها باستخدام أنابيب K-Aqua: فنادق فاخرة ومستشفيات ضخمة ومصانع صناعية متطورة.',
    },
    origin: {
      section: { de: 'Referenzen & Bauten', en: 'References & Projects', ar: 'المشاريع المرجعية' },
      path: { de: 'K-Aqua > Referenzen > Großprojekte', en: 'K-Aqua > References > Landmark Projects', ar: 'K-Aqua > المشاريع > المشاريع الكبرى' },
    },
    keywords: ['referenzen', 'projekte', 'case study', 'hotel', 'hospital', 'bauvorhaben', 'wolkenkratzer', 'luxushotel', 'erfolgsgeschichte'],
    href: '/referenzen',
    badge: { de: 'Referenzen', en: 'Projects', ar: 'مشاريع' },
    specs: ['Millionen verbauter Rohrmeter', 'Internationale Großbaustellen'],
  },
  {
    id: 'comp_careers',
    category: 'company',
    title: {
      de: 'Karriere bei K-Aqua: Offene Stellen & Ingenieurspositionen',
      en: 'Careers at K-Aqua: Job Openings & Engineering Opportunities',
      ar: 'الوظائف في K-Aqua: فرص العمل والمناصب الهندسية',
    },
    description: {
      de: 'Gestalten Sie die Zukunft der Trinkwasser- und Energietechnik mit: Offene Positionen im Vertrieb, Werkstofftechnik, Anwendungstechnik und Logistik.',
      en: 'Shape the future of water and energy piping: open positions in technical sales, materials engineering, MEP planning, and international logistics.',
      ar: 'شارك في بناء مستقبل تقنيات المياه والطاقة: فرص عمل في المبيعات الفنية وهندسة المواد والتخطيط.',
    },
    origin: {
      section: { de: 'Karriere & Jobs', en: 'Careers & Jobs', ar: 'الوظائف والمهن' },
      path: { de: 'K-Aqua > Karriere > Offene Stellen', en: 'K-Aqua > Careers > Open Positions', ar: 'K-Aqua > الوظائف > الوظائف الشاغرة' },
    },
    keywords: ['karriere', 'career', 'jobs', 'stellenangebote', 'ingenieur', 'vertrieb', 'bewerbung', 'arbeiten bei k-aqua'],
    href: '/karriere',
    badge: { de: 'Karriere', en: 'Careers', ar: 'وظائف' },
    specs: ['Entwicklungsmöglichkeiten', 'Internationales Arbeitsumfeld'],
  },
  {
    id: 'comp_contact_rfq',
    category: 'company',
    title: {
      de: 'Kontakt, Projektanfrage & Technischer Vertrieb',
      en: 'Contact, Project Inquiries & Technical Sales',
      ar: 'الاتصال واستفسارات المشاريع والمبيعات الفنية',
    },
    description: {
      de: 'Direkter Draht zu unseren Fachingenieuren: Fordern Sie technische Beratung, Vor-Ort-Bemusterungen oder maßgeschneiderte Projektangebote an.',
      en: 'Direct contact with our engineers: request technical specifications, sample kits, or tailored project quotes.',
      ar: 'تواصل مباشر مع مهندسينا: اطلب المشورة الفنية، أو عينات المنتجات، أو عروض الأسعار المخصصة.',
    },
    origin: {
      section: { de: 'Kontakt & Beratung', en: 'Contact & Consulting', ar: 'الاتصال والاستشارات' },
      path: { de: 'K-Aqua > Kontakt > Projektanfrage', en: 'K-Aqua > Contact > RFQ', ar: 'K-Aqua > الاتصال > طلب عرض أسعار' },
    },
    keywords: ['kontakt', 'contact', 'anfrage', 'rfq', 'angebot', 'beratung', 'telefon', 'e-mail', 'vertrieb', 'bemusterung', 'projektanfrage'],
    href: '/kontakt',
    badge: { de: 'Kontakt', en: 'Contact', ar: 'اتصال' },
    specs: ['Reaktionszeit < 24 Stunden', 'Persönliche Ingenieursberatung'],
  },
];
