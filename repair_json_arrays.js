const fs = require('fs');
const path = require('path');

function fixArrays(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixArrays);
  } else if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj);
    const isSequentialArray = keys.length > 0 && keys.every(k => !isNaN(parseInt(k))) && 
      keys.sort((a,b)=>parseInt(a)-parseInt(b)).every((k, i) => parseInt(k) === i);
    
    if (isSequentialArray) {
      const arr = [];
      for (let i = 0; i < keys.length; i++) {
        arr.push(fixArrays(obj[String(i)]));
      }
      return arr;
    } else {
      const newObj = {};
      for (const key of keys) {
        newObj[key] = fixArrays(obj[key]);
      }
      return newObj;
    }
  }
  return obj;
}

const msgsDir = path.join(__dirname, 'messages');
const files = fs.readdirSync(msgsDir).filter(f => f.endsWith('.json'));

for (const f of files) {
  const p = path.join(msgsDir, f);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const fixed = fixArrays(data);
  fs.writeFileSync(p, JSON.stringify(fixed, null, 2));
  console.log('Fixed arrays in ' + f);
}
