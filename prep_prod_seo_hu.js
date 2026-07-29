const fs = require('fs');
let de = JSON.parse(fs.readFileSync('prod_seo_de.json', 'utf8'));

// I'll just merge the existing hu.json's translation for fields that exist,
// and translate the missing ones via script output to a file, which I'll insert using MCP.
const hu = require('./messages/hu.json').products.seoArticle;
for (let key in de) {
  if (hu[key]) {
    if (de[key].advList && de[key].advList.length > hu[key].advList.length) {
      // Just pad with the missing items in German, then I can translate them in the file before injection.
      hu[key].advList = de[key].advList;
    }
  } else {
    hu[key] = de[key];
  }
}
fs.writeFileSync('prod_seo_hu.json', JSON.stringify(hu, null, 2));
