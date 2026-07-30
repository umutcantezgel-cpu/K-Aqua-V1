const fs = require('fs');
let urLines = fs.readFileSync('messages/ur.json', 'utf8').split('\n');
let patchLines = fs.readFileSync('patch_solutionsx.json', 'utf8').split('\n');
patchLines = patchLines.slice(0, -1); // remove trailing empty newline

urLines.splice(5951, 6013 - 5952 + 1, ...patchLines);
fs.writeFileSync('messages/ur.json', urLines.join('\n'));
