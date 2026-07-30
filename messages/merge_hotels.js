const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_hotels.json', 'utf8'));

lt.solutions.hotels = { ...lt.solutions.hotels, ...patch.hotels };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
