const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function emptyArrays(obj) {
  if (Array.isArray(obj)) {
    return []; // Empty the arrays!
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

const c = emptyArrays(de.catalogx);
const p = emptyArrays(de.products);
const k = emptyArrays(de.kontaktBlocks);
const r = emptyArrays(de.resources);

console.log("Empty arrays catalogx:", JSON.stringify(c).length);
console.log("Empty arrays products:", JSON.stringify(p).length);
console.log("Empty arrays kontaktBlocks:", JSON.stringify(k).length);
console.log("Empty arrays resources:", JSON.stringify(r).length);

let missing = 0;
function check(d, t, path) {
  for (const k in d) {
    if (typeof d[k] === 'object' && d[k] !== null && !Array.isArray(d[k])) {
      if (t[k] === undefined) {
        missing++;
        console.log("Missing object:", path + k);
      } else {
        check(d[k], t[k], path + k + ".");
      }
    } else {
      if (t[k] === undefined) {
        missing++;
        console.log("Missing key:", path + k);
      }
    }
  }
}
check(de.catalogx, c, "catalogx.");
check(de.products, p, "products.");
check(de.kontaktBlocks, k, "kontaktBlocks.");
check(de.resources, r, "resources.");
console.log(missing, "missing keys");
