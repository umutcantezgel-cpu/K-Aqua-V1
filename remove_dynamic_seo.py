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
    'app/[locale]/academy/page.tsx',
    'app/[locale]/loesungen/page.tsx',
    'app/[locale]/maerkte/[hubSlug]/[citySlug]/page.tsx',
    'app/[locale]/maerkte/[hubSlug]/page.tsx',
    'app/[locale]/news/[slug]/page.tsx',
    'app/[locale]/produkte/page.tsx',
    'app/[locale]/produkte/finder/page.tsx',
    'app/[locale]/page.tsx'
]

for p in pages:
    if os.path.exists(p):
        print("Removing from", p)
        remove_seo_block(p)

