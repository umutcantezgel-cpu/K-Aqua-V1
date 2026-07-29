const fs = require('fs');
const content = fs.readFileSync('messages/mk.json', 'utf8');
let depth = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '{') depth++;
  if (content[i] === '}') depth--;
  if (depth === 0 && content[i] === '}') {
    console.log("JSON closed at index", i, "around text:", content.substring(i-20, i+20));
    break;
  }
}
