const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const keys = ['geoContent', 'resources', 'markets', 'seoArticle', 'kontaktBlocks'];
const ext = {};
keys.forEach(k => ext[k] = de[k]);
fs.writeFileSync('de_part2.json', JSON.stringify(ext, null, 2));
