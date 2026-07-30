const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const t = JSON.parse(fs.readFileSync('messages/sw.json', 'utf8'));
const missing = {};
function check(d, t_obj, path_obj) {
  for (const k in d) {
    if (typeof d[k] === 'object' && d[k] !== null && !Array.isArray(d[k])) {
      if (t_obj[k] === undefined) {
        path_obj[k] = d[k];
      } else {
        path_obj[k] = {};
        check(d[k], t_obj[k], path_obj[k]);
        if (Object.keys(path_obj[k]).length === 0) delete path_obj[k];
      }
    } else if (Array.isArray(d[k])) {
      if (t_obj[k] === undefined) {
        path_obj[k] = d[k];
      } else {
        path_obj[k] = [];
        let hasMissing = false;
        for (let i = 0; i < d[k].length; i++) {
          if (t_obj[k][i] === undefined) {
            path_obj[k][i] = d[k][i];
            hasMissing = true;
          } else if (typeof d[k][i] === 'object' && d[k][i] !== null) {
            path_obj[k][i] = {};
            check(d[k][i], t_obj[k][i], path_obj[k][i]);
            if (Object.keys(path_obj[k][i]).length === 0) {
              path_obj[k][i] = null;
            } else {
              hasMissing = true;
            }
          }
        }
        if (!hasMissing) delete path_obj[k];
      }
    } else {
      if (t_obj[k] === undefined || (t_obj[k] === "" && d[k] !== "")) {
        path_obj[k] = d[k];
      }
    }
  }
}
check(de, t, missing);
console.log(JSON.stringify(missing, null, 2).split('\n').length, 'lines missing');
