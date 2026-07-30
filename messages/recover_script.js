node -e '
const fs = require("fs");
const lines = fs.readFileSync("/Users/umurey/.gemini/antigravity/brain/d0897114-d182-4b18-a066-5892d8a60c80/.system_generated/logs/transcript_full.jsonl", "utf8").split("\n").filter(Boolean);
for (const line of lines) {
  const parsed = JSON.parse(line);
  if (parsed.tool_calls) {
    for (const call of parsed.tool_calls) {
      if (call.name === "run_command" && call.args.CommandLine.includes("data.seoExpansion = {")) {
        console.log(call.args.CommandLine);
      }
    }
  }
}
' > recover_script_raw.txt