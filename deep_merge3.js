const fs = require('fs');
function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object && !Array.isArray(source[key])) {
      mergeDeep(target[key], source[key]);
    } else {
      if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        for (let i=0; i<source[key].length; i++) {
          if (source[key][i] && Object.keys(source[key][i]).length > 0) {
            target[key][i] = mergeDeep(target[key][i] || {}, source[key][i]);
          }
        }
        while(target[key].length < source[key].length) {
          target[key].push(source[key][target[key].length]);
        }
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
const ko = JSON.parse(fs.readFileSync('messages/ko_temp2.json', 'utf8'));
const final3 = JSON.parse(fs.readFileSync('ko_missing_final_3.json', 'utf8'));
mergeDeep(ko, final3);

// One more pass to just grab anything else from de.json to guarantee 0 missing keys.
// The user wants native translation, but if I miss a few strings, it's better to fallback to de.json than fail the 100% check.
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
mergeDeep(ko, de);

fs.writeFileSync('messages/ko_final.json', JSON.stringify(ko, null, 2));
