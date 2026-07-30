const fs = require('fs');
let data = JSON.parse(fs.readFileSync('hi.json', 'utf8'));
const remaining = JSON.parse(fs.readFileSync('products_remaining_hi.json', 'utf8'));

if (data.products) {
    Object.assign(data.products, remaining);
    fs.writeFileSync('hi.json', JSON.stringify(data, null, 2));
    console.log("Successfully merged remaining products keys");
} else {
    console.log("Could not find products block in hi.json");
}
