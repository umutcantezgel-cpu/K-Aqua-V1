const de = require('./messages/de.json');
const sr = require('./messages/sr.json');
function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') { out.set(prefix, String(node)); return out; }
  if (Array.isArray(node)) { node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out)); return out; }
  for (const [k, v] of Object.entries(node)) { flatten(v, prefix ? `${prefix}.${k}` : k, out); }
  return out;
}
const deKeys = [...flatten(de).keys()];
const srKeys = flatten(sr);
const missing = deKeys.filter(k => !srKeys.has(k));

let groups = {};
for (let m of missing) {
    let top = m.split('.')[0];
    groups[top] = (groups[top] || 0) + 1;
}
console.log(groups);
