import json
with open("messages/da.json", "r") as f:
    lines = f.readlines()

# Find the empty line after products:
start_idx = 6655 # line 6656 (0-indexed)
end_idx = 7315 # line 7316 (0-indexed)

garbage_lines = lines[start_idx:end_idx]

import sys
json_chunks = []
chunk_size = 70
for i in range(0, len(garbage_lines), chunk_size):
    chunk = garbage_lines[i:i+chunk_size]
    json_chunks.append({
        "StartLine": start_idx + i + 1,
        "EndLine": start_idx + i + len(chunk),
        "TargetContent": "".join(chunk),
        "ReplacementContent": "",
        "AllowMultiple": False
    })

with open("delete_chunks.json", "w") as f:
    json.dump(json_chunks, f)

print(f"Created {len(json_chunks)} chunks.")
