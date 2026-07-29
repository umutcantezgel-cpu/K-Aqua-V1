const fs = require('fs');
const missing = require('./missing_products.json');

// Write out specific chunks
const chunk1 = {
  products: {
    hero: missing.products.hero,
    sticky: missing.products.sticky,
    bento: missing.products.bento,
    timeline: missing.products.timeline,
    range: missing.products.range
  }
};
const chunk2 = {
  products: {
    tools: missing.products.tools,
    valves: missing.products.valves,
    category: missing.products.category,
    fittings: missing.products.fittings,
    pipes: missing.products.pipes,
    transitionFittings: missing.products.transitionFittings
  }
};

const chunk3 = {
  products: {
    tableHead: missing.products.tableHead,
    tableRows: missing.products.tableRows,
    seoArticle: missing.products.seoArticle,
    labels: missing.products.labels
  }
};

fs.writeFileSync('chunk1.json', JSON.stringify(chunk1, null, 2));
fs.writeFileSync('chunk2.json', JSON.stringify(chunk2, null, 2));
fs.writeFileSync('chunk3.json', JSON.stringify(chunk3, null, 2));

// get remaining
const allKeys = Object.keys(missing.products);
const usedKeys = [...Object.keys(chunk1.products), ...Object.keys(chunk2.products), ...Object.keys(chunk3.products)];
const remainingKeys = allKeys.filter(k => !usedKeys.includes(k));

const chunk4 = { products: {} };
remainingKeys.forEach(k => {
  chunk4.products[k] = missing.products[k];
});
fs.writeFileSync('chunk4.json', JSON.stringify(chunk4, null, 2));
