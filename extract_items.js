const fs = require("fs");
const content = fs.readFileSync("/Users/umurey/Downloads/K-Aqua-V1-main/lib/data/catalog.ts", "utf-8");
const slugs = [];
const lines = content.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("slug:")) {
    const slug = lines[i].split("\"")[1];
    const title = lines[i+1] ? lines[i+1].split("\"")[1] : "";
    let material = "";
    let sdr = "";
    for (let j = i; j < i + 10; j++) {
      if (lines[j] && lines[j].includes("material:")) material = lines[j].split("\"")[1];
      if (lines[j] && lines[j].includes("sdr:")) sdr = lines[j].split(":")[1].replace(",", "").trim();
    }
    slugs.push({ slug, title, material, sdr });
  }
}
fs.writeFileSync("/Users/umurey/Downloads/K-Aqua-V1-main/scratch_items.json", JSON.stringify(slugs, null, 2));
console.log(`Found ${slugs.length} items`);
