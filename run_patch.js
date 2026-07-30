const fs = require('fs');

let target = fs.readFileSync('messages/ur.json', 'utf8').split('\n');
let patch = fs.readFileSync('patch_prod_seo.json', 'utf8').split('\n');
patch = patch.slice(0, -1); // remove empty trailing newline if any

target.splice(3119, 3234 - 3120 + 1, ...patch);

fs.writeFileSync('messages/ur.json', target.join('\n'));
