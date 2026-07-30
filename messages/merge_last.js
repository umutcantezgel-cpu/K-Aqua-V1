const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_last.json', 'utf8'));

lt.academy.zertifizierung.timeline.items[4] = patch.timeline_item;
lt.academy.zertifizierung.cta.desc = patch.cta_desc;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
