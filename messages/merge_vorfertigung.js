const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_vorfertigung.json', 'utf8'));

lt.solutions.vorfertigung = { ...lt.solutions.vorfertigung, ...patch.vorfertigung };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
