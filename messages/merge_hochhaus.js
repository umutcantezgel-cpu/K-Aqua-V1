const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_hochhaus.json', 'utf8'));

lt.solutions.hochhaus = { ...lt.solutions.hochhaus, ...patch.hochhaus };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
