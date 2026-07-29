const fs = require('fs');
const lines = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let open = 0;
for(let i=1546; i<1710; i++) {
  const line = lines[i];
  for(let c of line) {
    if (c === '{') open++;
    if (c === '}') open--;
  }
  console.log(`Line ${i+1}: open=${open} | ${line.trim()}`);
}
