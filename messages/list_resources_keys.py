import json

with open('resources_missing.json') as f:
    res = json.load(f)

print(list(res.keys()))
