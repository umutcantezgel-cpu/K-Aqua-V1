import json
import re

file = "pt-BR.json"
with open(f"/Users/umurey/Downloads/K-Aqua-V1-main/messages/{file}", 'r') as f:
    content = f.read()

content = content.replace(" — ", ", ")
content = content.replace(" – ", ", ")

remaining_em = re.findall(r'.{0,5}—.{0,5}', content)
for c in remaining_em:
    print(repr(c))

