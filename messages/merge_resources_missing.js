const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_resources_missing.json', 'utf8'));

lt.resources.ausschreibungstexte = { ...lt.resources.ausschreibungstexte, ...patch.ausschreibungstexte };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
