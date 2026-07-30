const fs = require('fs');
let data = JSON.parse(fs.readFileSync('hi.json', 'utf8'));
const catalogxData = JSON.parse(fs.readFileSync('catalogx_no_items_hi.json', 'utf8'));

// Only catalogx top level keys, not items
if (!data.catalogx) {
    data.catalogx = {};
}
for (let k in catalogxData) {
    data.catalogx[k] = catalogxData[k];
}

fs.writeFileSync('hi.json', JSON.stringify(data, null, 2));
console.log("Successfully patched catalogx top keys");
