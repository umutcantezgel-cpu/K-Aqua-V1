import os
import glob

files = glob.glob('**/*.ts', recursive=True) + glob.glob('**/*.tsx', recursive=True)
files = [f for f in files if 'node_modules' not in f and '.next' not in f and '.gemini' not in f]

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            for i, line in enumerate(lines):
                if '—' in line:
                    print(f"{f}:{i+1}:{line.rstrip()}")
    except:
        pass
