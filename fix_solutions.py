import json

with open("solutions_da.json", "r") as f:
    sol = json.load(f)

with open("current_chunk_1.json", "r") as f:
    c1 = json.load(f)

with open("current_chunk_0.json", "r") as f:
    c0 = json.load(f)

# The content is a string in TargetContent.
# I will just extract the JSON for rechenzentrum using a small regex or just manual parsing,
# Actually, since it's just JSON, I can wrap it in { } and parse it.
text1 = c1["TargetContent"]
text0 = c0["TargetContent"]
# We need to find "rechenzentrum": { ... }
# It starts in c1 and continues in c0.
combined = text1 + text0
# find the index of '"rechenzentrum": {'
start = combined.find('"rechenzentrum": {')
if start != -1:
    # wrap it to make it valid JSON
    json_str = "{" + combined[start:]
    # it ends with some extra newlines and a closing brace.
    try:
        obj = json.loads(json_str)
        sol["rechenzentrum"] = obj["rechenzentrum"]
        with open("solutions_da_full.json", "w") as out:
            json.dump(sol, out, indent=2, ensure_ascii=False)
        print("Success!")
    except Exception as e:
        print("Error parsing:", e)

