const fs = require('fs');
const path = require('path');

const seoDictDe = {
  "seoArticle": {
    "pipes": {
      "areas": "Trinkwasserinstallation, Heizungsbau, Klimatechnik, Industrielle Anlagen, Schiffbau",
      "advTitle": "Überlegene Rohrleitungstechnik für jedes Projekt",
      "advList": [
        "Keine Korrosion: 100% resistent gegen Lochfraß und Rost.",
        "Geringer Druckverlust: Die extrem glatte Innenfläche minimiert Reibung und spart Pumpenenergie.",
        "Lange Lebensdauer: Garantiert über 50 Jahre wartungsfrei im Dauereinsatz.",
        "Geräuschreduktion: Hervorragende Schalldämmung gegen Fließgeräusche.",
        "Hygienisch: Erfüllt strengste internationale Trinkwassernormen (DVGW, KIWA)."
      ],
      "seoText": "Unsere Hochleistungsrohre werden in Waldsolms nach höchsten Qualitätsstandards gefertigt. Die Materialkombination PP-R und PP-RCT sorgt für außergewöhnliche Temperatur- und Druckbeständigkeit. Egal ob in der Haustechnik, im industriellen Anlagenbau oder bei komplexen Kühlsystemen – dieses Rohrsystem liefert maximale Sicherheit und Effizienz. Die einfache und sichere Schweißtechnik garantiert absolut leckagefreie Verbindungen."
    },
    "fittings": {
      "areas": "Trinkwassernetz, Sanitärinstallation, Industrielle Verteilung, Heizungsbau",
      "advTitle": "Sichere und homogene Verbindungen",
      "advList": [
        "Homogene Verschweißung: Rohr und Fitting verschmelzen zu einer untrennbaren Einheit.",
        "Keine Dichtungen nötig: Die dauerhafte Verbindung benötigt keine fehleranfälligen O-Ringe.",
        "Einfache Montage: Schnelle und sichere Verarbeitung auf der Baustelle.",
        "Voller Durchfluss: Keine Querschnittsverengung, wodurch der Systemdruck erhalten bleibt.",
        "Chemische Beständigkeit: Resistent gegen eine Vielzahl aggressiver Medien."
      ],
      "seoText": "Formteile von K-Aqua sind das Bindeglied für zuverlässige Rohrnetze. Gefertigt in Deutschland, bieten diese Fittings höchste Präzision und Maßhaltigkeit. Die Verschweißungstechnik (Muffenschweißen) dauert nur wenige Sekunden und kühlt zu einer Verbindung ab, die genauso stark ist wie das Rohr selbst. Dadurch eliminieren Sie das Risiko von Mikroleckagen, wie sie oft bei Press- oder Stecksystemen nach Jahren auftreten können."
    },
    "valves": {
      "areas": "Strangabsperrung, Anlagensteuerung, Verteilerschränke, Industrie",
      "advTitle": "Präzise Steuerung und langlebige Funktion",
      "advList": [
        "Wartungsfrei: Die Mechanik ist auf jahrzehntelange reibungslose Funktion ausgelegt.",
        "Voller Durchgang: Kugelhähne mit vollem Querschnitt minimieren Druckverluste.",
        "Einfache Integration: Direkt in das PP-R System einschweißbar.",
        "Hochwertige Materialien: Ventilsitze und Kugeln aus korrosionsfesten Legierungen.",
        "Sichere Absperrung: 100% dicht selbst unter extremen Druck- und Temperaturwechseln."
      ],
      "seoText": "Absperrarmaturen und Ventile von K-Aqua kombinieren die bewährte PP-R Schweißtechnik mit hochwertigen mechanischen Komponenten. Sie ermöglichen eine präzise Steuerung von Fluiden und eine sichere Isolation von Netzabschnitten für Wartungsarbeiten. Jede Armatur wird vor der Auslieferung strengen Druckprüfungen unterzogen, um höchste Betriebssicherheit in kritischen Anwendungen zu gewährleisten."
    },
    "fallback": {
      "areas": "Universelle Installationstechnik, Baustellenbedarf, Systemergänzung",
      "advTitle": "Perfekte Systemergänzung",
      "advList": [
        "Zertifizierte Qualität: Entspricht dem ISO 9001 Managementsystem.",
        "Systemkompatibilität: Perfekt auf das K-Aqua Rohrsystem abgestimmt.",
        "Langlebigkeit: Robuste Materialien für den rauen Baustellenalltag.",
        "Sichere Anwendung: Garantierte Funktion bei fachgerechter Anwendung.",
        "Wirtschaftlichkeit: Hervorragendes Preis-Leistungs-Verhältnis."
      ],
      "seoText": "Als Systemanbieter liefert K-Aqua nicht nur Rohre und Fittings, sondern auch das gesamte benötigte Werkzeug und Zubehör. Vom hochpräzisen Schweißgerät bis zum zuverlässigen Rohrabschneider – unsere Werkzeuge garantieren eine normgerechte Verarbeitung und maximale Installationssicherheit. Setzen Sie auf Originalzubehör, um die Gewährleistung Ihres K-Aqua Gesamtsystems zu erhalten."
    }
  },
  "labels": {
    "applicationAreas": "Einsatzgebiete",
    "advantages": "Ihre Vorteile im Überblick",
    "technicalDescription": "Technisches Profil & SEO",
    "noResults": "Keine Produkte gefunden",
    "searchPlaceholder": "Suchen nach Titel oder Artikelnummer..."
  }
};

