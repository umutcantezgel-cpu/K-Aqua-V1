const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function keysOnly(obj) {
  if (Array.isArray(obj)) {
    return obj; 
  } else if (typeof obj === 'object' && obj !== null) {
    const clone = {};
    for (const k in obj) {
      clone[k] = keysOnly(obj[k]);
    }
    return clone;
  } else {
    return "";
  }
}

const c = keysOnly(de.catalogx);
const p = keysOnly(de.products);
const k = keysOnly(de.kontaktBlocks);
const r = keysOnly(de.resources);

console.log("Keys only catalogx:", JSON.stringify(c).length);
console.log("Keys only products:", JSON.stringify(p).length);
console.log("Keys only kontaktBlocks:", JSON.stringify(k).length);
console.log("Keys only resources:", JSON.stringify(r).length);
