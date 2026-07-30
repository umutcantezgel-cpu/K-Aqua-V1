const fs = require('fs');

function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object && !Array.isArray(source[key])) {
      mergeDeep(target[key], source[key]);
    } else {
      // If it's an array, we just assign it directly or merge by index if needed.
      // Wait, in my missing arrays, they might just be full arrays, or arrays with empty objects {}.
      // If the source has an array with {} elements, we merge by index.
      if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        for (let i=0; i<source[key].length; i++) {
          if (source[key][i] && Object.keys(source[key][i]).length > 0) {
            target[key][i] = mergeDeep(target[key][i] || {}, source[key][i]);
          }
        }
        // ensure target array is at least as long
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

const ko = JSON.parse(fs.readFileSync('messages/ko_temp.json', 'utf8'));
const prods = JSON.parse(fs.readFileSync('ko_products_solutions.json', 'utf8'));
const final2 = JSON.parse(fs.readFileSync('ko_missing_final_2.json', 'utf8'));

mergeDeep(ko, prods);
mergeDeep(ko, final2);

fs.writeFileSync('messages/ko_temp2.json', JSON.stringify(ko, null, 2));
