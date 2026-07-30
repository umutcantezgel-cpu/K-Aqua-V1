const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const fittingsData = JSON.parse(fs.readFileSync('products_fittings_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "fittings": ${JSON.stringify(fittingsData)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.fittings");
} else {
    console.log("Could not find products block in hi.json");
}
