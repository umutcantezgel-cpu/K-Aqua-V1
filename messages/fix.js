const fs = require('fs');
let data = JSON.parse(fs.readFileSync('ka.json', 'utf8'));

// extract the mistakenly placed properties
const keysToMove = ['kontaktForm', 'enterprise', 'referenzenPage', 'seoExpansion'];
for (const key of keysToMove) {
    if (data.catalogx && data.catalogx[key]) {
        data[key] = data.catalogx[key];
        delete data.catalogx[key];
    }
}

fs.writeFileSync('ka.json', JSON.stringify(data, null, 2));
