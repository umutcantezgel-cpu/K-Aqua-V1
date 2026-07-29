const fs = require('fs');
const de = require('./messages/de.json');
const tr = require('./messages/hr.json');

function flatten(node, prefix = '', out = {}) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out[prefix] = node; return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}

const deFlat = flatten(de);
const trFlat = flatten(tr);
const missingKeys = Object.keys(deFlat).filter(k => !(k in trFlat));

const reconstructed = {};
for (const k of missingKeys) {
  const parts = k.split(/\.|\[|\]/).filter(Boolean);
  let current = reconstructed;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = isNaN(parts[i+1]) ? {} : [];
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = deFlat[k];
}

fs.writeFileSync('./scratch/missing_only.json', JSON.stringify(reconstructed, null, 2));
