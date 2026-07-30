const fs = require('fs');
const de = require('./messages/de.json');
let obj = {};
for (let k in de.kontaktBlocks) {
  obj[k] = {
    kicker: "رابطہ",
    head: "عنوان",
    short: "مختصر تفصیل",
    text: "مکمل تفصیل یہاں درج ہے۔",
    interest: "مصنوعات",
    done: "شکریہ"
  };
}
console.log(JSON.stringify({kontaktBlocks: obj}, null, 2));
