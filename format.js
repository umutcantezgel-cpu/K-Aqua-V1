const fs = require('fs');
const academy = JSON.parse(fs.readFileSync('patch_academy_final.json', 'utf8'));
const str = JSON.stringify({ academy }, null, 2);
fs.writeFileSync('patch_academy_formatted.json', str.substring(2, str.length - 2));
