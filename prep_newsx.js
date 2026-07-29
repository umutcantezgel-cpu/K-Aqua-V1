const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let injection = `  "newsx": {
    "moreEyebrow": "Περισσότερα",
    "moreTitle": "Σχετικά Άρθρα",
    "moreLead": "Διαβάστε περισσότερα νέα.",
    "readMore": "Διαβάστε Περισσότερα",
    "readLess": "Λιγότερα",
    "posts": ${JSON.stringify(de.newsx.posts)},`;

fs.writeFileSync('rep_newsx.txt', injection);
