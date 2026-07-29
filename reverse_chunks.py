import json

with open("delete_chunks.json", "r") as f:
    chunks = json.load(f)

chunks.reverse()

for i, chunk in enumerate(chunks):
    with open(f"delete_chunk_{i}.json", "w") as out:
        json.dump(chunk, out)

