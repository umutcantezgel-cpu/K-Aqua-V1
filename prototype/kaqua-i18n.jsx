// K-Aqua i18n — 12 locales, RTL-aware. Brand claims ("Leading in Water Supply") stay EN.
const K_LANGS = [
  { id: 'de', name: 'Deutsch', dir: 'ltr' },
  { id: 'en', name: 'English', dir: 'ltr' },
  { id: 'ar', name: 'العربية', dir: 'rtl' },
  { id: 'fr', name: 'Français', dir: 'ltr' },
  { id: 'es', name: 'Español', dir: 'ltr' },
  { id: 'it', name: 'Italiano', dir: 'ltr' },
  { id: 'pt', name: 'Português', dir: 'ltr' },
  { id: 'nl', name: 'Nederlands', dir: 'ltr' },
  { id: 'pl', name: 'Polski', dir: 'ltr' },
  { id: 'tr', name: 'Türkçe', dir: 'ltr' },
  { id: 'ru', name: 'Русский', dir: 'ltr' },
  { id: 'zh', name: '中文', dir: 'ltr' },
];

const K_I18N = {
de: {
  nav: { home: 'Start', products: 'Produkte', finder: 'Produktfinder', co2: 'CO₂-Rechner', markets: 'Märkte', trust: 'Trust Center', contact: 'Kontakt', quote: 'Angebot anfragen', menu: 'Menü', lang: 'Sprache' },
  groups: { tools: 'Produkte & Tools', knowledge: 'Wissen & Vertrauen', company: 'Unternehmen' },
  pages: {
    products: ['Produktsystem', 'PP-R/PP-RCT Überblick, d20–d630'], finder: ['Produktfinder', 'Live filtern statt PDF wälzen'],
    co2: ['CO₂-Rechner', 'Vergleich vs. Kupfer, Stahl, PVC'], solutions: ['Materialvorteile', 'Warum Polypropylen'],
    academy: ['Academy', 'Schweiß-Videos + Meister-Quiz'], trust: ['Trust Center', 'ISO, GENAU, RFP-Paket'],
    service: ['Service & Downloads', 'Kataloge und Unterlagen'], partner: ['KESSEL-Partnerschaft', 'Zwei Marken, eine Haltung'],
    markets: ['Märkte & Standorte', 'Interaktive Welt, 27 lokale Seiten'], references: ['Referenz-Globus', 'Projekte weltweit, interaktiv'],
    about: ['Über uns', 'KWT GmbH & GENAU-System'], career: ['Karriere', 'Benefits-Rechner & Culture Match'],
    news: ['News & Events', 'Dreifach ISO-zertifiziert'], contact: ['Kontakt', 'Vertrieb & Support'],
    rfq: ['Projektanfrage', 'Angebot in vier Schritten'],
  },
  home: {
    chip: 'zertifiziert seit Oktober 2025',
    h1a: 'Führend in der', h1b: 'Wasserversorgung.',
    globeAria: 'Interaktiver Globus — ziehen zum Drehen',
    scrolly: [
      { t: 'Gefertigt in Deutschland', d: 'Entwicklung und Produktion am Standort Waldsolms — jedes Rohr, jedes Formteil.' },
      { t: 'd20 bis d630', d: 'Ein vollständiges System: fünf Druckstufen, Formteile, Armaturen und Schweißtechnik.' },
      { t: 'Dreifach zertifiziert', d: 'ISO 9001, 14001 und 50001 — Qualität, Umwelt und Energie aus einem Managementsystem.' },
      { t: '27 Märkte weltweit', d: 'Von Frankfurt bis NEOM: geprüft gegen die Normen und Wasserprofile vor Ort.' },
    ],
    lead: 'K-Aqua entwickelt und fertigt PP-R/PP-RCT-Rohrsysteme für Trinkwasser — von 20 bis 630 mm, in Partnerschaft mit dem Premiumhersteller KESSEL.',
    ctaProducts: 'Produktsystem entdecken', ctaContact: 'Kontakt aufnehmen',
    toolsEyebrow: 'Interaktive Werkzeuge', toolsTitle1: 'Keine Textwüste.', toolsTitle2: 'Werkzeuge.',
    toolsLead: 'Die Website arbeitet für Sie: filtern, rechnen, lernen.',
    bandTitle: 'Bereit für die nächste Generation der Wasserversorgung?',
    bandLead: 'Sprechen Sie mit unserem Vertriebsteam über Ihr Projekt — von der Planung bis zur Schweißtechnik.',
    bandBtn: 'Jetzt Kontakt aufnehmen', bandBtn2: 'Downloads & Service',
  },
  geo: {
    eyebrow: 'Märkte & Standorte', title1: 'Eine Welt voller', title2: 'Märkten.',
    lead: '{n} Märkte in {c} Ländern — jeder mit eigener Landingpage: Normen, Wasserprofil, Anwendungsfälle, Logistik. Greifen Sie die Welt und drehen Sie sie frei; die Liste fliegt Sie punktgenau zur Stadt.',
    all: 'Alle', cityTitle: 'PP-R/PP-RCT Rohrsysteme in {city}.', cityLead: 'Trinkwassersysteme d20–d630, geprüft gegen die Anforderungen vor Ort —',
    allMarkets: 'Alle Märkte', request: 'Projekt anfragen', finder: 'Produktfinder', fromPlant: 'km ab Werk Waldsolms',
    regFrame: 'Regulatorischer Rahmen', water: 'Wasserprofil & Materialantwort', typical: 'Typische Projekte in {city}',
    onSite: 'Verarbeitung vor Ort', onSiteText: 'Schweißtechnik-Einweisung und Videodokumentation für Ihre Kolonne — in der Academy.',
    toAcademy: 'Zur Academy', nearbyEyebrow: 'Verwandte Märkte', nearby: 'In der Nähe.',
  },
  footer: {
    tagline: 'K-Aqua — führend in der Wasserversorgung. PP-R/PP-RCT-Rohrsysteme für Trinkwasser, gefertigt von der KWT GmbH in Waldsolms.',
    colTools: 'Produkte & Tools', colCompany: 'Unternehmen', colContact: 'Kontakt', directions: 'Anfahrt & Standort',
    rights: 'Alle Rechte vorbehalten.', imprint: 'Impressum', privacy: 'Datenschutz',
  },
},
en: {
  nav: { home: 'Home', products: 'Products', finder: 'Product Finder', co2: 'CO₂ Calculator', markets: 'Markets', trust: 'Trust Center', contact: 'Contact', quote: 'Request a quote', menu: 'Menu', lang: 'Language' },
  groups: { tools: 'Products & Tools', knowledge: 'Knowledge & Trust', company: 'Company' },
  pages: {
    products: ['Product System', 'PP-R/PP-RCT overview, d20–d630'], finder: ['Product Finder', 'Filter live instead of browsing PDFs'],
    co2: ['CO₂ Calculator', 'Compare vs. copper, steel, PVC'], solutions: ['Material Benefits', 'Why polypropylene'],
    academy: ['Academy', 'Welding videos + master quiz'], trust: ['Trust Center', 'ISO, GENAU, RFP package'],
    service: ['Service & Downloads', 'Catalogues and documents'], partner: ['KESSEL Partnership', 'Two brands, one attitude'],
    markets: ['Markets & Locations', 'Interactive world, 27 local pages'], references: ['Reference Globe', 'Projects worldwide, interactive'],
    about: ['About Us', 'KWT GmbH & GENAU system'], career: ['Careers', 'Benefits calculator & culture match'],
    news: ['News & Events', 'Triple ISO certified'], contact: ['Contact', 'Sales & support'],
    rfq: ['Project Enquiry', 'A quote in four steps'],
  },
  home: {
    chip: 'certified since October 2025',
    h1a: 'Leading in', h1b: 'Water Supply.',
    globeAria: 'Interactive globe — drag to rotate',
    scrolly: [
      { t: 'Made in Germany', d: 'Engineering and production in Waldsolms — every pipe, every fitting.' },
      { t: 'd20 to d630', d: 'One complete system: five pressure ratings, fittings, valves and welding technology.' },
      { t: 'Triple certified', d: 'ISO 9001, 14001 and 50001 — quality, environment and energy in one management system.' },
      { t: '27 markets worldwide', d: 'From Frankfurt to NEOM: validated against local standards and water profiles.' },
    ],
    lead: 'K-Aqua develops and manufactures PP-R/PP-RCT piping systems for drinking water — from 20 to 630 mm, in partnership with premium manufacturer KESSEL.',
    ctaProducts: 'Explore the product system', ctaContact: 'Get in touch',
    toolsEyebrow: 'Interactive Tools', toolsTitle1: 'No walls of text.', toolsTitle2: 'Tools.',
    toolsLead: 'The website works for you: filter, calculate, learn.',
    bandTitle: 'Ready for the next generation of water supply?',
    bandLead: 'Talk to our sales team about your project — from planning to welding technology.',
    bandBtn: 'Contact us now', bandBtn2: 'Downloads & Service',
  },
  geo: {
    eyebrow: 'Markets & Locations', title1: 'A world full of', title2: 'markets.',
    lead: '{n} markets in {c} countries — each with its own landing page: standards, water profile, use cases, logistics. Grab the world and spin it freely; the list flies you straight to the city.',
    all: 'All', cityTitle: 'PP-R/PP-RCT piping systems in {city}.', cityLead: 'Drinking water systems d20–d630, validated against local requirements —',
    allMarkets: 'All markets', request: 'Request a project', finder: 'Product Finder', fromPlant: 'km from Waldsolms plant',
    regFrame: 'Regulatory Framework', water: 'Water Profile & Material Response', typical: 'Typical projects in {city}',
    onSite: 'On-site Processing', onSiteText: 'Welding instruction and video documentation for your crew — in the Academy.',
    toAcademy: 'To the Academy', nearbyEyebrow: 'Related Markets', nearby: 'Nearby.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. PP-R/PP-RCT piping systems for drinking water, made by KWT GmbH in Waldsolms, Germany.',
    colTools: 'Products & Tools', colCompany: 'Company', colContact: 'Contact', directions: 'Directions & Location',
    rights: 'All rights reserved.', imprint: 'Imprint', privacy: 'Privacy',
  },
},
ar: {
  nav: { home: 'الرئيسية', products: 'المنتجات', finder: 'باحث المنتجات', co2: 'حاسبة CO₂', markets: 'الأسواق', trust: 'مركز الثقة', contact: 'اتصل بنا', quote: 'اطلب عرضًا', menu: 'القائمة', lang: 'اللغة' },
  groups: { tools: 'المنتجات والأدوات', knowledge: 'المعرفة والثقة', company: 'الشركة' },
  pages: {
    products: ['نظام المنتجات', 'نظرة عامة PP-R/PP-RCT، قطر 20–630'], finder: ['باحث المنتجات', 'تصفية مباشرة بدلاً من ملفات PDF'],
    co2: ['حاسبة CO₂', 'مقارنة مع النحاس والفولاذ وPVC'], solutions: ['مزايا المواد', 'لماذا البولي بروبيلين'],
    academy: ['الأكاديمية', 'فيديوهات اللحام + اختبار الإتقان'], trust: ['مركز الثقة', 'ISO وGENAU وحزمة المناقصات'],
    service: ['الخدمة والتنزيلات', 'الكتالوجات والمستندات'], partner: ['شراكة KESSEL', 'علامتان، موقف واحد'],
    markets: ['الأسواق والمواقع', 'عالم تفاعلي، 27 صفحة محلية'], references: ['كرة المراجع', 'مشاريع حول العالم'],
    about: ['من نحن', 'KWT GmbH ونظام GENAU'], career: ['الوظائف', 'حاسبة المزايا وتوافق الثقافة'],
    news: ['الأخبار والفعاليات', 'معتمدون بثلاث شهادات ISO'], contact: ['اتصل بنا', 'المبيعات والدعم'],
    rfq: ['طلب مشروع', 'عرض في أربع خطوات'],
  },
  home: {
    chip: 'معتمدون منذ أكتوبر 2025',
    h1a: 'الريادة في', h1b: 'إمدادات المياه.',
    globeAria: 'كرة أرضية تفاعلية — اسحب للتدوير',
    scrolly: [
      { t: 'صُنع في ألمانيا', d: 'التطوير والإنتاج في فالدزولمس — كل أنبوب وكل وصلة.' },
      { t: 'من d20 إلى d630', d: 'نظام متكامل: خمس درجات ضغط ووصلات وصمامات وتقنية لحام.' },
      { t: 'شهادات ثلاثية', d: 'ISO 9001 ب14001 ب50001 — الجودة والبيئة والطاقة في نظام إدارة واحد.' },
      { t: '27 سوقًا حول العالم', d: 'من فرانكفورت إلى نيوم: مطابقة للمعايير وخصائص المياه المحلية.' },
    ],
    lead: 'تطوّر K-Aqua وتصنّع أنظمة أنابيب PP-R/PP-RCT لمياه الشرب — من 20 إلى 630 مم، بالشراكة مع الشركة الرائدة KESSEL.',
    ctaProducts: 'اكتشف نظام المنتجات', ctaContact: 'تواصل معنا',
    toolsEyebrow: 'أدوات تفاعلية', toolsTitle1: 'لا جدران نصوص.', toolsTitle2: 'أدوات.',
    toolsLead: 'الموقع يعمل من أجلك: تصفية وحساب وتعلّم.',
    bandTitle: 'هل أنتم مستعدون للجيل القادم من إمدادات المياه؟',
    bandLead: 'تحدثوا مع فريق المبيعات حول مشروعكم — من التخطيط إلى تقنية اللحام.',
    bandBtn: 'تواصلوا معنا الآن', bandBtn2: 'التنزيلات والخدمة',
  },
  geo: {
    eyebrow: 'الأسواق والمواقع', title1: 'عالم مليء', title2: 'بالأسواق.',
    lead: '{n} سوقًا في {c} دولة — لكل سوق صفحته الخاصة: المعايير، خصائص المياه، حالات الاستخدام، اللوجستيات. أمسك الكرة الأرضية ودرها بحرية؛ القائمة تنقلك مباشرة إلى المدينة.',
    all: 'الكل', cityTitle: 'أنظمة أنابيب PP-R/PP-RCT في {city}.', cityLead: 'أنظمة مياه شرب d20–d630، مطابقة للمتطلبات المحلية —',
    allMarkets: 'جميع الأسواق', request: 'طلب مشروع', finder: 'باحث المنتجات', fromPlant: 'كم من مصنع فالدزولمس',
    regFrame: 'الإطار التنظيمي', water: 'خصائص المياه واستجابة المادة', typical: 'مشاريع نموذجية في {city}',
    onSite: 'المعالجة في الموقع', onSiteText: 'تدريب على تقنية اللحام وتوثيق بالفيديو لفريقكم — في الأكاديمية.',
    toAcademy: 'إلى الأكاديمية', nearbyEyebrow: 'أسواق ذات صلة', nearby: 'بالقرب.',
  },
  footer: {
    tagline: 'K-Aqua — الريادة في إمدادات المياه. أنظمة أنابيب PP-R/PP-RCT لمياه الشرب، من إنتاج KWT GmbH في فالدزولمس، ألمانيا.',
    colTools: 'المنتجات والأدوات', colCompany: 'الشركة', colContact: 'اتصل بنا', directions: 'الاتجاهات والموقع',
    rights: 'جميع الحقوق محفوظة.', imprint: 'بيانات الناشر', privacy: 'الخصوصية',
  },
},
fr: {
  nav: { home: 'Accueil', products: 'Produits', finder: 'Recherche produit', co2: 'Calculateur CO₂', markets: 'Marchés', trust: 'Trust Center', contact: 'Contact', menu: 'Menu', lang: 'Langue' },
  groups: { tools: 'Produits & Outils', knowledge: 'Savoir & Confiance', company: 'Entreprise' },
  pages: {
    products: ['Système de produits', 'Aperçu PP-R/PP-RCT, d20–d630'], finder: ['Recherche produit', 'Filtrer en direct, sans PDF'],
    co2: ['Calculateur CO₂', 'Comparer cuivre, acier, PVC'], solutions: ['Avantages matériau', 'Pourquoi le polypropylène'],
    academy: ['Academy', 'Vidéos de soudage + quiz'], trust: ['Trust Center', 'ISO, GENAU, dossier RFP'],
    service: ['Service & Téléchargements', 'Catalogues et documents'], partner: ['Partenariat KESSEL', 'Deux marques, une exigence'],
    markets: ['Marchés & Sites', 'Monde interactif, 27 pages locales'], references: ['Globe des références', 'Projets dans le monde entier'],
    about: ['À propos', 'KWT GmbH & système GENAU'], career: ['Carrière', 'Calculateur d\u2019avantages & culture match'],
    news: ['Actualités', 'Triple certification ISO'], contact: ['Contact', 'Ventes & support'],
  },
  home: {
    chip: 'certifié depuis octobre 2025',
    lead: 'K-Aqua développe et fabrique des systèmes de tuyauterie PP-R/PP-RCT pour l\u2019eau potable — de 20 à 630 mm, en partenariat avec le fabricant premium KESSEL.',
    ctaProducts: 'Découvrir le système', ctaContact: 'Nous contacter',
    toolsEyebrow: 'Outils interactifs', toolsTitle1: 'Pas de murs de texte.', toolsTitle2: 'Des outils.',
    toolsLead: 'Le site travaille pour vous : filtrer, calculer, apprendre.',
    bandTitle: 'Prêt pour la prochaine génération d\u2019alimentation en eau ?',
    bandLead: 'Parlez de votre projet à notre équipe commerciale — de la planification au soudage.',
    bandBtn: 'Contactez-nous', bandBtn2: 'Téléchargements & Service',
  },
  geo: {
    eyebrow: 'Marchés & Sites', title1: 'Un monde plein de', title2: 'marchés.',
    lead: '{n} marchés dans {c} pays — chacun avec sa propre page : normes, profil de l\u2019eau, cas d\u2019usage, logistique. Saisissez le globe et faites-le tourner librement.',
    all: 'Tous', cityTitle: 'Systèmes de tuyauterie PP-R/PP-RCT à {city}.', cityLead: 'Systèmes d\u2019eau potable d20–d630, validés selon les exigences locales —',
    allMarkets: 'Tous les marchés', request: 'Demander un projet', finder: 'Recherche produit', fromPlant: 'km de l\u2019usine de Waldsolms',
    regFrame: 'Cadre réglementaire', water: 'Profil de l\u2019eau & réponse du matériau', typical: 'Projets typiques à {city}',
    onSite: 'Mise en œuvre sur site', onSiteText: 'Formation au soudage et documentation vidéo pour votre équipe — dans l\u2019Academy.',
    toAcademy: 'Vers l\u2019Academy', nearbyEyebrow: 'Marchés voisins', nearby: 'À proximité.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Systèmes de tuyauterie PP-R/PP-RCT pour l\u2019eau potable, fabriqués par KWT GmbH à Waldsolms, Allemagne.',
    colTools: 'Produits & Outils', colCompany: 'Entreprise', colContact: 'Contact', directions: 'Itinéraire & Site',
    rights: 'Tous droits réservés.', imprint: 'Mentions légales', privacy: 'Confidentialité',
  },
},
es: {
  nav: { home: 'Inicio', products: 'Productos', finder: 'Buscador', co2: 'Calculadora CO₂', markets: 'Mercados', trust: 'Trust Center', contact: 'Contacto', menu: 'Menú', lang: 'Idioma' },
  groups: { tools: 'Productos y herramientas', knowledge: 'Conocimiento y confianza', company: 'Empresa' },
  pages: {
    products: ['Sistema de productos', 'Resumen PP-R/PP-RCT, d20–d630'], finder: ['Buscador de productos', 'Filtrar en vivo, sin PDFs'],
    co2: ['Calculadora CO₂', 'Comparar con cobre, acero, PVC'], solutions: ['Ventajas del material', 'Por qué polipropileno'],
    academy: ['Academy', 'Vídeos de soldadura + quiz'], trust: ['Trust Center', 'ISO, GENAU, paquete RFP'],
    service: ['Servicio y descargas', 'Catálogos y documentos'], partner: ['Alianza KESSEL', 'Dos marcas, una actitud'],
    markets: ['Mercados y ubicaciones', 'Mundo interactivo, 27 páginas locales'], references: ['Globo de referencias', 'Proyectos en todo el mundo'],
    about: ['Sobre nosotros', 'KWT GmbH y sistema GENAU'], career: ['Carrera', 'Calculadora de beneficios y culture match'],
    news: ['Noticias y eventos', 'Triple certificación ISO'], contact: ['Contacto', 'Ventas y soporte'],
  },
  home: {
    chip: 'certificados desde octubre de 2025',
    lead: 'K-Aqua desarrolla y fabrica sistemas de tuberías PP-R/PP-RCT para agua potable — de 20 a 630 mm, en alianza con el fabricante premium KESSEL.',
    ctaProducts: 'Descubrir el sistema', ctaContact: 'Contactar',
    toolsEyebrow: 'Herramientas interactivas', toolsTitle1: 'Sin muros de texto.', toolsTitle2: 'Herramientas.',
    toolsLead: 'La web trabaja para usted: filtrar, calcular, aprender.',
    bandTitle: '¿Listo para la próxima generación del suministro de agua?',
    bandLead: 'Hable con nuestro equipo comercial sobre su proyecto — de la planificación a la soldadura.',
    bandBtn: 'Contactar ahora', bandBtn2: 'Descargas y servicio',
  },
  geo: {
    eyebrow: 'Mercados y ubicaciones', title1: 'Un mundo lleno de', title2: 'mercados.',
    lead: '{n} mercados en {c} países — cada uno con su propia página: normas, perfil del agua, casos de uso, logística. Agarre el globo y gírelo libremente.',
    all: 'Todos', cityTitle: 'Sistemas de tuberías PP-R/PP-RCT en {city}.', cityLead: 'Sistemas de agua potable d20–d630, validados según los requisitos locales —',
    allMarkets: 'Todos los mercados', request: 'Solicitar proyecto', finder: 'Buscador de productos', fromPlant: 'km desde la planta de Waldsolms',
    regFrame: 'Marco regulatorio', water: 'Perfil del agua y respuesta del material', typical: 'Proyectos típicos en {city}',
    onSite: 'Procesado en obra', onSiteText: 'Formación en soldadura y documentación en vídeo para su equipo — en la Academy.',
    toAcademy: 'A la Academy', nearbyEyebrow: 'Mercados relacionados', nearby: 'Cerca.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Sistemas de tuberías PP-R/PP-RCT para agua potable, fabricados por KWT GmbH en Waldsolms, Alemania.',
    colTools: 'Productos y herramientas', colCompany: 'Empresa', colContact: 'Contacto', directions: 'Cómo llegar',
    rights: 'Todos los derechos reservados.', imprint: 'Aviso legal', privacy: 'Privacidad',
  },
},
it: {
  nav: { home: 'Home', products: 'Prodotti', finder: 'Trova prodotti', co2: 'Calcolatore CO₂', markets: 'Mercati', trust: 'Trust Center', contact: 'Contatti', menu: 'Menu', lang: 'Lingua' },
  groups: { tools: 'Prodotti e strumenti', knowledge: 'Conoscenza e fiducia', company: 'Azienda' },
  pages: {
    products: ['Sistema di prodotti', 'Panoramica PP-R/PP-RCT, d20–d630'], finder: ['Trova prodotti', 'Filtra in tempo reale, niente PDF'],
    co2: ['Calcolatore CO₂', 'Confronto con rame, acciaio, PVC'], solutions: ['Vantaggi del materiale', 'Perché il polipropilene'],
    academy: ['Academy', 'Video di saldatura + quiz'], trust: ['Trust Center', 'ISO, GENAU, pacchetto RFP'],
    service: ['Servizio e download', 'Cataloghi e documenti'], partner: ['Partnership KESSEL', 'Due marchi, un atteggiamento'],
    markets: ['Mercati e sedi', 'Mondo interattivo, 27 pagine locali'], references: ['Globo referenze', 'Progetti in tutto il mondo'],
    about: ['Chi siamo', 'KWT GmbH e sistema GENAU'], career: ['Carriera', 'Calcolatore benefit e culture match'],
    news: ['News ed eventi', 'Tripla certificazione ISO'], contact: ['Contatti', 'Vendite e supporto'],
  },
  home: {
    chip: 'certificati da ottobre 2025',
    lead: 'K-Aqua sviluppa e produce sistemi di tubazioni PP-R/PP-RCT per acqua potabile — da 20 a 630 mm, in partnership con il produttore premium KESSEL.',
    ctaProducts: 'Scopri il sistema', ctaContact: 'Contattaci',
    toolsEyebrow: 'Strumenti interattivi', toolsTitle1: 'Niente muri di testo.', toolsTitle2: 'Strumenti.',
    toolsLead: 'Il sito lavora per voi: filtrare, calcolare, imparare.',
    bandTitle: 'Pronti per la prossima generazione della fornitura idrica?',
    bandLead: 'Parlate del vostro progetto con il nostro team — dalla pianificazione alla saldatura.',
    bandBtn: 'Contattaci ora', bandBtn2: 'Download e servizio',
  },
  geo: {
    eyebrow: 'Mercati e sedi', title1: 'Un mondo pieno di', title2: 'mercati.',
    lead: '{n} mercati in {c} paesi — ognuno con la propria pagina: norme, profilo dell\u2019acqua, casi d\u2019uso, logistica. Afferrate il globo e fatelo ruotare liberamente.',
    all: 'Tutti', cityTitle: 'Sistemi di tubazioni PP-R/PP-RCT a {city}.', cityLead: 'Sistemi per acqua potabile d20–d630, validati secondo i requisiti locali —',
    allMarkets: 'Tutti i mercati', request: 'Richiedi un progetto', finder: 'Trova prodotti', fromPlant: 'km dallo stabilimento di Waldsolms',
    regFrame: 'Quadro normativo', water: 'Profilo dell\u2019acqua e risposta del materiale', typical: 'Progetti tipici a {city}',
    onSite: 'Lavorazione in cantiere', onSiteText: 'Formazione sulla saldatura e documentazione video per la vostra squadra — nell\u2019Academy.',
    toAcademy: 'All\u2019Academy', nearbyEyebrow: 'Mercati correlati', nearby: 'Nelle vicinanze.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Sistemi di tubazioni PP-R/PP-RCT per acqua potabile, prodotti da KWT GmbH a Waldsolms, Germania.',
    colTools: 'Prodotti e strumenti', colCompany: 'Azienda', colContact: 'Contatti', directions: 'Indicazioni e sede',
    rights: 'Tutti i diritti riservati.', imprint: 'Note legali', privacy: 'Privacy',
  },
},
pt: {
  nav: { home: 'Início', products: 'Produtos', finder: 'Localizador', co2: 'Calculadora CO₂', markets: 'Mercados', trust: 'Trust Center', contact: 'Contacto', menu: 'Menu', lang: 'Idioma' },
  groups: { tools: 'Produtos e ferramentas', knowledge: 'Conhecimento e confiança', company: 'Empresa' },
  pages: {
    products: ['Sistema de produtos', 'Visão geral PP-R/PP-RCT, d20–d630'], finder: ['Localizador de produtos', 'Filtrar ao vivo, sem PDFs'],
    co2: ['Calculadora CO₂', 'Comparar com cobre, aço, PVC'], solutions: ['Vantagens do material', 'Porquê polipropileno'],
    academy: ['Academy', 'Vídeos de soldadura + quiz'], trust: ['Trust Center', 'ISO, GENAU, pacote RFP'],
    service: ['Serviço e downloads', 'Catálogos e documentos'], partner: ['Parceria KESSEL', 'Duas marcas, uma atitude'],
    markets: ['Mercados e locais', 'Mundo interativo, 27 páginas locais'], references: ['Globo de referências', 'Projetos em todo o mundo'],
    about: ['Sobre nós', 'KWT GmbH e sistema GENAU'], career: ['Carreira', 'Calculadora de benefícios'],
    news: ['Notícias e eventos', 'Tripla certificação ISO'], contact: ['Contacto', 'Vendas e suporte'],
  },
  home: {
    chip: 'certificados desde outubro de 2025',
    lead: 'A K-Aqua desenvolve e fabrica sistemas de tubagem PP-R/PP-RCT para água potável — de 20 a 630 mm, em parceria com o fabricante premium KESSEL.',
    ctaProducts: 'Descobrir o sistema', ctaContact: 'Entrar em contacto',
    toolsEyebrow: 'Ferramentas interativas', toolsTitle1: 'Sem paredes de texto.', toolsTitle2: 'Ferramentas.',
    toolsLead: 'O site trabalha por si: filtrar, calcular, aprender.',
    bandTitle: 'Pronto para a próxima geração do abastecimento de água?',
    bandLead: 'Fale com a nossa equipa comercial sobre o seu projeto — do planeamento à soldadura.',
    bandBtn: 'Contactar agora', bandBtn2: 'Downloads e serviço',
  },
  geo: {
    eyebrow: 'Mercados e locais', title1: 'Um mundo cheio de', title2: 'mercados.',
    lead: '{n} mercados em {c} países — cada um com a sua própria página: normas, perfil da água, casos de uso, logística. Agarre o globo e rode-o livremente.',
    all: 'Todos', cityTitle: 'Sistemas de tubagem PP-R/PP-RCT em {city}.', cityLead: 'Sistemas de água potável d20–d630, validados contra os requisitos locais —',
    allMarkets: 'Todos os mercados', request: 'Solicitar projeto', finder: 'Localizador de produtos', fromPlant: 'km da fábrica de Waldsolms',
    regFrame: 'Quadro regulamentar', water: 'Perfil da água e resposta do material', typical: 'Projetos típicos em {city}',
    onSite: 'Processamento em obra', onSiteText: 'Formação em soldadura e documentação em vídeo para a sua equipa — na Academy.',
    toAcademy: 'Para a Academy', nearbyEyebrow: 'Mercados relacionados', nearby: 'Por perto.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Sistemas de tubagem PP-R/PP-RCT para água potável, fabricados pela KWT GmbH em Waldsolms, Alemanha.',
    colTools: 'Produtos e ferramentas', colCompany: 'Empresa', colContact: 'Contacto', directions: 'Direções e local',
    rights: 'Todos os direitos reservados.', imprint: 'Ficha técnica', privacy: 'Privacidade',
  },
},
nl: {
  nav: { home: 'Start', products: 'Producten', finder: 'Productzoeker', co2: 'CO₂-calculator', markets: 'Markten', trust: 'Trust Center', contact: 'Contact', menu: 'Menu', lang: 'Taal' },
  groups: { tools: 'Producten & tools', knowledge: 'Kennis & vertrouwen', company: 'Bedrijf' },
  pages: {
    products: ['Productsysteem', 'PP-R/PP-RCT overzicht, d20–d630'], finder: ['Productzoeker', 'Live filteren, geen PDF\u2019s'],
    co2: ['CO₂-calculator', 'Vergelijk met koper, staal, PVC'], solutions: ['Materiaalvoordelen', 'Waarom polypropyleen'],
    academy: ['Academy', 'Lasvideo\u2019s + meesterquiz'], trust: ['Trust Center', 'ISO, GENAU, RFP-pakket'],
    service: ['Service & downloads', 'Catalogi en documenten'], partner: ['KESSEL-partnerschap', 'Twee merken, één houding'],
    markets: ['Markten & locaties', 'Interactieve wereld, 27 lokale pagina\u2019s'], references: ['Referentiebol', 'Projecten wereldwijd'],
    about: ['Over ons', 'KWT GmbH & GENAU-systeem'], career: ['Carrière', 'Benefits-calculator & culture match'],
    news: ['Nieuws & events', 'Drievoudig ISO-gecertificeerd'], contact: ['Contact', 'Verkoop & support'],
  },
  home: {
    chip: 'gecertificeerd sinds oktober 2025',
    lead: 'K-Aqua ontwikkelt en produceert PP-R/PP-RCT-leidingsystemen voor drinkwater — van 20 tot 630 mm, in partnerschap met premiumfabrikant KESSEL.',
    ctaProducts: 'Ontdek het systeem', ctaContact: 'Neem contact op',
    toolsEyebrow: 'Interactieve tools', toolsTitle1: 'Geen tekstmuren.', toolsTitle2: 'Tools.',
    toolsLead: 'De website werkt voor u: filteren, rekenen, leren.',
    bandTitle: 'Klaar voor de volgende generatie watervoorziening?',
    bandLead: 'Bespreek uw project met ons salesteam — van planning tot lastechniek.',
    bandBtn: 'Neem nu contact op', bandBtn2: 'Downloads & service',
  },
  geo: {
    eyebrow: 'Markten & locaties', title1: 'Een wereld vol', title2: 'markten.',
    lead: '{n} markten in {c} landen — elk met een eigen landingspagina: normen, waterprofiel, toepassingen, logistiek. Pak de wereld en draai hem vrij rond.',
    all: 'Alle', cityTitle: 'PP-R/PP-RCT-leidingsystemen in {city}.', cityLead: 'Drinkwatersystemen d20–d630, getoetst aan de lokale eisen —',
    allMarkets: 'Alle markten', request: 'Project aanvragen', finder: 'Productzoeker', fromPlant: 'km van fabriek Waldsolms',
    regFrame: 'Regelgevend kader', water: 'Waterprofiel & materiaalrespons', typical: 'Typische projecten in {city}',
    onSite: 'Verwerking op locatie', onSiteText: 'Lasinstructie en videodocumentatie voor uw ploeg — in de Academy.',
    toAcademy: 'Naar de Academy', nearbyEyebrow: 'Gerelateerde markten', nearby: 'In de buurt.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. PP-R/PP-RCT-leidingsystemen voor drinkwater, gemaakt door KWT GmbH in Waldsolms, Duitsland.',
    colTools: 'Producten & tools', colCompany: 'Bedrijf', colContact: 'Contact', directions: 'Route & locatie',
    rights: 'Alle rechten voorbehouden.', imprint: 'Colofon', privacy: 'Privacy',
  },
},
pl: {
  nav: { home: 'Start', products: 'Produkty', finder: 'Wyszukiwarka', co2: 'Kalkulator CO₂', markets: 'Rynki', trust: 'Trust Center', contact: 'Kontakt', menu: 'Menu', lang: 'Język' },
  groups: { tools: 'Produkty i narzędzia', knowledge: 'Wiedza i zaufanie', company: 'Firma' },
  pages: {
    products: ['System produktów', 'Przegląd PP-R/PP-RCT, d20–d630'], finder: ['Wyszukiwarka produktów', 'Filtruj na żywo zamiast PDF-ów'],
    co2: ['Kalkulator CO₂', 'Porównanie z miedzią, stalą, PVC'], solutions: ['Zalety materiału', 'Dlaczego polipropylen'],
    academy: ['Academy', 'Filmy o zgrzewaniu + quiz'], trust: ['Trust Center', 'ISO, GENAU, pakiet RFP'],
    service: ['Serwis i pliki', 'Katalogi i dokumenty'], partner: ['Partnerstwo KESSEL', 'Dwie marki, jedna postawa'],
    markets: ['Rynki i lokalizacje', 'Interaktywny świat, 27 stron lokalnych'], references: ['Globus referencji', 'Projekty na całym świecie'],
    about: ['O nas', 'KWT GmbH i system GENAU'], career: ['Kariera', 'Kalkulator benefitów i culture match'],
    news: ['Aktualności', 'Potrójna certyfikacja ISO'], contact: ['Kontakt', 'Sprzedaż i wsparcie'],
  },
  home: {
    chip: 'certyfikowani od października 2025',
    lead: 'K-Aqua projektuje i produkuje systemy rur PP-R/PP-RCT do wody pitnej — od 20 do 630 mm, we współpracy z producentem premium KESSEL.',
    ctaProducts: 'Poznaj system', ctaContact: 'Skontaktuj się',
    toolsEyebrow: 'Interaktywne narzędzia', toolsTitle1: 'Żadnych ścian tekstu.', toolsTitle2: 'Narzędzia.',
    toolsLead: 'Strona pracuje dla Ciebie: filtruj, licz, ucz się.',
    bandTitle: 'Gotowi na nową generację zaopatrzenia w wodę?',
    bandLead: 'Porozmawiaj z naszym zespołem o swoim projekcie — od planowania po zgrzewanie.',
    bandBtn: 'Skontaktuj się teraz', bandBtn2: 'Pliki i serwis',
  },
  geo: {
    eyebrow: 'Rynki i lokalizacje', title1: 'Świat pełen', title2: 'rynków.',
    lead: '{n} rynków w {c} krajach — każdy z własną stroną: normy, profil wody, zastosowania, logistyka. Chwyć glob i obracaj nim swobodnie.',
    all: 'Wszystkie', cityTitle: 'Systemy rur PP-R/PP-RCT w {city}.', cityLead: 'Systemy wody pitnej d20–d630, zweryfikowane pod kątem lokalnych wymagań —',
    allMarkets: 'Wszystkie rynki', request: 'Zapytaj o projekt', finder: 'Wyszukiwarka produktów', fromPlant: 'km od zakładu Waldsolms',
    regFrame: 'Ramy regulacyjne', water: 'Profil wody i odpowiedź materiału', typical: 'Typowe projekty w {city}',
    onSite: 'Obróbka na budowie', onSiteText: 'Instruktaż zgrzewania i dokumentacja wideo dla Twojej ekipy — w Academy.',
    toAcademy: 'Do Academy', nearbyEyebrow: 'Powiązane rynki', nearby: 'W pobliżu.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Systemy rur PP-R/PP-RCT do wody pitnej, produkowane przez KWT GmbH w Waldsolms w Niemczech.',
    colTools: 'Produkty i narzędzia', colCompany: 'Firma', colContact: 'Kontakt', directions: 'Dojazd i lokalizacja',
    rights: 'Wszelkie prawa zastrzeżone.', imprint: 'Impressum', privacy: 'Prywatność',
  },
},
tr: {
  nav: { home: 'Ana sayfa', products: 'Ürünler', finder: 'Ürün bulucu', co2: 'CO₂ hesaplayıcı', markets: 'Pazarlar', trust: 'Trust Center', contact: 'İletişim', menu: 'Menü', lang: 'Dil' },
  groups: { tools: 'Ürünler ve araçlar', knowledge: 'Bilgi ve güven', company: 'Şirket' },
  pages: {
    products: ['Ürün sistemi', 'PP-R/PP-RCT genel bakış, d20–d630'], finder: ['Ürün bulucu', 'PDF yerine canlı filtreleme'],
    co2: ['CO₂ hesaplayıcı', 'Bakır, çelik, PVC ile karşılaştırma'], solutions: ['Malzeme avantajları', 'Neden polipropilen'],
    academy: ['Academy', 'Kaynak videoları + usta sınavı'], trust: ['Trust Center', 'ISO, GENAU, RFP paketi'],
    service: ['Servis ve indirmeler', 'Kataloglar ve belgeler'], partner: ['KESSEL ortaklığı', 'İki marka, tek duruş'],
    markets: ['Pazarlar ve lokasyonlar', 'İnteraktif dünya, 27 yerel sayfa'], references: ['Referans küresi', 'Dünya çapında projeler'],
    about: ['Hakkımızda', 'KWT GmbH ve GENAU sistemi'], career: ['Kariyer', 'Yan haklar hesaplayıcısı'],
    news: ['Haberler', 'Üçlü ISO sertifikası'], contact: ['İletişim', 'Satış ve destek'],
  },
  home: {
    chip: 'Ekim 2025\u2019ten beri sertifikalı',
    lead: 'K-Aqua, içme suyu için PP-R/PP-RCT boru sistemleri geliştirir ve üretir — 20\u2019den 630 mm\u2019ye, premium üretici KESSEL ortaklığıyla.',
    ctaProducts: 'Sistemi keşfedin', ctaContact: 'İletişime geçin',
    toolsEyebrow: 'İnteraktif araçlar', toolsTitle1: 'Metin duvarları yok.', toolsTitle2: 'Araçlar.',
    toolsLead: 'Site sizin için çalışır: filtreleyin, hesaplayın, öğrenin.',
    bandTitle: 'Su teminin yeni nesline hazır mısınız?',
    bandLead: 'Projenizi satış ekibimizle konuşun — planlamadan kaynak teknolojisine.',
    bandBtn: 'Şimdi iletişime geçin', bandBtn2: 'İndirmeler ve servis',
  },
  geo: {
    eyebrow: 'Pazarlar ve lokasyonlar', title1: 'Pazarlarla dolu', title2: 'bir dünya.',
    lead: '{c} ülkede {n} pazar — her biri kendi sayfasıyla: standartlar, su profili, kullanım örnekleri, lojistik. Dünyayı kavrayın ve özgürce çevirin.',
    all: 'Tümü', cityTitle: '{city} için PP-R/PP-RCT boru sistemleri.', cityLead: 'Yerel gereksinimlere göre doğrulanmış d20–d630 içme suyu sistemleri —',
    allMarkets: 'Tüm pazarlar', request: 'Proje talebi', finder: 'Ürün bulucu', fromPlant: 'km Waldsolms fabrikasından',
    regFrame: 'Düzenleyici çerçeve', water: 'Su profili ve malzeme yanıtı', typical: '{city} için tipik projeler',
    onSite: 'Sahada işleme', onSiteText: 'Ekibiniz için kaynak eğitimi ve video dokümantasyon — Academy\u2019de.',
    toAcademy: 'Academy\u2019ye', nearbyEyebrow: 'İlgili pazarlar', nearby: 'Yakınında.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. İçme suyu için PP-R/PP-RCT boru sistemleri, KWT GmbH tarafından Almanya Waldsolms\u2019ta üretilir.',
    colTools: 'Ürünler ve araçlar', colCompany: 'Şirket', colContact: 'İletişim', directions: 'Yol tarifi',
    rights: 'Tüm hakları saklıdır.', imprint: 'Künye', privacy: 'Gizlilik',
  },
},
ru: {
  nav: { home: 'Главная', products: 'Продукция', finder: 'Подбор', co2: 'CO₂-калькулятор', markets: 'Рынки', trust: 'Trust Center', contact: 'Контакты', menu: 'Меню', lang: 'Язык' },
  groups: { tools: 'Продукция и инструменты', knowledge: 'Знания и доверие', company: 'Компания' },
  pages: {
    products: ['Система продукции', 'Обзор PP-R/PP-RCT, d20–d630'], finder: ['Подбор продукции', 'Живой фильтр вместо PDF'],
    co2: ['CO₂-калькулятор', 'Сравнение с медью, сталью, ПВХ'], solutions: ['Преимущества материала', 'Почему полипропилен'],
    academy: ['Academy', 'Видео по сварке + квиз'], trust: ['Trust Center', 'ISO, GENAU, пакет RFP'],
    service: ['Сервис и загрузки', 'Каталоги и документы'], partner: ['Партнёрство KESSEL', 'Два бренда — одна позиция'],
    markets: ['Рынки и локации', 'Интерактивный мир, 27 страниц'], references: ['Глобус референсов', 'Проекты по всему миру'],
    about: ['О нас', 'KWT GmbH и система GENAU'], career: ['Карьера', 'Калькулятор бенефитов'],
    news: ['Новости', 'Тройная сертификация ISO'], contact: ['Контакты', 'Продажи и поддержка'],
  },
  home: {
    chip: 'сертифицированы с октября 2025',
    lead: 'K-Aqua разрабатывает и производит трубопроводные системы PP-R/PP-RCT для питьевой воды — от 20 до 630 мм, в партнёрстве с премиальным производителем KESSEL.',
    ctaProducts: 'Изучить систему', ctaContact: 'Связаться',
    toolsEyebrow: 'Интерактивные инструменты', toolsTitle1: 'Никаких стен текста.', toolsTitle2: 'Инструменты.',
    toolsLead: 'Сайт работает на вас: фильтруйте, считайте, учитесь.',
    bandTitle: 'Готовы к новому поколению водоснабжения?',
    bandLead: 'Обсудите ваш проект с нашей командой — от планирования до сварки.',
    bandBtn: 'Связаться сейчас', bandBtn2: 'Загрузки и сервис',
  },
  geo: {
    eyebrow: 'Рынки и локации', title1: 'Мир, полный', title2: 'рынков.',
    lead: '{n} рынков в {c} странах — у каждого своя страница: нормы, профиль воды, применения, логистика. Возьмите глобус и вращайте его свободно.',
    all: 'Все', cityTitle: 'Трубопроводные системы PP-R/PP-RCT в {city}.', cityLead: 'Системы питьевой воды d20–d630, проверенные по местным требованиям —',
    allMarkets: 'Все рынки', request: 'Запросить проект', finder: 'Подбор продукции', fromPlant: 'км от завода Вальдзольмс',
    regFrame: 'Нормативная база', water: 'Профиль воды и ответ материала', typical: 'Типичные проекты: {city}',
    onSite: 'Монтаж на объекте', onSiteText: 'Инструктаж по сварке и видеодокументация для вашей бригады — в Academy.',
    toAcademy: 'В Academy', nearbyEyebrow: 'Связанные рынки', nearby: 'Рядом.',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply. Трубопроводные системы PP-R/PP-RCT для питьевой воды, производство KWT GmbH, Вальдзольмс, Германия.',
    colTools: 'Продукция и инструменты', colCompany: 'Компания', colContact: 'Контакты', directions: 'Как добраться',
    rights: 'Все права защищены.', imprint: 'Выходные данные', privacy: 'Конфиденциальность',
  },
},
zh: {
  nav: { home: '首页', products: '产品', finder: '产品查找', co2: 'CO₂计算器', markets: '市场', trust: '信任中心', contact: '联系我们', menu: '菜单', lang: '语言' },
  groups: { tools: '产品与工具', knowledge: '知识与信任', company: '公司' },
  pages: {
    products: ['产品系统', 'PP-R/PP-RCT 概览，d20–d630'], finder: ['产品查找器', '实时筛选，告别PDF'],
    co2: ['CO₂计算器', '与铜、钢、PVC对比'], solutions: ['材料优势', '为什么选择聚丙烯'],
    academy: ['学院', '焊接视频 + 大师测验'], trust: ['信任中心', 'ISO、GENAU、招标文件包'],
    service: ['服务与下载', '目录和文档'], partner: ['KESSEL合作', '两个品牌，一种态度'],
    markets: ['市场与地点', '互动世界，27个本地页面'], references: ['项目地球仪', '全球项目'],
    about: ['关于我们', 'KWT GmbH 与 GENAU 体系'], career: ['职业发展', '福利计算器'],
    news: ['新闻与活动', '三重ISO认证'], contact: ['联系我们', '销售与支持'],
  },
  home: {
    chip: '自2025年10月起获得认证',
    lead: 'K-Aqua 开发并制造用于饮用水的 PP-R/PP-RCT 管道系统——直径 20 至 630 毫米，与高端制造商 KESSEL 合作。',
    ctaProducts: '探索产品系统', ctaContact: '联系我们',
    toolsEyebrow: '互动工具', toolsTitle1: '没有文字墙。', toolsTitle2: '只有工具。',
    toolsLead: '网站为您工作：筛选、计算、学习。',
    bandTitle: '准备好迎接下一代供水了吗？',
    bandLead: '与我们的销售团队讨论您的项目——从规划到焊接技术。',
    bandBtn: '立即联系', bandBtn2: '下载与服务',
  },
  geo: {
    eyebrow: '市场与地点', title1: '一个充满', title2: '市场的世界。',
    lead: '{c} 个国家的 {n} 个市场——每个市场都有自己的页面：标准、水质概况、应用案例、物流。抓住地球，自由旋转；列表会带您直达城市。',
    all: '全部', cityTitle: '{city} 的 PP-R/PP-RCT 管道系统。', cityLead: '饮用水系统 d20–d630，按当地要求验证——',
    allMarkets: '所有市场', request: '项目咨询', finder: '产品查找器', fromPlant: '公里（距瓦尔德索尔姆斯工厂）',
    regFrame: '监管框架', water: '水质概况与材料响应', typical: '{city} 的典型项目',
    onSite: '现场加工', onSiteText: '为您的团队提供焊接指导和视频文档——尽在学院。',
    toAcademy: '前往学院', nearbyEyebrow: '相关市场', nearby: '附近。',
  },
  footer: {
    tagline: 'K-Aqua — Leading in Water Supply。用于饮用水的 PP-R/PP-RCT 管道系统，由德国瓦尔德索尔姆斯的 KWT GmbH 制造。',
    colTools: '产品与工具', colCompany: '公司', colContact: '联系我们', directions: '路线与位置',
    rights: '版权所有。', imprint: '版本说明', privacy: '隐私',
  },
},
};

