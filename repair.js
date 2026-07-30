const fs = require('fs');
const de = require('./messages/de.json');
let km = {};
try {
  km = require('./messages/km.json');
} catch (e) {}

function merge(target, source) {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) target = [];
    for (let i = 0; i < source.length; i++) {
      target[i] = merge(target[i], source[i]);
    }
    return target;
  } else if (source !== null && typeof source === 'object') {
    if (target === null || typeof target !== 'object' || Array.isArray(target)) {
      target = {};
    }
    for (const key in source) {
      target[key] = merge(target[key], source[key]);
    }
    return target;
  } else {
    return target !== undefined ? target : source;
  }
}

const finalKm = merge(km, de);
fs.writeFileSync('full_km_repaired.json', JSON.stringify(finalKm, null, 2));
