import { readFileSync, writeFileSync } from 'fs';

const tsFile = readFileSync('lib/data/catalog.ts', 'utf-8');

// just extract the items using string manipulation
const items = [];
const lines = tsFile.split('\n');
let currentItem = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('slug:')) {
    currentItem.slug = line.split(':')[1].replace(/[",\s]/g, '');
  } else if (line.startsWith('title:')) {
    currentItem.title = line.split('title:')[1].trim().replace(/^"|"$/g, '').replace(/",$/, '');
  } else if (line.startsWith('codes:')) {
    currentItem.codes = line.split('codes:')[1].trim().replace(/^"|"$/g, '').replace(/",$/, '');
  } else if (line.startsWith('material:')) {
    currentItem.material = line.split('material:')[1].trim().replace(/^"|"$/g, '').replace(/",$/, '');
  } else if (line.startsWith('sdr:')) {
    currentItem.sdr = line.split('sdr:')[1].trim().replace(/,$/, '');
  } else if (line.startsWith('head:')) {
    if (currentItem.slug && currentItem.title) {
      if (!currentItem.material) currentItem.material = 'Standard PP-R / PP-RCT';
      if (!currentItem.sdr) currentItem.sdr = 'Varies';
      items.push({...currentItem});
      currentItem = {};
    }
  }
}

writeFileSync('/tmp/catalog_items.json', JSON.stringify(items, null, 2));
console.log(`Extracted ${items.length} items`);
