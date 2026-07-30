const fs = require('fs');
let txt = fs.readFileSync('full_km_repaired.json', 'utf8');

// strip leading '{' and trailing '}'
txt = txt.trim();
txt = txt.substring(1, txt.length - 1);

let lines = txt.split('\n');
let chunkLines = 600;
let num = 0;

for (let i = 0; i < lines.length; i += chunkLines) {
  let chunk = lines.slice(i, i + chunkLines).join('\n');
  if (i === 0) {
    chunk = "{\n" + chunk;
  }
  if (i + chunkLines >= lines.length) {
    chunk = chunk + "\n}";
  }
  fs.writeFileSync(`c_${num}.txt`, chunk);
  num++;
}
console.log(num + " chunks created");
