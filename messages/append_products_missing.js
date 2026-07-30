const fs = require('fs');
let lt = fs.readFileSync('lt.json', 'utf8');
const patch = fs.readFileSync('patch_products_missing.json', 'utf8');
lt = lt.replace('"products": {\n', '"products": {\n' + patch + ',\n');
fs.writeFileSync('lt.json', lt);
