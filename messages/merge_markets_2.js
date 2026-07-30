const fs = require('fs');
let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));

let patch = JSON.parse(fs.readFileSync('patch_missing_markets_2.json', 'utf8'));

for (let market in patch) {
  for (let key in patch[market]) {
    lt.markets[market][key] = patch[market][key];
  }
}

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
