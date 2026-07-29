const fs = require('fs');
const content = fs.readFileSync('messages/el.json', 'utf8');

const cities = ["amman", "istanbul", "kairo", "nairobi", "kapstadt", "mumbai", "singapur", "kualalumpur"];
const chunks = [];

const lines = content.split('\n');

for (const city of cities) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"${city}": {`)) {
      // Find focusHeading inside this block
      for (let j = i; j < i + 20; j++) {
        if (lines[j].includes('"focusHeading":')) {
          const target = lines[j];
          const replacement = target + `,\n      "extendedMarketText": "Η παρουσία μας σε αυτή την αγορά ενισχύεται από τοπικούς συνεργάτες και εξειδικευμένες λύσεις."`;
          chunks.push({
            AllowMultiple: false,
            StartLine: j + 1,
            EndLine: j + 1,
            TargetContent: target,
            ReplacementContent: replacement
          });
          break;
        }
      }
      break;
    }
  }
}
fs.writeFileSync('geo_chunks.json', JSON.stringify(chunks, null, 2));
