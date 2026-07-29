import sys
with open('da_solutions_block.txt', 'r') as f:
    target = f.read()

with open('da_fixed_solutions_block.json', 'r') as f:
    repl_json = f.read()

repl = '  "solutions": ' + repl_json.strip() + '\n}'

with open('target_str.txt', 'w') as f:
    f.write(target)
with open('repl_str.txt', 'w') as f:
    f.write(repl)
