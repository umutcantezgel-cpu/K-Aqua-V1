const fs = require('fs');

const deData = {
  loesungen: { title: "Industrielle & Bautechnische Lösungen | PP-R Systeme", desc: "Entdecken Sie unsere Hochleistungspolymersysteme für kritische Infrastrukturen. K-Aqua bietet maßgeschneiderte PP-R Lösungen für industrielle Anwendungen." },
  referenzen: { title: "Weltweite K-Aqua Referenzprojekte & PP-R Installationen", desc: "Entdecken Sie weltweite Referenzprojekte mit K-Aqua PP-R Rohrsystemen. Unser interaktiver 3D-Globus zeigt häusliche, gewerbliche & industrielle Anlagen." },
  ausschreibungstexte: { title: "Offizielle Ausschreibungstexte für PP-R Rohrsysteme", desc: "Laden Sie detaillierte K-Aqua Ausschreibungstexte herunter. Wir bieten kompromisslose Sicherheit durch German Engineering für Ihre globalen Megaprojekte." },
  support: { title: "Technischer Support & Service für PP-R Rohrsysteme", desc: "Profitieren Sie vom technischen Support von K-Aqua. Wir begleiten Ihre Megaprojekte mit German Engineering, Hydraulikauslegung und Vor-Ort-Schweißbetreuung." },
  tools: { title: "Professionelle Werkzeuge & Zubehör für PP-R Systeme", desc: "Entdecken Sie professionelle K-Aqua Werkzeuge und Zubehörteile. Für sichere, effiziente und langlebige Installationen von PP-R und PP-RCT Rohrleitungssystemen." },
  valves: { title: "Hochwertige Armaturen & Ventile für PP-R Rohrsysteme", desc: "Entdecken Sie hochwertige Armaturen und Ventile von K-Aqua. Maximale Sicherheit und Langlebigkeit durch German Engineering für anspruchsvolle Rohrnetze." }
};

const enData = {
  loesungen: { title: "Industrial & Structural Solutions | PP-R Piping Systems", desc: "Discover our high-performance polymer systems for critical infrastructure. K-Aqua provides customized PP-R solutions for various industrial applications." },
  referenzen: { title: "Global Reference Projects & PP-R Installations", desc: "Explore worldwide reference projects with K-Aqua PP-R piping systems. Our interactive 3D globe showcases domestic, commercial and industrial installations." },
  ausschreibungstexte: { title: "Official Tender Specifications for PP-R Piping Systems", desc: "Download detailed K-Aqua tender specifications. We provide uncompromising safety through German Engineering for your global megaprojects and installations." },
  support: { title: "Technical Support & Service for PP-R Piping Systems", desc: "Benefit from K-Aqua's technical support. We accompany your megaprojects with German Engineering, hydraulic sizing, and on-site welding supervision services." },
  tools: { title: "Professional Tools & Accessories for PP-R Systems", desc: "Discover professional K-Aqua tools and accessories. Designed for safe, efficient, and durable installations of PP-R and PP-RCT piping systems worldwide." },
  valves: { title: "High-Quality Valves & Fittings for PP-R Piping Systems", desc: "Discover high-quality valves and fittings from K-Aqua. Maximum safety and durability through German Engineering for demanding and complex piping networks." }
};

const arData = {
  loesungen: { title: "الحلول الصناعية والإنشائية | أنظمة أنابيب PP-R", desc: "اكتشف أنظمة البوليمر عالية الأداء للبنية التحتية الحيوية. توفر K-Aqua حلول PP-R مخصصة لمختلف التطبيقات الصناعية المعقدة." },
  referenzen: { title: "مشاريع مرجعية عالمية وتركيبات أنابيب PP-R", desc: "استكشف المشاريع المرجعية العالمية باستخدام أنظمة أنابيب K-Aqua PP-R. يعرض الكرة الأرضية التفاعلية ثلاثية الأبعاد تركيباتنا المنزلية والتجارية والصناعية." },
  ausschreibungstexte: { title: "مواصفات العطاءات الرسمية لأنظمة أنابيب PP-R", desc: "قم بتنزيل مواصفات عطاءات K-Aqua التفصيلية. نحن نقدم أماناً لا هوادة فيه من خلال الهندسة الألمانية لمشاريعك الضخمة والتركيبات العالمية." },
  support: { title: "الدعم الفني والخدمات لأنظمة أنابيب PP-R", desc: "استفد من الدعم الفني لشركة K-Aqua. نحن نرافق مشاريعك الضخمة بالهندسة الألمانية، وتحديد الأحجام الهيدروليكية، وخدمات الإشراف على اللحام في الموقع." },
  tools: { title: "أدوات وملحقات احترافية لأنظمة أنابيب PP-R", desc: "اكتشف أدوات وملحقات K-Aqua الاحترافية. مصممة لتركيبات آمنة وفعالة ومتينة لأنظمة أنابيب PP-R و PP-RCT في جميع أنحاء العالم." },
  valves: { title: "صمامات وتركيبات عالية الجودة لأنظمة أنابيب PP-R", desc: "اكتشف الصمامات والتركيبات عالية الجودة من K-Aqua. أقصى درجات الأمان والمتانة من خلال الهندسة الألمانية لشبكات الأنابيب الصعبة والمعقدة." }
};

function updateFile(file, data) {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  // loesungen
  content.solutions.index.meta.title = data.loesungen.title;
  content.solutions.index.meta.desc = data.loesungen.desc;
  
  // referenzen (stored in pages.references)
  content.pages.references[0] = data.referenzen.title;
  content.pages.references[1] = data.referenzen.desc;
  
  // ausschreibungstexte
  content.resources.ausschreibungstexte.meta.title = data.ausschreibungstexte.title;
  content.resources.ausschreibungstexte.meta.desc = data.ausschreibungstexte.desc;
  
  // support
  content.resources.support.metaTitle = data.support.title;
  content.resources.support.metaDesc = data.support.desc;
  
  // tools
  content.products.tools.metaTitle = data.tools.title;
  content.products.tools.metaDesc = data.tools.desc;
  
  // valves
  content.products.valves.metaTitle = data.valves.title;
  content.products.valves.metaDesc = data.valves.desc;
  
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

updateFile('messages/de.json', deData);
updateFile('messages/en.json', enData);
updateFile('messages/ar.json', arData);

console.log("Updated de.json, en.json, ar.json");
