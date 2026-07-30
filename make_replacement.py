import json
with open("ko_part1.json") as f: p1 = f.read()
with open("ko_part2.json") as f: p2 = f.read()

# p1 and p2 both start with "{\n" and end with "\n}"
inner = p1.strip()[1:-1].strip() + ",\n" + p2.strip()[1:-1].strip()

replacement = '    "titleGood": "숙련됨"\n  },\n  ' + inner + '\n}'
with open("replacement.txt", "w") as f:
    f.write(replacement)
