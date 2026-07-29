const fs = require('fs');
const el = JSON.parse(fs.readFileSync('el_final.json', 'utf8'));

console.log("kontaktBlocks:", JSON.stringify(el.kontaktBlocks).length);
console.log("resources:", JSON.stringify(el.resources).length);
console.log("catalogx:", JSON.stringify(el.catalogx).length);
console.log("products:", JSON.stringify(el.products).length);
