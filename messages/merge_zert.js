const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_zertifizierung.json', 'utf8'));

lt.academy.zertifizierung = patch;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
