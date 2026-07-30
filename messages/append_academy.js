const fs = require('fs');
let lt = fs.readFileSync('lt.json', 'utf8');
const patch = fs.readFileSync('patch_academy.json', 'utf8');
lt = lt.trim();
if(lt.endsWith('}')) {
    lt = lt.substring(0, lt.length - 1) + ',\n' + patch + '\n}';
    fs.writeFileSync('lt.json', lt);
}
