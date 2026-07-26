import os
import re

def noindex_pages():
    pages_to_noindex = [
        "app/[locale]/language/page.tsx",
        "app/[locale]/dev/layout.tsx",
        "app/[locale]/produkte/finder/page.tsx",
        "app/[locale]/co2-rechner/page.tsx"
    ]
    
    for path in pages_to_noindex:
        full_path = f"/Users/umurey/Downloads/K-Aqua-V1-main/{path}"
        if os.path.exists(full_path):
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if "robots:" not in content and "Metadata" in content:
                print(f"Needs noindex: {path}")

noindex_pages()
