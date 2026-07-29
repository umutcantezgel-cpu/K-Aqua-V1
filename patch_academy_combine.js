const fs = require('fs');
let patch = fs.readFileSync('patch_academy_full.json', 'utf8');
const combined = '  "academy": ' + patch;
fs.writeFileSync('patch_academy_full2.json', combined);
