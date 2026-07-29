const fs = require('fs');
const target = fs.readFileSync('target_content_solutions.txt', 'utf8');
const replacement = fs.readFileSync('scratch_patch_solutions_full.json', 'utf8');
const mk = fs.readFileSync('messages/mk.json', 'utf8');
fs.writeFileSync('messages/mk.json', mk.replace(target, replacement));
console.log('Replaced via node script!');
