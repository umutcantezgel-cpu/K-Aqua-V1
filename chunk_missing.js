const fs = require('fs');
const de = require('./messages/de.json');
const tr = require('./messages/hr.json');

function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out.set(prefix, String(node)); return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}

const deKeys = [...flatten(de).keys()];
const trKeys = flatten(tr);
const missing = deKeys.filter(k => !trKeys.has(k));

// group missing by top level key
const missingByTop = {};
missing.forEach(k => {
  const top = k.split(/\.|\[/)[0];
  if (!missingByTop[top]) missingByTop[top] = [];
  missingByTop[top].push(k);
});

console.log('Top level missing keys and counts:');
for (const [top, keys] of Object.entries(missingByTop)) {
  console.log(`- ${top}: ${keys.length}`);
}
