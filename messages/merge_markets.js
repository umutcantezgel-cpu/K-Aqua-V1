const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));

let land = JSON.parse(fs.readFileSync('patch_landwirtschaft.json', 'utf8'));
let klima = JSON.parse(fs.readFileSync('patch_klimaanlagen.json', 'utf8'));

for (let k in land) {
  lt.markets.landwirtschaft[k] = land[k];
}
for (let k in klima) {
  lt.markets.klimaanlagen[k] = klima[k];
}

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
