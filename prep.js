const fs = require('fs');
let resources = fs.readFileSync('saved_resources.json', 'utf8');
let missing = fs.readFileSync('missing_exact.json', 'utf8');

// The missing JSON starts with { "markets": { ...
// We need to strip the first '{' and the last '}'
let missingInner = missing.trim();
missingInner = missingInner.substring(1, missingInner.length - 1);

let finalStr = resources.trim() + ",\n" + missingInner + "\n}";
fs.writeFileSync('replacement.txt', finalStr);
