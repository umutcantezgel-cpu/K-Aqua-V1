const fs = require('fs');
for (let i = 0; i <= 33; i++) {
    if (!fs.existsSync(`scratch_chunk_${i}.json`)) continue;
    let raw = fs.readFileSync(`scratch_chunk_${i}.json`, 'utf8');
    let inner = raw.trim().replace(/^\{\n/, '').replace(/\n\}$/, '');
    fs.writeFileSync(`patch_${i}.txt`, ",\n" + inner + "\n}");
}
