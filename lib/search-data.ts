// lib/search-data.ts
// Zentraler Suchindex für die globale K-Aqua Suchfunktion

export interface SearchEntry {
  id: string;
  category: 'products' | 'solutions' | 'markets' | 'knowledge' | 'tools' | 'company';
  title: Record<string, string>; // { de: '...', en: '...', ar: '...' }
  description: Record<string, string>;
  keywords: string[];
  href: string;
  badge?: string;
  articleCodes?: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  // --- PRODUKTE ---
  {
    id: 'prod_pipes',
    category: 'products',
    title: {
      de: 'PP-R & PP-RCT Rohre & Rohrsysteme',
      en: 'PP-R & PP-RCT Pipes & Piping Systems',
      ar: 'أنابيب وأنظمة أنابيب PP-R و PP-RCT',
    },
    description: {
      de: 'Hochleistungs-Faserverbund- und Vollkunststoffrohre für Trinkwasser, Heizung, Kühlung und Industrie (d20 bis d630 mm).',
      en: 'High-performance fiber composite and solid plastic pipes for potable water, heating, cooling, and industry (d20 to d630 mm).',
      ar: 'أنابيب مركبة من الألياف والبلاستيك الصلب عالية الأداء لمياه الشرب والتدفئة والتبريد والصناعة (d20 إلى d630 مم).',
    },
    keywords: ['rohr', 'pipe', 'pp-r', 'pp-rct', 'sdr', 'faserverbund', 'fiber', 'trinkwasser', 'potable water', 'kühlung', 'heating', 'uv'],
    href: '/produkte/pipes',
    badge: 'Produkte',
  },
  {
    id: 'prod_fittings',
    category: 'products',
    title: {
      de: 'PP-R Spritzguss-Formteile & Fittings',
      en: 'PP-R Injection Molded Fittings',
      ar: 'تركيبات وقطع تشكيل PP-R بالحقن',
    },
    description: {
      de: 'Bögen, T-Stücke, Reduzierungen, Muffen und Endkappen für homogene Schweißverbindungen.',
      en: 'Elbows, tees, reducers, sockets, and end caps for homogeneous welded joints.',
      ar: 'أكواع، وصلات تي، مخفضات، جلب وأغطية نهائية للوصلات الملحومة المتجانسة.',
    },
    keywords: ['fitting', 'bogen', 't-stück', 'tee', 'elbow', 'reduzierung', 'muffe', 'formteil', 'socket'],
    href: '/produkte/fittings',
    badge: 'Produkte',
  },
  {
    id: 'prod_valves',
    category: 'products',
    title: {
      de: 'Armaturen & Ventile',
      en: 'Valves & Control Equipment',
      ar: 'الصمامات ومعدات التحكم',
    },
    description: {
      de: 'Kugelhähne, Schrägsitzventile, UP-Ventile und Absperrorgane für Trinkwasser- und Industrieinstallationen.',
      en: 'Ball valves, globe valves, concealed valves, and shut-off units for potable water and industrial piping.',
      ar: 'صمامات كروية، صمامات مائلة، صمامات مخفية ووحدات إغلاق للمنشآت.',
    },
    keywords: ['ventil', 'valve', 'kugelhahn', 'ball valve', 'absperrventil', 'armatur', 'unterputz'],
    href: '/produkte/valves',
    badge: 'Produkte',
  },
  {
    id: 'prod_transition',
    category: 'products',
    title: {
      de: 'Übergangsfittings & Gewindeverbindungen',
      en: 'Transition Fittings & Threaded Connectors',
      ar: 'تجهيزات الانتقال والوصلات الملولبة',
    },
    description: {
      de: 'Hochwertige Übergänge mit entzinkungsbeständigem DZR-Messing für den sicheren Anschluss an metallische Systeme.',
      en: 'High-grade DZR brass transition fittings for secure connection to metallic piping infrastructure.',
      ar: 'تجهيزات انتقال نحاسية DZR عالية الجودة للاتصال الآمن بالأنظمة المعدنية.',
    },
    keywords: ['übergang', 'transition', 'messing', 'brass', 'gewinde', 'thread', 'dzr', 'adapter', 'flansch'],
    href: '/produkte/transition-fittings',
    badge: 'Produkte',
  },
  {
    id: 'prod_tools',
    category: 'products',
    title: {
      de: 'Schweißwerkzeuge & Montagezubehör',
      en: 'Welding Tools & Installation Equipment',
      ar: 'أدوات اللحام ومعدات التركيب',
    },
    description: {
      de: 'Heizelement-Muffenschweißgeräte, Rohrschneider, Schweißdorne und Zubehör für fehlerfreie Baustellenmontage.',
      en: 'Socket welding machines, pipe cutters, heating elements, and equipment for professional site installation.',
      ar: 'ماكينات لحام التوصيل، قواطع الأنابيب، عناصر التسخين ومعدات التركيب الاحترافي.',
    },
    keywords: ['werkzeug', 'tool', 'schweißgerät', 'welding', 'schweißdorn', 'rohrschneider', 'cutter'],
    href: '/produkte/tools',
    badge: 'Werkzeuge',
  },

