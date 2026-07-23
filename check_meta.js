const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

const keys = [
  { name: 'loesungen', title: de.solutions.index.meta.title, desc: de.solutions.index.meta.desc },
  { name: 'referenzen', title: de.pages.references[0], desc: de.pages.references[1] },
  { name: 'ausschreibungstexte', title: de.resources.ausschreibungstexte.meta.title, desc: de.resources.ausschreibungstexte.meta.desc },
  { name: 'support', title: de.resources.support.metaTitle, desc: de.resources.support.metaDesc },
  { name: 'tools', title: de.products.tools.metaTitle, desc: de.products.tools.metaDesc },
  { name: 'valves', title: de.products.valves.metaTitle, desc: de.products.valves.metaDesc }
];

keys.forEach(k => {
  console.log(`\n--- ${k.name} ---`);
  console.log(`Title (${k.title?.length}): ${k.title}`);
  console.log(`Desc (${k.desc?.length}): ${k.desc}`);
});
