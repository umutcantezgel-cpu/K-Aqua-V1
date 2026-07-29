const fs = require('fs');
let bg = fs.readFileSync('messages/bg.json', 'utf8');
let refPage = fs.readFileSync('referenzenPage_bg.json', 'utf8');
// I need to format refPage
refPage = '  "referenzenPage": ' + JSON.stringify(JSON.parse(refPage), null, 2).replace(/\n/g, '\n  ') + ',';
// extract old referenzenPage from bg.json and replace it
// But we can just use multi_replace_file_content!
fs.writeFileSync('ref_replace.txt', refPage);
