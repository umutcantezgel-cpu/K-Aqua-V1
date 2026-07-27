import os
import glob
import json

files = glob.glob('**/*.ts', recursive=True) + glob.glob('**/*.tsx', recursive=True)
files = [f for f in files if 'node_modules' not in f and '.next' not in f and '.gemini' not in f]

tool_calls = ""
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if '—' in content:
        abs_path = os.path.abspath(f)
        args = {
            "TargetFile": abs_path,
            "Instruction": "Replace em-dashes",
            "Description": "Remove em-dashes from comments and text",
            "AllowMultiple": True,
            "TargetContent": "—",
            "ReplacementContent": "-",
            "StartLine": 1,
            "EndLine": content.count('\n') + 1,
            "toolSummary": f"Fix dashes in {os.path.basename(f)}",
            "toolAction": "Editing file"
        }
        # We also want to replace " — " with " - " so we don't get " - " becoming " - " -> " - "
        # Wait, if we just replace "—" with "-", then " — " becomes " - ".
        # Let's check if there are any "—" without spaces that need to become "-".
        # Yes, if we replace "—" with "-", "A—B" becomes "A-B". "A — B" becomes "A - B".
        # This perfectly satisfies rule 2 (" - ") and rule 3 ("-").
        # Rule 1 says: "user-visible text ... replaced with appropriate punctuation: commas, colons, periods, or hyphens."
        # Hyphens are allowed for user-visible text too.
        # Let's just replace all "—" with "-" using AllowMultiple!
        
        args_str = json.dumps(args)
        tool_calls += f"\\n\\u1209call:default_api:replace_file_content{args_str}\\u120B"

print(tool_calls)
