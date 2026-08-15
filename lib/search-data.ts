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
  // 1. PRODUKTE & SYSTEME (Pipes, Fittings, Valves, Tools, Saddles, Accs)
  // =========================================================================
  {
    id: 'prod_pipes_fiber_rct_74',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-RCT SDR 7.4 (Faserverbundrohr)',
      en: 'K-Fiber Pipe PP-RCT SDR 7.4 (Fiber Composite Pipe)',
      ar: 'أنبوب K-Fiber PP-RCT SDR 7.4 (أنبوب مركب من الألياف)',
    },
    description: {
      de: 'Hochleistungs-Faserverbundrohr mit modifizierter Kristallstruktur (PP-RCT) für Heißwasser, Kühlung und Trinkwasser. 75 % reduzierte Längenausdehnung.',
      en: 'High-performance fiber composite pipe with modified crystalline structure (PP-RCT) for hot water, cooling, and potable water. 75% reduced thermal expansion.',
      ar: 'أنبوب مركب عالي الأداء بالألياف مع بنية بلورية معدلة (PP-RCT) للمياه الساخنة والتبريد ومياه الشرب. تمدد حراري منخفض بنسبة 75٪.',
    },
    origin: {
      section: { de: 'Rohre & Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-RCT SDR 7.4', en: 'K-Aqua > Products > Pipes > PP-RCT SDR 7.4', ar: 'K-Aqua > المنتجات > الأنابيب > PP-RCT SDR 7.4' },
    },
    keywords: ['pp-rct', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'heißwasser', 'kühlwasser', 'steigstrang', 'k-fiber', 'rohr', 'pipe', 'längenausdehnung'],
    href: '/produkte/pipes',
    anchorId: 'pipes-rct',
    badge: { de: 'PP-RCT Rohr', en: 'PP-RCT Pipe', ar: 'أنبوب PP-RCT' },
    specs: ['PP-RCT + Glasfaser', 'SDR 7.4', 'd20 – d250 mm', 'PN 20 / PN 25', 'DIN 8077/8078', 'DIN EN ISO 15874'],
    articleCodes: ['AQ200F20', 'AQ200F25', 'AQ200F32', 'AQ200F40', 'AQ200F50', 'AQ200F63', 'AQ200F75', 'AQ200F90', 'AQ200F110', 'AQ200F125'],
  },
  {
    id: 'prod_pipes_fiber_r_74',
    category: 'products',
    title: {
      de: 'K-Fiber Pipe PP-R SDR 7.4 (Faserverbundrohr)',
      en: 'K-Fiber Pipe PP-R SDR 7.4 (Fiber Composite Pipe)',
      ar: 'أنبوب K-Fiber PP-R SDR 7.4 (أنبوب مركب من الألياف)',
    },
    description: {
      de: 'Dreischichtiges Faserverbundrohr aus Polypropylen Random-Copolymer mit Glasfaserkern für Warmwasser- und Heizungsnetze.',
      en: 'Three-layer fiber composite pipe made from polypropylene random copolymer with glass fiber core for hot water and heating networks.',
      ar: 'أنبوب مركب من ثلاث طبقات من البولي بروبيلين مع قلب من الألياف الزجاجية لشبكات المياه الساخنة والتدفئة.',
    },
    origin: {
      section: { de: 'Rohre & Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 7.4', en: 'K-Aqua > Products > Pipes > PP-R SDR 7.4', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 7.4' },
    },
    keywords: ['pp-r', 'faserverbund', 'fiber pipe', 'sdr 7.4', 'glasfaser', 'warmwasser', 'heizung', 'rohr', 'pipe'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R Faser', en: 'PP-R Fiber', ar: 'ألياف PP-R' },
    specs: ['PP-R 100 + Glasfaser', 'SDR 7.4', 'd20 – d50 mm', 'PN 20', 'DIN 8077/8078'],
    articleCodes: ['AQ207PF20', 'AQ207PF25', 'AQ207PF32', 'AQ207PF40', 'AQ207PF50'],
  },
  {
    id: 'prod_pipes_fiber_uv',
    category: 'products',
    title: {
      de: 'K-Fiber UV Pipe PP-R & PP-RCT (UV-beständiges Rohr)',
      en: 'K-Fiber UV Pipe PP-R & PP-RCT (UV-Resistant Pipe)',
      ar: 'أنبوب K-Fiber UV من PP-R و PP-RCT (مقاوم للأشعة فوق البنفسجية)',
    },
    description: {
      de: 'UV-resistentes Faserverbundrohr mit coextrudierter schwarzer Schutzschicht für Freiverlegung im Außenbereich, Dachzentralen und solarthermische Anbindungen.',
      en: 'UV-resistant fiber composite pipe with co-extruded black protective layer for outdoor rooftop installations and solar thermal connections.',
      ar: 'أنبوب مركب مقاوم للأشعة فوق البنفسجية مع طبقة حماية سوداء مقذوفة للتركيب الخارجي على الأسطح.',
    },
    origin: {
      section: { de: 'Rohre & Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > UV-Rohre', en: 'K-Aqua > Products > Pipes > UV Pipes', ar: 'K-Aqua > المنتجات > الأنابيب > أنابيب UV' },
    },
    keywords: ['uv', 'uv-beständig', 'außenbereich', 'dachzentrale', 'solar', 'freiverlegung', 'sonnenschutz', 'outdoor', 'k-fiber uv'],
    href: '/produkte/pipes',
    badge: { de: 'UV-Schutz', en: 'UV-Proof', ar: 'حماية UV' },
    specs: ['UV-stabilisiert', 'SDR 7.4', 'd20 – d50 mm', 'Dauerhaft wetterfest'],
    articleCodes: ['AQ200PFUV20', 'AQ200PFUV25', 'AQ200PFUV32', 'AQ200PFUV40', 'AQ200PFUV50'],
  },
  {
    id: 'prod_pipes_solid_sdr6',
    category: 'products',
    title: {
      de: 'K-Pipe PP-R SDR 6 Vollkunststoffrohr',
      en: 'K-Pipe PP-R SDR 6 Solid Plastic Pipe',
      ar: 'أنبوب K-Pipe PP-R SDR 6 من البلاستيك الصلب',
    },
    description: {
      de: 'Extrem druckfestes Vollwand-Polypropylenrohr für Kalt- und Warmwasser sowie anspruchsvolle Sanitärinstallationen mit PN 20 Druckstufe.',
      en: 'Extremely pressure-resistant solid-wall polypropylene pipe for cold and hot water as well as demanding sanitary installations (PN 20).',
      ar: 'أنبوب بولي بروبيلين صلب الجدار عالي المقاومة للضغط لمياه الشرب الساخنة والباردة (PN 20).',
    },
    origin: {
      section: { de: 'Rohre & Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > PP-R SDR 6', en: 'K-Aqua > Products > Pipes > PP-R SDR 6', ar: 'K-Aqua > المنتجات > الأنابيب > PP-R SDR 6' },
    },
    keywords: ['sdr 6', 'pn20', 'vollwand', 'trinkwasser', 'sanitär', 'kaltwasser', 'druckfest', 'k-pipe'],
    href: '/produkte/pipes',
    badge: { de: 'PP-R SDR 6', en: 'PP-R SDR 6', ar: 'PP-R SDR 6' },
    specs: ['PP-R 100', 'SDR 6', 'd20 – d50 mm', 'PN 20', 'DIN 8077/8078'],
    articleCodes: ['AQ200P20', 'AQ200P25', 'AQ200P32', 'AQ200P40', 'AQ200P50'],
  },
  {
    id: 'prod_pipes_clima_rct_11',
    category: 'products',
    title: {
      de: 'K-Fiberclima Pipe PP-RCT SDR 11 (Klima- & Kälteleitungen)',
      en: 'K-Fiberclima Pipe PP-RCT SDR 11 (Chilled Water & HVAC)',
      ar: 'أنبوب K-Fiberclima PP-RCT SDR 11 (التكييف ومياه التبريد)',
    },
    description: {
      de: 'Optimiert für maximale Durchflussmengen bei Kühldecken, Fan-Coils, Kaltwasserleitungen und industriellen Kühlkreisläufen. Größerer Rohrinnenquerschnitt.',
      en: 'Optimized for maximum flow rates in chilled ceilings, fan coils, chilled water piping, and industrial cooling loops. Larger internal diameter.',
      ar: 'مُحسَّن لتحقيق أقصى معدلات تدفق في أسقف التبريد وملفات المروحة وشبكات المياه المبردة الصناعية.',
    },
    origin: {
      section: { de: 'Rohre & Rohrsysteme', en: 'Piping Systems', ar: 'أنظمة الأنابيب' },
      path: { de: 'K-Aqua > Produkte > Rohre > K-Fiberclima SDR 11', en: 'K-Aqua > Products > Pipes > K-Fiberclima SDR 11', ar: 'K-Aqua > المنتجات > الأنابيب > K-Fiberclima SDR 11' },
    },
    keywords: ['clima', 'klima', 'kaltwasser', 'chilled water', 'sdr 11', 'pp-rct', 'durchfluss', 'hvac', 'kühldecke'],
    href: '/produkte/pipes',
    badge: { de: 'Klima & Kühlung', en: 'HVAC & Chilled', ar: 'تكييف وتبريد' },
    specs: ['PP-RCT + Faser', 'SDR 11', 'd20 – d50 mm', 'Geringer Druckverlust'],
    articleCodes: ['AQ160F20', 'AQ160F25', 'AQ160F32', 'AQ160F40', 'AQ160F50'],
  },
  {
    id: 'prod_fittings_elbows',
    category: 'products',
    title: {
      de: 'PP-R Spritzguss-Bögen & Winkel (45° & 90°)',
      en: 'PP-R Injection Molded Elbows & Bends (45° & 90°)',
      ar: 'أكواع وزوايا تشكيل بالحقن PP-R (45 و 90 درجة)',
    },
    description: {
      de: 'Strömungsoptimierte Winkel 90° und 45° (Muffe/Muffe und Muffe/Stutzen) für homogene Heizelement-Muffenschweißung ohne Querschnittsverengung.',
      en: 'Flow-optimized 90° and 45° elbows (socket/socket and male/female) for homogeneous thermofusion socket welding.',
      ar: 'أكواع مصممة لتحسين التدفق بزاوية 90 و 45 درجة للحام الحراري المتجانس.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > Winkel & Bögen', en: 'K-Aqua > Products > Fittings > Elbows & Bends', ar: 'K-Aqua > المنتجات > الوصلات > الأكواع' },
    },
    keywords: ['winkel', 'bogen', 'elbow', '45 grad', '90 grad', 'muffe', 'formteil', 'fitting', 'schweißen'],
    href: '/produkte/fittings',
    badge: { de: 'Spritzguss-Fitting', en: 'Molded Fitting', ar: 'وصلة بالحقن' },
    specs: ['PP-R 100', 'd20 – d125 mm', 'DIN 16962', 'DVGW zertifiziert'],
    articleCodes: ['AQ09020', 'AQ09025', 'AQ09032', 'AQ04520', 'AQ04525', 'AQ04532', 'AQ09120', 'AQ04120'],
  },
  {
    id: 'prod_fittings_tees_reducers',
    category: 'products',
    title: {
      de: 'PP-R T-Stücke, Reduzierungen & Muffen',
      en: 'PP-R Tees, Reducing Tees, Reducers & Sockets',
      ar: 'محملات تي ومخفضات وجلب من PP-R',
    },
    description: {
      de: 'Egal-T-Stücke, reduzierte T-Stücke, konzentrische Reduzierungen, Verbindungsmuffen und Endkappen für homogene, dauerhafte Rohrverbindungen.',
      en: 'Equal tees, reducing tees, concentric reducers, sockets, and end caps for permanent, leak-free pipe routing.',
      ar: 'محملات تي متساوية ومخفضة ومخفضات متحدة المركز وجلب وأغطية نهائية.',
    },
    origin: {
      section: { de: 'Fittings & Formteile', en: 'Fittings & Molded Parts', ar: 'الوصلات وقطع التشكيل' },
      path: { de: 'K-Aqua > Produkte > Fittings > T-Stücke & Reduzierungen', en: 'K-Aqua > Products > Fittings > Tees & Reducers', ar: 'K-Aqua > المنتجات > الوصلات > المحملات والمخفضات' },
    },
    keywords: ['t-stück', 'tee', 'reduzierung', 'reducer', 'muffe', 'socket', 'endkappe', 'cap', 'fitting'],
    href: '/produkte/fittings',
    badge: { de: 'Fittings', en: 'Fittings', ar: 'وصلات' },
    specs: ['PP-R 100', 'd20 – d125 mm', 'Molekular verschweißt'],
    articleCodes: ['AQ13020', 'AQ13025', 'AQ13032', 'AQ2432520', 'AQ27020', 'AQ27025', 'AQ30120'],
  },
  {
    id: 'prod_transition_fittings',
    category: 'products',
    title: {
      de: 'Übergangsfittings mit DZR-Messing-Gewinde (IG / AG)',
      en: 'Transition Fittings with DZR Brass Threads (Female / Male)',
      ar: 'وصلات انتقال مع سن نحاسي DZR (داخلي وخارجي)',
    },
    description: {
      de: 'Übergangsmuffen, Übergangswinkel, Deckenwinkel und Verschraubungen mit eingegossenem, entzinkungsbeständigem DZR-Messing für metallische Schnittstellen.',
      en: 'Adaptor sockets, elbows, wall brackets, and unions with integrated dezincification-resistant DZR brass inserts for metal interfaces.',
      ar: 'مقابس انتقال وأكواع وأقواس جدارية مع حشوات نحاسية DZR مقاومة لإزالة الزنك.',
    },
    origin: {
      section: { de: 'Übergangsfittings', en: 'Transition Fittings', ar: 'وصلات الانتقال' },
      path: { de: 'K-Aqua > Produkte > Übergänge > DZR Messing', en: 'K-Aqua > Products > Transitions > DZR Brass', ar: 'K-Aqua > المنتجات > وصلات الانتقال > نحاس DZR' },
    },
    keywords: ['übergang', 'transition', 'messing', 'brass', 'dzr', 'gewinde', 'innengewinde', 'außengewinde', 'verschraubung', 'deckenwinkel'],
    href: '/produkte/transition-fittings',
    badge: { de: 'DZR Messing', en: 'DZR Brass', ar: 'نحاس DZR' },
    specs: ['Entzinkungsbeständiges Messing (CuZn39Pb3 / CW617N)', 'Rp / R Gewinde', 'd20 – d125 mm', 'KTW-BWGL konform'],
    articleCodes: ['AQ24RP20', 'AQ24R20', 'AQ09RP20', 'AQ09BRP20', 'AQ71RP20', 'AQ70RP20'],
  },
  {
    id: 'prod_valves',
    category: 'products',
    title: {
      de: 'PP-R Kugelhähne, Absperrventile & Unterputzarmaturen',
      en: 'PP-R Ball Valves, Stop Valves & Concealed Valves',
      ar: 'صمامات كروية وصمامات إغلاق وصمامات مخفية من PP-R',
    },
    description: {
      de: 'PP-R Kugelhähne mit Messingkugel oder Vollkunststoff-Kugel, Geradsitzventile und elegante Unterputzventile mit Chrom-Bediengriff.',
      en: 'PP-R ball valves with brass or PP ball, straight seat valves, and elegant concealed valves with chrome handle.',
      ar: 'صمامات كروية PP-R مع كرة نحاسية أو بلاستيكية بالكامل، وصمامات مقعد مستقيم وصمامات مخفية أنيقة بمقبض كروم.',
    },
    origin: {
      section: { de: 'Armaturen & Ventile', en: 'Valves & Flow Control', ar: 'الصمامات والتحكم بالتدفق' },
      path: { de: 'K-Aqua > Produkte > Ventile > Kugelhähne & Armaturen', en: 'K-Aqua > Products > Valves > Ball Valves', ar: 'K-Aqua > المنتجات > الصمامات > صمامات كروية' },
    },
    keywords: ['ventil', 'valve', 'kugelhahn', 'ball valve', 'unterputz', 'concealed', 'absperrventil', 'geradsitzventil', 'armatur'],
    href: '/produkte/valves',
    badge: { de: 'Armaturen', en: 'Valves', ar: 'صمامات' },
    specs: ['PP-R Gehäuse', 'Messing- oder PP-Kugel', 'd20 – d90 mm', 'Wartungsfrei', '100% leckagegeprüft'],
    articleCodes: ['AQ60020', 'AQ60025', 'AQ50020', 'AQ62993', 'AQ62992', 'AQ62591'],
  },
  {
    id: 'prod_weld_in_saddles',
    category: 'products',
    title: {
      de: 'Einschweißsättel (Weld-in Saddles) für Verteiler & Abzweige',
      en: 'Weld-in Saddles for Custom Manifolds & Branch Lines',
      ar: 'سروج اللحام لمشعبات التوزيع والخطوط الفرعية',
    },
    description: {
      de: 'Kosteneffiziente, zeitsparende Einschweißsättel zur Realisierung von nachträglichen Abgängen und individuellen Heizungs-/Sanitärverteilern.',
      en: 'Cost-efficient, time-saving weld-in saddles for creating post-installation branches and customized distribution manifolds.',
      ar: 'سروج لحام فعالة من حيث التكلفة لتنفيذ الفروع اللاحقة ومشعبات التوزيع المخصصة.',
    },
    origin: {
      section: { de: 'Einschweißsättel', en: 'Weld-in Saddles', ar: 'سروج اللحام' },
      path: { de: 'K-Aqua > Produkte > Einschweißsättel', en: 'K-Aqua > Products > Weld-in Saddles', ar: 'K-Aqua > المنتجات > سروج اللحام' },
    },
    keywords: ['einschweißsattel', 'weld-in saddle', 'verteiler', 'abzweig', 'manifold', 'sattel', 'abgang', 'bohren'],
    href: '/produkte/weld-in-saddles',
    badge: { de: 'Satteltechnik', en: 'Saddle Welding', ar: 'تقنية السرج' },
    specs: ['Hauptrohr d40 – d250 mm', 'Abzweig d20 – d63 mm', 'Optional mit Messinggewinde'],
    articleCodes: ['AQ1505406320', 'AQ270S406332', 'AQ243S406334'],
  },
  {
    id: 'prod_tools_welding',
    category: 'products',
    title: {
      de: 'Heizelement-Muffenschweißgeräte & Baustellen-Werkzeuge',
      en: 'Socket Fusion Welding Machines & Site Tools',
      ar: 'ماكينات لحام المقابس وأدوات مواقع البناء',
    },
    description: {
      de: 'Komplette Handschweißgeräte-Sets 20-32 mm / 20-63 mm / 50-125 mm, PTFE-beschichtete Schweißdorne, Rohrabschneider und Reparaturstopfen.',
      en: 'Complete hand welding machine sets 20-32 mm / 20-63 mm / 50-125 mm, PTFE-coated dies, pipe cutters, and repair plugs.',
      ar: 'مجموعات ماكينات لحام يدوية كاملة 20-32 مم / 20-63 مم، وقوالب تسخين مطلية بـ PTFE وقواطع أنابيب.',
    },
    origin: {
      section: { de: 'Werkzeuge & Montage', en: 'Tools & Equipment', ar: 'الأدوات ومعدات التركيب' },
      path: { de: 'K-Aqua > Produkte > Werkzeuge > Schweißgeräte', en: 'K-Aqua > Products > Tools > Welding Machines', ar: 'K-Aqua > المنتجات > الأدوات > ماكينات اللحام' },
    },
    keywords: ['schweißgerät', 'welding machine', 'muffenschweißen', 'schweißdorn', 'rohrschneider', 'reparaturstopfen', 'cutter', 'werkzeug', 'tool'],
    href: '/produkte/tools',
    badge: { de: 'Schweißtechnik', en: 'Welding Tools', ar: 'أدوات اللحام' },
    specs: ['230 V', 'Präzise Temperaturregelung 260 °C', 'DVS 2207-11 Konformität'],
    articleCodes: ['AQ98032', 'AQ98063', 'AQ985125', 'AQ97040', 'AQ975125', 'AQ96557', 'AQ98220'],
  },

  // =========================================================================
  // 2. DIGITALE TOOLS & PLANUNGSHILFEN (CO2, Finder, BIM, GAEB, Support)
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
  // 3. ANWENDUNGEN & BRANCHENLÖSUNGEN (Solutions)
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
  // 4. WISSEN & 50 FACHARTIKEL (Whitepapers, Normen, Akustik, Brandschutz etc.)
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
    href: '/news/trinkwasserhygiene-legionellen',
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
    href: '/news/brandschutz-feuerwiderstandsklasse',
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
    href: '/news/schweisstechnik-sicherheit',
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
    href: '/news/lebenszykluskosten-tco',
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
    href: '/news/messing-polypropylen',
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
    href: '/news/druckverlust-stroemungsdynamik',
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
  // 5. UNTERNEHMEN, VERTRIEBSNETZ, TRUST & SERVICE (Company)
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
