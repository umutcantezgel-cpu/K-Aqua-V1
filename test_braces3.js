const fs = require('fs');
const content = fs.readFileSync('messages/mk.json', 'utf8');
let depth = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '{') depth++;
  if (content[i] === '}') depth--;
}
console.log("Final depth:", depth);
