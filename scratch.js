const fs = require('fs');
const de = JSON.parse(fs.readFileSync('./messages/de.json', 'utf8'));
const cs = JSON.parse(fs.readFileSync('./messages/tr.json', 'utf8'));

function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out.set(prefix, String(node)); return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}

const deKeys = [...flatten(de).keys()];
const csKeys = flatten(cs);
const missing = deKeys.filter(k => !csKeys.has(k));
console.log('Missing:', missing.length);
