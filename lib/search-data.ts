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
    keywords: ['pp-rct', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'heißwasser', 'kühlwasser', 'steigstrang', 'k-fiber', 'rohr', 'pipe', 'längenausdehnung', 'aq200f'],
    href: '/produkte/pipes',
    anchorId: 'pipes-rct-74',
    badge: { de: 'PP-RCT Faser', en: 'PP-RCT Fiber', ar: 'ألياف PP-RCT' },
    specs: ['PP-RCT + Glasfaser', 'SDR 7.4', 'd20 – d250 mm', 'PN 20 / PN 25', 'DIN 8077/8078', 'DIN EN ISO 15874'],
    articleCodes: ['AQ200F20', 'AQ200F25', 'AQ200F32', 'AQ200F40', 'AQ200F50', 'AQ200F63', 'AQ200F75', 'AQ200F90', 'AQ200F110', 'AQ200F125', 'AQ200F160', 'AQ200F200', 'AQ200F250'],
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
    specs: ['PP-RCT + Faser', 'SDR 11', 'd20 – d250 mm', 'Minimaler Druckverlust', 'Kondensationsoptimiert'],
    articleCodes: ['AQ160F20', 'AQ160F25', 'AQ160F32', 'AQ160F40', 'AQ160F50', 'AQ160F63', 'AQ160F75', 'AQ160F90', 'AQ160F110', 'AQ160F125'],
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
      de: 'Spezial-Faserverbundrohr mit coextrudierter UV-Schutzschicht für die dauerhafte Freiverlegung auf Dächern, an Außenfassaden und in tropischen/Wüsten-Klimazonen.',
      en: 'Special fiber composite pipe with co-extruded UV-resistant outer layer for permanent outdoor rooftop and facade installations in extreme sunny climates.',
      ar: 'أنبوب مركب خاص مع طبقة حماية خارجية مقاومة للأشعة فوق البنفسجية للتركيب الخارجي الدائم على الأسطح.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > UV-Rohre PP-RCT', en: 'K-Aqua > Products > Pipes > UV Pipes PP-RCT', ar: 'K-Aqua > المنتجات > الأنابيب > أنابيب UV' },
    },
    keywords: ['uv', 'uv-beständig', 'sonnenschutz', 'außenbereich', 'dachzentrale', 'solar', 'freiverlegung', 'wetterfest', 'aq200fuvct'],
    href: '/produkte/pipes',
    badge: { de: 'UV-Schutz PP-RCT', en: 'UV-Proof PP-RCT', ar: 'حماية UV' },
    specs: ['UV-stabilisiert', 'PP-RCT + Faser', 'SDR 7.4', 'd20 – d200 mm', 'Wetterfest nach ISO 4892'],
    articleCodes: ['AQ200FUVCT20', 'AQ200FUVCT25', 'AQ200FUVCT32', 'AQ200FUVCT40', 'AQ200FUVCT50'],
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
    keywords: ['pp-r', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'glasfaser', 'warmwasser', 'heizung', 'rohr', 'pipe', 'aq207pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R Faser', en: 'PP-R Fiber', ar: 'ألياف PP-R' },
    specs: ['PP-R 100 + Glasfaser', 'SDR 7.4', 'd20 – d50 mm', 'PN 20', 'DIN 8077/8078'],
    articleCodes: ['AQ207PF20', 'AQ207PF25', 'AQ207PF32', 'AQ207PF40', 'AQ207PF50'],
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
      de: 'Faserverbundrohr mit reduzierter Wandstärke für mittlere Druckstufen in Heizungs- und Sanitärsystemen (d32 bis d75 mm).',
      en: 'Fiber composite pipe with reduced wall thickness for medium pressure ratings in heating and plumbing (d32 to d75 mm).',
      ar: 'أنبوب مركب بسماكة جدار مخفضة لمستويات الضغط المتوسطة في التدفئة والسباكة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 9', en: 'K-Aqua > Products > Pipes > PP-R SDR 9', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 9' },
    },
    keywords: ['sdr 9', 'pn16', 'faserverbund', 'heizung', 'sanitär', 'aq169pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R SDR 9', en: 'PP-R SDR 9', ar: 'PP-R SDR 9' },
    specs: ['PP-R 100 + Glasfaser', 'SDR 9', 'd32 – d75 mm', 'PN 16'],
    articleCodes: ['AQ169PF32', 'AQ169PF40', 'AQ169PF50', 'AQ169PF63', 'AQ169PF75'],
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
      de: 'Dünnwandiges Faserverbundrohr für Kaltwasser-, Kühl- und Zirkulationsleitungen bei geringem Systemdruck (PN 10).',
      en: 'Thin-walled fiber composite pipe for chilled water and cooling systems at lower pressure levels (PN 10).',
      ar: 'أنبوب مركب رقيق الجدار لمياه التبريد عند مستويات ضغط منخفضة.',
    },
    origin: {
      section: { de: 'Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 11', en: 'K-Aqua > Products > Pipes > PP-R SDR 11', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 11' },
    },
    keywords: ['sdr 11', 'pn10', 'kühlung', 'kaltwasser', 'faser', 'aq11pf'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R SDR 11', en: 'PP-R SDR 11', ar: 'PP-R SDR 11' },
    specs: ['PP-R 100 + Faser', 'SDR 11', 'd20 – d50 mm', 'PN 10'],
    articleCodes: ['AQ11PF20', 'AQ11PF25', 'AQ11PF32', 'AQ11PF40', 'AQ11PF50'],
  },
  {
    id: 'prod_pipe_k_fiber_r_sdr17',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 17 (Großrohre d90 – d200 mm)',
      en: 'K-Fiber Pipe PP-R SDR 17 (Large Diameter Pipes d90 – d200 mm)',
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
    keywords: ['sdr 17', 'großrohr', 'hauptverteiler', 'd90', 'd110', 'd125', 'd160', 'd200', 'stumpfschweißen', 'aq17pf'],
    href: '/produkte/pipes',
    badge: { de: 'Großrohre SDR 17', en: 'Large Pipes SDR 17', ar: 'أنابيب كبيرة' },
    specs: ['PP-R 100 + Faser', 'SDR 17', 'd90 – d200 mm', 'Stumpf- und Muffenschweißung'],
    articleCodes: ['AQ17PF90', 'AQ17PF110', 'AQ17PF125', 'AQ17PF160', 'AQ17PF200'],
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
    keywords: ['k-pipe', 'sdr 6', 'pn20', 'vollwand', 'trinkwasser', 'sanitär', 'kaltwasser', 'druckfest', 'aq200p'],
    href: '/produkte/pipes',
    badge: { de: 'Vollwand SDR 6', en: 'Solid Wall SDR 6', ar: 'جدار صلب SDR 6' },
    specs: ['PP-R 100', 'SDR 6', 'd20 – d50 mm', 'PN 20', 'DIN 8077/8078'],
    articleCodes: ['AQ200P20', 'AQ200P25', 'AQ200P32', 'AQ200P40', 'AQ200P50'],
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
    keywords: ['purple pipe', 'violett', 'brauchwasser', 'grauwasser', 'regenwasser', 'reclaimed water', 'nicht-trinkwasser', 'aq11pl'],
    href: '/produkte/pipes',
    badge: { de: 'Brauchwasser', en: 'Reclaimed Water', ar: 'مياه معالجة' },
    specs: ['PP-R 100 Violett RAL 4001', 'SDR 11', 'd20 – d50 mm', 'Visuelle Trennung nach DIN 1988'],
    articleCodes: ['AQ11PL20', 'AQ11PL25', 'AQ11PL32', 'AQ11PL40', 'AQ11PL50'],
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
      de: 'Strömungsgünstiger 90°-Spritzgusswinkel für homogene Muffenschweißung (d20 bis d75 mm). Keine Verengung des Rohrinnenquerschnitts.',
      en: 'Flow-optimized 90° injection molded elbow for homogeneous socket welding (d20 to d75 mm). Zero internal flow restriction.',
      ar: 'كوع 90 درجة مصبوب بالحقن ومحسّن للتدفق للحام المقابس المتجانس.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Winkel 90°', en: 'K-Aqua > Products > Fittings > Elbow 90°', ar: 'K-Aqua > المنتجات > الوصلات > كوع 90' },
    },
    keywords: ['winkel 90', 'elbow 90', 'bogen', '90 grad', 'muffe', 'fitting', 'formteil', 'aq090'],
    href: '/produkte/fittings',
    badge: { de: 'Winkel 90°', en: 'Elbow 90°', ar: 'كوع 90' },
    specs: ['PP-R 100', 'd20 – d75 mm', 'DIN 16962', 'DVGW geprüft'],
    articleCodes: ['AQ09020', 'AQ09025', 'AQ09032', 'AQ09040', 'AQ09050', 'AQ09063', 'AQ09075'],
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
    specs: ['PP-R 100', 'd20 – d75 mm', 'Minimaler Zeta-Wert'],
    articleCodes: ['AQ04520', 'AQ04525', 'AQ04532', 'AQ04540', 'AQ04550', 'AQ04563', 'AQ04575'],
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
      de: 'Symmetrisches T-Stück für Abzweigungen im 90°-Winkel mit drei identischen Schweißmuffen (d20 bis d75 mm).',
      en: 'Symmetrical equal tee for 90° branches with three identical fusion sockets (d20 to d75 mm).',
      ar: 'محمل تي متماثل للفروع بزاوية 90 درجة مع ثلاثة مقابس لحام متطابقة.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > T-Stücke', en: 'K-Aqua > Products > Fittings > Tees', ar: 'K-Aqua > المنتجات > الوصلات > محملات تي' },
    },
    keywords: ['t-stück', 'tee', 'abzweig', 'egal', 'equal tee', 'fitting', 'aq130'],
    href: '/produkte/fittings',
    badge: { de: 'T-Stück egal', en: 'Equal Tee', ar: 'محمل تي' },
    specs: ['PP-R 100', 'd20 – d75 mm', 'Homogen verschweißt'],
    articleCodes: ['AQ13020', 'AQ13025', 'AQ13032', 'AQ13040', 'AQ13050', 'AQ13063', 'AQ13075'],
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
    keywords: ['reduziertes t-stück', 'reducing tee', 'abzweig reduziert', 'fitting', 'aq1302520', 'aq150'],
    href: '/produkte/fittings',
    badge: { de: 'T-Stück reduziert', en: 'Reducing Tee', ar: 'محمل تي مخفض' },
    specs: ['PP-R 100', 'Ø 25×20 bis 75×32 mm'],
    articleCodes: ['AQ1302520', 'AQ1303220', 'AQ1303225', 'AQ1304020', 'AQ1305020', 'AQ1506320', 'AQ1507532'],
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
      de: 'Präzisions-Schweißmuffe zur geraden Verbindung zweier Rohrabschnitte gleicher Nennweite (d20 bis d75 mm).',
      en: 'Precision fusion socket for straight in-line coupling of two identical pipe ends (d20 to d75 mm).',
      ar: 'جلبة لحام دقيقة للتوصيل المستقيم بين طرفي أنبوبين متطابقين.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Verbindungsmuffen', en: 'K-Aqua > Products > Fittings > Sockets', ar: 'K-Aqua > المنتجات > الوصلات > جلب التوصيل' },
    },
    keywords: ['muffe', 'socket', 'coupler', 'verbindungsmuffe', 'fitting', 'aq270'],
    href: '/produkte/fittings',
    badge: { de: 'Muffe', en: 'Socket', ar: 'جلبة' },
    specs: ['PP-R 100', 'd20 – d75 mm', 'Anschlagkante innen'],
    articleCodes: ['AQ27020', 'AQ27025', 'AQ27032', 'AQ27040', 'AQ27050', 'AQ27063', 'AQ27075'],
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
      de: 'Konzentrische Schweißreduzierung zum nahtlosen Übergang auf einen kleineren Rohrdurchmesser (z. B. 25×20 bis 50×20 mm).',
      en: 'Concentric fusion reducer for smooth dimension transition to smaller pipe diameters.',
      ar: 'مخفض لحام متمركز للانتقال السلس إلى قطر أنبوب أصغر.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Reduzierungen', en: 'K-Aqua > Products > Fittings > Reducers', ar: 'K-Aqua > المنتجات > الوصلات > مخفضات' },
    },
    keywords: ['reduzierung', 'reducing bush', 'reduzierstück', 'dimensionierung', 'fitting', 'aq243'],
    href: '/produkte/fittings',
    badge: { de: 'Reduzierung', en: 'Reducer', ar: 'مخفض' },
    specs: ['PP-R 100', 'd25×20 bis d50×20 mm'],
    articleCodes: ['AQ2432520', 'AQ2433220', 'AQ2433225', 'AQ2434020', 'AQ2435020'],
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
    specs: ['PP-R 100', 'd20 – d75 mm', 'PN 25 druckfest'],
    articleCodes: ['AQ30120', 'AQ30125', 'AQ30132', 'AQ30140', 'AQ30150', 'AQ30163', 'AQ30175'],
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
    keywords: ['kreuzungsbogen', 'cross over', 'überbrückung', 'überführung', 'bypass', 'aq267', 'aq285'],
    href: '/produkte/fittings',
    badge: { de: 'Kreuzungsbogen', en: 'Cross Over', ar: 'قوس تقاطع' },
    specs: ['PP-R 100', 'd20 – d32 mm'],
    articleCodes: ['AQ26720', 'AQ26725', 'AQ26732', 'AQ28520', 'AQ28525', 'AQ28532'],
  },

  // =========================================================================
  // 3. TRANSITION FITTINGS (DZR-Messing Übergänge)
  // =========================================================================
  {
    id: 'prod_trans_socket_female',
    category: 'products',
    title: {
      de: 'Übergangsmuffe mit Innengewinde (DZR-Messing Rp)',
      en: 'Adaptor Socket with Female Thread (DZR Brass Rp)',
      ar: 'مقبس انتقال مع سن داخلي (نحاس DZR Rp)',
    },
    description: {
      de: 'Schweißmuffe mit eingegossenem, entzinkungsbeständigem DZR-Messing-Innengewinde für Armaturenanschlüsse und metallische Rohrnetze.',
      en: 'Fusion socket with embedded dezincification-resistant DZR brass internal thread for fixtures and metallic interfaces.',
      ar: 'مقبس لحام مع سن داخلي من نحاس DZR المقاوم لإزالة الزنك لتركيب التجهيزات.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Muffe IG', en: 'K-Aqua > Products > Transitions > Female Socket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > مقبس سن داخلي' },
    },
    keywords: ['übergangsmuffe', 'innengewinde', 'rp', 'female thread', 'messing', 'dzr', 'aq24rp'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Übergang IG', en: 'Female Thread', ar: 'سن داخلي' },
    specs: ['CuZn39Pb3 / CW617N', 'd20×½" bis d315×12"', 'Entzinkungsfest'],
    articleCodes: ['AQ24RP20', 'AQ24RP25', 'AQ24RP32', 'AQ24RP40', 'AQ24RP50', 'AQ24RP63', 'AQ24RP75'],
  },
  {
    id: 'prod_trans_socket_male',
    category: 'products',
    title: {
      de: 'Übergangsmuffe mit Außengewinde (DZR-Messing R)',
      en: 'Adaptor Socket with Male Thread (DZR Brass R)',
      ar: 'مقبس انتقال مع سن خارجي (نحاس DZR R)',
    },
    description: {
      de: 'Schweißmuffe mit massivem DZR-Messing-Außengewinde für Pumpen, Ventile und Verteilerblöcke.',
      en: 'Fusion socket with heavy DZR brass external male thread for pumps, valves, and manifold ports.',
      ar: 'مقبس لحام مع سن خارجي من نحاس DZR القوي للمضخات والصمامات والمشعبات.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Muffe AG', en: 'K-Aqua > Products > Transitions > Male Socket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > مقبس سن خارجي' },
    },
    keywords: ['übergangsmuffe', 'außengewinde', 'male thread', 'r gewinde', 'messing', 'dzr', 'aq24r'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Übergang AG', en: 'Male Thread', ar: 'سن خارجي' },
    specs: ['CuZn39Pb3 / CW617N', 'd20×½" bis d160×6"'],
    articleCodes: ['AQ24R20', 'AQ24R25', 'AQ24R32', 'AQ24R40', 'AQ24R50', 'AQ24R63'],
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
      de: 'Schallentkoppelter Montage-Wandwinkel mit Befestigungslaschen und DZR-Messing-Innengewinde für Sanitärarmaturen und Waschtischanschlüsse.',
      en: 'Acoustically decoupled mounting wall elbow with mounting ears and DZR brass female thread for sanitary fixtures.',
      ar: 'كوع تثبيت جداري مع أذن تثبيت وسن داخلي نحاسي DZR لتركيب التجهيزات الصحية.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Deckenwinkel', en: 'K-Aqua > Products > Transitions > Wall Bracket', ar: 'K-Aqua > المنتجات > وصلات الانتقال > قوس جداري' },
    },
    keywords: ['deckenwinkel', 'wandwinkel', 'wall bracket', 'armaturanschluss', 'waschtisch', 'aq09brp', 'aq09wbrp'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Deckenwinkel', en: 'Wall Bracket', ar: 'قوس جداري' },
    specs: ['Befestigungslaschen', 'd20×½" bis d40×1¼"', 'Schalldämmend'],
    articleCodes: ['AQ09BRP20', 'AQ09BRP25', 'AQ09WBRP20', 'AQ09WBRP25'],
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
      de: 'Lösbare Übergangsverschraubung mit EPDM-Flachdichtung und Überwurfmutter zur einfachen Demontage von Pumpen, Filtern und Zählern.',
      en: 'Demountable transition union with EPDM flat gasket and union nut for easy maintenance of pumps, meters, and filters.',
      ar: 'وصلة يونيون قابلة للفك مع حشوة مسطحة وصامولة لسهولة صيانة المضخات والعدادات.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > Verschraubungen', en: 'K-Aqua > Products > Transitions > Unions', ar: 'K-Aqua > المنتجات > وصلات الانتقال > وصلات يونيون' },
    },
    keywords: ['verschraubung', 'union', 'lösbare verbindung', 'überwurfmutter', 'pumpe', 'zähler', 'aq71rp', 'aq71r', 'aq70rp'],
    href: '/produkte/transition-fittings',
    badge: { de: 'Verschraubung', en: 'Metal Union', ar: 'يونيون' },
    specs: ['d20×½" bis d50×2"', 'EPDM Flachdichtung', 'PN 20'],
    articleCodes: ['AQ71RP20', 'AQ71RP25', 'AQ71RP32', 'AQ71R20', 'AQ71R25', 'AQ70RP20'],
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
    keywords: ['kugelhahn', 'ball valve', 'absperrhahn', 'ventil', 'messingkugel', 'voller durchgang', 'aq600'],
    href: '/produkte/valves',
    badge: { de: 'Kugelhahn Messing', en: 'Brass Ball Valve', ar: 'صمام كروي نحاس' },
    specs: ['Voller Durchgang', 'd20 – d90 mm', 'PTFE Dichtungen', 'PN 20', '100% leckagegeprüft'],
    articleCodes: ['AQ60020', 'AQ60025', 'AQ60032', 'AQ60040', 'AQ60050', 'AQ60063', 'AQ60075', 'AQ60090'],
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
    keywords: ['vollkunststoff', 'metallfrei', 'kugelhahn pp', 'chemikalien', 'säure', 'reinstwasser', 'aq500'],
    href: '/produkte/valves',
    badge: { de: 'Metallfrei PP', en: 'All-Plastic Valve', ar: 'بلاستيك بالكامل' },
    specs: ['100% metallfrei', 'd20 – d63 mm', 'Extreme Chemikalienresistenz'],
    articleCodes: ['AQ50020', 'AQ50025', 'AQ50032', 'AQ50040', 'AQ50050', 'AQ50063'],
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
      de: 'Formschönes Unterputz-Absperrventil für moderne Bad- und Hotelinstallationen mit verchromter Rosette und ergonomischem Griff.',
      en: 'Elegant concealed shut-off valve for modern bathrooms and luxury hotels with chrome rosette and handle.',
      ar: 'صمام إغلاق مخفي أنيق للحمامات الحديثة والفنادق الفاخرة مع غطاء ومقبض كروم.',
    },
    origin: {
      section: { de: 'Armaturen & Ventile', en: 'Valves & Flow Control', ar: 'الصمامات والتحكم بالتدفق' },
      path: { de: 'K-Aqua > Produkte > Ventile > Unterputzventile', en: 'K-Aqua > Products > Valves > Concealed Valves', ar: 'K-Aqua > المنتجات > الصمامات > صمام مخفي' },
    },
    keywords: ['unterputzventil', 'concealed valve', 'badarmatur', 'chromgriff', 'rosette', 'hotel', 'aq62993', 'aq62992'],
    href: '/produkte/valves',
    badge: { de: 'Unterputzventil', en: 'Concealed Valve', ar: 'صمام مخفي' },
    specs: ['½" & ¾"', 'Chrom-Finish', 'Verlängerungsstücke verfügbar'],
    articleCodes: ['AQ62993', 'AQ62992', 'AQ62990'],
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
    keywords: ['einschweißsattel', 'weld-in saddle', 'verteilerbau', 'abzweig nachrüsten', 'manifold', 'aq1505'],
    href: '/produkte/weld-in-saddles',
    badge: { de: 'Satteltechnik', en: 'Weld-in Saddle', ar: 'سرج لحام' },
    specs: ['Hauptrohr d40 – d250 mm', 'Abzweig d20 – d63 mm', 'DVS 2207 konform'],
    articleCodes: ['AQ1505406320', 'AQ1505406325', 'AQ1505160250'],
  },
  {
    id: 'prod_saddle_female_thread',
    category: 'products',
    title: {
      de: 'Einschweißsattel mit DZR-Messing-Innengewinde (Saddle Female Thread)',
      en: 'Weld-in Saddle with DZR Brass Female Thread',
      ar: 'سرج لحام مع سن داخلي نحاسي DZR',
    },
    description: {
      de: 'Einschweißsattel mit integriertem Messinggewinde zum direkten Einschrauben von Sensoren, Manometern, Entlüftern oder metallischen Absperrventilen.',
      en: 'Weld-in saddle with integrated brass thread for direct mounting of sensors, gauges, air vents, and metal valves.',
      ar: 'سرج لحام مع سن نحاسي مدمج للتركيب المباشر لأجهزة الاستشعار ومقاييس الضغط والصمامات.',
    },
    origin: {
      section: { de: 'Einschweißsättel', en: 'Weld-in Saddles', ar: 'سروج اللحام' },
      path: { de: 'K-Aqua > Produkte > Einschweißsättel > Innengewinde', en: 'K-Aqua > Products > Saddles > Female Thread', ar: 'K-Aqua > المنتجات > سروج اللحام > سن داخلي' },
    },
    keywords: ['sattel innengewinde', 'sensorabgang', 'manometer', 'entlüfter', 'dzr messing', 'aq270s'],
    href: '/produkte/weld-in-saddles',
    badge: { de: 'Sattel Gewinde IG', en: 'Threaded Saddle', ar: 'سرج بسن' },
    specs: ['Hauptrohr d40 – d125 mm', 'Gewinde ½" bis 1¼"'],
    articleCodes: ['AQ270S406332', 'AQ270S751254'],
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
      de: 'Professionelles Handschweißgerät mit 800 W Leistung, elektronischer 260 °C Thermostatregelung, Schweißdornen d20–d63 und robustem Metallkoffer.',
      en: 'Professional 800W socket fusion machine with electronic 260°C temperature regulation, dies d20–d63, and heavy steel transport case.',
      ar: 'ماكينة لحام يدوية احترافية بقدرة 800 واط مع تحكم إلكتروني في درجة الحرارة 260 مئوية وقوالب تسخين.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Schweißgerät 20–63', en: 'K-Aqua > Products > Tools > Welding Kit 20–63', ar: 'K-Aqua > المنتجات > الأدوات > ماكينة لحام 20-63' },
    },
    keywords: ['schweißgerät', 'muffenschweißgerät', 'welding kit', 'handschweißgerät', '260 grad', 'thermostat', 'aq98063'],
    href: '/produkte/tools',
    badge: { de: 'Schweißset 20–63', en: 'Welding Kit 20–63', ar: 'ماكينة لحام' },
    specs: ['800 Watt / 230 Volt', 'Präzision ±2 °C', 'Dornen d20, d25, d32, d40, d50, d63'],
    articleCodes: ['AQ98063', 'AQ98032'],
  },
  {
    id: 'prod_tool_welder_125',
    category: 'products',
    title: {
      de: 'Werkstatt- & Baustellen-Schweißmaschine 50–125 mm',
      en: 'Heavy-Duty Socket Fusion Machine 50–125 mm',
      ar: 'ماكينة لحام المقابس الثقيلة 50-125 مم',
    },
    description: {
      de: 'Fahrbare Schweißmaschine mit Zahnstangenantrieb für präzise, achsengenaue Muffenschweißung großer Rohrdurchmesser (d50 bis d125 mm).',
      en: 'Rack-and-pinion guided fusion machine for precise coaxial socket welding of large pipes (d50 to d125 mm).',
      ar: 'ماكينة لحام موجهة بدقة للحام المحوري للمقابس للأنابيب الكبيرة (50 إلى 125 مم).',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Schweißmaschine 50–125', en: 'K-Aqua > Products > Tools > Fusion Machine 50–125', ar: 'K-Aqua > المنتجات > الأدوات > ماكينة لحام 50-125' },
    },
    keywords: ['schweißmaschine', 'zahnstange', 'großdurchmesser', 'd125', 'd110', 'd90', 'd75', 'aq985125'],
    href: '/produkte/tools',
    badge: { de: 'Schweißmaschine 125', en: 'Fusion Machine 125', ar: 'ماكينة 125' },
    specs: ['1400 Watt', 'Achsengenaue Führung', 'Schweißdorne 50–125 mm'],
    articleCodes: ['AQ985125'],
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
      de: 'Geniales Reparatursystem zur sekundenschnellen, dauerhaften Beseitigung von Anbohrschäden (z. B. durch Dübel) in verputzten Wänden.',
      en: 'Ingenious emergency repair plug system to permanently seal accidentally drilled pipe walls in seconds without wall opening.',
      ar: 'نظام سدادات طوارئ ذكي لإصلاح الأنابيب المثقوبة عن طريق الخطأ في ثوانٍ دون تكسير الجدار.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Reparaturstopfen', en: 'K-Aqua > Products > Tools > Repair Plug', ar: 'K-Aqua > المنتجات > الأدوات > سدادة إصلاح' },
    },
    keywords: ['reparaturstopfen', 'repair plug', 'anbohrschaden', 'notfallreparatur', 'leckage stopfen', 'aq96557', 'aq98625'],
    href: '/produkte/tools',
    badge: { de: 'Reparaturstopfen', en: 'Repair Plug', ar: 'سدادة إصلاح' },
    specs: ['7 mm & 11 mm', 'PTFE Reparaturschweißdorn', 'Dauerhaft druckdicht'],
    articleCodes: ['AQ96557', 'AQ96511', 'AQ98625'],
  },
  {
    id: 'prod_tool_pipe_cutter',
    category: 'products',
    title: {
      de: 'Professioneller Rohrabschneider & Schere (20–40 & 50–125 mm)',
      en: 'Professional Pipe Cutters & Rotary Slicers (20–40 & 50–125 mm)',
      ar: 'قواطع أنابيب احترافية ومقصات دوارة (20-40 و 50-125 مم)',
    },
    description: {
      de: 'Hochpräzise Rohrabschneider mit spezialgehärteter Klinge für gratfreie, exakt rechtwinklige Schnitte bei PP-R und Faserverbundrohren.',
      en: 'High-precision pipe cutters with hardened blades for burr-free, perfectly square cuts on PP-R and fiber composite pipes.',
      ar: 'قواطع أنابيب عالية الدقة بشفرات مقواة لقطوعات نظيفة ومستقيمة بزاوية 90 درجة.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Rohrschneider', en: 'K-Aqua > Products > Tools > Pipe Cutters', ar: 'K-Aqua > المنتجات > الأدوات > قواطع أنابيب' },
    },
    keywords: ['rohrschneider', 'cutter', 'rohrschere', 'gratfrei', 'rechtwinklig schneiden', 'aq97040', 'aq975125'],
    href: '/produkte/tools',
    badge: { de: 'Rohrabschneider', en: 'Pipe Cutter', ar: 'قاطع أنابيب' },
    specs: ['d20–d40 mm Ratschenschnitt', 'd50–d125 mm Rotationsschneider'],
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
      de: 'Korrosionsgeschützter Losflansch mit glasfaserverstärktem PP-Mantel und massivem Stahlkern nach DIN EN 1092-1 / PN 16 (d40 bis d315 mm).',
      en: 'Corrosion-proof backing flange with glass-fiber reinforced PP casing and solid steel core according to DIN EN 1092-1 (d40 to d315 mm).',
      ar: 'فلانشة مقاومة للتآكل مع غلاف PP مقوى بالألياف وقلب فولاذي صلب وفقاً لـ DIN EN 1092-1.',
    },
    origin: {
      section: { de: 'Zubehör & Flansche', en: 'Accessories & Flanges', ar: 'الملحقات والشفاه' },
      path: { de: 'K-Aqua > Produkte > Zubehör > Flansche', en: 'K-Aqua > Products > Accessories > Flanges', ar: 'K-Aqua > المنتجات > الملحقات > فلانشات' },
    },
    keywords: ['losflansch', 'vorschweißbund', 'flansch', 'backing flange', 'stub end', 'pn16', 'aq575040', 'aq790'],
    href: '/produkte/accessories',
    badge: { de: 'PP-Stahl Flansch', en: 'Backing Flange', ar: 'فلانشة PP' },
    specs: ['Stahlkern mit PP-Ummantelung', 'd40 – d315 mm', 'DIN EN 1092-1 PN 10/16'],
    articleCodes: ['AQ575040', 'AQ575050', 'AQ575063', 'AQ575075', 'AQ575090', 'AQ575110', 'AQ575315'],
  },
  {
    id: 'prod_acc_pipe_clamps',
    category: 'products',
    title: {
      de: 'Schallgedämmte Rohrschellen mit Gummieinlage (Pipe Clamps)',
      en: 'Acoustically Insulated Pipe Clamps with Rubber Lining',
      ar: 'مشابك أنابيب معزولة صوتياً مع بطانة مطاطية',
    },
    description: {
      de: 'Hochwertige Stahl-Rohrschellen mit alterungsbeständigem EPDM-Gummiprofil zur schallentkoppelten Fest- und Gleitpunktbefestigung nach DIN 4109.',
      en: 'Heavy-duty steel pipe clamps with aging-resistant EPDM rubber lining for acoustically isolated fixed and sliding brackets (DIN 4109).',
      ar: 'مشابك أنابيب فولاذية قوية مع بطانة مطاطية EPDM للتثبيت المعزول صوتياً.',
    },
    origin: {
      section: { de: 'Zubehör & Flansche', en: 'Accessories & Flanges', ar: 'الملحقات والشفاه' },
      path: { de: 'K-Aqua > Produkte > Zubehör > Rohrschellen', en: 'K-Aqua > Products > Accessories > Pipe Clamps', ar: 'K-Aqua > المنتجات > الملحقات > مشابك الأنابيب' },
    },
    keywords: ['rohrschelle', 'pipe clamp', 'schallschutz', 'gummieinlage', 'gleitpunkt', 'festpunkt', 'din 4109', 'aq9520'],
    href: '/produkte/accessories',
    badge: { de: 'Rohrschellen', en: 'Pipe Clamps', ar: 'مشابك أنابيب' },
    specs: ['Ø 20 – 200 mm', 'EPDM Schalldämmeinlage', 'M8/M10 Kombimutter'],
    articleCodes: ['AQ9520', 'AQ9525', 'AQ9532', 'AQ9540', 'AQ9550', 'AQ9563', 'AQ95200'],
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
    id: 'tool_bim_cad_gaeb',
    category: 'tools',
    title: {
      de: 'BIM-Daten, Revit-Familien (RFA), IFC & GAEB Ausschreibungstexte',
      en: 'BIM Data, Revit Families (RFA), IFC & GAEB Specifications',
      ar: 'بيانات BIM وعائلات Revit (RFA) و IFC ونصوص مواصفات GAEB',
    },
    description: {
      de: 'Autodesk Revit RFA Familien mit MEP-Konnektoren, IFC 3D-Geometrien, DWG CAD-Bibliothek und standardisierte GAEB XML Ausschreibungstexte.',
      en: 'Autodesk Revit RFA families with MEP connectors, IFC 3D geometries, DWG CAD library, and standardized GAEB XML specification texts.',
      ar: 'عائلات Autodesk Revit RFA مع موصلات MEP ونماذج IFC 3D ونصوص مواصفات GAEB XML القياسية.',
    },
    origin: {
      section: { de: 'Ressourcen & Planung', en: 'Resources & Planning', ar: 'الموارد والتخطيط' },
      path: { de: 'K-Aqua > Ressourcen > Ausschreibungstexte & BIM', en: 'K-Aqua > Resources > Specifications & BIM', ar: 'K-Aqua > الموارد > نصوص المواصفات و BIM' },
    },
    keywords: ['bim', 'revit', 'rfa', 'ifc', 'cad', 'gaeb', 'ausschreibung', 'ausschreibungstext', 'leistungsverzeichnis', '3d', 'tga', 'digital twin'],
    href: '/ressourcen/ausschreibungstexte',
    badge: { de: 'BIM & GAEB', en: 'BIM & Specs', ar: 'BIM والمواصفات' },
    specs: ['Revit 2021–2026', 'IFC 4', 'GAEB 90 / 2000 / XML', '3D STEP / DWG'],
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
      de: 'Hochhausbau & Druckstufen-Steigleitungen (PN 25 / PN 20)',
      en: 'High-Rise Buildings & High-Pressure Riser Systems (PN 25 / PN 20)',
      ar: 'المباني الشاهقة وأنظمة القائم ذات الضغط العالي (PN 25 / PN 20)',
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
    keywords: ['hochhaus', 'steigleitung', 'riser', 'pn25', 'druckstufe', 'skyscraper', 'etagenverteiler', 'druckstoß', 'gewichtsreduktion'],
    href: '/loesungen',
    anchorId: 'hochhaus',
    badge: { de: 'Hochhausbau', en: 'High-Rise', ar: 'مباني شاهقة' },
    specs: ['Bis PN 25 Druckfestigkeit', '75% leichtere Steigstränge', 'Homogene Schweißung'],
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
