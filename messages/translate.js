const fs = require('fs');

const translate = async (text) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ur&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(s => s[0]).join('');
  } catch (e) {
    return text;
  }
};

const main = async () => {
  const ur = JSON.parse(fs.readFileSync('ur.json', 'utf8'));
  
  const isEnglish = (s) => {
    if (typeof s !== 'string') return false;
    if (/[\u0600-\u06ff]/.test(s)) return false;
    const words = s.match(/[A-Za-z]{3,}/g);
    return words && words.length > 1;
  };

  const traverse = async (node) => {
    if (typeof node === 'object' && node !== null) {
      if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
          if (typeof node[i] === 'string' && isEnglish(node[i])) {
             const t = await translate(node[i]);
             console.log(`Translated: ${t}`);
             node[i] = t;
          } else {
             await traverse(node[i]);
          }
        }
      } else {
        for (const key in node) {
          if (typeof node[key] === 'string' && isEnglish(node[key])) {
             if (key !== 'id' && key !== 'href' && !key.toLowerCase().includes('name') && !key.toLowerCase().includes('author') && !key.toLowerCase().includes('tab')) {
                 const t = await translate(node[key]);
                 console.log(`Translated [${key}]: ${t}`);
                 node[key] = t;
             }
          } else {
             await traverse(node[key]);
          }
        }
      }
    }
  };

  await traverse(ur.markets);
  await traverse(ur.kontaktBlocks);
  await traverse(ur.resources);
  
  fs.writeFileSync('ur.json', JSON.stringify(ur, null, 2));
};

main();
