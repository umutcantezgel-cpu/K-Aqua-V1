const { pathToRegexp } = require("path-to-regexp");
const keys = [];
const regexp = pathToRegexp("/:locale([a-zA-Z-]{2,7})/downloads", keys);
console.log(regexp.test("/de/downloads")); // true
console.log(regexp.test("/zh-Hans/downloads")); // true
console.log(regexp.test("/ressourcen/downloads")); // false
