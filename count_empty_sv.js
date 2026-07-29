const fs = require('fs');
const sv = JSON.parse(fs.readFileSync('messages/sv.json', 'utf8'));

function countEmptyStrings(obj) {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key] === '') {
      count++;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countEmptyStrings(obj[key]);
    }
  }
  return count;
}

const result = {};
for (const key in sv) {
  const c = countEmptyStrings(sv[key]);
  if (c > 0) result[key] = c;
}
console.log(result);
