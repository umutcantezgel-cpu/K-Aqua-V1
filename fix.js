const fs = require('fs');
let text = fs.readFileSync('messages/zh-Hans.json', 'utf8');
if (!text.trim().endsWith('}\n}')) {
  fs.writeFileSync('messages/zh-Hans.json', text.trim() + '\n}\n');
}
