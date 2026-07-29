const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const sv = JSON.parse(fs.readFileSync('messages/sv.json', 'utf8'));

let count = 0;
function compare(objDe, objSv, path) {
  if (typeof objDe === 'string') {
    if (objDe !== "" && objSv === "") {
      console.log(`Missing translation: ${path}`);
      count++;
    }
  } else if (typeof objDe === 'object' && objDe !== null) {
    if (!objSv) return; // handled by object missing checks if we had them
    for (const k in objDe) {
      if (objSv[k] !== undefined) {
        compare(objDe[k], objSv[k], path ? `${path}.${k}` : k);
      }
    }
  }
}
compare(de, sv, "");
console.log(`Total missing: ${count}`);
