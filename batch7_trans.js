const fs = require('fs');
const de = JSON.parse(fs.readFileSync('temp_10.json', 'utf8'));

function traverseAndTranslate(obj) {
  if (typeof obj === 'string') {
    let s = obj;
    // same basic translation
    s = s.replace(/Rohre/g, "Quvurlar").replace(/Rohr/g, "Quvur");
    s = s.replace(/Anwendungen/g, "Ilovalar").replace(/Anwendung/g, "Ilova");
    s = s.replace(/Zubehör/g, "Aksessuarlar");
    s = s.replace(/Werkzeuge/g, "Asboblar");
    s = s.replace(/Armaturen/g, "Armaturalar");
    s = s.replace(/Fittings/g, "Fittinglar");
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
fs.writeFileSync('temp_10_trans.json', JSON.stringify(translated, null, 2));
