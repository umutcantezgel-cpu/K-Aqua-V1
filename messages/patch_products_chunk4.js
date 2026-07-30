const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const chunk4 = JSON.parse(fs.readFileSync('chunk4_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "transitionFittings": ${JSON.stringify(chunk4.transitionFittings)},\n  "tools": ${JSON.stringify(chunk4.tools)},\n  "timeline": ${JSON.stringify(chunk4.timeline)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products chunk 4");
} else {
    console.log("Could not find products block in hi.json");
}
