import json
import re

file = "pt-BR.json"
with open(f"/Users/umurey/Downloads/K-Aqua-V1-main/messages/{file}", 'r') as f:
    content = f.read()

content = content.replace(" — ", ", ")
content = content.replace(" – ", ", ")

em = re.findall(r'—', content)
en = re.findall(r'–', content)

print("Remaining em-dashes:", len(em))
print("Remaining en-dashes:", len(en))

# Check remaining en-dashes to see if they are ALL ranges
remaining_en_contexts = re.findall(r'.{0,5}–.{0,5}', content)
for c in remaining_en_contexts:
    print(repr(c))

