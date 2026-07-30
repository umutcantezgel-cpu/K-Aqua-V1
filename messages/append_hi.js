const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');
let markets = fs.readFileSync('markets_formatted.json', 'utf8');
let kb = fs.readFileSync('hi_kontaktBlocks_tmp_indented.txt', 'utf8');
kb = '  "kontaktBlocks": ' + kb.trimStart();

let replaced = false;
content = content.replace(/\n  \}\n\}\n?$/, (match) => {
    replaced = true;
    return '\n  },\n' + markets.trimEnd() + ',\n' + kb.trimEnd() + '\n}\n';
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended.");
}
