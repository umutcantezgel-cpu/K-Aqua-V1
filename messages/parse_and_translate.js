const fs = require('fs');
const items = JSON.parse(fs.readFileSync('items_64_71.json', 'utf8'));
console.log(Object.keys(items));
