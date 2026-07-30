const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_hotels_sticky.json', 'utf8'));

lt.solutions.hotels.sticky = patch.hotels.sticky;

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
