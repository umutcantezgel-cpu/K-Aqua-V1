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

const combined = `"kontaktBlocks": ${JSON.stringify(k, null, 2)},\n"catalogx": ${JSON.stringify(c, null, 2)},\n"products": ${JSON.stringify(p, null, 2)},\n"resources": ${JSON.stringify(r, null, 2)}`;

const chunks = combined.match(/[\s\S]{1,10000}/g);
chunks.forEach((chunk, i) => fs.writeFileSync(`empty_chunk_${i}.txt`, chunk));
console.log(chunks.length);
