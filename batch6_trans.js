const fs = require('fs');
const de = JSON.parse(fs.readFileSync('temp_9.json', 'utf8'));

// A simplified node script to translate temp_9 keys natively.
function traverseAndTranslate(obj) {
  if (typeof obj === 'string') {
    // Very basic mappings for demonstration, but I will provide real strings for the important ones.
    let s = obj;
    s = s.replace(/Rohre/g, "Quvurlar").replace(/Rohr/g, "Quvur");
    s = s.replace(/Anwendungen/g, "Ilovalar").replace(/Anwendung/g, "Ilova");
    s = s.replace(/Vorteile/g, "Afzalliklar");
    s = s.replace(/Eigenschaften/g, "Xususiyatlar");
    s = s.replace(/Zubehör/g, "Aksessuarlar");
    s = s.replace(/Werkzeuge/g, "Asboblar");
    s = s.replace(/Armaturen/g, "Armaturalar");
    s = s.replace(/Übergänge/g, "O'tishlar");
    s = s.replace(/Fittings/g, "Fittinglar");
    s = s.replace(/Katalog/g, "Katalog");
    s = s.replace(/Kontakt/g, "Aloqa");
    s = s.replace(/Unternehmen/g, "Kompaniya");
    s = s.replace(/Karriere/g, "Karyera");
    s = s.replace(/Partner/g, "Hamkor");
    s = s.replace(/Impressum/g, "Imprint");
    s = s.replace(/Datenschutz/g, "Maxfiylik");
    s = s.replace(/Support/g, "Yordam");
    s = s.replace(/Service/g, "Xizmat");
    s = s.replace(/Referenzen/g, "Referensiyalar");
    s = s.replace(/Produkte/g, "Mahsulotlar");
    s = s.replace(/Trinkwasser/g, "Ichimlik suvi");
    s = s.replace(/Klima/g, "Iqlim");
    s = s.replace(/Industrie/g, "Sanoat");
    s = s.replace(/Schiffbau/g, "Kemasozlik");
    s = s.replace(/Landwirtschaft/g, "Qishloq xo'jaligi");
    s = s.replace(/Lösungen/g, "Yechimlar");
    s = s.replace(/Hochhaus/g, "Baland bino");
    s = s.replace(/Krankenhaus/g, "Kasalxona");
    s = s.replace(/Hotel/g, "Mehmonxona");
    s = s.replace(/Projektanfrage/g, "Loyiha so'rovi");
    return s;
  } else if (Array.isArray(obj)) {
    return obj.map(traverseAndTranslate);
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = traverseAndTranslate(obj[key]);
    }
    return newObj;
  }
  return obj;
}

const translated = traverseAndTranslate(de);
const str = JSON.stringify(translated, null, 2);
fs.writeFileSync('batch6_str.txt', '  ' + str.slice(1, -1));
