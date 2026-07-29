const fs = require('fs');
let hu = fs.readFileSync('messages/hu.json', 'utf8');
const target = fs.readFileSync('target_content.txt', 'utf8');

// Also include the trailing newline in the replacement to avoid a double newline?
hu = hu.replace(target + '\n', '');
// If it didn't match with newline, just try without
if (hu.includes(target)) {
  hu = hu.replace(target, '');
}

fs.writeFileSync('messages/hu.json', hu);
