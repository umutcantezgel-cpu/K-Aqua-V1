import os
import re

def find_h1(dir_path):
    pattern = re.compile(r'<h1[^>]*>(.*?)</h1\s*>', re.IGNORECASE | re.DOTALL)
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                matches = pattern.finditer(content)
                match_count = 0
                for match in matches:
                    match_count += 1
                    inner_html = match.group(1).strip()
                    text_content = re.sub(r'<[^>]+>', '', inner_html).strip()
                    if len(text_content) <= 15:
                        print(f"File: {filepath} | H1 (len {len(text_content)}): '{text_content}'")
                
                if match_count == 0:
                    print(f"File: {filepath} | NO H1 TAG FOUND")

find_h1('.next/server/app/de')