const seoDictEn = {
  "seoArticle": {
    "pipes": {
      "areas": "Drinking water installation, heating systems, HVAC, industrial plants, shipbuilding",
      "advTitle": "Superior Piping Technology for Every Project",
      "advList": [
        "No corrosion: 100% resistant to pitting and rust.",
        "Low pressure loss: The extremely smooth inner surface minimizes friction and saves pump energy.",
        "Long lifespan: Guaranteed maintenance-free for over 50 years of continuous use.",
        "Noise reduction: Excellent sound insulation against flow noise.",
        "Hygienic: Meets strictest international drinking water standards (DVGW, KIWA)."
      ],
      "seoText": "Our high-performance pipes are manufactured in Waldsolms to the highest quality standards. The material combination of PP-R and PP-RCT provides exceptional temperature and pressure resistance. Whether in building technology, industrial plant engineering, or complex cooling systems, this piping system delivers maximum safety and efficiency. The simple and secure welding technology guarantees absolutely leak-free connections."
    },
    "fittings": {
      "areas": "Drinking water networks, sanitary installations, industrial distribution, heating",
      "advTitle": "Secure and Homogeneous Connections",
      "advList": [
        "Homogeneous fusion: Pipe and fitting melt into an inseparable unit.",
        "No gaskets needed: The permanent connection requires no error-prone O-rings.",
        "Easy installation: Fast and secure processing on site.",
        "Full flow: No cross-section reduction, preserving system pressure.",
        "Chemical resistance: Resistant to a wide range of aggressive media."
      ],
      "seoText": "K-Aqua fittings are the vital link for reliable pipe networks. Manufactured in Germany, these fittings offer the highest precision and dimensional accuracy. The socket welding technique takes only seconds and cools to a connection that is as strong as the pipe itself. This eliminates the risk of micro-leaks that often occur with press or push-fit systems after years of use."
    },
    "valves": {
      "areas": "Branch shut-off, system control, distribution manifolds, industry",
      "advTitle": "Precise Control and Durable Function",
      "advList": [
        "Maintenance-free: The mechanics are designed for decades of smooth operation.",
        "Full bore: Ball valves with full cross-section minimize pressure losses.",
        "Easy integration: Can be welded directly into the PP-R system.",
        "High-quality materials: Valve seats and balls made of corrosion-resistant alloys.",
        "Secure shut-off: 100% tight even under extreme pressure and temperature changes."
      ],
      "seoText": "K-Aqua shut-off valves and fittings combine proven PP-R welding technology with high-quality mechanical components. They enable precise control of fluids and secure isolation of network sections for maintenance. Every valve undergoes strict pressure testing before delivery to ensure maximum operational safety in critical applications."
    },
    "fallback": {
      "areas": "Universal installation technology, construction site supplies, system completion",
      "advTitle": "Perfect System Completion",
      "advList": [
        "Certified quality: Complies with the ISO 9001 management system.",
        "System compatibility: Perfectly matched to the K-Aqua piping system.",
        "Durability: Robust materials for harsh construction site conditions.",
        "Safe application: Guaranteed function when used professionally.",
        "Economy: Excellent price-performance ratio."
      ],
      "seoText": "As a system provider, K-Aqua supplies not only pipes and fittings but also all necessary tools and accessories. From high-precision welding machines to reliable pipe cutters, our tools guarantee standard-compliant processing and maximum installation security. Rely on original accessories to maintain the warranty of your entire K-Aqua system."
    }
  },
  "labels": {
    "applicationAreas": "Application Areas",
    "advantages": "Your Advantages at a Glance",
    "technicalDescription": "Technical Profile & SEO",
    "noResults": "No products found",
    "searchPlaceholder": "Search by title or article code..."
  }
};

