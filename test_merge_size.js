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
function merge(target, source) {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) target = [];
    for (let i = 0; i < source.length; i++) target[i] = merge(target[i], source[i]);
    return target;
  } else if (source !== null && typeof source === 'object') {
    if (target === null || typeof target !== 'object' || Array.isArray(target)) target = {};
    for (const key in source) target[key] = merge(target[key], source[key]);
    return target;
  } else {
    return target !== undefined ? target : source;
  }
}
const merged = merge(km.products, makeEmpty(de.products));
console.log("Length minified:", JSON.stringify(merged).length);
console.log("Length pretty:", JSON.stringify(merged, null, 2).length);
