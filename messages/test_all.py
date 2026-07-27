import json
import re

files = ["pt-BR.json", "pt.json", "ru.json", "tr.json", "zh.json"]

for file in files:
    with open(f"/Users/umurey/Downloads/K-Aqua-V1-main/messages/{file}", 'r') as f:
        content = f.read()

    # The exact replacements we will do:
    content = content.replace(" —\",", "\",")
    content = content.replace("\"—\"", "\"\"")
    content = content.replace("\"— ", "\"")
    content = content.replace(" — ", ", ")
    content = content.replace(" – ", ", ")

    em = re.findall(r'.{0,5}—.{0,5}', content)
    en = re.findall(r'.{0,5}–.{0,5}', content)

    print(f"--- {file} ---")
    if em:
        print("Remaining em:")
        for c in em: print(repr(c))
    
    # Check if remaining en-dashes are not connecting numbers
    remaining_en_contexts = re.findall(r'[^0-9].{0,4}–.{0,4}[^0-9]', content)
    invalid_en = []
    for c in en:
        # Check if it's a range like d20-d630 or 20-300
        # simple check: if it matches \d+–\d+ or \d+–d\d+ or d\d+–d\d+
        if not re.search(r'(?:\d+|d\d+)–(?:\d+|d\d+)', c):
            invalid_en.append(c)
            
    if invalid_en:
        print("Invalid remaining en:")
        for c in invalid_en: print(repr(c))

