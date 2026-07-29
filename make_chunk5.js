const de = require('./messages/de.json');
const sol = de.solutions;
const res = { solutions: {
  eyebrow: sol.eyebrow, title1: sol.title1, titleGrad: sol.titleGrad, title2: sol.title2, lead: sol.lead, benefits: sol.benefits, nextEyebrow: sol.nextEyebrow, nextTitle: sol.nextTitle, nextLead: sol.nextLead, nextCta: sol.nextCta,
  krankenhaus: sol.krankenhaus,
  hotels: sol.hotels
}};
const fs = require('fs');
fs.writeFileSync('chunk5_de.json', JSON.stringify(res, null, 2));
