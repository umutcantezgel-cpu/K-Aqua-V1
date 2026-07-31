import os
import re

def remove_seo_block(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Remove import
    content = re.sub(r"import \{? ?DynamicSeoBlock ?\}? from ['\"]@/components/seo/DynamicSeoBlock['\"];?\n?", "", content)

    # 2. Remove component usage
    content = re.sub(r"\{\/\* Dynamic SEO Word Count Padding.*?\*\/\}[\s\n]*<DynamicSeoBlock[^>]*/>", "", content, flags=re.DOTALL)
    content = re.sub(r"<DynamicSeoBlock[^>]*/>", "", content)

    with open(filepath, 'w') as f:
        f.write(content)

pages = [
    'app/[locale]/produkte/tools/page.tsx',
    'app/[locale]/produkte/valves/page.tsx',
    'app/[locale]/produkte/fittings/page.tsx',
    'app/[locale]/produkte/pipes/page.tsx',
    'app/[locale]/produkte/transition-fittings/page.tsx',
    'app/[locale]/news/page.tsx',
    'app/[locale]/unternehmen/page.tsx',
    'app/[locale]/referenzen/page.tsx',
    'app/[locale]/trust-center/page.tsx'
]

for p in pages:
    if os.path.exists(p):
        print("Removing from", p)
        remove_seo_block(p)

