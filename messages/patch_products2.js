const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const bsu = JSON.parse(fs.readFileSync('bento_sticky_upc_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "bento": ${JSON.stringify(bsu.bento)},\n  "sticky": ${JSON.stringify(bsu.sticky)},\n  "uniqueProductContext": ${JSON.stringify(bsu.uniqueProductContext)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products chunk 2.");
} else {
    console.log("Could not find products block in hi.json");
}
