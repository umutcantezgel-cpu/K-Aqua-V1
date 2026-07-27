import json

with open('/Users/umurey/Downloads/K-Aqua-V1-main/messages/ar.json', 'r') as f:
    content = f.read()

chunks = []

# En-dashes that are not ranges:
# " – " -> "، " or ": "
chunks.append({
    "TargetContent": " – ",
    "ReplacementContent": "، ",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})

# Em-dash replacements
# 1. Standalone
chunks.append({
    "TargetContent": "\"—\"",
    "ReplacementContent": "\"-\"",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})

# 2. Ends of strings
chunks.append({
    "TargetContent": " —\",\n",
    "ReplacementContent": ":\",\n",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})
chunks.append({
    "TargetContent": " —\"\n",
    "ReplacementContent": ":\"\n",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})

# 3. Specific patterns
chunks.append({
    "TargetContent": " — كل ",
    "ReplacementContent": ". كل ",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})
chunks.append({
    "TargetContent": " — مثل ",
    "ReplacementContent": "، مثل ",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})

# 4. Remaining em-dashes
chunks.append({
    "TargetContent": " — ",
    "ReplacementContent": "، ",
    "StartLine": 1,
    "EndLine": 8500,
    "AllowMultiple": True
})

# Test the replacements to see how many are left
c = content
for chunk in chunks:
    c = c.replace(chunk["TargetContent"], chunk["ReplacementContent"])

print(f"Remaining em-dashes: {c.count('—')}")
print(f"Remaining en-dashes: {c.count('–')}")
# Check if any en-dashes are not legitimate ranges
import re
bad_en_dashes = re.findall(r'[^0-9]–[^0-9]', c)
print(f"Remaining bad en-dashes: {bad_en_dashes}")
