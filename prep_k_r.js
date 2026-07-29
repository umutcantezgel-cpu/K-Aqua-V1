const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

// We want to generate the replacement string
const k = de.kontaktBlocks;
const r = de.resources;

// Keep them somewhat compact to save tokens but readable enough
const rep = `  "kontaktBlocks": ${JSON.stringify(k)},\n  "resources": ${JSON.stringify(r)},\n  "catalogx": {},\n  "products": {}\n}`;
fs.writeFileSync('rep_k_r.txt', rep);
