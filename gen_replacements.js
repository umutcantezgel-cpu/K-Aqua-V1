const fs = require('fs');
const files = ['messages/de.json', 'messages/en.json', 'messages/ar.json'];

const targets = {
  de: [
    { key: "sysTitle", h1: "Vier Bausteine, ein System.", parent: "products" },
    { key: "titleGrad", h1: "Wissen, das verbindet.", parent: "academy", leadKey: "lead" },
    { key: "title", h1: "Vertrauen ist messbar.", parent: "trust", leadKey: "lead" },
    { key: "titleGrad", h1: "Zwei Marken. Eine Haltung.", parent: "partner", leadKey: "lead" },
    { key: "title", h1: "Aktuelles von K-Aqua.", parent: "news", leadKey: "lead" }
  ],
  en: [
    { key: "sysTitle", h1: "Four building blocks, one system.", parent: "products" },
    { key: "title", h1: "Latest from K-Aqua.", parent: "news", leadKey: "lead" },
    { key: "titleGrad", h1: "Trust is measurable.", parent: "trust", leadKey: "lead" },
    { key: "title", h1: "Experience is your advantage.", parent: "unternehmen", leadKey: "lead" }
  ],
  ar: [
    { key: "sysTitle", h1: "أربع لبنات، نظام واحد.", parent: "products" },
    { key: "title", h1: "الجديد من K-Aqua.", parent: "news", leadKey: "lead" },
    { key: "titleGrad", h1: "علامتان. موقف واحد.", parent: "partner", leadKey: "lead" },
    { key: "titleGrad", h1: "الثقة قابلة للقياس.", parent: "trust", leadKey: "lead" },
    { key: "title", h1: "الخبرة هي ميزتك.", parent: "unternehmen", leadKey: "lead" }
  ]
};

// I will just use sed to do it manually if it's too hard to parse.
// Actually, I can use a script to find the exact line numbers and text.
