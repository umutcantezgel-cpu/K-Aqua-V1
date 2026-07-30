import json

with open("target_content.txt", "r") as f:
    target = f.read()

with open("valves_th_injection.txt", "r") as f:
    replacement = f.read()

tool_call = {
    "AllowMultiple": False,
    "Description": "Replace products.valves schema",
    "EndLine": 1141,
    "Instruction": "Replace products.valves schema",
    "ReplacementContent": replacement,
    "StartLine": 1049,
    "TargetContent": target,
    "TargetFile": "/Users/umurey/Downloads/K-Aqua-V1-main/messages/th.json",
    "toolAction": "Editing file",
    "toolSummary": "Replace valves"
}

with open("tool_call.json", "w") as f:
    json.dump(tool_call, f)
