const fs = require('fs');
let urLines = fs.readFileSync('messages/ur.json', 'utf8').split('\n');
let patchLines = fs.readFileSync('patch_productsx.json', 'utf8').split('\n');
patchLines = patchLines.slice(0, -1); // remove trailing empty newline

urLines.splice(5712, 5739 - 5713 + 1, ...patchLines);
fs.writeFileSync('messages/ur.json', urLines.join('\n'));
