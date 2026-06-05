import json
import os

transcript_path = r"C:\Users\Admin\.gemini\antigravity-ide\brain\99cc288f-14b1-44e0-8c71-ee3c52b2d155\.system_generated\logs\transcript.jsonl"
output_path = r"f:\Mahfoz\Advocacy\scratch\user_messages.txt"

with open(transcript_path, "r", encoding="utf-8") as f, open(output_path, "w", encoding="utf-8") as out:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("source") == "USER_EXPLICIT" or data.get("type") == "USER_INPUT":
                out.write(f"--- STEP {data.get('step_index')} ---\n")
                out.write(data.get("content", ""))
                out.write("\n\n")
        except Exception as e:
            pass

print("Done! Extracted user messages to scratch/user_messages.txt")
