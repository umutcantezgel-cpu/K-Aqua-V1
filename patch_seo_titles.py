import os
import re

files_to_patch = {
    "de/korrosionsbestaendigkeit-trinkwasser.md": "Korrosionsbeständigkeit im Trinkwasserbereich",
    "de/nachhaltigkeit-rohrsysteme.md": "Nachhaltigkeit in der Rohrleitungstechnik",
    "de/vorteile-pp-rct.md": "Vorteile von PP-RCT in der Haustechnik",
    
    "en/korrosionsbestaendigkeit-trinkwasser.md": "Corrosion Resistance in Drinking Water",
    "en/nachhaltigkeit-rohrsysteme.md": "Sustainability in Piping Technology",
    "en/vorteile-pp-rct.md": "Advantages of PP-RCT in Building Engineering",
    
    "ar/korrosionsbestaendigkeit-trinkwasser.md": "مقاومة التآكل في أنظمة مياه الشرب",
    "ar/nachhaltigkeit-rohrsysteme.md": "الاستدامة في تكنولوجيا أنظمة الأنابيب",
    "ar/vorteile-pp-rct.md": "مزايا PP-RCT في خدمات المباني"
}

base_dir = "/Users/umurey/Downloads/K-Aqua-V1-main/content/wissen"

for rel_path, new_title in files_to_patch.items():
    full_path = os.path.join(base_dir, rel_path)
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace the title line
        content = re.sub(r'^title: ".*"$', f'title: "{new_title}"', content, flags=re.MULTILINE)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Patched {rel_path} to '{new_title}' ({len(new_title)} chars)")
    else:
        print(f"Missing {rel_path}")