  // --- TOOLS & RECHNER ---
  {
    id: 'tool_finder',
    category: 'tools',
    title: {
      de: 'Interaktiver Produktfinder',
      en: 'Interactive Product Finder',
      ar: 'محدد المنتجات التفاعلي',
    },
    description: {
      de: 'Filtern Sie das gesamte K-Aqua Sortiment nach Durchmesser, Druckstufe, Material (PP-R/PP-RCT) und Einsatzbereich.',
      en: 'Filter the entire K-Aqua catalog by diameter, pressure class, material, and application.',
      ar: 'تصفية كتالوج K-Aqua بالكامل حسب القطر ومستوى الضغط والمواد والتطبيق.',
    },
    keywords: ['finder', 'suche', 'filter', 'katalog', 'dimension', 'sdr', 'durchmesser', 'pn', 'artikelselektor'],
    href: '/produkte/finder',
    badge: 'Digital Tool',
  },
  {
    id: 'tool_co2',
    category: 'tools',
    title: {
      de: 'CO2-Rechner & Nachhaltigkeitsanalyse',
      en: 'CO2 Calculator & Carbon Footprint Analyzer',
      ar: 'حاسبة ثاني أكسيد الكربون وتحليل الاستدامة',
    },
    description: {
      de: 'Berechnen Sie den ökologischen Fußabdruck und die CO2-Einsparung von K-Aqua PP-R gegenüber metallischen Rohren.',
      en: 'Calculate the environmental footprint and carbon savings of K-Aqua PP-R compared to metallic piping.',
      ar: 'احسب البصمة البيئية وتوفير الكربون لأنابيب K-Aqua مقارنة بالأنظمة المعدنية.',
    },
    keywords: ['co2', 'rechner', 'calculator', 'nachhaltigkeit', 'carbon', 'lca', 'ökobilanz', 'energieeffizienz', 'dämmung'],
    href: '/co2-rechner',
    badge: 'Digital Tool',
  },
  {
    id: 'tool_bim',
    category: 'tools',
    title: {
      de: 'BIM-Daten, CAD & Ausschreibungstexte',
      en: 'BIM Data, CAD Models & Specification Texts',
      ar: 'بيانات BIM ونماذج CAD ونصوص المواصفات',
    },
    description: {
      de: 'Revit-Familien (RFA), IFC-Modelle, GAEB-Ausschreibungstexte und 3D-CAD-Daten für die kollisionsfreie TGA-Planung.',
      en: 'Revit families (RFA), IFC models, GAEB specification texts, and 3D CAD data for clash-free MEP planning.',
      ar: 'عائلات Revit (RFA)، ونماذج IFC، ونصوص مواصفات GAEB، وبيانات 3D CAD للتخطيط بدون تعارضات.',
    },
    keywords: ['bim', 'revit', 'ifc', 'cad', 'ausschreibung', 'gaeb', 'digital twin', 'kollisionsprüfung', 'tga', '3d'],
    href: '/ressourcen/ausschreibungstexte',
    badge: 'BIM / CAD',
  },

