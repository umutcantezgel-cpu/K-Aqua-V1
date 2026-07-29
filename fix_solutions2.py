import json

with open("solutions_da.json", "r") as f:
    sol = json.load(f)

with open("current_chunk_1.json", "r") as f:
    c1 = json.load(f)

with open("current_chunk_0.json", "r") as f:
    c0 = json.load(f)

combined = c1["TargetContent"] + c0["TargetContent"]
start = combined.find('"rechenzentrum": {')
# find the last valid closing brace for rechenzentrum
# by counting braces
s = "{" + combined[start:]
count = 0
for i, c in enumerate(s):
    if c == '{':
        count += 1
    elif c == '}':
        count -= 1
        if count == 0:
            valid_json = s[:i+1]
            break

obj = json.loads(valid_json)
sol["rechenzentrum"] = obj["rechenzentrum"]
with open("solutions_da_full.json", "w") as out:
    json.dump(sol, out, indent=2, ensure_ascii=False)
print("Success! solutions_da_full.json created.")

