const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const it = JSON.parse(fs.readFileSync('messages/it.json', 'utf8'));

function compare(obj1, obj2, path = '') {
  for (const key in obj1) {
    if (obj2[key] === undefined) {
      console.log(`Missing in IT: ${path}${key}`);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      compare(obj1[key], obj2[key], `${path}${key}.`);
    }
  }
}
compare(de, it);