const seoDictAr = {
  "seoArticle": {
    "pipes": {
      "areas": "تركيب مياه الشرب، أنظمة التدفئة، التكييف، المصانع الصناعية، بناء السفن",
      "advTitle": "تكنولوجيا أنابيب متفوقة لكل مشروع",
      "advList": [
        "بدون تآكل: مقاومة 100٪ للتآكل والصدأ.",
        "فقدان ضغط منخفض: السطح الداخلي الأملس يقلل الاحتكاك ويوفر طاقة المضخة.",
        "عمر طويل: مضمون بدون صيانة لأكثر من 50 عامًا من الاستخدام المستمر.",
        "تقليل الضوضاء: عزل صوتي ممتاز ضد ضوضاء التدفق.",
        "صحي: يلبي أشد معايير مياه الشرب الدولية (DVGW، KIWA)."
      ],
      "seoText": "يتم تصنيع أنابيبنا عالية الأداء في فالدسولمس وفقًا لأعلى معايير الجودة. يوفر الجمع بين مادتي PP-R و PP-RCT مقاومة استثنائية لدرجة الحرارة والضغط. سواء في تكنولوجيا البناء أو هندسة المصانع الصناعية أو أنظمة التبريد المعقدة، يوفر هذا النظام أقصى درجات الأمان والكفاءة. تضمن تكنولوجيا اللحام البسيطة والآمنة وصلات خالية تمامًا من التسرب."
    },
    "fittings": {
      "areas": "شبكات مياه الشرب، التركيبات الصحية، التوزيع الصناعي، التدفئة",
      "advTitle": "وصلات آمنة ومتجانسة",
      "advList": [
        "اندماج متجانس: يذوب الأنبوب والوصلة في وحدة لا تنفصل.",
        "لا حاجة للحشيات: لا يتطلب التوصيل الدائم حلقات دائرية معرضة للخطأ.",
        "تركيب سهل: معالجة سريعة وآمنة في الموقع.",
        "تدفق كامل: لا يوجد تقليل في المقطع العرضي، مما يحافظ على ضغط النظام.",
        "مقاومة كيميائية: مقاوم لمجموعة واسعة من الوسائط العدوانية."
      ],
      "seoText": "وصلات K-Aqua هي الرابط الحيوي لشبكات الأنابيب الموثوقة. تم تصنيع هذه الوصلات في ألمانيا، وتوفر أعلى درجات الدقة. تستغرق تقنية لحام المقبس ثوانٍ فقط وتبرد لتشكل وصلة قوية مثل الأنبوب نفسه. هذا يزيل خطر التسربات الدقيقة التي تحدث غالبًا مع أنظمة الضغط أو الدفع بعد سنوات من الاستخدام."
    },
    "valves": {
      "areas": "إغلاق الفروع، التحكم في النظام، مشعبات التوزيع، الصناعة",
      "advTitle": "تحكم دقيق ووظيفة متينة",
      "advList": [
        "بدون صيانة: تم تصميم الميكانيكا لعقود من التشغيل السلس.",
        "تجويف كامل: صمامات كروية بمقطع عرضي كامل تقلل من فقدان الضغط.",
        "سهولة التكامل: يمكن لحامها مباشرة في نظام PP-R.",
        "مواد عالية الجودة: مقاعد الصمامات والكرات مصنوعة من سبائك مقاومة للتآكل.",
        "إغلاق آمن: محكم بنسبة 100٪ حتى تحت التغيرات الشديدة في الضغط ودرجة الحرارة."
      ],
      "seoText": "تجمع صمامات القطع K-Aqua بين تكنولوجيا اللحام PP-R المثبتة والمكونات الميكانيكية عالية الجودة. تتيح التحكم الدقيق في السوائل والعزل الآمن لأقسام الشبكة للصيانة. يخضع كل صمام لاختبار ضغط صارم قبل التسليم لضمان أقصى درجات أمان التشغيل في التطبيقات الحرجة."
    },
    "fallback": {
      "areas": "تكنولوجيا التركيب الشاملة، مستلزمات مواقع البناء، استكمال النظام",
      "advTitle": "استكمال مثالي للنظام",
      "advList": [
        "جودة معتمدة: يتوافق مع نظام إدارة الجودة ISO 9001.",
        "توافق النظام: متطابق تمامًا مع نظام أنابيب K-Aqua.",
        "متانة: مواد قوية لظروف مواقع البناء القاسية.",
        "تطبيق آمن: وظيفة مضمونة عند الاستخدام المهني.",
        "اقتصاد: نسبة ممتازة للسعر والأداء."
      ],
      "seoText": "كمزود نظام، لا توفر K-Aqua الأنابيب والوصلات فحسب، بل توفر أيضًا جميع الأدوات والملحقات اللازمة. من آلات اللحام عالية الدقة إلى قواطع الأنابيب الموثوقة، تضمن أدواتنا معالجة متوافقة مع المعايير وأقصى درجات أمان التركيب. اعتمد على الملحقات الأصلية للحفاظ على ضمان نظام K-Aqua بالكامل."
    }
  },
  "labels": {
    "applicationAreas": "مجالات التطبيق",
    "advantages": "المزايا في لمحة",
    "technicalDescription": "الملف الفني والوصف (SEO)",
    "noResults": "لم يتم العثور على منتجات",
    "searchPlaceholder": "ابحث عن طريق العنوان أو رمز المقال..."
  }
};

const updateFile = (filename, dataToMerge) => {
  if (!fs.existsSync(filename)) return;
  const content = fs.readFileSync(filename, 'utf8');
  const data = JSON.parse(content);
  data.products = { ...data.products, ...dataToMerge };
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

updateFile('messages/de.json', seoDictDe);
updateFile('messages/en.json', seoDictEn);
updateFile('messages/ar.json', seoDictAr);
console.log('Translations updated.');
