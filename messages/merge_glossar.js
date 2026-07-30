const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_glossar.json', 'utf8'));

lt.academy.glossar = patch;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
