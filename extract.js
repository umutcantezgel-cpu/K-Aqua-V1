const fs = require('fs');

const content = fs.readFileSync('lib/data/catalog.ts', 'utf-8');

// We can just use a crude parsing method or run it through ts-node.
// Since catalog.ts uses ES modules, let's just strip exports and run it in a function.
const stripped = content.replace(/export (type|interface)[^]*?(?=\nexport)/g, '')
  .replace(/export /g, '')
  .replace(/CatalogCategory\[\]/g, 'any[]');

const script = `
  ${stripped}
  console.log(JSON.stringify(CATALOG.map(c => ({
    cat: c.id,
    items: c.items.map(i => ({slug: i.slug, title: i.title, material: i.material, sdr: i.sdr, codes: i.codes}))
  })), null, 2));
`;
fs.writeFileSync('temp_run.js', script);
