const fs = require('fs');

const data = {
  de: {
    specAndDim: "Spezifikationen & Dimensionen",
    certsAndNorms: "Zertifikate & Normen",
    approved: "geprüft",
    monitoring: "überwacht",
    certified: "zertifiziert",
    quickLinks: "Schnellzugriff",
    calcCo2: "CO2-Fußabdruck berechnen",
    backToFinder: "Zurück zum Produktfinder"
  },
  en: {
    specAndDim: "Specifications & Dimensions",
    certsAndNorms: "Certificates & Norms",
    approved: "approved",
    monitoring: "monitored",
    certified: "certified",
    quickLinks: "Quick Links",
    calcCo2: "Calculate CO2 Footprint",
    backToFinder: "Back to Product Finder"
  },
  ar: {
    specAndDim: "المواصفات والأبعاد",
    certsAndNorms: "الشهادات والمعايير",
    approved: "معتمد",
    monitoring: "مراقب",
    certified: "موثق",
    quickLinks: "روابط سريعة",
    calcCo2: "احسب البصمة الكربونية",
    backToFinder: "العودة إلى الباحث عن المنتجات"
  }
};

['de', 'en', 'ar'].forEach(lang => {
  const file = `messages/${lang}.json`;
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (!json.products) json.products = {};
  
  Object.keys(data[lang]).forEach(key => {
    json.products[key] = data[lang][key];
  });
  
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
});
