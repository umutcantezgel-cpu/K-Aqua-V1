const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const pipesData = JSON.parse(fs.readFileSync('products_pipes_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "pipes": ${JSON.stringify(pipesData)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.pipes");
} else {
    console.log("Could not find products block in hi.json");
}
