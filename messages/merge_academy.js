const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));

let p1 = JSON.parse(fs.readFileSync('patch_academy_1.json', 'utf8'));
let p2 = JSON.parse(fs.readFileSync('patch_academy_2.json', 'utf8'));
let p3 = JSON.parse(fs.readFileSync('patch_academy_3.json', 'utf8'));

if (!lt.academy) lt.academy = {};
lt.academy.schulungen = { ...p1, ...p2, ...p3 };

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
