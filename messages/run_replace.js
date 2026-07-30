const fs = require('fs');
let content = fs.readFileSync('ka.json', 'utf8');
const replacement = fs.readFileSync('append_with_brace.txt', 'utf8');
if (content.endsWith("  }\n}\n")) {
  content = content.replace(/  }\n}\n$/, replacement + "\n");
} else if (content.endsWith("  }\n}")) {
  content = content.replace(/  }\n}$/, replacement + "\n");
}
fs.writeFileSync('ka.json', content);
