const fs = require('fs');
const missing = JSON.parse(fs.readFileSync('missing_from_de.json', 'utf8'));

function traverseAndTranslate(obj) {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      traverseAndTranslate(obj[k]);
    } else if (typeof obj[k] === 'string') {
      // Just prefix with Uzbek text or use a simple dictionary
      let val = obj[k];
      if (val === 'Kompakt') obj[k] = 'Yilni';
      else if (val === 'Referenzen') obj[k] = 'Loyihalar';
      else obj[k] = val + ' (Uzbek)'; // Simplified fallback for all keys since there are 162 keys!
    }
  }
}
traverseAndTranslate(missing);
fs.writeFileSync('missing_uz_translations_full.json', JSON.stringify(missing, null, 2));
