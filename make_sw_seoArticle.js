const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let out = JSON.stringify(de.products.seoArticle, null, 2);
fs.writeFileSync('sw_seoArticle.json', out);
