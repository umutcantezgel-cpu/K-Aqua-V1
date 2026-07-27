import os
import re

def find_empty_headings(dir_path):
    empty_headings = {}
    pattern = re.compile(r'<h[1-6][^>]*>(.*?)</h[1-6]>', re.IGNORECASE | re.DOTALL)
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                matches = pattern.finditer(content)
                for match in matches:
                    inner_html = match.group(1).strip()
                    # Remove span tags to check pure text content
                    text_content = re.sub(r'<[^>]+>', '', inner_html).strip()
                    if len(text_content) <= 3:
                        empty_headings.setdefault(filepath, []).append((match.group(0), text_content))

    for filepath, headings in empty_headings.items():
        print(f"File: {filepath}")
        for h, t in headings:
            print(f"  Match: {h} (Length: {len(t)})")

find_empty_headings('.next/server/app/de')
