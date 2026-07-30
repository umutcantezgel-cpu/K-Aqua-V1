const fs = require('fs');
const ko = JSON.parse(fs.readFileSync('messages/ko.json', 'utf8'));
const missing = JSON.parse(fs.readFileSync('missing.json', 'utf8'));

function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeDeep(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

mergeDeep(ko.markets, missing.markets);
mergeDeep(ko.seoArticle, missing.seoArticle);
mergeDeep(ko.kontaktBlocks, missing.kontaktBlocks);

fs.writeFileSync('ko_merged_end.json', JSON.stringify({
  markets: ko.markets,
  seoArticle: ko.seoArticle,
  kontaktBlocks: ko.kontaktBlocks
}, null, 2));
