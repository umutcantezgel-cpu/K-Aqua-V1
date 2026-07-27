import json
import re

files = ["pt-BR.json", "pt.json", "ru.json", "tr.json", "zh.json"]
for file in files:
    with open(f"/Users/umurey/Downloads/K-Aqua-V1-main/messages/{file}", 'r') as f:
        content = f.read()
    
    # find em-dashes
    em_matches = re.findall(r'.{0,5}—._{0,5}', content)
    em_set = set(em_matches)
    
    # find en-dashes
    en_matches = re.findall(r'.{0,5}–.{0,5}', content)
    en_set = set(en_matches)
    
    print(f"File: {file}")
    print(f"Em-dashes: {len(em_matches)}")
    print(f"En-dashes: {len(en_matches)}")
    
