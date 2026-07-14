import { CATALOG } from './lib/data/catalog.ts';
import * as fs from 'fs';

const items = CATALOG.map(c => ({
  cat: c.id,
  items: c.items.map(i => ({slug: i.slug, title: i.title, material: i.material, sdr: i.sdr, codes: i.codes}))
}));

fs.writeFileSync('items.json', JSON.stringify(items, null, 2));
