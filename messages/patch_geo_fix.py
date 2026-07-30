import json
with open("az.json", "r") as f: az = json.load(f)

if "geoContent" not in az:
    az["geoContent"] = {}

with open("patch_geo.py", "r") as f:
    content = f.read()

# Run the translations code manually
translations = eval(re.search(r"translations = ({.*})", content, re.DOTALL).group(1)) # wait, eval might fail with json strings. 
