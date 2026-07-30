const fs = require('fs');
const log = require('./ko_recover_log.json');
let ko = fs.readFileSync('messages/ko.json', 'utf8');

let text = ko;
let parts = [log[8], log[9]];
for (let p of parts) {
  let chunk = p.ReplacementChunks[0];
  text = text.replace(chunk.TargetContent, chunk.ReplacementContent);
}

fs.writeFileSync('temp_ko.json', text);
