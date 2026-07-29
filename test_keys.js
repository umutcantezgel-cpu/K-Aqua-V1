const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const sk = JSON.parse(fs.readFileSync('messages/sk.json', 'utf8'));

function countKeys(obj) {
  let count = 0;
  for (let key in obj) {
    count++;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countKeys(obj[key]);
    }
  }
  return count;
}

console.log("de.json keys:", countKeys(de));
console.log("sk.json keys:", countKeys(sk));

const missing = [];
for (let key in de) {
  if (!sk[key]) missing.push(key);
}
console.log("Missing top-level keys:", missing);
