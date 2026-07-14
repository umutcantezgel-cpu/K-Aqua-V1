const fs = require('fs');
const langs = ['en', 'de', 'ar'];
const cats = ['pipes', 'fittings', 'transitionFittings', 'valves', 'weldInSaddles', 'tools', 'accessories'];

for (const lang of langs) {
  const data = JSON.parse(fs.readFileSync(`messages/${lang}.json`));
  const seo = data.products ? data.products.seoArticle : data.seoArticle;
  console.log(`\n--- ${lang.toUpperCase()} ---`);
  for (const cat of cats) {
    if (seo[cat] && seo[cat].advTitle) {
      console.log(`${cat}: ${seo[cat].advTitle}`);
    } else {
      console.log(`${cat}: MISSING`);
    }
  }
}
