const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_academy_4.json', 'utf8'));

lt.academy.schulungen.curriculum.title = patch.schulungen.curriculum.title;

lt.academy.zertifizierung.lab = patch.zertifizierung.lab;
lt.academy.zertifizierung.cta = patch.zertifizierung.cta;
if (!lt.academy.zertifizierung.bento.items) lt.academy.zertifizierung.bento.items = [];
lt.academy.zertifizierung.bento.items[4] = patch.zertifizierung.bento.items[0];

lt.academy.glossar.bento = patch.glossar.bento;
lt.academy.glossar.timeline = patch.glossar.timeline;
lt.academy.glossar.conclusion = patch.glossar.conclusion;
lt.academy.glossar.cta = patch.glossar.cta;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