  // --- LÖSUNGEN & MÄRKTE ---
  {
    id: 'sol_highrise',
    category: 'solutions',
    title: {
      de: 'Hochhausbau & Steigleitungen',
      en: 'High-Rise Buildings & Riser Systems',
      ar: 'المباني الشاهقة وأنظمة القائم',
    },
    description: {
      de: 'Druckfeste, gewichtsreduzierte Steigstränge und Etagenverteiler für Wolkenkratzer und Großbauten.',
      en: 'Pressure-resistant, lightweight riser pipes and distribution networks for skyscrapers and mega-structures.',
      ar: 'أنابيب صاعدة خفيفة الوزن ومقاومة للضغط لشبكات التوزيع في ناطحات السحاب.',
    },
    keywords: ['hochhaus', 'high-rise', 'steigleitung', 'riser', 'druckfestigkeit', 'pn20', 'pn25', 'druckstufen', 'skyscraper'],
    href: '/loesungen',
    badge: 'Lösungen',
  },
  {
    id: 'sol_hospitals',
    category: 'solutions',
    title: {
      de: 'Krankenhäuser & Hygiene-Installationen',
      en: 'Hospitals & Healthcare Hygiene',
      ar: 'المستشفيات والمنشآت الصحية',
    },
    description: {
      de: 'Totraumfreie Trinkwasserhygiene, Biofilm-Resistenz und Legionellenprävention für sensible medizinische Einrichtungen.',
      en: 'Dead-leg-free potable water hygiene, biofilm resistance, and Legionella prevention for hospitals and clinics.',
      ar: 'نظافة مياه الشرب، ومقاومة البيوفيلم والوقاية من بكتيريا الفيلقية في المنشآت الطبية.',
    },
    keywords: ['krankenhaus', 'hospital', 'hygiene', 'trinkwasser', 'legionellen', 'biofilm', 'totraumfrei', 'gesundheit'],
    href: '/loesungen',
    badge: 'Lösungen',
  },
  {
    id: 'sol_industry',
    category: 'solutions',
    title: {
      de: 'Industrieanlagen & Kühlkreisläufe',
      en: 'Industrial Facilities & Cooling Circuits',
      ar: 'المنشآت الصناعية ودوائر التبريد',
    },
    description: {
      de: 'Chemisch beständige Rohrleitungssysteme für Prozesswasser, Druckluft, Kühlmedien und aggressive Fluide.',
      en: 'Chemically resistant piping systems for process water, compressed air, cooling media, and industrial fluids.',
      ar: 'أنظمة أنابيب مقاومة للمواد الكيميائية لمياه العمليات والهواء المضغوط ووسائط التبريد.',
    },
    keywords: ['industrie', 'industry', 'kühlung', 'cooling', 'chemische beständigkeit', 'prozesswasser', 'druckluft', 'hvac'],
    href: '/loesungen',
    badge: 'Lösungen',
  },
  {
    id: 'sol_datacenters',
    category: 'solutions',
    title: {
      de: 'Rechenzentren (Data Centers)',
      en: 'Data Centers Cooling & Infrastructure',
      ar: 'مراكز البيانات والبنية التحتية',
    },
    description: {
      de: 'Leckagesichere, kondensationsoptimierte Kaltwasserverrohrung für unterbrechungsfreien Serverbetrieb.',
      en: 'Leak-proof, condensation-optimized chilled water piping for continuous mission-critical server cooling.',
      ar: 'أنابيب مياه مبردة مقاومة للتسرب لتبريد الخوادم في مراكز البيانات الحساسة.',
    },
    keywords: ['rechenzentrum', 'data center', 'server', 'kühlung', 'kaltwasser', 'chilled water', 'sicherheit', 'ausfallsicher'],
    href: '/loesungen',
    badge: 'Lösungen',
  },

