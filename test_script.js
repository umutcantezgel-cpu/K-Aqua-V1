const de = { products: { a: 1, narrative: { title: "A" } } };
const t = { products: { a: 1 }, "products.narrative": { title: "A" } };
let missing = 0;
function check(d, t, path) {
  for (const k in d) {
    if (typeof d[k] === 'object' && d[k] !== null) {
      if (t[k] === undefined) {
        missing++;
        console.log("Missing object:", path + k);
      } else {
        check(d[k], t[k], path + k + ".");
      }
    } else {
      if (t[k] === undefined || (t[k] === "" && d[k] !== "")) {
        missing++;
        console.log("Missing key:", path + k);
      }
    }
  }
}
check(de, t, "");
console.log(missing, "missing keys");
