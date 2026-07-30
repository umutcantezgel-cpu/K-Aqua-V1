const fs = require('fs');

function buildAstMap(jsonStr) {
  let line = 1;
  let path = [];
  let inString = false;
  let escapeNext = false;
  let currentKey = null;
  let currentWord = '';
  
  const map = {}; // path -> line of closing brace
  
  // We need to keep track of array indices
  const indexStack = [];
  
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    
    if (char === '\n') {
      line++;
      continue;
    }
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\' && inString) {
      escapeNext = true;
      continue;
    }
    
    if (char === '"' && !inString) {
      inString = true;
      currentWord = '';
      continue;
    }
    
    if (char === '"' && inString) {
      inString = false;
      let j = i + 1;
      while (j < jsonStr.length && /\s/.test(jsonStr[j])) {
          if (jsonStr[j] === '\n') {
              // wait, we can't increment line here without messing up outer loop, 
              // but whitespace parsing here is just a lookahead, we don't consume it.
          }
          j++;
      }
      if (jsonStr[j] === ':') {
        currentKey = currentWord;
      }
      continue;
    }
    
    if (inString) {
      currentWord += char;
      continue;
    }
    
    if (char === '{' || char === '[') {
      if (currentKey !== null) {
        path.push(currentKey);
        currentKey = null;
      } else if (path.length > 0) {
        // It's an element in an array!
        // We push the current index
        let idx = indexStack[indexStack.length - 1] || 0;
        path.push(idx.toString());
      }
      
      // when we enter a new {}, we reset its child index to 0
      indexStack.push(0);
    }
    
    if (char === ',') {
       // increment index for the current level
       if (indexStack.length > 0) {
           indexStack[indexStack.length - 1]++;
       }
       // if we were in an array but didn't open a {}, the key remains null.
    }
    
    if (char === '}' || char === ']') {
      indexStack.pop();
      const pStr = path.join('.');
      map[pStr] = line;
      path.pop();
    }
  }
  
  return map;
}

const uz = fs.readFileSync('messages/uz.json', 'utf8');
const map = buildAstMap(uz);
fs.writeFileSync('ast_map.json', JSON.stringify(map, null, 2));
console.log('Mapped', Object.keys(map).length, 'paths');
