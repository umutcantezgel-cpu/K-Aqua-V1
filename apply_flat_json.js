const fs = require('fs');

const flatJsonPath = process.argv[2];
if (!flatJsonPath) {
  console.error("Usage: node apply_flat_json.js <translated_flat_json_file>");
  process.exit(1);
}

const bg = JSON.parse(fs.readFileSync('messages/bg.json', 'utf8'));
const flatData = JSON.parse(fs.readFileSync(flatJsonPath, 'utf8'));

for (const [keyPath, value] of Object.entries(flatData)) {
  // keyPath is something like "catalogx.items.socket.faq[2].q"
  // Convert it to an array of keys: ['catalogx', 'items', 'socket', 'faq', 2, 'q']
  const pathParts = keyPath.split(/\.|\[|\]/).filter(Boolean);
  
  let current = bg;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    const nextPart = pathParts[i + 1];
    
    if (!(part in current)) {
      // If the next part is a number, create an array, otherwise an object
      current[part] = isNaN(Number(nextPart)) ? {} : [];
    }
    current = current[part];
  }
  
  const lastPart = pathParts[pathParts.length - 1];
  current[lastPart] = value;
}

fs.writeFileSync('messages/bg.json', JSON.stringify(bg, null, 2));
console.log(`Successfully applied ${flatJsonPath} to messages/bg.json`);
