import json

with open("delete_chunks.json", "r") as f:
    chunks = json.load(f)

for i in range(3):
    with open(f"call_chunk_{i}.json", "w") as out:
        json.dump(chunks[i*4:(i+1)*4], out)

