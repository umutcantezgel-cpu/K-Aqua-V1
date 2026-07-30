const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_academy_misc.json', 'utf8'));

for (let key in patch) {
  lt.academy[key] = patch[key];
}

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
