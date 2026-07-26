import os
import re

def count_words(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            text = re.sub(r'<[^>]+>', ' ', content)
            words = re.findall(r'\b\w+\b', text)
            return len(words)
    except Exception:
        return 0

def find_thin_content():
    print("--- Thin Content Files (< 500 words) ---")
    dirs = ['app', 'components', 'content']
    files_with_counts = []
    for d in dirs:
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.mdx') or file.endswith('.ts'):
                    path = os.path.join(root, file)
                    words = count_words(path)
                    files_with_counts.append((path, words))
    
    files_with_counts.sort(key=lambda x: x[1])
    for p, w in files_with_counts[:30]:
        print(f"{p}: {w} words")

if __name__ == '__main__':
    find_thin_content()
