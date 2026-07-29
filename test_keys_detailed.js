const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const target = JSON.parse(fs.readFileSync('messages/' + process.argv[2] + '.json', 'utf8'));

let missing = 0;
function check(d, t, path) {
  for (const k in d) {
    if (typeof d[k] === 'object' && d[k] !== null) {
      if (t[k] === undefined || t[k] === "") {
        missing++;
        console.log("Missing object:", path + k);
      } else {
        check(d[k], t[k], path + k + ".");
      }
    } else {
      if (t[k] === undefined || t[k] === "") {
        missing++;
        console.log("Missing key:", path + k);
      }
    }
  }
}
check(de, target, "");
console.log(missing, "missing keys");
