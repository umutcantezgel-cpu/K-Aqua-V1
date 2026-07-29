import json

with open("messages/da.json", "r") as f:
    lines = f.readlines()

start_idx = 6654 # line 6655
end_idx = len(lines)

garbage_lines = lines[start_idx:end_idx]

chunks = []
chunk_size = 80
for i in range(0, len(garbage_lines), chunk_size):
    chunk = garbage_lines[i:i+chunk_size]
    chunks.append({
        "StartLine": start_idx + i + 1,
        "EndLine": start_idx + i + len(chunk),
        "TargetContent": "".join(chunk),
        "ReplacementContent": "",
        "AllowMultiple": False
    })

chunks.reverse()

for i in range(len(chunks)):
    with open(f"current_chunk_{i}.json", "w") as f:
        json.dump(chunks[i], f)

print(f"Created {len(chunks)} chunks.")
