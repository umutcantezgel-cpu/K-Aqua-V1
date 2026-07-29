const fs = require('fs');
const json = `{
  "test": 1,
  "test": 2
}`;
const obj = JSON.parse(json);
console.log(obj.test);
