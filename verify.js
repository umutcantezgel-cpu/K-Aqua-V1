const fs = require('fs');
const de = require('./messages/de.json');
const hr = require('./messages/hr.json');

function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out.set(prefix, String(node)); return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}

const deKeys = [...flatten(de).keys()];
const trKeys = flatten(hr);
const missing = deKeys.filter(k => !trKeys.has(k));

console.log('Total keys in de.json:', deKeys.length);
console.log('Total keys in hr.json:', [...trKeys.keys()].length);
console.log('Missing keys:', missing.length);
