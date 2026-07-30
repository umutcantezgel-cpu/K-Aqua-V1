const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_lab.json', 'utf8'));

lt.academy.zertifizierung.lab.desc = patch.desc;
lt.academy.zertifizierung.lab.items = patch.items;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
