const fs = require('fs');
let resources = fs.readFileSync('saved_resources.json', 'utf8');
let markets = fs.readFileSync('just_markets.json', 'utf8');

// Resources ends with }, but we need to remove the outer brackets if any?
// saved_resources.json is lines 5643 to 5923, which is:
//   "resources": {
//     ...
//   }

let finalStr = resources.trim() + ",\n  \"markets\": " + markets.trim() + ",\n  \"wissen\": {},\n  \"seoArticle\": {},\n  \"referenzenPage\": {}\n}";
fs.writeFileSync('step1_replacement.txt', finalStr);
