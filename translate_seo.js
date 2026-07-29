const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8')).seoArticle;

// Just copy it to a new file for now, we'll manually translate inside the script or I'll just write the translated string directly.
