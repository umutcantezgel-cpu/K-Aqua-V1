import json
with open('kontaktBlocks_de.json') as f: kb = json.load(f)
print(json.dumps(list(kb.keys())))
