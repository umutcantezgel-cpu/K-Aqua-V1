const fs = require('fs');
let data = JSON.parse(fs.readFileSync('hi.json', 'utf8'));
const translatedItems = JSON.parse(fs.readFileSync('items_12_23_hi.json', 'utf8'));

if (!data.catalogx) data.catalogx = {};
if (!data.catalogx.items) data.catalogx.items = {};

for (let key in translatedItems) {
    data.catalogx.items[key] = translatedItems[key];
}

fs.writeFileSync('hi.json', JSON.stringify(data, null, 2));
console.log("Successfully patched catalogx.items 12-23");
