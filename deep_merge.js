const fs = require('fs');

function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
      Object.assign(source[key], mergeDeep(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

const ko = JSON.parse(fs.readFileSync('messages/ko.json', 'utf8'));
const academy = JSON.parse(fs.readFileSync('ko_academy_full.json', 'utf8'));
const others = JSON.parse(fs.readFileSync('ko_others.json', 'utf8'));
const rm = JSON.parse(fs.readFileSync('ko_resources_markets.json', 'utf8'));

mergeDeep(ko, academy);
mergeDeep(ko, others);
mergeDeep(ko, rm);

fs.writeFileSync('messages/ko_temp.json', JSON.stringify(ko, null, 2));