  // --- WISSEN & ACADEMY ---
  {
    id: 'acad_welding',
    category: 'knowledge',
    title: {
      de: 'Schulungen & Schweißverfahren (Muffen- & Stumpfschweißen)',
      en: 'Trainings & Welding Procedures (Socket & Butt Welding)',
      ar: 'التدريبات وإجراءات اللحام',
    },
    description: {
      de: 'Schritt-für-Schritt Anleitungen zu Heizelement-Muffenschweißen, Stumpfschweißen, Schweißzeiten und DVS-Richtlinien.',
      en: 'Step-by-step guides on socket welding, butt fusion, welding timers, and DVS guidelines.',
      ar: 'أدلة خطوة بخطوة حول لحام المقابس واللحام التناكبي وأوقات اللحام.',
    },
    keywords: ['schweißen', 'welding', 'muffenschweißen', 'stumpfschweißen', 'schulung', 'training', 'dvs', 'anleitung', 'schweißzeiten'],
    href: '/academy',
    badge: 'Academy',
  },
  {
    id: 'acad_standards',
    category: 'knowledge',
    title: {
      de: 'Zertifizierungen & Qualitätsstandards (DVGW, DIN, ISO)',
      en: 'Certifications & Quality Standards (DVGW, DIN, ISO)',
      ar: 'الشهادات ومعايير الجودة (DVGW, DIN, ISO)',
    },
    description: {
      de: 'Prüfzeugnisse, DVGW-Zertifizierung, DIN EN ISO 15874 Konformität und deutsches Qualitätsmanagement.',
      en: 'Test certificates, DVGW certification, DIN EN ISO 15874 compliance, and German manufacturing quality assurance.',
      ar: 'شهادات الاختبار، وشهادة DVGW، والتوافق مع DIN EN ISO 15874 وضمان الجودة.',
    },
    keywords: ['zertifikat', 'certificate', 'dvgw', 'din', 'iso', '15874', 'qualität', 'prüfung', 'trinkwasserzulassung', 'hygiene'],
    href: '/trust-center',
    badge: 'Qualität',
  },

  // --- UNTERNEHMEN & SUPPORT ---
  {
    id: 'comp_about',
    category: 'company',
    title: {
      de: 'Über K-Aqua: Deutsches Ingenieurwesen & Geschäftsführung',
      en: 'About K-Aqua: German Engineering & Leadership',
      ar: 'عن K-Aqua: الهندسة الألمانية والإدارة',
    },
    description: {
      de: 'Erfahren Sie mehr über die K-Aqua Geschäftsführung (Philipp Nickel, Marcello Gallio), Firmengeschichte und Werte.',
      en: 'Learn more about K-Aqua leadership (Philipp Nickel, Marcello Gallio), company history, and values.',
      ar: 'تعرف على قيادة K-Aqua (Philipp Nickel, Marcello Gallio) وتاريخ الشركة وقيمها.',
    },
    keywords: ['unternehmen', 'company', 'über uns', 'about', 'philipp nickel', 'marcello gallio', 'inhaber', 'leadership', 'deutschland'],
    href: '/unternehmen',
    badge: 'Unternehmen',
  },
  {
    id: 'comp_contact',
    category: 'company',
    title: {
      de: 'Kontakt & Technische Beratung',
      en: 'Contact & Technical Consulting',
      ar: 'الاتصال والاستشارات الفنية',
    },
    description: {
      de: 'Nehmen Sie direkten Kontakt zu unserem Ingenieur- und Vertriebsteam auf für Projektanfragen und Ausschreibungsberatung.',
      en: 'Direct contact with our engineering and sales teams for project quotes and specification advice.',
      ar: 'تواصل مباشرة مع فرق الهندسة والمبيعات لدينا لاستفسارات المشاريع.',
    },
    keywords: ['kontakt', 'contact', 'anfrage', 'rfq', 'angebot', 'support', 'telefon', 'e-mail', 'vertrieb'],
    href: '/kontakt',
    badge: 'Kontakt',
  },
];
