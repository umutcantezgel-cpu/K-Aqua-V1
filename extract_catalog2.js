import { readFileSync, writeFileSync } from 'fs';

// Since the file uses TS and we can't easily import it without tsx,
// I'll parse it using a more robust regex or just execute it as JS after removing types.

const tsFile = readFileSync('lib/data/catalog.ts', 'utf-8');

// A reliable way to extract the items array:
// We can find all "slug: "..." " in the file.
let match;
const items = [];
const slugRe = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*codes:\s*"([^"]+)"(?:,\s*material:\s*"([^"]+)")?(?:,\s*sdr:\s*([\d.]+))?/g;

while ((match = slugRe.exec(tsFile)) !== null) {
  items.push({
    slug: match[1],
    title: match[2],
    codes: match[3],
    material: match[4] || 'Standard PP-R / PP-RCT',
    sdr: match[5] || 'Varies'
  });
}

writeFileSync('/tmp/catalog_items_v2.json', JSON.stringify(items, null, 2));
console.log(`Extracted ${items.length} items`);
