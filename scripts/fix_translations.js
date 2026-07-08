const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../messages');
const deJsonPath = path.join(MESSAGES_DIR, 'de.json');

const deData = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

const files = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json') && f !== 'de.json');

files.forEach(file => {
  const p = path.join(MESSAGES_DIR, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  const merged = deepMerge(JSON.parse(JSON.stringify(deData)), data);
  
  fs.writeFileSync(p, JSON.stringify(merged, null, 2));
  console.log(`Synced ${file}`);
});
