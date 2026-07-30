const fs = require('fs');
let de = require('./messages/de.json');
let km = require('./messages/km.json');
km.products = de.products;
km.solutions = de.solutions;
km.academy = de.academy;
km.geoContent = de.geoContent;
km.trustx = de.trustx;
km.partnerx = de.partnerx;
fs.writeFileSync('temp_block1.json', JSON.stringify({
  products: km.products,
  solutions: km.solutions,
  academy: km.academy,
  geoContent: km.geoContent,
  trustx: km.trustx,
  partnerx: km.partnerx
}, null, 2));
