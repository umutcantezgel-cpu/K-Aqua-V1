const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function emptyArrays(obj) {
  if (Array.isArray(obj)) {
    return []; 
  } else if (typeof obj === 'object' && obj !== null) {
    const clone = {};
    for (const k in obj) {
      clone[k] = emptyArrays(obj[k]);
    }
    return clone;
  } else {
    return "";
  }
}

const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));
el.catalogx = emptyArrays(de.catalogx);
el.products = emptyArrays(de.products);
el.kontaktBlocks = emptyArrays(de.kontaktBlocks);
el.resources = emptyArrays(de.resources);

const c = JSON.stringify(el.catalogx, null, 2);
const p = JSON.stringify(el.products, null, 2);
const k = JSON.stringify(el.kontaktBlocks, null, 2);
const r = JSON.stringify(el.resources, null, 2);

const rep = `  "catalogx": ${c},\n  "products": ${p},\n  "kontaktBlocks": ${k},\n  "resources": ${r}\n}`;
fs.writeFileSync('rep_final.txt', rep);
console.log("rep_final.txt created, length:", rep.length);
