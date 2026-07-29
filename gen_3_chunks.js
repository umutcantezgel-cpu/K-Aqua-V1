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

const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));
el.catalogx = c;
el.products = p;
el.kontaktBlocks = k;
el.resources = r;

const fullJson = JSON.stringify(el, null, 2);
fs.writeFileSync('el_final.json', fullJson);

// Now we need to figure out how to inject this.
// If we replace the ENTIRE file, we can't do it in 1 tool call.
// Can we replace it in 10 parts? 
// No, multi_replace_file_content needs EXACT TargetContent.
// If the target is the old file, we need 10 chunks where each replaces a small section?
