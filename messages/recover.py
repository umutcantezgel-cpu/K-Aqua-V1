import json
import sys

def apply_replacements(file_path, transcript_path):
    # Read original file
    with open(file_path, 'r') as f:
        content = f.read()
    lines = content.split('\n')
    
    # Parse transcript
    with open(transcript_path, 'r') as f:
        for line in f:
            try:
                entry = json.loads(line)
                if entry.get("type") == "PLANNER_RESPONSE":
                    calls = entry.get("tool_calls", [])
                    for call in calls:
                        if call.get("name") in ("multi_replace_file_content", "replace_file_content"):
                            args = call.get("args", {})
                            if args.get("TargetFile", "").endswith("fi.json"):
                                chunks = args.get("ReplacementChunks", [])
                                if call.get("name") == "replace_file_content":
                                    chunks = [args]
                                
                                # Sort chunks by StartLine in descending order to avoid line number shifts
                                chunks.sort(key=lambda x: x.get("StartLine", 0), reverse=True)
                                
                                for chunk in chunks:
                                    start = chunk.get("StartLine")
                                    end = chunk.get("EndLine")
                                    replacement = chunk.get("ReplacementContent", "")
                                    
                                    if start and end:
                                        # Replace lines from start to end (1-indexed)
                                        prefix = lines[:start-1]
                                        suffix = lines[end:]
                                        lines = prefix + replacement.split('\n') + suffix
            except Exception as e:
                pass

    with open(file_path, 'w') as f:
        f.write('\n'.join(lines))

apply_replacements("fi.json", "/Users/umurey/.gemini/antigravity/brain/ddff770d-ccf3-4e1d-8e79-5382d2464de8/.system_generated/logs/transcript_full.jsonl")
