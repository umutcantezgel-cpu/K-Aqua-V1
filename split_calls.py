import os, glob, json, math

files = glob.glob('**/*.ts', recursive=True) + glob.glob('**/*.tsx', recursive=True)
files = [f for f in files if 'node_modules' not in f and '.next' not in f and '.gemini' not in f]

calls = []
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if '—' in content:
        abs_path = os.path.abspath(f)
        lines = content.count('\n') + 1
        args = {
            "TargetFile": abs_path,
            "Instruction": "Replace em-dashes",
            "Description": "Remove em-dashes from comments and text",
            "AllowMultiple": True,
            "TargetContent": "—",
            "ReplacementContent": "-",
            "StartLine": 1,
            "EndLine": lines,
            "toolSummary": f"Fix dashes in {os.path.basename(f)}",
            "toolAction": "Editing file"
        }
        args_str = json.dumps(args)
        calls.append(f"\\n\\u1209call:default_api:replace_file_content{args_str}\\u120B")

# Split into chunks of 15
chunk_size = 15
for i, i_start in enumerate(range(0, len(calls), chunk_size)):
    chunk = calls[i_start:i_start+chunk_size]
    with open(f"tool_calls_{i}.txt", "w") as out:
        out.write("".join(chunk))

print(f"Generated {math.ceil(len(calls)/chunk_size)} files.")
