const { execSync } = require('child_process');
const output = execSync('node test_keys_detailed.js lt').toString();
const lines = output.split('\n');
let sum = 0;
for (const line of lines) {
  const match = line.match(/missing (\d+) keys/);
  if (match) sum += parseInt(match[1]);
}
console.log(`Total missing: ${sum}`);
