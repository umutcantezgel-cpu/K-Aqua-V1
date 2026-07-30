import json

def apply_recovery():
    transcript_path = "/Users/umurey/.gemini/antigravity/brain/77e8e05b-cc51-4c15-aea9-7c53a358f3dd/.system_generated/logs/transcript.jsonl"
    with open("lt.json", "r") as f:
        lt_text = f.read()

    lines = open(transcript_path).readlines()
    for line in lines:
        try:
            entry = json.loads(line)
        except: continue
        
        if entry.get("type") == "PLANNER_RESPONSE":
            calls = entry.get("tool_calls", [])
            for call in calls:
                if call.get("name") == "multi_replace_file_content":
                    args = call.get("args", {})
                    target_file = args.get("TargetFile", "")
                    if "lt.json" in target_file:
                        chunks = args.get("ReplacementChunks", [])
                        if isinstance(chunks, str):
                            try:
                                chunks = json.loads(chunks, strict=False)
                            except Exception as e:
                                print(f"Error parsing chunks: {e}")
                                continue
                        
                        for chunk in chunks:
                            target = chunk.get("TargetContent", "")
                            repl = chunk.get("ReplacementContent", "")
                            if target and target in lt_text:
                                lt_text = lt_text.replace(target, repl)
                                
    with open("lt_recovered.json", "w") as f:
        f.write(lt_text)

apply_recovery()
print("Recovery completed.")
