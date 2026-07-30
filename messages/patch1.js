const fs = require('fs');
const de = JSON.parse(fs.readFileSync('de.json')).catalogx.items;
const ka = JSON.parse(fs.readFileSync('ka.json'));

const keys = Object.keys(de);
for (const key of keys) {
  ka.catalogx.items[key] = {
    seo_p1: de[key].seo_p1,
    seo_p2: de[key].seo_p2,
    seo_p3: de[key].seo_p3,
    faq: de[key].faq
  };
}

fs.writeFileSync('ka.json', JSON.stringify(ka, null, 2));
