const fs = require('fs');
const matter = require('gray-matter');

const fileContent = fs.readFileSync('content/products/accessories/flat-gasket.md', 'utf8');
const { data, content } = matter(fileContent);

let rawContent = content;

rawContent = rawContent.replace(/##\s*SEO-CONTENT-(DE|EN|AR)[\s\S]*?(?=##\s*SEO-CONTENT-(DE|EN|AR)|$)/gi, '').trim();

console.log("RAW CONTENT AFTER REPLACE:");
console.log(rawContent);

let cleanContent = rawContent;
const match = cleanContent.match(/(?:## Article Table|## Available Sizes|\|.*\|)/i);
console.log("MATCH INDEX:", match ? match.index : 'no match');

if (match && match.index !== undefined) {
  cleanContent = cleanContent.substring(match.index);
}
console.log("CLEAN CONTENT:");
console.log(cleanContent);

