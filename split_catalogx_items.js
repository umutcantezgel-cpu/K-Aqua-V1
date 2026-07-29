const fs = require('fs');
const de = require('./scratch/missing_only.json').catalogx;
const items = Object.entries(de.items);

const chunkSize = 25;
let part = 1;
for (let i = 0; i < items.length; i += chunkSize) {
  const chunk = Object.fromEntries(items.slice(i, i + chunkSize));
  fs.writeFileSync(`./scratch/catalogx_items_part${part}.json`, JSON.stringify(chunk, null, 2));
  console.log(`catalogx_items_part${part}.json: ${items.slice(i, i + chunkSize).length} items`);
  part++;
}

// also write catalogx without items
const { items: _, ...rest } = de;
fs.writeFileSync('./scratch/catalogx_rest.json', JSON.stringify(rest, null, 2));
