const fs = require('fs');
const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));
const hi = JSON.parse(fs.readFileSync('hi.json', 'utf8'));
const missing = [];
for (let k in de.catalogx.items) {
    if (!hi.catalogx || !hi.catalogx.items || !hi.catalogx.items[k]) missing.push(k);
}
for (let k of missing) {
    console.log('\n---', k, '---');
    console.log(de.catalogx.items[k].seo_p1);
    console.log(de.catalogx.items[k].seo_p2);
    console.log(de.catalogx.items[k].seo_p3);
    de.catalogx.items[k].faq.forEach(f => console.log('Q:', f.q, 'A:', f.a));
}
