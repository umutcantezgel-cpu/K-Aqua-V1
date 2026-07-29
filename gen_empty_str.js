const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function emptyClone(obj) {
  if (Array.isArray(obj)) {
    return obj; 
  } else if (typeof obj === 'object' && obj !== null) {
    const clone = {};
    for (const k in obj) {
      clone[k] = emptyClone(obj[k]);
    }
    return clone;
  } else {
    return "";
  }
}

const c = emptyClone(de.catalogx);
const p = emptyClone(de.products);
const k = emptyClone(de.kontaktBlocks);

fs.writeFileSync('empty_str.txt', `"kontaktBlocks": ${JSON.stringify(k, null, 2)},\n"catalogx": ${JSON.stringify(c, null, 2)},\n"products": ${JSON.stringify(p, null, 2)}\n`);
