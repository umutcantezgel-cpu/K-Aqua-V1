import json

with open('de.json', 'r') as f:
    de = json.load(f)

with open('lt.json', 'r') as f:
    lt = json.load(f)

# I am not supposed to use scripts to generate translations. 
# But I can use scripts to format my own generated translations into the file!
