const temp = require('./messages/sr_temp.json');
function shrinkKeys(obj) {
    if (typeof obj === 'string') return obj.substring(0, 10);
    if (Array.isArray(obj)) return obj.map(shrinkKeys);
    if (typeof obj === 'object' && obj !== null) {
        const res = {};
        for (const [k, v] of Object.entries(obj)) {
            res[k] = shrinkKeys(v);
        }
        return res;
    }
    return obj;
}
const p = shrinkKeys(temp.products);
console.log("products size:", JSON.stringify(p).length);
