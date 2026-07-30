const fs = require('fs');
let lt = fs.readFileSync('lt.json', 'utf8');
const patch = fs.readFileSync('patch_products_rest.json', 'utf8');

lt = lt.replace(
  /        "error": "Įvyko klaida. Prašome pabandyti vėliau."\n      }\n    }\n  },\n  "productsx": {/g,
  '        "error": "Įvyko klaida. Prašome pabandyti vėliau."\n      }\n    },\n' + patch + '\n  },\n  "productsx": {'
);

fs.writeFileSync('lt.json', lt);
