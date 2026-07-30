const fs = require('fs');
let data = JSON.parse(fs.readFileSync('hi.json', 'utf8'));
const missingKeys = JSON.parse(fs.readFileSync('patch_products_missing_hi.json', 'utf8'));

Object.assign(data.products.valves, missingKeys.valves);
Object.assign(data.products.transitionFittings, missingKeys.transitionFittings);

fs.writeFileSync('hi.json', JSON.stringify(data, null, 2));
console.log("Successfully patched missing keys in products");
