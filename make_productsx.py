import json

with open("messages/de.json", "r") as f:
    de = json.load(f)

productsx = de["productsx"]
with open("de_productsx.json", "w") as f:
    json.dump(productsx, f, indent=2, ensure_ascii=False)
