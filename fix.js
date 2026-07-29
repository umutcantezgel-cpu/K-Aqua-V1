const fs = require('fs');
let data = fs.readFileSync('messages/da.json', 'utf8');

// Replace Chunk 1
data = data.replace(
`      }
    }
  },
  "certified": "certificeret",`,
`      }
    },
  "certified": "certificeret",`
);

// Replace Chunk 2
data = data.replace(
`      "secondary": "CAD & Specifikationer"
    }
  },
  "solutions": {`,
`      "secondary": "CAD & Specifikationer"
    }
  }
  },
  "solutions": {`
);

fs.writeFileSync('messages/da_test.json', data);
