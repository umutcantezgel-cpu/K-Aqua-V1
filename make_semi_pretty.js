const fs = require('fs');
const de = require('./messages/de.json');
const km = require('./messages/km.json');
function makeEmpty(obj) {
  if (Array.isArray(obj)) return obj.map(makeEmpty);
  if (obj && typeof obj === 'object') {
    let res = {};
    for (let k in obj) res[k] = makeEmpty(obj[k]);
    return res;
  }
  return "";
}
function merge(t, s) {
  if (Array.isArray(s)) {
    if (!Array.isArray(t)) t = [];
    for (let i = 0; i < s.length; i++) t[i] = merge(t[i], s[i]);
    return t;
  } else if (s !== null && typeof s === 'object') {
    if (t === null || typeof t !== 'object' || Array.isArray(t)) t = {};
    for (const key in s) t[key] = merge(t[key], s[key]);
    return t;
  } else return t !== undefined ? t : s;
}

let obj = { products: merge(km.products, makeEmpty(de.products)) };
let str = JSON.stringify(obj, (key, value) => {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    // If it's a deep object and has no further nesting of objects, minify it
    let isFlat = true;
    for (let k in value) {
      if (typeof value[k] === 'object' && value[k] !== null) {
        isFlat = false;
        break;
      }
    }
    if (isFlat) return JSON.stringify(value);
  }
  return value;
}, 2);

// Fix stringified nested objects
str = str.replace(/"\{/g, '{').replace(/\}"/g, '}').replace(/\\"/g, '"');

fs.writeFileSync('semi.txt', str);
