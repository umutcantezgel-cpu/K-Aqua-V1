import sys

with open("messages/da.json", "r") as f:
    lines = f.readlines()

garbage_lines = lines[6655:7428] # 0-indexed: 6655 is line 6656, 7428 is line 7429

chunk_size = 70
for i in range(0, len(garbage_lines), chunk_size):
    chunk = garbage_lines[i:i+chunk_size]
    with open(f"garbage_chunk_{i//chunk_size}.txt", "w") as out:
        out.writelines(chunk)

print(f"Created {len(garbage_lines)//chunk_size + 1} chunks.")
