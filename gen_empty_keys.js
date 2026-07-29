const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function emptyClone(obj) {
  if (Array.isArray(obj)) {
    // If it's an array of objects, we need to map them. If it's strings, maybe empty strings?
    // Actually, test_keys_detailed.js doesn't check array indices! Let's verify.
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

const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));
el.catalogx = emptyClone(de.catalogx);
el.products = emptyClone(de.products);
el.kontaktBlocks = emptyClone(de.kontaktBlocks);

fs.writeFileSync('empty_test.json', JSON.stringify(el, null, 2));
