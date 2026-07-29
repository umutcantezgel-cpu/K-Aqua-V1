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

const c = JSON.stringify(emptyArrays(de.catalogx), null, 2);
const p = JSON.stringify(emptyArrays(de.products), null, 2);
const k = JSON.stringify(emptyArrays(de.kontaktBlocks), null, 2);
const r = JSON.stringify(emptyArrays(de.resources), null, 2);

fs.writeFileSync('rep_k_r.txt', `  "kontaktBlocks": ${k},\n  "resources": ${r},\n  "catalogx": {},\n  "products": {}\n}`);
fs.writeFileSync('rep_c.txt', `  "catalogx": ${c},\n  "products": {}\n}`);
fs.writeFileSync('rep_p.txt', `  "products": ${p}\n}`);
console.log("Ready");
