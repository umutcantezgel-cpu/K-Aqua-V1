const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'products');
let productsCount = 0;
let categories = 0;

if (fs.existsSync(contentDir)) {
  const dirs = fs.readdirSync(contentDir);
  for (const d of dirs) {
    if (fs.statSync(path.join(contentDir, d)).isDirectory()) {
        categories++;
        const files = fs.readdirSync(path.join(contentDir, d));
        productsCount += files.filter(f => f.endsWith('.md')).length;
    }
  }
}
console.log("Categories:", categories);
console.log("Products:", productsCount);
