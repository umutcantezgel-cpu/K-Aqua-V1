import json

with open("az.json", "r") as f:
    az = json.load(f)

with open("patch_productsx.json", "r") as f:
    patch = json.load(f)

az["productsx"] = patch

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
