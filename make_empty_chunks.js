const fs = require('fs');
let txt = fs.readFileSync('minimal_missing.json', 'utf8');

// strip leading '{' and trailing '}'
txt = txt.trim();
txt = txt.substring(1, txt.length - 1);

let lines = txt.split('\n');
let chunkLines = 2000;
let num = 0;

for (let i = 0; i < lines.length; i += chunkLines) {
  let chunk = lines.slice(i, i + chunkLines).join('\n');
  if (i === 0) chunk = "{\n" + chunk;
  if (i + chunkLines >= lines.length) chunk = chunk + "\n}";
  fs.writeFileSync(`empty_${num}.txt`, chunk);
  num++;
}
