const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

console.log("DE produkte lead:", de.products.lead);
console.log("DE academy lead:", de.academy.lead);
console.log("DE trust-center lead:", de.trust.scroll.desc);
console.log("DE partnerschaft lead:", de.partner.heroDesc);
console.log("DE news lead:", de.news.hero.lead);
