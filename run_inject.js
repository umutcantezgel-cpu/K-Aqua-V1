const fs = require('fs');
const msPath = 'messages/ms.json';
const msStr = fs.readFileSync(msPath, 'utf8');

const targetStr = `    ]
  }
}`;
const replaceStr = `    ]
  },
  "geoContent": ` + fs.readFileSync('geoContent_ms.json', 'utf8') + `\n}`;

const newMsStr = msStr.replace(targetStr, replaceStr);
fs.writeFileSync(msPath, newMsStr);
