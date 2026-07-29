const fs = require('fs');
const de = require('./messages/de.json');
const keys = ['groups', 'pages', 'home', 'geo', 'footer', 'regions', 'homex', 'products', 'solutions', 'service'];
let result = {};
for (let key of keys) {
  result[key] = de[key];
}
fs.writeFileSync('chunk1.json', JSON.stringify(result, null, 2));
