const fs = require('fs');

const original = fs.readFileSync('messages/sk.json', 'utf8').trim();
// removing the last brace
const originalNoBrace = original.slice(0, -1);

const fast = JSON.parse(fs.readFileSync('translated_fast.json', 'utf8'));

// trustx and partnerx are already correct now? No, I only replaced trustx and partnerx!
// Wait, I successfully replaced trustx and partnerx!
// I just need to replace academyx, aboutx, legal, resources, markets, productsx

let appendStr = '';
const targetKeys = ['academyx', 'aboutx', 'legal', 'resources', 'markets', 'productsx'];
for (const k of targetKeys) {
  appendStr += `,\n"${k}": ` + JSON.stringify(fast[k], null, 2);
}

const finalJson = originalNoBrace + appendStr + '\n}\n';
fs.writeFileSync('sk_test.json', finalJson);
