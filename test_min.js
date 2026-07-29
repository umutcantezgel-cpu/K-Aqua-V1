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
const r = emptyClone(de.resources);

const minified = `"kontaktBlocks": ${JSON.stringify(k)},\n"catalogx": ${JSON.stringify(c)},\n"products": ${JSON.stringify(p)},\n"resources": ${JSON.stringify(r)}`;
console.log("Minified characters:", minified.length);
