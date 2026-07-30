const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_krankenhaus.json', 'utf8'));

lt.solutions.krankenhaus = { ...lt.solutions.krankenhaus, ...patch.krankenhaus };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
