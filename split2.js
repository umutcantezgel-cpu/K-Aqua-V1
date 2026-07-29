const fs = require('fs');
const hu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
const chunk1 = hu.slice(3265, 3320).join('\n');
const chunk2 = hu.slice(3320, 3381).join('\n');
console.log('Chunk 1:', chunk1.length, 'Chunk 2:', chunk2.length);
