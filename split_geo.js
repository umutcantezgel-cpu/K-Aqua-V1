const fs = require('fs');
const de = require('./messages/de.json').geoContent;
const hu = JSON.parse(fs.readFileSync('mcp_geoContent.json', 'utf8'));

// hu is the tool call json!
const repl = hu.ReplacementContent;
// repl contains the full text. Let's find a place to split it.
// Let's split it at `"istanbul": {`
const lines = repl.split('\n');
const istanbulIdx = lines.findIndex(l => l.includes('"istanbul": {'));

const part1 = lines.slice(0, istanbulIdx).join('\n') + '\n  },\n  "trust": {';
const part2 = lines.slice(istanbulIdx, -2).join('\n') + '\n  }';

console.log('--- PART 1 START ---');
console.log(part1.length);
console.log('--- PART 2 START ---');
console.log(part2.length);

fs.writeFileSync('geo_part1.txt', part1);
fs.writeFileSync('geo_part2.txt', part2);
