const fs = require('fs');
const d = require('./messages/de.json');

function fill(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fill);
  }
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (let k in obj) {
      res[k] = fill(obj[k]);
    }
    return res;
  }
  return "Melayu";
}

const key = process.argv[2];
if (key) {
  console.log(JSON.stringify(fill(d[key]), null, 2));
}