const KLangContext = React.createContext({ lang: 'de', t: K_I18N.de, dir: 'ltr' });
function useT() { return React.useContext(KLangContext); }

/* fill template placeholders */
function kFmt(str, vars) {
  let out = str;
  Object.keys(vars || {}).forEach((k) => { out = out.split('{' + k + '}').join(vars[k]); });
  return out;
}

/* render "...{city}..." with the city wrapped in a gradient span */
function kCityTitle(template, city) {
  const parts = template.split('{city}');
  return (
    <React.Fragment>
      {parts[0]}<span className="k-grad-text">{city}</span>{parts[1] || ''}
    </React.Fragment>
  );
}

/* ---------- language picker ---------- */
function LangPicker({ lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  // Nur Sprachen anbieten, deren Seiten-Wörterbücher vollständig vorliegen —
  // garantiert: eine gewählte Sprache zeigt ausschließlich diese Sprache.
  const available = K_LANGS.filter((l) => (window.K_PAGES_I18N || {})[l.id]);
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);
  const current = K_LANGS.find((l) => l.id === lang) || K_LANGS[0];
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button type="button" className="k-icon-btn" style={{ width: 'auto', paddingInline: 12, gap: 6, display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--radius-full)' }}
        aria-label={`${(K_I18N[lang] || K_I18N.de).nav.lang}: ${current.name}`} aria-expanded={open}
        onClick={() => setOpen(!open)}>
        <Icons.Globe size={17} />
        <span style={{ fontSize: 13.5, fontWeight: 700, textTransform: 'uppercase' }}>{lang}</span>
      </button>
      {open ? (
        <div className="k-lang-menu" role="listbox" aria-label="Sprachen">
          {available.map((l) => (
            <button key={l.id} type="button" role="option" aria-selected={l.id === lang}
              className={`k-lang-item ${l.id === lang ? 'is-on' : ''}`}
              onClick={() => { setLang(l.id); setOpen(false); }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: 12, width: 26 }}>{l.id}</span>
              <span>{l.name}</span>
              {l.id === lang ? <Icons.Check size={15} style={{ marginLeft: 'auto' }} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
}

Object.assign(window, { K_LANGS, K_I18N, KLangContext, useT, kFmt, kCityTitle, LangPicker });
