const fs = require('fs');
const path = require('path');

const files = {
  de: 'messages/de.json',
  en: 'messages/en.json',
  ar: 'messages/ar.json'
};

const seoTitles = {
  de: {
    pipes: "PP-R & PP-RCT Rohrsysteme Übersicht",
    fittings: "Kunststoff-Fittings & Formteile",
    valves: "Absperrventile & Kugelhähne",
    weldInSaddles: "Einschweißsättel für Rohrleitungen",
    accessories: "Zubehör für die Rohrinstallation",
    tools: "Schweißwerkzeuge & Rohrabschneider"
  },
  en: {
    pipes: "PP-R & PP-RCT Pipe Systems Overview",
    fittings: "Plastic Fittings & Connections",
    valves: "Shut-off Valves & Ball Valves",
    weldInSaddles: "Weld-in Saddles for Pipelines",
    accessories: "Accessories for Pipe Installation",
    tools: "Welding Tools & Pipe Cutters"
  },
  ar: {
    pipes: "نظرة عامة على أنظمة أنابيب PP-R و PP-RCT",
    fittings: "تجهيزات بلاستيكية ووصلات",
    valves: "صمامات الإغلاق والصمامات الكروية",
    weldInSaddles: "سروج اللحام للأنابيب",
    accessories: "ملحقات لتركيب الأنابيب",
    tools: "أدوات اللحام وقواطع الأنابيب"
  }
};

for (const [lang, file] of Object.entries(files)) {
  const filePath = path.join('/Users/umurey/Downloads/K-Aqua-V1-main', file);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(content);
  
  if (data.products && data.products.seoArticle) {
    for (const [cat, title] of Object.entries(seoTitles[lang])) {
      if (data.products.seoArticle[cat]) {
        data.products.seoArticle[cat].seoTitle = title;
      }
    }
  } else if (data.seoArticle) {
    // If it's at the top level
    for (const [cat, title] of Object.entries(seoTitles[lang])) {
      if (data.seoArticle[cat]) {
        data.seoArticle[cat].seoTitle = title;
      } else {
        data.seoArticle[cat] = { seoTitle: title };
      }
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Patched ${file}`);
}
