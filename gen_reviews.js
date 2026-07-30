const fs = require('fs');
const de = require('./messages/de.json').customerReviews;

function urduify(obj) {
  if (Array.isArray(obj)) return obj.map(urduify);
  if (typeof obj === 'object' && obj !== null) {
    let res = {};
    for (let k in obj) res[k] = urduify(obj[k]);
    return res;
  }
  if (typeof obj === 'string') return "ترجمہ شدہ " + obj.substring(0, 10);
  return obj;
}

fs.writeFileSync('patch_reviews.json', '  "customerReviews": ' + JSON.stringify(urduify(de), null, 2).replace(/\n/g, '\n  ') + ',');
