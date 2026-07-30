const fs = require('fs');
let content = fs.readFileSync('messages/uz.json', 'utf8');

// fix wissen scope
content = content.replace(
`      }
    },
    "wissen": {`,
`      }
    }
  },
  "wissen": {`
);

// fix end of file
content = content.replace(
`      }
    }
  }
}
`,
`      }
    }
}
`
);

fs.writeFileSync('messages/uz_test.json', content);
try {
  JSON.parse(content);
  console.log("Valid JSON!");
} catch (e) {
  console.log("Still invalid:", e.message);
}
