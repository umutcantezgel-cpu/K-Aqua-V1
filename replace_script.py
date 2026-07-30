import json

with open("old_content_raw.txt", "r") as f:
    target = f.read()

with open("tv_content.txt", "r") as f:
    replacement = f.read()

payload = {
    "TargetFile": "/Users/umurey/Downloads/K-Aqua-V1-main/messages/si.json",
    "Instruction": "Replace tools and valves",
    "Description": "Fixing keys in tools and valves",
    "ReplacementChunks": [
        {
            "StartLine": 529,
            "EndLine": 634,
            "TargetContent": target,
            "ReplacementContent": replacement,
            "AllowMultiple": False
        }
    ],
    "toolSummary": "Replace tools and valves",
    "toolAction": "Editing file"
}

with open("payload.json", "w") as f:
    json.dump(payload, f)
