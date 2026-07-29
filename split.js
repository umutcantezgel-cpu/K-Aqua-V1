const fs = require('fs');
for(let i=1; i<=4; i++) {
  const data = fs.readFileSync(`kontaktBlocks_bg_${i}.json`, 'utf8');
  let inner = data.substring(data.indexOf('\n') + 1, data.lastIndexOf('\n'));
  fs.writeFileSync(`chunk_${i}.txt`, ',\n' + inner);
}
