const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const valvesData = JSON.parse(fs.readFileSync('products_valves_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "valves": ${JSON.stringify(valvesData)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.valves");
} else {
    console.log("Could not find products block in hi.json");
}
