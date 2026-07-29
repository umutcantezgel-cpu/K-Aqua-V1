const fs = require('fs');

if (fs.existsSync('rest_sr.json')) {
    const rest = require('./rest_sr.json');
    const sr = require('./messages/sr.json');
    
    // We want to combine sr + rest.
    // But we also have manual translations for products and solutions.
    // Let's load the manual ones.
    // Wait, products_combined.txt is a string snippet, not a valid full JSON file, 
    // but we can parse it if we wrap it.
    
    let productsStr = fs.readFileSync('products_combined.txt', 'utf8');
    // products_combined starts with `, "products": { ... }`
    productsStr = "{" + productsStr.replace(/^,/, '') + "}";
    const betterProducts = JSON.parse(productsStr).products;
    
    let solutionsStr = fs.readFileSync('solutions_sr.txt', 'utf8');
    // solutions_sr starts with `, "solutions": { ... }`
    solutionsStr = "{" + solutionsStr.replace(/^,/, '') + "}";
    const betterSolutions = JSON.parse(solutionsStr).solutions;
    
    // override rest
    if (betterProducts) rest.products = betterProducts;
    if (betterSolutions) rest.solutions = betterSolutions;
    
    // generate a patch text to inject into sr.json
    let restStr = JSON.stringify(rest, null, 2);
    // remove the outer { and }
    restStr = restStr.substring(1, restStr.length - 1);
    
    fs.writeFileSync('final_patch.txt', ',' + restStr);
    console.log('final_patch.txt generated.');
} else {
    console.log('rest_sr.json not ready yet.');
}
