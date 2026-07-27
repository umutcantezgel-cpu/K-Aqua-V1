import json
import re

files = ["pt-BR.json", "pt.json", "ru.json", "tr.json", "zh.json"]
for file in files:
    with open(f"/Users/umurey/Downloads/K-Aqua-V1-main/messages/{file}", 'r') as f:
        content = f.read()
    
    em_matches = set(re.findall(r'.{0,2}—.{0,2}', content))
    en_matches = set(re.findall(r'.{0,2}–.{0,2}', content))
    
    print(f"--- {file} ---")
    print("Em-dashes contexts:")
    for m in em_matches:
        print(repr(m))
    print("En-dashes contexts:")
    for m in en_matches:
        print(repr(m))
    print("\n")
