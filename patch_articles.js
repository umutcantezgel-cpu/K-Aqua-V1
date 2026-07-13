const fs = require('fs');
const files = [
  'content/wissen/nachhaltigkeit-rohrsysteme.md',
  'content/wissen/korrosionsbestaendigkeit-trinkwasser.md',
  'content/wissen/vorteile-pp-rct.md'
];

const shortTitles = {
  'nachhaltigkeit-rohrsysteme.md': 'Nachhaltigkeit in der Rohrleitungstechnik',
  'korrosionsbestaendigkeit-trinkwasser.md': 'Korrosionsbeständigkeit bei Trinkwasser',
  'vorteile-pp-rct.md': 'Vorteile von PP-RCT'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const filename = file.split('/').pop();
  const shortTitle = shortTitles[filename];
  
  if (!content.includes('shortTitle:')) {
    content = content.replace('title: ', `shortTitle: "${shortTitle}"\ntitle: `);
    fs.writeFileSync(file, content);
  }
});
